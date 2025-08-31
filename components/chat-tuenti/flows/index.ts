import { initialMessageFlow } from "./initial-message"
import { contactFlow } from "./contact"
import { contactV2Flow } from "./contactv2"

export const flows = {
  "initial-message": initialMessageFlow,
  contact: contactFlow,
  contactv2: contactV2Flow,
}
