# Storybook - Documentación de Componentes

## 🎨 ¿Qué es Storybook?

Storybook es una herramienta de desarrollo que te permite crear, documentar y probar componentes de UI de forma aislada. Es perfecta para:

- **Desarrollo de componentes**: Crear y probar componentes sin la complejidad de la aplicación completa
- **Documentación**: Generar documentación automática de tus componentes
- **Testing**: Probar diferentes estados y variantes de componentes
- **Diseño**: Mostrar a diseñadores y stakeholders cómo se ven los componentes

## 🚀 Cómo usar Storybook

### Iniciar Storybook

```bash
pnpm run storybook
```

Esto iniciará Storybook en `http://localhost:6006`

### Construir Storybook para producción

```bash
pnpm run build-storybook
```

Esto creará una versión estática en la carpeta `storybook-static/`

## 📁 Estructura de Stories

Los archivos de stories siguen esta convención:
- `ComponentName.stories.tsx` - junto al componente
- Ubicación: `components/` y `app/`

### Ejemplo de Story

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};
```

## 🎯 Componentes Disponibles

### UI Components
- **Button** (`components/ui/button.stories.tsx`)
  - Variantes: default, secondary, destructive, outline, ghost, link
  - Tamaños: sm, default, lg, icon
  - Estados: normal, disabled

### Business Components
- **PortfolioCard** (`components/portfolio-card.stories.tsx`)
  - Muestra tarjetas de portfolio con diferentes configuraciones
  - Incluye ejemplos con y sin fecha
  - Grid de múltiples tarjetas

## 🔧 Configuración

### Archivos de Configuración

- `.storybook/main.ts` - Configuración principal
- `.storybook/preview.ts` - Configuración de preview
- `.storybook/vitest.setup.ts` - Configuración de tests

### Características Configuradas

✅ **Tailwind CSS** - Estilos globales importados  
✅ **Alias de importación** - Soporte para `@/`  
✅ **Módulos nativos** - Excluidos del bundle  
✅ **Tests con Vitest** - Integración de testing  
✅ **Accesibilidad** - Addon de a11y incluido  

## 🧪 Testing con Storybook

Storybook incluye integración con Vitest para testing de componentes:

```typescript
import { expect, test } from '@storybook/test';
import { Button } from './button';

test('Button renders correctly', async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');
  
  expect(button).toBeInTheDocument();
});
```

## 🚨 Consideraciones Importantes

### Server Components
Los componentes que son Server Components (sin `'use client'`) no se pueden renderizar directamente en Storybook. Para estos casos:

1. **Crear wrappers cliente**:
```typescript
// ServerComponentWrapper.stories.tsx
'use client'
import { ServerComponent } from './server-component';

export const Default = () => <ServerComponent />;
```

2. **Mockear dependencias del servidor**:
```typescript
// Mock de datos del servidor
const mockData = { /* datos simulados */ };
```

### Módulos Nativos de Node.js
Los siguientes módulos están excluidos del bundle de Storybook:
- `fs`, `path`, `crypto`, `stream`
- `http`, `https`, `url`, `child_process`
- `nodemailer`, `@neondatabase/serverless`
- `@vercel/kv`, `@vercel/postgres`
- `ai`, `@ai-sdk/openai`
- `next-auth`, `@auth/core`, `@auth/prisma-adapter`

## 📚 Recursos Adicionales

- [Documentación oficial de Storybook](https://storybook.js.org/)
- [Guía de testing con Vitest](https://storybook.js.org/docs/next/writing-tests/introduction)
- [Addon de accesibilidad](https://storybook.js.org/docs/next/writing-tests/accessibility-testing)

## 🎨 Personalización

### Temas
Puedes cambiar el tema de fondo en `.storybook/preview.ts`:

```typescript
backgrounds: {
  default: 'light',
  values: [
    { name: 'light', value: '#ffffff' },
    { name: 'dark', value: '#1a1a1a' },
  ],
},
```

### Layouts
Configura layouts específicos para tus stories:

```typescript
parameters: {
  layout: 'centered', // o 'padded', 'fullscreen'
},
```

## 🚀 Despliegue

Para desplegar Storybook en Vercel:

1. Construir Storybook:
```bash
pnpm run build-storybook
```

2. Configurar Vercel para servir la carpeta `storybook-static/`

3. O crear un proyecto separado en Vercel apuntando a esta carpeta

---

¡Storybook está listo para usar! 🎉 