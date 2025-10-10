import { type NextRequest, NextResponse } from "next/server"
import { updateProposalStatus, deleteProposal } from "@/lib/proposals-db"
import { updateUserFlagsOnRejection } from "@/lib/user-flagging-service"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json()
    const proposalId = params.id

    console.log(`Updating proposal ${proposalId} to status: ${status}`)

    const result = await updateProposalStatus(proposalId, status)

    // If proposal is being rejected, update user flags
    if (status === "rejected" && result.proposal) {
      await updateUserFlagsOnRejection(result.proposal.ip_address, result.proposal.user_agent)
    }

    return NextResponse.json({
      success: true,
      message: `Propuesta ${status === "approved" ? "aprobada" : "rechazada"} correctamente`,
    })
  } catch (error) {
    console.error("Error updating proposal:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const proposalId = params.id

    console.log(`Deleting proposal ${proposalId}`)

    await deleteProposal(proposalId)

    return NextResponse.json({
      success: true,
      message: "Propuesta eliminada correctamente",
    })
  } catch (error) {
    console.error("Error deleting proposal:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
