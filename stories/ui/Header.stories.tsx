import type { Meta, StoryObj } from '@storybook/react'
import { DefaultHeader } from '@/components/ui/header/default-header'
import { StorybookAdminHeader } from '@/components/admin/storybook-admin-header'

const meta: Meta<typeof DefaultHeader> = {
  title: 'Header/Default',
  component: DefaultHeader,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Header por defecto con todas las secciones habilitadas
export const Default: Story = {
  args: {
    lang: 'es' as const,
  },
  name: '/',
  parameters: {
    docs: {
      description: {
        story: 'Header por defecto del sitio principal con todas las secciones de tabs habilitadas (Inicio, Posts, Experiencia, Contacto) y selector de idioma alineado a la derecha.',
      },
    },
  },
}

// Header de administración
export const Admin: Story = {
  render: () => <StorybookAdminHeader />,
  name: '/admin',
  parameters: {
    docs: {
      description: {
        story: 'Header del panel de administración con navegación específica para admin (Configuración, Rutas, Analytics, Posts, Reservas).',
      },
    },
  },
}

// Header de administración sin avatar (como en /admin/routes)
export const AdminRoutes: Story = {
  render: () => <StorybookAdminHeader hideAvatar={true} />,
  name: '/admin/routes',
  parameters: {
    docs: {
      description: {
        story: 'Header del panel de administración sin avatar, como se muestra en la página de rutas.',
      },
    },
  },
}

// Header de administración con ruta activa diferente
export const AdminAnalytics: Story = {
  render: () => <StorybookAdminHeader currentPath="/admin/analytics" />,
  name: '/admin/analytics',
  parameters: {
    docs: {
      description: {
        story: 'Header del panel de administración con la pestaña Analytics activa.',
      },
    },
  },
}
