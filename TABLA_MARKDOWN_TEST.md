# 🧪 **PRUEBA DE CONVERSIÓN AUTOMÁTICA DE TABLA MARKDOWN**

## 🎯 **OBJETIVO: IDÉNTICO AL BOTÓN "TABLA AVANZADA"**

La tabla convertida debe ser **EXACTAMENTE IGUAL** en diseño y funcionalidades que la creada con el botón:
```html
<button class="justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 flex items-center gap-1" type="button">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table w-4 h-4">
    <path d="M12 3v18"></path>
    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
    <path d="M3 9h18"></path>
    <path d="M3 15h18"></path>
  </svg>
  Tabla Avanzada
</button>
```

## 📊 **Tabla de Prueba para Pegar en el Editor**

Copia y pega esta tabla en el editor de posts (`/admin/posts`):

```markdown
| Modelo | Contraste ANSI real (IT7.215) | Lúmenes | Precio | Notas relevantes |
| --- | --- | --- | --- | --- |
| **BenQ TK700STi** | 320:1 | 3000 | $1,299 | DLP, contrastes reportados en tests externos |
| **Hisense PX1-Pro** | ~210:1 | 2200 | $3,999 | DLP UST rendimiento similar a Samsung |
| Epson EH-TW9400 | ~500:1 | - | - | 3LCD, gama alta, referencias lab contrastes ANSI |
| Epson EH-TW9300 | ~470:1 | - | - | Muy similar TW9400 |
| Epson EH-TW7300/TW7400 | ~450:1 | - | - | Alta gama 3LCD |
```

## ✅ **Resultado Esperado: IDÉNTICO AL BOTÓN**

Después de pegar, deberías ver **EXACTAMENTE** lo mismo que al hacer clic en "Tabla Avanzada":

1. ✅ **Mismo HTML**: Estructura idéntica a `insertAdvancedTableV2New()`
2. ✅ **Mismos estilos**: `min-w-full border-collapse border border-gray-300 bg-white`
3. ✅ **Mismas funcionalidades**: Drag & drop, media, altura automática
4. ✅ **Mismos eventos**: `ondragstart`, `ondragover`, `ondrop`, `onpaste`, etc.
5. ✅ **Mismos IDs**: `data-table-id`, `data-cell-id` con formato correcto
6. ✅ **Mismo comportamiento**: Funciona igual que una tabla creada manualmente

## 🔧 **Funcionalidades que DEBEN Funcionar Igual:**

- **Drag & Drop**: `ondragstart="handleColumnDragStart(event, '${tableId}', ${index})"`
- **Edición**: `contenteditable="true"`
- **Media**: `onmouseenter="showMediaButton('${cellId}')"`
- **Altura automática**: `oninput="adjustCellHeight(this)"`
- **Pegado inteligente**: `onpaste="handleCellPaste(event, '${cellId}')"`

## 🚀 **Para Probar:**

1. Ve a `/admin/posts`
2. Haz clic en "Nuevo Post" o "Editar" un post existente
3. **PRIMERO**: Haz clic en el botón "Tabla Avanzada" para ver el diseño original
4. **DESPUÉS**: Copia la tabla markdown de arriba y pégalo en el editor
5. **COMPARA**: Las dos tablas deben ser visual y funcionalmente idénticas

## 🎯 **Verificación Crítica:**

- ✅ **HTML generado**: Debe ser idéntico al de `insertAdvancedTableV2New()`
- ✅ **Estilos visuales**: Mismo diseño, bordes, colores, espaciado
- ✅ **Funcionalidades**: Drag & drop, media, edición, altura automática
- ✅ **Eventos**: Todos los event handlers deben estar presentes
- ✅ **IDs únicos**: `table_${timestamp}_${random}` y `cell_${tableId}_${row}_${col}`

---

**¡La conversión automática ahora debe generar tablas IDÉNTICAS al botón "Tabla Avanzada"!** 🎉✨
