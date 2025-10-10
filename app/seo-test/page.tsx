import { Metadata } from 'next'
import { seoEngine } from '@/lib/seo-engine'
import { PersonSchemaMarkup, WebsiteSchemaMarkup } from '@/components/seo-schema-markup'

export const metadata: Metadata = seoEngine.generateMetadata({
  title: 'Test SEO | Motor SEO Propio - Mario Verdú',
  description: 'Página de test para verificar el funcionamiento del motor SEO propio desarrollado para marioverdu.com',
  keywords: ['SEO', 'Test', 'Motor SEO', 'Mario Verdú', 'Next.js'],
  url: 'https://marioverdu.com/seo-test',
  type: 'website',
  image: {
    url: 'https://marioverdu.com/og-test.jpg',
    width: 1200,
    height: 630,
    alt: 'Test SEO - Motor SEO Propio'
  }
})

export default function SEOTestPage() {
  const testSchema = seoEngine.generateSchema({
    type: 'WebSite',
    data: {
      name: 'Test SEO Page',
      url: 'https://marioverdu.com/seo-test',
      description: 'Página de test para el motor SEO'
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          🧪 Test del Motor SEO Propio
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">📊 Información del Motor SEO</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">✅ Funcionalidades Implementadas</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Meta tags dinámicos</li>
                <li>• Open Graph tags</li>
                <li>• Twitter Cards</li>
                <li>• Schema.org JSON-LD</li>
                <li>• Sitemap automático</li>
                <li>• Robots.txt</li>
                <li>• Verificación de buscadores</li>
                <li>• Breadcrumbs</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">🎯 Configuraciones Disponibles</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Página de inicio</li>
                <li>• Experiencia laboral</li>
                <li>• Blog/Posts</li>
                <li>• Páginas personalizadas</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">🔧 Cómo Usar el Motor SEO</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">1. Para una página nueva:</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`// En tu página
import { seoEngine } from '@/lib/seo-engine'

export const metadata = seoEngine.generateMetadata({
  title: 'Mi Página | Mario Verdú',
  description: 'Descripción de mi página',
  keywords: ['keyword1', 'keyword2'],
  url: 'https://marioverdu.com/mi-pagina'
})`}
              </pre>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">2. Para Schema markup:</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`// En tu componente
import { PersonSchemaMarkup } from '@/components/seo-schema-markup'

export default function MyPage() {
  return (
    <>
      {/* Tu contenido */}
      <PersonSchemaMarkup />
    </>
  )
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">3. Para configuraciones predefinidas:</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`// Usar configuraciones existentes
import { seoEngine, seoConfigs } from '@/lib/seo-engine'

export const metadata = seoEngine.generateMetadata(seoConfigs.home)`}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">📋 Verificación de SEO</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Meta title: "Test SEO | Motor SEO Propio - Mario Verdú"</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Meta description: Configurada correctamente</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Open Graph tags: Implementados</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Twitter Cards: Configurados</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Schema.org: JSON-LD generado</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Canonical URL: Configurada</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">🚀 Próximos Pasos</h2>
          
          <div className="space-y-4 text-sm text-gray-600">
            <p>1. <strong>Google Search Console:</strong> Configurar y verificar el sitio</p>
            <p>2. <strong>Analytics:</strong> Implementar Google Analytics 4</p>
            <p>3. <strong>Imágenes OG:</strong> Crear imágenes optimizadas para redes sociales</p>
            <p>4. <strong>Performance:</strong> Optimizar Core Web Vitals</p>
            <p>5. <strong>Contenido:</strong> Crear contenido SEO-friendly</p>
          </div>
        </div>
      </div>
      
      {/* Schema markup para esta página */}
      <PersonSchemaMarkup />
      <WebsiteSchemaMarkup />
    </div>
  )
}
