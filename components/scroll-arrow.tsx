"use client"

import { motion } from "framer-motion"

interface ScrollArrowProps {
  className?: string
  color?: string
}

export default function ScrollArrow({ className = "", color = "currentColor" }: ScrollArrowProps) {
  return (
    <div className={className}>
      <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M12 4 L12 16 M12 16 L7 11 M12 16 L17 11"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ y: 0, opacity: 0.2 }}
          animate={{
            y: [0, 8, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </div>
  )
}
