import { NextResponse } from 'next/server'
import { readdir } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  try {
    const teamDir = join(process.cwd(), 'public', 'asset', 'team')
    
    // Leer todos los archivos de la carpeta team
    const files = await readdir(teamDir)
    
    // Filtrar solo archivos de imagen
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    )
    
    // Ordenar alfabéticamente
    imageFiles.sort()
    
    // Generar rotaciones aleatorias para cada imagen
    const rotations = ['-3deg', '-2deg', '-1deg', '1deg', '2deg', '3deg']
    
    const images = imageFiles.map((file, index) => ({
      id: index + 1,
      src: `/asset/team/${file}`,
      rotation: rotations[index % rotations.length]
    }))
    
    return NextResponse.json({ 
      success: true, 
      images,
      count: images.length 
    })
    
  } catch (error) {
    console.error('Error al leer las imágenes del equipo:', error)
    
    // Fallback a imágenes estáticas si hay error
    const fallbackImages = [
      { id: 1, src: "/asset/team/photo_223@18-09-2018_14-10-50.jpg", rotation: "-2deg" },
      { id: 2, src: "/asset/team/photo_224@21-09-2018_10-24-07.jpg", rotation: "1deg" },
      { id: 3, src: "/asset/team/photo_225@21-09-2018_10-24-07.jpg", rotation: "-1deg" },
      { id: 4, src: "/asset/team/photo_226@21-09-2018_10-24-07.jpg", rotation: "2deg" },
      { id: 5, src: "/asset/team/photo_227@21-09-2018_10-25-49.jpg", rotation: "-3deg" },
      { id: 6, src: "/asset/team/photo_228@21-09-2018_10-39-28.jpg", rotation: "1deg" },
      { id: 7, src: "/asset/team/photo_229@21-09-2018_23-46-46.jpg", rotation: "-2deg" },
      { id: 8, src: "/asset/team/photo_230@22-09-2018_10-26-09.jpg", rotation: "2deg" },
    ]
    
    return NextResponse.json({ 
      success: false, 
      message: 'Error al cargar imágenes, usando fallback',
      images: fallbackImages,
      count: fallbackImages.length 
    })
  }
}
