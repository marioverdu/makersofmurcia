"use client"

import { AnalyticsTracker } from './analytics-tracker'

export function AnalyticsExample() {
  return (
    <div>
      {/* Este componente no renderiza nada visual, solo configura el tracking */}
      <AnalyticsTracker 
        trackPerformance={true}
        trackScroll={true}
        trackClicks={false}
        customEvents={[
          {
            selector: 'button[data-track="contact"]',
            event: 'click',
            category: 'conversion',
            label: 'contact_button_click'
          },
          {
            selector: 'form[data-track="price-estimator"]',
            event: 'submit',
            category: 'conversion',
            label: 'price_estimator_submit'
          },
          {
            selector: 'a[data-track="download"]',
            event: 'click',
            category: 'engagement',
            label: 'file_download'
          }
        ]}
      />
    </div>
  )
}

// Ejemplo de uso en una página:
/*
import { AnalyticsTracker } from '@/components/analytics-tracker'

export default function MiPagina() {
  return (
    <div>
      <AnalyticsTracker 
        trackPerformance={true}
        trackScroll={true}
        customEvents={[
          {
            selector: '.contact-button',
            event: 'click',
            category: 'conversion'
          }
        ]}
      />
      
      <h1>Mi Página</h1>
      <button className="contact-button" data-track="contact">
        Contactar
      </button>
    </div>
  )
}
*/
