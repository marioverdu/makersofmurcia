"use client"

import { X, RotateCcw } from "lucide-react"

interface ChatHeaderProps {
  robustToggleChat: () => void
}

export function ChatHeader({ robustToggleChat }: ChatHeaderProps) {
  return (
    <div
      className="flex items-center justify-between p-3 border-b border-[#efefef] bg-[#F9FCFF] rounded-t-xl w-full overflow-hidden box-border flex-shrink-0 flex-grow-0"
      style={{ height: "38px", maxHeight: "38px" }}
      role="banner"
    >
      <div className="flex items-center gap-2 min-w-0 overflow-hidden">
        <img
          src="https://assets.marioverdu.com/bg/icon/chat/tuenti-status.svg"
          alt="Status"
          className="w-[9px] h-[9px] flex-shrink-0"
        />
        <span className="font-medium text-[#333333] truncate">marietsBot</span>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0 ml-2">
        <button
          onClick={robustToggleChat}
          className="p-1 hover:bg-[#f5f5f5] rounded-sm transition-colors"
          aria-label="Close chat"
        >
          <X className="w-4 h-4 text-[#cccccc]" />
        </button>
      </div>
    </div>
  )
}
