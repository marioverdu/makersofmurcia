"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search, Trash2 } from "lucide-react"
import type { Post } from "@/lib/posts"
import { useDebounce } from "@/hooks/use-debounce"
import { useEffect } from "react"
import { UnifiedLoading } from "@/components/ui/unified-loading"

interface PostListProps {
  posts: Post[]
  selectedPost: Post | null
  isLoading: boolean
  isSaving: boolean
  onSelectPost: (post: Post) => void
  onNewPost: () => void
  onDelete: (id: string) => Promise<void>
}

export function PostList({
  posts,
  selectedPost,
  isLoading,
  isSaving,
  onSelectPost,
  onNewPost,
  onDelete,
}: PostListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts)
  const debouncedSearch = useDebounce(searchQuery, 300)

  // Filtrar posts cuando cambia la búsqueda o los posts
  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setFilteredPosts(posts)
      return
    }

    const query = debouncedSearch.toLowerCase()
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(query)),
    )
    setFilteredPosts(filtered)
  }, [debouncedSearch, posts])

  // Buscar posts en la API
  const searchPosts = async (query: string) => {
    if (!query.trim()) {
      setFilteredPosts(posts)
      return
    }

    try {
      const response = await fetch(`/api/posts/search?q=${encodeURIComponent(query)}`, {
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      if (!response.ok) throw new Error("Error searching posts")
      const results = await response.json()
      setFilteredPosts(results)
    } catch (error) {
      console.error("Error searching posts:", error)
      // Fallback a búsqueda local
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query)),
      )
      setFilteredPosts(filtered)
    }
  }

  // Manejar cambio en el input de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    if (!query.trim()) {
      setFilteredPosts(posts)
    }
  }

  // Manejar tecla Enter en la búsqueda
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchPosts(searchQuery)
    }
  }

  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Posts</h2>
          <Button onClick={onNewPost} size="sm" className="h-8 gap-1" disabled={isLoading || isSaving}>
            <PlusCircle className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Nuevo</span>
          </Button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar posts..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            disabled={isLoading}
          />
        </div>

        <div className="flex-1 h-[calc(100vh-13rem)] overflow-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <UnifiedLoading />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-center">
              <p className="text-muted-foreground mb-2">No hay posts disponibles</p>
              <Button onClick={onNewPost} variant="outline" size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Crear nuevo post
              </Button>
            </div>
          ) : (
            <ul className="space-y-2">
              {filteredPosts.map((post) => (
                <li key={post.id}>
                  <div
                    className={`flex justify-between items-start p-2 rounded-md cursor-pointer hover:bg-gray-100 ${
                      selectedPost?.id === post.id ? "bg-gray-100" : ""
                    }`}
                  >
                    <div className="flex-1 overflow-hidden" onClick={() => onSelectPost(post)}>
                      <h3 className="font-medium truncate">{post.title}</h3>
                      <p className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString()}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {post.tags?.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-1.5 py-0.5 bg-gray-100 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                        {post.tags && post.tags.length > 3 && (
                          <span className="px-1.5 py-0.5 bg-gray-100 text-xs rounded-full">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => onDelete(post.id)}
                      disabled={isSaving}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
