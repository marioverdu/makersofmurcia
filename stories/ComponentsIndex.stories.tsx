import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: '📚 Índice de Componentes',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# 📚 **ÍNDICE DE COMPONENTES - STORYBOOK**

## 🎯 **ELEMENTOS DE STORYBOOK**

| Elemento | Explicación |
|----------|-------------|
| 📁 (Carpeta) | **Story Group** - Agrupación de stories por categoría (ej: Next.js, Components) |
| 📄 (Documento) | **Story** - Historia específica de un componente (ej: AdvancedTableV2, Chat) |
| 🔧 (Engranaje) | **Addon** - Herramienta de Storybook (ej: a11y, docs, vitest) |
| 📚 (Libro) | **Documentation** - Página de documentación o índice |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ComponentsIndex: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">📚 Índice de Componentes</h1>
            <p className="text-xl text-muted-foreground">
              Elementos de Storybook
            </p>
          </div>

          {/* Tabla Única */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🎯 Elementos de Storybook</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Elemento</th>
                    <th className="text-left p-3 font-medium">Explicación</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 text-2xl">📁 (Carpeta)</td>
                    <td className="p-3">
                      <strong>Story Group</strong> - Agrupación de stories por categoría (ej: Next.js, Components)
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-2xl">📄 (Documento)</td>
                    <td className="p-3">
                      <strong>Story</strong> - Historia específica de un componente (ej: AdvancedTableV2, Chat)
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-2xl">🔧 (Engranaje)</td>
                    <td className="p-3">
                      <strong>Addon</strong> - Herramienta de Storybook (ej: a11y, docs, vitest)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-2xl">📚 (Libro)</td>
                    <td className="p-3">
                      <strong>Documentation</strong> - Página de documentación o índice
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Elementos de Storybook explicados con terminología oficial.',
      },
    },
  },
};
