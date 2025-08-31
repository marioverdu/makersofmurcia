# Notion Database Test - Menú Contextual con Markdown

## 📋 Descripción

Esta página de test implementa una base de datos estilo Notion con funcionalidades avanzadas incluyendo un menú contextual de 3 puntos que permite copiar la tabla como markdown compatible con la mayoría de gestores de documentos.

## ✨ Funcionalidades Implementadas

### 🎯 **Menú Contextual (3 puntos)**
- **Ubicación**: Header de la columna "Actions" (última columna)
- **Acciones disponibles**:
  - **Copiar Markdown**: Convierte la tabla actual a formato markdown y la copia al portapapeles
  - **Feedback visual**: Muestra icono de check verde cuando se copia exitosamente
  - **Cierre automático**: El menú se cierra al hacer clic fuera o al copiar

### 📊 **Generación de Markdown**
- **Formato compatible**: Markdown estándar que funciona en:
  - GitHub/GitLab
  - Notion
  - Obsidian
  - Typora
  - Discord
  - Slack
  - Y cualquier editor que soporte tablas markdown

- **Estructura generada**:
\`\`\`markdown
| Nombre | Estado | Prioridad | Asignado | Fecha límite | Etiquetas | Progreso |
| --- | --- | --- | --- | --- | --- | --- |
| Proyecto de E-commerce | En progreso | Alta | María García | 2024-02-15 | Desarrollo, Frontend | 75% |
| Rediseño de Landing Page | Completado | Media | Carlos López | 2024-01-30 | Diseño, UI/UX | 100% |
\`\`\`

### 🎨 **Diseño Notion-like**
- **Headers arrastrables**: Reordenamiento horizontal de columnas
- **Filas arrastrables**: Reordenamiento vertical de filas
- **Edición inline**: Click para editar nombres directamente
- **Auto-focus**: Nuevas filas se enfocan automáticamente
- **Auto-delete**: Filas vacías se eliminan automáticamente

### 🔧 **Funcionalidades Técnicas**

#### **Drag & Drop**
- **Columnas**: Arrastra headers para reordenar columnas
- **Filas**: Arrastra filas para reordenarlas verticalmente
- **Feedback visual**: Indicadores de drop zone con colores

#### **Edición Inteligente**
- **Nuevas filas**: Campos vacíos por defecto
- **Focus automático**: Input se enfoca y selecciona automáticamente
- **Validación**: Filas vacías se eliminan al guardar o cancelar
- **Atajos**: Enter para guardar, Esc para cancelar

#### **Estado Persistente**
- **Orden de columnas**: Se mantiene durante la sesión
- **Datos**: Se preservan al reordenar
- **Configuración**: Ordenamiento y filtros se mantienen

## 🚀 **Cómo Usar**

### **1. Menú Contextual**
1. Busca el botón de 3 puntos (⋮) en la última columna del header
2. Haz clic para abrir el menú desplegable
3. Selecciona "Copiar Markdown"
4. La tabla se copia al portapapeles en formato markdown

### **2. Reordenamiento de Columnas**
1. Haz clic y arrastra cualquier header de columna (excepto checkbox y actions)
2. Mueve la columna hacia la izquierda o derecha
3. Suelta para reordenar

### **3. Reordenamiento de Filas**
1. Haz clic y arrastra el icono de grip (⋮⋮) en cualquier fila
2. Mueve la fila hacia arriba o abajo
3. Suelta para reordenar

### **4. Añadir Nuevas Filas**
1. Haz clic en el botón "+" en la primera columna
2. Escribe el nombre de la fila
3. Presiona Enter para guardar o Esc para cancelar

## 📁 **Estructura de Archivos**

\`\`\`
app/notion-database-test/
├── page.tsx          # Página principal con toda la lógica
└── layout.tsx        # Layout de la página

NOTION_DATABASE_TEST_README.md  # Esta documentación
\`\`\`

## 🛠 **Tecnologías Utilizadas**

- **React 18**: Hooks y componentes funcionales
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos y diseño responsive
- **Lucide React**: Iconos
- **Radix UI**: Componentes base (Button, Toast)
- **HTML5 Drag & Drop API**: Funcionalidad de arrastrar y soltar

## 📝 **Compatibilidad de Markdown**

El markdown generado es compatible con:

### ✅ **Plataformas Soportadas**
- **GitHub/GitLab**: Tablas en issues, PRs, wikis
- **Notion**: Importación directa de tablas
- **Obsidian**: Notas y documentación
- **Typora**: Editor de markdown
- **Discord**: Mensajes con formato
- **Slack**: Mensajes con formato
- **Confluence**: Páginas de documentación
- **Jira**: Comentarios y descripciones
- **Linear**: Issues y documentación
- **Figma**: Comentarios y documentación

### 📊 **Formato de Salida**
\`\`\`markdown
| Nombre | Estado | Prioridad | Asignado | Fecha límite | Etiquetas | Progreso |
| --- | --- | --- | --- | --- | --- | --- |
| Proyecto de E-commerce | En progreso | Alta | María García | 2024-02-15 | Desarrollo, Frontend | 75% |
| Rediseño de Landing Page | Completado | Media | Carlos López | 2024-01-30 | Diseño, UI/UX | 100% |
| Implementación de API | Pendiente | Alta | Ana Martínez | 2024-03-01 | Backend, API | 25% |
| Optimización de SEO | En progreso | Baja | Luis Rodríguez | 2024-02-28 | SEO, Marketing | 60% |
| Testing de Usabilidad | Pendiente | Media | Sofia Pérez | 2024-03-10 | Testing, UX | 0% |
\`\`\`

## 🎯 **Características Destacadas**

### **UX/UI**
- **Feedback visual**: Toast notifications para todas las acciones
- **Estados de carga**: Indicadores visuales durante operaciones
- **Responsive**: Funciona en diferentes tamaños de pantalla
- **Accesibilidad**: Navegación por teclado y screen readers

### **Performance**
- **Memoización**: Uso de `useMemo` para ordenamiento eficiente
- **Event delegation**: Manejo optimizado de eventos
- **Lazy loading**: Componentes se cargan bajo demanda

### **Mantenibilidad**
- **Código modular**: Funciones separadas para cada responsabilidad
- **TypeScript**: Tipado completo para prevenir errores
- **Documentación**: Comentarios explicativos en código crítico

## 🔮 **Próximas Mejoras**

- [ ] Exportar a CSV/Excel
- [ ] Filtros avanzados
- [ ] Búsqueda en tiempo real
- [ ] Persistencia en localStorage
- [ ] Temas personalizables
- [ ] Modo oscuro
- [ ] Exportar a PDF
- [ ] Integración con APIs externas
