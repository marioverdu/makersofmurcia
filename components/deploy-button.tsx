"use client"

import React, { useState } from "react"
import { UnifiedLoading } from "@/components/ui/unified-loading"
import { Button } from "@/components/ui/button"

interface DeployButtonProps {
  onClick?: () => Promise<void>
  className?: string
}

export default function DeployButton({ onClick, className = "" }: DeployButtonProps) {
  const [state, setState] = useState<"initial" | "loading" | "deployed">("initial")

  const handleClick = async () => {
    if (state === "initial") {
      setState("loading")
      if (onClick) {
        try {
          await onClick()
        } catch (error) {
          console.error("Deploy failed:", error)
        }
      } else {
        // Simulación de despliegue si no se proporciona onClick
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }
      setState("deployed")
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={state === "loading"}
      className={`bg-[#014545] hover:bg-[#01363b] text-white font-medium rounded-md px-4 py-2 h-10 text-sm transition-colors w-[120px] flex items-center justify-center relative border border-white/20 shadow-md ${className}`}
    >
      {/* Button texture overlay */}
      <div
        className="absolute inset-0 rounded-md pointer-events-none overflow-hidden opacity-[0.03] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "150%",
        }}
      />
      {state === "loading" ? (
        <>
          <UnifiedLoading />
          <span>Deploying</span>
        </>
      ) : state === "deployed" ? (
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
  )
}
