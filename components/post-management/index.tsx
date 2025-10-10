import { PostList } from "./post-list"
import { PostEditor } from "./post-editor"
import type { Post } from "@/lib/posts"

interface FormErrors {
  title?: string
  excerpt?: string
  content?: string
  date?: string
  coverImage?: string
  tags?: string
}

interface PostManagementProps {
  posts: Post[]
  selectedPost: Post | null
  formData: Partial<Post>
  date?: Date
  errors: FormErrors
  isLoading: boolean
  isSaving: boolean
  onSelectPost: (post: Post) => void
  onNewPost: () => void
  onDelete: (id: string) => Promise<void>
  onInputChange: (field: keyof Post, value: any) => void
  onSave: () => Promise<void>
  onDateSelect: (date: Date | undefined) => void
}

export function PostManagement({
  posts,
  selectedPost,
  formData,
  date,
  errors,
  isLoading,
  isSaving,
  onSelectPost,
  onNewPost,
  onDelete,
  onInputChange,
  onSave,
  onDateSelect,
}: PostManagementProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] lg:grid-cols-[350px_minmax(0,1fr)] gap-8">
      {/* Lista de posts */}
      <PostList
        posts={posts}
        selectedPost={selectedPost}
        isLoading={isLoading}
        isSaving={isSaving}
        onSelectPost={onSelectPost}
        onNewPost={onNewPost}
        onDelete={onDelete}
      />

      {/* Editor */}
      <PostEditor
        formData={formData}
        selectedPost={selectedPost}
        date={date}
        errors={errors}
        isLoading={isLoading}
        isSaving={isSaving}
        onInputChange={onInputChange}
        onSave={onSave}
        onDateSelect={onDateSelect}
      />
    </div>
  )
}
