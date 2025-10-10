"use client"

import { useState, useEffect } from "react"
// DISABLED: Cookie system teardown
// import { isClientPreviewEnvironment } from "@/lib/client-preview-utils"
// import { getCookiePreferences } from "@/lib/cookie-utils"

interface CookieConsentProps {
  onAction?: (action: string) => void
}

// DISABLED: Cookie system teardown - Global variable preserved for future restoration
// let isCookieWidgetMounted = false

export default function CookieConsent({ onAction }: CookieConsentProps) {
  // DISABLED: Cookie system teardown - All states preserved but disabled
  const [showConsent, setShowConsent] = useState(false) // FORCED FALSE: Never show consent
  const [isMobile, setIsMobile] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [isWidgetAlreadyMounted, setIsWidgetAlreadyMounted] = useState(false)

  // DISABLED: Cookie system teardown - All useEffects disabled
  useEffect(() => {
    // DISABLED: Widget mounting logic
    // if (isCookieWidgetMounted) {
    //   setIsWidgetAlreadyMounted(true)
    //   return
    // }
    // isCookieWidgetMounted = true
    // return () => {
    //   isCookieWidgetMounted = false
    // }
  }, [])

  useEffect(() => {
    // DISABLED: Cookie system teardown - All cookie logic disabled
    // if (isWidgetAlreadyMounted) return
    // const inPreviewEnv = isClientPreviewEnvironment()
    // setIsPreview(inPreviewEnv)
    // if (inPreviewEnv) {
    //   setShowConsent(true)
    // } else {
    //   const { consent } = getCookiePreferences()
    //   setShowConsent(!consent)
    // }

    // Detect mobile devices (preserved)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // DISABLED: Cookie consent event listeners
    // const handleConsentEvent = (event: CustomEvent) => {
    //   if (event.detail && event.detail.action) {
    //     setShowConsent(false)
    //   }
    // }
    // window.addEventListener("cookieConsentAction", handleConsentEvent as EventListener)

    return () => {
      window.removeEventListener("resize", handleResize)
      // window.removeEventListener("cookieConsentAction", handleConsentEvent as EventListener)
    }
  }, [isWidgetAlreadyMounted])

  const handleAction = (action: string) => {
    // DISABLED: Cookie system teardown - Action handling disabled
    console.log("Cookie system disabled - handleAction", action)

    // if (onAction) {
    //   onAction(action)
    // }
    // if (!isPreview) {
    //   setShowConsent(false)
    // }
    // window.dispatchEvent(new CustomEvent("cookieConsentAction", { detail: { action } }))
  }

  // DISABLED: Cookie system teardown - Never render the widget
  return null

  // PRESERVED: Original logic commented for future restoration
  // if (isWidgetAlreadyMounted || !showConsent) {
  //   return null
  // }
  // return (
  //   <div className="fixed z-[60] bottom-6 right-6">
  //     <CookieConsentWidget onAction={handleAction} />
  //   </div>
  // )
}
