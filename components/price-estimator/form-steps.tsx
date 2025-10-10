"use client"
import type { FormResponse } from "@/lib/price-estimator/types"
import {
  APP_CATEGORIES,
  APP_SUBCATEGORIES,
  INCLUDED_COMPONENTS,
  PRICE_ESTIMATOR_STEPS,
} from "@/lib/price-estimator/constants"
import { getIncludedComponentsByPlan, getPlanByScreens } from "@/lib/price-estimator/price-utils"
import { CategoryOption, FormOption, SubcategoryOption } from "./form-elements"

interface StepProps {
  currentStep: number
  responses: FormResponse
  handleResponse: (question: string, value: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedSubcategories: string[]
  setSelectedSubcategories: (subcategories: string[]) => void
}

export function Step0({ responses, handleResponse }: StepProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {PRICE_ESTIMATOR_STEPS[0].options.map((option, index) => (
          <FormOption
            key={index}
            questionName={PRICE_ESTIMATOR_STEPS[0].question}
            option={option}
            isSelected={
              responses[PRICE_ESTIMATOR_STEPS[0].question] === (typeof option === "string" ? option : option.value)
            }
            index={index}
            onSelect={handleResponse}
          />
        ))}
      </div>
    </div>
  )
}

export function Step1({ responses, handleResponse }: StepProps) {
  const options =
    typeof PRICE_ESTIMATOR_STEPS[1].options === "function"
      ? PRICE_ESTIMATOR_STEPS[1].options(responses[PRICE_ESTIMATOR_STEPS[0].question])
      : PRICE_ESTIMATOR_STEPS[1].options

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {options.map((option, index) => (
          <FormOption
            key={index}
            questionName={PRICE_ESTIMATOR_STEPS[1].question}
            option={option}
            isSelected={
              responses[PRICE_ESTIMATOR_STEPS[1].question] === (typeof option === "string" ? option : option.value)
            }
            index={index}
            onSelect={handleResponse}
          />
        ))}
      </div>
    </div>
  )
}

export function Step2({ responses, handleResponse }: StepProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {PRICE_ESTIMATOR_STEPS[2].options.map((option, index) => {
          // Check if we're in the screens step and if the product selected is "Producto"
          const isScreensStep = true
          const isProductSelected = responses["productType"] === "Producto"
          const isMoreThan10Option = typeof option === "string" && option === "Más de 15"

          // Determine if the option should be disabled
          const isDisabled = isScreensStep && isProductSelected && !isMoreThan10Option

          return (
            <FormOption
              key={index}
              questionName={PRICE_ESTIMATOR_STEPS[2].question}
              option={option}
              isSelected={
                responses[PRICE_ESTIMATOR_STEPS[2].question] === (typeof option === "string" ? option : option.value)
              }
              index={index}
              isDisabled={isDisabled}
              onSelect={handleResponse}
            />
          )
        })}
      </div>
    </div>
  )
}

export function Step3({ selectedCategory, setSelectedCategory }: StepProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="max-h-[180px] overflow-y-auto pr-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {APP_CATEGORIES.map((category) => (
              <CategoryOption
                key={category}
                category={category}
                isSelected={selectedCategory === category}
                onSelect={setSelectedCategory}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Step4({ selectedCategory, selectedSubcategories, setSelectedSubcategories }: StepProps) {
  const handleToggleSubcategory = (subcategory: string) => {
    if (selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories(selectedSubcategories.filter((item) => item !== subcategory))
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory])
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="max-h-[180px] overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-4">
            {APP_SUBCATEGORIES[selectedCategory]?.map((subcategory, index) => (
              <SubcategoryOption
                key={subcategory}
                subcategory={subcategory}
                index={index}
                isSelected={selectedSubcategories.includes(subcategory)}
                onToggle={handleToggleSubcategory}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Step5({ responses, handleResponse }: StepProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {PRICE_ESTIMATOR_STEPS[5].options.map((option, index) => (
          <FormOption
            key={index}
            questionName={PRICE_ESTIMATOR_STEPS[5].question}
            option={option}
            isSelected={
              responses[PRICE_ESTIMATOR_STEPS[5].question] === (typeof option === "string" ? option : option.value)
            }
            index={index}
            onSelect={handleResponse}
          />
        ))}
      </div>
    </div>
  )
}

export function Step6({ responses, handleResponse }: StepProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {PRICE_ESTIMATOR_STEPS[6].options.map((option, index) => (
          <FormOption
            key={index}
            questionName={PRICE_ESTIMATOR_STEPS[6].question}
            option={option}
            isSelected={
              responses[PRICE_ESTIMATOR_STEPS[6].question] === (typeof option === "string" ? option : option.value)
            }
            index={index}
            onSelect={handleResponse}
          />
        ))}
      </div>
    </div>
  )
}

export function Step7({ responses, handleResponse }: StepProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {PRICE_ESTIMATOR_STEPS[7].options.map((option, index) => (
          <FormOption
            key={index}
            questionName={PRICE_ESTIMATOR_STEPS[7].question}
            option={option}
            isSelected={
              responses[PRICE_ESTIMATOR_STEPS[7].question] === (typeof option === "string" ? option : option.value)
            }
            index={index}
            onSelect={handleResponse}
          />
        ))}
      </div>
    </div>
  )
}

export function getIncludedComponentsLimit(responses: FormResponse): number {
  if (!responses["screens"]) return INCLUDED_COMPONENTS.HOVERBOARD

  const screenRange = responses["screens"]
  const planByScreens = getPlanByScreens(screenRange)
  return getIncludedComponentsByPlan(planByScreens)
}

export function renderStep(props: StepProps) {
  const { currentStep } = props

  switch (currentStep) {
    case 0:
      return <Step0 {...props} />
    case 1:
      return <Step1 {...props} />
    case 2:
      return <Step2 {...props} />
    case 3:
      return <Step3 {...props} />
    case 4:
      return <Step4 {...props} />
    case 5:
      return <Step5 {...props} />
    case 6:
      return <Step6 {...props} />
    case 7:
      return <Step7 {...props} />
    default:
      return null
  }
}
