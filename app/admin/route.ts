import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Si hay sesión, permitir acceso a la página
  return NextResponse.next()
}
