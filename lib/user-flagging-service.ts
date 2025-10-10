import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface UserFlag {
  id: number
  ip_address: string
  user_agent: string
  flag_type: "pesado" | "rechazado_reincidente"
  flag_count: number
  first_occurrence: string
  last_occurrence: string
  expires_at: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Ensure the user_flags table exists
async function ensureUserFlagsTableExists() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS user_flags (
        id SERIAL PRIMARY KEY,
        ip_address VARCHAR(45) NOT NULL,
        user_agent TEXT NOT NULL,
        flag_type VARCHAR(50) NOT NULL CHECK (flag_type IN ('pesado', 'rechazado_reincidente')),
        flag_count INTEGER DEFAULT 1,
        first_occurrence TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_occurrence TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP NOT NULL,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    await sql`
      CREATE INDEX IF NOT EXISTS idx_user_flags_ip_agent ON user_flags(ip_address, user_agent)
    `

    await sql`
      CREATE INDEX IF NOT EXISTS idx_user_flags_expires ON user_flags(expires_at)
    `

    await sql`
      CREATE INDEX IF NOT EXISTS idx_user_flags_active ON user_flags(is_active)
    `
  } catch (error) {
    console.error("Error creating user_flags table:", error)
  }
}

export async function getAllFlaggedUsers(): Promise<Record<string, UserFlag[]>> {
  try {
    await ensureUserFlagsTableExists()
    await cleanExpiredFlags()

    const flags = await sql`
      SELECT * FROM user_flags 
      WHERE is_active = true AND expires_at > CURRENT_TIMESTAMP
      ORDER BY created_at DESC
    `

    const flaggedUsers: Record<string, UserFlag[]> = {}

    for (const flag of flags as UserFlag[]) {
      const userKey = `${flag.ip_address}|${flag.user_agent}`
      if (!flaggedUsers[userKey]) {
        flaggedUsers[userKey] = []
      }
      flaggedUsers[userKey].push(flag)
    }

    return flaggedUsers
  } catch (error) {
    console.error("Error getting all flagged users:", error)
    return {}
  }
}

export async function updateUserFlags(ipAddress: string, userAgent: string) {
  try {
    await ensureUserFlagsTableExists()

    // Check for "pesado" flag (more than 3 proposals in 2 weeks)
    const twoWeeksAgo = new Date()
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)

    const proposalCount = await sql`
      SELECT COUNT(*) as count FROM proposals 
      WHERE ip_address = ${ipAddress} 
      AND user_agent = ${userAgent}
      AND created_at >= ${twoWeeksAgo.toISOString()}
    `

    if (Number(proposalCount[0]?.count) > 3) {
      await createOrUpdateFlag(ipAddress, userAgent, "pesado")
    }
  } catch (error) {
    console.error("Error updating user flags:", error)
  }
}

export async function updateUserFlagsOnRejection(ipAddress: string, userAgent: string) {
  try {
    await ensureUserFlagsTableExists()

    // Check for "rechazado_reincidente" flag (more than 2 rejections in 2 weeks)
    const twoWeeksAgo = new Date()
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)

    const rejectionCount = await sql`
      SELECT COUNT(*) as count FROM proposals 
      WHERE ip_address = ${ipAddress} 
      AND user_agent = ${userAgent}
      AND status = 'rejected'
      AND updated_at >= ${twoWeeksAgo.toISOString()}
    `

    if (Number(rejectionCount[0]?.count) > 2) {
      await createOrUpdateFlag(ipAddress, userAgent, "rechazado_reincidente")
    }
  } catch (error) {
    console.error("Error updating user flags on rejection:", error)
  }
}

async function createOrUpdateFlag(ipAddress: string, userAgent: string, flagType: "pesado" | "rechazado_reincidente") {
  try {
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 14) // 2 weeks from now

    // Check if flag already exists
    const existingFlag = await sql`
      SELECT * FROM user_flags 
      WHERE ip_address = ${ipAddress} 
      AND user_agent = ${userAgent}
      AND flag_type = ${flagType}
      AND is_active = true
    `

    if (existingFlag.length > 0) {
      // Update existing flag
      await sql`
        UPDATE user_flags 
        SET flag_count = flag_count + 1,
            last_occurrence = CURRENT_TIMESTAMP,
            expires_at = ${expiresAt.toISOString()},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${existingFlag[0].id}
      `
    } else {
      // Create new flag
      await sql`
        INSERT INTO user_flags (
          ip_address, user_agent, flag_type, expires_at
        ) VALUES (
          ${ipAddress}, ${userAgent}, ${flagType}, ${expiresAt.toISOString()}
        )
      `
    }
  } catch (error) {
    console.error("Error creating or updating flag:", error)
  }
}

export async function cleanExpiredFlags() {
  try {
    await ensureUserFlagsTableExists()

    await sql`
      UPDATE user_flags 
      SET is_active = false, updated_at = CURRENT_TIMESTAMP
      WHERE expires_at <= CURRENT_TIMESTAMP AND is_active = true
    `

    // Delete old inactive flags (older than 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    await sql`
      DELETE FROM user_flags 
      WHERE is_active = false AND updated_at <= ${thirtyDaysAgo.toISOString()}
    `
  } catch (error) {
    console.error("Error cleaning expired flags:", error)
  }
}
