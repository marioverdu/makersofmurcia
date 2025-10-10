import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const pdfPath = path.join(process.cwd(), 'public', 'cv-mario-verdu.pdf')
    
    // Verificar que el archivo existe
    if (!fs.existsSync(pdfPath)) {
      return NextResponse.json(
        { error: 'PDF file not found' },
        { status: 404 }
      )
    }
    
    // Leer el archivo PDF
    const pdfBuffer = fs.readFileSync(pdfPath)
    
    // Devolver el PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="cv-mario-verdu.pdf"',
        'Cache-Control': 'public, max-age=3600'
      }
    })
    
  } catch (error) {
    console.error('Error serving PDF:', error)
    return NextResponse.json(
      { error: 'Failed to serve PDF' },
      { status: 500 }
    )
  }
}


