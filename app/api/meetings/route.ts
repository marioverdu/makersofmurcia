import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { proposalId, userId, selectedDay, selectedTime, notes } = await request.json()

    if (!proposalId || !userId || !selectedDay || !selectedTime) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: proposalId, userId, selectedDay, selectedTime" },
        { status: 400 },
      )
    }

    // Comprobar si el proposalId existe en la tabla proposals antes de insertar
    const proposalCheck = await sql`SELECT proposal_id FROM proposals WHERE proposal_id = ${proposalId}`;
    if (!proposalCheck || proposalCheck.length === 0) {
      console.error(`El proposalId ${proposalId} NO existe en proposals. Abortando creación de meeting.`);
      return NextResponse.json({ success: false, error: `El proposalId ${proposalId} no existe en la tabla proposals.` }, { status: 400 });
    }

    // Map day names to a future date (e.g., next occurrence of that day)
    const dayMap: { [key: string]: number } = {
      lunes: 1,
      martes: 2,
      miércoles: 3,
      jueves: 4,
      viernes: 5,
      sábado: 6,
      domingo: 0,
    }

    const targetDay = dayMap[selectedDay.toLowerCase()]
    if (targetDay === undefined) {
      return NextResponse.json({ success: false, error: "Invalid day name provided." }, { status: 400 })
    }

    const now = new Date()
    const today = now.getDay() // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    let daysUntilTarget = targetDay - today
    if (daysUntilTarget < 0) {
      daysUntilTarget += 7 // Go to next week
    }
    if (
      daysUntilTarget === 0 &&
      now.getHours() * 60 + now.getMinutes() >=
        Number.parseInt(selectedTime.split(":")[0]) * 60 + Number.parseInt(selectedTime.split(":")[1])
    ) {
      // If target day is today but time has passed, schedule for next week
      daysUntilTarget += 7
    }

    const meetingDate = new Date(now)
    meetingDate.setDate(now.getDate() + daysUntilTarget)
    meetingDate.setHours(Number.parseInt(selectedTime.split(":")[0]), Number.parseInt(selectedTime.split(":")[1]), 0, 0)

    console.log(`Attempting to save meeting:
      proposalId: ${proposalId},
      userId: ${userId},
      meeting_date: ${meetingDate.toISOString()},
      meeting_time: ${selectedTime},
      notes: ${notes || "N/A"}
    `)

    const result = await sql`
      INSERT INTO meetings (proposal_id, user_id, meeting_date, meeting_time, notes)
      VALUES (${proposalId}, ${userId}, ${meetingDate.toISOString()}, ${selectedTime}, ${notes || null})
      RETURNING *;
    `

    console.log("Meeting saved successfully:", result[0])
    return NextResponse.json({ success: true, meeting: result[0] }, { status: 201 })
  } catch (error: any) {
    console.error("Error saving meeting:", error)
    return NextResponse.json({ success: false, error: error.message || "Failed to save meeting." }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const meetingId = searchParams.get("meetingId")

    if (meetingId) {
      const result = await sql`SELECT * FROM meetings WHERE meeting_id = ${meetingId};`
      if (result.length > 0) {
        return NextResponse.json({ success: true, meeting: result[0] })
      } else {
        return NextResponse.json({ success: false, error: "Meeting not found." }, { status: 404 })
      }
    } else {
      const result = await sql`
        SELECT 
          m.*, 
          p.service, 
          p.project_type, 
          p.product_type, 
          p.plan_name, 
          p.price, 
          p.budget, 
          p.conversation_data
        FROM meetings m
        LEFT JOIN proposals p ON m.proposal_id = p.proposal_id
        ORDER BY m.meeting_date DESC, m.meeting_time DESC;
      `
      return NextResponse.json({ success: true, meetings: result })
    }
  } catch (error: any) {
    console.error("Error fetching meetings:", error)
    return NextResponse.json({ success: false, error: error.message || "Failed to fetch meetings." }, { status: 500 })
  }
}
