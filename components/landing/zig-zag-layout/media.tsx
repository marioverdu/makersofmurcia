"use client"

import type React from "react"

// Update the interface to include videoSrc
export interface ZigZagMediaProps {
  className?: string
  children?: React.ReactNode
  showVideo?: boolean
  videoSrc?: string
}

// Update the component to use videoSrc
export function ZigZagMedia({ className, children, showVideo = false, videoSrc }: ZigZagMediaProps) {
  return (
    <div
      className={`relative ${className || ""}`}
      style={{
        width: "100%",
        maxWidth: "552px",
      }}
    >
      {/* Aspect ratio container */}
      <div
        className="relative rounded-[6px] overflow-hidden w-full"
        style={{
          paddingBottom: "56.34%", // Maintains 552:311 aspect ratio (311/552 ≈ 0.5634)
        }}
      >
        {/* Content container */}
        <div
          className="absolute inset-0 p-4"
          data-independent-container="true"
          style={{
            backgroundColor: "rgba(0, 94, 182, 0.1)", // #005EB6 at 10% opacity
          }}
        >
          {showVideo && videoSrc && (
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-10"
            />
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
