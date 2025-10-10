import { type NextRequest, NextResponse } from "next/server"
import { createProposal, getProposalsByStatus } from "@/lib/proposals-db"
import { getAllFlaggedUsers, updateUserFlags } from "@/lib/user-flagging-service"
import { sendProposalNotificationEmail } from "@/lib/proposal-email-service"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Obtener información de la request
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"
    const referer = request.headers.get("referer") || "unknown"

    console.log("Creating proposal with conversation data:", data.conversationData)

    const result = await createProposal({
      service: data.service,
      projectType: data.projectType,
      productType: data.productType,
      screens: data.screens,
      price: data.price,
      planName: data.planName,
      payment: data.payment,
      budget: data.budget,
      conversationData: data.conversationData,
      ipAddress,
      userAgent,
      url: referer,
    })

    // Update user flags after creating proposal
    await updateUserFlags(ipAddress, userAgent)

    // Enviar email de notificación para propuesta pendiente
    try {
      const emailResult = await sendProposalNotificationEmail({
        proposalId: result.proposalId,
        planName: data.planName,
        price: data.price,
        service: data.service,
        projectType: data.projectType,
        productType: data.productType,
        screens: data.screens,
        payment: data.payment,
        budget: data.budget,
        ipAddress,
        userAgent,
        url: referer,
        createdAt: new Date().toISOString(),
        conversationData: data.conversationData,
      })

      if (emailResult.success) {
        console.log("✅ Email de notificación enviado:", emailResult.emailId)
      } else {
        console.warn("⚠️ Error enviando email de notificación:", emailResult.error)
      }
    } catch (emailError) {
      console.warn("⚠️ Error enviando email de notificación:", emailError)
      // No fallar la creación de la propuesta si falla el email
    }

    return NextResponse.json({
      success: true,
      proposalId: result.proposalId,
      message: "Propuesta enviada correctamente",
    })
  } catch (error) {
    console.error("Error saving proposal:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function GET() {
  try {
    console.log("Fetching proposals with flags...")
    const proposals = await getProposalsByStatus()
    const flaggedUsers = await getAllFlaggedUsers()

    console.log("Flagged users:", Object.keys(flaggedUsers).length)

    // Add flags to each proposal
    const addFlagsToProposals = (proposalList: any[]) => {
      return proposalList.map((proposal) => {
        const userKey = `${proposal.ip_address}|${proposal.user_agent}`
        const userFlags = flaggedUsers[userKey] || []

        console.log(`Proposal ${proposal.proposal_id}: ${userFlags.length} flags`)
        if (proposal.conversation_data) {
          console.log(
            `Proposal ${proposal.proposal_id} conversation_data:`,
            typeof proposal.conversation_data,
            proposal.conversation_data,
          )
        }

        return {
          ...proposal,
          user_flags: userFlags,
        }
      })
    }

    const proposalsWithFlags = {
      pending: addFlagsToProposals(proposals.pending),
      approved: addFlagsToProposals(proposals.approved),
      rejected: addFlagsToProposals(proposals.rejected),
    }

    return NextResponse.json(proposalsWithFlags)
  } catch (error) {
    console.error("Error fetching proposals:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
