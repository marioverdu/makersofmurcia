"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { clearV0PreviewCache, isV0PreviewEnvironment } from "@/lib/preview-error-handler"
import { AlertCircle, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [isClearing, setIsClearing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const isPreviewEnv = isV0PreviewEnvironment()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)

    // Extract a user-friendly error message
    setErrorMessage(error.message || "An unexpected error occurred")

    // Mark that an error occurred in the preview environment
    if (isPreviewEnv) {
      localStorage.setItem("v0_preview_had_error", "true")
    }
  }, [error, isPreviewEnv])

  const handleClearCacheAndReset = async () => {
    setIsClearing(true)

    try {
      if (isPreviewEnv) {
        await clearV0PreviewCache()
      }

      // Attempt to reset the error boundary
      reset()

      // If reset doesn't navigate away, reload the page after a short delay
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (err) {
      console.error("Error during cache clearing:", err)
    } finally {
      setIsClearing(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center gap-3 mb-4 text-red-500">
          <AlertCircle className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Application Error</h2>
        </div>

        <p className="mb-6 text-gray-600">
          {isPreviewEnv
            ? "An error occurred in the v0 preview environment. This might be due to cached data."
            : "Ha ocurrido un error inesperado. Por favor, intenta recargar la página."}
        </p>

        {errorMessage && (
          <div className="p-3 mb-4 bg-gray-100 rounded-md overflow-auto max-h-32 text-sm">
            <code className="text-red-600 whitespace-pre-wrap">{errorMessage}</code>
            {error.digest && <p className="mt-2 text-xs text-gray-500">Error ID: {error.digest}</p>}
          </div>
        )}

        <div className="flex flex-col gap-3 mt-6">
          <Button
            onClick={handleClearCacheAndReset}
            disabled={isClearing}
            className="w-full flex items-center justify-center gap-2"
          >
            {isClearing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                {isPreviewEnv ? "Clearing cache..." : "Reiniciando..."}
              </>
            ) : (
              <>{isPreviewEnv ? "Clear Cache & Reset" : "Intentar de nuevo"}</>
            )}
          </Button>

          <Button variant="outline" onClick={() => (window.location.href = "/")} className="w-full">
            {isPreviewEnv ? "Return to Home" : "Volver al inicio"}
          </Button>
        </div>
      </div>
    </div>
  )
}
