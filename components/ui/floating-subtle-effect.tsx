"use client"

import { motion } from "framer-motion"
import type React from "react"

interface FloatingSubtleEffectProps {
  children?: React.ReactNode
  className?: string
  duration?: number
  distance?: number
  delay?: number
  color?: string
  shadow?: boolean
  gradient?: boolean
}

export function FloatingSubtleEffect({
  children,
  className = "",
  duration = 6,
  distance = 10,
  delay = 0,
  color = "rgba(0,94,182,0.1)", // Cambiado a color/support
  shadow = true,
  gradient = true,
}: FloatingSubtleEffectProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden rounded-[6px] ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: color,
          boxShadow: shadow ? "0 10px 30px rgba(0, 0, 0, 0.1)" : "none",
        }}
        animate={{
          y: [-distance / 2, distance / 2, -distance / 2],
        }}
        transition={{
          duration: duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: delay,
        }}
      />

      {gradient && <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/10" />}

      {children && <div className="relative z-10 w-full h-full flex items-center justify-center">{children}</div>}
    </div>
  )
}
