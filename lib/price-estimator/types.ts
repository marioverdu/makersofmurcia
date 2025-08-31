export type Option = string | { value: string; title: string; description?: string }

export interface Step {
  title: string
  question: string
  options: Option[] | ((prevAnswer: string) => Option[])
  placeholder: string
  subtitle?: string
  inputType?: "text" | "select" | "number" | "textarea"
}

export interface FormResponse {
  [key: string]: string
}

export interface PriceEstimatorProps {
  className?: string
  avatarUrl?: string
  onComplete?: (result: string, responses: FormResponse) => void
  initialStep?: number
  initialResponses?: FormResponse
  storageKey?: string
  onClose?: () => void
}

export type PlanType = "hoverboard" | "jetpack" | "fenix" | "nabuco" | "none"

export interface PlanInfo {
  title: string
  description: string
}

export interface PriceEstimatorPlans {
  [key: string]: PlanInfo
}
