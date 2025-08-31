"use client"

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface AnalyticsTrackerProps {
  trackPerformance?: boolean
  trackScroll?: boolean
  trackClicks?: boolean
  customEvents?: Array<{
    selector: string
    event: string
    category?: string
    label?: string
  }>
}

export function AnalyticsTracker({
  trackPerformance = true,
  trackScroll = false,
  trackClicks = false,
  customEvents = []
}: AnalyticsTrackerProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const hasTrackedPageView = useRef(false)
  const scrollTimeout = useRef<NodeJS.Timeout>()

  // Función para enviar eventos a la API
  const trackEvent = async (type: string, data: any) => {
    try {
      await fetch('/api/admin/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, data }),
      })
    } catch (error) {
      console.error('Error tracking event:', error)
    }
  }

  // Track page view
  useEffect(() => {
    if (!hasTrackedPageView.current) {
      const trackPageView = async () => {
        const userAgent = navigator.userAgent
        const referrer = document.referrer
        const sessionId = sessionStorage.getItem('analytics_session_id') || 
                         `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        
        // Guardar session ID
        sessionStorage.setItem('analytics_session_id', sessionId)

        await trackEvent('pageview', {
          page_path: pathname,
          user_agent: userAgent,
          referrer: referrer || null,
          session_id: sessionId,
          user_id: session?.user?.id || null,
          metadata: {
            device: /Mobile|Android|iPhone|iPad/.test(userAgent) ? 'mobile' : 'desktop',
            browser: getBrowser(userAgent),
            screen_resolution: `${screen.width}x${screen.height}`,
            language: navigator.language,
          }
        })

        hasTrackedPageView.current = true
      }

      trackPageView()
    }
  }, [pathname, session])

  // Track performance metrics
  useEffect(() => {
    if (trackPerformance) {
      const trackPerformanceMetrics = () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.loadEventStart
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
          const windowLoad = navigation.loadEventEnd - navigation.navigationStart

          trackEvent('performance', {
            page_path: pathname,
            load_time: Math.round(loadTime),
            dom_content_loaded: Math.round(domContentLoaded),
            window_load: Math.round(windowLoad),
            user_agent: navigator.userAgent,
          })
        }
      }

      // Track performance after page load
      if (document.readyState === 'complete') {
        trackPerformanceMetrics()
      } else {
        window.addEventListener('load', trackPerformanceMetrics)
        return () => window.removeEventListener('load', trackPerformanceMetrics)
      }
    }
  }, [trackPerformance, pathname])

  // Track scroll events
  useEffect(() => {
    if (trackScroll) {
      const handleScroll = () => {
        const scrollPercentage = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        )

        // Track scroll at 25%, 50%, 75%, and 100%
        if ([25, 50, 75, 100].includes(scrollPercentage)) {
          trackEvent('custom-event', {
            event_name: 'scroll',
            event_category: 'engagement',
            event_label: 'page_scroll',
            event_value: scrollPercentage,
            page_path: pathname,
            user_id: session?.user?.id || null,
            session_id: sessionStorage.getItem('analytics_session_id'),
            metadata: { scroll_percentage: scrollPercentage }
          })
        }
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [trackScroll, pathname, session])

  // Track click events
  useEffect(() => {
    if (trackClicks) {
      const handleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        const tagName = target.tagName.toLowerCase()
        const className = target.className
        const id = target.id
        const text = target.textContent?.trim().substring(0, 50)

        trackEvent('custom-event', {
          event_name: 'click',
          event_category: 'engagement',
          event_label: `${tagName}_click`,
          page_path: pathname,
          user_id: session?.user?.id || null,
          session_id: sessionStorage.getItem('analytics_session_id'),
          metadata: {
            tag_name: tagName,
            class_name: className,
            element_id: id,
            text_content: text,
            x_position: event.clientX,
            y_position: event.clientY
          }
        })
      }

      document.addEventListener('click', handleClick)
      return () => document.removeEventListener('click', handleClick)
    }
  }, [trackClicks, pathname, session])

  // Track custom events
  useEffect(() => {
    customEvents.forEach(({ selector, event, category, label }) => {
      const elements = document.querySelectorAll(selector)
      
      elements.forEach((element) => {
        const handleCustomEvent = () => {
          trackEvent('custom-event', {
            event_name: event,
            event_category: category || 'engagement',
            event_label: label || event,
            page_path: pathname,
            user_id: session?.user?.id || null,
            session_id: sessionStorage.getItem('analytics_session_id'),
            metadata: {
              selector,
              element_text: element.textContent?.trim().substring(0, 50)
            }
          })
        }

        element.addEventListener(event, handleCustomEvent)
        
        // Cleanup function
        return () => element.removeEventListener(event, handleCustomEvent)
      })
    })
  }, [customEvents, pathname, session])

  // Reset tracking flag when pathname changes
  useEffect(() => {
    hasTrackedPageView.current = false
  }, [pathname])

  return null // This component doesn't render anything
}

// Helper function to detect browser
function getBrowser(userAgent: string): string {
  if (userAgent.includes('Chrome')) return 'Chrome'
  if (userAgent.includes('Firefox')) return 'Firefox'
  if (userAgent.includes('Safari')) return 'Safari'
  if (userAgent.includes('Edge')) return 'Edge'
  if (userAgent.includes('Opera')) return 'Opera'
  return 'Other'
}

// Hook para usar el tracker fácilmente
export function useAnalyticsTracker(options: AnalyticsTrackerProps = {}) {
  return <AnalyticsTracker {...options} />
}
