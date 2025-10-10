import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAdvancedTableV2 } from '../../hooks/use-advanced-table-v2';
import { MediaModal } from './MediaModal';
import { SmartTableCell } from './SmartTableCell';

// Importar TipTap de forma dinámica solo en el cliente
const TipTapEditor = dynamic(() => import('./TipTapEditor'), {
  ssr: false,
  loading: () => <div className="w-full h-32 bg-gray-100 animate-pulse rounded"></div>
});

interface AdvancedTableV2Props {
  initialContent?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export const AdvancedTableV2: React.FC<AdvancedTableV2Props> = ({
  initialContent = '',
  onChange,
  placeholder = 'Escribe aquí...',
  className = ''
}) => {
  const [isTableMenuOpen, setIsTableMenuOpen] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const menuRef = useRef<HTMLDivElement>(null);

  // Hook para funcionalidad avanzada
  const {
    tableConfig,
    isTableMenuOpen: isAdvancedMenuOpen,
    openTableMenu: openAdvancedMenu,
    closeTableMenu: closeAdvancedMenu,
    updateTableConfig,
    resetTableConfig,
    mediaItems,
    isMediaModalOpen,
    activeCellId,
    openMediaModal,
    closeMediaModal,
    addMediaItem,
    removeMediaItem,
    getMediaForCell
  } = useAdvancedTableV2();

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsTableMenuOpen(false);
      }
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  const insertTable = () => {
    // Esta función se manejará en el componente TipTapEditor
    setIsTableMenuOpen(false);
  };

  const addColumnBefore = () => {
    // Esta función se manejará en el componente TipTapEditor
  };

  const addColumnAfter = () => {
    // Esta función se manejará en el componente TipTapEditor
  };

  const deleteColumn = () => {
    // Esta función se manejará en el componente TipTapEditor
  };

  const addRowBefore = () => {
    // Esta función se manejará en el componente TipTapEditor
  };

  const addRowAfter = () => {
    // Esta función se manejará en el componente TipTapEditor
  };

  const deleteRow = () => {
    // Esta función se manejará en el componente TipTapEditor
  };

  const deleteTable = () => {
    // Esta función se manejará en el componente TipTapEditor
  };

  const toggleHeaderRow = () => {
    // Esta función se manejará en el componente TipTapEditor
  };

  const toggleHeaderColumn = () => {
    // Esta función se manejará en el componente TipTapEditor
  };

  // Función para manejar la adición de media
  const handleAddMedia = (cellId: string) => {
    openMediaModal(cellId);
  };

  // Función para manejar la inserción de media
  const handleInsertMedia = (mediaData: Omit<any, 'id' | 'cellId'>) => {
    if (activeCellId) {
      addMediaItem({
        ...mediaData,
        cellId: activeCellId
      });
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className={`advanced-table-v2 ${className}`}>
      {/* Barra de herramientas de tabla */}
      <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg border">
        <span className="text-sm font-medium text-gray-600">Tabla:</span>
        
        {/* Botón de insertar tabla */}
        <button
          onClick={() => setIsTableMenuOpen(!isTableMenuOpen)}
                      className="px-3 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          + Tabla
        </button>

        {/* Menú desplegable para configuración de tabla */}
        {isTableMenuOpen && (
          <div
            ref={menuRef}
            className="absolute z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Filas
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={tableRows}
                  onChange={(e) => setTableRows(parseInt(e.target.value) || 1)}
                  className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Columnas
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={tableCols}
                  onChange={(e) => setTableCols(parseInt(e.target.value) || 1)}
                  className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <button
                onClick={insertTable}
                className="w-full px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                Crear Tabla
              </button>
            </div>
          </div>
        )}

        {/* Botones de manipulación de tabla (solo visibles cuando hay tabla seleccionada) */}
        {editor.isActive('table') && (
          <>
            <div className="ml-4 border-l border-gray-300 pl-4">
              <span className="text-sm text-gray-600 mr-2">Columnas:</span>
              <button
                onClick={addColumnBefore}
                className="px-2 py-1 text-xs font-medium text-white bg-primary rounded hover:bg-primary/80 mr-1"
              >
                + Antes
              </button>
              <button
                onClick={addColumnAfter}
                className="px-2 py-1 text-xs font-medium text-white bg-primary rounded hover:bg-primary/80 mr-1"
              >
                + Después
              </button>
              <button
                onClick={deleteColumn}
                className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600"
              >
                - Col
              </button>
            </div>

            <div className="ml-4 border-l border-gray-300 pl-4">
              <span className="text-sm text-gray-600 mr-2">Filas:</span>
              <button
                onClick={addRowBefore}
                className="px-2 py-1 text-xs font-medium text-white bg-green-500 rounded hover:bg-green-600 mr-1"
              >
                + Antes
              </button>
              <button
                onClick={addRowAfter}
                className="px-2 py-1 text-xs font-medium text-white bg-green-500 rounded hover:bg-green-600 mr-1"
              >
                + Después
              </button>
              <button
                onClick={deleteRow}
                className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600"
              >
                - Fila
              </button>
            </div>

            <div className="ml-4 border-l border-gray-300 pl-4">
              <span className="text-sm text-gray-600 mr-2">Opciones:</span>
              <button
                onClick={toggleHeaderRow}
                className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-200 rounded hover:bg-gray-300 mr-1"
              >
                Header Fila
              </button>
              <button
                onClick={toggleHeaderColumn}
                className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-200 rounded hover:bg-gray-300 mr-1"
              >
                Header Col
              </button>
              <button
                onClick={deleteTable}
                className="px-2 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </>
        )}
      </div>

      {/* Editor de contenido */}
      <div className="border border-gray-300 rounded-lg">
        <TipTapEditor 
          initialContent={initialContent}
          onChange={onChange}
          placeholder={placeholder}
          className="min-h-[400px] p-4 focus:outline-none"
        />
      </div>

      {/* Modal de Media */}
      <MediaModal
        isOpen={isMediaModalOpen}
        onClose={closeMediaModal}
        onAddMedia={handleInsertMedia}
        cellId={activeCellId || ''}
      />
    </div>
  );
};

export default AdvancedTableV2;
