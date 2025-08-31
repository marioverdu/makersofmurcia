"use client"
import AnalyticsLoading from "./loading"
import { Suspense } from "react"

interface AnalyticsSummary {
  totalPageViews: number
  uniqueUsers: number
  averageSessionDuration: number
  topPages: Array<{ page: string; views: number }>
  topReferrers: Array<{ referrer: string; count: number }>
  deviceBreakdown: Array<{ device: string; count: number }>
  browserBreakdown: Array<{ browser: string; count: number }>
  recentActivity: Array<{
    id: number
    page_path: string
    user_agent?: string
    session_id?: string
    created_at: string
  }>
}

async function AnalyticsContent() {
  // Simulamos carga de datos
  await new Promise((resolve) => setTimeout(resolve, 100))

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
          <p className="text-2xl font-bold">12,345</p>
          <p className="text-xs text-green-600">+12% from last month</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Unique Visitors</h3>
          <p className="text-2xl font-bold">8,901</p>
          <p className="text-xs text-green-600">+8% from last month</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Bounce Rate</h3>
          <p className="text-2xl font-bold">34.2%</p>
          <p className="text-xs text-red-600">+2% from last month</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Avg. Session</h3>
          <p className="text-2xl font-bold">2m 45s</p>
          <p className="text-xs text-green-600">+15s from last month</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
        <p className="text-gray-600">Analytics data will be displayed here once the system is fully configured.</p>
      </div>
    </div>
  )
}

export default function AdminAnalyticsPage() {
  return (
    <Suspense fallback={<AnalyticsLoading />}>
      <AnalyticsContent />
    </Suspense>
  )
}
