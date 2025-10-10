"use client"

import type React from "react"
import Link from "next/link"
// import { PrimaryButton } from "@/components/ui/buttons"

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  disabled?: boolean
  hideOnFirstStep?: boolean
  currentStep?: number
}

export function SecondaryButton({
  children,
  href,
  onClick,
  className = "",
  disabled = false,
  hideOnFirstStep = false,
  currentStep = 0,
}: ButtonProps) {
  // Si hideOnFirstStep es true y currentStep es 0, no renderizar el botón
  if (hideOnFirstStep && currentStep === 0) {
    return null
  }

  // The button content to be used in both cases
  const buttonContent = (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 border-2 border-[#3D5B6A] text-[#3D5B6A] text-[15.2px] font-medium rounded-[6px] relative before:absolute before:content-[''] before:rounded-[6px] before:border-2 before:border-[#3D5B6A] before:-top-[3px] before:-left-[3px] before:-right-[3px] before:-bottom-[3px] before:opacity-0 hover:before:opacity-100 before:transition-opacity ${className}`}
    >
      {children}
    </button>
  )

  // If href is provided, wrap in Link
  if (href) {
    return <Link href={href}>{buttonContent}</Link>
  }

  // Return the button directly
  return buttonContent
}
