import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * # 🎨 Design System - Documentación Completa
 * 
 * Sistema centralizado de tokens REALMENTE USADOS en el proyecto.
 * 
 * **Versión:** 2.0.0 - ULTRA-LIMPIO  
 * **Última actualización:** 12 Octubre 2025  
 * **Estado:** 49 tokens, 100% sincronizados con sistema
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
 * Design System completo con tokens dinámicos cargados desde CSS variables.
 * 
 * **Características:**
 * - **Tokens:** Sistema completo de tokens (spacing, colors, effects, assets)
 * - **Sincronización:** 100% de los tokens están siendo usados en el sistema
 * - **Dinámico:** Valores cargados en tiempo real con `getCSSVar()`
 * 
 * **IMPORTANTE:** Los tokens se leen directamente desde las CSS variables,
 * por lo que cualquier cambio en `styles/tokens.css` se refleja automáticamente aquí.
 */
export const Default: Story = {
  render: () => {
    // Función para leer valores de CSS variables dinámicamente
    const getCSSVar = (varName: string): string => {
      if (typeof window === 'undefined') return '';
      return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    };

    // TOKENS USADOS - Solo los reales
    const spacingBaseTokens = [
      '--spacing-3', '--spacing-4', '--spacing-8', '--spacing-9',
      '--spacing-11', '--spacing-14'
    ];

    const spacingSemanticTokens = [
      { name: '--spacing-avatar', note: '28px - Avatar size' },
      { name: '--spacing-header-height', note: '40px - Header height' },
      { name: '--spacing-content-max-width', note: '1092px - Max content width' },
      { name: '--spacing-post-cards-max-width', note: '800px - Post cards width' },
      { name: '--spacing-posts-max-width', note: '1000px - Posts container' },
      { name: '--spacing-posts-container-top', note: '140px - Top spacing' },
      { name: '--spacing-posts-container-bottom', note: '72px - Bottom spacing' },
      { name: '--spacing-profile-card-height', note: '204px - Profile card' },
    ];

    const colorPalettes = {
      gray: ['--color-gray-100', '--color-gray-200', '--color-gray-600'],
      red: ['--color-red-50', '--color-red-200', '--color-red-600', '--color-red-700'],
      green: ['--color-green-500', '--color-green-600'],
    };

    const additionalColors = [
      { name: '--color-text', category: 'Text', note: 'Principal (hsl)' },
      { name: '--color-text-primary', category: 'Text', note: 'Alias de --color-text' },
      { name: '--color-text-secondary', category: 'Text', note: '#6B7280' },
      { name: '--color-background-primary', category: 'Background', note: '#F7F8FC' },
      { name: '--color-background-secondary', category: 'Background', note: '#FFFFFF' },
      { name: '--color-border-default', category: 'Border', note: 'Alias de gray-200' },
      { name: '--color-border-primary', category: 'Border', note: 'rgba(0,94,182,0.1)' },
      { name: '--color-border-accent', category: 'Border', note: '#3D5B6A' },
      { name: '--color-surface-glass', category: 'Surface', note: 'rgba(255,255,255,0.3)' },
      { name: '--color-toast-bg', category: 'Toast', note: 'rgba(30,30,30,0.9)' },
      { name: '--color-badge-teal-bg', category: 'Badge', note: '#E4F6F5' },
      { name: '--color-badge-teal-border', category: 'Badge', note: '#c5e0df' },
      { name: '--color-badge-purple-bg', category: 'Badge', note: '#eff0ff' },
      { name: '--color-badge-purple-border', category: 'Badge', note: '#D8D9F2' },
      { name: '--color-badge-orange-bg', category: 'Badge', note: '#ffebdc' },
      { name: '--color-badge-orange-border', category: 'Badge', note: '#F2E4D8' },
    ];

    const borderRadiusTokens = [
      { name: '--border-radius-base', label: 'base', note: '8px' },
      { name: '--border-radius-lg', label: 'lg', note: '12px - Más usado' },
    ];

    const zIndexTokens = [
      { name: '--z-index-50', label: 'z-index-50', note: '50 - Modales' },
      { name: '--z-index-header', label: 'z-index-header', note: '1000 - Header fijo' },
    ];

    const additionalEffects = [
      { name: '--shadow-sm', label: 'shadow-sm', note: 'Sombra ligera' },
      { name: '--shadow-lg', label: 'shadow-lg', note: 'Sombra pronunciada' },
      { name: '--blur-md', label: 'blur-md', note: '12px - Glassmorphism' },
      { name: '--transition-fast', label: 'transition-fast', note: '150ms' },
    ];

    const assetTokens = [
      { name: '--asset-bg-landing', label: 'Landing Background' },
      { name: '--asset-bg-work-experience', label: 'Work Experience Background' },
    ];

    return (
      <div style={{ fontFamily: 'system-ui' }}>
        {/* ========================================== */}
        {/* OVERVIEW */}
        {/* ========================================== */}
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '48px' }}>
            🎨 Design System
          </h1>

          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>
            📁 Ubicación de Archivos
          </h2>
          
          <div style={{ backgroundColor: getCSSVar('--color-gray-100'), padding: '24px', borderRadius: getCSSVar('--border-radius-lg'), border: `1px solid ${getCSSVar('--color-gray-200')}` }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Core Files:</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ padding: '8px 0', borderBottom: `1px solid ${getCSSVar('--color-gray-200')}` }}>
                <code style={{ backgroundColor: '#e0f2fe', padding: '4px 8px', borderRadius: '4px', fontSize: '14px' }}>
                  styles/tokens.css
                </code>
                <span style={{ color: getCSSVar('--color-text-secondary'), marginLeft: '12px' }}>→ 49 tokens centralizados (spacing, colors, effects, assets)</span>
              </li>
              <li style={{ padding: '8px 0', borderBottom: `1px solid ${getCSSVar('--color-gray-200')}` }}>
                <code style={{ backgroundColor: '#e0f2fe', padding: '4px 8px', borderRadius: '4px', fontSize: '14px' }}>
                  styles/utilities.css
                </code>
                <span style={{ color: getCSSVar('--color-text-secondary'), marginLeft: '12px' }}>→ Utility classes globales (header, glass, toast)</span>
              </li>
              <li style={{ padding: '8px 0' }}>
                <code style={{ backgroundColor: '#e0f2fe', padding: '4px 8px', borderRadius: '4px', fontSize: '14px' }}>
                  app/layout.tsx
                </code>
                <span style={{ color: getCSSVar('--color-text-secondary'), marginLeft: '12px' }}>→ Imports configurados</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ========================================== */}
        {/* TOKENS */}
        {/* ========================================== */}
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', borderTop: `2px solid ${getCSSVar('--color-gray-200')}` }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px' }}>
            🎨 Sistema de Tokens
          </h1>

          {/* SPACING */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>
              📐 Spacing
            </h2>
            
            <div style={{ backgroundColor: getCSSVar('--color-gray-100'), padding: '24px', borderRadius: getCSSVar('--border-radius-lg'), border: `1px solid ${getCSSVar('--color-gray-200')}`, marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Base Scale:</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
                {spacingBaseTokens.map((token) => {
                  const value = getCSSVar(token);
                  return (
                    <div key={token} style={{ padding: '12px', backgroundColor: 'white', borderRadius: getCSSVar('--border-radius-base'), border: `1px solid ${getCSSVar('--color-gray-200')}` }}>
                      <code style={{ fontSize: '12px', color: '#005eb6', display: 'block', marginBottom: '4px' }}>{token}</code>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>{value}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ backgroundColor: '#f0f9ff', padding: '24px', borderRadius: getCSSVar('--border-radius-lg'), border: '1px solid #e0f2fe' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Semantic Tokens:</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {spacingSemanticTokens.map((token) => {
                  const value = getCSSVar(token.name);
                  return (
                    <li key={token.name} style={{ padding: '12px 0', borderBottom: '1px solid #e0f2fe', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <code style={{ fontSize: '14px', color: '#005eb6', display: 'block', marginBottom: '4px' }}>{token.name}</code>
                        <span style={{ fontSize: '16px', fontWeight: '600' }}>{value}</span>
                      </div>
                      <span style={{ backgroundColor: '#e0f2fe', color: '#005eb6', padding: '4px 12px', borderRadius: getCSSVar('--border-radius-base'), fontSize: '11px', fontWeight: '500' }}>
                        {token.note}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          {/* COLORS */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>
              🎨 Colors
            </h2>
            <p style={{ color: getCSSVar('--color-text-secondary'), marginBottom: '24px', fontSize: '16px' }}>
              Paletas usadas: Gray, Red, Green + Badge colors
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {/* Gray Palette */}
              <div style={{ backgroundColor: getCSSVar('--color-gray-100'), padding: '20px', borderRadius: getCSSVar('--border-radius-lg'), border: `1px solid ${getCSSVar('--color-gray-200')}` }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Gray:</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {colorPalettes.gray.map((token) => {
                    const value = getCSSVar(token);
                    const name = token.replace('--color-', '');
                    return (
                      <div key={token} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', backgroundColor: `var(${token})`, borderRadius: getCSSVar('--border-radius-base'), border: `1px solid ${getCSSVar('--color-gray-200')}`, flexShrink: 0 }}></div>
                        <div style={{ minWidth: 0 }}>
                          <code style={{ fontSize: '11px', color: getCSSVar('--color-text-secondary') }}>{name}</code>
                          <div style={{ fontSize: '13px', fontWeight: '600' }}>{value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Red Palette */}
              <div style={{ backgroundColor: getCSSVar('--color-red-50'), padding: '20px', borderRadius: getCSSVar('--border-radius-lg'), border: '1px solid #FECACA' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Red:</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {colorPalettes.red.map((token) => {
                    const value = getCSSVar(token);
                    const name = token.replace('--color-', '');
                    return (
                      <div key={token} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', backgroundColor: `var(${token})`, borderRadius: getCSSVar('--border-radius-base'), border: '1px solid #FECACA', flexShrink: 0 }}></div>
                        <div style={{ minWidth: 0 }}>
                          <code style={{ fontSize: '11px', color: getCSSVar('--color-text-secondary') }}>{name}</code>
                          <div style={{ fontSize: '13px', fontWeight: '600' }}>{value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Green Palette */}
              <div style={{ backgroundColor: '#f0fdf4', padding: '20px', borderRadius: getCSSVar('--border-radius-lg'), border: '1px solid #dcfce7' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Green:</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {colorPalettes.green.map((token) => {
                    const value = getCSSVar(token);
                    const name = token.replace('--color-', '');
                    return (
                      <div key={token} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', backgroundColor: `var(${token})`, borderRadius: getCSSVar('--border-radius-base'), border: '1px solid #dcfce7', flexShrink: 0 }}></div>
                        <div style={{ minWidth: 0 }}>
                          <code style={{ fontSize: '11px', color: getCSSVar('--color-text-secondary') }}>{name}</code>
                          <div style={{ fontSize: '13px', fontWeight: '600' }}>{value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Additional Colors */}
            <div style={{ marginTop: '24px', backgroundColor: getCSSVar('--color-gray-100'), padding: '24px', borderRadius: getCSSVar('--border-radius-lg'), border: `1px solid ${getCSSVar('--color-gray-200')}` }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Colores Adicionales:</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                {additionalColors.map((color) => {
                  const value = getCSSVar(color.name);
                  const name = color.name.replace('--color-', '');
                  return (
                    <div key={color.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: 'white', borderRadius: getCSSVar('--border-radius-base'), border: `1px solid ${getCSSVar('--color-gray-200')}` }}>
                      <div style={{ width: '32px', height: '32px', backgroundColor: `var(${color.name})`, borderRadius: getCSSVar('--border-radius-base'), border: `1px solid ${getCSSVar('--color-gray-200')}`, flexShrink: 0 }}></div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: '10px', color: getCSSVar('--color-text-secondary'), marginBottom: '2px' }}>{color.category}</div>
                        <code style={{ fontSize: '11px', color: '#005eb6', display: 'block' }}>{name}</code>
                        <div style={{ fontSize: '13px', fontWeight: '600' }}>{value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* EFFECTS */}
          <section>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>
              ✨ Effects
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
              <div style={{ backgroundColor: getCSSVar('--color-gray-100'), padding: '24px', borderRadius: getCSSVar('--border-radius-lg'), border: `1px solid ${getCSSVar('--color-gray-200')}` }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Border Radius:</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {borderRadiusTokens.map((radius) => {
                    const value = getCSSVar(radius.name);
                    return (
                      <div key={radius.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <code style={{ fontSize: '13px', color: '#005eb6' }}>{radius.label}</code>
                        <div style={{ width: '60px', height: '40px', backgroundColor: '#e0f2fe', borderRadius: `var(${radius.name})`, border: '2px solid #005eb6' }}></div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ backgroundColor: getCSSVar('--color-gray-100'), padding: '24px', borderRadius: getCSSVar('--border-radius-lg'), border: `1px solid ${getCSSVar('--color-gray-200')}` }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Z-Index:</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {zIndexTokens.map((z) => {
                    const value = getCSSVar(z.name);
                    return (
                      <li key={z.name} style={{ padding: '8px 0', borderBottom: `1px solid ${getCSSVar('--color-gray-200')}`, display: 'flex', justifyContent: 'space-between' }}>
                        <code style={{ fontSize: '13px', color: '#005eb6' }}>{z.label}</code>
                        <span style={{ fontWeight: '600' }}>{value}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div style={{ backgroundColor: getCSSVar('--color-gray-100'), padding: '24px', borderRadius: getCSSVar('--border-radius-lg'), border: `1px solid ${getCSSVar('--color-gray-200')}` }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Otros Efectos:</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {additionalEffects.map((effect) => {
                    const value = getCSSVar(effect.name);
                    return (
                      <li key={effect.name} style={{ padding: '8px 0', borderBottom: `1px solid ${getCSSVar('--color-gray-200')}`, display: 'flex', justifyContent: 'space-between' }}>
                        <code style={{ fontSize: '13px', color: '#005eb6' }}>{effect.label}</code>
                        <span style={{ fontWeight: '600', fontSize: '11px' }}>{value}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Assets */}
            <div style={{ marginTop: '32px', backgroundColor: getCSSVar('--color-gray-100'), padding: '24px', borderRadius: getCSSVar('--border-radius-lg'), border: `1px solid ${getCSSVar('--color-gray-200')}` }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Assets (Backgrounds):</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {assetTokens.map((asset) => {
                  const value = getCSSVar(asset.name);
                  return (
                    <li key={asset.name} style={{ padding: '12px', marginBottom: '8px', backgroundColor: 'white', borderRadius: getCSSVar('--border-radius-base'), border: `1px solid ${getCSSVar('--color-gray-200')}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '12px', color: getCSSVar('--color-text-secondary'), marginBottom: '4px' }}>{asset.label}</div>
                          <code style={{ fontSize: '13px', color: '#005eb6' }}>{asset.name}</code>
                        </div>
                      </div>
                      <div style={{ fontSize: '11px', color: getCSSVar('--color-text-secondary'), marginTop: '8px', wordBreak: 'break-all' }}>{value}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </div>

        {/* ========================================== */}
        {/* UTILITY CLASSES */}
        {/* ========================================== */}
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', borderTop: `2px solid ${getCSSVar('--color-gray-200')}` }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px' }}>
            🔧 Utility Classes
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Glass BG */}
            <div style={{ backgroundColor: getCSSVar('--color-gray-100'), padding: '32px', borderRadius: getCSSVar('--border-radius-lg'), border: `1px solid ${getCSSVar('--color-gray-200')}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>.glass-bg</h2>
                  <p style={{ color: getCSSVar('--color-text-secondary'), fontSize: '16px' }}>Glassmorphism effect unificado</p>
                </div>
              </div>

              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: getCSSVar('--border-radius-lg'), border: `1px solid ${getCSSVar('--color-gray-200')}`, marginBottom: '16px' }}>
                <pre style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: getCSSVar('--color-text-primary'), overflow: 'auto' }}>
{`.glass-bg {
  background: var(--color-surface-glass);
  backdrop-filter: blur(var(--blur-md));
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-border-primary);
}`}
                </pre>
              </div>

              {/* Demo */}
              <div style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '40px',
                borderRadius: getCSSVar('--border-radius-lg'),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{
                  background: getCSSVar('--color-surface-glass'),
                  backdropFilter: `blur(${getCSSVar('--blur-md')})`,
                  WebkitBackdropFilter: `blur(${getCSSVar('--blur-md')})`,
                  borderRadius: getCSSVar('--border-radius-lg'),
                  border: `1px solid ${getCSSVar('--color-border-primary')}`,
                  padding: '32px 48px',
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: '600'
                }}>
                  ✨ Glassmorphism Demo
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  },
};
