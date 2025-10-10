import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

class SimplePDFCache {
  private cacheDir = path.join(process.cwd(), 'cache', 'pdfs')

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

  private generateCacheKey(url: string, lang: string): string {
    const content = `${url}-${lang}`
    return crypto.createHash('md5').update(content).digest('hex')
  }

  async getCachedPDF(url: string, lang: string): Promise<Buffer | null> {
    try {
      const cacheKey = this.generateCacheKey(url, lang)
      const filePath = path.join(this.cacheDir, `${cacheKey}.pdf`)
      
      const fileBuffer = await fs.readFile(filePath)
      console.log('📄 [PDFCache] Using cached PDF')
      return fileBuffer
    } catch (error) {
      console.log('📄 [PDFCache] No cached PDF found, will generate new one')
      return null
    }
  }

  async savePDFToCache(url: string, lang: string, pdfBuffer: Buffer): Promise<void> {
    try {
      const cacheKey = this.generateCacheKey(url, lang)
      const filePath = path.join(this.cacheDir, `${cacheKey}.pdf`)
      
      await fs.writeFile(filePath, pdfBuffer)
      console.log('📄 [PDFCache] PDF saved to cache')
    } catch (error) {
      console.error('Error saving PDF to cache:', error)
    }
  }
}

export const pdfCache = new SimplePDFCache()


