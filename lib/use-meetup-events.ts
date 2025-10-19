/**
 * Hook personalizado para eventos dinámicos con refresh automático
 * Opcional: Para hacer el sistema aún más reactivo
 */

import { useState, useEffect } from 'react'
import { getMeetupEventsPublic, ProcessedEvent } from '@/lib/meetup-scraper'

export function useMeetupEvents(refreshInterval: number = 300000) { // 5 minutos por defecto
  const [events, setEvents] = useState<ProcessedEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const loadEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      const meetupEvents = await getMeetupEventsPublic('makers-of-murcia', 6)
      setEvents(meetupEvents)
      setLastUpdated(new Date())
    } catch (err) {
      console.error('Error cargando eventos:', err)
      setError('Error al cargar los eventos')
      const fallbackEvents = await getMeetupEventsPublic('makers-of-murcia', 6)
      setEvents(fallbackEvents)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Cargar eventos inicialmente
    loadEvents()

    // Configurar refresh automático (opcional)
    if (refreshInterval > 0) {
      const interval = setInterval(loadEvents, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [refreshInterval])

  return {
    events,
    loading,
    error,
    lastUpdated,
    refresh: loadEvents
  }
}
