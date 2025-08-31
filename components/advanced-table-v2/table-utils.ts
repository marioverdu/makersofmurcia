// Funciones para el drag & drop de tablas convertidas

let draggedColumnIndex: number | null = null;
let draggedTableId: string | null = null;

export function handleColumnDragStart(event: DragEvent, tableId: string, columnIndex: number) {
  draggedColumnIndex = columnIndex;
  draggedTableId = tableId;
  
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', '');
  }
}

export function handleColumnDragOver(event: DragEvent) {
  event.preventDefault();
  event.dataTransfer!.dropEffect = 'move';
}

export function handleColumnDrop(event: DragEvent, tableId: string, targetColumnIndex: number) {
  event.preventDefault();
  
  if (!draggedColumnIndex || !draggedTableId || draggedTableId !== tableId) {
    return;
  }
  
  const table = document.querySelector(`[data-table-id="${tableId}"] table`);
  if (!table) return;
  
  const thead = table.querySelector('thead tr');
  const tbody = table.querySelector('tbody');
  
  if (!thead || !tbody) return;
  
  const headerCells = Array.from(thead.children) as HTMLElement[];
  const bodyRows = Array.from(tbody.children) as HTMLElement[];
  
  // Reordenar encabezados
  const draggedHeader = headerCells[draggedColumnIndex];
  const targetHeader = headerCells[targetColumnIndex];
  
  if (draggedHeader && targetHeader) {
    if (draggedColumnIndex < targetColumnIndex) {
      thead.insertBefore(draggedHeader, targetHeader.nextSibling);
    } else {
      thead.insertBefore(draggedHeader, targetHeader);
    }
  }
  
  // Reordenar celdas del cuerpo
  bodyRows.forEach(row => {
    const cells = Array.from(row.children) as HTMLElement[];
    const draggedCell = cells[draggedColumnIndex];
    const targetCell = cells[targetColumnIndex];
    
    if (draggedCell && targetCell) {
      if (draggedColumnIndex < targetColumnIndex) {
        row.insertBefore(draggedCell, targetCell.nextSibling);
      } else {
        row.insertBefore(draggedCell, targetCell);
      }
    }
  });
  
  // Actualizar índices de drag & drop para las nuevas posiciones
  const newHeaderCells = Array.from(thead.children) as HTMLElement[];
  newHeaderCells.forEach((cell, index) => {
    cell.setAttribute('ondragstart', `handleColumnDragStart(event, '${tableId}', ${index})`);
    cell.setAttribute('ondrop', `handleColumnDrop(event, '${tableId}', ${index})`);
  });
  
  draggedColumnIndex = null;
  draggedTableId = null;
}

// Función para hacer que las celdas sean editables
export function makeCellsEditable(tableId: string) {
  const table = document.querySelector(`[data-table-id="${tableId}"] table`);
  if (!table) return;
  
  const cells = table.querySelectorAll('td, th');
  cells.forEach(cell => {
    if (!cell.hasAttribute('contenteditable')) {
      cell.setAttribute('contenteditable', 'true');
    }
  });
}

// Función para inicializar todas las tablas convertidas
export function initializeConvertedTables() {
  const tables = document.querySelectorAll('[data-table-id^="converted_table_"]');
  
  tables.forEach(table => {
    const tableId = table.getAttribute('data-table-id');
    if (tableId) {
      makeCellsEditable(tableId);
    }
  });
}

// Inicializar cuando el DOM esté listo
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeConvertedTables);
  } else {
    initializeConvertedTables();
  }
}
