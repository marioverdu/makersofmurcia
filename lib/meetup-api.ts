/**
 * Servicio para obtener eventos de Meetup API
 * Maneja la comunicación con la API de Meetup para obtener eventos del grupo
 */

import { envConfig } from './env-config'

// Tipos para la respuesta de la API de Meetup
export interface MeetupEvent {
  id: string
  name: string
  description: string
  time: number
  local_date: string
  local_time: string
  venue?: {
    name: string
    address_1: string
    city: string
    state: string
    country: string
  }
  group: {
    name: string
    urlname: string
  }
  link: string
  featured_photo?: {
    photo_link: string
    highres_link: string
    thumb_link: string
  }
  event_hosts?: Array<{
    id: number
    name: string
    bio: string
    photo?: {
      photo_link: string
      thumb_link: string
    }
  }>
  yes_rsvp_count: number
  waitlist_count: number
  status: string
}

export interface MeetupApiResponse {
  data: MeetupEvent[]
  meta: {
    count: number
    next: string | null
    prev: string | null
  }
}

// Tipo para eventos procesados para el componente
export interface ProcessedEvent {
  id: string
  title: string
  organizer: {
    name: string
    avatar: string
    subtitle: string
  }
  image: string
  date: string
  description: string
  link: string
  attendees: number
  status: string
}

/**
 * Obtiene eventos del grupo de Meetup
 * @param limit - Número máximo de eventos a obtener (por defecto 6)
 * @param status - Estado de los eventos ('upcoming', 'past', 'cancelled', 'draft')
 * @returns Promise con los eventos procesados
 */
export async function getMeetupEvents(
  limit: number = 6,
  status: 'upcoming' | 'past' | 'cancelled' | 'draft' = 'past'
): Promise<ProcessedEvent[]> {
  try {
    // Verificar que tenemos la API key
    if (!envConfig.MEETUP_API_KEY) {
      console.warn('⚠️ MEETUP_API_KEY no configurada, usando datos de ejemplo')
      return getFallbackEvents()
    }

    // Construir URL de la API
    const baseUrl = 'https://api.meetup.com/gql'
    const query = `
      query GetGroupEvents($urlname: String!, $first: Int!, $eventStatus: EventStatus!) {
        groupByUrlname(urlname: $urlname) {
          upcomingEvents(input: { first: $first, eventStatus: $eventStatus }) {
            edges {
              node {
                id
                title
                description
                dateTime
                eventUrl
                imageUrl
                hosts {
                  id
                  name
                  bio
                  photoUrl
                }
                going
                waitlistCount
                status
                venue {
                  name
                  address
                  city
                  state
                  country
                }
              }
            }
          }
        }
      }
    `

    const variables = {
      urlname: envConfig.MEETUP_GROUP_URLNAME,
      first: limit,
      eventStatus: status.toUpperCase()
    }

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${envConfig.MEETUP_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        variables
      }),
    })

    if (!response.ok) {
      throw new Error(`Error de API: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    if (data.errors) {
      throw new Error(`Error de GraphQL: ${data.errors.map((e: any) => e.message).join(', ')}`)
    }

    const events = data.data?.groupByUrlname?.upcomingEvents?.edges?.map((edge: any) => edge.node) || []
    
    return events.map(processMeetupEvent)
    
  } catch (error) {
    console.error('❌ Error obteniendo eventos de Meetup:', error)
    console.warn('🔄 Usando datos de ejemplo como fallback')
    return getFallbackEvents()
  }
}

/**
 * Procesa un evento de Meetup para el formato del componente
 */
function processMeetupEvent(event: any): ProcessedEvent {
  // Obtener el primer host o usar datos por defecto
  const host = event.hosts?.[0] || {
    name: 'Makers of Murcia',
    bio: 'Comunidad de makers',
    photoUrl: null
  }

  // Formatear fecha
  const eventDate = new Date(event.dateTime)
  const formattedDate = eventDate.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

  // Limpiar descripción HTML
  const cleanDescription = event.description
    ? event.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
    : 'Evento de la comunidad Makers of Murcia'

  return {
    id: event.id,
    title: event.title,
    organizer: {
      name: host.name,
      avatar: host.photoUrl || '👨‍💻',
      subtitle: host.bio || 'Organizador'
    },
    image: event.imageUrl || '/placeholder.jpg',
    date: formattedDate,
    description: cleanDescription,
    link: event.eventUrl,
    attendees: event.going || 0,
    status: event.status
  }
}

/**
 * Datos de ejemplo como fallback cuando la API no está disponible
 */
function getFallbackEvents(): ProcessedEvent[] {
  return [
    {
      id: "1",
      title: "Taller de Arduino Básico",
      organizer: {
        name: "María García",
        avatar: "👩‍💻",
        subtitle: "Ingeniera Electrónica"
      },
      image: "/placeholder.jpg",
      date: "15 Oct 2024",
      description: "Aprende los fundamentos de Arduino y crea tu primer proyecto",
      link: "#",
      attendees: 25,
      status: "past"
    },
    {
      id: "2", 
      title: "Meetup: Impresión 3D",
      organizer: {
        name: "Carlos Ruiz",
        avatar: "👨‍🔬",
        subtitle: "Diseñador Industrial"
      },
      image: "/placeholder.jpg",
      date: "22 Oct 2024",
      description: "Explora las posibilidades de la impresión 3D en proyectos maker",
      link: "#",
      attendees: 18,
      status: "past"
    },
    {
      id: "3",
      title: "Workshop: Soldadura",
      organizer: {
        name: "Ana López",
        avatar: "👩‍🔧",
        subtitle: "Técnica en Electrónica"
      },
      image: "/placeholder.jpg", 
      date: "29 Oct 2024",
      description: "Técnicas profesionales de soldadura para proyectos electrónicos",
      link: "#",
      attendees: 12,
      status: "past"
    },
    {
      id: "4",
      title: "Charla: IoT y Smart Cities",
      organizer: {
        name: "David Martín",
        avatar: "👨‍💼",
        subtitle: "IoT Specialist"
      },
      image: "/placeholder.jpg",
      date: "5 Nov 2024", 
      description: "Cómo la tecnología IoT está transformando las ciudades",
      link: "#",
      attendees: 30,
      status: "past"
    },
    {
      id: "5",
      title: "Hackathon Maker",
      organizer: {
        name: "Laura Sánchez",
        avatar: "👩‍🎨",
        subtitle: "UX Designer"
      },
      image: "/placeholder.jpg",
      date: "12 Nov 2024",
      description: "48 horas para crear el proyecto maker más innovador",
      link: "#",
      attendees: 45,
      status: "past"
    },
    {
      id: "6",
      title: "Taller: Programación Python",
      organizer: {
        name: "Roberto Vega",
        avatar: "👨‍💻",
        subtitle: "Software Developer"
      },
      image: "/placeholder.jpg",
      date: "19 Nov 2024",
      description: "Python aplicado a proyectos maker y automatización",
      link: "#",
      attendees: 22,
      status: "past"
    }
  ]
}
