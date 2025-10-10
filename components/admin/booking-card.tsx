"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Trash, AlertTriangle, Ban } from "lucide-react"
import { Dialog } from "@/components/ui/dialog"
import { useState, useEffect } from "react"

interface UserFlag {
  id: number
  flag_type: "pesado" | "rechazado_reincidente"
  expires_at: string
  created_at: string
}

interface Proposal {
  id: number
  proposal_id: string
  service: string
  project_type: string
  product_type: string
  screens: number
  price: number
  plan_name: string
  payment: string
  budget: string
  status: string
  created_at: string
  updated_at?: string
  ip_address: string
  user_agent: string
  url: string
  conversation_data: any // Keep as any for flexible parsing
  user_flags?: UserFlag[]
  last_chat_activity?: string
}

interface BookingCardProps {
  proposals: Proposal[]
  title: string
  onStatusUpdate: (proposalId: string, newStatus: string) => Promise<void>
  onDelete: (proposalId: string) => Promise<void>
  showActions: boolean
}

function getBrowserFromUserAgent(userAgent: string): string {
  if (userAgent.includes("Chrome")) return "Chrome"
  if (userAgent.includes("Firefox")) return "Firefox"
  if (userAgent.includes("Safari")) return "Safari"
  if (userAgent.includes("Edge")) return "Edge"
  return "Unknown"
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function extractDescription(conversationData: any): string | null {
  if (!conversationData) return null

  try {
    let data = conversationData
    if (typeof conversationData === "string") {
      try {
        data = JSON.parse(conversationData)
      } catch (parseError) {
        console.error("Error parsing conversationData string:", parseError)
        return null
      }
    }

    if (data.projectDescription) return data.projectDescription
    if (data.responses?.projectDescription) return data.responses.projectDescription
    if (data.description) return data.description
    if (data.userDescription) return data.userDescription

    if (data.messages && Array.isArray(data.messages)) {
      // Find the last user message that is long enough to be a description
      for (let i = data.messages.length - 1; i >= 0; i--) {
        const message = data.messages[i]
        if (message.sender === "user" && message.content && message.content.length > 50) {
          return message.content
        }
      }
    }

    return null
  } catch (error) {
    console.error("Error processing conversation data for description:", error)
    return null
  }
}

function getDaysRemaining(expiresAt: string): number {
  const expiration = new Date(expiresAt)
  const now = new Date()
  const diffTime = expiration.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}

function FlagBadge({ flag }: { flag: UserFlag }) {
  const daysRemaining = getDaysRemaining(flag.expires_at)
  const flagConfig = {
    pesado: {
      label: "Pesado",
      color: "bg-orange-500 hover:bg-orange-600",
      icon: AlertTriangle,
    },
    rechazado_reincidente: {
      label: "Rechazado Reincidente",
      color: "bg-red-500 hover:bg-red-600",
      icon: Ban,
    },
  }

  const config = flagConfig[flag.flag_type]
  const Icon = config.icon

  return (
    <Badge className={`${config.color} text-white text-xs`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label} ({daysRemaining}d)
    </Badge>
  )
}

export default function BookingCard({ proposals, title, onStatusUpdate, onDelete, showActions }: BookingCardProps) {
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set())
  const [isLocalhost, setIsLocalhost] = useState(false)
  const [openChatId, setOpenChatId] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState<any[]>([])
  const [isLoadingChat, setIsLoadingChat] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname
      setIsLocalhost(host === "localhost" || host === "127.0.0.1")
    }
  }, [])

  useEffect(() => {
    const loadChatHistory = async () => {
      if (openChatId) {
        setIsLoadingChat(true)
        try {
          // Buscar el conversationId real en la propuesta
          const proposal = proposals.find((p) => p.proposal_id === openChatId)
          let conversationId = null
          if (proposal?.conversation_data) {
            const data =
              typeof proposal.conversation_data === "string"
                ? JSON.parse(proposal.conversation_data)
                : proposal.conversation_data
            conversationId =
              data.conversationId ||
              data.conversation_id ||
              data.responses?.conversationId ||
              data.allResponses?.conversationId
          }
          if (!conversationId) {
            setChatMessages([])
            setDebugInfo({
              error: "No se encontró conversationId en la propuesta.",
              proposalData: proposal?.conversation_data,
            })
            setIsLoadingChat(false)
            return
          }
          const response = await fetch(`/api/chat-conversations/${conversationId}`)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          const data = await response.json()
          setChatMessages(data)
          setDebugInfo({ conversationId, messagesCount: data.length })
        } catch (error) {
          console.error("Error loading chat history:", error)
          setChatMessages([])
          let errorMsg = "Error desconocido"
          if (error instanceof Error) errorMsg = error.message
          setDebugInfo({ error: errorMsg })
        } finally {
          setIsLoadingChat(false)
        }
      }
    }
    loadChatHistory()
  }, [openChatId, proposals])

  const handleOpenChat = (proposal: Proposal) => {
    setOpenChatId(proposal.proposal_id)
  }

  const handleStatusUpdate = async (proposalId: string, status: string) => {
    setProcessingIds((prev) => new Set(prev).add(proposalId))
    try {
      console.log("🎯 Admin: Updating proposal status:", { proposalId, status })

      // Actualizar el estado de la propuesta
      await onStatusUpdate(proposalId, status)

      // Crear notificación en la base de datos
      const notificationMessage =
        status === "approved"
          ? "¡Excelente! Tu propuesta ha sido aprobada por Mario. Ahora puedes continuar con el siguiente paso."
          : "Tu propuesta ha sido revisada y no ha sido aprobada en esta ocasión. Puedes contactar con Mario para más información."

      console.log("🔔 Admin: Creating notification:", { proposalId, status, notificationMessage })

      try {
        const notificationResponse = await fetch("/api/chat-notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            proposalId,
            status,
            message: notificationMessage,
          }),
        })

        if (!notificationResponse.ok) {
          const errorData = await notificationResponse.json()
          throw new Error(
            `Failed to create notification: ${notificationResponse.status} - ${errorData.details || notificationResponse.statusText}`,
          )
        }

        const notificationResult = await notificationResponse.json()
        console.log("🔔 Admin: Notification created successfully:", notificationResult)
      } catch (notificationError) {
        console.error("🔔 Admin: Error creating notification:", notificationError)
      }

      // También enviar mensaje directo al chat (método alternativo)
      const proposal = proposals.find((p) => p.proposal_id === proposalId)
      if (proposal?.conversation_data) {
        let conversationId = null
        try {
          const data =
            typeof proposal.conversation_data === "string"
              ? JSON.parse(proposal.conversation_data)
              : proposal.conversation_data
          conversationId =
            data.conversationId ||
            data.conversation_id ||
            data.responses?.conversationId ||
            data.allResponses?.conversationId
        } catch (parseError) {
          console.error("Error parsing conversation_data for direct chat message:", parseError)
        }

        if (conversationId) {
          try {
            console.log("💬 Admin: Sending direct chat message to conversation:", conversationId)

            await fetch(`/api/chat-conversations/${conversationId}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                sender: "system",
                content: notificationMessage,
                type: "text",
                timestamp: new Date().toISOString(),
              }),
            })

            console.log("💬 Admin: Direct chat message sent successfully")
          } catch (chatError) {
            console.error("💬 Admin: Error sending direct chat message:", chatError)
          }
        }
      }
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(proposalId)
        return newSet
      })
    }
  }

  const handleDelete = async (proposalId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta propuesta?")) {
      return
    }

    setProcessingIds((prev) => new Set(prev).add(proposalId))
    try {
      await onDelete(proposalId)
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(proposalId)
        return newSet
      })
    }
  }

  if (proposals.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No hay propuestas en esta categoría</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        {proposals.map((proposal) => {
          const description = extractDescription(proposal.conversation_data)
          const browser = getBrowserFromUserAgent(proposal.user_agent)
          const hasFlags = proposal.user_flags && proposal.user_flags.length > 0
          const isFlagged = hasFlags
          const isProcessing = processingIds.has(proposal.proposal_id)

          return (
            <Card
              key={proposal.id}
              className={`hover:shadow-md transition-shadow ${
                isFlagged ? "border-l-4 border-l-red-500 bg-red-50/30" : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-base">
                      {proposal.plan_name} - {proposal.service}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">ID: {proposal.proposal_id}</p>
                  </div>
                  <div className="flex flex-col items-end text-xs text-gray-500">
                    <div>{formatDate(proposal.created_at)}</div>
                    <div className="mt-1">🌐 {browser}</div>
                    {hasFlags && (
                      <div className="flex gap-1 mt-2">
                        {proposal.user_flags!.map((flag) => (
                          <FlagBadge key={flag.id} flag={flag} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p>
                      <span className="font-medium">Servicio:</span> {proposal.service}
                    </p>
                    <p>
                      <span className="font-medium">Tipo:</span> {proposal.project_type}
                    </p>
                    <p>
                      <span className="font-medium">Producto:</span> {proposal.product_type}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-medium">Pantallas:</span> {proposal.screens}
                    </p>
                    <p>
                      <span className="font-medium">Precio:</span> {proposal.price}€
                    </p>
                    <p>
                      <span className="font-medium">Pago:</span> {proposal.payment}
                    </p>
                    {description && (
                      <p>
                        <span className="font-medium">Descripción:</span> {description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-500">
                  <p>
                    <span className="font-medium">IP:</span> {proposal.ip_address}
                  </p>
                  <p>
                    <span className="font-medium">URL:</span> {proposal.url}
                  </p>
                </div>

                {showActions && (
                  <div className="flex gap-2 pt-4 border-t mt-4">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleStatusUpdate(proposal.proposal_id, "approved")}
                      disabled={isProcessing}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      {isProcessing ? "Procesando..." : "Aprobar"}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleStatusUpdate(proposal.proposal_id, "rejected")}
                      disabled={isProcessing}
                    >
                      <X className="w-4 h-4 mr-1" />
                      {isProcessing ? "Procesando..." : "Rechazar"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="ml-auto bg-transparent"
                      onClick={() => handleDelete(proposal.proposal_id)}
                      disabled={isProcessing}
                    >
                      <Trash className="w-4 h-4 mr-1" />
                      {isProcessing ? "Eliminando..." : "Eliminar"}
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => handleOpenChat(proposal)}>
                      🗨️ Ver chat
                    </Button>
                  </div>
                )}
                {openChatId === proposal.proposal_id && (
                  <Dialog open={true} onOpenChange={() => setOpenChatId(null)}>
                    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative max-h-[80vh] overflow-y-auto">
                        <button
                          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
                          onClick={() => setOpenChatId(null)}
                          aria-label="Cerrar"
                        >
                          ×
                        </button>
                        <h3 className="text-lg font-semibold mb-4">Histórico de chat</h3>
                        <div className="mb-4 p-3 bg-gray-100 rounded text-xs">
                          <details>
                            <summary className="cursor-pointer font-medium">Debug Info</summary>
                            <pre className="mt-2 whitespace-pre-wrap">{JSON.stringify(debugInfo, null, 2)}</pre>
                          </details>
                        </div>
                        <div className="max-h-96 overflow-y-auto space-y-2">
                          {isLoadingChat ? (
                            <p className="text-gray-500 text-sm">Cargando mensajes...</p>
                          ) : chatMessages.length === 0 ? (
                            <p className="text-gray-500 text-sm">No hay mensajes guardados en esta conversación.</p>
                          ) : (
                            chatMessages.map((msg, idx) => (
                              <div
                                key={idx}
                                className={`p-2 rounded ${msg.sender === "user" ? "bg-blue-50 text-blue-900" : "bg-gray-100 text-gray-600"}`}
                              >
                                <div className="text-xs mb-1 font-medium">
                                  {msg.sender === "user" ? "Usuario" : "Sistema"}
                                </div>
                                <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                                {msg.timestamp && (
                                  <div className="text-[10px] text-gray-400 mt-1">
                                    {new Date(msg.timestamp).toLocaleString()}
                                  </div>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </Dialog>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
