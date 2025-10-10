# 🚀 **TABLA AVANZADA V2 - EJEMPLOS DE PRUEBA**

## 📋 **CÓMO PROBAR LA AUTO-CONVERSIÓN**

### ✅ **PASO 1: IR AL EDITOR**
1. Ve a `/admin/posts`
2. Haz clic en "Nuevo Post" o "Editar" un post existente
3. Haz clic en el área de contenido del editor

### ✅ **PASO 2: PEGAR CONTENIDO**
Copia y pega uno de estos ejemplos en el editor:

---

## 📊 **EJEMPLO 1: TABLA MARKDOWN**

\`\`\`markdown
| Título | Rating | Año | Género | Vista | Extra |
|--------|--------|-----|--------|-------|-------|
| The last of us | ⭐⭐⭐ | 2023 | Videojuego | Yes | |
| Neon genesis evangelion | ⭐⭐⭐ | 1995 | Animación | Yes | |
| Bojack Horseman | ⭐⭐⭐ | 2014 | Animación | Yes | |
| Dark | ⭐⭐⭐ | 2017 | Viajes temporales | Yes | |
| Years and years | ⭐⭐⭐ | 2019 | Drama | Yes | |
| Halt and catch fire | ⭐⭐⭐ | 2014 | Drama | Yes | |
| Devs | ⭐⭐⭐ | 2020 | Sci-Fi | Yes | |
| Mystic river | ⭐⭐⭐ | 2003 | Drama | No | |
| Ghost in the shell (anime) | ⭐⭐ | 1995 | Animación | No | |
| Cowboy bebop | ⭐⭐ | 1998 | Animación | No | |
\`\`\`

**Resultado esperado**: Se convertirá automáticamente en una tabla visual con 6 columnas y 10 filas.

---

## 📊 **EJEMPLO 2: TABLA TSV (TAB SEPARATED VALUES)**

\`\`\`
Título	Rating	Año	Género	Vista	Extra
The last of us	⭐⭐⭐	2023	Videojuego	Yes	
Neon genesis evangelion	⭐⭐⭐	1995	Animación	Yes	
Bojack Horseman	⭐⭐⭐	2014	Animación	Yes	
Dark	⭐⭐⭐	2017	Viajes temporales	Yes	
Years and years	⭐⭐⭐	2019	Drama	Yes	
Halt and catch fire	⭐⭐⭐	2014	Drama	Yes	
Devs	⭐⭐⭐	2020	Sci-Fi	Yes	
Mystic river	⭐⭐⭐	2003	Drama	No	
Ghost in the shell (anime)	⭐⭐	1995	Animación	No	
Cowboy bebop	⭐⭐	1998	Animación	No	
\`\`\`

**Resultado esperado**: Se convertirá automáticamente en una tabla visual con 6 columnas y 10 filas.

---

## 📊 **EJEMPLO 3: TABLA SIMPLE MARKDOWN**

\`\`\`markdown
| Nombre | Edad | Ciudad | Profesión |
|--------|------|--------|-----------|
| Juan | 25 | Madrid | Desarrollador |
| María | 30 | Barcelona | Diseñadora |
| Carlos | 28 | Valencia | Productor |
| Ana | 27 | Sevilla | Marketing |
\`\`\`

**Resultado esperado**: Se convertirá automáticamente en una tabla visual con 4 columnas y 4 filas.

---

## 📊 **EJEMPLO 4: TABLA TSV SIMPLE**

\`\`\`
Nombre	Edad	Ciudad	Profesión
Juan	25	Madrid	Desarrollador
María	30	Barcelona	Diseñadora
Carlos	28	Valencia	Productor
Ana	27	Sevilla	Marketing
\`\`\`

**Resultado esperado**: Se convertirá automáticamente en una tabla visual con 4 columnas y 4 filas.

---

## 🎯 **CARACTERÍSTICAS DE LA AUTO-CONVERSIÓN**

### ✅ **DETECCIÓN AUTOMÁTICA:**
- **Markdown**: Detecta `|` y líneas separadoras `---`
- **TSV**: Detecta tabs (`\t`) y múltiples columnas
- **Mínimo**: 2 líneas para TSV, 3 líneas para Markdown

### ✅ **CONVERSIÓN INTELIGENTE:**
- **Encabezados**: Primera línea se convierte en `<th>`
- **Datos**: Líneas restantes se convierten en `<td>`
- **Estilos**: Aplica diseño AdvancedTableV2 automáticamente
- **Edición**: Todas las celdas son `contenteditable="true"`

### ✅ **NOTIFICACIONES:**
- **Markdown**: "✅ Tabla Markdown convertida automáticamente a tabla visual"
- **TSV**: "✅ Tabla TSV convertida automáticamente a tabla visual"

---

## 🔧 **CÓMO FUNCIONA TÉCNICAMENTE**

### ✅ **FLUJO DE CONVERSIÓN:**
1. **Usuario pega contenido** en el editor
2. **Sistema detecta** si es Markdown o TSV
3. **Se previene** el pegado por defecto
4. **Se parsea** el contenido a estructura de datos
5. **Se genera** HTML de tabla con diseño AdvancedTableV2
6. **Se inserta** la tabla en lugar del texto pegado
7. **Se muestra** notificación de conversión exitosa

### ✅ **FUNCIONES IMPLEMENTADAS:**
- `detectMarkdownTable()`: Detecta tablas Markdown
- `detectTSVTable()`: Detecta tablas TSV
- `convertMarkdownToTable()`: Convierte Markdown a HTML
- `convertTSVToTable()`: Convierte TSV a HTML
- `handleSmartPaste()`: Maneja el pegado inteligente

---

## 🎉 **RESULTADO FINAL**

✅ **Auto-conversión automática** como Notion  
✅ **Detección inteligente** de formatos Markdown y TSV  
✅ **Diseño consistente** con AdvancedTableV2  
✅ **Celdas editables** para modificación posterior  
✅ **Notificaciones visuales** de conversión exitosa  
✅ **Integración nativa** en el editor de posts  

**¡Ahora puedes pegar tablas Markdown y TSV directamente en el editor y se convertirán automáticamente! 🚀**
