"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import type { Message } from "@/types/message"
import { toast } from "@/components/ui/use-toast" // Corrected import for toast notifications
// Removed specific flow imports as they are not directly used in this component's logic
// and are likely handled by a separate flow handler or the AI SDK's useChat if it were used.
// For this fix, we focus on the direct issues.
import { SystemInfoBubbleMaster, UserBubbleMaster } from "@/components/chat-tuenti/SystemInfoBubble" // Corrected import
import { TypingIndicator } from "@/components/chat-tuenti/components/typing-indicator"
import { useProposalNotifications } from "./hooks/use-proposal-notifications" // Keep this if it's used for notifications
import { ChatInput } from "@/components/chat-tuenti/components/chat-input"
import { useChatTranslations } from "@/hooks/use-chat-translations"


interface QuickReplyOption {
  id: string
  text: string
  action: string
}

interface FlowState {
  step: string
  responses: Record<string, any>
  systemInfo: string
  currentProposalId?: string
  conversationId?: string
  lastActivity?: string
}

interface ChatTuentiMasterProps {
  isOpen: boolean
  toggleChat: () => void
  buttonPosition?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  initialMessage?: string
  avatarSrc?: string
  botName?: string
  customStyles?: Record<string, string>
  isMobile?: boolean
}

export default function ChatTuentiMaster({
  isOpen,
  toggleChat,
  buttonPosition = "bottom-right",
  initialMessage,
  avatarSrc,
  botName = "Mario Verdú",
  customStyles,
  isMobile = false,
}: ChatTuentiMasterProps) {
  const t = useChatTranslations()
  const [messages, setMessages] = useState<Message[]>([])
  const [flowState, setFlowState] = useState<FlowState>({
    step: "initial",
    responses: {},
    systemInfo: "initial",
  })

  const [isTyping, setIsTyping] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [conversationLoaded, setConversationLoaded] = useState(false)
  const [processedNotifications, setProcessedNotifications] = useState<Set<string>>(new Set())
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLTextAreaElement>(null) as React.RefObject<HTMLTextAreaElement>

  // Hook para notificaciones de propuestas
  const {
    notifications,
    isLoading: notificationsLoading,
    hasNotifications,
  } = useProposalNotifications(flowState.currentProposalId)

  // Generar ID de conversación único y persistente
  const getConversationId = () => {
    let conversationId = localStorage.getItem("chatTuentiConversationId")
    if (!conversationId) {
      conversationId = `conv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
      localStorage.setItem("chatTuentiConversationId", conversationId)
    }
    return conversationId
  }

  // Generar ID de usuario único y persistente
  const getUserId = () => {
    let userId = localStorage.getItem("chatTuentiUserId")
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
      localStorage.setItem("chatTuentiUserId", userId)
    }
    return userId
  }

  // Guardar conversación en localStorage
  const saveConversation = (messages: Message[], flowState: FlowState) => {
    const conversationId = getConversationId()
    const conversationData = {
      conversationId,
      messages: messages.map((msg) => ({
        id: msg.id,
        content: msg.content,
        sender: msg.sender,
        timestamp: msg.timestamp, // SIEMPRE string
        type: msg.type,
        metadata: msg.metadata,
        conversation_id: msg.conversation_id,
      })),
      flowState: {
        ...flowState,
        conversationId,
        lastActivity: new Date().toISOString(),
      },
      lastActivity: new Date().toISOString(),
    }
    localStorage.setItem("chatTuentiConversation", JSON.stringify(conversationData))
    // También guardar en el formato legacy para compatibilidad
    const legacyConversations = JSON.parse(localStorage.getItem("chatTuentiConversations") || "{}")
    legacyConversations[conversationId] = conversationData.messages
    localStorage.setItem("chatTuentiConversations", JSON.stringify(legacyConversations))
  }

  // Cargar conversación desde localStorage
  const loadConversation = () => {
    try {
      const stored = localStorage.getItem("chatTuentiConversation")
      if (stored) {
        const conversationData = JSON.parse(stored)
        // Restaurar mensajes
        const loadedMessages: Message[] = conversationData.messages.map((msg: any) => ({
          id: msg.id,
          content: msg.content,
          sender: msg.sender,
          timestamp: msg.timestamp, // SIEMPRE string
          type: msg.type,
          metadata: msg.metadata,
          conversation_id: msg.conversation_id,
        }))
        setMessages(loadedMessages)
        // Restaurar estado del flujo
        if (conversationData.flowState) {
          setFlowState(conversationData.flowState)
        }
        return true
      }
    } catch (error) {
      console.error("Error loading conversation:", error)
    }
    return false
  }

  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    console.log("🔧 Scroll: Ejecutando scrollToBottom")
    
    // Usar requestAnimationFrame para asegurar que el DOM esté actualizado
    requestAnimationFrame(() => {
      try {
        // Método 1: Intentar con messagesEndRef si está disponible
        if (messagesEndRef.current) {
          console.log("🔧 Scroll: Intentando scrollIntoView con messagesEndRef")
          messagesEndRef.current.scrollIntoView({ 
            behavior: "smooth",
            block: "end"
          })
        }
        
        // Método 2: Fallback directo al contenedor (más confiable)
        const container = messagesContainerRef.current
        if (container) {
          console.log("🔧 Scroll: Fallback scrollTop", container.scrollHeight)
          container.scrollTop = container.scrollHeight
        } else {
          console.log("🔧 Scroll: Container no disponible")
        }
        
        // Método 3: Buscar el contenedor por selector si los refs fallan
        if (!container) {
          const chatContainer = document.querySelector('.chat-messages')
          if (chatContainer) {
            console.log("🔧 Scroll: Usando selector fallback")
            chatContainer.scrollTop = chatContainer.scrollHeight
          }
        }
        
        // Método 4: Buscar TODOS los contenedores de chat y hacer scroll en todos
        const allChatContainers = document.querySelectorAll('.chat-messages')
        allChatContainers.forEach((container, index) => {
          console.log(`🔧 Scroll: Contenedor ${index}`, container.scrollHeight)
          container.scrollTop = container.scrollHeight
        })
        
      } catch (error) {
        console.log("🔧 Scroll error:", error)
        // Fallback final
        const container = messagesContainerRef.current || document.querySelector('.chat-messages')
        if (container) {
          container.scrollTop = container.scrollHeight
        }
      }
    })
  }

  // Scroll automático cuando se añaden mensajes
  useEffect(() => {
    if (messages.length > 0) {
      // Delay para asegurar que los mensajes se han renderizado
      setTimeout(() => scrollToBottom(), 50)
    }
  }, [messages])

  // Scroll automático cuando se abre el chat
  useEffect(() => {
    if (isOpen && messages.length > 0) {
      // Delay para asegurar que el DOM esté listo
      setTimeout(() => scrollToBottom(), 200)
    }
  }, [isOpen, messages.length])

  // Scroll automático cuando se carga la conversación
  useEffect(() => {
    if (conversationLoaded && messages.length > 0) {
      // Delay para asegurar que la conversación se ha cargado completamente
      setTimeout(() => scrollToBottom(), 300)
    }
  }, [conversationLoaded, messages.length])

  // Scroll automático adicional cuando el chat se abre (más agresivo)
  useEffect(() => {
    if (isOpen) {
      // Múltiples intentos para asegurar que funcione en ambos tamaños
      setTimeout(() => scrollToBottom(), 100)
      setTimeout(() => scrollToBottom(), 300)
      setTimeout(() => scrollToBottom(), 500)
      setTimeout(() => scrollToBottom(), 1000)
      setTimeout(() => scrollToBottom(), 1500)
    }
  }, [isOpen])

  // Listener global: abrir chat (si está cerrado) y enviar mensaje programáticamente
  useEffect(() => {
    const openHandler = (e: any) => {
      const message = e?.detail?.message
      if (!message) return
      if (!isOpen) {
        toggleChat()
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("sendChatTuentiMessage", { detail: { message } }))
        }, 400)
      } else {
        window.dispatchEvent(new CustomEvent("sendChatTuentiMessage", { detail: { message } }))
      }
    }
    window.addEventListener("openChatTuenti", openHandler)
    return () => window.removeEventListener("openChatTuenti", openHandler)
  }, [isOpen, toggleChat])

  // Cargar conversación al inicializar
  useEffect(() => {
    if (!conversationLoaded) {
      const loaded = loadConversation()
      if (!loaded) {
        // Si no se cargó ninguna conversación, establecer el mensaje inicial
        const initialMsg: Message = {
          id: "initial_msg",
          content: initialMessage || t.initialMessage,
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          conversation_id: getConversationId(),
          metadata: {
            options: [
              { id: "explorar_servicios_v2", text: t.exploreServices, action: "explorar-servicios-v2" },
              { id: "hablar_con_mario", text: t.contactMario, action: "contactarConMario" },
            ],
          },
        }
        setMessages([initialMsg])
      }
      setConversationLoaded(true)
    }
  }, [initialMessage, conversationLoaded])

  // Efecto para manejar notificaciones de propuestas
  useEffect(() => {
    if (notifications.length > 0 && flowState.currentProposalId) {
      console.log("🔔 Master: Processing notifications:", notifications)

      notifications.forEach((notification) => {
        // Verificar si ya procesamos esta notificación
        if (processedNotifications.has(notification.notification_id)) {
          console.log("🔔 Master: Notification already processed:", notification.notification_id)
          return
        }

        console.log("🔔 Master: Processing new notification:", notification)

        // Marcar como procesada
        setProcessedNotifications((prev) => new Set(prev).add(notification.notification_id))

        // Agregar mensaje de notificación
        const notificationMessage: Message = {
          id: `notification_${notification.notification_id}`,
          content: notification.message,
          sender: "system",
          timestamp: new Date().toISOString(),
          type: "text",
          conversation_id: getConversationId(),
        }

        setMessages((prev) => {
          const updated = [...prev, notificationMessage]

          // Si la notificación es de aprobación, continuar con el flujo
          if (notification.status === "approved") {
            console.log("✅ Master: Proposal approved, continuing flow...")

            // Agregar mensaje para continuar el proceso después de un delay
            setTimeout(() => {
              const continueMessage: Message = {
                id: `continue_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
                content:
                  "Ahora que tu propuesta ha sido aprobada, ¿te gustaría programar una reunión con Mario para discutir los detalles del proyecto?",
                sender: "bot",
                timestamp: new Date().toISOString(),
                type: "quick-reply",
                conversation_id: getConversationId(),
                metadata: {
                  options: [
                    { id: "schedule_meeting", text: "Sí, programar reunión", action: "schedule_meeting" },
                    { id: "contact_later", text: "Contactar más tarde", action: "contact_later" },
                    { id: "more_info", text: "Necesito más información", action: "more_info" },
                  ],
                },
              }

              setMessages((current) => {
                const newMessages = [...current, continueMessage]

                // Actualizar el estado del flujo para continuar
                const newFlowState = {
                  ...flowState,
                  step: "post_approval",
                  systemInfo: "approved_proposal",
                }

                setFlowState(newFlowState)
                saveConversation(newMessages, newFlowState)

                console.log("🎯 Master: Flow updated to post_approval")
                return newMessages
              })
            }, 2000) // Delay de 2 segundos para que el usuario lea la notificación
          }

          saveConversation(updated, flowState)
          return updated
        })
      })
    }
  }, [notifications, flowState, processedNotifications])

  useEffect(() => {
    const handler = (e: any) => {
      if (e.detail && e.detail.message && isOpen) {
        if (e.detail.message.trim().toLowerCase() === "contactar con mario") {
          handleQuickReply("contactarConMario", "Contactar con Mario")
        } else {
          addMessage({
            id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            conversation_id: getConversationId(),
            content: e.detail.message,
            sender: "user",
            timestamp: new Date().toISOString(),
            type: "text",
          })
        }
      }
    }
    window.addEventListener("sendChatTuentiMessage", handler)
    return () => window.removeEventListener("sendChatTuentiMessage", handler)
  }, [isOpen])

  // Función para guardar mensaje global en la base de datos
  const saveMessageToGlobal = async (msg: Message) => {
    try {
      const conversationId = getConversationId()
      await fetch(`/api/chat-conversations/${conversationId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: msg.sender,
          content: msg.content,
          type: msg.type || "text",
          timestamp: msg.timestamp.toISOString(),
        }),
      })
    } catch (e) {
      // Silenciar errores en local
    }
  }

  // Modifica addMessage para guardar cada mensaje globalmente
  const addMessage = (message: Message) => {
    setMessages((prev) => {
      const updated = [...prev, message]
      saveConversation(updated, flowState)
      return updated
    })
    // Guardar en la tabla global
    saveMessageToGlobal(message)
  }

  // FUNCIONES DE CÁLCULO DE PRECIOS
  const calculatePrice = (responses: any) => {
    let basePrice = 0

    if (responses.screens === 1) {
      basePrice = 136.4
    } else if (responses.screens === 3) {
      basePrice = 409.2
    } else if (responses.screens >= 4 && responses.screens <= 8) {
      basePrice = 720.0
    } else if (responses.screens === 10) {
      basePrice = 1711.2
    } else if (responses.screens >= 15) {
      basePrice = 2300.0
    }

    if (responses.service === "web" && responses.productType === "integracion") {
      basePrice = 136.4
    } else if (responses.service === "web" && responses.productType === "producto_nuevo_web") {
      basePrice = 409.2
    }

    return basePrice
  }

  const getPlanName = (responses: any) => {
    if (responses.screens === 1) return "Tarifa Diaria"
    if (responses.screens === 3) return "Hoverboard"
    if (responses.screens >= 4 && responses.screens <= 8) return "Jetpack"
    if (responses.screens === 10) return "Fénix"
    if (responses.screens >= 15) return "Nabucodonosor"
    return "Personalizado"
  }

  // FUNCIÓN PARA ENVIAR PROPUESTA REAL
  const submitProposal = async (responses: any) => {
    setIsSubmitting(true)
    try {
      const projectDescription =
        responses.projectDescription || localStorage.getItem("chatTuentiProjectDescription") || ""
      const proposalData = {
        service: responses.service || "unknown",
        projectType: responses.projectType || "unknown",
        productType: responses.productType || "unknown",
        screens: responses.screens || 1,
        price: responses.finalPrice || calculatePrice(responses),
        planName: getPlanName(responses),
        payment: responses.payment || "unknown",
        budget: responses.budget || "unknown",
        conversationData: {
          ...flowState,
          responses: {
            ...responses,
            projectDescription,
          },
          projectDescription, // <-- explícito en la raíz
          allResponses: responses,
          conversationId: getConversationId(),
          timestamp: new Date().toISOString(),
        },
      }

      console.log("📤 Master: Submitting proposal:", proposalData)

      const response = await fetch("/api/proposals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proposalData),
      })

      if (!response.ok) {
        throw new Error("Error al enviar propuesta")
      }

      const result = await response.json()
      console.log("✅ Master: Proposal submitted:", result)

      addMessage({
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        conversation_id: getConversationId(),
        content: `¡Perfecto! Tu propuesta ha sido enviada con ID: ${result.proposalId}. Mario revisará tu proyecto y te contactará pronto. Puedes hacer seguimiento en cualquier momento.`,
        sender: "bot",
        timestamp: new Date().toISOString(),
        type: "text",
      })

      // Actualizar el estado del flujo con el ID de la propuesta
      const newFlowState = {
        ...flowState,
        step: "proposal_submitted",
        currentProposalId: result.proposalId,
        systemInfo: "waiting_approval",
      }

      setFlowState(newFlowState)
      saveConversation(messages, newFlowState)

      console.log("🎯 Master: Flow updated to waiting_approval with proposalId:", result.proposalId)
    } catch (error) {
      console.error("Error submitting proposal:", error)
      addMessage({
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        conversation_id: getConversationId(),
        content:
          "Hubo un error al enviar tu propuesta. Por favor, inténtalo de nuevo o contacta directamente con Mario.",
        sender: "bot",
        timestamp: new Date().toISOString(),
        type: "text",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // FUNCIÓN PARA GUARDAR REUNIÓN EN BASE DE DATOS
  const saveMeeting = async (dayName: string, timeSlot: string) => {
    // Mapear día a español y minúsculas
    const dayMap: Record<string, string> = {
      monday: "lunes",
      tuesday: "martes",
      wednesday: "miércoles",
      thursday: "jueves",
      friday: "viernes",
      lunes: "lunes",
      martes: "martes",
      miércoles: "miércoles",
      jueves: "jueves",
      viernes: "viernes",
    }
    const normalizedDay = dayMap[dayName.toLowerCase()] || dayName.toLowerCase()
    try {
      const meetingData = {
        proposalId: flowState.currentProposalId || `meeting_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        userId: getUserId(),
        selectedDay: normalizedDay, // Siempre en español y minúsculas
        selectedTime: timeSlot,
        notes: `Reunión programada via chat - Plan: ${getPlanName(flowState.responses)}`,
      }

      console.log("📅 Master: Saving meeting to database:", meetingData)

      const response = await fetch("/api/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(meetingData),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error("❌ API Error:", result)
        throw new Error(result.error || "Error al guardar la reunión")
      }

      // Polling para confirmar que la reunión está en la base de datos
      const meetingId = result.meeting?.meeting_id
      let confirmedMeeting = null
      for (let i = 0; i < 5; i++) {
        await new Promise((res) => setTimeout(res, 1000))
        const pollRes = await fetch("/api/meetings")
        const pollData = await pollRes.json()
        if (pollData.success && Array.isArray(pollData.meetings)) {
          confirmedMeeting = pollData.meetings.find((m: any) => m.meeting_id === meetingId)
          if (confirmedMeeting) break
        }
      }
      if (!confirmedMeeting) {
        throw new Error("La reserva no se confirmó en el calendario. Intenta recargar o contactar con soporte.")
      }

      console.log("✅ Master: Meeting saved and confirmed in DB:", confirmedMeeting)
      return confirmedMeeting
    } catch (error) {
      console.error("❌ Master: Error saving meeting:", error)
      throw error
    }
  }

  // MANEJADOR PRINCIPAL DE QUICK REPLIES
  const handleQuickReply = async (action: string, text: string) => {
    console.log("🎯 Master: Handling quick reply:", { action, text, currentStep: flowState.step })

    // Evitar duplicar el mensaje del usuario al enviar la descripción del proyecto
    if (action !== "project_description_submitted") {
      addMessage({
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        conversation_id: getConversationId(),
        content: text,
        sender: "user",
        timestamp: new Date().toISOString(),
        type: "text",
      })
    }

    // Simular typing
    setIsTyping(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsTyping(false)

    const currentResponses = flowState.responses || {}

    switch (action) {
      // ==================== FLUJOS POST-APROBACIÓN ====================
      case "schedule_meeting":
        console.log("📅 Master: Starting meeting scheduling flow")
        const newFlowState1 = {
          ...flowState,
          step: "schedule_meeting",
          systemInfo: "scheduling",
        }
        setFlowState(newFlowState1)

        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: "Perfecto. ¿Qué día prefieres para la reunión con Mario?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "day_monday", text: "Lunes", action: "day_monday" },
              { id: "day_tuesday", text: "Martes", action: "day_tuesday" },
              { id: "day_wednesday", text: "Miércoles", action: "day_wednesday" },
              { id: "day_thursday", text: "Jueves", action: "day_thursday" },
              { id: "day_friday", text: "Viernes", action: "day_friday" },
            ],
          },
        })
        break

      case "contact_later":
        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content:
            "Perfecto. Mario se pondrá en contacto contigo cuando sea conveniente. Mientras tanto, puedes contactarlo directamente si tienes alguna pregunta urgente.",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "text",
        })
        break

      case "more_info":
        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: "¿Qué información adicional necesitas sobre tu proyecto?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "timeline_info", text: "Tiempos de entrega", action: "timeline_info" },
              { id: "process_info", text: "Proceso de trabajo", action: "process_info" },
              { id: "payment_info", text: "Información de pago", action: "payment_info" },
              { id: "contact_mario", text: "Hablar directamente con Mario", action: "chatWithMario" },
            ],
          },
        })
        break

      // ==================== INFORMACIÓN ADICIONAL ====================
      case "timeline_info":
        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content:
            "Los tiempos de entrega dependen del plan seleccionado:\n\n• Tarifa Diaria: 1 día\n• Hoverboard: 3 días\n• Jetpack: 1 semana\n• Fénix: 2-4 semanas\n• Nabucodonosor: 1-3 meses\n\n¿Te gustaría programar una reunión para discutir los detalles?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "schedule_meeting", text: "Sí, programar reunión", action: "schedule_meeting" },
              { id: "contact_later", text: "Contactar más tarde", action: "contact_later" },
            ],
          },
        })
        break

      case "process_info":
        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content:
            "El proceso de trabajo incluye:\n\n1. Reunión inicial para definir objetivos\n2. Investigación y análisis\n3. Diseño y prototipado\n4. Revisiones y ajustes\n5. Entrega final\n\n¿Te gustaría programar una reunión para comenzar?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "schedule_meeting", text: "Sí, programar reunión", action: "schedule_meeting" },
              { id: "contact_later", text: "Contactar más tarde", action: "contact_later" },
            ],
          },
        })
        break

      case "payment_info":
        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content:
            "Las opciones de pago incluyen:\n\n• Transferencia bancaria\n• Bizum\n• Pasarela de pago\n• Criptomonedas\n• Efectivo (para proyectos locales)\n\nEl pago se puede dividir en hitos según el proyecto. ¿Te gustaría discutir los detalles en una reunión?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "schedule_meeting", text: "Sí, programar reunión", action: "schedule_meeting" },
              { id: "contact_later", text: "Contactar más tarde", action: "contact_later" },
            ],
          },
        })
        break

      // ==================== INICIO DEL FLUJO ====================
      case "explorar-servicios-v2":
        const newFlowState2 = {
          ...flowState,
          step: "service_selection",
          systemInfo: "selecting_service",
        }
        setFlowState(newFlowState2)

        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: "¿Qué servicio necesitas?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "service_uxui", text: "Diseño (UX/UI y Motion)", action: "service_uxui" },
              { id: "service_web", text: "Diseño y código (Web o app)", action: "service_web" },
              { id: "service_visual", text: "Diseño visual", action: "service_visual" },
            ],
          },
        })
        break

      case "webLikeThis":
        const newFlowState3 = {
          ...flowState,
          step: "web_like_this_flow",
          systemInfo: "web_like_this",
        }
        setFlowState(newFlowState3)

        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: "¡Claro! Para entender mejor tu proyecto, ¿qué tipo de web necesitas?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "product_web", text: "Web", action: "product_web" },
              { id: "product_ecommerce", text: "E-commerce", action: "product_ecommerce" },
              { id: "product_dashboard", text: "Dashboard", action: "product_dashboard" },
            ],
          },
        })
        break

      case "chatWithMario":
        const newFlowState4 = {
          ...flowState,
          step: "chat_with_mario_flow",
          systemInfo: "scheduling_mario",
        }
        setFlowState(newFlowState4)

        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content:
            "Entendido. Para hablar directamente con Mario, por favor, selecciona un día y hora para una videollamada.",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "day_monday", text: "Lunes", action: "day_monday" },
              { id: "day_tuesday", text: "Martes", action: "day_tuesday" },
              { id: "day_wednesday", text: "Miércoles", action: "day_wednesday" },
              { id: "day_thursday", text: "Jueves", action: "day_thursday" },
              { id: "day_friday", text: "Viernes", action: "day_friday" },
            ],
          },
        })
        break

      // ==================== SELECCIÓN DE SERVICIO ====================
      case "service_uxui":
        const newFlowState5 = {
          ...flowState,
          responses: { ...currentResponses, service: "uxui" },
          step: "project_type_uxui",
          systemInfo: "uxui_service",
        }
        setFlowState(newFlowState5)

        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: "¿Qué tipo de proyecto necesitas?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "project_rediseno", text: "Rediseño", action: "project_rediseno" },
              { id: "project_producto_nuevo", text: "Producto desde cero", action: "project_producto_nuevo" },
            ],
          },
        })
        break

      case "service_web":
        const newFlowState6 = {
          ...flowState,
          responses: { ...currentResponses, service: "web" },
          step: "project_type_web",
          systemInfo: "web_service",
        }
        setFlowState(newFlowState6)

        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: "Este servicio está orientado a desarrolladores",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "web_integracion", text: "Integración de Diseño UX/UI", action: "web_integracion" },
              { id: "web_producto_nuevo", text: "Producto desde cero", action: "web_producto_nuevo" },
            ],
          },
        })
        break

      case "service_visual":
        const newFlowState7 = {
          ...flowState,
          responses: { ...currentResponses, service: "visual" },
          step: "obligation_check",
          systemInfo: "visual_service",
        }
        setFlowState(newFlowState7)

        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: "¿Estás obligado en mantener tu sistema de desarrollo actual?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "obligado_si", text: "Sí, estoy obligado", action: "obligado_si" },
              { id: "obligado_no", text: "No estoy obligado", action: "obligado_no" },
            ],
          },
        })
        break

      // ==================== TIPOS DE PROYECTO UX/UI ====================
      case "project_rediseno":
      case "project_producto_nuevo":
        const newFlowState8 = {
          ...flowState,
          responses: { ...currentResponses, projectType: action.replace("project_", "") },
          step: "product_type",
          systemInfo: "selecting_product_type",
        }
        setFlowState(newFlowState8)

        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: "¿Qué tipo de producto?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "product_web", text: "Web", action: "product_web" },
              { id: "product_app", text: "App", action: "product_app" },
              { id: "product_dashboard", text: "Dashboard", action: "product_dashboard" },
              { id: "product_ecommerce", text: "E-commerce", action: "product_ecommerce" },
            ],
          },
        })
        break

      // ==================== TIPOS DE PROYECTO WEB ====================
      case "web_integracion":
        const newFlowState9 = {
          ...flowState,
          responses: { ...currentResponses, productType: "integracion", screens: 1, price: 136.4 },
          step: "budget",
          systemInfo: "web_integration",
        }
        setFlowState(newFlowState9)

        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: "¿Cuáles son tus posibilidades presupuestarias?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "budget_hourly", text: "Por paquete de horas", action: "budget_hourly" },
              { id: "budget_contract", text: "Contrato en plantilla", action: "budget_contract" },
              { id: "budget_fixed", text: "Precio cerrado", action: "budget_fixed" },
            ],
          },
        })
        break

      case "web_producto_nuevo":
        const newFlowState10 = {
          ...flowState,
          responses: { ...currentResponses, productType: "producto_nuevo_web", screens: 3, price: 409.2 },
          step: "budget",
          systemInfo: "web_new_product",
        }
        setFlowState(newFlowState10)

        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: "¿Cuáles son tus posibilidades presupuestarias?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "budget_hourly", text: "Por paquete de horas", action: "budget_hourly" },
              { id: "budget_contract", text: "Contrato en plantilla", action: "budget_contract" },
              { id: "budget_fixed", text: "Precio cerrado", action: "budget_fixed" },
            ],
          },
        })
        break

      // ==================== OBLIGACIÓN DE SISTEMA ====================
      case "obligado_si":
      case "obligado_no":
        const newFlowState11 = {
          ...flowState,
          responses: { ...currentResponses, obligation: action.replace("obligado_", "") },
          step: "product_type",
          systemInfo: "obligation_set",
        }
        setFlowState(newFlowState11)

        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: "¿Qué tipo de producto?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "product_web", text: "Web", action: "product_web" },
              { id: "product_app", text: "App", action: "product_app" },
              { id: "product_dashboard", text: "Dashboard", action: "product_dashboard" },
              { id: "product_ecommerce", text: "E-commerce", action: "product_ecommerce" },
            ],
          },
        })
        break

      // ==================== TIPOS DE PRODUCTO ====================
      case "product_web":
      case "product_app":
      case "product_dashboard":
      case "product_ecommerce":
        const newFlowState12 = {
          ...flowState,
          responses: { ...currentResponses, productType: action.replace("product_", "") },
          step: "screens",
          systemInfo: "selecting_screens",
        }
        setFlowState(newFlowState12)

        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: "¿Cuántas pantallas estimas que necesitas?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "screens_1", text: "1 pantalla", action: "screens_1" },
              { id: "screens_3", text: "3 pantallas", action: "screens_3" },
              { id: "screens_4_8", text: "4-8 pantallas", action: "screens_4_8" },
              { id: "screens_10", text: "10 pantallas", action: "screens_10" },
              { id: "screens_15", text: "15+ pantallas", action: "screens_15" },
            ],
          },
        })
        break

      // ==================== SELECCIÓN DE PANTALLAS ====================
      case "screens_1":
        const newFlowState13 = {
          ...flowState,
          responses: { ...currentResponses, screens: 1, price: 136.4 },
          step: "budget",
          systemInfo: "daily_rate",
        }
        setFlowState(newFlowState13)

        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: "¿Cuáles son tus posibilidades presupuestarias?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "budget_hourly", text: "Por paquete de horas", action: "budget_hourly" },
              { id: "budget_contract", text: "Contrato en plantilla", action: "budget_contract" },
              { id: "budget_fixed", text: "Precio cerrado", action: "budget_fixed" },
            ],
          },
        })
        break

      case "screens_3":
        const newFlowState14 = {
          ...flowState,
          responses: { ...currentResponses, screens: 3, price: 409.2 },
          step: "budget",
          systemInfo: "hoverboard_plan",
        }
        setFlowState(newFlowState14)

        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: "¿Cuáles son tus posibilidades presupuestarias?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "budget_hourly", text: "Por paquete de horas", action: "budget_hourly" },
              { id: "budget_contract", text: "Contrato en plantilla", action: "budget_contract" },
              { id: "budget_fixed", text: "Precio cerrado", action: "budget_fixed" },
            ],
          },
        })
        break

      case "screens_4_8":
        const newFlowState15 = {
          ...flowState,
          responses: { ...currentResponses, screens: 6, price: 720.0 },
          step: "budget",
          systemInfo: "jetpack_plan",
        }
        setFlowState(newFlowState15)

        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: "¿Cuáles son tus posibilidades presupuestarias?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "budget_hourly", text: "Por paquete de horas", action: "budget_hourly" },
              { id: "budget_contract", text: "Contrato en plantilla", action: "budget_contract" },
              { id: "budget_fixed", text: "Precio cerrado", action: "budget_fixed" },
            ],
          },
        })
        break

      case "screens_10":
        const newFlowState16 = {
          ...flowState,
          responses: { ...currentResponses, screens: 10, price: 1711.2 },
          step: "budget",
          systemInfo: "fenix_plan",
        }
        setFlowState(newFlowState16)

        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: "¿Cuáles son tus posibilidades presupuestarias?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "budget_hourly", text: "Por paquete de horas", action: "budget_hourly" },
              { id: "budget_contract", text: "Contrato en plantilla", action: "budget_contract" },
              { id: "budget_fixed", text: "Precio cerrado", action: "budget_fixed" },
            ],
          },
        })
        break

      case "screens_15":
        const newFlowState17 = {
          ...flowState,
          responses: { ...currentResponses, screens: 15, price: 2300.0 },
          step: "budget",
          systemInfo: "nabucodonosor_plan",
        }
        setFlowState(newFlowState17)

        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: "¿Cuáles son tus posibilidades presupuestarias?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "budget_hourly", text: "Por paquete de horas", action: "budget_hourly" },
              { id: "budget_contract", text: "Contrato en plantilla", action: "budget_contract" },
              { id: "budget_fixed", text: "Precio cerrado", action: "budget_fixed" },
            ],
          },
        })
        break

      // ==================== PRESUPUESTO ====================
      case "budget_hourly":
      case "budget_contract":
      case "budget_fixed":
        const finalResponses = { ...currentResponses, budget: action.replace("budget_", "") }
        const finalPrice = calculatePrice(finalResponses)

        const newFlowState18 = {
          ...flowState,
          responses: { ...finalResponses, finalPrice },
          step: "payment",
          systemInfo: "selecting_payment",
        }
        setFlowState(newFlowState18)

        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: "¿Qué métodos de pago prefieres?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "payment_cash", text: "Efectivo", action: "payment_cash" },
              { id: "payment_crypto", text: "Cripto", action: "payment_crypto" },
              { id: "payment_bizum", text: "Bizum", action: "payment_bizum" },
              { id: "payment_transfer", text: "Transferencia bancaria", action: "payment_transfer" },
              { id: "payment_gateway", text: "Pasarela de pago", action: "payment_gateway" },
            ],
          },
        })
        break

      // ==================== MÉTODOS DE PAGO ====================
      case "payment_cash":
      case "payment_crypto":
      case "payment_bizum":
      case "payment_transfer":
      case "payment_gateway": {
        // Nuevo paso: pedir descripción del proyecto
        const finalResponsesAfterPayment = { ...currentResponses, payment: action.replace("payment_", "") }
        const newFlowState19 = {
          ...flowState,
          responses: { ...finalResponsesAfterPayment },
          step: "project_description",
          systemInfo: "asking_project_description",
        }
        setFlowState(newFlowState19)

        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: "Describe brevemente tu proyecto y delimita el problema sobre el que requieres mi experiencia",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "text",
        })
        break
      }
      // ==================== DESCRIPCIÓN DEL PROYECTO ====================
      case "project_description_submitted": {
        // El texto del usuario ya está en inputValue, lo guardamos
        const finalResponsesWithDescription = { ...currentResponses, projectDescription: inputValue }
        localStorage.setItem("chatTuentiProjectDescription", inputValue)
        const finalPriceAfterPayment = calculatePrice(finalResponsesWithDescription)
        const planNameAfterPayment = getPlanName(finalResponsesWithDescription)
        const newFlowState20 = {
          ...flowState,
          responses: { ...finalResponsesWithDescription, finalPrice: finalPriceAfterPayment },
          step: "recommendation",
          systemInfo: "showing_recommendation",
        }
        setFlowState(newFlowState20)
        setInputValue("")
        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: `Basado en tus necesidades, recomendamos el Plan ${planNameAfterPayment}: ${finalPriceAfterPayment}€`,
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [{ id: "propose_project", text: "Proponer proyecto", action: "propose_project" }],
          },
        })
        break
      }

      // ==================== PROPONER PROYECTO ====================
      case "propose_project": {
        const responses = { ...flowState.responses }
        // Si el paso actual no es project_description pero ya se rellenó antes, mantenlo
        if (!responses.projectDescription && localStorage.getItem("chatTuentiProjectDescription")) {
          responses.projectDescription = localStorage.getItem("chatTuentiProjectDescription")
        }
        await submitProposal(responses)
        break
      }

      // ==================== SELECCIÓN DE DÍA ====================
      case "day_monday":
      case "day_tuesday":
      case "day_wednesday":
      case "day_thursday":
      case "day_friday":
        const day = action.replace("day_", "")
        const dayNames = {
          monday: "lunes",
          tuesday: "martes",
          wednesday: "miércoles",
          thursday: "jueves",
          friday: "viernes",
        }

        console.log("📅 Master: Day selected:", day)

        const newFlowState20 = {
          ...flowState,
          responses: { ...flowState.responses, selectedDay: day },
          step: "time_selection",
          systemInfo: "selecting_time",
        }
        setFlowState(newFlowState20)

        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: `Perfecto, has seleccionado el ${dayNames[day as keyof typeof dayNames]}. ¿A qué hora prefieres la videollamada?`,
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "quick-reply",
          metadata: {
            options: [
              { id: "time_10", text: "10:00", action: "time_10" },
              { id: "time_11", text: "11:00", action: "time_11" },
              { id: "time_12", text: "12:00", action: "time_12" },
              { id: "time_13", text: "13:00", action: "time_13" },
              { id: "time_14", text: "14:00", action: "time_14" },
            ],
          },
        })
        break

      // ==================== SELECCIÓN DE HORA ====================
      default:
        if (action.startsWith("time_")) {
          const time = action.replace("time_", "") + ":00"
          let selectedDay = flowState.responses?.selectedDay
          // Mapear a español si es necesario
          const dayMap: Record<string, string> = {
            monday: "lunes",
            tuesday: "martes",
            wednesday: "miércoles",
            thursday: "jueves",
            friday: "viernes",
            lunes: "lunes",
            martes: "martes",
            miércoles: "miércoles",
            jueves: "jueves",
            viernes: "viernes",
          }
          if (selectedDay) {
            selectedDay = dayMap[selectedDay.toLowerCase()] || selectedDay.toLowerCase()
          }

          console.log("⏰ Master: Time selected:", time, "for day:", selectedDay)

          if (selectedDay) {
            const dayNames = {
              monday: "lunes",
              tuesday: "martes",
              wednesday: "miércoles",
              thursday: "jueves",
              friday: "viernes",
            }

            try {
              // Guardar la reunión en la base de datos
              setIsSubmitting(true)
              console.log("📅 Master: About to save meeting...")

              const savedMeeting = await saveMeeting(selectedDay, time)

              // After the meeting is confirmed in DB, crear notificación y mostrar mensaje de éxito
              try {
                await fetch("/api/meeting-notifications", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    meetingId: savedMeeting.meeting_id,
                    userId: getUserId(),
                    message: `Reunión confirmada para el ${(() => {
                      const dias = {
                        monday: "Lunes",
                        tuesday: "Martes",
                        wednesday: "Miércoles",
                        thursday: "Jueves",
                        friday: "Viernes",
                        lunes: "Lunes",
                        martes: "Martes",
                        miércoles: "Miércoles",
                        jueves: "Jueves",
                        viernes: "Viernes",
                      }
                      return dias[selectedDay?.toLowerCase() as keyof typeof dias] || selectedDay || "(día no definido)"
                    })()} a las ${time}`,
                    type: "meeting_confirmed",
                  }),
                })
                console.log("✅ Master: Meeting notification created")
              } catch (notificationError) {
                console.error("⚠️ Master: Error creating notification:", notificationError)
              }

              const newFlowState21 = {
                ...flowState,
                responses: { ...flowState.responses, selectedTime: time, meetingId: savedMeeting.meeting_id },
                step: "meeting_scheduled",
                systemInfo: "completed",
              }
              setFlowState(newFlowState21)

              addMessage({
                id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
                conversation_id: getConversationId(),
                content: `¡Reserva exitosa! Has programado una videollamada para el ${(() => {
                  const dias = {
                    monday: "Lunes",
                    tuesday: "Martes",
                    wednesday: "Miércoles",
                    thursday: "Jueves",
                    friday: "Viernes",
                    lunes: "Lunes",
                    martes: "Martes",
                    miércoles: "Miércoles",
                    jueves: "Jueves",
                    viernes: "Viernes",
                  }
                  return dias[selectedDay?.toLowerCase() as keyof typeof dias] || selectedDay || "(día no definido)"
                })()} a las ${time}. Gracias por confiar en nosotros.`,
                sender: "bot",
                timestamp: new Date().toISOString(),
                type: "text",
              })
              toast({
                title: "Reserva Exitosa",
                description: "Tu reunión ha sido programada con éxito.",
                variant: "default",
              })

              setTimeout(() => {
                addMessage({
                  id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
                  conversation_id: getConversationId(),
                  content:
                    "Mario se pondrá en contacto contigo antes de la reunión para confirmar los detalles. ¡Nos vemos pronto!",
                  sender: "bot",
                  timestamp: new Date().toISOString(),
                  type: "text",
                })
              }, 2000)

              console.log("✅ Master: Meeting scheduled and saved:", savedMeeting)
            } catch (error) {
              console.error("❌ Master: Error saving meeting:", error)
              addMessage({
                id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
                conversation_id: getConversationId(),
                content:
                  "Hubo un error al guardar tu reunión, pero hemos registrado tu preferencia. Mario se pondrá en contacto contigo para confirmar los detalles.",
                sender: "bot",
                timestamp: new Date().toISOString(),
                type: "text",
              })
              toast({
                title: "Error al Reservar",
                description: error.message || "No se pudo programar la reunión.",
                variant: "destructive",
              }) // Using toast directly
            } finally {
              setIsSubmitting(false)
            }
          }
        } else if (action.startsWith("contact_")) {
          const contactOptions = {
            contact_telegram: "https://t.me/marioverdu",
            contact_x: "https://x.com/marioverdu",
            contact_email: "mailto:marioverdugambin@gmail.com",
          }
          const url = contactOptions[action as keyof typeof contactOptions]
          if (url) {
            window.open(url, "_blank")
          }
        } else if (action === "contactarConMario") {
          addMessage({
            id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            conversation_id: getConversationId(),
            content:
              "Escribe tu mensaje y será leído a la menor brevedad posible o contacta a través de redes",
            sender: "bot",
            timestamp: new Date().toISOString(),
            type: "quick-reply",
            metadata: {
              options: [
                { id: "contact_telegram", text: "Contactar por telegram", action: "contact_telegram" },
                { id: "contact_x", text: "Contactar por x", action: "contact_x" },
                { id: "contact_email", text: "Contactar por correo electrónico", action: "contact_email" },
              ],
            },
          })
          break
        } else {
          console.log("⚠️ Master: Unhandled action:", action)
        }
        break
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Detectar si el último mensaje del bot es el de contacto
    const lastBotMsg = messages.slice().reverse().find(m => m.sender === "bot")
    const isContactFlow = lastBotMsg && lastBotMsg.content.includes("Escribe tu mensaje y será leído a la menor brevedad posible")

    if (isContactFlow) {
      // Añadir mensaje del usuario
      addMessage({
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        conversation_id: getConversationId(),
        content: inputValue,
        sender: "user",
        timestamp: new Date().toISOString(),
        type: "text",
      })
      setIsSubmitting(true)
      try {
        const res = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: inputValue }),
        })
        const data = await res.json()
        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: data.message || "Gracias. Su mensaje será revisado a la menor brevedad posible",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "text",
        })
      } catch (err) {
        addMessage({
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          conversation_id: getConversationId(),
          content: "Ha ocurrido un error al enviar el mensaje. Inténtalo de nuevo más tarde.",
          sender: "bot",
          timestamp: new Date().toISOString(),
          type: "text",
        })
      }
      setIsSubmitting(false)
      setInputValue("")
      return
    }
    // Si estamos en el paso de descripción del proyecto, no añadir mensaje de usuario normal, sino disparar el quickreply especial
    if (flowState.step === "project_description") {
      addMessage({
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        conversation_id: getConversationId(),
        content: inputValue,
        sender: "user",
        timestamp: new Date().toISOString(),
        type: "text",
      })
      handleQuickReply("project_description_submitted", inputValue)
      return setInputValue("")
    }
    addMessage({
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      conversation_id: getConversationId(),
      content: inputValue,
      sender: "user",
      timestamp: new Date().toISOString(),
      type: "text",
    })
    if (inputValue.trim().toLowerCase() === "contactar con mario") {
      handleQuickReply("contactarConMario", "Contactar con Mario")
    }
    setInputValue("")
  }

  const ensureUniqueConversationId = () => getConversationId()

  const getPositionClasses = () => {
    const positions = {
      "bottom-right": "bottom-4 right-4",
      "bottom-left": "bottom-4 left-4",
      "top-right": "top-4 right-4",
      "top-left": "top-4 left-4",
    }
    return positions[buttonPosition]
  }

  // Función helper para detectar si estamos en desarrollo
  const isDevelopment = () => {
    return process.env.NODE_ENV === "development" ||
      (typeof window !== "undefined" && 
       (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"))
  }

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-4 left-0 right-0 z-[999] block sm:hidden"
          style={{ marginLeft: 16, marginRight: 16 }}
        >
          <div
            className="chat-tuenti-window bg-white rounded-xl shadow-xl border flex flex-col"
            style={{
              width: "100%",
              height: "358px",
              maxWidth: "100%",
              maxHeight: "369px",
              minWidth: 0,
              minHeight: "369px",
              boxSizing: "border-box",
              overflow: "hidden",
              transform: "translateY(-44px)",
              ...customStyles,
            }}
          >
            {/* Header del chat */}
            <div 
              className="flex items-center justify-between p-3 border-b border-[#efefef] bg-[#F9FCFF] rounded-t-xl w-full overflow-hidden box-border flex-shrink-0 flex-grow-0" 
              role="banner" 
              style={{ height: 38, maxHeight: 38 }}
            >
              <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                <img 
                  alt="Status" 
                  className="w-[9px] h-[9px] flex-shrink-0" 
                  src="https://assets.marioverdu.com/bg/icon/chat/tuenti-status.svg"
                />
                <span className="font-medium text-[#333333] truncate">marietsBot</span>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                <button 
                  className="p-1 hover:bg-[#f5f5f5] rounded-sm transition-colors" 
                  aria-label="Close chat"
                  onClick={toggleChat}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="lucide lucide-x w-4 h-4 text-[#cccccc]"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-0 pt-3 bg-[#F9FCFF] chat-messages"
              aria-live="polite"
              aria-relevant="additions"
              data-chat-system="integrated"
              style={{
                minHeight: 0,
                marginBottom: 0,
                transform: "none",
                overflow: "auto",
                flexGrow: 1,
                flexShrink: 0,
                boxSizing: "border-box",
                display: "block",
              }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${message.sender === "user" ? "justify-end" : message.sender === "system" ? "justify-center" : "justify-start"}`}
                >
                  {message.sender === "user" ? (
                    <UserBubbleMaster content={message.content} />
                  ) : (
                    <SystemInfoBubbleMaster
                      content={message.content}
                      quickReplies={
                        message.type === "quick-reply" && message.metadata?.options
                          ? message.metadata.options
                          : undefined
                      }
                      onQuickReply={handleQuickReply}
                      isSubmitting={isSubmitting}
                      sender={message.sender}
                    />
                  )}
                </div>
              ))}
              {(isTyping || isSubmitting) && (
                <div className="flex justify-start">
                  <TypingIndicator />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ChatInput siempre visible en el bottom */}
            <ChatInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleSubmit}
              onFocus={ensureUniqueConversationId}
              disabled={isSubmitting}
            />

            {/* Footer de entorno solo para desarrollo */}
            {isDevelopment() && (
              <div className="p-2 border-t">
                <div className="text-xs text-gray-500 text-center">
                  {flowState.systemInfo} | {hasNotifications ? "🔔 notifications" : "waiting"}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Chat Window para breakpoints mayores */}
      {isOpen && (
        <div className="hidden sm:block">
          <div
            className={`chat-tuenti-window fixed ${getPositionClasses()} z-[999] bg-white rounded-xl shadow-xl border w-[369px] h-[358px] flex flex-col`}
            style={{
              width: "369px",
              height: "358px",
              maxWidth: "369px",
              maxHeight: "369px",
              minWidth: "369px",
              minHeight: "369px",
              boxSizing: "border-box",
              overflow: "hidden",
              transform: "translateY(-44px)",
              ...customStyles,
            }}
          >
            {/* Header del chat */}
            <div 
              className="flex items-center justify-between p-3 border-b border-[#efefef] bg-[#F9FCFF] rounded-t-xl w-full overflow-hidden box-border flex-shrink-0 flex-grow-0" 
              role="banner" 
              style={{ height: 38, maxHeight: 38 }}
            >
              <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                <img 
                  alt="Status" 
                  className="w-[9px] h-[9px] flex-shrink-0" 
                  src="https://assets.marioverdu.com/bg/icon/chat/tuenti-status.svg"
                />
                <span className="font-medium text-[#333333] truncate">marietsBot</span>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                <button 
                  className="p-1 hover:bg-[#f5f5f5] rounded-sm transition-colors" 
                  aria-label="Close chat"
                  onClick={toggleChat}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="lucide lucide-x w-4 h-4 text-[#cccccc]"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-0 pt-3 bg-[#F9FCFF] chat-messages"
              aria-live="polite"
              aria-relevant="additions"
              data-chat-system="integrated"
              style={{
                minHeight: 0,
                marginBottom: 0,
                transform: "none",
                overflow: "auto",
                flexGrow: 1,
                flexShrink: 0,
                boxSizing: "border-box",
                display: "block",
              }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${message.sender === "user" ? "justify-end" : message.sender === "system" ? "justify-center" : "justify-start"}`}
                >
                  {message.sender === "user" ? (
                    <UserBubbleMaster content={message.content} />
                  ) : (
                    <SystemInfoBubbleMaster
                      content={message.content}
                      quickReplies={
                        message.type === "quick-reply" && message.metadata?.options
                          ? message.metadata.options
                          : undefined
                      }
                      onQuickReply={handleQuickReply}
                      isSubmitting={isSubmitting}
                      sender={message.sender}
                    />
                  )}
                </div>
              ))}
              {(isTyping || isSubmitting) && (
                <div className="flex justify-start">
                  <TypingIndicator />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ChatInput siempre visible en el bottom */}
            <ChatInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleSubmit}
              onFocus={ensureUniqueConversationId}
              disabled={isSubmitting}
            />

            {/* Footer de entorno solo para desarrollo */}
            {isDevelopment() && (
              <div className="p-2 border-t">
                <div className="text-xs text-gray-500 text-center">
                  {flowState.systemInfo} | {hasNotifications ? "🔔 notifications" : "waiting"}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
