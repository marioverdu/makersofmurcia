"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { useChatTranslations } from "@/hooks/use-chat-translations"

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  onFocus: () => void
  disabled?: boolean
}

export function ChatInput({ value, onChange, onSubmit, onFocus, disabled }: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const t = useChatTranslations()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`

      const contentHeight = inputRef.current.scrollHeight
      const minBorderRadius = 6
      const maxBorderRadius = 20
      const heightThreshold = 80

      let borderRadius =
        maxBorderRadius -
        Math.max(0, Math.min(1, (contentHeight - 40) / heightThreshold)) * (maxBorderRadius - minBorderRadius)
      borderRadius = Math.max(minBorderRadius, Math.min(maxBorderRadius, borderRadius))

      inputRef.current.style.borderRadius = `${borderRadius}px`
    }
  }, [value])

  return (
    <div className="p-3 border-t border-gray-200 bg-[#ffffff]">
      <form onSubmit={onSubmit} className="relative w-full">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            e.target.style.height = "auto"
            e.target.style.height = `${e.target.scrollHeight}px`

            const contentHeight = e.target.scrollHeight
            const minBorderRadius = 6
            const maxBorderRadius = 20
            const heightThreshold = 80

            let borderRadius =
              maxBorderRadius -
              Math.max(0, Math.min(1, (contentHeight - 40) / heightThreshold)) * (maxBorderRadius - minBorderRadius)
            borderRadius = Math.max(minBorderRadius, Math.min(maxBorderRadius, borderRadius))

            e.target.style.borderRadius = `${borderRadius}px`
          }}
          onFocus={onFocus}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (value.trim().length > 0 && !disabled) {
                // Crea un evento falso de formulario para onSubmit
                const fakeEvent = { ...e, preventDefault: () => {} } as unknown as React.FormEvent;
                onSubmit(fakeEvent);
              }
            }
          }}
          className="w-full pr-20 border border-gray-300 focus:outline-none focus:ring-0 focus:border-primary resize-none min-h-[40px] px-4 py-2 bg-white text-black overflow-hidden"
          style={{ borderRadius: "20px", transition: "border-radius 0.3s ease" }}
          placeholder={t.writeMessage}
          autoFocus={false}
          rows={1}
          aria-label={t.writeMessage}
          disabled={disabled}
        />

        <button
          type="button"
          disabled
          className="absolute right-12 top-1/2 -translate-y-1/2 rounded-full border-gray-300 h-8 w-8 flex items-center justify-center p-[1px] transition-transform active:scale-95 bg-transparent hover:bg-gray-100 opacity-50 cursor-not-allowed"
          aria-label={t.insertEmoji}
          style={{ top: "calc(50% - 4px)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </button>

        <button
          type="submit"
          disabled={!value.trim() || disabled}
          className="absolute right-2 top-[50%] -translate-y-1/2 rounded-full bg-[#3D5B6A] hover:bg-[#3D5B6A] h-8 w-8 flex items-center justify-center p-[1px] transition-transform active:scale-95 disabled:cursor-not-allowed text-white opacity-100"
          aria-label={t.sendMessage}
          style={{ top: "calc(50% - 4px)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14m-4 -4l4 4l-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </form>
    </div>
  )
}
