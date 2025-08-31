"use client"
import type { Option } from "@/lib/price-estimator/types"

interface OptionProps {
  questionName: string
  option: Option
  isSelected: boolean
  index: number
  isDisabled?: boolean
  onSelect: (questionName: string, value: string) => void
}

export function FormOption({ questionName, option, isSelected, index, isDisabled = false, onSelect }: OptionProps) {
  const optionValue = typeof option === "string" ? option : option.value
  const optionTitle = typeof option === "string" ? option : option.title

  return (
    <label
      key={index}
      className={`h-[48px] md:h-[56px] rounded-[6px] border-2 transition-all cursor-pointer flex items-center justify-center relative ${
        isSelected
          ? "border-[#3D5B6A] bg-[#3D5B6A]/10"
          : isDisabled
            ? "border-[#3D5B6A]/10 bg-gray-100 opacity-50 cursor-not-allowed"
            : "border-[#3D5B6A]/20 hover:border-[#3D5B6A]/40"
      }`}
    >
      <input
        type="radio"
        name={questionName}
        value={optionValue}
        checked={isSelected}
        onChange={() => !isDisabled && onSelect(questionName, optionValue)}
        className="sr-only"
      />
      {/* Radio button indicator positioned at top left */}
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
        <div
          className={`w-3.5 h-3.5 rounded-full border-2 ${
            isSelected ? "border-[#3D5B6A]" : isDisabled ? "border-gray-300" : "border-[#3D5B6A]/40"
          } flex items-center justify-center`}
        >
          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#3D5B6A]"></div>}
        </div>
      </div>
      <div className="flex flex-col items-center px-2">
        <span
          className={`text-xs font-medium text-center ${
            isSelected ? "text-[#3D5B6A]" : isDisabled ? "text-gray-400" : "text-[hsl(206,1%,27%)]"
          } break-words line-clamp-2`}
        >
          {optionTitle}
        </span>
      </div>
    </label>
  )
}

interface CategoryOptionProps {
  category: string
  isSelected: boolean
  onSelect: (category: string) => void
}

export function CategoryOption({ category, isSelected, onSelect }: CategoryOptionProps) {
  return (
    <label
      className={`h-[48px] md:h-[56px] rounded-[6px] border-2 transition-all cursor-pointer flex items-center justify-center relative ${
        isSelected ? "border-[#3D5B6A] bg-[#3D5B6A]/10" : "border-[#3D5B6A]/20 hover:border-[#3D5B6A]/40"
      }`}
    >
      <input
        type="radio"
        name="category"
        value={category}
        checked={isSelected}
        onChange={() => onSelect(category)}
        className="sr-only"
      />
      {/* Radio button indicator positioned at top left */}
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
        <div
          className={`w-3.5 h-3.5 rounded-full border-2 ${
            isSelected ? "border-[#3D5B6A] flex items-center justify-center" : "border-[#3D5B6A]/40"
          }`}
        >
          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#3D5B6A]"></div>}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 px-2">
        <span className="text-xs font-medium text-center text-[hsl(206,1%,27%)] break-words line-clamp-2">
          {category}
        </span>
      </div>
    </label>
  )
}

interface SubcategoryOptionProps {
  subcategory: string
  index: number
  isSelected: boolean
  onToggle: (subcategory: string) => void
}

export function SubcategoryOption({ subcategory, index, isSelected, onToggle }: SubcategoryOptionProps) {
  return (
    <label
      className={`h-[48px] md:h-[56px] rounded-[6px] border-2 transition-all cursor-pointer overflow-hidden relative ${
        isSelected ? "border-[#3D5B6A] bg-[#3D5B6A]/10" : "border-[#3D5B6A]/20 hover:border-[#3D5B6A]/40"
      }`}
      onClick={(e) => {
        e.preventDefault()
        onToggle(subcategory)
      }}
    >
      <input
        type="checkbox"
        name="subcategory"
        value={subcategory}
        checked={isSelected}
        onChange={(e) => {
          if (e.target.checked) {
            onToggle(subcategory)
          } else {
            onToggle(subcategory)
          }
        }}
        className="sr-only"
      />
      {/* Checkbox indicator positioned at top left */}
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10">
        <div
          className={`w-3.5 h-3.5 rounded-sm border-2 ${
            isSelected ? "border-[#3D5B6A] bg-[#3D5B6A] flex items-center justify-center" : "border-[#3D5B6A]/40"
          }`}
        >
          {isSelected && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-2 h-2"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src={`https://assets.marioverdu.com/price-estimator/subcategory/${index + 1}.min.png`}
          alt={`${subcategory} screenshot`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <span className="text-xs font-medium text-white text-center break-words line-clamp-2 px-2 bg-black/90 rounded">
          {subcategory}
        </span>
      </div>
    </label>
  )
}

interface PlanOptionProps {
  planName: string
  displayName: string
  isSelected: boolean
  isRecommended?: boolean
  price?: string
  onSelect: (plan: string) => void
}

export function PlanOption({ planName, displayName, isSelected, isRecommended, price, onSelect }: PlanOptionProps) {
  return (
    <div
      className={`h-[48px] md:h-[56px] rounded-[6px] border-2 transition-all cursor-pointer flex items-center relative ${
        isSelected ? "border-[#3D5B6A] bg-[#3D5B6A]/10" : "border-[#3D5B6A]/20 hover:border-[#3D5B6A]/40"
      }`}
      onClick={() => onSelect(planName)}
    >
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
        <div
          className={`w-3.5 h-3.5 rounded-full border-2 ${
            isSelected ? "border-[#3D5B6A]" : "border-[#3D5B6A]/40"
          } flex items-center justify-center`}
        >
          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#3D5B6A]"></div>}
        </div>
      </div>
      <div className="flex items-center justify-between w-full px-8">
        <div className="flex items-center">
          <span className="text-sm font-medium">{displayName}</span>
          {isRecommended && (
            <span className="bg-[#3D5B6A] text-white text-xs px-2 py-1 rounded-full ml-2">Recomendado</span>
          )}
          {isSelected && !isRecommended && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full ml-2">Seleccionado</span>
          )}
        </div>
        {price && <span className="text-sm font-medium">{price}</span>}
      </div>
    </div>
  )
}

interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500 ease-in-out"
        style={{
          width: `${progress}%`,
          backgroundColor: "#3D5B6A",
        }}
      ></div>
    </div>
  )
}

interface FormHeaderProps {
  title: string
  subtitle?: string
  onBack?: () => void
  showBackButton?: boolean
}

export function FormHeader({ title, subtitle, onBack, showBackButton = false }: FormHeaderProps) {
  return (
    <div className="flex items-center w-full mb-3">
      {showBackButton && onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex-shrink-0 flex items-center justify-center border-2 border-[#3D5B6A] text-[#3D5B6A] rounded-[6px] z-10 mr-3"
          style={{
            width: "24px",
            height: "24px",
          }}
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
      )}
      <div className="flex flex-col items-start text-left">
        <h3 className="text-[hsl(206,1%,27%)] text-lg font-medium text-left">{title}</h3>
        {subtitle && <p className="text-[hsl(206,1%,27%)] text-xs mt-1 opacity-70 text-left">{subtitle}</p>}
      </div>
    </div>
  )
}

interface FormFooterProps {
  price: string
  onNext: () => void
  onPrevious?: () => void
  showPreviousButton?: boolean
  isLastStep?: boolean
  validationError?: string | null
  selectedSubcategories?: string[]
  includedComponentsLimit?: number
}

export function FormFooter({
  price,
  onNext,
  onPrevious,
  showPreviousButton = false,
  isLastStep = false,
  validationError = null,
  selectedSubcategories = [],
  includedComponentsLimit = 0,
}: FormFooterProps) {
  return (
    <div className="w-full flex flex-col">
      {/* Horizontal separator */}
      <div className="h-[1px] bg-[hsl(206,1%,27%)]/10 w-full"></div>

      {/* Footer content in a single box */}
      <div
        className="w-full p-4 flex items-center justify-between rounded-bl-[12px] rounded-br-[12px]"
        style={{
          backgroundColor: "#F7F8FC",
          position: "relative",
        }}
      >
        {/* Error message on the left */}
        <div className="flex-1">
          {validationError && <div className="text-red-500 text-sm">{validationError}</div>}
          {/* Show the number of selected components */}
          {selectedSubcategories.length > 0 && includedComponentsLimit > 0 && (
            <div className="text-[hsl(206,1%,27%)] text-sm">
              Componentes seleccionados: {selectedSubcategories.length}
              {selectedSubcategories.length > includedComponentsLimit && (
                <span className="text-amber-600 ml-1">
                  (Los primeros {includedComponentsLimit} están incluidos,{" "}
                  {selectedSubcategories.length - includedComponentsLimit} adicionales = +
                  {selectedSubcategories.length - includedComponentsLimit}{" "}
                  {selectedSubcategories.length - includedComponentsLimit === 1 ? "día" : "días"})
                </span>
              )}
            </div>
          )}
        </div>

        {/* Container for next button and price estimate aligned to the right */}
        <div className="flex items-center gap-3">
          <span className="text-[hsl(206,1%,27%)] text-lg font-medium">{price}</span>

          {showPreviousButton && onPrevious && (
            <button
              type="button"
              onClick={onPrevious}
              className="flex-shrink-0 flex items-center justify-center border-2 border-[#3D5B6A] text-[#3D5B6A] rounded-[6px] z-10"
              style={{
                width: "24px",
                height: "24px",
              }}
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
          )}

          {isLastStep ? (
            <button
              type="button"
              className="flex items-center justify-center text-white rounded-[6px] transition-all duration-500"
              style={{ backgroundColor: "rgb(61, 91, 106)", width: "24px", height: "24px", padding: "0px" }}
              onClick={onNext}
            >
              Finalizar
            </button>
          ) : (
            <button
              type="button"
              className="flex items-center justify-center text-white rounded-[6px] transition-all duration-500"
              style={{ backgroundColor: "rgb(61, 91, 106)", width: "24px", height: "24px", padding: "0px" }}
              onClick={onNext}
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
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

interface ResultFooterProps {
  onReset: () => void
  onProposeProject: () => void
}

export function ResultFooter({ onReset, onProposeProject }: ResultFooterProps) {
  return (
    <div className="w-full flex flex-col mt-6">
      {/* Horizontal separator */}
      <div className="h-[1px] bg-[hsl(206,1%,27%)]/10 w-full"></div>

      {/* Footer content in a single box */}
      <div
        className="w-full p-4 flex justify-end items-center space-x-4"
        style={{
          backgroundColor: "#F7F8FC",
          position: "relative",
        }}
      >
        <button
          type="button"
          className="px-4 py-2 border-2 border-[#3D5B6A] text-[#3D5B6A] text-[15.2px] font-medium rounded-[6px]"
          onClick={onReset}
        >
          Comenzar de nuevo
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-[#3D5B6A] text-white text-[15.2px] font-medium rounded-[6px]"
          onClick={onProposeProject}
        >
          Proponer proyecto
        </button>
      </div>
    </div>
  )
}
