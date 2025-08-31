"use client"

import type React from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Post } from "@/lib/posts"
import type { ContentType } from "@/lib/content-type-detector"
import { cn } from "@/lib/utils"
import { useRef, useEffect, useCallback, useState } from "react"
import { ImageIcon } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
interface FormErrors {
  title?: string
  excerpt?: string
  content?: string
  date?: string
  coverImage?: string
  tags?: string
}

interface PostEditorProps {
  formData: Partial<Post>
  selectedPost: Post | null
  date?: Date
  errors: FormErrors
  isLoading: boolean
  isSaving: boolean
  onInputChange: (field: keyof Post, value: any) => void
  onSave: () => Promise<void>
  onDateSelect: (date: Date | undefined) => void
}

export function PostEditor({
  formData,
  selectedPost,
  date,
  errors,
  isLoading,
  isSaving,
  onInputChange,
  onSave,
  onDateSelect,
}: PostEditorProps) {
  const [tagInput, setTagInput] = useState("")
  const [imageUrlDetected, setImageUrlDetected] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const contentEditableRef = useRef<HTMLDivElement>(null)
  const lastDetectedUrl = useRef("")
  const lastTextNode = useRef<Node | null>(null)
  const [previewContent, setPreviewContent] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleTypeChange = useCallback(
    (type: ContentType) => {
      onInputChange("contentType", type)
    },
    [onInputChange],
  )

  const handleAddTag = () => {
    if (!tagInput.trim()) return

    const newTag = tagInput.trim()
    const currentTags = formData.tags || []

    if (!currentTags.includes(newTag)) {
      onInputChange("tags", [...currentTags, newTag])
    }

    setTagInput("")
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = formData.tags || []
    onInputChange(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove),
    )
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  // Función para detectar URLs de imágenes en el texto
  const checkForImageUrl = (text: string) => {
    const cursorPosition = textareaRef.current?.selectionStart || 0

    // Obtener la línea actual donde está el cursor
    const lines = text.split("\n")
    let currentLineIndex = 0
    let charCount = 0

    for (let i = 0; i < lines.length; i++) {
      if (charCount + lines[i].length >= cursorPosition) {
        currentLineIndex = i
        break
      }
      // +1 para el carácter de nueva línea
      charCount += lines[i].length + 1
    }

    const currentLine = lines[currentLineIndex]

    // Detectar URL de imagen en la línea actual
    const urlRegex = /(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp))/i
    const match = currentLine.match(urlRegex)

    if (match) {
      lastDetectedUrl.current = match[0]

      // Calcular la posición para mostrar la barra contextual
      if (textareaRef.current) {
        const { offsetLeft, offsetTop } = textareaRef.current
        const cursorPos = textareaRef.current.selectionStart

        // Crear un elemento temporal para calcular la posición del cursor
        const textBeforeCursor = text.substring(0, cursorPos)
        const span = document.createElement("span")
        span.textContent = textBeforeCursor
        span.style.position = "absolute"
        span.style.visibility = "hidden"
        span.style.whiteSpace = "pre-wrap"
        span.style.width = `${textareaRef.current.clientWidth}px`

        document.body.appendChild(span)
        const rect = span.getBoundingClientRect()
        document.body.removeChild(span)

        setCursorPosition({
          x: offsetLeft,
          y: offsetTop + rect.height,
        })

        setImageUrlDetected(true)
      }
    } else {
      setImageUrlDetected(false)
    }

    // Actualizar la vista previa
    setPreviewContent(text)
  }

  // Función para insertar la imagen en el contenido
  const embedImageAtCursor = () => {
    if (!lastTextNode.current || !lastDetectedUrl.current || !contentEditableRef.current) return

    const url = lastDetectedUrl.current
    const textNode = lastTextNode.current
    const text = textNode.textContent || ""

    if (!text.includes(url)) return

    // Crear elemento de imagen
    const imgElement = document.createElement("img")
    imgElement.src = url
    imgElement.className = "w-full rounded-md my-2"
    imgElement.setAttribute("data-original-url", url)

    // Configurar evento de doble clic para editar
    imgElement.ondblclick = (e) => {
      e.preventDefault()
      const originalUrl = imgElement.getAttribute("data-original-url") || ""
      const textNode = document.createTextNode(originalUrl)
      imgElement.parentNode?.replaceChild(textNode, imgElement)

      // Colocar el cursor al final de la URL
      const selection = window.getSelection()
      const range = document.createRange()
      range.setStartAfter(textNode)
      range.collapse(true)
      selection?.removeAllRanges()
      selection?.addRange(range)
    }

    // Reemplazar la URL con la imagen
    const newText = text.replace(url, "")
    textNode.textContent = newText

    if (textNode.parentNode) {
      textNode.parentNode.insertBefore(imgElement, textNode.nextSibling)
    }

    // Actualizar el contenido en formData
    if (contentEditableRef.current) {
      onInputChange("content", contentEditableRef.current.innerHTML)
    }

    // Si no hay imagen de portada, usar esta imagen como portada
    if (!formData.coverImage) {
      onInputChange("coverImage", url)
    }

    setImageUrlDetected(false)
  }

  // Función para renderizar el contenido con imágenes embebidas
  const renderContentWithEmbeddedImages = (content: string) => {
    // Reemplazar [img]url[/img] con <img> tags
    const imgRegex = /\[img\](https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp))\[\/img\]/gi
    return content
      .replace(imgRegex, (match, url) => {
        return `<img src="${url}" class="w-full rounded-md my-2" alt="Embedded image" />`
      })
      .replace(/\n/g, "<br />")
  }

  // Manejar clics en la vista previa
  const handlePreviewClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement

    if (target.tagName === "IMG") {
      // Obtener la URL de la imagen
      const imgSrc = target.getAttribute("src")
      if (!imgSrc) return

      // Encontrar la etiqueta [img] correspondiente en el contenido
      const content = formData.content || ""
      const imgRegex = new RegExp(`\\[img\\](${imgSrc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\[\\/img\\]`, "i")
      const match = content.match(imgRegex)

      if (match && textareaRef.current) {
        // Calcular la posición de la etiqueta [img] en el contenido
        const imgTagPos = content.indexOf(match[0])

        // Establecer la selección en el textarea
        textareaRef.current.focus()
        textareaRef.current.setSelectionRange(imgTagPos, imgTagPos + match[0].length)
      }
    }
  }

  // Efecto para manejar clics fuera del área de edición
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contentEditableRef.current && !contentEditableRef.current.contains(e.target as Node)) {
        setImageUrlDetected(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (contentEditableRef.current && formData.content) {
      // Solo actualizar si el contenido es diferente para evitar perder la selección
      if (contentEditableRef.current.innerHTML !== formData.content) {
        contentEditableRef.current.innerHTML = formData.content
      }
    }
  }, [formData.content])

  return (
    <div className="space-y-6 border rounded-lg p-6 bg-white">
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          await onSave()
        }}
        className="space-y-6"
      >
        {/* Título */}
        <div className="space-y-2">
          <Label htmlFor="title" className={errors.title ? "text-red-500" : ""}>
            Título
          </Label>
          <Input
            id="title"
            value={formData.title || ""}
            onChange={(e) => onInputChange("title", e.target.value)}
            className={cn("w-full", errors.title && "border-red-500 focus-visible:ring-red-500")}
            disabled={isLoading || isSaving}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Extracto */}
        <div className="space-y-2">
          <Label htmlFor="excerpt">
            Extracto
            <span className="ml-2 text-sm text-muted-foreground">(opcional)</span>
          </Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt || ""}
            onChange={(e) => onInputChange("excerpt", e.target.value)}
            className={cn("w-full", errors.excerpt && "border-red-500 focus-visible:ring-red-500")}
            rows={3}
            disabled={isLoading || isSaving}
            placeholder="Escribe un breve resumen del post..."
          />
          {errors.excerpt && <p className="text-red-500 text-sm">{errors.excerpt}</p>}
        </div>

        {/* Fecha */}
        <div className="space-y-2">
          <Label className={errors.date ? "text-red-500" : ""}>Fecha de publicación</Label>
          <Input
            type="date"
            value={date ? date.toISOString().split("T")[0] : ""}
            onChange={(e) => {
              const newDate = e.target.value ? new Date(e.target.value) : undefined
              onDateSelect(newDate)
            }}
            className={cn("w-full", errors.date && "border-red-500 focus-visible:ring-red-500")}
            disabled={isLoading || isSaving}
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        {/* Imagen de portada */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            Imagen de portada
            <span className="text-sm text-muted-foreground">(opcional)</span>
          </Label>
          <div className="relative w-full h-[200px] rounded-lg overflow-hidden border">
            <Image src={formData.coverImage || "/placeholder.svg"} alt="Cover" fill className="object-cover" />
          </div>
          <Input
            type="url"
            placeholder="URL de la imagen de portada"
            value={formData.coverImage || ""}
            onChange={(e) => onInputChange("coverImage", e.target.value)}
            className="mt-2"
            disabled={isLoading || isSaving}
          />
        </div>

        {/* Contenido */}
        <div className="space-y-2">
          <Label htmlFor="content">
            Contenido
            <span className="ml-2 text-sm text-muted-foreground">(opcional)</span>
          </Label>
          <div className="space-y-4 relative">
            <div
              id="content-editor"
              contentEditable
              className="w-full min-h-[300px] border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onInput={(e) => {
                const content = e.currentTarget.innerHTML
                onInputChange("content", content)

                // Detectar URLs de imágenes
                const selection = window.getSelection()
                if (selection && selection.rangeCount > 0) {
                  const range = selection.getRangeAt(0)
                  const node = range.startContainer

                  if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.textContent || ""
                    const urlRegex = /(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp))/i
                    const match = text.match(urlRegex)

                    if (match) {
                      const url = match[0]
                      const urlIndex = text.indexOf(url)

                      if (urlIndex >= 0) {
                        // Mostrar barra contextual
                        const rect = range.getBoundingClientRect()
                        setCursorPosition({
                          x: rect.left,
                          y: rect.bottom,
                        })
                        setImageUrlDetected(true)
                        lastDetectedUrl.current = url
                        lastTextNode.current = node
                      }
                    } else {
                      setImageUrlDetected(false)
                    }
                  }
                }

                // Detectar tipo de contenido automáticamente
                if (content.includes("soundcloud.com/player") || content.includes("spotify.com/embed")) {
                  handleTypeChange("music-player")
                } else if (
                  content.includes("youtube.com/embed") ||
                  content.includes("youtu.be") ||
                  content.includes("vimeo.com")
                ) {
                  handleTypeChange("video-player")
                } else if (content.includes(">") && content.split("<br>").length < 3) {
                  handleTypeChange("quote")
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  document.execCommand("insertHTML", false, "<br><br>")
                  e.preventDefault()
                }
              }}
              onPaste={(e) => {
                // Permitir que el pegado ocurra normalmente
                setTimeout(() => {
                  // Verificar que contentEditableRef.current no sea nulo
                  if (!contentEditableRef.current) return

                  // Después del pegado, buscar URLs de imágenes
                  const content = contentEditableRef.current.innerHTML
                  onInputChange("content", content)

                  // Buscar URLs de imágenes en todo el contenido
                  const urlRegex = /(https?:\/\/[^\s<>"]+\.(jpg|jpeg|png|gif|webp))/i
                  const match = content.match(urlRegex)

                  if (match) {
                    const url = match[0]
                    const selection = window.getSelection()

                    if (selection && selection.rangeCount > 0) {
                      const range = selection.getRangeAt(0)
                      const rect = range.getBoundingClientRect()

                      setCursorPosition({
                        x: rect.left,
                        y: rect.bottom,
                      })

                      setImageUrlDetected(true)
                      lastDetectedUrl.current = url

                      // Buscar el nodo de texto que contiene la URL
                      const findTextNodeWithUrl = (node: Node): Node | null => {
                        if (node.nodeType === Node.TEXT_NODE && node.textContent?.includes(url)) {
                          return node
                        }

                        for (let i = 0; i < node.childNodes.length; i++) {
                          const found = findTextNodeWithUrl(node.childNodes[i])
                          if (found) return found
                        }

                        return null
                      }

                      // Verificar que contentEditableRef.current no sea nulo antes de usarlo
                      if (contentEditableRef.current) {
                        lastTextNode.current = findTextNodeWithUrl(contentEditableRef.current)
                      }
                    }
                  }
                }, 0)
              }}
              dangerouslySetInnerHTML={{ __html: formData.content || "" }}
              ref={contentEditableRef}
              disabled={isLoading || isSaving}
            />

            {imageUrlDetected && (
              <div
                className="absolute bg-gray-100 rounded-md p-2 shadow-md flex items-center gap-2 z-10"
                style={{
                  top: cursorPosition.y,
                  left: cursorPosition.x,
                }}
              >
                <button
                  type="button"
                  onClick={embedImageAtCursor}
                  className="flex items-center gap-1 text-sm hover:bg-gray-200 p-1 rounded"
                >
                  <ImageIcon size={16} />
                  <span>Insertar imagen</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tipo de contenido */}
        <div className="space-y-2">
          <Label>Tipo de contenido</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {(["post", "post+", "photo", "quote", "music-player", "video-player"] as ContentType[]).map((type) => (
              <Button
                key={type}
                type="button"
                variant={formData.contentType === type ? "default" : "outline"}
                onClick={() => handleTypeChange(type)}
                className="h-10"
                disabled={isLoading || isSaving}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label>
            Tags
            <span className="ml-2 text-sm text-muted-foreground">(opcional)</span>
          </Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {(formData.tags || []).map((tag) => (
              <div key={tag} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                <span className="text-sm">{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-gray-500 hover:text-gray-600"
                  disabled={isLoading || isSaving}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Añadir tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              disabled={isLoading || isSaving}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={handleAddTag}
              disabled={!tagInput.trim() || isLoading || isSaving}
              variant="outline"
            >
              Añadir
            </Button>
          </div>
        </div>

        {/* Botón guardar */}
        <Button type="submit" disabled={isLoading || isSaving || !formData.title?.trim()} className="w-full">
          {isSaving ? "Guardando..." : selectedPost ? "Actualizar post" : "Publicar post"}
        </Button>
      </form>
    </div>
  )
}
