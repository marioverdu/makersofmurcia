"use client"

import { useLanguage } from "@/contexts/language-context"

interface ChatTranslations {
  // Mensajes principales
  initialMessage: string
  chatWithMarioMessage: string
  contactMessage: string
  
  // Botones y opciones
  exploreServices: string
  contactMario: string
  speakWithMario: string
  backToStart: string
  seeAvailablePlans: string
  wantWebLikeThis: string
  
  // Input y UI
  writeMessage: string
  sendMessage: string
  insertEmoji: string
  
  // Contacto
  email: string
  instagram: string
  twitter: string
  
  // Bot name
  botName: string
}

export function useChatTranslations(): ChatTranslations {
  const { currentLanguage } = useLanguage()
  
  const translations: Record<string, ChatTranslations> = {
    es: {
      // Mensajes principales
      initialMessage: "👋 ¡Hola! Soy el asistente virtual de Mario Verdú. ¿En qué puedo ayudarte hoy?",
      chatWithMarioMessage: "👨‍💻 ¡Hola! Soy Mario. Estoy aquí para responder tus preguntas personalmente. ¿En qué puedo ayudarte hoy?",
      contactMessage: "¡Hola! Puedes contactar con Mario Verdú a través de las siguientes opciones:",
      
      // Botones y opciones
      exploreServices: "Explorar servicios v2",
      contactMario: "Contactar con Mario",
      speakWithMario: "Hablar con Mario",
      backToStart: "Volver al inicio",
      seeAvailablePlans: "Ver planes disponibles",
      wantWebLikeThis: "Quiero una web así",
      
      // Input y UI
      writeMessage: "Escribe tu mensaje...",
      sendMessage: "Enviar mensaje",
      insertEmoji: "Insertar emoji",
      
      // Contacto
      email: "Email",
      instagram: "Instagram",
      twitter: "Twitter",
      
      // Bot name
      botName: "Mario Verdú"
    },
    en: {
      // Mensajes principales
      initialMessage: "👋 Hello! I'm Mario Verdú's virtual assistant. How can I help you today?",
      chatWithMarioMessage: "👨‍💻 Hello! I'm Mario. I'm here to answer your questions personally. How can I help you today?",
      contactMessage: "Hello! You can contact Mario Verdú through the following options:",
      
      // Botones y opciones
      exploreServices: "Explore services v2",
      contactMario: "Contact Mario",
      speakWithMario: "Speak with Mario",
      backToStart: "Back to start",
      seeAvailablePlans: "See available plans",
      wantWebLikeThis: "I want a website like this",
      
      // Input y UI
      writeMessage: "Type your message...",
      sendMessage: "Send message",
      insertEmoji: "Insert emoji",
      
      // Contacto
      email: "Email",
      instagram: "Instagram",
      twitter: "Twitter",
      
      // Bot name
      botName: "Mario Verdú"
    }
  }
  
  return translations[currentLanguage] || translations.es
}
