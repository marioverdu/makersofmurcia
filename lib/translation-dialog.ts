import { TranslationStats } from './translation-service';

/**
 * Muestra un diálogo de confirmación para traducciones fallidas
 */
export const showTranslationFailedDialog = (stats: TranslationStats) => {
  // Remover diálogo existente si lo hay
  const existingDialog = document.getElementById('translation-failed-dialog');
  if (existingDialog) {
    existingDialog.remove();
  }

  if (stats.failedLines === 0) {
    return; // No mostrar diálogo si no hay fallos
  }

  // Crear el overlay y modal siguiendo el diseño del ConfirmableModal
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 z-[1000] flex items-center justify-center';
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('role', 'dialog');
  
  const overlayBg = document.createElement('div');
  overlayBg.className = 'absolute inset-0 bg-black/30';
  overlayBg.onclick = () => overlay.remove();
  
  const modal = document.createElement('div');
  modal.id = 'translation-failed-dialog';
  modal.className = 'relative bg-white rounded-lg p-6 w-full max-w-md shadow-lg';
  
  modal.innerHTML = `
    <div class="text-center">
      <div class="flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
        </svg>
      </div>
      <h3 class="text-base font-semibold mb-2">${stats.failedLines} línea${stats.failedLines > 1 ? 's' : ''} no se ha${stats.failedLines > 1 ? 'n' : ''} podido traducir</h3>
      <p class="text-sm text-gray-600 mb-4">El post se está guardando. Puedes continuar editando o cerrar este diálogo.</p>
      <div class="text-xs text-gray-500 mb-4 text-left max-h-32 overflow-y-auto">
        <p class="font-medium mb-2">Textos no traducidos:</p>
        ${stats.failedTexts.slice(0, 5).map(text => `<p class="mb-1">• ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}</p>`).join('')}
        ${stats.failedTexts.length > 5 ? `<p class="text-gray-400">... y ${stats.failedTexts.length - 5} más</p>` : ''}
      </div>
      <div class="flex justify-end gap-2">
        <button id="close-translation-dialog-btn" class="bg-[#3D5B6A] text-white rounded-md px-3 h-9 text-sm">Entendido</button>
      </div>
    </div>
  `;
  
  // Agregar event listener al botón de cerrar
  const closeBtn = modal.querySelector('#close-translation-dialog-btn');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.remove();
    });
  }
  
  // Construir la estructura completa
  overlay.appendChild(overlayBg);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
};

/**
 * Actualiza el diálogo de traducciones fallidas
 */
export const updateTranslationFailedDialog = (stats: TranslationStats) => {
  const dialogElement = document.getElementById('translation-failed-dialog');
  
  if (stats.failedLines > 0) {
    if (!dialogElement) {
      showTranslationFailedDialog(stats);
    } else {
      // Actualizar el texto existente
      const titleElement = dialogElement.querySelector('h3');
      if (titleElement) {
        titleElement.textContent = `${stats.failedLines} línea${stats.failedLines > 1 ? 's' : ''} no se ha${stats.failedLines > 1 ? 'n' : ''} podido traducir`;
      }
    }
  } else {
    // Remover el diálogo si no hay traducciones fallidas
    if (dialogElement) {
      dialogElement.remove();
    }
  }
};
