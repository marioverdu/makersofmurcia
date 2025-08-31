import { neon } from "@neondatabase/serverless"

// Verificar que DATABASE_URL esté configurado
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL no está configurado en las variables de entorno")
  throw new Error("DATABASE_URL no está configurado. Verifica tu archivo .env.local")
}

const sql = neon(process.env.DATABASE_URL)

export interface Proposal {
  id: number
  proposal_id: string
  service: string
  project_type: string
  product_type: string
  screens: number
  price: number
  plan_name: string
  payment: string
  budget: string
  status: "pending" | "approved" | "rejected"
  created_at: string
  updated_at: string
  ip_address: string
  user_agent: string
  url: string
  conversation_data: any // Changed to any to allow direct JSON object or string
}

export async function createProposal(data: {
  service: string
  projectType: string
  productType: string
  screens: number
  price: number
  planName: string
  payment: string
  budget: string
  conversationData: any
  ipAddress?: string
  userAgent?: string
  url?: string
}): Promise<{ success: boolean; proposalId: string }> {
  try {
    const proposalId = `proposal_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    await sql`
      INSERT INTO proposals (
        proposal_id, service, project_type, product_type, screens, price, 
        plan_name, payment, budget, ip_address, user_agent, url, conversation_data
      ) VALUES (
        ${proposalId}, ${data.service}, ${data.projectType}, ${data.productType}, 
        ${data.screens}, ${data.price}, ${data.planName}, ${data.payment}, 
        ${data.budget}, ${data.ipAddress || "unknown"}, ${data.userAgent || "unknown"}, 
        ${data.url || "unknown"}, ${JSON.stringify(data.conversationData)}
      )
    `

    return { success: true, proposalId }
  } catch (error) {
    console.error("Error creating proposal:", error)
    throw new Error("Failed to create proposal")
  }
}

export async function getProposalsByStatus(): Promise<{
  pending: Proposal[]
  approved: Proposal[]
  rejected: Proposal[]
}> {
  try {
    const [pending, approved, rejected] = await Promise.all([
      sql`SELECT * FROM proposals WHERE status = 'pending' ORDER BY created_at DESC`,
      sql`SELECT * FROM proposals WHERE status = 'approved' ORDER BY created_at DESC`,
      sql`SELECT * FROM proposals WHERE status = 'rejected' ORDER BY created_at DESC`,
    ])

    return {
      pending: pending as Proposal[],
      approved: approved as Proposal[],
      rejected: rejected as Proposal[],
    }
  } catch (error) {
    console.error("Error fetching proposals:", error)
    throw new Error("Failed to fetch proposals")
  }
}

export async function updateProposalStatus(
  proposalId: string,
  status: "approved" | "rejected",
): Promise<{ success: boolean; proposal: Proposal | null }> {
  try {
    const result = await sql`
      UPDATE proposals 
      SET status = ${status}, updated_at = CURRENT_TIMESTAMP 
      WHERE proposal_id = ${proposalId}
      RETURNING *
    `

    if (result.length === 0) {
      return { success: false, proposal: null }
    }

    return { success: true, proposal: result[0] as Proposal }
  } catch (error) {
    console.error("Error updating proposal status:", error)
    throw new Error("Failed to update proposal status")
  }
}

export async function deleteProposal(proposalId: string): Promise<{ success: boolean }> {
  try {
    const result = await sql`
      DELETE FROM proposals WHERE proposal_id = ${proposalId}
    `

    return { success: true }
  } catch (error) {
    console.error("Error deleting proposal:", error)
    throw new Error("Failed to delete proposal")
  }
}

export async function getProposalById(proposalId: string): Promise<Proposal | null> {
  try {
    const result = await sql`
      SELECT * FROM proposals WHERE proposal_id = ${proposalId}
    `

    return result.length > 0 ? (result[0] as Proposal) : null
  } catch (error) {
    console.error("Error fetching proposal:", error)
    return null
  }
}
