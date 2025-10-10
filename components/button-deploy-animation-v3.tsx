"use client"

import { useState, useEffect, useRef } from "react"

interface ButtonDeployAnimationV3Props {
  className?: string
}

export default function ButtonDeployAnimationV3({ className = "" }: ButtonDeployAnimationV3Props) {
  const [state, setState] = useState<"initial" | "loading" | "deployed">("initial")
  const [cursorState, setCursorState] = useState<"arrow" | "pointer" | "clicking">("arrow")
  const [showCursor, setShowCursor] = useState(true)
  const [cursorPosition, setCursorPosition] = useState({ x: 100, y: -50 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const animationRef = useRef<number>(0)
  const lastStateChangeRef = useRef<number>(Date.now())

  // Reset animation if it gets stuck
  useEffect(() => {
    const checkInterval = setInterval(() => {
      const now = Date.now()
      const timeSinceLastChange = now - lastStateChangeRef.current

      // If no state change for 5 seconds, force restart
      if (timeSinceLastChange > 5000) {
        console.log("Animation appears stuck, restarting...")
        startAnimation()
      }
    }, 1000)

    return () => clearInterval(checkInterval)
  }, [])

  // Animation sequence
  const startAnimation = () => {
    // Clear any existing animation
    if (animationRef.current) {
      clearTimeout(animationRef.current)
    }

    // Reset to initial state
    setState("initial")
    setCursorState("arrow")
    setShowCursor(true)
    setCursorPosition({ x: 100, y: -50 })
    lastStateChangeRef.current = Date.now()

    // Step 1: Move cursor toward button
    animationRef.current = window.setTimeout(() => {
      setCursorPosition({ x: 0, y: 0 })
      lastStateChangeRef.current = Date.now()

      // Step 2: Change cursor to pointer
      animationRef.current = window.setTimeout(() => {
        setCursorState("pointer")
        lastStateChangeRef.current = Date.now()

        // Step 3: Simulate click
        animationRef.current = window.setTimeout(() => {
          setCursorState("clicking")
          lastStateChangeRef.current = Date.now()

          // Step 4: Start loading
          animationRef.current = window.setTimeout(() => {
            setState("loading")
            setShowCursor(false)
            lastStateChangeRef.current = Date.now()

            // Step 5: Show deployed state
            animationRef.current = window.setTimeout(() => {
              setState("deployed")
              lastStateChangeRef.current = Date.now()

              // Step 6: Restart animation
              animationRef.current = window.setTimeout(() => {
                startAnimation()
              }, 1500)
            }, 1500)
          }, 400)
        }, 300)
      }, 800)
    }, 500)
  }

  // Start animation on mount
  useEffect(() => {
    startAnimation()

    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current)
      }
    }
  }, [])

  const isLoading = state === "loading"
  const isDeployed = state === "deployed"

  return (
    <div
      className={`w-full h-full rounded-[12px] overflow-hidden relative flex items-center justify-center ${className}`}
      style={{ background: "rgb(247, 248, 252)" }}
    >
      {/* macOS Cursor animation */}
      {showCursor && (
        <div
          className="absolute pointer-events-none z-10"
          style={{
            width: "24px",
            height: "24px",
            transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
            transition: "transform 1s ease-in-out, opacity 0.3s ease",
            transformOrigin: "top left",
          }}
        >
          {cursorState === "arrow" && (
            <img src="https://assets.marioverdu.com/bg/icon/cursor/Arrow.svg" alt="Cursor" width="24" height="24" />
          )}
          {cursorState === "pointer" && (
            <img src="https://assets.marioverdu.com/bg/icon/cursor/Pointer.svg" alt="Pointer" width="24" height="24" />
          )}
          {cursorState === "clicking" && (
            <img
              src="https://assets.marioverdu.com/bg/icon/cursor/Pointer.svg"
              alt="Clicking"
              width="24"
              height="24"
              className="opacity-80 scale-95"
            />
          )}
        </div>
      )}

      <button
        ref={buttonRef}
        disabled={isLoading}
        className={`bg-white hover:bg-gray-50 text-primary font-medium rounded-md px-4 py-2 h-10 text-sm transition-colors w-[120px] flex items-center justify-center relative border border-[#005EB6]/10 shadow-sm ${cursorState === "clicking" ? "opacity-90 scale-[0.98]" : ""}`}
      >
        {/* Button texture overlay */}
        <div
          className="absolute inset-0 rounded-md pointer-events-none overflow-hidden opacity-[0.03] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "150%",
          }}
        />
        {isLoading ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Deploying</span>
          </>
        ) : isDeployed ? (
          <span>Deployed!</span>
        ) : (
          <>
            <svg className="mr-2 h-3 w-3 fill-current" viewBox="0 0 116 100" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M57.5 0L115 100H0L57.5 0Z" />
            </svg>
            <span>Deploy</span>
          </>
        )}
      </button>
    </div>
  )
}
