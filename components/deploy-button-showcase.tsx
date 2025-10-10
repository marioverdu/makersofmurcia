"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import ButtonDeployAnimationV3 from "./button-deploy-animation-v3"

interface DeployButtonShowcaseProps {
  className?: string
  style?: React.CSSProperties
}

export default function DeployButtonShowcase({ className = "", style = {} }: DeployButtonShowcaseProps) {
  const [state, setState] = useState<"initial" | "loading" | "deployed">("initial")
  const [cursorState, setCursorState] = useState<"arrow" | "pointer" | "clicking">("arrow")
  const [showCursor, setShowCursor] = useState(true)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  // Automatic state cycling in a continuous loop
  useEffect(() => {
    let isActive = true
    let timeoutIds: number[] = []

    const clearAllTimeouts = () => {
      timeoutIds.forEach((id) => clearTimeout(id))
      timeoutIds = []
    }

    const cycleStates = () => {
      if (!isActive) return

      // Clear any existing timeouts to prevent multiple loops
      clearAllTimeouts()

      // Reset to initial state
      setState("initial")
      setShowCursor(true)
      setCursorState("arrow")

      if (cursorRef.current && buttonRef.current) {
        // Position cursor away from button
        cursorRef.current.style.transform = "translate(100px, -50px)"
        cursorRef.current.style.opacity = "1"

        // Move cursor toward button
        const t1 = setTimeout(() => {
          if (!isActive) return
          if (cursorRef.current) {
            cursorRef.current.style.transform = "translate(0, 0)"
            cursorRef.current.style.transition = "transform 1s ease-in-out"
          }
        }, 500)
        timeoutIds.push(t1)

        // Change to pointer when hovering button
        const t2 = setTimeout(() => {
          if (!isActive) return
          setCursorState("pointer")
        }, 1500)
        timeoutIds.push(t2)

        // Simulate click
        const t3 = setTimeout(() => {
          if (!isActive) return
          setCursorState("clicking")
        }, 1800)
        timeoutIds.push(t3)

        // Hide cursor and change to loading state
        const t4 = setTimeout(() => {
          if (!isActive) return
          setCursorState("pointer")
          setShowCursor(false)
          setState("loading")

          // After 2s in loading state, change to deployed state
          const t5 = setTimeout(() => {
            if (!isActive) return
            setState("deployed")

            // After 2s in deployed state, reset to initial state
            const t6 = setTimeout(() => {
              if (!isActive) return
              cycleStates() // Restart the cycle
            }, 2000)
            timeoutIds.push(t6)
          }, 2000)
          timeoutIds.push(t5)
        }, 2200)
        timeoutIds.push(t4)
      }
    }

    // Start the cycle immediately
    cycleStates()

    // Cleanup on unmount
    return () => {
      isActive = false
      clearAllTimeouts()
    }
  }, [])

  const isLoading = state === "loading"
  const isDeployed = state === "deployed"

  return (
    <div
      className={`relative w-full aspect-video rounded-[12px] overflow-hidden bg-[#f5f5f5] flex items-center justify-center ${className}`}
      style={style}
    >
      <ButtonDeployAnimationV3 />
    </div>
  )
}
