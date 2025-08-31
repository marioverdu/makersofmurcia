# 🐛 **DEBUG: CONVERSIÓN MARKDOWN A ADVANCEDTABLEV2**

## 🎯 **PROBLEMA IDENTIFICADO:**

Cuando pegas una tabla markdown en el editor WYSIWYG, se convierte a una "tabla simple" en lugar de **inmediatamente** convertirse al diseño completo de `AdvancedTableV2`.

## 🔍 **DEBUG IMPLEMENTADO:**

He agregado `console.log` en la función `handleSmartPaste` para ver exactamente qué HTML se está generando:

\`\`\`typescript
if (tableFormat === 'markdown') {
  tableHTML = convertMarkdownToTable(pastedText)
  console.log('🔍 [DEBUG] HTML generado para markdown:', tableHTML)
  // ...
}
\`\`\`

## 📊 **TABLA DE PRUEBA:**

Copia y pega esta tabla en `/admin/posts`:

\`\`\`markdown
| Modelo | Contraste ANSI real (IT7.215) | Lúmenes | Precio | Notas relevantes |
| --- | --- | --- | --- | --- |
| **BenQ TK700STi** | 320:1 | 3000 | $1,299 | DLP, contrastes reportados en tests externos |
| **Hisense PX1-Pro** | ~210:1 | 2200 | $3,999 | DLP UST rendimiento similar a Samsung |
\`\`\`

## 🔧 **PASOS PARA DEBUG:**

### **1. Abrir Consola del Navegador:**
- F12 → Console
- O Cmd+Option+I (Mac) / Ctrl+Shift+I (Windows)

### **2. Pegar la Tabla:**
- Ve a `/admin/posts`
- Haz clic en "Nuevo Post" o "Editar"
- Pega la tabla markdown de arriba

### **3. Verificar en Consola:**
Deberías ver algo como:
\`\`\`
🔍 [DEBUG] HTML generado para markdown: <div class="table-container" data-table-id="table_...">...
\`\`\`

## ✅ **HTML ESPERADO (DEBE SER IDÉNTICO a insertAdvancedTableV2New):**

\`\`\`html
<div class="table-container" data-table-id="table_[timestamp]_[random]">
  <table class="min-w-full border-collapse border border-gray-300 bg-white">
    <thead>
      <tr>
        <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left cursor-grab hover:bg-gray-200 transition-colors" contenteditable="true" draggable="true" ondragstart="handleColumnDragStart(event, 'table_[timestamp]_[random]', 0)" ondragover="handleColumnDragOver(event)" ondrop="handleColumnDrop(event, 'table_[timestamp]_[random]', 0)">
          Modelo
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
    </tbody>
  </table>
</div>
\`\`\`

## 🚫 **HTML INCORRECTO (LO QUE NO DEBE APARECER):**

\`\`\`html
<!-- ❌ ESTO NO DEBE APARECER -->
<table>
  <thead>
    <tr>
      <th>Modelo</th>
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
\`\`\`

## 🔍 **VERIFICACIONES EN CONSOLA:**

### **✅ Si el DEBUG funciona:**
- Verás el mensaje `🔍 [DEBUG] HTML generado para markdown:`
- El HTML será completo con todas las clases y event handlers
- La tabla se verá **IDÉNTICA** al botón "Tabla Avanzada"

### **❌ Si hay problemas:**
- No verás el mensaje de DEBUG
- El HTML será básico sin funcionalidades
- La tabla se verá diferente al botón "Tabla Avanzada"

## 🎯 **RESULTADO ESPERADO:**

Después de pegar la tabla markdown:

1. ✅ **Notificación**: "✅ Tabla Markdown convertida automáticamente a tabla visual"
2. ✅ **Console**: Mensaje de DEBUG con HTML completo
3. ✅ **Visual**: Tabla **IDÉNTICA** al botón "Tabla Avanzada"
4. ✅ **Funcionalidades**: Drag & drop, media, altura automática, edición

---

**🐛 ¡USA ESTA TABLA PARA DEBUG Y VERIFICA EN CONSOLA QUÉ HTML SE ESTÁ GENERANDO!** 🔍✨
