import { getUserIdentifier, getPersistentUserId } from "@/lib/user-identification"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const serverHash = await getUserIdentifier()
    const userId = await getPersistentUserId(serverHash)

    const [booking] = await sql`
      SELECT status, created_at, updated_at, id, screens, price
      FROM bookings
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT 1
    `

    const status = booking?.status || "initial"

    console.log(`API Status check for user ${userId}:`, {
      status,
      bookingId: booking?.id,
      updatedAt: booking?.updated_at,
    })

    return Response.json({
      status,
      timestamp: new Date().toISOString(),
      booking: booking || null,
    })
  } catch (error) {
    console.error("Error checking booking status:", error)
    return Response.json({
      status: "initial",
      error: error.message,
      timestamp: new Date().toISOString(),
    })
  }
}
