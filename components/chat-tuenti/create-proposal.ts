// Mock proposal creation - no database connection

export interface ProposalData {
  screens: number
  service?: string
  budget?: string
  payment?: string
}

export async function createProposal(screens: number): Promise<{ success: boolean; error?: string }> {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock proposal creation
    console.log("Mock: Creating proposal with", screens, "screens")

    // Simulate success/failure randomly for demo
    const success = Math.random() > 0.1 // 90% success rate

    if (success) {
      return { success: true }
    } else {
      return { success: false, error: "Mock error: Proposal creation failed" }
    }
  } catch (error) {
    console.error("Error creating proposal:", error)
    return { success: false, error: "Mock error: Network failure" }
  }
}

export async function getProposalStatus(proposalId: string): Promise<{
  status: "pending" | "approved" | "rejected"
  message?: string
}> {
  // Mock status check
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Simulate different statuses
  const statuses = ["pending", "approved", "rejected"] as const
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

  return {
    status: randomStatus,
    message: `Mock: Proposal ${proposalId} is ${randomStatus}`,
  }
}
