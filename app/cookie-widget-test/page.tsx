"use client"

import { useState, useEffect } from "react"
// DISABLED: Cookie system teardown
// import CookieConsentWidget from "@/components/cookie-consent-widget"
// import { isClientPreviewEnvironment } from "@/lib/client-preview-utils"

export default function CookieWidgetTest() {
  const [lastAction, setLastAction] = useState<string | null>(null)
  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    // DISABLED: Cookie system teardown
    // setIsPreview(isClientPreviewEnvironment())
    setIsPreview(false)
  }, [])

  const handleCookieAction = (action: string) => {
    setLastAction(action)
    console.log(`Cookie consent action: ${action}`)
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Cookie Consent Widget Test</h1>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">DISABLED: Cookie System Teardown</h2>

        <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200">
          <p className="mb-2 text-red-800 font-medium">
            ⚠️ Cookie System Status: <span className="font-bold">COMPLETELY DISABLED</span>
          </p>
          <p className="mb-2 text-red-700">
            All cookie functionality has been disabled while preserving the UI code for future restoration.
          </p>
        </div>

        {/* PRESERVED: Original content for future restoration */}
        <div className="opacity-50 pointer-events-none">
          <h2 className="text-xl font-semibold mb-4">Environment Status</h2>

          <div className="mb-6 p-4 rounded-md bg-gray-50 border border-gray-200">
            <p className="mb-2">
              <span className="font-medium">Current environment:</span>{" "}
              {isPreview ? (
                <span className="text-green-600 font-semibold">Preview Environment</span>
              ) : (
                <span className="text-cyan-600 font-semibold">Production Environment</span>
              )}
            </p>

            <p className="mb-2">
              <span className="font-medium">Widget behavior:</span>{" "}
              <span className="text-red-600 font-semibold">DISABLED</span>
            </p>
          </div>

          <h3 className="text-lg font-medium mt-6 mb-2">Testing Instructions:</h3>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li>Cookie system is completely disabled</li>
            <li>All UI code is preserved for future restoration</li>
            <li>Chat functionality works without cookie consent</li>
            <li>No cookie preferences are saved or checked</li>
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
