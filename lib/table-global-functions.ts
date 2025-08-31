// Funciones globales para AdvancedTableV2 que deben estar disponibles en toda la aplicación
// Estas funciones se usan tanto en el editor admin como en la vista de posts

// Función para mostrar el botón de media en una celda
export const showMediaButton = (cellId: string) => {
  const cell = document.querySelector(`[data-cell-id="${cellId}"]`);
  if (cell) {
    const mediaButton = cell.querySelector('.media-add-button') as HTMLElement;
    if (mediaButton) {
      mediaButton.style.opacity = '1';
    }
  }
};

// Función para ocultar el botón de media en una celda
export const hideMediaButton = (cellId: string) => {
  const cell = document.querySelector(`[data-cell-id="${cellId}"]`);
  if (cell) {
    const mediaButton = cell.querySelector('.media-add-button') as HTMLElement;
    if (mediaButton) {
      mediaButton.style.opacity = '0';
    }
  }
};

// Función para manejar el pegado en celdas
export const handleCellPaste = (event: ClipboardEvent, cellId: string) => {
  event.preventDefault();
  const text = event.clipboardData?.getData('text/plain') || '';
  
  // Si es una URL de imagen, insertarla usando convenciones estándar de editores
  if (text.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
    const cell = document.querySelector(`[data-cell-id="${cellId}"]`) as HTMLElement;
    if (cell) {
      // Hacer que la celda sea editable y enfocable
      cell.contentEditable = 'true';
      cell.focus();
      
      // Usar document.execCommand para insertar HTML de manera estándar
      const imageHTML = `<img src="${text}" class="max-w-full h-auto max-h-16 sm:max-h-20 md:max-h-24 lg:max-h-32 min-w-[92px] object-contain rounded" alt="Imagen incrustada" loading="lazy">`;
      
      // Limpiar el contenido actual de la celda
      cell.innerHTML = '';
      
      // Insertar la imagen usando execCommand (convención estándar)
      document.execCommand('insertHTML', false, imageHTML);
      
      // Agregar botón de borrar después de insertar la imagen
      const imgElement = cell.querySelector('img');
      if (imgElement) {
        // Crear contenedor para imagen y botón
        const container = document.createElement('div');
        container.className = 'relative inline-block max-w-full';
        container.style.position = 'relative';
        
        // Mover la imagen al contenedor
        imgElement.parentNode?.insertBefore(container, imgElement);
        container.appendChild(imgElement);
        
        // Crear y agregar botón de borrar
        const deleteButton = document.createElement('button');
        const buttonId = `delete-btn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        deleteButton.className = 'absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors z-10';
        deleteButton.innerHTML = '×';
        deleteButton.setAttribute('contenteditable', 'false');
        deleteButton.setAttribute('data-action', 'delete-image');
        deleteButton.setAttribute('data-button-id', buttonId);
        deleteButton.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          container.remove();
          console.log('✅ [Smart Paste] Imagen eliminada con botón de borrar');
        });
        
        container.appendChild(deleteButton);
      }
      
      // Ajustar el tamaño de la celda para la imagen
      adjustCellSizeForImage(cell, text);
      
      // Verificar si la imagen se carga correctamente
      const imgElement2 = cell.querySelector('img');
      if (imgElement2) {
        imgElement2.addEventListener('load', () => {
          // Imagen cargada correctamente, verificar si hay otras fallidas
          updateFailedImagesDialog();
        });
        
        imgElement2.addEventListener('error', () => {
          // Imagen fallida, actualizar diálogo
          updateFailedImagesDialog();
        });
      }
      
      console.log('✅ [Smart Paste] Imagen insertada con botón de borrar usando convenciones estándar:', text);
    }
  } else {
    // Si no es una imagen, insertar como texto usando convenciones estándar
    const cell = document.querySelector(`[data-cell-id="${cellId}"]`) as HTMLElement;
    if (cell) {
      cell.contentEditable = 'true';
      cell.focus();
      
      // Usar execCommand para insertar texto
      document.execCommand('insertText', false, text);
    }
  }
};

// Función para insertar imagen en celda (usada por el modal de media)
export const insertImageIntoCell = (cellId: string, imageUrl: string) => {
  const cell = document.querySelector(`[data-cell-id="${cellId}"]`) as HTMLElement;
  if (!cell) {
    console.error('❌ [Smart Paste] Celda no encontrada:', cellId);
    return;
  }
  
  // Hacer que la celda sea editable y enfocable
  cell.contentEditable = 'true';
  cell.focus();
  
  // Usar document.execCommand para insertar HTML de manera estándar
  const imageHTML = `<img src="${imageUrl}" class="max-w-full h-auto max-h-16 sm:max-h-20 md:max-h-24 lg:max-h-32 min-w-[92px] object-contain rounded" alt="Imagen incrustada" loading="lazy">`;
  
  // Limpiar el contenido actual de la celda
  cell.innerHTML = '';
  
  // Insertar la imagen usando execCommand (convención estándar)
  document.execCommand('insertHTML', false, imageHTML);
  
  // Agregar botón de borrar después de insertar la imagen
  const imgElement3 = cell.querySelector('img');
  if (imgElement3) {
    // Crear contenedor para imagen y botón
    const container = document.createElement('div');
    container.className = 'relative inline-block max-w-full';
    container.style.position = 'relative';
    
    // Mover la imagen al contenedor
    imgElement3.parentNode?.insertBefore(container, imgElement3);
    container.appendChild(imgElement3);
    
    // Crear y agregar botón de borrar
    const deleteButton = document.createElement('button');
    const buttonId = `delete-btn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    deleteButton.className = 'absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors z-10';
    deleteButton.innerHTML = '×';
    deleteButton.setAttribute('contenteditable', 'false');
    deleteButton.setAttribute('data-action', 'delete-image');
    deleteButton.setAttribute('data-button-id', buttonId);
    deleteButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      container.remove();
      console.log('✅ [Smart Paste] Imagen eliminada con botón de borrar');
    });
    
    container.appendChild(deleteButton);
  }
  
        // Ajustar el tamaño de la celda para la imagen
      adjustCellSizeForImage(cell, imageUrl);
      
      // Verificar si la imagen se carga correctamente
      const imgElement4 = cell.querySelector('img');
      if (imgElement4) {
        imgElement4.addEventListener('load', () => {
          // Imagen cargada correctamente, verificar si hay otras fallidas
          updateFailedImagesDialog();
        });
        
        imgElement4.addEventListener('error', () => {
          // Imagen fallida, actualizar diálogo
          updateFailedImagesDialog();
        });
      }
      
      console.log('✅ [Smart Paste] Imagen insertada con botón de borrar usando convenciones estándar:', imageUrl);
};

// Función para ajustar la altura de las celdas
export const adjustCellHeight = (cell: HTMLElement) => {
  if (cell) {
    cell.style.height = 'auto';
    cell.style.minHeight = 'auto';
  }
};

// Función para ajustar el tamaño de las celdas cuando contienen imágenes
export const adjustCellSizeForImage = (cell: HTMLElement, imageUrl: string) => {
  if (!cell) return;
  
  // Crear una imagen temporal para obtener las dimensiones
  const tempImg = new Image();
  tempImg.onload = () => {
    const imgWidth = tempImg.width;
    const imgHeight = tempImg.height;
    
    // Calcular el ancho mínimo necesario para la imagen
    const maxWidth = Math.min(imgWidth, 200); // Máximo 200px de ancho
    const aspectRatio = imgHeight / imgWidth;
    const calculatedHeight = maxWidth * aspectRatio;
    
    // Ajustar el ancho de la celda
    cell.style.minWidth = `${maxWidth + 20}px`; // 20px de padding
    cell.style.width = `${maxWidth + 20}px`;
    
    // Ajustar la altura de la celda
    const minHeight = Math.max(calculatedHeight + 20, 60); // Mínimo 60px de altura
    cell.style.minHeight = `${minHeight}px`;
    cell.style.height = `${minHeight}px`;
    
    console.log('✅ [Smart Paste] Celda ajustada para imagen:', { imgWidth, imgHeight, maxWidth, minHeight });
  };
  
  tempImg.onerror = () => {
    console.warn('⚠️ [Smart Paste] No se pudo cargar la imagen para ajustar la celda:', imageUrl);
    // Fallback: ajustar a un tamaño estándar
    cell.style.minWidth = '120px';
    cell.style.width = '120px';
    cell.style.minHeight = '80px';
    cell.style.height = '80px';
  };
  
  tempImg.src = imageUrl;
};

// Función para manejar el inicio del drag de columnas
export const handleColumnDragStart = (event: DragEvent, tableId: string, columnIndex: number) => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', columnIndex.toString());
  }
};

// Función para manejar el drag over de columnas
export const handleColumnDragOver = (event: DragEvent) => {
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }
};

// Función para manejar el drop de columnas
export const handleColumnDrop = (event: DragEvent, tableId: string, targetColumnIndex: number) => {
  event.preventDefault();
  const draggedColumnIndex = parseInt(event.dataTransfer?.getData('text/html') || '0');
  
  if (draggedColumnIndex === targetColumnIndex) return;
  
  const table = document.querySelector(`[data-table-id="${tableId}"]`);
  if (!table) return;
  
  const tableEl = table.querySelector('table');
  if (!tableEl) return;
  
  const thead = tableEl.querySelector('thead tr');
  const tbody = tableEl.querySelector('tbody');
  
  if (!thead || !tbody) return;
  
  // Reordenar encabezados
  const draggedHeader = thead.children[draggedColumnIndex];
  const targetHeader = thead.children[targetColumnIndex];
  
  if (draggedHeader && targetHeader) {
    if (draggedColumnIndex < targetColumnIndex) {
      thead.insertBefore(draggedHeader, targetHeader.nextSibling);
    } else {
      thead.insertBefore(draggedHeader, targetHeader);
    }
  }
  
  // Reordenar celdas del cuerpo
  Array.from(tbody.children).forEach(row => {
    const draggedCell = row.children[draggedColumnIndex];
    const targetCell = row.children[targetColumnIndex];
    
    if (draggedCell && targetCell) {
      if (draggedColumnIndex < targetColumnIndex) {
        row.insertBefore(draggedCell, targetCell.nextSibling);
      } else {
        row.insertBefore(draggedCell, targetCell);
      }
    }
  });
};

// Función para inicializar las funciones globales en el window object
export const initializeTableGlobalFunctions = () => {
  if (typeof window !== 'undefined') {
    // Solo definir si no existen ya
    if (!window.showMediaButton) {
      (window as any).showMediaButton = showMediaButton;
    }
    if (!window.hideMediaButton) {
      (window as any).hideMediaButton = hideMediaButton;
    }
    if (!window.handleCellPaste) {
      (window as any).handleCellPaste = handleCellPaste;
    }
    if (!window.adjustCellHeight) {
      (window as any).adjustCellHeight = adjustCellHeight;
    }
    if (!window.adjustCellSizeForImage) {
      (window as any).adjustCellSizeForImage = adjustCellSizeForImage;
    }
    if (!window.handleColumnDragStart) {
      (window as any).handleColumnDragStart = handleColumnDragStart;
    }
    if (!window.handleColumnDragOver) {
      (window as any).handleColumnDragOver = handleColumnDragOver;
    }
    if (!window.handleColumnDrop) {
      (window as any).handleColumnDrop = handleColumnDrop;
    }
    if (!window.detectFailedImages) {
      (window as any).detectFailedImages = detectFailedImages;
    }
    if (!window.updateFailedImagesDialog) {
      (window as any).updateFailedImagesDialog = updateFailedImagesDialog;
    }
  }
};

// Función para detectar imágenes que no se han cargado correctamente
export const detectFailedImages = (): number => {
  // Buscar todas las imágenes insertadas por el Smart Paste System
  // (imágenes dentro de contenedores con botones de borrar)
  const smartPasteContainers = document.querySelectorAll('.relative.inline-block');
  let failedCount = 0;
  
  smartPasteContainers.forEach(container => {
    const img = container.querySelector('img');
    if (!img) return;
    
    // Verificar si la imagen no se ha cargado correctamente
    if (img.complete && img.naturalWidth === 0) {
      failedCount++;
    }
    
    // Verificar si la imagen tiene un src válido pero no se ha cargado
    if (img.src && img.src !== 'data:,' && !img.complete) {
      // Si la imagen no se ha cargado después de un tiempo, considerarla fallida
      setTimeout(() => {
        if (!img.complete || img.naturalWidth === 0) {
          failedCount++;
          updateFailedImagesDialog();
        }
      }, 3000); // 3 segundos de timeout
    }
    
    // Verificar errores de carga
    if (img.src && img.src !== 'data:,') {
      // Agregar event listener para detectar errores
      img.addEventListener('error', () => {
        failedCount++;
        updateFailedImagesDialog();
      }, { once: true });
    }
  });
  
  return failedCount;
};

// Función para actualizar el diálogo de imágenes fallidas
export const updateFailedImagesDialog = () => {
  const failedCount = detectFailedImages();
  
  // Buscar o crear el elemento del diálogo
  let dialogElement = document.getElementById('failed-images-dialog');
  
  if (failedCount > 0) {
    if (!dialogElement) {
      // Crear el overlay y modal siguiendo el diseño del ConfirmableModal
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 z-[1000] flex items-center justify-center';
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('role', 'dialog');
      
      const overlayBg = document.createElement('div');
      overlayBg.className = 'absolute inset-0 bg-black/30';
      overlayBg.onclick = () => dialogElement?.remove();
      
      const modal = document.createElement('div');
      modal.id = 'failed-images-dialog';
      modal.className = 'relative bg-white rounded-lg p-6 w-full max-w-sm shadow-lg';
      
      modal.innerHTML = `
        <div class="text-center">
          <div class="flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <h3 class="text-base font-semibold mb-2">${failedCount} imagen${failedCount > 1 ? 'es' : ''} no se ha${failedCount > 1 ? 'n' : ''} conseguido convertir</h3>
          <p class="text-sm text-gray-600 mb-4">El post se está guardando. Puedes continuar editando o cerrar este diálogo.</p>
          <div class="flex justify-end gap-2">
            <button id="close-dialog-btn" class="bg-[#3D5B6A] text-white rounded-md px-3 h-9 text-sm">Entendido</button>
          </div>
        </div>
      `;
      
      // Agregar event listener al botón de cerrar
      const closeBtn = modal.querySelector('#close-dialog-btn');
      
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          overlay.remove();
        });
      }
      
      // Construir la estructura completa
      overlay.appendChild(overlayBg);
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
      
      // Guardar referencia al overlay para poder removerlo después
      dialogElement = overlay;
    } else {
      // Actualizar el texto existente
      const titleElement = dialogElement.querySelector('h3');
      if (titleElement) {
        titleElement.textContent = `${failedCount} imagen${failedCount > 1 ? 'es' : ''} no se ha${failedCount > 1 ? 'n' : ''} conseguido convertir`;
      }
    }
  } else {
    // Remover el diálogo si no hay imágenes fallidas
    if (dialogElement) {
      dialogElement.remove();
    }
  }
};

// Función para limpiar las funciones globales del window object
export const cleanupTableGlobalFunctions = () => {
  if (typeof window !== 'undefined') {
    delete (window as any).showMediaButton;
    delete (window as any).hideMediaButton;
    delete (window as any).handleCellPaste;
    delete (window as any).adjustCellHeight;
    delete (window as any).adjustCellSizeForImage;
    delete (window as any).handleColumnDragStart;
    delete (window as any).handleColumnDragOver;
    delete (window as any).handleColumnDrop;
    delete (window as any).detectFailedImages;
    delete (window as any).updateFailedImagesDialog;
  }
};
