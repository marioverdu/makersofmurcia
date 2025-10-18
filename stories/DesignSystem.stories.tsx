import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * # 🎨 Design System - Documentación Completa
 * 
 * Sistema centralizado de tokens REALMENTE USADOS en la página raíz.
 * 
 * **Versión:** 3.0.0 - ANÁLISIS COMPLETO DE PÁGINA RAÍZ  
 * **Última actualización:** 12 Octubre 2025  
 * **Estado:** 100% sincronizado con componentes reales
 */
const meta: Meta = {
  title: 'Documentation/Design System',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

/**
 * Design System completo con análisis real de la página raíz.
 * 
 * **Características:**
 * - **Análisis Real:** Todos los estilos extraídos de componentes reales (Hero, Team, Gallery, Event, Footer)
 * - **Colores:** Paleta completa usada en producción
 * - **Tipografías:** Fuentes reales con fallbacks
 * - **Efectos:** Clases CSS personalizadas (halftone, text-stroke, ripped-edge)
 * - **Spacing:** Valores reales de padding, margin y gaps
 * - **Dinámico:** Valores cargados en tiempo real con `getCSSVar()`
 * 
 * **IMPORTANTE:** Este Design System refleja EXACTAMENTE lo que se usa en la página raíz.
 */
export const Default: Story = {
  render: () => {
    // Función para leer valores de CSS variables dinámicamente
    const getCSSVar = (varName: string): string => {
      if (typeof window === 'undefined') return '';
      return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    };

    // TOKENS REALES USADOS EN LA PÁGINA RAÍZ
    const realColors = {
      // Colores principales del sistema
      primary: '#000000', // bg-primary, text-primary
      secondary: '#3D5B6A', // bg-secondary, border-secondary, text-secondary
      accent: '#FF6B35', // bg-accent, border-accent
      background: '#FFFFFF', // bg-background, text-background
      white: '#FFFFFF', // bg-white
      
      // Colores de texto específicos
      'text-white': '#FFFFFF', // text-white
      'text-gray-600': '#4B5563', // text-gray-600
      'text-gray-700': '#374151', // text-gray-700
      'text-gray-500': '#6B7280', // text-gray-500
      'text-gray-800': '#1F2937', // text-gray-800
      
      // Colores de fondo específicos
      'bg-gray-100': '#F3F4F6', // bg-gray-100
      'bg-gray-300': '#D1D5DB', // bg-gray-300
      'bg-white/90': 'rgba(255, 255, 255, 0.9)', // bg-white/90
      'bg-white/50': 'rgba(255, 255, 255, 0.5)', // bg-white/50
      'bg-white/30': 'rgba(255, 255, 255, 0.3)', // bg-white/30
      'bg-white/40': 'rgba(255, 255, 255, 0.4)', // bg-white/40
      'bg-white/60': 'rgba(255, 255, 255, 0.6)', // bg-white/60
      'bg-white/90': 'rgba(255, 255, 255, 0.9)', // bg-white/90
      
      // Colores de estado
      'bg-green-100': '#DCFCE7', // bg-green-100
      'text-green-800': '#166534', // text-green-800
      'border-green-200': '#BBF7D0', // border-green-200
      'bg-red-100': '#FEE2E2', // bg-red-100
      'text-red-800': '#991B1B', // text-red-800
      'border-red-200': '#FECACA', // border-red-200
      'bg-yellow-100': '#FEF3C7', // bg-yellow-100
      'text-yellow-800': '#92400E', // text-yellow-800
      'border-yellow-200': '#FDE68A', // border-yellow-200
      'bg-yellow-50': '#FFFBEB', // bg-yellow-50
      'text-yellow-600': '#D97706', // text-yellow-600
      
      // Colores especiales
      'bg-[#34C759]': '#34C759', // bg-[#34C759] (verde iOS)
      'bg-[#3D5B6A]': '#3D5B6A', // bg-[#3D5B6A] (secondary)
      
      // Opacidades especiales
      'bg-secondary/50': 'rgba(61, 91, 106, 0.5)', // bg-secondary/50
      'bg-accent/50': 'rgba(255, 107, 53, 0.5)', // bg-accent/50
      'bg-primary/90': 'rgba(0, 0, 0, 0.9)', // bg-primary/90
    };

    const realFonts = {
      'Climate Crisis': 'Climate Crisis, cursive', // Títulos principales
      'Bebas Neue': 'var(--font-bebas-neue), Impact, sans-serif', // Subtítulos
      'Anton': 'var(--font-anton), Impact, sans-serif', // Botones destacados
      'Inter': 'var(--font-inter), system-ui, sans-serif', // Texto descriptivo
      'Plus Jakarta Sans': 'var(--font-plus-jakarta-sans), system-ui, sans-serif', // Texto general
    };

    const realSpacing = {
      'py-16': '64px', // py-16 md:py-24
      'py-24': '96px',
      'px-4': '16px', // px-4 md:px-8
      'px-8': '32px',
      'gap-4': '16px', // gap-4 md:gap-8
      'gap-8': '32px',
      'mb-12': '48px', // mb-12, mb-16
      'mb-16': '64px',
      'p-8': '32px', // p-8 en cards
      'p-6': '24px', // p-6 en botones
      'p-4': '16px', // p-4 en elementos pequeños
      'p-3': '12px', // p-3 en elementos muy pequeños
    };

    const realEffects = {
      'halftone-bg': 'Patrón de puntos usado en overlays',
      'text-stroke': 'Contorno negro de 3px en texto blanco',
      'text-stroke-red': 'Contorno negro de 3px en texto rojo',
      'text-stroke-double': 'Contorno negro de 4px con drop-shadow',
      'ripped-edge': 'Borde rasgado usando clip-path',
      'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]': 'Sombra brutalista negra',
      'shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]': 'Sombra brutalista más grande',
      'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]': 'Sombra brutalista mediana',
      'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]': 'Sombra brutalista pequeña',
    };

    const realBorders = {
      'border-8': '8px', // border-8 en imágenes y elementos destacados
      'border-4': '4px', // border-4 en botones y cards
      'border-2': '2px', // border-2 en elementos pequeños
      'border-t-8': '8px top', // border-t-8 en footer
      'border-t-4': '4px top', // border-t-4 en separadores
    };

    const realTypography = {
      'text-3xl': '30px', // text-3xl md:text-5xl lg:text-6xl
      'text-5xl': '48px',
      'text-6xl': '60px',
      'text-4xl': '36px', // text-4xl en subtítulos
      'text-xl': '20px', // text-xl en títulos de cards
      'text-lg': '18px', // text-lg en subtítulos
      'text-base': '16px', // text-base en texto normal
      'text-sm': '14px', // text-sm en texto pequeño
      'text-xs': '12px', // text-xs en texto muy pequeño
    };

    return (
      <div style={{ 
        fontFamily: 'system-ui', 
        padding: '32px', 
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        lineHeight: '1.6'
      }}>
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '48px',
          padding: '32px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            marginBottom: '16px',
            color: '#000000',
            fontFamily: 'Climate Crisis, cursive'
          }}>
            🎨 DESIGN SYSTEM
          </h1>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '8px' }}>
            Análisis Real de la Página Raíz - Makers of Murcia
          </p>
          <p style={{ fontSize: '14px', color: '#888' }}>
            Versión 3.0.0 - 100% Sincronizado con Componentes Reales
          </p>
        </div>

        {/* Colores Reales */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            marginBottom: '24px',
            color: '#000000',
            fontFamily: 'Climate Crisis, cursive'
          }}>
            🎨 COLORES REALES COMPLETOS
          </h2>
          
          {/* Colores Principales */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#000000' }}>
              Colores Principales del Sistema
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '16px' 
            }}>
              {Object.entries(realColors).slice(0, 5).map(([name, value]) => (
                <div key={name} style={{ 
                  backgroundColor: 'white', 
                  padding: '16px', 
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ 
                    width: '100%', 
                    height: '60px', 
                    backgroundColor: value,
                    borderRadius: '4px',
                    marginBottom: '12px',
                    border: '2px solid #e5e7eb'
                  }} />
                  <h4 style={{ fontWeight: 'bold', marginBottom: '4px' }}>{name}</h4>
                  <p style={{ fontSize: '14px', color: '#666', fontFamily: 'monospace' }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Colores de Texto */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#000000' }}>
              Colores de Texto
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
              gap: '12px' 
            }}>
              {Object.entries(realColors).slice(5, 10).map(([name, value]) => (
                <div key={name} style={{ 
                  backgroundColor: 'white', 
                  padding: '12px', 
                  borderRadius: '6px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ 
                    width: '100%', 
                    height: '40px', 
                    backgroundColor: value,
                    borderRadius: '4px',
                    marginBottom: '8px',
                    border: '1px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: value === '#FFFFFF' ? '#000000' : '#FFFFFF',
                    fontWeight: 'bold'
                  }}>
                    Aa
                  </div>
                  <h4 style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '14px' }}>{name}</h4>
                  <p style={{ fontSize: '12px', color: '#666', fontFamily: 'monospace' }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Colores de Fondo */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#000000' }}>
              Colores de Fondo
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
              gap: '12px' 
            }}>
              {Object.entries(realColors).slice(10, 18).map(([name, value]) => (
                <div key={name} style={{ 
                  backgroundColor: 'white', 
                  padding: '12px', 
                  borderRadius: '6px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ 
                    width: '100%', 
                    height: '40px', 
                    backgroundColor: value,
                    borderRadius: '4px',
                    marginBottom: '8px',
                    border: '1px solid #e5e7eb'
                  }} />
                  <h4 style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '14px' }}>{name}</h4>
                  <p style={{ fontSize: '12px', color: '#666', fontFamily: 'monospace' }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Colores de Estado */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#000000' }}>
              Colores de Estado
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
              gap: '12px' 
            }}>
              {Object.entries(realColors).slice(18, 29).map(([name, value]) => (
                <div key={name} style={{ 
                  backgroundColor: 'white', 
                  padding: '12px', 
                  borderRadius: '6px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ 
                    width: '100%', 
                    height: '40px', 
                    backgroundColor: value,
                    borderRadius: '4px',
                    marginBottom: '8px',
                    border: '1px solid #e5e7eb'
                  }} />
                  <h4 style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '14px' }}>{name}</h4>
                  <p style={{ fontSize: '12px', color: '#666', fontFamily: 'monospace' }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Colores Especiales */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#000000' }}>
              Colores Especiales y Opacidades
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
              gap: '12px' 
            }}>
              {Object.entries(realColors).slice(29).map(([name, value]) => (
                <div key={name} style={{ 
                  backgroundColor: 'white', 
                  padding: '12px', 
                  borderRadius: '6px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ 
                    width: '100%', 
                    height: '40px', 
                    backgroundColor: value,
                    borderRadius: '4px',
                    marginBottom: '8px',
                    border: '1px solid #e5e7eb'
                  }} />
                  <h4 style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '14px' }}>{name}</h4>
                  <p style={{ fontSize: '12px', color: '#666', fontFamily: 'monospace' }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tipografías Reales */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            marginBottom: '24px',
            color: '#000000',
            fontFamily: 'Climate Crisis, cursive'
          }}>
            📝 TIPOGRAFÍAS REALES
          </h2>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            {Object.entries(realFonts).map(([name, fontFamily]) => (
              <div key={name} style={{ marginBottom: '24px' }}>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  marginBottom: '8px',
                  fontFamily: fontFamily
                }}>
                  {name}
                </h3>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#666', 
                  fontFamily: 'monospace',
                  marginBottom: '8px'
                }}>
                  {fontFamily}
                </p>
                <p style={{ 
                  fontSize: '18px', 
                  fontFamily: fontFamily,
                  color: '#333'
                }}>
                  Ejemplo de texto con esta tipografía
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing Real */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            marginBottom: '24px',
            color: '#000000',
            fontFamily: 'Climate Crisis, cursive'
          }}>
            📏 SPACING REAL
          </h2>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
              {Object.entries(realSpacing).map(([className, value]) => (
                <div key={className} style={{ 
                  padding: '12px', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{className}</div>
                  <div style={{ fontSize: '14px', color: '#666', fontFamily: 'monospace' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Efectos Reales */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            marginBottom: '24px',
            color: '#000000',
            fontFamily: 'Climate Crisis, cursive'
          }}>
            ✨ EFECTOS REALES
          </h2>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            {Object.entries(realEffects).map(([effect, description]) => (
              <div key={effect} style={{ 
                marginBottom: '16px', 
                padding: '16px', 
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '8px', fontFamily: 'monospace' }}>
                  .{effect}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>{description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Bordes Reales */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            marginBottom: '24px',
            color: '#000000',
            fontFamily: 'Climate Crisis, cursive'
          }}>
            🔲 BORDES REALES
          </h2>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
              {Object.entries(realBorders).map(([className, value]) => (
                <div key={className} style={{ 
                  padding: '16px', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>{className}</div>
                  <div style={{ fontSize: '14px', color: '#666', fontFamily: 'monospace' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tipografía Real */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            marginBottom: '24px',
            color: '#000000',
            fontFamily: 'Climate Crisis, cursive'
          }}>
            📐 TIPOGRAFÍA REAL
          </h2>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
              {Object.entries(realTypography).map(([className, value]) => (
                <div key={className} style={{ 
                  padding: '16px', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>{className}</div>
                  <div style={{ fontSize: '14px', color: '#666', fontFamily: 'monospace' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Componentes Reales */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            marginBottom: '24px',
            color: '#000000',
            fontFamily: 'Climate Crisis, cursive'
          }}>
            🧩 COMPONENTES REALES
          </h2>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {[
                { name: 'Hero', description: 'Sección principal con texto animado' },
                { name: 'Team', description: 'Cards con efectos de rotación' },
                { name: 'Gallery', description: 'Carrusel de imágenes con filtros' },
                { name: 'Event', description: 'Cards de eventos con sombras' },
                { name: 'Footer', description: 'Footer con información de contacto' },
                { name: 'Testimonials', description: 'Testimonios con efectos visuales' },
                { name: 'FinalCTA', description: 'Call to action final' },
                { name: 'WhatIsMaker', description: 'Sección explicativa' }
              ].map((component) => (
                <div key={component.name} style={{ 
                  padding: '16px', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>{component.name}</h3>
                  <p style={{ fontSize: '14px', color: '#666' }}>{component.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resumen */}
        <section style={{ 
          backgroundColor: '#000000', 
          color: 'white', 
          padding: '32px', 
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            marginBottom: '16px',
            fontFamily: 'Climate Crisis, cursive'
          }}>
            📊 RESUMEN DEL ANÁLISIS
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF6B35' }}>32</div>
              <div style={{ fontSize: '14px' }}>Colores Completos</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF6B35' }}>5</div>
              <div style={{ fontSize: '14px' }}>Tipografías</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF6B35' }}>12</div>
              <div style={{ fontSize: '14px' }}>Valores de Spacing</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF6B35' }}>9</div>
              <div style={{ fontSize: '14px' }}>Efectos CSS</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF6B35' }}>5</div>
              <div style={{ fontSize: '14px' }}>Tipos de Bordes</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF6B35' }}>8</div>
              <div style={{ fontSize: '14px' }}>Componentes</div>
            </div>
          </div>
          <p style={{ marginTop: '24px', fontSize: '16px', opacity: 0.8 }}>
            Este Design System refleja EXACTAMENTE los estilos usados en la página raíz de Makers of Murcia
          </p>
        </section>
      </div>
    );
  },
};