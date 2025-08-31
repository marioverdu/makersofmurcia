"use client"

import type React from "react"
// Imports cleaned up
import ButtonDeployAnimationV3 from "./button-deploy-animation-v3"

interface VideoCoverProps {
  src: string
  className?: string
  style?: React.CSSProperties
  containerClassName?: string
  containerStyle?: React.CSSProperties
  type?: "video" | "deploy-button"
}

export const VideoCover: React.FC<VideoCoverProps> = ({
  src,
  className = "",
  style = {},
  containerClassName = "",
  containerStyle = {},
  type = "video",
}) => {
  // State removed

  return (
    <div
      className={`relative w-full aspect-video rounded-[12px] overflow-hidden bg-backgroundSupport ${containerClassName}`}
      style={containerStyle}
    >
      {type === "video" ? (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover ${className}`}
          style={{ mixBlendMode: "normal", ...style }}
        />
      ) : (
        <ButtonDeployAnimationV3
          className="rounded-[12px] overflow-hidden bg-backgroundSupport relative order-2 md:order-1"
          style={{ width: "100%", aspectRatio: "16 / 9", position: "relative" }}
        />
      )}
    </div>
  )
}
