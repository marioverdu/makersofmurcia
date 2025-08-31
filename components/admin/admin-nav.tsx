"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface AdminNavProps {
  className?: string
}

export function AdminNav({ className = "" }: AdminNavProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/admin") {
      return pathname === "/admin"
    }
    return pathname.startsWith(path)
  }

  const getButtonVariant = (path: string) => {
    return isActive(path) ? "default" : "ghost"
  }

  return (
    <nav className={`bg-white border-b border-gray-200 px-2 sm:px-4 py-2 sm:py-3 ${className}`}>
      <div className="container mx-auto">
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <span className="text-lg font-bold text-gray-800">⚡ Admin Panel</span>
            
            <Link href="/admin">
              <Button 
                variant={getButtonVariant("/admin")}
                size="sm"
                className="ml-2"
              >
                🏠 Dashboard
              </Button>
            </Link>
            
            <Link href="/admin/routes">
              <Button 
                variant={getButtonVariant("/admin/routes")}
                size="sm"
                className="ml-2"
              >
                🛠️ Rutas
              </Button>
            </Link>
            
            <Link href="/admin/posts">
              <Button 
                variant={getButtonVariant("/admin/posts")}
                size="sm"
                className="ml-2"
              >
                📝 Posts
              </Button>
            </Link>
            
            <Link href="/admin/booking">
              <Button 
                variant={getButtonVariant("/admin/booking")}
                size="sm"
                className="ml-2"
              >
                📅 Reservas
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <Link href="/">
              <Button variant="outline" size="sm">
                🌐 Ver Sitio
              </Button>
            </Link>
            <div className="flex items-center space-x-1 text-sm text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>🟢 Sistema Activo</span>
            </div>
          </div>
        </div>
        
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-base font-bold text-gray-800">⚡ Admin</span>
            <div className="flex items-center space-x-1 text-xs text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>🟢 Activo</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            <Link href="/admin">
              <Button 
                variant={getButtonVariant("/admin")}
                size="sm"
                className="text-xs px-2 py-1 h-8"
              >
                🏠
              </Button>
            </Link>
            
            <Link href="/admin/routes">
              <Button 
                variant={getButtonVariant("/admin/routes")}
                size="sm"
                className="text-xs px-2 py-1 h-8"
              >
                🛠️
              </Button>
            </Link>
            
            <Link href="/admin/posts">
              <Button 
                variant={getButtonVariant("/admin/posts")}
                size="sm"
                className="text-xs px-2 py-1 h-8"
              >
                📝
              </Button>
            </Link>
            
            <Link href="/admin/booking">
              <Button 
                variant={getButtonVariant("/admin/booking")}
                size="sm"
                className="text-xs px-2 py-1 h-8"
              >
                📅
              </Button>
            </Link>
            
            <Link href="/">
              <Button 
                variant="outline"
                size="sm"
                className="text-xs px-2 py-1 h-8"
              >
                🌐
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
