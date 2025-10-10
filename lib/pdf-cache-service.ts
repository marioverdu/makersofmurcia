import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

interface CacheEntry {
  hash: string
  filePath: string
  createdAt: string
  url: string
  lang: string
}

class PDFCacheService {
  private cacheDir = path.join(process.cwd(), 'cache', 'pdfs')
  private cacheIndexPath = path.join(this.cacheDir, 'index.json')

  constructor() {
    this.ensureCacheDir()
  }

  private async ensureCacheDir() {
    try {
      await fs.mkdir(this.cacheDir, { recursive: true })
    } catch (error) {
      console.error('Error creating cache directory:', error)
    }
  }

  private async loadCacheIndex(): Promise<CacheEntry[]> {
    try {
      const data = await fs.readFile(this.cacheIndexPath, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      return []
    }
  }

  private async saveCacheIndex(entries: CacheEntry[]) {
    try {
      await fs.writeFile(this.cacheIndexPath, JSON.stringify(entries, null, 2))
    } catch (error) {
      console.error('Error saving cache index:', error)
    }
  }

  private generateContentHash(url: string, lang: string): string {
    // Crear hash basado en URL e idioma
    const content = `${url}-${lang}`
    return crypto.createHash('md5').update(content).digest('hex')
  }

  async getCachedPDF(url: string, lang: string): Promise<Buffer | null> {
    try {
      const entries = await this.loadCacheIndex()
      const currentHash = this.generateContentHash(url, lang)
      
      // Buscar entrada existente
      const existingEntry = entries.find(entry => 
        entry.url === url && entry.lang === lang
      )
      
      if (existingEntry && existingEntry.hash === currentHash) {
        // Verificar que el archivo existe
        try {
          const fileBuffer = await fs.readFile(existingEntry.filePath)
          console.log('📄 [PDFCache] Using cached PDF (no changes detected)')
          return fileBuffer
        } catch (error) {
          console.log('📄 [PDFCache] Cached file not found, will regenerate')
          return null
        }
      }
      
      console.log('📄 [PDFCache] Changes detected or no cache found, will regenerate')
      return null
    } catch (error) {
      console.error('Error checking cache:', error)
      return null
    }
  }

  async savePDFToCache(url: string, lang: string, pdfBuffer: Buffer): Promise<void> {
    try {
      const entries = await this.loadCacheIndex()
      const currentHash = this.generateContentHash(url, lang)
      
      // Generar nombre de archivo único
      const fileName = `cv-${currentHash}.pdf`
      const filePath = path.join(this.cacheDir, fileName)
      
      // Guardar archivo PDF
      await fs.writeFile(filePath, pdfBuffer)
      
      // Remover entrada anterior si existe
      const filteredEntries = entries.filter(entry => 
        !(entry.url === url && entry.lang === lang)
      )
      
      // Agregar nueva entrada
      const newEntry: CacheEntry = {
        hash: currentHash,
        filePath,
        createdAt: new Date().toISOString(),
        url,
        lang
      }
      
      filteredEntries.push(newEntry)
      await this.saveCacheIndex(filteredEntries)
      
      console.log('📄 [PDFCache] PDF saved to cache:', fileName)
    } catch (error) {
      console.error('Error saving PDF to cache:', error)
    }
  }

  async clearOldCache(maxAge: number = 7 * 24 * 60 * 60 * 1000): Promise<void> {
    try {
      const entries = await this.loadCacheIndex()
      const now = Date.now()
      
      const validEntries = []
      
      for (const entry of entries) {
        const entryAge = now - new Date(entry.createdAt).getTime()
        
        if (entryAge > maxAge) {
          // Eliminar archivo antiguo
          try {
            await fs.unlink(entry.filePath)
            console.log('📄 [PDFCache] Removed old cached file:', entry.filePath)
          } catch (error) {
            console.log('📄 [PDFCache] Could not remove old file:', entry.filePath)
          }
        } else {
          validEntries.push(entry)
        }
      }
      
      await this.saveCacheIndex(validEntries)
      console.log(`📄 [PDFCache] Cache cleanup completed. ${entries.length - validEntries.length} old files removed.`)
    } catch (error) {
      console.error('Error clearing old cache:', error)
    }
  }
}

export const pdfCacheService = new PDFCacheService()