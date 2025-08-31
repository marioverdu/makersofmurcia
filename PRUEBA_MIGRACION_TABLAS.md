# 🧪 **PRUEBA DE MIGRACIÓN COMPLETA DE TABLAS**

## 🎯 **OBJETIVO: VERIFICAR QUE SOLO EXISTA AdvancedTableV2**

Después de la migración, **todas las tablas** deben tener el diseño completo de `AdvancedTableV2`.

## 📊 **TABLA DE PRUEBA MARKDOWN:**

Copia y pega esta tabla en el editor de posts (`/admin/posts`):

```markdown
| Modelo | Contraste ANSI real (IT7.215) | Lúmenes | Precio | Notas relevantes |
| --- | --- | --- | --- | --- |
| **BenQ TK700STi** | 320:1 | 3000 | $1,299 | DLP, contrastes reportados en tests externos |
| **Hisense PX1-Pro** | ~210:1 | 2200 | $3,999 | DLP UST rendimiento similar a Samsung |
| Epson EH-TW9400 | ~500:1 | - | - | 3LCD, gama alta, referencias lab contrastes ANSI |
```

## ✅ **RESULTADO ESPERADO DESPUÉS DE LA MIGRACIÓN:**

### **1. HTML Generado (DEBE SER IDÉNTICO a insertAdvancedTableV2New):**
```html
<div class="table-container" data-table-id="table_[timestamp]_[random]">
  <table class="min-w-full border-collapse border border-gray-300 bg-white">
    <thead>
      <tr>
        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left cursor-grab hover:bg-gray-200 transition-colors" contenteditable="true" draggable="true" ondragstart="handleColumnDragStart(event, 'table_[timestamp]_[random]', 0)" ondragover="handleColumnDragOver(event)" ondrop="handleColumnDrop(event, 'table_[timestamp]_[random]', 0)">
          Modelo
        </th>
        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left cursor-grab hover:bg-gray-200 transition-colors" contenteditable="true" draggable="true" ondragstart="handleColumnDragStart(event, 'table_[timestamp]_[random]', 1)" ondragover="handleColumnDragOver(event)" ondrop="handleColumnDrop(event, 'table_[timestamp]_[random]', 1)">
          Contraste ANSI real (IT7.215)
        </th>
        <!-- ... más encabezados ... -->
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" contenteditable="true" data-cell-id="cell_table_[timestamp]_[random]_0_0" onpaste="handleCellPaste(event, 'cell_table_[timestamp]_[random]_0_0')" onmouseenter="showMediaButton('cell_table_[timestamp]_[random]_0_0')" onmouseleave="hideMediaButton('cell_table_[timestamp]_[random]_0_0')" oninput="adjustCellHeight(this)" onblur="adjustCellHeight(this)">
          <strong>BenQ TK700STi</strong>
        </td>
        <!-- ... más celdas ... -->
      </tr>
      <!-- ... más filas ... -->
    </tbody>
  </table>
</div>
```

### **2. Funcionalidades que DEBEN Funcionar:**
- ✅ **Drag & Drop**: Arrastrar encabezados para reordenar columnas
- ✅ **Edición**: Clic en celdas para editar contenido
- ✅ **Media**: Botón "+" aparece al hacer hover en celdas
- ✅ **Altura automática**: Las celdas se ajustan al contenido
- ✅ **Pegado inteligente**: Pegar contenido en celdas

### **3. Estilos Visuales:**
- ✅ **Bordes**: `border border-gray-300`
- ✅ **Encabezados**: `bg-gray-100 font-semibold`
- ✅ **Cursor**: `cursor-grab` en encabezados
- ✅ **Hover**: `hover:bg-gray-200` en encabezados
- ✅ **Transiciones**: `transition-colors`

## 🚫 **LO QUE NO DEBE APARECER:**

### **HTML Básico (ANTES de la migración):**
```html
<!-- ❌ ESTO NO DEBE APARECER MÁS -->
<table>
  <thead>
    <tr>
      <th>Modelo</th>
      <th>Contraste ANSI real (IT7.215)</th>
      <!-- ... -->
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>BenQ TK700STi</strong></td>
      <!-- ... -->
    </tr>
  </tbody>
</table>
```

### **Estilos Básicos:**
- ❌ Sin `cursor-grab`
- ❌ Sin `ondragstart`, `ondragover`, `ondrop`
- ❌ Sin `onmouseenter`, `onmouseleave`
- ❌ Sin `oninput`, `onblur`
- ❌ Sin `data-cell-id`

## 🔧 **PASOS PARA PROBAR:**

### **1. Comparación Directa:**
1. Ve a `/admin/posts`
2. Haz clic en "Nuevo Post" o "Editar"
3. **PRIMERO**: Haz clic en "Tabla Avanzada" para ver el diseño original
4. **DESPUÉS**: Pega la tabla markdown de arriba
5. **COMPARA**: Las dos tablas deben ser visual y funcionalmente idénticas

### **2. Verificación de Funcionalidades:**
1. **Drag & Drop**: Intenta arrastrar encabezados
2. **Media**: Haz hover sobre celdas para ver el botón "+"
3. **Edición**: Haz clic en celdas para editar
4. **Altura**: Escribe texto largo para ver ajuste automático

### **3. Inspección del HTML:**
1. Inspecciona el elemento de la tabla
2. Verifica que tenga `class="table-container"`
3. Verifica que tenga `data-table-id`
4. Verifica que las celdas tengan `data-cell-id`
5. Verifica que los encabezados tengan `ondragstart`, `ondragover`, `ondrop`

## 🎯 **CRITERIOS DE ÉXITO:**

### **✅ MIGRACIÓN EXITOSA si:**
- La tabla pegada se ve **EXACTAMENTE** igual que la del botón "Tabla Avanzada"
- Todas las funcionalidades (drag & drop, media, edición) funcionan
- El HTML generado es **IDÉNTICO** al de `insertAdvancedTableV2New()`
- No hay tablas básicas en el sistema

### **❌ MIGRACIÓN FALLIDA si:**
- La tabla pegada se ve diferente a la del botón "Tabla Avanzada"
- Las funcionalidades no funcionan (drag & drop, media, etc.)
- El HTML generado es básico sin event handlers
- Aparecen tablas con diseño antiguo

---

**🎯 ¡PRUEBA ESTA TABLA MARKDOWN PARA VERIFICAR QUE LA MIGRACIÓN ESTÉ COMPLETA!** 🚀✨
