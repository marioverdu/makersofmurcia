"use client"

import { HeaderTabs } from "@/components/ui/header/tabs"
import { PriceEstimatorV4 } from "@/components/price-estimator/price-estimator-v4"

export default function PriceEstimatorPage() {
  return (
    <div className="min-h-screen w-full bg-[#F7F8FC] overflow-x-hidden pt-[40px]">
      {/* Sticky Header */}
      <HeaderTabs />

      {/* Main content */}
      <main className="flex justify-center w-full px-4 md:px-[60px] py-[40px]">
        <div className="w-full max-w-[1092px]">
          <h1 className="text-[hsl(206,1%,27%)] text-3xl font-medium mb-8">Estimador de precio</h1>

          {/* Price Estimator Form */}
          <div className="w-full">
            <PriceEstimatorV4 />
          </div>
        </div>
      </main>
    </div>
  )
}
