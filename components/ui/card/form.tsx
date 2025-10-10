"use client"

import { useState } from "react"
import { Clock, Package } from "lucide-react"
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons"

interface CardFormProps {
  formName: string
  currentStep: number
  className?: string
  showFullContent?: boolean
}

export function CardForm({ formName, currentStep, className = "", showFullContent = false }: CardFormProps) {
  const [billingType, setBillingType] = useState<"hourly" | "custom">("hourly")

  // If we just want the background element without content
  if (!showFullContent) {
    return (
      <div
        className={`absolute inset-0 w-full rounded-[12px] overflow-hidden -z-10 ${className}`}
        aria-label={`${formName}-step-${currentStep}-background`}
        data-testid="form-background"
        data-technology="react-tailwind-typescript"
        style={{
          backgroundColor: "rgba(203, 219, 227, 0.04)", // 40% de la opacidad original
          border: "1px solid rgba(0, 94, 182, 0.04)", // 40% de la opacidad original
        }}
      ></div>
    )
  }

  // Full content version that matches price-estimator
  return (
    <div
      className="relative w-full w-full h-auto min-h-[400px]"
      data-form-name={formName}
      data-current-step={currentStep}
    >
      <div
        className="absolute inset-0 w-full rounded-[12px] backdrop-blur-md border border-white/40"
        style={{
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(247, 248, 252, 0.4)",
        }}
      >
        <div
          className="absolute inset-0 w-full rounded-[12px] overflow-hidden -z-10"
          aria-label={`${formName}-step-${currentStep}-background`}
          data-testid="form-background"
          data-technology="react-tailwind-typescript"
          style={{
            backgroundColor: "rgba(203, 219, 227, 0.04)",
            border: "1px solid rgba(0, 94, 182, 0.04)",
          }}
        ></div>
      </div>
      <div
        className="relative mx-2 my-4 rounded-[12px] backdrop-blur-md border border-white/40 w-[calc(100%-16px)]"
        style={{
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(247, 248, 252, 0.7)",
        }}
      >
        <div
          className="absolute inset-0 rounded-[12px] overflow-hidden -z-10"
          style={{
            backgroundColor: "rgba(203, 219, 227, 0.1)",
            border: "1px solid rgba(0, 94, 182, 0.1)",
          }}
        ></div>
        <div className="p-6 md:p-8 xl:p-[48px] w-full">
          <div className="step-content">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h2 className="text-[hsl(206,1%,27%)] text-xl font-medium">Tipo de facturación</h2>
                <p className="text-[hsl(206,1%,27%)] text-sm opacity-50">
                  Selecciona el tipo de facturación que prefieres para tu proyecto
                </p>
              </div>
              <div className="flex gap-4 w-full">
                <label
                  className={`flex-1 h-[80px] rounded-[6px] border-2 transition-all cursor-pointer flex items-center justify-center ${
                    billingType === "hourly"
                      ? "border-[#3D5B6A] bg-[#3D5B6A]/10"
                      : "border-[hsl(206,1%,27%)]/20 hover:border-[hsl(206,1%,27%)]/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="billingType"
                    value="hourly"
                    checked={billingType === "hourly"}
                    onChange={() => setBillingType("hourly")}
                    className="sr-only"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <Clock
                      size={16}
                      className={billingType === "hourly" ? "text-[#3D5B6A]" : "text-[hsl(206,1%,27%)]"}
                    />
                    <span
                      className={`text-sm font-medium ${
                        billingType === "hourly" ? "text-[#3D5B6A]" : "text-[hsl(206,1%,27%)]"
                      }`}
                    >
                      Hourly
                    </span>
                  </div>
                </label>
                <label
                  className={`flex-1 h-[80px] rounded-[6px] border-2 transition-all cursor-pointer flex items-center justify-center ${
                    billingType === "custom"
                      ? "border-[#3D5B6A] bg-[#3D5B6A]/10"
                      : "border-[hsl(206,1%,27%)]/20 hover:border-[hsl(206,1%,27%)]/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="billingType"
                    value="custom"
                    checked={billingType === "custom"}
                    onChange={() => setBillingType("custom")}
                    className="sr-only"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <Package
                      size={16}
                      className={billingType === "custom" ? "text-[#3D5B6A]" : "text-[hsl(206,1%,27%)]"}
                    />
                    <span
                      className={`text-sm font-medium ${
                        billingType === "custom" ? "text-[#3D5B6A]" : "text-[hsl(206,1%,27%)]"
                      }`}
                    >
                      Custom
                    </span>
                  </div>
                </label>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-[hsl(206,1%,27%)] text-xl font-medium">Presupuesto estimado</h2>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="10"
                    defaultValue="100"
                    className="w-full h-[40px] rounded-[6px] border border-[hsl(206,1%,27%)]/20 px-4 pr-12 focus:outline-none focus:border-[#3D5B6A]"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[hsl(206,1%,27%)]">€</span>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-2">
                <SecondaryButton
                  className="opacity-50 cursor-not-allowed"
                  disabled={true}
                  hideOnFirstStep={true}
                  currentStep={0}
                >
                  Atrás
                </SecondaryButton>
                <PrimaryButton>Siguiente</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
