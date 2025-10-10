### **Diálogo de Imágenes Fallidas (Diseño ConfirmableModal):**
\`\`\`html
<div class="fixed inset-0 z-[1000] flex items-center justify-center" aria-modal="true" role="dialog">
  <!-- Overlay -->
  <div class="absolute inset-0 bg-black/30"></div>
  
  <!-- Modal -->
  <div id="failed-images-dialog" class="relative bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
    <div class="text-center">
      <div class="flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
        </svg>
      </div>
      <h3 class="text-base font-semibold mb-2">2 imágenes no se han conseguido convertir</h3>
      <p class="text-sm text-gray-600 mb-4">El post se está guardando. Puedes continuar editando o cerrar este diálogo.</p>
      <div class="flex justify-end gap-2">
        <button id="close-dialog-btn" class="bg-[#3D5B6A] text-white rounded-md px-3 h-9 text-sm">Entendido</button>
      </div>
    </div>
  </div>
</div>
\`\`\`
