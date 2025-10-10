import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RoutesWidget } from './routes-widget'

const meta: Meta<typeof RoutesWidget> = {
  title: 'RoutesWidget',
  component: RoutesWidget,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    // Mock ligero de fetch para Storybook (solo para /api/admin/routes)
    const originalFetch = globalThis.fetch

    globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString()
      if (url.includes('/api/admin/routes')) {
        const mockResponse = {
          success: true,
          data: {
            routes: [
              {
                path: '/',
                type: 'page',
                category: 'public',
                isVisible: true,
                isIndexable: true,
                isProtected: false,
                seoTitle: 'Home',
                seoDescription: 'Landing',
                seoKeywords: 'home,landing',
                robotsAllow: true,
                sitemapInclude: true,
                priority: 1,
                accessCount: 68,
                lastModified: new Date().toISOString(),
                modifiedBy: 'storybook',
                lastAccessed: new Date().toISOString(),
              },
              {
                path: '/admin',
                type: 'page',
                category: 'admin',
                isVisible: true,
                isIndexable: false,
                isProtected: true,
                robotsAllow: false,
                sitemapInclude: false,
                priority: 0.5,
                accessCount: 29,
                lastModified: new Date().toISOString(),
                modifiedBy: 'storybook',
                lastAccessed: new Date().toISOString(),
              },
              {
                path: '/api/admin/routes',
                type: 'api',
                category: 'api',
                isVisible: true,
                isIndexable: false,
                isProtected: true,
                robotsAllow: false,
                sitemapInclude: false,
                priority: 0.1,
                accessCount: 86,
                lastModified: new Date().toISOString(),
                modifiedBy: 'storybook',
                lastAccessed: new Date().toISOString(),
              },
            ],
            stats: {
              total: 3,
              visible: 3,
              hidden: 0,
              indexable: 1,
              protected: 2,
              sitemap: 1,
            },
            meta: {
              environment: 'development',
              dbConnected: true,
            },
          },
        }

        return new Response(JSON.stringify(mockResponse), {
          headers: { 'Content-Type': 'application/json' },
          status: 200,
        })
      }

      return originalFetch(input as any, init)
    }

    const onUnmount = () => {
      globalThis.fetch = originalFetch
    }

    // Devolver el componente dentro de un contenedor para evitar fugas del mock al cambiar de story
    return (
      <div data-testid="routes-widget-story" style={{ padding: 16 }}>
        <RoutesWidget />
        {/* Restaurar fetch cuando Storybook desmonte esta renderización */}
        <Unmount onUnmount={onUnmount} />
      </div>
    )
  },
}

function Unmount({ onUnmount }: { onUnmount: () => void }) {
  React.useEffect(() => onUnmount, [])
  return null
}



