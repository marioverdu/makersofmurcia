# 🎯 **Header Components - Sistema Unificado**

## 📋 **Componentes Disponibles**

### **1. HeaderContextualMenu** 🌟 **NUEVO - COMPONENTE PRINCIPAL**
Componente reutilizable que contiene el menú contextual del selector de idioma.

**Ubicación**: `components/ui/header/header-contextual-menu.tsx`

**Props**:
```tsx
interface HeaderContextualMenuProps {
  currentLang: Locale          // Idioma actual ('es' | 'en')
  className?: string           // Clases CSS adicionales
  onLanguageChange?: (newLang: Locale) => void  // Callback opcional
}
```

**Uso**:
```tsx
import { HeaderContextualMenu } from '@/components/ui/header/header-contextual-menu'

<HeaderContextualMenu 
  currentLang="es" 
  onLanguageChange={(lang) => console.log('Idioma cambiado a:', lang)}
/>
```

### **2. DefaultHeader** 🏠
Header principal del Storybook con avatar a la izquierda, tabs centradas y selector de idioma a la derecha.

**Ubicación**: `components/ui/header/default-header.tsx`

**Props**:
```tsx
interface DefaultHeaderProps {
  className?: string
  lang?: Locale  // Por defecto: 'es'
}
```

### **3. HeaderTabs** 📱
Tabs de navegación del header real con selector de idioma integrado.

**Ubicación**: `components/ui/header/tabs.tsx`

**Props**:
```tsx
interface HeaderTabsProps {
  className?: string
  pathname?: string  // Ruta actual (opcional)
  lang?: Locale     // Idioma actual (opcional)
}
```

### **4. StorybookHeaderTabs** 🎨
Versión simplificada de las tabs para Storybook (sin selector de idioma).

**Ubicación**: `components/ui/header/storybook-tabs.tsx`

## 🚀 **Migración al Nuevo Sistema**

### **ANTES** (Componentes individuales):
```tsx
import LanguageSwitcher from '@/components/language-switcher'
import { HeaderTabs } from '@/components/ui/header/tabs'

// Uso directo
<LanguageSwitcher currentLang="es" />
<HeaderTabs currentLang="es" />
```

### **AHORA** (Sistema unificado):
```tsx
import { HeaderContextualMenu, HeaderTabs } from '@/components/ui/header'

// Uso unificado
<HeaderContextualMenu currentLang="es" />
<HeaderTabs currentLang="es" />
```

## 🎨 **Características del HeaderContextualMenu**

### **Funcionalidades**:
- ✅ **Selector de idioma** con banderas 🇪🇸 🇺🇸
- ✅ **Dropdown funcional** que se abre/cierra
- ✅ **Estado local** del idioma seleccionado
- ✅ **Callback opcional** para cambios de idioma
- ✅ **Logs de debugging** en consola
- ✅ **Estilos consistentes** con el diseño del header

### **Estructura Visual**:
```
┌─────────────────────────────────────────────────────────┐
│ [Avatar] ← Izquierda    [Tabs] ← Centro    [🌍] ← Derecha │
└─────────────────────────────────────────────────────────┘
```

### **Posicionamiento**:
- **Avatar**: `position: absolute; left: 0`
- **Tabs**: `position: absolute; left: 50%; transform: translateX(-50%)`
- **Selector**: `position: absolute; right: 0`

## 🔧 **Implementación en Diferentes Contextos**

### **1. En Storybook**:
```tsx
// DefaultHeader ya incluye HeaderContextualMenu
<DefaultHeader lang="es" />
```

### **2. En Páginas Reales**:
```tsx
// HeaderTabs ya incluye HeaderContextualMenu
<HeaderTabs currentLang="es" />
```

### **3. Uso Independiente**:
```tsx
// Puedes usar HeaderContextualMenu en cualquier lugar
<HeaderContextualMenu 
  currentLang="en" 
  onLanguageChange={(lang) => router.push(`/${lang}${pathname}`)}
/>
```

## 📁 **Estructura de Archivos**

```
components/ui/header/
├── index.ts                    # Exportaciones unificadas
├── header-contextual-menu.tsx  # 🌟 Componente principal
├── default-header.tsx          # Header del Storybook
├── tabs.tsx                    # Tabs del header real
├── storybook-tabs.tsx          # Tabs simplificadas
└── README.md                   # Esta documentación
```

## 🎯 **Beneficios del Nuevo Sistema**

1. **🔄 Reutilización**: Un solo componente para todos los headers
2. **🎨 Consistencia**: Mismo diseño y comportamiento en todas partes
3. **🧹 Mantenimiento**: Un solo lugar para actualizar la funcionalidad
4. **📱 Responsive**: Funciona en todos los tamaños de pantalla
5. **🔧 Flexibilidad**: Callback opcional para personalizar el comportamiento
6. **📚 Documentación**: Sistema bien documentado y organizado

---

**¡El sistema de header ahora está completamente unificado con `HeaderContextualMenu` como componente principal!** 🚀

