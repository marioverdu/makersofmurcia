"use client"

import React, { useState, useEffect, useRef } from 'react'
import { UnifiedLoading } from "@/components/ui/unified-loading"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter,
  Bold,
  Italic,
  Table,
  Code,
  Type,
  Minus
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import ConfirmableModal from '@/components/ui/ConfirmableModal'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { adjustCellSizeForImage, detectFailedImages, updateFailedImagesDialog } from '@/lib/table-global-functions'

interface Post {
  id: string
  title: string
  excerpt: string
  content: string
  featuredImage?: string
  featured_image?: string
  contentType?: string
  createdAt: string
  updatedAt: string
  status: 'draft' | 'published'
  title_es?: string
  title_en?: string
  content_es?: string
  content_en?: string
  excerpt_es?: string
  excerpt_en?: string
}

// Interfaz MediaItem - DESINSTALADA
// Ya no necesitamos esta interfaz porque el modal de media fue desinstalado
// interface MediaItem {
//   id: string
//   type: 'image' | 'file'
//   url: string
//   filename: string
//   size?: number
//   cellId: string
// }

export default function AdminPostsPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published'>('all')
  const [activeType, setActiveType] = useState<'all' | 'post' | 'post+' | 'photo' | 'quote' | 'video-player' | 'music-player' | 'portfolio' | 'debug'>('all')
  
  // Modal de edición
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editExcerpt, setEditExcerpt] = useState('')
  const [editFeaturedImage, setEditFeaturedImage] = useState('')
  const [editContent, setEditContent] = useState('')
  const [editContentType, setEditContentType] = useState('post')
  const [isSaving, setIsSaving] = useState(false)
  
  // Estado para edición bilingüe
  const [activeLanguageTab, setActiveLanguageTab] = useState<'es' | 'en'>('es')
  const [editTitleEs, setEditTitleEs] = useState('')
  const [editTitleEn, setEditTitleEn] = useState('')
  const [editExcerptEs, setEditExcerptEs] = useState('')
  const [editExcerptEn, setEditExcerptEn] = useState('')
  const [editContentEs, setEditContentEs] = useState('')
  const [editContentEn, setEditContentEn] = useState('')
  
  // Modal unificado (edición/creación)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  
  // Referencias
  const contentRef = useRef<HTMLDivElement>(null)
  
  // Estado para media y tablas avanzadas - DESINSTALADO
  // const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)
  // const [activeCellId, setActiveCellId] = useState<string | null>(null)
  // const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  // const [embedImageUrl, setEmbedImageUrl] = useState('')
  // const [activeTab, setActiveTab] = useState<'upload' | 'embed'>('upload')

  useEffect(() => {
    fetchPosts()
  }, [])

  // Verificar imágenes fallidas cuando se carga la página
  useEffect(() => {
    // Verificar después de un pequeño delay para dar tiempo a que las imágenes se carguen
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).updateFailedImagesDialog) {
        (window as any).updateFailedImagesDialog();
      }
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  // Sincronizar contenido del editor cuando cambie editContent
  useEffect(() => {
    if (isEditModalOpen && contentRef.current && editContent !== undefined) {
      // Solo actualizar si el contenido es diferente para evitar loops
      if (contentRef.current.innerHTML !== editContent) {
        contentRef.current.innerHTML = editContent
        console.log('🔄 [Editor] Contenido sincronizado:', editContent.substring(0, 100) + '...')
      }
    }
  }, [editContent, isEditModalOpen])

  // Restaurar funcionalidad de botones de borrar existentes
  useEffect(() => {
    const restoreDeleteButtons = () => {
      const deleteButtons = document.querySelectorAll('button[data-action="delete-image"]');
      deleteButtons.forEach(button => {
        // Remover event listeners existentes para evitar duplicados
        button.replaceWith(button.cloneNode(true));
        const newButton = document.querySelector(`button[data-action="delete-image"][data-button-id="${button.getAttribute('data-button-id')}"]`);
        if (newButton) {
          newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const container = newButton.closest('.relative.inline-block');
            if (container) {
              container.remove();
              console.log('✅ [Smart Paste] Imagen eliminada con botón de borrar restaurado');
            }
          });
        }
      });
    };

    // Ejecutar después de un delay para asegurar que el DOM esté listo
    const timer = setTimeout(restoreDeleteButtons, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Exponer funciones globales para el editor
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Funciones para parsing de URLs de imagen
      ;(window as any).handleCellPaste = handleCellPaste
      ;(window as any).adjustCellHeight = adjustCellHeight
      ;(window as any).adjustCellSizeForImage = adjustCellSizeForImage
      ;(window as any).detectFailedImages = detectFailedImages
      ;(window as any).updateFailedImagesDialog = updateFailedImagesDialog
      ;(window as any).performSaveEdit = performSaveEdit
      ;(window as any).performSaveNewPost = performSaveNewPost
      
      return () => {
        delete (window as any).handleCellPaste
        delete (window as any).adjustCellHeight
        delete (window as any).adjustCellSizeForImage
        delete (window as any).detectFailedImages
        delete (window as any).updateFailedImagesDialog
        delete (window as any).performSaveEdit
        delete (window as any).performSaveNewPost
      }
    }
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const openEditModal = (post: Post) => {
    setEditingPost(post)
    setEditTitle(post.title)
    setEditExcerpt(post.excerpt || '')
    setEditFeaturedImage(post.featured_image || '')
    setEditContentType(post.contentType || 'post')
    
    // Cargar datos bilingües
    setEditTitleEs(post.title_es || post.title || '')
    setEditTitleEn(post.title_en || '')
    setEditExcerptEs(post.excerpt_es || post.excerpt || '')
    setEditExcerptEn(post.excerpt_en || '')
    setEditContentEs(post.content_es || post.content || '')
    setEditContentEn(post.content_en || '')
    
    // Establecer el contenido inicial basado en la tab activa (español por defecto)
    const initialContent = post.content_es || post.content || ''
    setEditContent(initialContent)
    
    console.log('📝 [Editor] Modal abierto con contenido:', {
      postId: post.id,
      contentEs: post.content_es,
      contentEn: post.content_en,
      content: post.content,
      initialContent: initialContent.substring(0, 100) + '...'
    })
    
    // Reiniciar a la tab de español
    setActiveLanguageTab('es')
    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setEditingPost(null)
    setEditTitle('')
    setEditExcerpt('')
    setEditFeaturedImage('')
    setEditContent('')
    setEditContentType('post')
    
    // Limpiar estados bilingües
    setEditTitleEs('')
    setEditTitleEn('')
    setEditExcerptEs('')
    setEditExcerptEn('')
    setEditContentEs('')
    setEditContentEn('')
    setActiveLanguageTab('es')
  }

  // Función para cambiar entre tabs de idioma
  const switchLanguageTab = async (newLang: 'es' | 'en') => {
    if (!contentRef.current) return
    
    // Guardar el contenido actual del editor antes de cambiar
    const currentContent = contentRef.current.innerHTML
    
    if (activeLanguageTab === 'es') {
      setEditContentEs(currentContent)
    } else {
      setEditContentEn(currentContent)
    }
    
    // Cambiar a la nueva tab
    setActiveLanguageTab(newLang)
    
    // Cargar el contenido correspondiente
    if (newLang === 'es') {
      setEditContent(editContentEs || '')
    } else {
      // Si cambiamos a inglés y no hay contenido traducido, traducir automáticamente
      if (!editContentEn || editContentEn.trim() === '') {
        await translateContentToEnglish(currentContent)
      } else {
        setEditContent(editContentEn || '')
      }
    }
  }

  // Función para traducir contenido a inglés
  const translateContentToEnglish = async (spanishContent: string) => {
    try {
      console.log('🔄 [Translation] Iniciando traducción automática...')
      
      // Mostrar indicador de carga
      const loadingIndicator = document.createElement('div')
      loadingIndicator.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg z-50'
      loadingIndicator.innerHTML = '🔄 Traduciendo contenido...'
      document.body.appendChild(loadingIndicator)
      
      // Importar dinámicamente para evitar problemas de SSR
      const { extractTextFromHTML, translateMultipleLines, replaceTextInHTML } = await import('@/lib/translation-service')
      
      // Extraer textos del HTML
      const texts = extractTextFromHTML(spanishContent)
      console.log('📝 [Translation] Textos extraídos:', texts.length)
      
      if (texts.length === 0) {
        setEditContent(spanishContent)
        loadingIndicator.remove()
        return
      }
      
      // Traducir textos
      const { translations, stats } = await translateMultipleLines(texts)
      console.log('✅ [Translation] Traducción completada:', stats)
      
      // Reemplazar textos en el HTML
      const translatedHTML = replaceTextInHTML(spanishContent, texts, translations)
      
      // Actualizar el estado
      setEditContentEn(translatedHTML)
      setEditContent(translatedHTML)
      
      // Remover indicador de carga
      loadingIndicator.remove()
      
      // Mostrar diálogo de traducciones fallidas si las hay
      if (stats.failedLines > 0) {
        const { updateTranslationFailedDialog } = await import('@/lib/translation-dialog')
        updateTranslationFailedDialog(stats)
      }
      
      console.log('✅ [Translation] Contenido traducido y actualizado')
      
    } catch (error) {
      console.error('❌ [Translation] Error en traducción:', error)
      
      // En caso de error, mantener el contenido original
      setEditContent(spanishContent)
      
      // Remover indicador de carga si existe
      const loadingIndicator = document.querySelector('.fixed.top-4.right-4.bg-blue-500')
      if (loadingIndicator) {
        loadingIndicator.remove()
      }
    }
  }

  const openCreateModal = () => {
    // Limpiar todos los campos para crear un nuevo post
    setEditingPost(null)
    setEditTitle('')
    setEditExcerpt('')
    setEditFeaturedImage('')
    setEditContent('')
    setEditContentType('post')
    
    // Limpiar estados bilingües
    setEditTitleEs('')
    setEditTitleEn('')
    setEditExcerptEs('')
    setEditExcerptEn('')
    setEditContentEs('')
    setEditContentEn('')
    setActiveLanguageTab('es')
    
    setIsCreateModalOpen(true)
  }

  const closeCreateModal = () => {
    setIsCreateModalOpen(false)
    // Los campos se limpian en openCreateModal
  }

  const handleSaveEdit = async () => {
    if (!editingPost) return
    
    if (!editFeaturedImage.trim()) {
      alert("La imagen destacada es obligatoria para publicar")
      return
    }
    
    // Siempre proceder con el guardado, pero mostrar diálogo si hay imágenes fallidas
    await performSaveEdit()
  }

  const performSaveEdit = async () => {
    if (!editingPost) return
    
    // Verificar si hay imágenes fallidas y mostrar diálogo si es necesario
    const failedImagesCount = typeof window !== 'undefined' && (window as any).detectFailedImages ? (window as any).detectFailedImages() : 0
    if (failedImagesCount > 0) {
      console.log(`⚠️ [Smart Paste] Guardando post con ${failedImagesCount} imagen${failedImagesCount > 1 ? 'es' : ''} fallida${failedImagesCount > 1 ? 's' : ''}`)
      // Mostrar diálogo de confirmación después de hacer clic en guardar
      if (typeof window !== 'undefined' && (window as any).updateFailedImagesDialog) {
        (window as any).updateFailedImagesDialog();
      }
    }

    // Verificar si hay traducciones fallidas en la tab de inglés
    if (activeLanguageTab === 'en' && editContentEn) {
      try {
        const { extractTextFromHTML, translateMultipleLines } = await import('@/lib/translation-service')
        const texts = extractTextFromHTML(editContentEn)
        const { stats } = await translateMultipleLines(texts)
        
        if (stats.failedLines > 0) {
          console.log(`⚠️ [Translation] Guardando post con ${stats.failedLines} línea${stats.failedLines > 1 ? 's' : ''} no traducida${stats.failedLines > 1 ? 's' : ''}`)
          const { updateTranslationFailedDialog } = await import('@/lib/translation-dialog')
          updateTranslationFailedDialog(stats)
        }
      } catch (error) {
        console.error('❌ [Translation] Error verificando traducciones:', error)
      }
    }
    
    setIsSaving(true)
    try {
      // Obtener contenido del editor según la tab activa
      const content = contentRef.current?.innerHTML || ''
      
      // Preparar datos bilingües
      const updateData = {
        // Campos comunes
        featured_image: editFeaturedImage,
        contentType: editContentType,
        
        // Campos específicos por idioma
        title_es: editTitleEs,
        title_en: editTitleEn,
        excerpt_es: editExcerptEs,
        excerpt_en: editExcerptEn,
        content_es: editContentEs,
        content_en: editContentEn,
        
        // Mantener backward compatibility
        title: editTitleEs || editTitle,
        excerpt: editExcerptEs || editExcerpt,
        content: editContentEs || content
      }
      
      // Actualizar el contenido específico del idioma activo
      if (activeLanguageTab === 'es') {
        updateData.content_es = content
        setEditContentEs(content)
      } else {
        updateData.content_en = content
        setEditContentEn(content)
      }
      
      const response = await fetch(`/api/posts/${editingPost.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      })
      
      if (response.ok) {
        // Recargar posts para asegurar sincronización
        await fetchPosts()
        closeEditModal()
        console.log('✅ [Editor] Post guardado y posts recargados')
      } else {
        const errorData = await response.json()
        console.error('Error updating post:', errorData)
        alert(`Error al actualizar: ${errorData.error || 'Error desconocido'}`)
      }
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Error al guardar el post. Revisa la consola para más detalles.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveNewPost = async () => {
    if (!(editTitle?.trim() || editTitleEs?.trim() || editTitleEn?.trim())) {
      alert("El título es obligatorio")
      return
    }

    if (!editFeaturedImage.trim()) {
      alert("La imagen destacada es obligatoria para publicar")
      return
    }

    // Siempre proceder con el guardado, pero mostrar diálogo si hay imágenes fallidas
    await performSaveNewPost()
  }

  const performSaveNewPost = async () => {
    // Verificar si hay imágenes fallidas y mostrar diálogo si es necesario
    const failedImagesCount = typeof window !== 'undefined' && (window as any).detectFailedImages ? (window as any).detectFailedImages() : 0
    if (failedImagesCount > 0) {
      console.log(`⚠️ [Smart Paste] Guardando post con ${failedImagesCount} imagen${failedImagesCount > 1 ? 'es' : ''} fallida${failedImagesCount > 1 ? 's' : ''}`)
      // Mostrar diálogo de confirmación después de hacer clic en guardar
      if (typeof window !== 'undefined' && (window as any).updateFailedImagesDialog) {
        (window as any).updateFailedImagesDialog();
      }
    }

    // Verificar si hay traducciones fallidas en el contenido nuevo
    const content = contentRef.current?.innerHTML || ''
    if (content) {
      try {
        const { extractTextFromHTML, translateMultipleLines } = await import('@/lib/translation-service')
        const texts = extractTextFromHTML(content)
        const { stats } = await translateMultipleLines(texts)
        
        if (stats.failedLines > 0) {
          console.log(`⚠️ [Translation] Guardando post con ${stats.failedLines} línea${stats.failedLines > 1 ? 's' : ''} no traducida${stats.failedLines > 1 ? 's' : ''}`)
          const { updateTranslationFailedDialog } = await import('@/lib/translation-dialog')
          updateTranslationFailedDialog(stats)
        }
      } catch (error) {
        console.error('❌ [Translation] Error verificando traducciones:', error)
      }
    }
    
    setIsCreating(true)
    
    try {
      // Obtener el contenido del editor
      const content = contentRef.current?.innerHTML || ''

      // Generar slug automáticamente
      const slug = editTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      // Debug: mostrar qué se está enviando
      console.log('📤 Enviando datos al crear post:', {
        title: editTitle,
        slug: slug,
        excerpt: editExcerpt,
        content: content,
        featured_image: editFeaturedImage,
        contentType: editContentType,
        published: true,
        status: 'published',
        author: 'Mario Verdú'
      })

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle,
          slug: slug,
          excerpt: editExcerpt,
          content: content,
          featured_image: editFeaturedImage,
          contentType: editContentType,
          category: 'postsv2', // ✅ Agregar categoría para que aparezca en /posts
          published: true,
          status: 'published',
          author: 'Mario Verdú'
        })
      })

      if (response.ok) {
        // Recargar posts para asegurar sincronización
        await fetchPosts()
        closeCreateModal()
        console.log('✅ [Editor] Post creado y posts recargados')
      } else {
        const errorData = await response.json()
        console.error('Error creating post:', errorData)
        alert(`Error al crear: ${errorData.error || 'Error desconocido'}`)
      }
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Error al crear el post. Revisa la consola para más detalles.')
    } finally {
      setIsCreating(false)
    }
  }

  const deletePost = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este post?')) return
    
    try {
      const response = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
      if (response.ok) {
        await fetchPosts()
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const viewPost = (id: string) => {
    window.open(`/posts/view/${id}`, '_blank')
  }

  // Funciones para tablas avanzadas y media
  const insertAdvancedTableV2New = () => {
    // Determinar qué editor está activo
    const activeEditor = isEditModalOpen ? contentRef.current : newContentRef.current
    if (!activeEditor) return
    
    const tableId = `table_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const tableHTML = `
      <div class="table-container" data-table-id="${tableId}">
        <table class="min-w-full border-collapse border border-gray-300 bg-white">
          <thead>
            <tr>
              <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left cursor-grab hover:bg-gray-200 transition-colors" contenteditable="true" draggable="true" ondragstart="handleColumnDragStart(event, '${tableId}', 0)" ondragover="handleColumnDragOver(event)" ondrop="handleColumnDrop(event, '${tableId}', 0)">Columna 1</th>
              <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left cursor-grab hover:bg-gray-200 transition-colors" contenteditable="true" draggable="true" ondragstart="handleColumnDragStart(event, '${tableId}', 1)" ondragover="handleColumnDragOver(event)" ondrop="handleColumnDrop(event, '${tableId}', 1)">Columna 2</th>
              <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left cursor-grab hover:bg-gray-200 transition-colors" contenteditable="true" draggable="true" ondragstart="handleColumnDragStart(event, '${tableId}', 2)" ondragover="handleColumnDragOver(event)" ondrop="handleColumnDrop(event, '${tableId}', 2)">Columna 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" contenteditable="true" data-cell-id="cell_${tableId}_0_0" onpaste="handleCellPaste(event, 'cell_${tableId}_0_0')" oninput="adjustCellHeight(this)" onblur="adjustCellHeight(this)">Dato 1</td>
              <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" contenteditable="true" data-cell-id="cell_${tableId}_0_1" onpaste="handleCellPaste(event, 'cell_${tableId}_0_1')" oninput="adjustCellHeight(this)" onblur="adjustCellHeight(this)">Dato 2</td>
              <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" contenteditable="true" data-cell-id="cell_${tableId}_0_2" onpaste="handleCellPaste(event, 'cell_${tableId}_0_2')" oninput="adjustCellHeight(this)" onblur="adjustCellHeight(this)">Dato 3</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" contenteditable="true" data-cell-id="cell_${tableId}_1_0" onpaste="handleCellPaste(event, 'cell_${tableId}_1_0')" oninput="adjustCellHeight(this)" onblur="adjustCellHeight(this)">Dato 4</td>
              <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" contenteditable="true" data-cell-id="cell_${tableId}_1_1" onpaste="handleCellPaste(event, 'cell_${tableId}_1_1')" oninput="adjustCellHeight(this)" onblur="adjustCellHeight(this)">Dato 5</td>
              <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" contenteditable="true" data-cell-id="cell_${tableId}_1_2" onpaste="handleCellPaste(event, 'cell_${tableId}_1_2')" oninput="adjustCellHeight(this)" onblur="adjustCellHeight(this)">Dato 6</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
    
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const div = document.createElement('div')
      div.innerHTML = tableHTML
      range.deleteContents()
      range.insertNode(div)
      range.collapse(false)
      selection.removeAllRanges()
      selection.addRange(range)
    }
    
    // Actualizar el estado del contenido según el modal activo
    if (isEditModalOpen && contentRef.current) {
      setEditContent(contentRef.current.innerHTML)
    } else if (isCreateModalOpen && newContentRef.current) {
      console.log('Tabla insertada en modal de creación')
    }
  }

  // Funciones globales para el editor - WYSIWYG completo
  const handleCellPaste = (event: ClipboardEvent, cellId: string) => {
    const pastedText = event.clipboardData?.getData('text') || ''
    const pastedHTML = event.clipboardData?.getData('text/html') || ''
    
    console.log('🔍 [WYSIWYG DEBUG] Texto pegado:', pastedText)
    console.log('🔍 [WYSIWYG DEBUG] HTML pegado:', pastedHTML.substring(0, 200))
    
    // Verificar si es una URL de YouTube
    if (isYouTubeUrl(pastedText)) {
      event.preventDefault()
      const cell = document.querySelector(`[data-cell-id="${cellId}"]`) as HTMLElement
      if (cell) {
        console.log('✅ [WYSIWYG] Convirtiendo URL de YouTube a embed:', pastedText)
        insertYouTubeEmbedIntoCell(cell, pastedText)
      }
      return
    }
    
    // Verificar si es una URL de imagen
    if (isImageUrl(pastedText)) {
      event.preventDefault()
      const cell = document.querySelector(`[data-cell-id="${cellId}"]`) as HTMLElement
      if (cell) {
        console.log('✅ [WYSIWYG] Convirtiendo URL a imagen:', pastedText)
        insertImageIntoCell(cell, pastedText)
      }
      return
    }
    
    // Verificar si el HTML pegado ya contiene una imagen
    if (pastedHTML && pastedHTML.includes('<img')) {
      event.preventDefault()
      const cell = document.querySelector(`[data-cell-id="${cellId}"]`) as HTMLElement
      if (cell) {
        console.log('✅ [WYSIWYG] HTML con imagen detectado')
        // Insertar el HTML directamente
        cell.innerHTML = pastedHTML
        adjustCellHeight(cell)
        updateContentState()
      }
      return
    }
    
    // Si no es imagen ni YouTube, permitir el pegado normal
    console.log('ℹ️ [WYSIWYG] Pega normal permitido')
  }

  const isImageUrl = (url: string): boolean => {
    // Heurística WYSIWYG completa para detectar TODAS las URLs de imagen
    const imageExtensions = /\.(png|jpe?g|webp|gif|avif|svg|bmp|tiff)(?:$|[?#])/i
    const knownImageHosts = new Set([
      'encrypted-tbn0.gstatic.com',
      'i.ytimg.com',
      'ytimg.com',
      'm.media-amazon.com',
      'ae01.alicdn.com',
      'images.unsplash.com',
      'cdn.shopify.com',
      'gamesir.com',
      'upload.wikimedia.org',
      'preview.redd.it',
      'www.notebookcheck.net',
      'www.powerplanetonline.com',
      'assets.marioverdu.com',
      'cdn.discordapp.com',
      'media.discordapp.net',
      'imgur.com',
      'i.imgur.com',
      'cdn.pixabay.com',
      'images.pexels.com',
      'cdn.unsplash.com',
      'images.freeimages.com',
      'cdn.stocksnap.io',
      'images.rawpixel.com',
      'cdn.photobucket.com',
      'images.flickr.com',
      'live.staticflickr.com',
      'farm1.staticflickr.com',
      'farm2.staticflickr.com',
      'farm3.staticflickr.com',
      'farm4.staticflickr.com',
      'farm5.staticflickr.com',
      'farm6.staticflickr.com',
      'farm7.staticflickr.com',
      'farm8.staticflickr.com',
      'farm9.staticflickr.com',
      'farm10.staticflickr.com'
    ])

    const urlText = url.replace(/^@+/, '').trim()
    if (!/^https?:\/\//i.test(urlText)) return false
    
    // 1. Verificar extensiones de imagen
    if (imageExtensions.test(urlText)) return true
    
    try {
      const u = new URL(urlText)
      
      // 2. Verificar hosts conocidos
      if (knownImageHosts.has(u.hostname)) return true
      
      // 3. Patrones comunes de thumbnails sin extensión
      if (/images\?/i.test(u.pathname + u.search)) return true
      if (/q=tbn:/i.test(u.search)) return true
      if (/image/i.test(u.pathname)) return true
      if (/img/i.test(u.pathname)) return true
      if (/photo/i.test(u.pathname)) return true
      if (/picture/i.test(u.pathname)) return true
      
      // 4. Patrones de CDN de imágenes
      if (/cdn/i.test(u.hostname)) return true
      if (/static/i.test(u.hostname)) return true
      if (/media/i.test(u.hostname)) return true
      if (/assets/i.test(u.hostname)) return true
      
      // 5. Patrones de servicios de imagen
      if (/\.(com|net|org)\/.*\.(png|jpe?g|webp|gif|avif|svg)/i.test(urlText)) return true
      
    } catch {
      return false
    }
    
    return false
  }

  const isYouTubeUrl = (url: string): boolean => {
    // Detectar URLs de YouTube
    const youtubeRegex = /(https?:\/\/)?(www\.|m\.)?(youtube\.com\/(watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)[a-zA-Z0-9_-]+/i
    return youtubeRegex.test(url)
  }

  const insertYouTubeEmbedIntoCell = (cell: HTMLElement, url: string) => {
    // Parsear la URL de YouTube
    const parseYouTubeUrl = (url: string) => {
      try {
        const cleanUrl = url.replace(/&amp;/g, '&')
        let urlObj: URL
        try {
          urlObj = new URL(cleanUrl)
        } catch {
          urlObj = new URL(`https://${cleanUrl}`)
        }

        let videoId: string | null = null
        let playlistId: string | null = null
        let startIndex: number | undefined = undefined

        if (urlObj.hostname.includes('youtube.com') && urlObj.pathname === '/watch') {
          videoId = urlObj.searchParams.get('v')
          playlistId = urlObj.searchParams.get('list')
          const index = urlObj.searchParams.get('index')
          if (index) startIndex = parseInt(index, 10)
        } else if (urlObj.hostname.includes('youtu.be')) {
          videoId = urlObj.pathname.slice(1)
          playlistId = urlObj.searchParams.get('list')
          const index = urlObj.searchParams.get('index')
          if (index) startIndex = parseInt(index, 10)
        }

        return { videoId, playlistId, startIndex }
      } catch (error) {
        console.error('Error parsing YouTube URL:', error)
        return null
      }
    }

    const parsed = parseYouTubeUrl(url)
    if (!parsed) {
      console.error('No se pudo parsear la URL de YouTube')
      return
    }

    // Generar URL de embed
    let embedUrl = ''
    if (parsed.playlistId) {
      embedUrl = `https://www.youtube.com/embed/videoseries?list=${parsed.playlistId}`
      if (parsed.videoId) {
        embedUrl = `https://www.youtube.com/embed/${parsed.videoId}?list=${parsed.playlistId}`
      }
      if (parsed.startIndex) {
        embedUrl += `&index=${parsed.startIndex}`
      }
    } else if (parsed.videoId) {
      embedUrl = `https://www.youtube.com/embed/${parsed.videoId}`
    }

    // Generar el iframe
    const iframeHTML = `<div class="youtube-embed-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;">
      <iframe 
        src="${embedUrl}" 
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen
        loading="lazy"
      ></iframe>
    </div>`

    // Insertar en la celda
    cell.innerHTML = iframeHTML
    adjustCellHeight(cell)
    updateContentState()
  }

  const insertImageIntoCell = (cell: HTMLElement, imageUrl: string) => {
    // WYSIWYG PERSISTENTE: Usar convenciones estándar de editores de contenido
    // Hacer que la celda sea editable y enfocable
    cell.contentEditable = 'true'
    cell.focus()
    
    // Usar document.execCommand para insertar HTML de manera estándar
    const imageHTML = `<img src="${imageUrl}" class="max-w-full h-auto max-h-32 object-contain rounded" alt="Imagen incrustada" loading="lazy">`
    
    // Limpiar el contenido actual de la celda
    cell.innerHTML = ''
    
    // Insertar la imagen usando execCommand (convención estándar)
    document.execCommand('insertHTML', false, imageHTML)
    
    // Agregar botón de borrar después de insertar la imagen
    const imgElement5 = cell.querySelector('img')
    if (imgElement5) {
      // Crear contenedor para imagen y botón
      const container = document.createElement('div')
      container.className = 'relative inline-block max-w-full'
      container.style.position = 'relative'
      
      // Mover la imagen al contenedor
      imgElement5.parentNode?.insertBefore(container, imgElement5)
      container.appendChild(imgElement5)
      
      // Crear y agregar botón de borrar
      const deleteButton = document.createElement('button')
      const buttonId = `delete-btn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      deleteButton.className = 'absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors z-10'
      deleteButton.innerHTML = '×'
      deleteButton.setAttribute('contenteditable', 'false')
      deleteButton.setAttribute('data-action', 'delete-image')
      deleteButton.setAttribute('data-button-id', buttonId)
      deleteButton.addEventListener('click', function(e) {
        e.preventDefault()
        e.stopPropagation()
        container.remove()
        console.log('✅ [Smart Paste] Imagen eliminada con botón de borrar')
      })
      
      container.appendChild(deleteButton)
    }
    
    // Ajustar el tamaño de la celda para la imagen
    adjustCellSizeForImage(cell, imageUrl)
    
    // Verificar si la imagen se carga correctamente
    const imgElement = cell.querySelector('img')
    if (imgElement) {
      imgElement.addEventListener('load', () => {
        // Imagen cargada correctamente, verificar si hay otras fallidas
        if (typeof window !== 'undefined' && (window as any).updateFailedImagesDialog) {
          (window as any).updateFailedImagesDialog();
        }
      })
      
      imgElement.addEventListener('error', () => {
        // Imagen fallida, actualizar diálogo
        if (typeof window !== 'undefined' && (window as any).updateFailedImagesDialog) {
          (window as any).updateFailedImagesDialog();
        }
      })
    }
    
    // Actualizar estado inmediatamente para WYSIWYG persistente
    updateContentState()
    
    console.log('✅ [Smart Paste] Imagen insertada con botón de borrar usando convenciones estándar:', imageUrl)
  }
  
  // Función auxiliar para actualizar el estado del contenido
  const updateContentState = () => {
    if (isEditModalOpen && contentRef.current) {
      setEditContent(contentRef.current.innerHTML)
    } else if (isCreateModalOpen && newContentRef.current) {
      // Para el modal de creación, el estado se actualiza al guardar
      console.log('Imagen insertada en modal de creación - WYSIWYG')
    }
  }

  const showMediaButton = (cellId: string) => {
    // DESINSTALADO: Ya no mostramos el botón azul (+) porque es más intuitivo pegar URLs directamente
    // La funcionalidad WYSIWYG de pegar URLs de imagen reemplaza esta funcionalidad
    console.log('ℹ️ [WYSIWYG] Botón de media desinstalado - usar pegado directo de URLs')
  }

  const hideMediaButton = (cellId: string) => {
    // DESINSTALADO: Ya no ocultamos el botón azul (+) porque no existe
    // La funcionalidad WYSIWYG de pegar URLs de imagen reemplaza esta funcionalidad
  }

  const openMediaModal = (cellId: string) => {
    // DESINSTALADO: Ya no abrimos el modal de media porque es más intuitivo pegar URLs directamente
    // La funcionalidad WYSIWYG de pegar URLs de imagen reemplaza esta funcionalidad
    console.log('ℹ️ [WYSIWYG] Modal de media desinstalado - usar pegado directo de URLs')
  }

  const closeMediaModal = () => {
    // DESINSTALADO: Ya no cerramos el modal de media porque no existe
    // La funcionalidad WYSIWYG de pegar URLs de imagen reemplaza esta funcionalidad
  }

  const adjustCellHeight = (cell: HTMLElement) => {
    if (cell.innerHTML === '' || cell.innerHTML === '<br>') {
      cell.innerHTML = '&nbsp;'
    }
    cell.style.height = 'auto'
    cell.style.minHeight = 'auto'
  }

  // Funciones de formato de texto
  const formatText = (format: 'bold' | 'italic') => {
    document.execCommand(format, false)
    if (contentRef.current) {
      setEditContent(contentRef.current.innerHTML)
    }
  }

  const insertAsciiArt = () => {
    const asciiArt = `
      <div class="bg-gray-100 p-4 rounded-md font-mono text-sm">
        ╔══════════════════════════════════════╗<br>
        ║           ASCII ART                  ║<br>
        ║                                      ║<br>
        ║     ╭─╮  ╭─╮  ╭─╮  ╭─╮            ║<br>
        ║     │ │  │ │  │ │  │ │            ║<br>
        ║     ╰─╯  ╰─╯  ╰─╯  ╰─╯            ║<br>
        ╚══════════════════════════════════════╝
      </div>
    `
    insertHTML(asciiArt)
  }

  const insertQuote = () => {
    const quote = `
      <blockquote class="border-l-4 border-cyan-500 pl-4 py-2 bg-blue-50 italic">
        "Cita inspiradora aquí..."
      </blockquote>
    `
    insertHTML(quote)
  }

  const insertSeparator = () => {
    const separator = '<hr class="my-4 border-gray-300">'
    insertHTML(separator)
  }

  const insertHTML = (html: string) => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const div = document.createElement('div')
      div.innerHTML = html
      range.deleteContents()
      range.insertNode(div)
      range.collapse(false)
      selection.removeAllRanges()
      selection.addRange(range)
      
      if (contentRef.current) {
        setEditContent(contentRef.current.innerHTML)
      }
    }
  }

  // 🎯 SISTEMA DE AUTO-CONVERSIÓN COMPLETA: TODOS LOS FORMATOS DE TABLA → ADVANCEDTABLEV2
  // Detecta automáticamente cuando se pega una tabla en cualquier formato y la convierte
  
  // 🆕 Función mejorada para detectar si el contenido pegado es una tabla Markdown
  const detectMarkdownTable = (text: string): boolean => {
    const lines = text.trim().split('\n').filter(line => line.trim())
    if (lines.length < 3) return false // Mínimo: encabezado + separador + 1 fila
    
    // Verificar si tiene el patrón de tabla Markdown: | col1 | col2 | col3 |
    const hasTableStructure = lines.some(line => 
      line.trim().startsWith('|') && line.trim().endsWith('|')
    )
    
    // 🆕 Verificar separadores con un patrón genérico para N columnas: | --- | --- | ... |
    const hasSeparators = lines.some(line => {
      const trimmed = line.trim()
      // Acepta al menos dos columnas separadas por '|', con guiones/puntos/':' opcionales
      return /^\|(?:\s*:?[-]{2,}:?\s*\|){1,}\s*$/.test(trimmed)
    })
    
    return hasTableStructure && hasSeparators
  }
  
  // 🆕 Función para detectar si el contenido pegado es una tabla TSV (Notion)
  const detectTSVTable = (text: string): boolean => {
    const lines = text.trim().split('\n')
    if (lines.length < 2) return false
    
    // Verificar si tiene el patrón TSV: col1\tcol2\tcol3
    const hasTSVStructure = lines.some(line => 
      line.includes('\t') && line.split('\t').length >= 2
    )
    
    // Verificar que todas las líneas tengan el mismo número de columnas
    if (hasTSVStructure) {
      const columnCounts = lines.map(line => line.split('\t').length)
      const firstColumnCount = columnCounts[0]
      return columnCounts.every(count => count === firstColumnCount)
    }
    
    return false
  }
  
  // 🆕 Función para detectar si el contenido pegado es HTML de tabla
  const detectHTMLTable = (text: string): boolean => {
    console.log('🔍 [DEBUG] Detectando HTML de tabla en:', text.substring(0, 100) + '...')
    
    // Verificar si contiene etiquetas de tabla HTML
    const hasTableTags = text.includes('<table') && text.includes('</table>')
    console.log('🔍 [DEBUG] Tiene etiquetas de tabla:', hasTableTags)
    
    // Verificar si tiene estructura de tabla (filas y celdas)
    const hasTableStructure = text.includes('<tr') && (text.includes('<td') || text.includes('<th'))
    console.log('🔍 [DEBUG] Tiene estructura de tabla:', hasTableStructure)
    
    // Verificar que tenga al menos una fila con celdas
    const hasCells = text.includes('<td') || text.includes('<th')
    console.log('🔍 [DEBUG] Tiene celdas:', hasCells)
    
    const isHTMLTable = hasTableTags && hasTableStructure && hasCells
    console.log('🔍 [DEBUG] Es tabla HTML:', isHTMLTable)
    
    return isHTMLTable
  }
  
  // 🆕 Función para detectar tablas CSV (comas)
  const detectCSVTable = (text: string): boolean => {
    const lines = text.trim().split('\n').filter(line => line.trim())
    if (lines.length < 2) return false
    
    // Verificar si tiene el patrón CSV: col1,col2,col3
    const hasCSVStructure = lines.some(line => 
      line.includes(',') && line.split(',').length >= 2
    )
    
    // Verificar que todas las líneas tengan el mismo número de columnas
    if (hasCSVStructure) {
      const columnCounts = lines.map(line => line.split(',').length)
      const firstColumnCount = columnCounts[0]
      return columnCounts.every(count => count === firstColumnCount)
    }
    
    return false
  }
  
  // 🆕 Función para detectar tablas con espacios múltiples (formato común en web)
  const detectSpaceSeparatedTable = (text: string): boolean => {
    const lines = text.trim().split('\n').filter(line => line.trim())
    if (lines.length < 2) return false
    
    // Verificar si tiene múltiples espacios entre columnas
    const hasSpaceStructure = lines.some(line => 
      line.includes('  ') && line.split(/\s{2,}/).length >= 2
    )
    
    // Verificar que todas las líneas tengan el mismo número de columnas
    if (hasSpaceStructure) {
      const columnCounts = lines.map(line => line.split(/\s{2,}/).length)
      const firstColumnCount = columnCounts[0]
      return columnCounts.every(count => count === firstColumnCount)
    }
    
    return false
  }
  
  // 🆕 Función para detectar tablas con guiones (formato común en web)
  const detectDashSeparatedTable = (text: string): boolean => {
    const lines = text.trim().split('\n').filter(line => line.trim())
    if (lines.length < 2) return false
    
    // Verificar si tiene guiones como separadores: col1 - col2 - col3
    const hasDashStructure = lines.some(line => 
      line.includes(' - ') && line.split(' - ').length >= 2
    )
    
    // Verificar que todas las líneas tengan el mismo número de columnas
    if (hasDashStructure) {
      const columnCounts = lines.map(line => line.split(' - ').length)
      const firstColumnCount = columnCounts[0]
      return columnCounts.every(count => count === firstColumnCount)
    }
    
    return false
  }
  
  // 🎯 Función unificada para detectar cualquier tipo de tabla
  const detectTableFormat = (text: string): 'markdown' | 'tsv' | 'html' | 'csv' | 'space' | 'dash' | null => {
    if (detectMarkdownTable(text)) return 'markdown'
    if (detectTSVTable(text)) return 'tsv'
    if (detectHTMLTable(text)) return 'html'
    if (detectCSVTable(text)) return 'csv'
    if (detectSpaceSeparatedTable(text)) return 'space'
    if (detectDashSeparatedTable(text)) return 'dash'
    return null
  }
  
  // 🎯 Función para convertir tabla Markdown a HTML usando la misma lógica que insertAdvancedTableV2New
  const convertMarkdownToTable = (text: string): string => {
    const lines = text.trim().split('\n').filter(line => line.trim())
    const tableId = `table_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // 🆕 VALIDACIÓN ROBUSTA: Encontrar el número máximo de columnas
    let maxColumns = 0
    const allRows = []
    
    // Procesar todas las líneas para encontrar el máximo de columnas
    lines.forEach((line, lineIndex) => {
      if (lineIndex === 0) return // Saltar encabezados por ahora
      if (line.includes('---')) return // Saltar separadores
      
      const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell.length > 0)
      allRows.push(cells)
      maxColumns = Math.max(maxColumns, cells.length)
    })
    
    // 🆕 VALIDACIÓN: Si no hay suficientes columnas, usar mínimo 2
    if (maxColumns < 2) {
      maxColumns = 2
    }
    
    // 🆕 GENERAR ENCABEZADOS ROBUSTOS
    let headers: string[] = []
    
    // Intentar usar la primera línea como encabezados
    if (lines[0] && !lines[0].includes('---')) {
      const firstLineCells = lines[0].split('|').map(cell => cell.trim()).filter(cell => cell.length > 0)
      
      // Si la primera línea tiene el número correcto de columnas, usarla
      if (firstLineCells.length === maxColumns) {
        headers = firstLineCells
      } else {
        // Si no coincide, generar encabezados genéricos
        headers = Array.from({ length: maxColumns }, (_, i) => `Columna ${i + 1}`)
      }
    } else {
      // Si no hay primera línea válida, generar encabezados genéricos
      headers = Array.from({ length: maxColumns }, (_, i) => `Columna ${i + 1}`)
    }
    
    // 🆕 NORMALIZAR TODAS LAS FILAS AL MISMO NÚMERO DE COLUMNAS
    const normalizedRows = allRows.map(row => {
      const normalizedRow = [...row]
      
      // Si la fila tiene menos columnas, rellenar con celdas vacías
      while (normalizedRow.length < maxColumns) {
        normalizedRow.push('')
      }
      
      // Si la fila tiene más columnas, truncar (no debería pasar con validación)
      if (normalizedRow.length > maxColumns) {
        normalizedRow.splice(maxColumns)
      }
      
      return normalizedRow
    })
    
    // 🆕 VALIDACIÓN FINAL: Asegurar que tenemos datos válidos
    if (normalizedRows.length === 0) {
      // Si no hay datos, crear una fila de ejemplo
      normalizedRows.push(Array.from({ length: maxColumns }, () => 'Dato de ejemplo'))
    }
    
    // Generar HTML EXACTAMENTE igual que insertAdvancedTableV2New
    let tableHTML = `<div class="table-container" data-table-id="${tableId}">`
    tableHTML += `<table class="min-w-full border-collapse border border-gray-300 bg-white">`
    
    // Encabezados con funcionalidades completas (igual que insertAdvancedTableV2New)
    tableHTML += '<thead><tr>'
    headers.forEach((header, index) => {
      tableHTML += `<th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left cursor-grab hover:bg-gray-200 transition-colors" contenteditable="true" draggable="true" ondragstart="handleColumnDragStart(event, '${tableId}', ${index})" ondragover="handleColumnDragOver(event)" ondrop="handleColumnDrop(event, '${tableId}', ${index})">${header}</th>`
    })
    tableHTML += '</tr></thead>'
    
    // Cuerpo de la tabla con funcionalidades completas (igual que insertAdvancedTableV2New)
    tableHTML += '<tbody>'
    normalizedRows.forEach((row, rowIndex) => {
      tableHTML += '<tr>'
      row.forEach((cell, colIndex) => {
        const cellId = `cell_${tableId}_${rowIndex}_${colIndex}`
        tableHTML += `<td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" contenteditable="true" data-cell-id="${cellId}" onpaste="handleCellPaste(event, '${cellId}')" oninput="adjustCellHeight(this)" onblur="adjustCellHeight(this)">${cell}</td>`
      })
      tableHTML += '</tr>'
    })
    tableHTML += '</tbody></table>'
    tableHTML += '</div>'
    
    return tableHTML
  }
  
  // 🆕 Función para convertir tabla CSV a AdvancedTableV2
  const convertCSVToTable = (text: string): string => {
    const lines = text.trim().split('\n').filter(line => line.trim())
    const tableId = `table_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // 🆕 VALIDACIÓN ROBUSTA: Encontrar el número máximo de columnas
    let maxColumns = 0
    const allRows = []
    
    // Procesar todas las líneas para encontrar el máximo de columnas
    lines.forEach((line, lineIndex) => {
      const cells = line.split(',').map(cell => cell.trim())
      allRows.push(cells)
      maxColumns = Math.max(maxColumns, cells.length)
    })
    
    // 🆕 VALIDACIÓN: Si no hay suficientes columnas, usar mínimo 2
    if (maxColumns < 2) {
      maxColumns = 2
    }
    
    // 🆕 GENERAR ENCABEZADOS ROBUSTOS
    let headers: string[] = []
    
    // Intentar usar la primera línea como encabezados
    if (allRows.length > 0) {
      const firstLineCells = allRows[0]
      
      // Si la primera línea tiene el número correcto de columnas, usarla
      if (firstLineCells.length === maxColumns) {
        headers = firstLineCells
        allRows.shift() // Remover la primera línea de los datos
      } else {
        // Si no coincide, generar encabezados genéricos
        headers = Array.from({ length: maxColumns }, (_, i) => `Columna ${i + 1}`)
      }
    } else {
      // Si no hay datos, generar encabezados genéricos
      headers = Array.from({ length: maxColumns }, (_, i) => `Columna ${i + 1}`)
    }
    
    // 🆕 NORMALIZAR TODAS LAS FILAS AL MISMO NÚMERO DE COLUMNAS
    const normalizedRows = allRows.map(row => {
      const normalizedRow = [...row]
      
      // Si la fila tiene menos columnas, rellenar con celdas vacías
      while (normalizedRow.length < maxColumns) {
        normalizedRow.push('')
      }
      
      // Si la fila tiene más columnas, truncar
      if (normalizedRow.length > maxColumns) {
        normalizedRow.splice(maxColumns)
      }
      
      return normalizedRow
    })
    
    // 🆕 VALIDACIÓN FINAL: Asegurar que tenemos datos válidos
    if (normalizedRows.length === 0) {
      normalizedRows.push(Array.from({ length: maxColumns }, () => 'Dato de ejemplo'))
    }
    
    // Generar HTML EXACTAMENTE igual que insertAdvancedTableV2New
    let tableHTML = `<div class="table-container" data-table-id="${tableId}">`
    tableHTML += `<table class="min-w-full border-collapse border border-gray-300 bg-white">`
    
    // Encabezados con funcionalidades completas
    tableHTML += '<thead><tr>'
    headers.forEach((header, index) => {
      tableHTML += `<th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left cursor-grab hover:bg-gray-200 transition-colors" contenteditable="true" draggable="true" ondragstart="handleColumnDragStart(event, '${tableId}', ${index})" ondragover="handleColumnDragOver(event)" ondrop="handleColumnDrop(event, '${tableId}', ${index})">${header}</th>`
    })
    tableHTML += '</tr></thead>'
    
    // Cuerpo de la tabla con funcionalidades completas
    tableHTML += '<tbody>'
    normalizedRows.forEach((row, rowIndex) => {
      tableHTML += '<tr>'
      row.forEach((cell, colIndex) => {
        const cellId = `cell_${tableId}_${rowIndex}_${colIndex}`
        tableHTML += `<td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" contenteditable="true" data-cell-id="${cellId}" onpaste="handleCellPaste(event, '${cellId}')" oninput="adjustCellHeight(this)" onblur="adjustCellHeight(this)">${cell}</td>`
    })
    tableHTML += '</tr>'
    })
    tableHTML += '</tbody></table>'
    tableHTML += '</div>'
    
    return tableHTML
  }
  
  // 🆕 Función para convertir tabla con espacios múltiples a AdvancedTableV2
  const convertSpaceSeparatedToTable = (text: string): string => {
    const lines = text.trim().split('\n').filter(line => line.trim())
    const tableId = `table_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Extraer encabezados (primera línea)
    const headers = lines[0].split(/\s{2,}/).map(h => h.trim())
    
    // Extraer datos (resto de líneas)
    const rows = lines.slice(1).map(line => line.split(/\s{2,}/).map(cell => cell.trim()))
    
    // Generar HTML EXACTAMENTE igual que insertAdvancedTableV2New
    let tableHTML = `<div class="table-container" data-table-id="${tableId}">`
    tableHTML += `<table class="min-w-full border-collapse border border-gray-300 bg-white">`
    
    // Encabezados con funcionalidades completas
    tableHTML += '<thead><tr>'
    headers.forEach((header, index) => {
      tableHTML += `<th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left cursor-grab hover:bg-gray-200 transition-colors" contenteditable="true" draggable="true" ondragstart="handleColumnDragStart(event, '${tableId}', ${index})" ondragover="handleColumnDragOver(event)" ondrop="handleColumnDrop(event, '${tableId}', ${index})">${header}</th>`
    })
    tableHTML += '</tr></thead>'
    
    // Cuerpo de la tabla con funcionalidades completas
    tableHTML += '<tbody>'
    rows.forEach((row, rowIndex) => {
      tableHTML += '<tr>'
      row.forEach((cell, colIndex) => {
        const cellId = `cell_${tableId}_${rowIndex}_${colIndex}`
        tableHTML += `<td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" contenteditable="true" data-cell-id="${cellId}" onpaste="handleCellPaste(event, '${cellId}')" oninput="adjustCellHeight(this)" onblur="adjustCellHeight(this)">${cell}</td>`
      })
      tableHTML += '</tr>'
    })
    tableHTML += '</tbody></table>'
    tableHTML += '</div>'
    
    return tableHTML
  }
  
  // 🆕 Función para convertir tabla con guiones a AdvancedTableV2
  const convertDashSeparatedToTable = (text: string): string => {
    const lines = text.trim().split('\n').filter(line => line.trim())
    const tableId = `table_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Extraer encabezados (primera línea)
    const headers = lines[0].split(' - ').map(h => h.trim())
    
    // Extraer datos (resto de líneas)
    const rows = lines.slice(1).map(line => line.split(' - ').map(cell => cell.trim()))
    
    // Generar HTML EXACTAMENTE igual que insertAdvancedTableV2New
    let tableHTML = `<div class="table-container" data-table-id="${tableId}">`
    tableHTML += `<table class="min-w-full border-collapse border border-gray-300 bg-white">`
    
    // Encabezados con funcionalidades completas
    tableHTML += '<thead><tr>'
    headers.forEach((header, index) => {
      tableHTML += `<th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left cursor-grab hover:bg-gray-200 transition-colors" contenteditable="true" draggable="true" ondragstart="handleColumnDragStart(event, '${tableId}', ${index})" ondragover="handleColumnDragOver(event)" ondrop="handleColumnDrop(event, '${tableId}', ${index})">${header}</th>`
    })
    tableHTML += '</tr></thead>'
    
    // Cuerpo de la tabla con funcionalidades completas
    tableHTML += '<tbody>'
    rows.forEach((row, rowIndex) => {
      tableHTML += '<tr>'
      row.forEach((cell, colIndex) => {
        const cellId = `cell_${tableId}_${rowIndex}_${colIndex}`
        tableHTML += `<td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" contenteditable="true" data-cell-id="${cellId}" onpaste="handleCellPaste(event, '${cellId}')" oninput="adjustCellHeight(this)" onblur="adjustCellHeight(this)">${cell}</td>`
      })
      tableHTML += '</tr>'
    })
    tableHTML += '</tbody></table>'
    tableHTML += '</div>'
    
    return tableHTML
  }
  
  // 🆕 Función para convertir tabla HTML a AdvancedTableV2 usando la misma lógica que insertAdvancedTableV2New
  const convertHTMLTableToAdvancedTable = (htmlText: string): string => {
    console.log('🔍 [DEBUG] Convirtiendo HTML de tabla:', htmlText.substring(0, 200) + '...')
    const tableId = `table_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    try {
      // Crear un DOM temporal para parsear el HTML
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = htmlText
      
      // Buscar la tabla en el HTML
      const table = tempDiv.querySelector('table')
      if (!table) {
        console.log('🔍 [DEBUG] No se encontró tabla en el HTML')
        return htmlText // Si no hay tabla, devolver el HTML original
      }
      
      console.log('🔍 [DEBUG] Tabla encontrada, procesando...')
    
      // Extraer encabezados
      const headers: string[] = []
      const headerRow = table.querySelector('thead tr') || table.querySelector('tr')
      if (headerRow) {
        const headerCells = headerRow.querySelectorAll('th, td')
        headerCells.forEach(cell => {
          headers.push(cell.textContent?.trim() || '')
        })
        console.log('🔍 [DEBUG] Encabezados extraídos:', headers)
      }
      
      // Extraer filas de datos
      const rows: string[][] = []
      const dataRows = table.querySelectorAll('tbody tr, tr:not(:first-child)')
      dataRows.forEach(row => {
        const cells: string[] = []
        const dataCells = row.querySelectorAll('td')
        dataCells.forEach(cell => {
          cells.push(cell.textContent?.trim() || '')
        })
        if (cells.length > 0) {
          rows.push(cells)
        }
      })
      console.log('🔍 [DEBUG] Filas de datos extraídas:', rows.length)
      
      // Si no hay encabezados, usar la primera fila como encabezados
      if (headers.length === 0 && rows.length > 0) {
        headers.push(...rows[0])
        rows.splice(0, 1)
        console.log('🔍 [DEBUG] Usando primera fila como encabezados:', headers)
      }
      
      // Generar HTML EXACTAMENTE igual que insertAdvancedTableV2New
      let tableHTML = `<div class="table-container" data-table-id="${tableId}">`
      tableHTML += `<table class="min-w-full border-collapse border border-gray-300 bg-white">`
      
      // Encabezados con funcionalidades completas (igual que insertAdvancedTableV2New)
      tableHTML += '<thead><tr>'
      headers.forEach((header, index) => {
        tableHTML += `<th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left cursor-grab hover:bg-gray-200 transition-colors" contenteditable="true" draggable="true" ondragstart="handleColumnDragStart(event, '${tableId}', ${index})" ondragover="handleColumnDragOver(event)" ondrop="handleColumnDrop(event, '${tableId}', ${index})">${header}</th>`
      })
      tableHTML += '</tr></thead>'
      
      // Cuerpo de la tabla con funcionalidades completas (igual que insertAdvancedTableV2New)
      tableHTML += '<tbody>'
      rows.forEach((row, rowIndex) => {
        tableHTML += '<tr>'
        row.forEach((cell, colIndex) => {
          const cellId = `cell_${tableId}_${rowIndex}_${colIndex}`
          tableHTML += `<td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" contenteditable="true" data-cell-id="${cellId}" onpaste="handleCellPaste(event, '${cellId}')" oninput="adjustCellHeight(this)" onblur="adjustCellHeight(this)">${cell}</td>`
        })
        tableHTML += '</tr>'
      })
      tableHTML += '</tbody></table>'
      tableHTML += '</div>'
      
      console.log('🔍 [DEBUG] HTML de tabla generado exitosamente')
      return tableHTML
      
    } catch (error) {
      console.error('🚫 [ERROR] Error al convertir HTML de tabla:', error)
      return htmlText // Devolver el HTML original si hay error
    }
  }
  
  // 🎯 Función para convertir tabla TSV a HTML usando la misma lógica que insertAdvancedTableV2New
  const convertTSVToTable = (text: string): string => {
    const lines = text.trim().split('\n').filter(line => line.trim())
    const tableId = `table_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Extraer encabezados (primera línea)
    const headers = lines[0].split('\t')
    
    // Extraer datos (resto de líneas)
    const rows = lines.slice(1).map(line => line.split('\t'))
    
    // Generar HTML EXACTAMENTE igual que insertAdvancedTableV2New
    let tableHTML = `<div class="table-container" data-table-id="${tableId}">`
    tableHTML += `<table class="min-w-full border-collapse border border-gray-300 bg-white">`
    
    // Encabezados con funcionalidades completas (igual que insertAdvancedTableV2New)
    tableHTML += '<thead><tr>'
    headers.forEach((header, index) => {
      tableHTML += `<th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left cursor-grab hover:bg-gray-200 transition-colors" contenteditable="true" draggable="true" ondragstart="handleColumnDragStart(event, '${tableId}', ${index})" ondragover="handleColumnDragOver(event)" ondrop="handleColumnDrop(event, '${tableId}', ${index})">${header}</th>`
    })
    tableHTML += '</tr></thead>'
    
    // Cuerpo de la tabla con funcionalidades completas (igual que insertAdvancedTableV2New)
    tableHTML += '<tbody>'
    rows.forEach((row, rowIndex) => {
      tableHTML += '<tr>'
      row.forEach((cell, colIndex) => {
        const cellId = `cell_${tableId}_${rowIndex}_${colIndex}`
        tableHTML += `<td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" contenteditable="true" data-cell-id="${cellId}" onpaste="handleCellPaste(event, '${cellId}')" oninput="adjustCellHeight(this)" onblur="adjustCellHeight(this)">${cell}</td>`
      })
      tableHTML += '</tr>'
    })
    tableHTML += '</tbody></table>'
    tableHTML += '</div>'
    
    return tableHTML
  }
  
  // 🎯 Función para mostrar notificaciones
  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    // Crear elemento de notificación
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg transition-all duration-300 transform translate-x-full ${
      type === 'success' ? 'bg-green-500 text-white' :
      type === 'error' ? 'bg-red-500 text-white' :
      'bg-cyan-500 text-white'
    }`
    notification.textContent = message
    
    // Agregar al DOM
    document.body.appendChild(notification)
    
    // Animar entrada
    setTimeout(() => {
      notification.classList.remove('translate-x-full')
    }, 100)
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
      notification.classList.add('translate-x-full')
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 300)
    }, 3000)
  }
  
  // 🎯 Función principal de pegado inteligente
  const handleSmartPaste = (e: React.ClipboardEvent, ref: React.RefObject<HTMLDivElement>) => {
    // Leer ambos formatos del portapapeles
    const pastedHTML = e.clipboardData.getData('text/html')
    const pastedText = e.clipboardData.getData('text')
    
    console.log('🔍 [DEBUG] Texto pegado:', pastedText)
    console.log('🔍 [DEBUG] Longitud del texto:', pastedText.length)
    console.log('🔍 [DEBUG] HTML pegado (primeros 200):', pastedHTML?.substring(0, 200))
    
    // 1. Detectar si es una imagen (WYSIWYG completo y persistente)
    if (isImageUrl(pastedText)) {
      e.preventDefault()
      if (ref.current) {
        console.log('✅ [WYSIWYG] Convirtiendo URL a imagen persistente en editor principal:', pastedText)
        
        // Usar convenciones estándar de editores de contenido
        const imageHTML = `<img src="${pastedText}" class="max-w-full h-auto max-h-32 object-contain rounded" alt="Imagen incrustada" loading="lazy">`
        
        // Usar document.execCommand para insertar HTML de manera estándar
        document.execCommand('insertHTML', false, imageHTML)
        
        // Agregar botón de borrar después de insertar la imagen
        const imgElement6 = ref.current?.querySelector('img')
        if (imgElement6) {
          // Crear contenedor para imagen y botón
          const container = document.createElement('div')
          container.className = 'relative inline-block max-w-full'
          container.style.position = 'relative'
          
          // Mover la imagen al contenedor
          imgElement6.parentNode?.insertBefore(container, imgElement6)
          container.appendChild(imgElement6)
          
          // Crear y agregar botón de borrar
          const deleteButton = document.createElement('button')
          const buttonId = `delete-btn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
          deleteButton.className = 'absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors z-10'
          deleteButton.innerHTML = '×'
          deleteButton.setAttribute('contenteditable', 'false')
          deleteButton.setAttribute('data-action', 'delete-image')
          deleteButton.setAttribute('data-button-id', buttonId)
          deleteButton.addEventListener('click', function(e) {
            e.preventDefault()
            e.stopPropagation()
            container.remove()
            console.log('✅ [Smart Paste] Imagen eliminada con botón de borrar')
          })
          
          container.appendChild(deleteButton)
        }
        
        // Ajustar el tamaño de la celda si estamos en una tabla
        const cell = ref.current?.closest('[data-cell-id]') as HTMLElement;
        if (cell) {
          // Usar la función global para ajustar el tamaño
          if (typeof window !== 'undefined' && (window as any).adjustCellSizeForImage) {
            (window as any).adjustCellSizeForImage(cell, pastedText);
          }
        }
        
        // Verificar si la imagen se carga correctamente
        const imgElement = ref.current?.querySelector('img')
        if (imgElement) {
          imgElement.addEventListener('load', () => {
            // Imagen cargada correctamente, verificar si hay otras fallidas
            if (typeof window !== 'undefined' && (window as any).updateFailedImagesDialog) {
              (window as any).updateFailedImagesDialog();
            }
          })
          
          imgElement.addEventListener('error', () => {
            // Imagen fallida, actualizar diálogo
            if (typeof window !== 'undefined' && (window as any).updateFailedImagesDialog) {
              (window as any).updateFailedImagesDialog();
            }
          })
        }
        
        // Actualizar el estado del contenido inmediatamente
        if (isEditModalOpen) {
          setEditContent(ref.current.innerHTML)
        } else if (isCreateModalOpen) {
          // Para el modal de creación, actualizar el estado correspondiente
          console.log('✅ [Smart Paste] Imagen insertada en modal de creación')
        }
      }
      return
    }
    
    // 1.5. Detectar si el HTML pegado ya contiene una imagen
    if (pastedHTML && pastedHTML.includes('<img')) {
      e.preventDefault()
      if (ref.current) {
        console.log('✅ [WYSIWYG] HTML con imagen detectado en editor principal')
        // Insertar el HTML directamente
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          const tempDiv = document.createElement('div')
          tempDiv.innerHTML = pastedHTML
          
          range.deleteContents()
          const fragment = document.createDocumentFragment()
          while (tempDiv.firstChild) {
            fragment.appendChild(tempDiv.firstChild)
          }
          range.insertNode(fragment)
          selection.removeAllRanges()
        }
      }
      return
    }
    
    // 2. Detectar si es una tabla
    // Priorizar detección por HTML si hay contenido HTML con <table>
    let tableFormat = null as ReturnType<typeof detectTableFormat>
    if (pastedHTML && pastedHTML.includes('<table')) {
      if (detectHTMLTable(pastedHTML)) {
        tableFormat = 'html'
      }
    }
    // Si no es HTML de tabla, detectar por texto plano
    if (!tableFormat) {
      tableFormat = detectTableFormat(pastedText)
    }
    console.log('🔍 [DEBUG] Formato de tabla detectado:', tableFormat)
    
    if (tableFormat) {
      e.preventDefault()
      
      if (ref.current) {
        // Convertir la tabla según el formato
        let tableHTML: string
        if (tableFormat === 'markdown') {
          tableHTML = convertMarkdownToTable(pastedText)
          console.log('🔍 [DEBUG] HTML generado para markdown:', tableHTML)
          showNotification('✅ Tabla Markdown convertida automáticamente a tabla visual', 'success')
        } else if (tableFormat === 'tsv') {
          tableHTML = convertTSVToTable(pastedText)
          console.log('🔍 [DEBUG] HTML generado para TSV:', tableHTML)
          showNotification('✅ Tabla TSV convertida automáticamente a tabla visual', 'success')
        } else if (tableFormat === 'html') {
          tableHTML = convertHTMLTableToAdvancedTable(pastedHTML || pastedText)
          console.log('🔍 [DEBUG] HTML generado para tabla HTML:', tableHTML)
          showNotification('✅ Tabla HTML convertida automáticamente a tabla visual', 'success')
        } else if (tableFormat === 'csv') {
          tableHTML = convertCSVToTable(pastedText)
          console.log('🔍 [DEBUG] HTML generado para CSV:', tableHTML)
          showNotification('✅ Tabla CSV convertida automáticamente a tabla visual', 'success')
        } else if (tableFormat === 'space') {
          tableHTML = convertSpaceSeparatedToTable(pastedText)
          console.log('🔍 [DEBUG] HTML generado para tabla con espacios:', tableHTML)
          showNotification('✅ Tabla con espacios convertida automáticamente a tabla visual', 'success')
        } else if (tableFormat === 'dash') {
          tableHTML = convertDashSeparatedToTable(pastedText)
          console.log('🔍 [DEBUG] HTML generado para tabla con guiones:', tableHTML)
          showNotification('✅ Tabla con guiones convertida automáticamente a tabla visual', 'success')
        }
        
        // Insertar la tabla en el editor
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          
          // Crear un contenedor temporal y establecer el HTML completo
          const tempDiv = document.createElement('div')
          tempDiv.innerHTML = tableHTML
          
          // Insertar la tabla completa
          range.deleteContents()
          
          // Insertar todos los nodos del contenedor temporal
          const fragment = document.createDocumentFragment()
          while (tempDiv.firstChild) {
            fragment.appendChild(tempDiv.firstChild)
          }
          range.insertNode(fragment)
          
          // Limpiar la selección
          selection.removeAllRanges()
          
          // 🆕 ASEGURAR QUE LAS FUNCIONES DE MEDIA ESTÉN DISPONIBLES
          // Buscar todas las celdas de la tabla insertada y asegurar que tengan acceso a las funciones
          const insertedTable = fragment.querySelector('.table-container')
          if (insertedTable) {
            // Re-aplicar los event listeners para asegurar que funcionen
            const cells = insertedTable.querySelectorAll('td')
            cells.forEach((cell, index) => {
              const cellId = cell.getAttribute('data-cell-id')
              if (cellId) {
                // Asegurar que los event listeners estén activos
                cell.addEventListener('mouseenter', () => {
                  if (window.showMediaButton) {
                    window.showMediaButton(cellId)
                  }
                })
                cell.addEventListener('mouseleave', () => {
                  if (window.hideMediaButton) {
                    window.hideMediaButton(cellId)
                  }
                })
                cell.addEventListener('paste', (e) => {
                  if (window.handleCellPaste) {
                    window.handleCellPaste(e, cellId)
                  }
                })
                cell.addEventListener('input', () => {
                  if (window.adjustCellHeight) {
                    window.adjustCellHeight(cell)
                  }
                })
                cell.addEventListener('blur', () => {
                  if (window.adjustCellHeight) {
                    window.adjustCellHeight(cell)
                  }
                })
              }
            })
          }
          
          // Actualizar el contenido del editor inmediatamente
          if (ref.current) {
            if (isEditModalOpen) {
              setEditContent(ref.current.innerHTML)
            } else if (isCreateModalOpen) {
              console.log('✅ [Smart Paste] Tabla insertada en modal de creación')
            }
          }
        }
      }
      return
    }
    
    // 3. Si no es nada especial, permitir el pegado normal
    // (no hacer preventDefault)
  }

  // Funciones para drag & drop de columnas
  const handleColumnDragStart = (event: DragEvent, tableId: string, columnIndex: number) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', `${tableId}:${columnIndex}`)
    }
  }

  const handleColumnDragOver = (event: DragEvent) => {
    event.preventDefault()
  }

  const handleColumnDrop = (event: DragEvent, tableId: string, targetColumnIndex: number) => {
    event.preventDefault()
    const data = event.dataTransfer?.getData('text/plain')
    if (data) {
      // data viene como "<tableId>:<columnIndex>"
      const [dragTableId, dragColumnIndexRaw] = data.split(':')
      const sourceColumnIndex = parseInt(dragColumnIndexRaw, 10)
      if (dragTableId === tableId && !Number.isNaN(sourceColumnIndex) && sourceColumnIndex !== targetColumnIndex) {
        const table = document.querySelector(`[data-table-id="${tableId}"]`) as HTMLTableElement
        if (table) {
          const rows = table.querySelectorAll('tr')
          rows.forEach(row => {
            const cells = row.querySelectorAll('td, th')
            if (cells.length > Math.max(sourceColumnIndex, targetColumnIndex)) {
              const sourceCell = cells[sourceColumnIndex]
              const targetCell = cells[targetColumnIndex]
              if (sourceCell && targetCell) {
                const temp = sourceCell.innerHTML
                sourceCell.innerHTML = targetCell.innerHTML
                targetCell.innerHTML = temp
              }
            }
          })
          
          // Actualizar el contenido según el modal activo
          if (isEditModalOpen) {
            if (contentRef.current) setEditContent(contentRef.current.innerHTML)
          } else if (isCreateModalOpen) {
            console.log('✅ [Smart Paste] Contenido actualizado en modal de creación')
          }
        }
      }
    }
  }

  // Hacer las funciones disponibles globalmente para que funcionen en el HTML generado
  React.useEffect(() => {
    // @ts-ignore
    window.handleColumnDragStart = handleColumnDragStart
    // @ts-ignore
    window.handleColumnDragOver = handleColumnDragOver
    // @ts-ignore
    window.handleColumnDrop = handleColumnDrop
    // @ts-ignore
    window.showMediaButton = showMediaButton
    // @ts-ignore
    window.hideMediaButton = hideMediaButton
    // @ts-ignore
    window.adjustCellHeight = adjustCellHeight
    // @ts-ignore
    window.handleCellPaste = handleCellPaste

    // Cleanup al desmontar
    return () => {
      // @ts-ignore
      delete window.handleColumnDragStart
      // @ts-ignore
      delete window.handleColumnDragOver
      // @ts-ignore
      delete window.handleColumnDrop
      // @ts-ignore
      delete window.showMediaButton
      // @ts-ignore
      delete window.hideMediaButton
      // @ts-ignore
      delete window.adjustCellHeight
      // @ts-ignore
      delete window.handleCellPaste
    }
  }, [])

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus
    const matchesType = activeType === 'all' || (post.contentType || 'post') === activeType
    return matchesSearch && matchesStatus && matchesType
  })

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <UnifiedLoading />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Administración de Posts</h1>
        <Button onClick={openCreateModal} className="bg-primary hover:bg-primary/80">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Post
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as 'all' | 'draft' | 'published')}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
        >
          <option value="all">Todos los estados</option>
          <option value="draft">Borradores</option>
          <option value="published">Publicados</option>
        </select>
      </div>

      {/* Category Tabs por tipo de contenido */}
      <div className="flex items-center justify-start mb-6">
        <div className="flex space-x-4">
          {[
            { key: 'all', label: 'Todos' },
            { key: 'post', label: 'Post' },
            { key: 'post+', label: 'Post+' },
            { key: 'photo', label: 'Photo' },
            { key: 'quote', label: 'Quote' },
            { key: 'video-player', label: 'Video Player' },
            { key: 'music-player', label: 'Music Player' },
            { key: 'portfolio', label: 'Portfolio' },
          { key: 'debug', label: 'Debug' },
          ].map((t: any) => (
            <button
              key={t.key}
              className={`text-[#333] whitespace-nowrap ${activeType === t.key ? '' : 'opacity-50'}`}
              onClick={() => setActiveType(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de posts */}
      <div className="grid gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                  <p className="text-gray-600 mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Creado: {new Date(post.createdAt).toLocaleDateString()}</span>
                    <span>Actualizado: {new Date(post.updatedAt).toLocaleDateString()}</span>
                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                      {post.status === 'published' ? 'Publicado' : 'Borrador'}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deletePost(post.id)}
                    className="flex items-center justify-center text-red-600 hover:text-red-700"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(post)}
                    className="flex items-center justify-center"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => viewPost(post.id)}
                    className="flex items-center justify-center"
                    title="Ver"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Modal Unificado (Edición/Creación) */}
      <ConfirmableModal 
        isOpen={isEditModalOpen || isCreateModalOpen} 
        onClose={editingPost ? closeEditModal : closeCreateModal} 
        title={editingPost ? "Editar Post" : "Crear Nuevo Post"}
      >
            
            {/* Tabs de idioma */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                type="button"
                onClick={() => switchLanguageTab('es')}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors bg-white ${
                  activeLanguageTab === 'es'
                    ? 'border-cyan-500 text-cyan-600'
                    : 'border-transparent text-gray-500 hover:text-gray-600'
                }`}
              >
                🇪🇸 Español
              </button>
              <button
                type="button"
                onClick={() => switchLanguageTab('en')}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors bg-white ${
                  activeLanguageTab === 'en'
                    ? 'border-cyan-500 text-cyan-600'
                    : 'border-transparent text-gray-500 hover:text-gray-600'
                }`}
              >
                🇺🇸 English
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Título * {activeLanguageTab === 'es' ? '(Español)' : '(English)'}
                </label>
                <input
                  type="text"
                  value={activeLanguageTab === 'es' ? editTitleEs : editTitleEn}
                  onChange={(e) => {
                    const v = e.target.value
                    if (activeLanguageTab === 'es') {
                      setEditTitleEs(v)
                      // Sincronizar título base con ES
                      setEditTitle(v)
                    } else {
                      setEditTitleEn(v)
                      // Si no hay título base aún, usar EN
                      if (!editTitle) setEditTitle(v)
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
                  placeholder={activeLanguageTab === 'es' ? 'Título del post en español' : 'Post title in English'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Extracto {activeLanguageTab === 'es' ? '(Español)' : '(English)'}
                </label>
                <textarea
                  value={activeLanguageTab === 'es' ? editExcerptEs : editExcerptEn}
                  onChange={(e) => {
                    if (activeLanguageTab === 'es') {
                      setEditExcerptEs(e.target.value)
                    } else {
                      setEditExcerptEn(e.target.value)
                    }
                  }}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
                  placeholder={activeLanguageTab === 'es' ? 'Breve descripción del post en español' : 'Brief description of the post in English'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Tipo de Contenido
                </label>
                <select
                  value={editContentType || 'post'}
                  onChange={(e) => setEditContentType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
                >
                  <option value="post">Post</option>
                  <option value="post+">Post+</option>
                  <option value="photo">Photo</option>
                  <option value="quote">Quote</option>
                  <option value="video-player">Video Player</option>
                  <option value="music-player">Music Player</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="debug">Debug</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Selecciona el tipo de contenido para este post
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Imagen Destacada (URL)
                </label>
                <input
                  type="url"
                  value={editFeaturedImage}
                  onChange={(e) => setEditFeaturedImage(e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
                />
                <p className="text-sm text-gray-500 mt-1">
                  URL de la imagen que se mostrará como thumbnail del post
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Contenido
                </label>
                
                {/* Barra de herramientas de formato */}
                <div className="flex items-center gap-2 mb-2 p-2 bg-gray-50 rounded-md border">
                  <span className="text-sm text-gray-600 mr-2">Formato:</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => formatText('bold')}
                    className="flex items-center gap-1"
                  >
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => formatText('italic')}
                    className="flex items-center gap-1"
                  >
                    <Italic className="w-4 h-4" />
                  </Button>
                  
                  <div className="ml-4 border-l border-gray-300 pl-4">
                    <span className="text-sm text-gray-600 mr-2">Insertar:</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={insertAdvancedTableV2New}
                      className="flex items-center gap-1"
                    >
                      <Table className="w-4 h-4" />
                      Tabla Avanzada
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={insertAsciiArt}
                      className="flex items-center gap-1"
                    >
                      <Code className="w-4 h-4" />
                      ASCII Art
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={insertQuote}
                      className="flex items-center gap-1"
                    >
                      <Type className="w-4 h-4" />
                      Quote
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={insertSeparator}
                      className="flex items-center gap-1"
                    >
                      <Minus className="w-4 h-4" />
                      Separador
                    </Button>
                  </div>
                </div>
                
                {/* Editor WYSIWYG real */}
                <LoadingSpinner isLoading={isSaving} message="Guardando cambios...">
                  <div
                    ref={contentRef}
                    contentEditable
                    className="w-full min-h-[500px] px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white text-gray-800 overflow-y-auto prose max-w-none"
                    style={{ 
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word',
                      lineHeight: '1.6'
                    }}
                    placeholder="Escribe el contenido del post aquí... Usa los botones de arriba para insertar elementos especiales."
                    onPaste={(e) => handleSmartPaste(e, contentRef)}
                    dangerouslySetInnerHTML={{ __html: editContent }}
                  />
                </LoadingSpinner>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={editingPost ? closeEditModal : closeCreateModal}>
                Cancelar
              </Button>
              <Button 
                onClick={editingPost ? handleSaveEdit : handleSaveNewPost} 
                disabled={isSaving || isCreating}
                className="bg-primary hover:bg-primary/90"
              >
                {isSaving ? 'Guardando...' : isCreating ? 'Creando...' : editingPost ? 'Guardar Cambios' : 'Crear Post'}
              </Button>
            </div>
      </ConfirmableModal>


      {/* Modal de Media - DESINSTALADO */}
      {/* Ya no necesitamos este modal porque es más intuitivo pegar URLs directamente */}
      {/* La funcionalidad WYSIWYG de pegar URLs de imagen reemplaza esta funcionalidad */}
    </div>
  )
}
