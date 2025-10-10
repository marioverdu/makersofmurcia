"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface MouseAnimationProps {
  color?: string
  backgroundColor?: string
  duration?: number
  className?: string
}

export default function MouseAnimation({
  color = "hsl(206,1%,27%)",
  backgroundColor = "#ffffff",
  duration = 1.5,
  className = "",
}: MouseAnimationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  // Calculamos las dimensiones para mantener la proporción 1:1.6 dentro de 40x40
  const mouseWidth = 20 // Ancho del mouse ajustado para caber en 40px
  const mouseHeight = mouseWidth * 1.6 // Mantiene la proporción 1:1.6
  const buttonWidth = mouseWidth / 3 // 1/3 del ancho del mouse
  const buttonHeight = mouseWidth / 5 // 1/5 del ancho del mouse
  const arrowSize = mouseWidth / 3 // 1/3 del ancho del mouse

  return (
    <div className={`mouse-animation ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ minWidth: 40, minHeight: 40 }}
      >
        {/* Mouse body - centrado en el viewBox de 40x40 */}
        <rect
          x={(40 - mouseWidth) / 2}
          y={(40 - mouseHeight) / 2}
          width={mouseWidth}
          height={mouseHeight}
          rx={mouseWidth / 2}
          stroke={color}
          strokeWidth="2"
          fill={backgroundColor}
        />

        {/* Mouse button */}
        <rect
          x={(40 - buttonWidth) / 2}
          y={(40 - mouseHeight) / 2 + 4}
          width={buttonWidth}
          height={buttonHeight}
          rx={buttonHeight / 2}
          fill={color}
          fillOpacity="0.5"
        />

        {/* Animated arrow */}
        <motion.g
          initial={{ y: 0, opacity: 0.2 }}
          animate={{
            y: [0, 6, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <path
            d={`M${20} ${(40 - mouseHeight) / 2 + 12}
               L${20} ${(40 - mouseHeight) / 2 + 12 + arrowSize}
               M${20} ${(40 - mouseHeight) / 2 + 12 + arrowSize}
               L${20 - arrowSize / 2} ${(40 - mouseHeight) / 2 + 12 + arrowSize / 2}
               M${20} ${(40 - mouseHeight) / 2 + 12 + arrowSize}
               L${20 + arrowSize / 2} ${(40 - mouseHeight) / 2 + 12 + arrowSize / 2}`}
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </motion.g>
      </svg>
    </div>
  )
}
