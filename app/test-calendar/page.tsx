"use client"

import { useState } from "react"

export default function TestCalendarPage() {
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleTestBooking = async () => {
    setLoading(true)
    setResult(null)
    try {
      // Datos de prueba
      const testMeeting = {
        proposalId: `test_proposal_${Date.now()}`,
        userId: `test_user_${Date.now()}`,
        selectedDay: "martes",
        selectedTime: "13:00",
        notes: "Reserva de test desde /test-calendar"
      }
      const response = await fetch("/api/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testMeeting)
      })
      const data = await response.json()
      if (data.success) {
        setResult(`Reserva guardada correctamente: ID ${data.meeting.meeting_id}`)
      } else {
        setResult(`Error: ${data.error || "No se pudo guardar la reserva"}`)
      }
    } catch (err: any) {
      setResult(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <h1 className="text-2xl font-bold">Test de guardado de reservas en calendario (Neon)</h1>
      <button
        className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/80 disabled:opacity-50"
        onClick={handleTestBooking}
        disabled={loading}
      >
        {loading ? "Guardando..." : "Crear reserva de test"}
      </button>
      {result && <div className="mt-4 text-lg text-center">{result}</div>}
    </div>
  )
}
