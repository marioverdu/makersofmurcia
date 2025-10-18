import type { Meta, StoryObj } from '@storybook/react'
import { SiriButton } from './siri-button'
import { useState } from 'react'

const meta: Meta<typeof SiriButton> = {
  title: 'SiriButton',
  component: SiriButton,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a2e' },
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [isActive, setIsActive] = useState(false)
    
    return (
      <div className="min-h-screen w-full relative overflow-hidden" style={{ 
        backgroundImage: "url('https://assets.marioverdu.com/bg/root-site.min.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '64px'
      }}>
        {/* Posición EXACTA como ChatTuentiButtonMaster: bottom: 14px, right: 14px SIEMPRE */}
        <SiriButton
          isActive={isActive}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
          onMouseLeave={() => setIsActive(false)}
          onTouchStart={() => setIsActive(true)}
          onTouchEnd={() => setIsActive(false)}
          className="fixed z-[1000]"
          style={{ bottom: '14px', right: '14px' }}
        />
      </div>
    )
  },
}

/**
 * Variante con colores armónicos basados en --color-border-accent (#3D5B6A)
 */
export const Harmonic: Story = {
  render: () => {
    const [isActive, setIsActive] = useState(false)
    
    return (
      <div className="min-h-screen w-full relative overflow-hidden" style={{ 
        backgroundImage: "url('https://assets.marioverdu.com/bg/root-site.min.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '64px'
      }}>
        {/* Información de paleta */}
        <div style={{
          position: 'absolute',
          top: '64px',
          left: '64px',
          padding: '24px',
          borderRadius: '12px',
          background: 'rgba(61, 91, 106, 0.1)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(61, 91, 106, 0.3)',
          maxWidth: '400px',
        }}>
          <h3 style={{ color: '#7A9AAA', fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
            🎨 Colores Armónicos
          </h3>
          <p style={{ color: '#5A7A8A', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
            Basados en <code style={{ 
              backgroundColor: 'rgba(61, 91, 106, 0.2)', 
              padding: '2px 6px', 
              borderRadius: '4px',
              color: '#4A8AAA',
              fontFamily: 'monospace'
            }}>--color-border-accent</code>
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { name: 'Base', color: '#3D5B6A' },
              { name: 'Claro', color: '#7A9AAA' },
              { name: 'Medio', color: '#5A7A8A' },
              { name: 'Oscuro', color: '#2A3F4A' },
              { name: 'Neon', color: '#4A8AAA' },
            ].map((item) => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: item.color,
                  borderRadius: '4px',
                  border: '2px solid rgba(122, 154, 170, 0.3)',
                  flexShrink: 0,
                }}></div>
                <span style={{ color: '#7A9AAA', fontSize: '13px', fontFamily: 'monospace' }}>
                  {item.name}: {item.color}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Botón Siri con colores armónicos */}
        <button
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
          onMouseLeave={() => setIsActive(false)}
          onTouchStart={() => setIsActive(true)}
          onTouchEnd={() => setIsActive(false)}
          className={`
            fixed z-[1000] w-9 h-9 rounded-full
            transition-all duration-300 ease-out
            ${isActive ? 'scale-110' : 'scale-100'}
          `}
          style={{
            bottom: '14px',
            right: '14px',
            background: isActive 
              ? 'radial-gradient(circle at center, rgba(61, 91, 106, 0.4) 0%, rgba(61, 91, 106, 0.1) 50%, transparent 100%)'
              : 'radial-gradient(circle at center, rgba(61, 91, 106, 0.2) 0%, rgba(61, 91, 106, 0.05) 50%, transparent 100%)',
            boxShadow: isActive
              ? '0 0 40px rgba(74, 138, 170, 0.6), 0 0 80px rgba(90, 122, 138, 0.4), inset 0 0 20px rgba(61, 91, 106, 0.3)'
              : '0 0 20px rgba(61, 91, 106, 0.3), inset 0 0 10px rgba(61, 91, 106, 0.2)',
            border: '2px solid rgba(61, 91, 106, 0.5)',
          }}
          aria-label="Activar Siri"
        >
          {/* Icono del micrófono con gradiente armónico */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
            >
              <defs>
                <linearGradient id="micGradHarmonic" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7A9AAA" />
                  <stop offset="50%" stopColor="#5A7A8A" />
                  <stop offset="100%" stopColor="#3D5B6A" />
                </linearGradient>
              </defs>
              
              <rect
                x="9"
                y="3"
                width="6"
                height="11"
                rx="3"
                fill="url(#micGradHarmonic)"
                opacity={isActive ? "1" : "0.8"}
              />
              
              <path
                d="M6 11C6 14.314 8.686 17 12 17C15.314 17 18 14.314 18 11"
                stroke="url(#micGradHarmonic)"
                strokeWidth="2"
                strokeLinecap="round"
                opacity={isActive ? "1" : "0.8"}
              />
              
              <line
                x1="12"
                y1="17"
                x2="12"
                y2="21"
                stroke="url(#micGradHarmonic)"
                strokeWidth="2"
                strokeLinecap="round"
                opacity={isActive ? "1" : "0.8"}
              />
              
              <line
                x1="9"
                y1="21"
                x2="15"
                y2="21"
                stroke="url(#micGradHarmonic)"
                strokeWidth="2"
                strokeLinecap="round"
                opacity={isActive ? "1" : "0.8"}
              />
            </svg>
          </div>

          {/* Anillos pulsantes con colores armónicos */}
          {isActive && (
            <>
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  background: 'transparent',
                  border: '2px solid rgba(61, 91, 106, 0.5)',
                  animationDuration: '1.5s',
                }}
              />
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  background: 'transparent',
                  border: '2px solid rgba(74, 138, 170, 0.5)',
                  animationDuration: '2s',
                  animationDelay: '0.3s',
                }}
              />
            </>
          )}
        </button>
      </div>
    )
  },
}

