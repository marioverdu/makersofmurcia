"use client"

import React, { useEffect, useRef, useState } from "react"

interface ConfirmableModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirmDiscard?: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export const ConfirmableModal: React.FC<ConfirmableModalProps> = ({
  isOpen,
  onClose,
  onConfirmDiscard,
  title,
  children,
  className = "",
}) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const root = contentRef.current
    if (!root) return

    const handleInput = () => setIsDirty(true)
    const inputs = root.querySelectorAll("input, textarea, select, [contenteditable='true']")
    inputs.forEach((el) => {
      el.addEventListener("input", handleInput)
      el.addEventListener("change", handleInput)
    })
    return () => {
      inputs.forEach((el) => {
        el.removeEventListener("input", handleInput)
        el.removeEventListener("change", handleInput)
      })
    }
  }, [isOpen])

  const handleOverlayClick = () => {
    if (!isDirty) {
      onClose()
    } else {
      setShowConfirm(true)
    }
  }

  const confirmDiscard = () => {
    setShowConfirm(false)
    setIsDirty(false)
    onConfirmDiscard?.()
    onClose()
  }

  const cancelDiscard = () => setShowConfirm(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center" aria-modal="true" role="dialog">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" onClick={handleOverlayClick} />

      {/* Modal */}
      <div ref={contentRef} className={`relative bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto ${className}`}>
        {(title || isDirty) && (
          <div className="flex items-center justify-between mb-4">
            {title && <h2 className="text-xl font-semibold">{title}</h2>}
            <button onClick={handleOverlayClick} className="inline-flex items-center justify-center gap-2 text-sm border h-9 rounded-md px-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
        )}

        {children}

        {showConfirm && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-lg">
            <div className="bg-white border rounded-md shadow p-4 w-full max-w-sm">
              <h3 className="text-base font-semibold mb-2">Hay cambios sin guardar</h3>
              <p className="text-sm text-gray-600 mb-4">¿Quieres descartar los cambios?</p>
              <div className="flex justify-end gap-2">
                <button onClick={confirmDiscard} className="border rounded-md px-3 h-9 text-sm">Salir sin guardar</button>
                <button onClick={cancelDiscard} className="bg-[#3D5B6A] text-white rounded-md px-3 h-9 text-sm">Volver a Edición</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConfirmableModal


