# 🎨 Design System - README

## ⚠️ FUENTE ÚNICA DE VERDAD

**TODO el Design System vive en Storybook.**

```bash
npm run storybook
```

→ **Documentation → Design System → Default**

---

## 🎉 SISTEMA UNIFICADO Y OPTIMIZADO (v2.0.0)

### **Resultado:**
- Sistema optimizado con tokens realmente usados
- Unificación de tipografía de todas las páginas públicas
- Eliminación de redundancias y paletas no usadas

### **Mejoras:**
- ✅ Paletas completas no usadas eliminadas
- ✅ Spacing redundante unificado con aliases
- ✅ Colors similares consolidados
- ✅ Effects no usados eliminados
- ✅ **Tipografía unificada** - Font sizes, weights y line-heights

---

## 📋 Reglas Importantes

### ✅ LO QUE SE DEBE HACER:

1. **Ver documentación:** Abrir Storybook
2. **Editar tokens:** Modificar `styles/tokens.css`
3. **Documentar cambios:** Editar `stories/DesignSystem.stories.tsx`
4. **Agregar análisis:** Agregar sección en `stories/DesignSystem.stories.tsx`

### ❌ LO QUE NO SE DEBE HACER:

1. **NO crear** `DESIGN_SYSTEM_*.md`
2. **NO crear** `TOKENS_*.md`
3. **NO crear** `*_AUDIT.md`
4. **NO crear** `*_OPTIMIZATION.md`
5. **NO documentar** fuera de Storybook
6. **NO incluir métricas numéricas** en documentación

---

## 📁 Estructura

```
styles/
  ├── tokens.css          # Definición de tokens (fuente de verdad)
  └── utilities.css       # Utility classes

stories/
  └── DesignSystem.stories.tsx  # Documentación completa

.cursorrules              # Reglas del proyecto (NO EDITAR)
```

---

## 🔄 Flujo de Trabajo

1. **Cambiar token:**
   ```css
   /* styles/tokens.css */
   --color-primary-500: #005eb6;
   ```

2. **Storybook se actualiza automáticamente:**
   - Usa `getCSSVar()` para leer valores
   - Muestra valores reales
   - Visualizaciones actualizadas

3. **Si necesitas documentar algo nuevo:**
   - Editar `stories/DesignSystem.stories.tsx`
   - Agregar sección o actualizar existente

---

## 📊 Contenido Actual en Storybook

### **Secciones:**

1. **Overview** - Resumen ejecutivo y archivos core
2. **Tokens** - Sistema completo de tokens
   - Spacing (Base + Semantic)
   - Colors (Gray, Red, Green, Primary + Semantic + Badge)
   - **Typography** (Font sizes, weights, line-heights)
   - Effects (Border radius, z-index, shadows, blur, transitions)
   - Assets (Backgrounds)
3. **Utility Classes** - Clases reutilizables
   - `.header-container`
   - `.glass-bg` (con demo interactivo)
   - `.header-padding`

---

## 🎯 Ver Documentación

```bash
npm run storybook
```

**NO editar este archivo. Es solo una referencia.**

---

**Última actualización:** 12 Octubre 2025
