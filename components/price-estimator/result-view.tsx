"use client"
import type { FormResponse } from "@/lib/price-estimator/types"
import { PRICE_ESTIMATOR_PLANS } from "@/lib/price-estimator/constants"
import { PlanOption, ResultFooter } from "./form-elements"

interface ResultViewProps {
  result: string
  responses: FormResponse
  selectedPlan: string
  setSelectedPlan: (plan: string) => void
  closestPlan: string
  finalCalculatedPrice: string
  onReset: () => void
  onProposeProject: () => void
  onBack: () => void
}

export function ResultView({
  result,
  responses,
  selectedPlan,
  setSelectedPlan,
  closestPlan,
  finalCalculatedPrice,
  onReset,
  onProposeProject,
  onBack,
}: ResultViewProps) {
  const budgetSelection = responses["budget"]

  const getDisplayPlanName = (planKey: string) => {
    // If "Contrato en plantilla" was selected in the budget step
    if (responses["budget"] === "Contrato en plantilla") {
      return "Contrato en plantilla"
    }
    // If "Precio cerrado" was selected in the budget step
    if (responses["budget"] === "Precio cerrado") {
      return "Plan personalizado"
    }

    // If there are no exceptions, show the normal plan name
    switch (planKey) {
      case "hoverboard":
        return "Plan Hoverboard"
      case "jetpack":
        return "Plan Jetpack"
      case "fenix":
        return "Plan Fénix"
      case "nabuco":
        return "Plan Nabuco"
      default:
        return `Plan ${planKey.charAt(0).toUpperCase() + planKey.slice(1)}`
    }
  }

  const renderPlanOptions = () => {
    switch (closestPlan) {
      case "hoverboard":
        return (
          <>
            <PlanOption
              planName="hoverboard"
              displayName={getDisplayPlanName("hoverboard")}
              isSelected={selectedPlan === "hoverboard"}
              isRecommended={true}
              price={budgetSelection === "Precio cerrado" ? "A determinar" : finalCalculatedPrice}
              onSelect={setSelectedPlan}
            />
            <PlanOption
              planName="jetpack"
              displayName="Plan Jetpack"
              isSelected={selectedPlan === "jetpack"}
              onSelect={setSelectedPlan}
            />
            <PlanOption
              planName="fenix"
              displayName="Plan Fénix"
              isSelected={selectedPlan === "fenix"}
              onSelect={setSelectedPlan}
            />
          </>
        )
      case "jetpack":
        return (
          <>
            <PlanOption
              planName="jetpack"
              displayName={getDisplayPlanName("jetpack")}
              isSelected={selectedPlan === "jetpack"}
              isRecommended={true}
              price={budgetSelection === "Precio cerrado" ? "A determinar" : finalCalculatedPrice}
              onSelect={setSelectedPlan}
            />
            <PlanOption
              planName="fenix"
              displayName="Plan Fénix"
              isSelected={selectedPlan === "fenix"}
              onSelect={setSelectedPlan}
            />
            <PlanOption
              planName="nabuco"
              displayName="Plan Nabuco"
              isSelected={selectedPlan === "nabuco"}
              onSelect={setSelectedPlan}
            />
          </>
        )
      case "fenix":
        return (
          <>
            <PlanOption
              planName="fenix"
              displayName={getDisplayPlanName("fenix")}
              isSelected={selectedPlan === "fenix"}
              isRecommended={true}
              price={budgetSelection === "Precio cerrado" ? "A determinar" : finalCalculatedPrice}
              onSelect={setSelectedPlan}
            />
            <PlanOption
              planName="nabuco"
              displayName="Plan Nabuco"
              isSelected={selectedPlan === "nabuco"}
              onSelect={setSelectedPlan}
            />
            <PlanOption
              planName="jetpack"
              displayName="Plan Jetpack"
              isSelected={selectedPlan === "jetpack"}
              onSelect={setSelectedPlan}
            />
          </>
        )
      case "nabuco":
        return (
          <>
            <PlanOption
              planName="nabuco"
              displayName={getDisplayPlanName("nabuco")}
              isSelected={selectedPlan === "nabuco"}
              isRecommended={true}
              price={budgetSelection === "Precio cerrado" ? "A determinar" : finalCalculatedPrice}
              onSelect={setSelectedPlan}
            />
            <PlanOption
              planName="fenix"
              displayName="Plan Fénix"
              isSelected={selectedPlan === "fenix"}
              onSelect={setSelectedPlan}
            />
            <PlanOption
              planName="jetpack"
              displayName="Plan Jetpack"
              isSelected={selectedPlan === "jetpack"}
              onSelect={setSelectedPlan}
            />
          </>
        )
      default:
        return null
    }
  }

  return (
    <>
      <div
        className="w-full p-4 pt-16 flex flex-col items-start border-b border-[#3D5B6A]/10 rounded-t-[12px]"
        style={{ backgroundColor: "#F7F8FC", position: "relative" }}
      >
        <div className="flex items-center w-full">
          <button
            type="button"
            onClick={onBack}
            className="flex-shrink-0 flex items-center justify-center border-2 border-[#3D5B6A] text-[#3D5B6A] rounded-[6px] z-10 mr-3"
            style={{ width: "24px", height: "24px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <div className="flex flex-col items-start text-left">
            <h3 className="text-[hsl(206,1%,27%)] text-lg font-medium text-left">
              {responses["budget"] === "Precio cerrado" ? "Plan personalizado" : PRICE_ESTIMATOR_PLANS[result]?.title}
            </h3>
            <p className="text-[hsl(206,1%,27%)] text-xs mt-1 opacity-70 text-left">
              Precio estimado orientativo. El presupuesto definitivo se facilitará en conversación directa.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full p-4">
        <div className="flex flex-col gap-4 mb-6">{renderPlanOptions()}</div>

        <div className="text-center text-sm text-[hsl(206,1%,27%)] italic mb-4">
          Precio estimado orientativo. El presupuesto definitivo se facilitará en conversación directa.
        </div>

        <ResultFooter onReset={onReset} onProposeProject={onProposeProject} />
      </div>
    </>
  )
}
