# 📝 EJEMPLOS DE ANOTACIONES PERMITIDAS EN STORYBOOK

## 🎯 **Nuevas Reglas de Anotaciones**

Las reglas de Storybook han sido mejoradas para permitir anotaciones y comentarios técnicos dentro de cada story `Default` cuando el desarrollador lo solicite expresamente.

## 📋 **Formato de Anotaciones Permitidas**

### **Ejemplo 1: Anotaciones en `parameters.docs.description`**

```typescript
// stories/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
# Button Component

## Colores utilizados:
- **Primary**: \`bg-blue-600\` - Azul principal para acciones primarias
- **Secondary**: \`bg-gray-200\` - Gris para acciones secundarias
- **Destructive**: \`bg-red-600\` - Rojo para acciones destructivas

## Propiedades específicas:
- **variant**: Controla el estilo visual del botón
- **size**: Determina el tamaño (sm, md, lg)
- **disabled**: Desactiva la interacción del botón

## Funciones concretas:
- **onClick**: Maneja eventos de clic
- **onFocus**: Gestiona el estado de foco
- **onBlur**: Maneja la pérdida de foco

## Consideraciones de accesibilidad:
- Soporte completo para lectores de pantalla
- Navegación por teclado habilitada
- Contraste de colores WCAG AA compliant
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
}
```

### **Ejemplo 2: Anotaciones en `parameters.docs.story.description`**

```typescript
// stories/Card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@/components/ui/card'

const meta: Meta<typeof Card> = {
  title: 'Card',
  component: Card,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Card content',
  },
  parameters: {
    docs: {
      description: {
        story: `
## Card Component - Story Default

### Colores utilizados:
- **Background**: \`bg-white\` - Fondo blanco para contraste
- **Border**: \`border-gray-200\` - Borde sutil para definición
- **Shadow**: \`shadow-sm\` - Sombra ligera para profundidad

### Propiedades específicas:
- **className**: Permite personalización adicional de estilos
- **children**: Contenido que se renderiza dentro de la card

### Funciones concretas:
- **hover**: Efecto de hover con \`hover:shadow-md\`
- **focus**: Estado de foco para accesibilidad

### Dependencias especiales:
- Requiere Tailwind CSS para estilos
- Compatible con React 18+
        `,
      },
    },
  },
}
```

### **Ejemplo 3: Anotaciones como comentarios dentro del objeto Default**

```typescript
// stories/Modal.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from '@/components/ui/modal'

const meta: Meta<typeof Modal> = {
  title: 'Modal',
  component: Modal,
}

export default meta
type Story = StoryObj<typeof modal>

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: 'Modal content',
  },
  // Anotaciones técnicas específicas de esta story
  parameters: {
    docs: {
      description: {
        story: `
## Modal Component - Story Default

### Colores utilizados:
- **Overlay**: \`bg-black/50\` - Fondo semitransparente
- **Content**: \`bg-white\` - Fondo blanco del contenido
- **Border**: \`border-gray-300\` - Borde del modal

### Propiedades específicas:
- **isOpen**: Controla la visibilidad del modal
- **onClose**: Callback para cerrar el modal
- **children**: Contenido que se renderiza dentro

### Funciones concretas:
- **Escape key**: Cierra el modal al presionar Escape
- **Click outside**: Cierra al hacer clic fuera del contenido
- **Focus trap**: Mantiene el foco dentro del modal

### Consideraciones de accesibilidad:
- ARIA roles y labels apropiados
- Focus management automático
- Soporte para lectores de pantalla
        `,
      },
    },
  },
}
```

## 🔧 **Reglas de Anotaciones**

### **✅ CUÁNDO INCLUIR ANOTACIONES:**
- Solo cuando el desarrollador lo pida explícitamente
- Para documentar colores y su propósito
- Para explicar propiedades específicas
- Para documentar funciones concretas
- Para notas técnicas relevantes
- Para consideraciones de accesibilidad
- Para dependencias o requisitos especiales

### **❌ CUÁNDO NO INCLUIR ANOTACIONES:**
- Si no hay petición explícita del desarrollador
- Para información obvia del código
- Para redundar con comentarios existentes
- Para información no técnica o irrelevante

### **📝 FORMATO REQUERIDO:**
- **Bullet list concisa y técnica**
- **Markdown para formato**
- **Ubicación**: `parameters.docs.description` o `parameters.docs.story.description`
- **Estilo**: Profesional y directo

## 🎯 **Ejemplos de Anotaciones por Tipo**

### **Colores:**
```markdown
### Colores utilizados:
- **Primary**: `bg-blue-600` - Azul principal para acciones primarias
- **Secondary**: `bg-gray-200` - Gris para acciones secundarias
- **Accent**: `bg-purple-500` - Púrpura para elementos destacados
```

### **Propiedades:**
```markdown
### Propiedades específicas:
- **variant**: Controla el estilo visual del componente
- **size**: Determina el tamaño (sm, md, lg, xl)
- **disabled**: Desactiva la interacción del componente
```

### **Funciones:**
```markdown
### Funciones concretas:
- **onClick**: Maneja eventos de clic del usuario
- **onFocus**: Gestiona el estado de foco
- **onBlur**: Maneja la pérdida de foco
```

### **Accesibilidad:**
```markdown
### Consideraciones de accesibilidad:
- Soporte completo para lectores de pantalla
- Navegación por teclado habilitada
- Contraste de colores WCAG AA compliant
- ARIA roles y labels apropiados
```

### **Dependencias:**
```markdown
### Dependencias especiales:
- Requiere Tailwind CSS para estilos
- Compatible con React 18+
- Necesita @radix-ui/react-dialog para funcionalidad
```

## 🚀 **Resultado Final**

**¡Las reglas de Storybook ahora son menos restrictivas y permiten documentación técnica cuando sea necesaria!**

- ✅ **Anotaciones permitidas** cuando el desarrollador las solicite
- ✅ **Formato conciso y técnico** requerido
- ✅ **Ubicaciones específicas** para las anotaciones
- ✅ **Tipos de anotaciones** claramente definidos
- ✅ **Reglas claras** sobre cuándo incluir o no
- ✅ **Mantiene estructura** cuando no hay petición explícita

**Ahora puedes documentar componentes con anotaciones técnicas detalladas cuando lo necesites, manteniendo la estructura limpia cuando no sea necesario.** 📝✨
