export interface Message {
  id: string
  content: string
  sender: "user" | "bot" | "system"
  timestamp: Date
  type?: "text" | "quick-reply" | "soundcloud" | "youtube" | "image" | "system"
  metadata?: {
    url?: string
    options?: QuickReplyOption[]
  }
}

export interface QuickReplyOption {
  id: string
  text: string
  action: string
}

export interface ChatState {
  isOpen: boolean
  messages: Message[]
  inputValue: string
  isTyping: boolean
  currentFlow: string
  isBlinking: boolean
  hasInteracted: boolean
  isKeyboardOpen: boolean
  deviceType: DeviceType
  warningShown: boolean
  welcomeMessageShown: boolean
  responses: Record<string, string>
  restrictedUsers: Record<string, Date>
}

export type DeviceType = "phone" | "tablet" | "desktop"

export interface ChatTuentiProps {
  buttonPosition?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  initialMessage?: string
  avatarSrc?: string
  botName?: string
  customStyles?: Record<string, string>
  isMobile?: boolean
}

export interface PatternMatch {
  type: string | null
  plan?: string
  matched: boolean
}

export interface ChatFlow {
  initial: string
  quickReplies: QuickReplyOption[]
  soundcloud?: string
  youtube?: string
  content?: string
  image?: string
}
