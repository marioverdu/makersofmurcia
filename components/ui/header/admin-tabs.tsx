"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface AdminHeaderTabsProps {
  className?: string
}

export function AdminHeaderTabs({ className = "" }: AdminHeaderTabsProps) {
  const pathname = usePathname()

  // Detectar en qué página de admin estamos
  const isDashboard = pathname === "/admin"
  const isPosts = pathname.startsWith("/admin/posts")
  const isAnalytics = pathname.startsWith("/admin/analytics")
  const isBooking = pathname.startsWith("/admin/booking")

  // Tabs del admin
  const adminTabs = [
    { name: "Dashboard", href: "/admin", isActive: isDashboard },
    { name: "Posts", href: "/admin/posts", isActive: isPosts },
    { name: "Analytics", href: "/admin/analytics", isActive: isAnalytics },
    { name: "Booking", href: "/admin/booking", isActive: isBooking },
  ]

  return (
    <div className={`flex gap-1 md:gap-[16px] h-[40px] mx-auto md:mx-0 justify-center md:justify-start ${className}`}>
      {adminTabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`text-sm font-medium h-[40px] flex items-center px-1 border-b-2 whitespace-nowrap ${
            tab.isActive
              ? "text-[#3D5B6A] border-[#3D5B6A]"
              : "text-gray-500 font-normal border-transparent hover:border-[#3D5B6A] hover:text-[#3D5B6A]"
          } transition-colors`}
        >
          {tab.name}
        </Link>
      ))}
    </div>
  )
}

