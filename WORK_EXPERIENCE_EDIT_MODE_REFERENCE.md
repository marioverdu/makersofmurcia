# 🎯 **Work Experience Edit Mode - Referencia**

## 📋 **Definición**

El **"Work Experience Edit Mode"** (o simplemente **"edit mode"**) es una funcionalidad específica de la página `/work-experience` que permite editar in-situ el contenido de las cards de experiencia laboral y educación.

## 🎯 **Punto de Activación**

### **Botón "Editar contenido"**
- **Ubicación**: Menú contextual del ProfileCard (tres puntos verticales)
- **Visibilidad**: Solo visible para administradores en desarrollo
- **Acción**: Activa el modo de edición global

```tsx
<button
  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center rounded-md transition-colors"
  role="menuitem"
  onClick={handleEditContent}
>
  Editar contenido
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-2"
  >
    <path d="M12 20h9" />
    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
  </svg>
</button>
```

## 🔄 **Flujo de Activación**

### **1. Evento Personalizado**
```tsx
const handleEditContent = () => {
  setMenuOpen(false)
  // Disparar evento para activar modo de edición
  window.dispatchEvent(new CustomEvent("activateWorkExperienceEdit", {
    detail: { isEditing: true }
  }))
}
```

### **2. Escucha del Evento**
```tsx
useEffect(() => {
  const handleActivateEdit = (event: CustomEvent) => {
    setIsEditing(event.detail.isEditing)
  }

  window.addEventListener("activateWorkExperienceEdit", handleActivateEdit as EventListener)
  return () => {
    window.removeEventListener("activateWorkExperienceEdit", handleActivateEdit as EventListener)
  }
}, [])
```

## 🎨 **Características del Edit Mode**

### **1. Auto-Expansión de Cards**
- Todas las cards se expanden automáticamente al activar el modo
- Facilita la edición de contenido detallado

### **2. Campos Editables**
- **Título del trabajo** (`job_title`)
- **Nombre de la empresa** (`company_name`)
- **Año** (`year`)
- **Descripción** (`description`) - textarea
- **Contenido detallado** (`detailed_content`) - textarea

### **3. Estilo "Underline Input"**
```css
bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none px-1
```

### **4. Botón "Guardar cambios"**
- **Apariencia**: Texto azul, semibold
- **Ubicación**: Reemplaza el botón "Ver más/Ver menos"
- **Funcionalidad**: Guarda todos los cambios en la base de datos Neon

## 🔧 **Componentes Involucrados**

### **1. `components/profile-card.tsx`**
- Contiene el botón "Editar contenido"
- Dispara el evento `activateWorkExperienceEdit`

### **2. `components/work-card.tsx`**
- Maneja la lógica de edición in-situ
- Estados temporales para cambios
- Campos editables con estilo underline

### **3. `components/work-experience-section.tsx`**
- Pasa props de edición a `WorkCard`
- Maneja datos dinámicos

### **4. `app/work-experience/work-experience-client.tsx`**
- Escucha el evento de activación
- Maneja el estado global de edición
- Funciones de actualización y guardado

## 🗄️ **Base de Datos**

### **Tablas Utilizadas**
- **`work_experience`**: Experiencia laboral
- **`education`**: Educación
- **`about_me`**: Información "Sobre mí"

### **API Routes**
- **PUT** `/api/work-experience/work-experience` - Actualizar experiencia laboral
- **PUT** `/api/work-experience/education` - Actualizar educación
- **PUT** `/api/work-experience/about-me` - Actualizar "Sobre mí"

## 🎯 **Uso en Conversaciones**

### **Referencias Comunes**
- **"edit mode"** = Work Experience Edit Mode
- **"modo de edición"** = Work Experience Edit Mode
- **"botón editar contenido"** = Botón en menú contextual del ProfileCard
- **"edición in-situ"** = Edición directa en las cards sin cambiar de página

### **Ejemplos de Uso**
- "Necesito implementar el edit mode en la página de posts"
- "El edit mode de work-experience funciona correctamente"
- "¿Cómo activo el edit mode en development?"
- "El botón 'Editar contenido' no aparece"

## ✅ **Estado Actual**

- ✅ **Funcionalidad completa** implementada
- ✅ **Datos mock** para desarrollo
- ✅ **Base de datos Neon** para producción
- ✅ **UI/UX** consistente con el diseño
- ✅ **Estados temporales** para evitar pérdida de datos
- ✅ **Guardado en tiempo real** con confirmación

## 🚀 **Próximos Pasos**

1. **Extender a otras páginas**: Implementar edit mode en `/posts`, `/`, `/contact`
2. **Mejorar UX**: Indicadores visuales de cambios pendientes
3. **Validación**: Validación de campos antes de guardar
4. **Historial**: Historial de cambios y reversión

