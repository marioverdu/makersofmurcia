"use client"

import { useState } from "react"
// DISABLED: Cookie system teardown
// import CookieConsentWidget from "@/components/cookie-consent-widget"

export default function CookieWidgetDemo() {
  const [lastAction, setLastAction] = useState<string | null>(null)

  const handleCookieAction = (action: string) => {
    setLastAction(action)
    console.log(`Cookie consent action: ${action}`)
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Cookie Consent Widget Demo</h1>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">DISABLED: Cookie System Teardown</h2>
        <p className="mb-4 text-red-600 font-medium">
          The cookie consent system has been completely disabled. This page is preserved for future restoration.
        </p>

        {/* PRESERVED: Original content for future restoration */}
        <div className="opacity-50 pointer-events-none">
          <h2 className="text-xl font-semibold mb-4">About This Demo</h2>
          <p className="mb-4">
            This page demonstrates the cookie consent widget that appears as a floating widget instead of a full-screen
            overlay. The widget is fully responsive and will adapt to different screen sizes.
          </p>

          <h3 className="text-lg font-medium mt-6 mb-2">Features:</h3>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li>Responsive design that adapts to mobile, tablet, and desktop</li>
            <li>Floating widget with toggle button</li>
            <li>Detailed cookie preference controls</li>
            <li>Accessible design with proper ARIA attributes</li>
            <li>Smooth animations and transitions</li>
          </ul>

          {lastAction && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800">
                Last action: <span className="font-semibold">{lastAction}</span>
              </p>
            </div>
          )}

          <div className="mt-8">
            <button
              onClick={() => {
                // DISABLED: Cookie system teardown
                console.log("Cookie system disabled - reset button")
              }}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
              disabled
            >
              Reset Cookie Preferences (DISABLED)
            </button>
          </div>
        </div>
      </div>

      {/* DISABLED: Cookie widget component */}
      {/* <CookieConsentWidget onAction={handleCookieAction} /> */}
    </div>
  )
}
