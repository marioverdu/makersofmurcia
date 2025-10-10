export interface ChatMessage {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "system" | "error"
}

export function addMessage(
  messages: ChatMessage[],
  content: string,
  sender: "user" | "bot",
  type: "text" | "system" | "error" = "text",
): ChatMessage[] {
  const newMessage: ChatMessage = {
    id: generateMessageId(),
    content,
    sender,
    timestamp: new Date(),
    type,
  }

  return [...messages, newMessage]
}

export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function formatMessageTime(timestamp: Date): string {
  return timestamp.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

export function getLastMessage(messages: ChatMessage[]): ChatMessage | null {
  return messages.length > 0 ? messages[messages.length - 1] : null
}

export function filterMessagesByType(messages: ChatMessage[], type: "text" | "system" | "error"): ChatMessage[] {
  return messages.filter((message) => message.type === type)
}

export function clearMessages(): ChatMessage[] {
  return []
}
