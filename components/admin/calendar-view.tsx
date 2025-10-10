"use client"

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import esES from 'date-fns/locale/es'

const locales = {
  'es': esES,
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
})

interface Booking {
  meeting_id: string
  proposal_id: string
  plan_name?: string
  service?: string
  price?: number
  budget?: string
  user_id: string
  day_name: string
  meeting_date: string
  meeting_time: string
  notes?: string
  status?: string
  created_at: string
}

interface CalendarViewProps {
  bookings: Booking[]
}

export default function CalendarView({ bookings }: CalendarViewProps) {
  // Map meetings to events for react-big-calendar
  const events = bookings.map((b) => {
    // Parse date and time
    let start = new Date(b.meeting_date)
    let end = new Date(b.meeting_date)
    if (b.meeting_time) {
      const [h, m] = b.meeting_time.split(":")
      start.setHours(Number(h), Number(m), 0, 0)
      end.setHours(Number(h), Number(m) + 59, 0, 0) // 1h slot
    }
    return {
      id: b.meeting_id,
      title: `${b.plan_name || "(Sin nombre)"} - ${b.user_id}`,
      start,
      end,
      resource: b,
    }
  })

  // Custom event rendering
  function EventComponent({ event }: any) {
    const b = event.resource
    return (
      <div className="p-1">
        <div className="font-semibold text-blue-900 text-xs">{b.plan_name || "(Sin nombre)"}</div>
        <div className="text-xs text-gray-600">{b.user_id}</div>
        <div className="text-xs text-gray-600">{b.notes}</div>
        <div className="text-xs text-gray-500">{b.meeting_time} - Estado: {b.status}</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded shadow p-2">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        views={["month", "week", "day"]}
        defaultView="month"
        components={{ event: EventComponent }}
        popup
        messages={{
          next: 'Sig.',
          previous: 'Ant.',
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          agenda: 'Agenda',
          showMore: total => `+${total} más`,
        }}
        culture="es"
      />
    </div>
  )
}
