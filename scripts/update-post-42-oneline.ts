#!/usr/bin/env tsx
import { config } from 'dotenv'
import { resolve } from 'path'

const envPath = resolve(process.cwd(), '.env.local')
config({ path: envPath })

const { sql } = await import('../lib/db.js')

// HTML en UNA SOLA LÍNEA para evitar conversión a <br>
const newHTML = `<div class="youtube-embed-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;"><iframe src="https://www.youtube.com/embed/08blkt7SvEE?list=PLinjGYAZZR4DFmfio3zoBFzqikVJAWss0&index=2" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="YouTube video player"></iframe></div>`

console.log('🔄 Actualizando post 42 con iframe en una sola línea...\n')

await sql`
  UPDATE posts 
  SET 
    content_es = ${newHTML},
    content = ${newHTML},
    updated_at = CURRENT_TIMESTAMP
  WHERE id = 42
`

console.log('✅ Post 42 actualizado exitosamente')
console.log('\n📝 Nuevo HTML (una sola línea):')
console.log('='.repeat(80))
console.log(newHTML)
console.log('='.repeat(80))
console.log('\n✨ Sin saltos de línea = Sin <br> tags = Iframe funcional')

process.exit(0)
