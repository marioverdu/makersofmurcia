"use client"

import React from "react"

import { Send } from "lucide-react"

interface ChatFooterProps {
  deviceType: "phone" | "tablet" | "desktop"
  inputValue: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  ensureUniqueConversationId: () => string
  inputRef: React.RefObject<HTMLTextAreaElement>
}

export function ChatFooter({ deviceType, inputValue, handleInputChange, handleSubmit, ensureUniqueConversationId, inputRef }: ChatFooterProps) {
  // Permite enviar con Enter (sin Shift)
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim().length > 0) {
        handleSubmit(e as any);
      }
    }
  };

  return (
    <form className="relative w-full" onSubmit={handleSubmit} autoComplete="off">
      <textarea
        ref={inputRef}
        className="w-full pr-20 border border-gray-300 focus:outline-none focus:ring-0 focus:border-primary resize-none min-h-[40px] px-4 py-2 bg-white text-black overflow-hidden"
        placeholder="Escribe tu mensaje..."
        rows={1}
        aria-label="Type a message"
        style={{ borderRadius: 20, transition: 'border-radius 0.3s', height: 40 }}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
      />
      <button
        type="submit"
        className="absolute right-2 top-[50%] -translate-y-1/2 rounded-full bg-[#3D5B6A] hover:bg-[#3D5B6A] h-8 w-8 flex items-center justify-center p-[1px] transition-transform active:scale-95 disabled:cursor-not-allowed text-white opacity-100"
        aria-label="Send message"
        style={{ top: 'calc(50% - 4px)' }}
        disabled={inputValue.trim().length === 0}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-4 -4l4 4l-4 4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
      </button>
    </form>
  );
}
