import { AdminHeaderV2 } from "@/components/admin/admin-header-v2"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeaderV2 />
      <main className="container mx-auto px-4 py-6" style={{ marginTop: 72 }}>
        {children}
      </main>
    </div>
  )
}
