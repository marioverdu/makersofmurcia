export interface Message {
  id: string
  conversation_id: string
  sender: string
  content: string
  type:
    | "text"
    | "image"
    | "system"
    | "button"
    | "link"
    | "booking_request"
    | "booking_confirmation"
    | "booking_rejection"
    | "quick-reply"
  timestamp: string
  metadata?: {
    options?: Array<{
      id: string
      text: string
      action: string
    }>
    [key: string]: any
  }
}
