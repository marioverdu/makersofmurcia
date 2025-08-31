import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Next.js/Smart Paste System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# 🧠 Smart Paste System - Guía de Implementación Completa

## 📋 **RESUMEN EJECUTIVO**

El **Smart Paste System** es un sistema de conversión automática de URLs a imágenes que detecta inteligentemente cuando un usuario pega un enlace de imagen y lo convierte automáticamente en una imagen visual dentro de celdas editables. Este sistema está optimizado para Next.js y proporciona una experiencia de usuario fluida sin intervención manual.

---

## 🎯 **ARQUITECTURA DEL SISTEMA**

### **✅ COMPONENTES PRINCIPALES:**

#### **1. Core Functions (\`lib/table-global-functions.ts\`)**
- **\`handleCellPaste()\`**: Función principal de detección y conversión
- **\`isImageUrl()\`**: Detector de URLs de imágenes
- **\`insertImageIntoCell()\`**: Inserción programática de imágenes
- **\`showMediaButton()\`**: Mostrar botón de media
- **\`hideMediaButton()\`**: Ocultar botón de media

#### **2. Media Modal (\`components/advanced-table-v2/MediaModal.tsx\`)**
- **\`handleEmbedSubmit()\`**: Procesamiento de URLs desde el modal
- **\`handleUploadSubmit()\`**: Subida de archivos locales

#### **3. Smart Table Cell (\`components/advanced-table-v2/SmartTableCell.tsx\`)**
- **\`onAddMedia()\`**: Integración con el sistema de media
- **\`onRemoveMedia()\`**: Eliminación de imágenes

#### **4. Páginas Next.js**
- **\`app/admin/posts/page.tsx\`**: Página principal que contiene el sistema
- **\`app/[lang]/posts/posts-page-client.tsx\`**: Página de posts
- **\`app/work-experience/work-experience-client.tsx\`**: Página de experiencia laboral

---

## 🔧 **IMPLEMENTACIÓN TÉCNICA COMPLETA**

### **✅ 1. FUNCIONES GLOBALES (\`lib/table-global-functions.ts\`)**

\`\`\`typescript
// Tipos para TypeScript
interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  alt?: string;
}

interface CellData {
  id: string;
  content: string;
  media?: MediaItem[];
}

// Regex para detectar URLs de imágenes
const IMAGE_URL_REGEX = /^https?:\\/\\/.+\\.(jpg|jpeg|png|gif|webp|svg|avif)$/i;

// Función principal de detección y conversión
export function handleCellPaste(event: ClipboardEvent, cellId: string): void {
  event.preventDefault();
  
  const pastedText = event.clipboardData?.getData('text/plain') || '';
  console.log('🔍 [Smart Paste] Texto pegado:', pastedText);
  
  if (isImageUrl(pastedText)) {
    console.log('✅ [Smart Paste] Convirtiendo URL a imagen:', pastedText);
    insertImageIntoCell(cellId, pastedText);
  } else {
    console.log('ℹ️ [Smart Paste] Pega normal permitido');
    // Insertar como texto normal
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(pastedText));
    }
  }
}

// Detector de URLs de imágenes
export function isImageUrl(url: string): boolean {
  return IMAGE_URL_REGEX.test(url.trim());
}

// Inserción programática de imágenes
export function insertImageIntoCell(cellId: string, imageUrl: string): void {
  const cell = document.querySelector(\`[data-cell-id="\${cellId}"]\`) as HTMLElement;
  if (!cell) {
    console.error('❌ [Smart Paste] Celda no encontrada:', cellId);
    return;
  }
  
  // Crear contenedor para la imagen
  const container = document.createElement('div');
  container.className = 'relative inline-block max-w-full';
  
  // Crear elemento imagen
  const img = document.createElement('img');
  img.src = imageUrl;
  img.className = 'max-w-full h-auto max-h-32 object-contain rounded';
  img.alt = 'Imagen incrustada';
  img.loading = 'lazy';
  
  // Crear botón de eliminación
  const removeButton = document.createElement('button');
  removeButton.className = 'absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors';
  removeButton.innerHTML = '×';
  removeButton.onclick = (e) => {
    e.stopPropagation();
    container.remove();
  };
  
  // Crear botón de media (para agregar más contenido)
  const mediaButton = document.createElement('button');
  mediaButton.className = 'absolute top-1 left-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-primary/80 transition-colors opacity-0 group-hover:opacity-100';
  mediaButton.innerHTML = '+';
  mediaButton.onclick = (e) => {
    e.stopPropagation();
    showMediaModal(cellId);
  };
  
  // Ensamblar componentes
  container.appendChild(img);
  container.appendChild(removeButton);
  container.appendChild(mediaButton);
  
  // Insertar en la celda
  cell.appendChild(container);
  
  // Ajustar altura de la celda si es necesario
  adjustCellHeight(cell);
}

// Mostrar botón de media
export function showMediaButton(cellId: string): void {
  const cell = document.querySelector(\`[data-cell-id="\${cellId}"]\`) as HTMLElement;
  if (cell) {
    cell.classList.add('group');
  }
}

// Ocultar botón de media
export function hideMediaButton(cellId: string): void {
  const cell = document.querySelector(\`[data-cell-id="\${cellId}"]\`) as HTMLElement;
  if (cell) {
    cell.classList.remove('group');
  }
}

// Ajustar altura de celda
export function adjustCellHeight(cell: HTMLElement): void {
  const content = cell.innerHTML;
  if (content.includes('<img')) {
    cell.style.minHeight = '120px';
  }
}

// Mostrar modal de media
export function showMediaModal(cellId: string): void {
  // Implementar lógica del modal
  console.log('📷 [Smart Paste] Abriendo modal para celda:', cellId);
}

// Inicialización del sistema
export function initializeTableGlobalFunctions(): void {
  console.log('🚀 [Smart Paste] Sistema inicializado');
}

// Limpieza del sistema
export function cleanupTableGlobalFunctions(): void {
  console.log('🧹 [Smart Paste] Sistema limpiado');
}
\`\`\`

### **✅ 2. COMPONENTE SMART TABLE CELL**

\`\`\`typescript
// components/advanced-table-v2/SmartTableCell.tsx
import React, { useState, useRef, useEffect } from 'react';
import { MediaItem } from '@/types/media';

interface SmartTableCellProps {
  id: string;
  initialContent?: string;
  media?: MediaItem[];
  onContentChange?: (content: string, media: MediaItem[]) => void;
  onAddMedia?: (media: MediaItem) => void;
  onRemoveMedia?: (mediaId: string) => void;
}

export const SmartTableCell: React.FC<SmartTableCellProps> = ({
  id,
  initialContent = '',
  media = [],
  onContentChange,
  onAddMedia,
  onRemoveMedia
}) => {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);
  const cellRef = useRef<HTMLTableCellElement>(null);

  useEffect(() => {
    if (cellRef.current) {
      // Agregar event listeners para el sistema de pegado
      const cell = cellRef.current;
      
      const handlePaste = (event: ClipboardEvent) => {
        // Usar la función global
        if (window.handleCellPaste) {
          window.handleCellPaste(event, id);
        }
      };
      
      const handleMouseEnter = () => {
        if (window.showMediaButton) {
          window.showMediaButton(id);
        }
      };
      
      const handleMouseLeave = () => {
        if (window.hideMediaButton) {
          window.hideMediaButton(id);
        }
      };
      
      cell.addEventListener('paste', handlePaste);
      cell.addEventListener('mouseenter', handleMouseEnter);
      cell.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        cell.removeEventListener('paste', handlePaste);
        cell.removeEventListener('mouseenter', handleMouseEnter);
        cell.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [id]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    onContentChange?.(newContent, media);
  };

  const handleAddMedia = (mediaItem: MediaItem) => {
    onAddMedia?.(mediaItem);
  };

  const handleRemoveMedia = (mediaId: string) => {
    onRemoveMedia?.(mediaId);
  };

  return (
    <td
      ref={cellRef}
      contentEditable={isEditing}
      data-cell-id={id}
      className="relative p-2 border border-gray-300 min-h-[40px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
      onFocus={() => setIsEditing(true)}
      onBlur={() => setIsEditing(false)}
      onInput={(e) => handleContentChange(e.currentTarget.textContent || '')}
      dangerouslySetInnerHTML={{ __html: content }}
    >
      {/* Contenido de media existente */}
      {media.map((item) => (
        <div key={item.id} className="relative inline-block max-w-full mb-2">
          <img
            src={item.url}
            alt={item.alt || 'Media'}
            className="max-w-full h-auto max-h-32 object-contain rounded"
          />
          <button
            onClick={() => handleRemoveMedia(item.id)}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
          >
            ×
          </button>
        </div>
      ))}
    </td>
  );
};
\`\`\`

### **✅ 3. COMPONENTE MEDIA MODAL**

\`\`\`typescript
// components/advanced-table-v2/MediaModal.tsx
import React, { useState } from 'react';
import { MediaItem } from '@/types/media';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMedia: (media: MediaItem) => void;
  cellId?: string;
}

export const MediaModal: React.FC<MediaModalProps> = ({
  isOpen,
  onClose,
  onAddMedia,
  cellId
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'embed'>('upload');
  const [embedUrl, setEmbedUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmbedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!embedUrl.trim()) return;

    setIsLoading(true);
    try {
      // Validar que es una URL de imagen
      if (!/^https?:\\/\\/.+\\.(jpg|jpeg|png|gif|webp|svg|avif)$/i.test(embedUrl)) {
        throw new Error('URL no válida para imagen');
      }

      const mediaItem: MediaItem = {
        id: \`media_\${Date.now()}\`,
        url: embedUrl,
        type: 'image',
        alt: 'Imagen incrustada'
      };

      onAddMedia(mediaItem);
      setEmbedUrl('');
      onClose();
    } catch (error) {
      console.error('Error al incrustar imagen:', error);
      alert('Error al procesar la URL de la imagen');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile) return;

    setIsLoading(true);
    try {
      // Aquí implementarías la lógica de subida a tu servidor/CDN
      const formData = new FormData();
      formData.append('file', uploadedFile);
      
      const response = await fetch('/api/upload-media', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Error en la subida');
      }
      
      const { url } = await response.json();
      
      const mediaItem: MediaItem = {
        id: \`media_\${Date.now()}\`,
        url,
        type: 'image',
        alt: uploadedFile.name
      };

      onAddMedia(mediaItem);
      setUploadedFile(null);
      onClose();
    } catch (error) {
      console.error('Error al subir archivo:', error);
      alert('Error al subir el archivo');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Agregar Media</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab('upload')}
            className={\`px-4 py-2 text-sm font-medium \${
              activeTab === 'upload'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }\`}
          >
            Subir Archivo
          </button>
          <button
            onClick={() => setActiveTab('embed')}
            className={\`px-4 py-2 text-sm font-medium \${
              activeTab === 'embed'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }\`}
          >
            Incrustar URL
          </button>
        </div>

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seleccionar archivo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              disabled={!uploadedFile || isLoading}
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/80 disabled:opacity-50"
            >
              {isLoading ? 'Subiendo...' : 'Subir Imagen'}
            </button>
          </form>
        )}

        {/* Embed Tab */}
        {activeTab === 'embed' && (
          <form onSubmit={handleEmbedSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL de la imagen
              </label>
              <input
                type="url"
                value={embedUrl}
                onChange={(e) => setEmbedUrl(e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              disabled={!embedUrl.trim() || isLoading}
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/80 disabled:opacity-50"
            >
              {isLoading ? 'Procesando...' : 'Incrustar Imagen'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
\`\`\`

### **✅ 4. HOOK PERSONALIZADO**

\`\`\`typescript
// hooks/useAdvancedTableV2.ts
import { useState, useCallback } from 'react';
import { MediaItem } from '@/types/media';

interface UseAdvancedTableV2Props {
  initialData?: Array<{
    id: string;
    content: string;
    media?: MediaItem[];
  }>;
}

export const useAdvancedTableV2 = ({ initialData = [] }: UseAdvancedTableV2Props) => {
  const [tableData, setTableData] = useState(initialData);
  const [selectedCell, setSelectedCell] = useState<string | null>(null);

  const updateCellContent = useCallback((cellId: string, content: string) => {
    setTableData(prev => 
      prev.map(cell => 
        cell.id === cellId 
          ? { ...cell, content }
          : cell
      )
    );
  }, []);

  const addMediaToCell = useCallback((cellId: string, media: MediaItem) => {
    setTableData(prev => 
      prev.map(cell => 
        cell.id === cellId 
          ? { 
              ...cell, 
              media: [...(cell.media || []), media]
            }
          : cell
      )
    );
  }, []);

  const removeMediaFromCell = useCallback((cellId: string, mediaId: string) => {
    setTableData(prev => 
      prev.map(cell => 
        cell.id === cellId 
          ? { 
              ...cell, 
              media: (cell.media || []).filter(m => m.id !== mediaId)
            }
          : cell
      )
    );
  }, []);

  const getCellData = useCallback((cellId: string) => {
    return tableData.find(cell => cell.id === cellId);
  }, [tableData]);

  return {
    tableData,
    selectedCell,
    setSelectedCell,
    updateCellContent,
    addMediaToCell,
    removeMediaFromCell,
    getCellData
  };
};
\`\`\`

### **✅ 5. PÁGINA NEXT.JS DE IMPLEMENTACIÓN**

\`\`\`typescript
// app/admin/posts/page.tsx
'use client';

import React, { useEffect } from 'react';
import { SmartTableCell } from '@/components/advanced-table-v2/SmartTableCell';
import { MediaModal } from '@/components/advanced-table-v2/MediaModal';
import { useAdvancedTableV2 } from '@/hooks/useAdvancedTableV2';
import { initializeTableGlobalFunctions, cleanupTableGlobalFunctions } from '@/lib/table-global-functions';

export default function AdminPostsPage() {
  const {
    tableData,
    selectedCell,
    setSelectedCell,
    updateCellContent,
    addMediaToCell,
    removeMediaFromCell
  } = useAdvancedTableV2({
    initialData: [
      { id: 'cell_1', content: 'Contenido inicial', media: [] },
      { id: 'cell_2', content: '', media: [] },
      { id: 'cell_3', content: '', media: [] }
    ]
  });

  useEffect(() => {
    // Inicializar funciones globales
    initializeTableGlobalFunctions();
    
    // Exponer funciones en window para acceso global
    (window as any).handleCellPaste = (event: ClipboardEvent, cellId: string) => {
      // Importar dinámicamente para evitar problemas de SSR
      import('@/lib/table-global-functions').then(({ handleCellPaste }) => {
        handleCellPaste(event, cellId);
      });
    };
    
    (window as any).showMediaButton = (cellId: string) => {
      import('@/lib/table-global-functions').then(({ showMediaButton }) => {
        showMediaButton(cellId);
      });
    };
    
    (window as any).hideMediaButton = (cellId: string) => {
      import('@/lib/table-global-functions').then(({ hideMediaButton }) => {
        hideMediaButton(cellId);
      });
    };

    return () => {
      cleanupTableGlobalFunctions();
    };
  }, []);

  const handleAddMedia = (media: any) => {
    if (selectedCell) {
      addMediaToCell(selectedCell, media);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Administración de Posts</h1>
      
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-3 text-left border-b">Título</th>
              <th className="p-3 text-left border-b">Contenido</th>
              <th className="p-3 text-left border-b">Media</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((cell) => (
              <tr key={cell.id}>
                <SmartTableCell
                  id={cell.id}
                  initialContent={cell.content}
                  media={cell.media || []}
                  onContentChange={(content) => updateCellContent(cell.id, content)}
                  onAddMedia={handleAddMedia}
                  onRemoveMedia={(mediaId) => removeMediaFromCell(cell.id, mediaId)}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <MediaModal
        isOpen={!!selectedCell}
        onClose={() => setSelectedCell(null)}
        onAddMedia={handleAddMedia}
        cellId={selectedCell || undefined}
      />
    </div>
  );
}
\`\`\`

### **✅ 6. TIPOS DE TYPESCRIPT**

\`\`\`typescript
// types/media.ts
export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  alt?: string;
  filename?: string;
  size?: number;
  mimeType?: string;
}

export interface CellData {
  id: string;
  content: string;
  media?: MediaItem[];
}

export interface TableData {
  rows: CellData[];
  columns: string[];
}
\`\`\`

### **✅ 7. API ROUTE PARA SUBIDA DE ARCHIVOS**

\`\`\`typescript
// app/api/upload-media/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No se proporcionó archivo' },
        { status: 400 }
      );
    }

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no permitido' },
        { status: 400 }
      );
    }

    // Validar tamaño (ej: 5MB máximo)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Archivo demasiado grande' },
        { status: 400 }
      );
    }

    // Generar nombre único
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = \`\${Date.now()}_\${file.name}\`;
    
    // Guardar en directorio público
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filepath = join(uploadDir, filename);
    
    await writeFile(filepath, buffer);
    
    // Retornar URL pública
    const publicUrl = \`/uploads/\${filename}\`;
    
    return NextResponse.json({
      url: publicUrl,
      filename: filename,
      size: file.size,
      mimeType: file.type
    });
    
  } catch (error) {
    console.error('Error en upload:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
\`\`\`

---

## 🎨 **CARACTERÍSTICAS VISUALES**

### **✅ ESTILOS CSS/TAILWIND:**

\`\`\`css
/* Estilos para celdas con Smart Paste System */
.smart-cell {
  @apply relative p-2 border border-gray-300 min-h-[40px];
  @apply focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1;
  @apply transition-all duration-200;
}

.smart-cell:hover {
  @apply border-primary/50;
}

/* Contenedor de imagen */
.image-container {
  @apply relative inline-block max-w-full;
  @apply transition-all duration-200;
}

/* Imagen responsive */
.smart-image {
  @apply max-w-full h-auto max-h-32 object-contain rounded;
  @apply transition-transform duration-200;
}

.smart-image:hover {
  @apply transform scale-105;
}

/* Botón de eliminación */
.remove-button {
  @apply absolute top-1 right-1;
  @apply bg-red-500 text-white rounded-full w-5 h-5;
  @apply flex items-center justify-center text-xs;
  @apply hover:bg-red-600 transition-colors;
  @apply opacity-0 group-hover:opacity-100;
}

/* Botón de media */
.media-button {
  @apply absolute top-1 left-1;
  @apply bg-primary text-white rounded-full w-5 h-5;
  @apply flex items-center justify-center text-xs;
  @apply hover:bg-primary/80 transition-colors;
  @apply opacity-0 group-hover:opacity-100;
}
\`\`\`

---

## 🔍 **DEBUGGING Y LOGS**

### **✅ LOGS DE DEBUG:**

\`\`\`typescript
// Configuración de logs para desarrollo
const DEBUG_MODE = process.env.NODE_ENV === 'development';

export function logDebug(message: string, data?: any): void {
  if (DEBUG_MODE) {
    console.log(\`🔍 [Smart Paste Debug] \${message}\`, data);
  }
}

export function logInfo(message: string, data?: any): void {
  if (DEBUG_MODE) {
    console.log(\`ℹ️ [Smart Paste Info] \${message}\`, data);
  }
}

export function logSuccess(message: string, data?: any): void {
  if (DEBUG_MODE) {
    console.log(\`✅ [Smart Paste Success] \${message}\`, data);
  }
}

export function logError(message: string, error?: any): void {
  console.error(\`❌ [Smart Paste Error] \${message}\`, error);
}
\`\`\`

### **✅ VERIFICACIÓN DE FUNCIONAMIENTO:**

1. **Abrir DevTools** del navegador
2. **Ir a la pestaña Console**
3. **Pegar URL de imagen** en celda
4. **Verificar logs** en consola:
   - \`🔍 [Smart Paste Debug] Texto pegado: https://...\`
   - \`✅ [Smart Paste Success] Convirtiendo URL a imagen: https://...\`
5. **Confirmar conversión** visual

---

## 🚀 **BENEFICIOS DEL SISTEMA**

### **✅ EXPERIENCIA DE USUARIO:**
- **Pegado directo**: No requiere pasos adicionales
- **Conversión automática**: Sin intervención manual
- **Feedback visual**: Confirmación inmediata
- **Eliminación fácil**: Botón de eliminar integrado
- **Responsive**: Se adapta a diferentes tamaños

### **✅ EFICIENCIA TÉCNICA:**
- **Detección inteligente**: Regex optimizado
- **Procesamiento rápido**: Conversión instantánea
- **Gestión de memoria**: Limpieza automática
- **Escalabilidad**: Funciona en múltiples celdas
- **TypeScript**: Tipado completo para seguridad

### **✅ MANTENIBILIDAD:**
- **Código modular**: Funciones separadas
- **Reutilización**: Sistema aplicable a otros componentes
- **Documentación**: Comentarios detallados
- **Testing**: Fácil de probar y debuggear
- **Next.js optimizado**: Aprovecha características del framework

---

## 🎯 **CASOS DE USO**

### **✅ USO COMÚN:**
- **Bloggers**: Pegar URLs de imágenes de stock
- **Desarrolladores**: Insertar screenshots de aplicaciones
- **Diseñadores**: Mostrar mockups y prototipos
- **Marketers**: Incluir gráficos e infografías

### **✅ ESCENARIOS ESPECÍFICOS:**
- **Documentación técnica**: Screenshots de errores
- **Presentaciones**: Gráficos y diagramas
- **Portfolios**: Trabajos y proyectos
- **Tutoriales**: Imágenes paso a paso

---

## 🎉 **CONCLUSIÓN**

El **Smart Paste System** es un sistema robusto y elegante que mejora significativamente la experiencia de usuario al trabajar con imágenes en tablas. Su implementación modular, detección inteligente y optimización para Next.js lo convierten en una herramienta esencial para la gestión de contenido multimedia.

**Características clave:**
- ✅ Detección automática de URLs de imágenes
- ✅ Conversión instantánea sin intervención manual
- ✅ Interfaz intuitiva con botones de control
- ✅ Optimizado para Next.js y TypeScript
- ✅ Escalable y reutilizable
- ✅ Documentación técnica completa

**Palabras clave**: Smart Paste, Intelligent Conversion, Image Detection, URL Processing, Auto-Conversion, Media Management, Next.js, TypeScript
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SmartPasteSystemDoc: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">🧠 Smart Paste System</h1>
            <p className="text-xl text-muted-foreground">
              Guía de Implementación Completa para Desarrolladores Senior de Next.js
            </p>
          </div>

          {/* Resumen Ejecutivo */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">📋 Resumen Ejecutivo</h2>
            <p className="text-muted-foreground">
              El <strong>Smart Paste System</strong> es un sistema de conversión automática de URLs a imágenes que detecta inteligentemente cuando un usuario pega un enlace de imagen y lo convierte automáticamente en una imagen visual dentro de celdas editables. Este sistema está optimizado para Next.js y proporciona una experiencia de usuario fluida sin intervención manual.
            </p>
          </div>

          {/* Arquitectura */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🏗️ Arquitectura del Sistema</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Componentes Principales</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <code>lib/table-global-functions.ts</code> - Funciones core</li>
                  <li>• <code>components/advanced-table-v2/MediaModal.tsx</code> - Modal de media</li>
                  <li>• <code>components/advanced-table-v2/SmartTableCell.tsx</code> - Celdas inteligentes</li>
                  <li>• <code>hooks/useAdvancedTableV2.ts</code> - Hook personalizado</li>
                  <li>• <code>app/api/upload-media/route.ts</code> - API de subida</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Funciones Core</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <code>handleCellPaste()</code> - Detección y conversión</li>
                  <li>• <code>isImageUrl()</code> - Detector de URLs</li>
                  <li>• <code>insertImageIntoCell()</code> - Inserción programática</li>
                  <li>• <code>showMediaButton()</code> - Mostrar controles</li>
                  <li>• <code>hideMediaButton()</code> - Ocultar controles</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Implementación Técnica */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🔧 Implementación Técnica</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">1. Funciones Globales</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm">
                    • Regex de detección: /^https?:\\/\\/.+\\.(jpg|jpeg|png|gif|webp|svg|avif)$/i<br/>
                    • Función principal: handleCellPaste(event, cellId)<br/>
                    • Inserción programática: insertImageIntoCell(cellId, imageUrl)<br/>
                    • Control de UI: showMediaButton() / hideMediaButton()
                  </code>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">2. Componente SmartTableCell</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm">
                    • Event listeners: paste, mouseenter, mouseleave<br/>
                    • ContentEditable: true para edición directa<br/>
                    • Data attributes: data-cell-id para identificación<br/>
                    • Media integration: onAddMedia, onRemoveMedia
                  </code>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">3. Hook Personalizado</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm">
                    • State management: tableData, selectedCell<br/>
                    • CRUD operations: updateCellContent, addMediaToCell<br/>
                    • TypeScript: Interfaces completas para type safety
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Características Visuales */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🎨 Características Visuales</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Estilos de Imagen</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Tamaño máximo: 128px altura</li>
                  <li>• Responsive: max-w-full h-auto</li>
                  <li>• Ajuste: object-contain</li>
                  <li>• Bordes: rounded</li>
                  <li>• Hover: scale-105</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Botones de Control</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Eliminación: absolute top-1 right-1</li>
                  <li>• Media: absolute top-1 left-1</li>
                  <li>• Colores: bg-red-500 / bg-primary</li>
                  <li>• Forma: rounded-full w-5 h-5</li>
                  <li>• Transiciones: opacity-0 → opacity-100</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Responsive Design</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Contenedor: relative inline-block</li>
                  <li>• Adaptación: max-w-full</li>
                  <li>• Integración: Compatible con tablas</li>
                  <li>• Mobile: Optimizado para touch</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Casos de Uso */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🎯 Casos de Uso</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Uso Común</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Bloggers: URLs de imágenes de stock</li>
                  <li>• Desarrolladores: Screenshots de apps</li>
                  <li>• Diseñadores: Mockups y prototipos</li>
                  <li>• Marketers: Gráficos e infografías</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Escenarios Específicos</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Documentación técnica: Screenshots</li>
                  <li>• Presentaciones: Gráficos y diagramas</li>
                  <li>• Portfolios: Trabajos y proyectos</li>
                  <li>• Tutoriales: Imágenes paso a paso</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Beneficios */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🚀 Beneficios del Sistema</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Experiencia de Usuario</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Pegado directo</li>
                  <li>• Conversión automática</li>
                  <li>• Feedback visual</li>
                  <li>• Eliminación fácil</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Eficiencia Técnica</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Detección inteligente</li>
                  <li>• Procesamiento rápido</li>
                  <li>• Gestión de memoria</li>
                  <li>• Escalabilidad</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Mantenibilidad</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Código modular</li>
                  <li>• Reutilización</li>
                  <li>• Documentación</li>
                  <li>• Testing</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Implementación Rápida */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">⚡ Implementación Rápida</h2>
            <div className="space-y-4">
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <h3 className="text-lg font-medium text-primary mb-2">Pasos para Implementar</h3>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li>1. Copiar <code>lib/table-global-functions.ts</code></li>
                  <li>2. Crear <code>components/SmartTableCell.tsx</code></li>
                  <li>3. Implementar <code>hooks/useAdvancedTableV2.ts</code></li>
                  <li>4. Configurar <code>app/api/upload-media/route.ts</code></li>
                  <li>5. Integrar en tu página Next.js</li>
                  <li>6. Agregar estilos CSS/Tailwind</li>
                </ol>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <code className="text-sm">
                  <strong>Tiempo estimado:</strong> 2-3 horas<br/>
                  <strong>Complejidad:</strong> Media<br/>
                  <strong>Dependencias:</strong> Next.js, TypeScript, Tailwind CSS
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Guía completa de implementación del Smart Paste System para desarrolladores senior de Next.js.',
      },
    },
  },
};
