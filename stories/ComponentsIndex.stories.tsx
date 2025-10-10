import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: '📚 Índice de Componentes',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# 📚 **ÍNDICE DE COMPONENTES - STORYBOOK**

## 🎯 **ELEMENTOS DE STORYBOOK**

| Elemento | Explicación |
|----------|-------------|
| 📁 (Carpeta) | **Story Group** - Agrupación de stories por categoría (ej: Next.js, Components) |
| 📄 (Documento) | **Story** - Historia específica de un componente (ej: AdvancedTableV2, Chat) |
| 🔧 (Engranaje) | **Addon** - Herramienta de Storybook (ej: a11y, docs, vitest) |
| 📚 (Libro) | **Documentation** - Página de documentación o índice |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ComponentsIndex: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">📚 Índice de Componentes</h1>
            <p className="text-xl text-muted-foreground">
              Elementos de Storybook
            </p>
          </div>

          {/* Índice de Componentes */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🎯 Elementos de Storybook</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Elemento</th>
                    <th className="text-left p-3 font-medium">Explicación</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 text-2xl">📁 (Carpeta)</td>
                    <td className="p-3">
                      <strong>Story Group</strong> - Agrupación de stories por categoría (ej: Next.js, Components)
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-2xl">📄 (Documento)</td>
                    <td className="p-3">
                      <strong>Story</strong> - Historia específica de un componente (ej: AdvancedTableV2, Chat)
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-2xl">🔧 (Engranaje)</td>
                    <td className="p-3">
                      <strong>Addon</strong> - Herramienta de Storybook (ej: a11y, docs, vitest)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-2xl">📚 (Libro)</td>
                    <td className="p-3">
                      <strong>Documentation</strong> - Página de documentación o índice
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>
                System prompt de Storybook (Cursor): <code>/.cursor/rules</code>
              </p>
            </div>
          </div>

          {/* Captura de referencia */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🖼️ Captura de referencia</h2>
            <p className="text-sm text-muted-foreground mb-4">Vista de referencia del índice de componentes.</p>
            <img
              src="/storybook/components-index-screenshot.png"
              alt="Captura de índice de componentes"
              className="w-full h-auto rounded border"
            />
          </div>

          {/* Enlaces a stories clave */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🔗 Componentes</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <a className="text-blue-600 underline" href="/story/header--default">Header</a>
                <span className="text-muted-foreground ml-2">— Navegación principal del sitio</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Elementos de Storybook explicados con terminología oficial.',
      },
    },
  },
};

// 🌍 DOC ANIDADO: INTERNATIONALIZATION
// 🔐 DOC ANIDADO: NEXTAUTH MISMATCH URI LOGIN
export const NextAuthMismatchUriLogin: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">🔐 NextAuth - Mismatch URI login</h1>
            <p className="text-xl text-muted-foreground">
              Guía completa para resolver problemas de autenticación OAuth en producción
            </p>
          </div>

          {/* Documentación End-to-End NextAuth */}
          <div className="bg-card border rounded-lg p-6">
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">📋 Resumen del Problema</h3>
                <p className="text-blue-700 mb-2">
                  <strong>Error:</strong> <code>redirect_uri_mismatch</code> al intentar login con Google OAuth en producción
                </p>
                <p className="text-blue-700 mb-2">
                  <strong>Causa raíz:</strong> Configuración DNS inconsistente entre Hostinger y Vercel, más cache DNS local
                </p>
                <p className="text-blue-700">
                  <strong>Solución final:</strong> Configuración híbrida DNS + limpieza de cache + URLs correctas en Google Console
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">🛠️ Solución Completa Paso a Paso</h3>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">1. Configuración DNS en Hostinger</h4>
                  <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                    <div># CAMBIO CRÍTICO: Dominio principal</div>
                    <div>A    @    76.76.21.21    # ANTES: 216.198.79.1 → AHORA: Vercel</div>
                    <div></div>
                    <div># Mantener subdominios en Hostinger</div>
                    <div>A    tests 92.113.28.254 # Subdominio → Hostinger</div>
                    <div>A    assets 92.113.28.254 # Subdominio → Hostinger</div>
                    <div></div>
                    <div># www puede usar CNAME o A</div>
                    <div>CNAME www cname.vercel-dns.com # www → Vercel</div>
                    <div># O alternativamente:</div>
                    <div>A    www   76.76.21.21    # www → Vercel</div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">2. Variables de Entorno en Vercel Dashboard</h4>
                  <div className="bg-gray-100 p-3 rounded font-mono text-sm space-y-1">
                    <div># ANTES (INCORRECTO):</div>
                    <div>NEXT_PUBLIC_SITE_URL=https://simplecms-marioverdus-projects.vercel.app</div>
                    <div>NEXTAUTH_URL=https://simplecms-marioverdus-projects.vercel.app</div>
                    <div></div>
                    <div># DESPUÉS (CORRECTO):</div>
                    <div>NEXT_PUBLIC_SITE_URL=https://marioverdu.com</div>
                    <div>NEXTAUTH_URL=https://marioverdu.com</div>
                    <div></div>
                    <div># Comandos terminal para actualizar:</div>
                    <div>vercel env rm NEXT_PUBLIC_SITE_URL production</div>
                    <div>vercel env add NEXT_PUBLIC_SITE_URL production</div>
                    <div># Valor: https://marioverdu.com</div>
                    <div></div>
                    <div>vercel env rm NEXTAUTH_URL production</div>
                    <div>vercel env add NEXTAUTH_URL production</div>
                    <div># Valor: https://marioverdu.com</div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">3. Dominios en Proyecto Vercel</h4>
                  <div className="bg-gray-100 p-3 rounded font-mono text-sm space-y-1">
                    <div># Dominios que deben estar configurados:</div>
                    <div>✅ marioverdu.com (dominio principal)</div>
                    <div>✅ www.marioverdu.com (subdominio www)</div>
                    <div>✅ app.marioverdu.com (opcional, para pruebas)</div>
                    <div></div>
                    <div># Verificar desde terminal:</div>
                    <div>vercel domains ls</div>
                    <div>vercel projects ls</div>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">4. Google Console OAuth URLs</h4>
                  <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                    <div># ANTES (FALTABA www.marioverdu.com):</div>
                    <div>Authorized JavaScript origins:</div>
                    <div>• https://marioverdu.com</div>
                    <div>• https://simplecms-marioverdus-projects.vercel.app</div>
                    <div>• http://localhost:3000</div>
                    <div></div>
                    <div># DESPUÉS (COMPLETO):</div>
                    <div>Authorized JavaScript origins:</div>
                    <div>• https://marioverdu.com</div>
                    <div>• https://www.marioverdu.com  ← AGREGAR ESTA</div>
                    <div>• https://simplecms-marioverdus-projects.vercel.app</div>
                    <div>• http://localhost:3000</div>
                    <div>• https://app.marioverdu.com</div>
                    <div></div>
                    <div>Authorized redirect URIs:</div>
                    <div>• https://marioverdu.com/api/auth/callback/google</div>
                    <div>• https://www.marioverdu.com/api/auth/callback/google  ← AGREGAR ESTA</div>
                    <div>• https://simplecms-marioverdus-projects.vercel.app/api/auth/callback/google</div>
                    <div>• http://localhost:3000/api/auth/callback/google</div>
                    <div>• https://app.marioverdu.com/api/auth/callback/google</div>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">5. Variables de Entorno Locales</h4>
                  <div className="bg-gray-100 p-3 rounded font-mono text-sm space-y-1">
                    <div># Archivo: env.local</div>
                    <div># ANTES (INCORRECTO):</div>
                    <div>NEXTAUTH_URL=https://marioverdu.com</div>
                    <div></div>
                    <div># DESPUÉS (CORRECTO):</div>
                    <div>NEXTAUTH_URL=http://localhost:3000</div>
                    <div>NEXT_PUBLIC_SITE_URL=http://localhost:3000</div>
                    <div></div>
                    <div># Archivo: env.production.marioverdu.com</div>
                    <div>NEXT_PUBLIC_SITE_URL=https://marioverdu.com</div>
                    <div>NEXTAUTH_URL=https://marioverdu.com</div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">6. Limpieza Cache DNS (CRÍTICO)</h4>
                  <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                    <div># PROBLEMA: Cache DNS local mantenía IP antigua</div>
                    <div># curl mostraba: IPv4: 216.198.79.1 (INCORRECTO)</div>
                    <div># nslookup mostraba: 76.76.21.21 (CORRECTO)</div>
                    <div></div>
                    <div># SOLUCIÓN: Limpiar cache DNS local en Mac</div>
                    <div>sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder</div>
                    <div></div>
                    <div># Verificar después:</div>
                    <div>curl -I https://marioverdu.com/admin</div>
                    <div># Debe mostrar: server: Vercel</div>
                  </div>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-800 mb-2">7. Redeploy y Verificación Final</h4>
                  <div className="bg-gray-100 p-3 rounded font-mono text-sm space-y-1">
                    <div># Redeploy después de cambios</div>
                    <div>vercel --prod</div>
                    <div></div>
                    <div># Verificar que el dominio apunta a Vercel</div>
                    <div>curl -I https://marioverdu.com/admin</div>
                    <div># Debe mostrar: server: Vercel</div>
                    <div></div>
                    <div># Verificar callback</div>
                    <div>curl -I https://marioverdu.com/api/auth/callback/google</div>
                    <div># Debe redirigir a www.marioverdu.com</div>
                    <div></div>
                    <div># Verificar DNS</div>
                    <div>nslookup marioverdu.com</div>
                    <div># Debe mostrar: 76.76.21.21</div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">⚠️ Problemas Comunes y Soluciones</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Error:</strong> <code>redirect_uri_mismatch</code></div>
                  <div><strong>Causa:</strong> URLs en Google Console no coinciden con las que usa NextAuth</div>
                  <div><strong>Solución:</strong> Agregar <code>www.marioverdu.com</code> a Google Console</div>
                  <div></div>
                  <div><strong>Error:</strong> DNS resuelve a IP incorrecta (216.198.79.1)</div>
                  <div><strong>Causa:</strong> Cache DNS local mantiene IP antigua de Hostinger</div>
                  <div><strong>Solución:</strong> <code>sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder</code></div>
                  <div></div>
                  <div><strong>Error:</strong> Variables de entorno no se actualizan</div>
                  <div><strong>Causa:</strong> Vercel mantiene valores antiguos en cache</div>
                  <div><strong>Solución:</strong> <code>vercel env rm</code> + <code>vercel env add</code> + <code>vercel --prod</code></div>
                  <div></div>
                  <div><strong>Error:</strong> <code>dns_probe_finished_nxdomain</code> en móvil</div>
                  <div><strong>Causa:</strong> DNS no propagado completamente</div>
                  <div><strong>Solución:</strong> Cambiar DNS móvil a 8.8.8.8 o esperar propagación</div>
                  <div></div>
                  <div><strong>Error:</strong> Variables locales apuntan a producción</div>
                  <div><strong>Causa:</strong> <code>env.local</code> tiene URLs de producción</div>
                  <div><strong>Solución:</strong> <code>NEXTAUTH_URL=http://localhost:3000</code> en local</div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">📝 Comandos Terminal Útiles</h3>
                <div className="bg-gray-100 p-3 rounded font-mono text-sm space-y-1">
                  <div># Verificar variables de entorno</div>
                  <div>vercel env ls | grep -E "(NEXT_PUBLIC_SITE_URL|NEXTAUTH_URL)"</div>
                  <div></div>
                  <div># Verificar DNS</div>
                  <div>nslookup marioverdu.com</div>
                  <div>dig marioverdu.com</div>
                  <div></div>
                  <div># Verificar callbacks</div>
                  <div>curl -I https://marioverdu.com/api/auth/callback/google</div>
                  <div></div>
                  <div># Limpiar cache DNS</div>
                  <div>sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder</div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-800 mb-3">✅ Checklist Final Completo</h3>
                <div className="space-y-2 text-sm">
                  <div className="font-semibold text-green-700">🌐 DNS Hostinger:</div>
                  <div>☐ <code>A @ 76.76.21.21</code> (dominio principal → Vercel)</div>
                  <div>☐ <code>A tests 92.113.28.254</code> (subdominio → Hostinger)</div>
                  <div>☐ <code>A assets 92.113.28.254</code> (subdominio → Hostinger)</div>
                  <div>☐ <code>CNAME www cname.vercel-dns.com</code> (www → Vercel)</div>
                  <div></div>
                  <div className="font-semibold text-green-700">⚙️ Variables Vercel Dashboard:</div>
                  <div>☐ <code>NEXT_PUBLIC_SITE_URL=https://marioverdu.com</code></div>
                  <div>☐ <code>NEXTAUTH_URL=https://marioverdu.com</code></div>
                  <div>☐ Redeploy completado: <code>vercel --prod</code></div>
                  <div></div>
                  <div className="font-semibold text-green-700">🌍 Dominios Vercel:</div>
                  <div>☐ <code>marioverdu.com</code> configurado</div>
                  <div>☐ <code>www.marioverdu.com</code> configurado</div>
                  <div>☐ <code>app.marioverdu.com</code> configurado (opcional)</div>
                  <div></div>
                  <div className="font-semibold text-green-700">🔐 Google Console OAuth:</div>
                  <div>☐ <code>https://marioverdu.com</code> en JavaScript origins</div>
                  <div>☐ <code>https://www.marioverdu.com</code> en JavaScript origins</div>
                  <div>☐ <code>https://marioverdu.com/api/auth/callback/google</code> en redirect URIs</div>
                  <div>☐ <code>https://www.marioverdu.com/api/auth/callback/google</code> en redirect URIs</div>
                  <div></div>
                  <div className="font-semibold text-green-700">💻 Variables Locales:</div>
                  <div>☐ <code>env.local</code>: <code>NEXTAUTH_URL=http://localhost:3000</code></div>
                  <div>☐ <code>env.local</code>: <code>NEXT_PUBLIC_SITE_URL=http://localhost:3000</code></div>
                  <div></div>
                  <div className="font-semibold text-green-700">🧹 Cache DNS:</div>
                  <div>☐ Cache DNS local limpiado: <code>sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder</code></div>
                  <div>☐ DNS resuelve correctamente: <code>nslookup marioverdu.com</code> → <code>76.76.21.21</code></div>
                  <div></div>
                  <div className="font-semibold text-green-700">🔍 Verificación Final:</div>
                  <div>☐ <code>curl -I https://marioverdu.com/admin</code> → <code>server: Vercel</code></div>
                  <div>☐ <code>curl -I https://marioverdu.com/api/auth/callback/google</code> → redirige a www</div>
                  <div>☐ Login funciona sin errores <code>redirect_uri_mismatch</code></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Documentación técnica completa para resolver problemas de NextAuth OAuth redirect_uri_mismatch en producción, incluyendo configuración DNS, variables de entorno, Google Console y limpieza de cache.',
      },
    },
  },
};

export const Internationalization: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">🌍 Sistema Unificado de Internacionalización</h1>
            <p className="text-xl text-muted-foreground">
              Documentación técnica completa end-to-end
            </p>
          </div>

          {/* Resumen Ejecutivo */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">📋 Resumen Ejecutivo</h2>
            <p className="text-muted-foreground mb-4">
              Este documento define el sistema unificado para crear páginas traducidas en el proyecto. 
              <strong>TODAS las páginas deben seguir este patrón exacto</strong> para garantizar consistencia y funcionalidad.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">✅ Estado Actual - SISTEMA ESTABLE</h3>
              <ul className="text-green-700 space-y-1">
                <li>• <strong>309 archivos</strong> pasando validación (0 fallos)</li>
                <li>• <strong>0 advertencias</strong> en producción</li>
                <li>• <strong>Sistema completamente funcional</strong> en producción</li>
                <li>• <strong>Work Experience 100% traducido</strong> y verificado</li>
                <li>• <strong>Validador reforzado</strong> con detección de textos hardcodeados</li>
              </ul>
            </div>
          </div>

          {/* Arquitectura del Sistema */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🏗️ Arquitectura del Sistema</h2>
            
            <h3 className="text-lg font-semibold mb-3">Estructura de Rutas - SISTEMA UNIFICADO:</h3>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              <pre>{`app/
├── [lang]/                    # ✅ ÚNICA ESTRUCTURA VÁLIDA
│   ├── page.tsx              # Página raíz (/es/, /en/)
│   ├── posts/
│   │   └── page.tsx          # Posts con idioma (/es/posts, /en/posts)
│   └── work-experience/
│       └── page.tsx          # Work experience con idioma (/es/work-experience, /en/work-experience)
│
├── components/               # Componentes compartidos
│   ├── work-experience-client.tsx  # ✅ Cliente con prop lang
│   └── work-experience-card.tsx    # ✅ Card con prop lang
│
└── hooks/                    # Hooks de traducción
    └── use-work-experience-translations.ts  # ✅ Hook con lang opcional

❌ ESTRUCTURAS OBSOLETAS (NO USAR):
├── en/                       # ❌ Duplicados problemáticos
├── work-experience/          # ❌ Sin idioma específico
└── work-experience-fix/      # ❌ Versiones de prueba`}</pre>
            </div>

            <h3 className="text-lg font-semibold mb-3 mt-6">Componentes del Sistema:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">1. Middleware (`middleware.ts`)</h4>
                <p className="text-sm text-muted-foreground">
                  Detecta idioma del navegador y redirige automáticamente
                </p>
                <ul className="text-xs mt-2 space-y-1">
                  <li>• Safari en inglés → `/en/`</li>
                  <li>• Safari en español → `/es/`</li>
                  <li>• DuckDuckGo → `/en/` (fallback)</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">2. Contexto de Idioma (`contexts/language-context.tsx`)</h4>
                <p className="text-sm text-muted-foreground">
                  Gestiona el estado global del idioma
                </p>
                <ul className="text-xs mt-2 space-y-1">
                  <li>• Detección automática desde URL</li>
                  <li>• Persistencia en cookies</li>
                  <li>• Sincronización con navegador</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">3. Hooks de Traducción</h4>
                <p className="text-sm text-muted-foreground">
                  Centralizan las traducciones por funcionalidad
                </p>
                <ul className="text-xs mt-2 space-y-1">
                  <li>• `useWorkExperienceTranslations(lang?)`</li>
                  <li>• `useChatTranslations(lang?)`</li>
                  <li>• Siempre aceptan parámetro `lang` opcional</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">4. Validación Automática</h4>
                <p className="text-sm text-muted-foreground">
                  Script que verifica el cumplimiento del patrón
                </p>
                <ul className="text-xs mt-2 space-y-1">
                  <li>• `npm run validate-i18n`</li>
                  <li>• Detección de problemas específicos</li>
                  <li>• Reportes detallados</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Enfoques de Internacionalización */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🎯 Enfoques de Internacionalización</h2>
            
            <div className="space-y-6">
              {/* Enfoque Principal: Páginas Completas */}
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">📄 Enfoque 1: Páginas Completas</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Para páginas completas que necesitan traducción de múltiples elementos.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Template A: Hook de Traducciones</h4>
                    <div className="bg-gray-100 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                      <pre>{`// hooks/use-[nombre-pagina]-translations.ts
import { useLanguage } from '@/contexts/language-context'

export interface [NombrePagina]Translations {
  titulo: string
  descripcion: string
  boton: string
}

const [nombrePagina]Translations: Record<string, [NombrePagina]Translations> = {
  es: { titulo: 'Título en Español', descripcion: 'Descripción en español', boton: 'Botón' },
  en: { titulo: 'Title in English', descripcion: 'Description in English', boton: 'Button' }
}

export function use[NombrePagina]Translations(lang?: string): [NombrePagina]Translations {
  const { currentLanguage } = useLanguage()
  const language = lang || currentLanguage || 'es'
  return [nombrePagina]Translations[language] || [nombrePagina]Translations.es
}`}</pre>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Template B: Página con Detección Automática</h4>
                    <div className="bg-gray-100 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                      <pre>{`// app/[nombre-pagina]/page.tsx
import { headers } from 'next/headers'
import { getDictionary } from "@/lib/get-dictionary"
import [NombrePagina]Client from "./[nombre-pagina]-client"

function detectBrowserLanguage(): 'es' | 'en' {
  const headersList = headers()
  const acceptLanguage = headersList.get('accept-language') || ''
  const userAgent = headersList.get('user-agent') || ''
  
  if (acceptLanguage) {
    const languages = acceptLanguage.split(',').map(lang => {
      const [code] = lang.split(';')
      return code.trim().split('-')[0].toLowerCase()
    }).filter(lang => lang === 'es' || lang === 'en')
    
    if (languages.length > 0) return languages[0] as 'es' | 'en'
  }
  
  return userAgent.toLowerCase().includes('en') ? 'en' : 'es'
}

export default async function [NombrePagina]Page() {
  const detectedLang = detectBrowserLanguage()
  const dict = await getDictionary(detectedLang)
  return <[NombrePagina]Client lang={detectedLang} dict={dict} />
}`}</pre>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Template C: Componente Cliente</h4>
                    <div className="bg-gray-100 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                      <pre>{`// app/[nombre-pagina]/[nombre-pagina]-client.tsx
"use client"

import { useLanguage } from "@/contexts/language-context"
import { use[NombrePagina]Translations } from "@/hooks/use-[nombre-pagina]-translations"

interface [NombrePagina]ClientProps {
  lang: string
  dict?: any
}

export default function [NombrePagina]Client({ lang, dict }: [NombrePagina]ClientProps) {
  const { currentLanguage } = useLanguage()
  const displayLanguage = currentLanguage || lang
  const t = use[NombrePagina]Translations(displayLanguage)
  
  return (
    <div>
      <h1>{t.titulo}</h1>
      <p>{t.descripcion}</p>
      <button>{t.boton}</button>
    </div>
  )
}`}</pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enfoque Secundario: Componentes Hardcodeados */}
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-orange-700">🔧 Enfoque 2: Componentes Hardcodeados</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Para componentes con texto hardcodeado que aparece solo una vez (ej: botones, menús).
                </p>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Template D: Hook de Traducciones</h4>
                    <div className="bg-gray-100 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                      <pre>{`// hooks/use-[nombre-componente]-translations.ts
import { useLanguage } from '@/contexts/language-context'

export interface [NombreComponente]Translations {
  textoHardcodeado: string
}

const [nombreComponente]Translations: Record<string, [NombreComponente]Translations> = {
  es: { textoHardcodeado: 'Texto en Español' },
  en: { textoHardcodeado: 'Text in English' }
}

export function use[NombreComponente]Translations(lang?: string): [NombreComponente]Translations {
  const { currentLanguage } = useLanguage()
  const language = lang || currentLanguage || 'es'
  return [nombreComponente]Translations[language] || [nombreComponente]Translations.es
}`}</pre>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Template E: Componente Reutilizable</h4>
                    <div className="bg-gray-100 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                      <pre>{`// components/ui/[nombre-componente].tsx
import React, { forwardRef } from 'react'
import { use[NombreComponente]Translations } from '@/hooks/use-[nombre-componente]-translations'

interface [NombreComponente]Props {
  lang?: string
  // ... otras props
}

export const [NombreComponente] = forwardRef<HTMLDivElement, [NombreComponente]Props>(
  ({ lang, ...props }, ref) => {
    const t = use[NombreComponente]Translations(lang)
    
    return (
      <div ref={ref} {...props}>
        {t.textoHardcodeado}
      </div>
    )
  }
)`}</pre>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Template F: Uso del Componente</h4>
                    <div className="bg-gray-100 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                      <pre>{`// ANTES (texto hardcodeado):
<div>Descargar en PDF</div>

// DESPUÉS (componente internacionalizado):
<[NombreComponente] lang={displayLanguage} />`}</pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cuándo usar cada enfoque */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">🤔 ¿Cuándo usar cada enfoque?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">📄 Enfoque 1: Páginas Completas</h4>
                    <ul className="text-blue-600 space-y-1">
                      <li>• Páginas con múltiples textos</li>
                      <li>• Contenido dinámico</li>
                      <li>• Secciones complejas</li>
                      <li>• Ejemplo: `/work-experience`, `/posts`</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">🔧 Enfoque 2: Componentes Hardcodeados</h4>
                    <ul className="text-orange-600 space-y-1">
                      <li>• Texto que aparece solo una vez</li>
                      <li>• Botones, menús, etiquetas</li>
                      <li>• Componentes reutilizables</li>
                      <li>• Ejemplo: `ContextualMenu`, botones</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cómo Evitar Errores Comunes */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">⚠️ Cómo Evitar Errores Comunes al Traducir</h2>
            
            <div className="space-y-6">
              {/* Error Común: Cambiar toda la página */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-red-700">🚨 Error Común: Cambiar Toda la Página</h3>
                <p className="text-sm text-red-600 mb-4">
                  <strong>Problema:</strong> Cuando el usuario pide traducir un texto específico, a veces se cambia toda la página al español en lugar de solo traducir ese elemento.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-red-100 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-red-800">❌ Lo que NO hay que hacer:</h4>
                    <div className="bg-red-200 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                      <pre>{`// MAL: Cambiar toda la lógica de idioma
const displayLanguage = 'es' // ❌ Hardcodear español

// MAL: Modificar múltiples secciones
{t.workExperience} // ❌ Cambiar otras secciones
{t.education} // ❌ Cambiar otras secciones
{t.aboutMe} // ✅ Solo esto debería cambiar`}</pre>
                    </div>
                  </div>

                  <div className="bg-green-100 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-green-800">✅ Lo que SÍ hay que hacer:</h4>
                    <div className="bg-green-200 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                      <pre>{`// BIEN: Solo cambiar el elemento específico
// ANTES:
{workExperienceData.aboutMe?.title || t.aboutMe}

// DESPUÉS:
{t.aboutMe}

// BIEN: Mantener el resto intacto
{t.workExperience} // ✅ No tocar
{t.education} // ✅ No tocar
{t.pinned} // ✅ No tocar`}</pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Proceso Seguro */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">🛡️ Proceso Seguro para Traducir</h3>
                
                <div className="space-y-4">
                  <div className="bg-blue-100 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-blue-800">1. Identificar el Texto Específico</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Localizar exactamente qué texto necesita traducción</li>
                      <li>• Verificar si ya existe en el hook de traducciones</li>
                      <li>• Confirmar que solo ese elemento debe cambiar</li>
                    </ul>
                  </div>

                  <div className="bg-blue-100 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-blue-800">2. Verificar el Hook de Traducciones</h4>
                    <div className="bg-blue-200 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                      <pre>{`// Verificar que existe en el hook:
const workExperienceTranslations = {
  es: {
    aboutMe: 'Sobre mí', // ✅ Existe
    aboutMeDescription: 'Desde 2017 diseño...' // ✅ Existe
  },
  en: {
    aboutMe: 'About me', // ✅ Existe
    aboutMeDescription: 'Since 2017 I design...' // ✅ Existe
  }
}`}</pre>
                    </div>
                  </div>

                  <div className="bg-blue-100 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-blue-800">3. Cambio Mínimo y Específico</h4>
                    <div className="bg-blue-200 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                      <pre>{`// ANTES: Dependencia de datos externos
{workExperienceData.aboutMe?.title || t.aboutMe}

// DESPUÉS: Solo usar traducciones
{t.aboutMe}

// ✅ Solo cambiar lo necesario
// ❌ No tocar otras secciones
// ❌ No cambiar lógica de idioma global`}</pre>
                    </div>
                  </div>

                  <div className="bg-blue-100 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-blue-800">4. Verificación Post-Cambio</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Probar en `/work-experience` (debe mostrar español)</li>
                      <li>• Probar en `/en/work-experience` (debe mostrar inglés)</li>
                      <li>• Verificar que otras secciones no cambiaron</li>
                      <li>• Confirmar que el diseño se mantiene igual</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Ejemplo Real */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-yellow-700">📝 Ejemplo Real: "Sobre mí"</h3>
                
                <div className="space-y-4">
                  <div className="bg-yellow-100 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-yellow-800">Problema Detectado:</h4>
                    <p className="text-yellow-700 text-sm">
                      En `/en/work-experience` se mostraba "Sobre mí" en lugar de "About me" porque el componente usaba `workExperienceData.aboutMe?.title` que devolvía el texto hardcodeado en español.
                    </p>
                  </div>

                  <div className="bg-yellow-100 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-yellow-800">Solución Aplicada:</h4>
                    <div className="bg-yellow-200 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                      <pre>{`// ANTES:
<h2>{workExperienceData.aboutMe?.title || t.aboutMe}</h2>
<p>{workExperienceData.aboutMe?.description || t.aboutMeDescription}</p>

// DESPUÉS:
<h2>{t.aboutMe}</h2>
<p>{t.aboutMeDescription}</p>

// ✅ Resultado:
// /work-experience → "Sobre mí"
// /en/work-experience → "About me"`}</pre>
                    </div>
                  </div>

                  <div className="bg-yellow-100 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-yellow-800">Lecciones Aprendidas:</h4>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• <strong>Priorizar traducciones sobre datos externos:</strong> Si existe `t.aboutMe`, usarlo directamente</li>
                      <li>• <strong>Cambio mínimo:</strong> Solo modificar el elemento específico que necesita traducción</li>
                      <li>• <strong>Verificar dependencias:</strong> Revisar si hay datos externos que sobrescriben las traducciones</li>
                      <li>• <strong>Probar ambos idiomas:</strong> Siempre verificar que funciona en español e inglés</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Checklist de Seguridad */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-green-700">✅ Checklist de Seguridad</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-100 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-green-800">Antes de Cambiar:</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• ¿Qué texto específico necesita traducción?</li>
                      <li>• ¿Existe ya en el hook de traducciones?</li>
                      <li>• ¿Hay datos externos que lo sobrescriben?</li>
                      <li>• ¿Qué otras secciones NO debo tocar?</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-100 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-green-800">Después de Cambiar:</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• ¿Funciona en `/work-experience` (español)?</li>
                      <li>• ¿Funciona en `/en/work-experience` (inglés)?</li>
                      <li>• ¿Otras secciones siguen igual?</li>
                      <li>• ¿El diseño se mantiene intacto?</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sistema de Validación Obligatorio */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🔒 Sistema de Validación Obligatorio</h2>
            <p className="text-muted-foreground mb-4">
              <strong>ANTES de cualquier cambio de internacionalización, ejecuta el validador:</strong>
            </p>
            
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-800 mb-3">🚨 VALIDACIÓN OBLIGATORIA</h3>
                <p className="text-red-700 mb-3">
                  <strong>NUNCA modifiques internacionalización sin ejecutar primero:</strong>
                </p>
                
                <div className="bg-red-100 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-red-800">Comando de Validación:</h4>
                  <div className="bg-red-200 rounded-lg p-3 font-mono text-sm">
                    <pre>{`# EJECUTAR SIEMPRE ANTES DE MODIFICAR i18n
npm run validate-i18n

# Debe mostrar: ✅ Pasaron: XXX, ❌ Fallaron: 0, ⚠️ Advertencias: 0
# Si hay fallos, NO proceder hasta resolverlos`}</pre>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-800 mb-3">✅ Checklist Pre-Modificación</h3>
                <p className="text-green-700 mb-3">
                  Antes de cambiar cualquier texto de internacionalización:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-100 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-green-800">1. Identificar Texto Específico:</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• ¿Qué texto exacto necesita traducción?</li>
                      <li>• ¿En qué componente está ubicado?</li>
                      <li>• ¿Qué otros textos NO debo tocar?</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-100 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-green-800">2. Verificar Hook de Traducciones:</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• ¿Existe la clave en el hook?</li>
                      <li>• ¿Tiene traducción en español?</li>
                      <li>• ¿Tiene traducción en inglés?</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">🔧 Proceso de Modificación Seguro</h3>
                <p className="text-blue-700 mb-3">
                  Para modificar un texto específico sin romper el sistema:
                </p>
                
                <div className="space-y-3">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <h4 className="font-semibold text-blue-800">Paso 1: Cambio Mínimo</h4>
                    <div className="bg-blue-200 rounded-lg p-2 font-mono text-xs">
                      <pre>{`// ANTES: Dependencia de datos externos
{workExperienceData.aboutMe?.title || t.aboutMe}

// DESPUÉS: Solo traducciones
{t.aboutMe}

// ✅ Solo cambiar el elemento específico
// ❌ No tocar otras secciones`}</pre>
                    </div>
                  </div>
                  
                  <div className="bg-blue-100 rounded-lg p-3">
                    <h4 className="font-semibold text-blue-800">Paso 2: Verificación Inmediata</h4>
                    <div className="bg-blue-200 rounded-lg p-2 font-mono text-xs">
                      <pre>{`# Verificar que funciona en ambos idiomas
curl -s "http://localhost:3000/es/work-experience" | grep "Sobre mí"
curl -s "http://localhost:3000/en/work-experience" | grep "About me"

# Verificar que NO hay textos mezclados
curl -s "http://localhost:3000/en/work-experience" | grep -E "(Sobre mí|Experiencia)" && echo "❌ ERROR"`}</pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">📊 Comandos de Verificación Post-Cambio</h3>
                <p className="text-purple-700 mb-3">
                  Después de cualquier modificación, ejecuta estos comandos:
                </p>
                
                <div className="bg-purple-100 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-purple-800">Verificación Completa:</h4>
                  <div className="bg-purple-200 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                    <pre>{`# 1. Validación automática
npm run validate-i18n

# 2. Verificar página española
curl -s "http://localhost:3000/es/work-experience" | grep -E "(Sobre mí|Experiencia laboral|Educación)"

# 3. Verificar página inglesa
curl -s "http://localhost:3000/en/work-experience" | grep -E "(About me|Work Experience|Education)"

# 4. Verificar que NO hay mezclas
curl -s "http://localhost:3000/en/work-experience" | grep -E "(Sobre mí|Experiencia|Educación)" && echo "❌ ERROR: Texto español en página inglesa"

# 5. Verificar logs de debugging
# Abrir consola del navegador y buscar logs que empiecen con 🌍`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Proceso de Creación */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🚀 Proceso de Creación de Páginas Traducidas</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold">1</div>
                <div>
                  <h3 className="font-semibold">Crear el Hook de Traducciones</h3>
                  <p className="text-sm text-muted-foreground">Crear `hooks/use-nombre-pagina-translations.ts` con interface y traducciones</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold">2</div>
                <div>
                  <h3 className="font-semibold">Crear el Componente Cliente</h3>
                  <p className="text-sm text-muted-foreground">Implementar lógica de detección de idioma y usar hook de traducciones</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold">3</div>
                <div>
                  <h3 className="font-semibold">Crear la Página</h3>
                  <p className="text-sm text-muted-foreground">Elegir tipo de página (A, B, o C) e implementar detección de idioma</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold">4</div>
                <div>
                  <h3 className="font-semibold">Crear Componentes Específicos</h3>
                  <p className="text-sm text-muted-foreground">Crear componentes que acepten prop `lang` y usen hook de traducciones</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold">5</div>
                <div>
                  <h3 className="font-semibold">Probar y Validar</h3>
                  <p className="text-sm text-muted-foreground">Probar en Safari en inglés y español, verificar logs, comprobar cookies</p>
                </div>
              </div>
            </div>
          </div>

          {/* Validación y Debugging */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🔍 Validación y Debugging</h2>
            
            <h3 className="text-lg font-semibold mb-3">Logs de Debugging:</h3>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              <pre>{`console.log('🌍 [ComponentName] Language detection:', {
  lang,
  currentLanguage,
  languageLoading,
  displayLanguage
})`}</pre>
            </div>

            <h3 className="text-lg font-semibold mb-3 mt-6">Comandos de Validación:</h3>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              <pre>{`# Validar implementación (OBLIGATORIO)
npm run validate-i18n

# Probar detección de idioma
curl -s "http://localhost:3000/" -H "Accept-Language: en-US,en;q=0.9"
curl -s "http://localhost:3000/" -H "Accept-Language: es-ES,es;q=0.9"

# Probar páginas específicas
curl -s "http://localhost:3000/en/work-experience" -I

# Verificar que NO hay textos mezclados
curl -s "http://localhost:3000/en/work-experience" | grep -E "(Sobre mí|Experiencia|Educación)" && echo "❌ ERROR"`}</pre>
            </div>

            <h3 className="text-lg font-semibold mb-3 mt-6">Verificación en Navegador:</h3>
            <ul className="space-y-2">
              <li>• <strong>Consola:</strong> Buscar logs que empiecen con `🌍`</li>
              <li>• <strong>Cookies:</strong> Verificar cookie `locale` con valor correcto</li>
              <li>• <strong>Redirección:</strong> Verificar que middleware redirija correctamente</li>
              <li>• <strong>Contenido:</strong> Verificar que contenido esté en idioma correcto</li>
            </ul>
          </div>

          {/* Reglas Obligatorias */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">⚠️ Reglas Obligatorias</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-700">✅ SIEMPRE HACER:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Ejecutar validador ANTES</strong> de cualquier cambio: <code>npm run validate-i18n</code></li>
                  <li>• <strong>Usar estructura única</strong> <code>app/[lang]/**</code> para páginas traducidas</li>
                  <li>• <strong>Pasar prop `lang`</strong> a todos los componentes</li>
                  <li>• <strong>Usar hooks de traducción</strong> para textos</li>
                  <li>• <strong>Verificar con curl</strong> que no hay textos mezclados</li>
                  <li>• <strong>Probar en ambos idiomas</strong> antes de deployar</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-700">❌ NUNCA HACER:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Modificar i18n sin validar</strong> primero</li>
                  <li>• <strong>Crear páginas duplicadas</strong> como <code>/en/work-experience</code></li>
                  <li>• <strong>Usar textos hardcodeados</strong> sin traducciones</li>
                  <li>• <strong>Olvidar pasar prop `lang`</strong> a componentes hijos</li>
                  <li>• <strong>Deployar sin probar</strong> ambos idiomas</li>
                  <li>• <strong>Ignorar fallos del validador</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Checklist de Validación */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">📊 Checklist de Validación</h2>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Antes de Deployar:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Validador ejecutado: <code>npm run validate-i18n</code></span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Hook de traducciones creado</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Componente cliente implementado</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Página creada con estructura <code>app/[lang]/**</code></span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Componentes hijos reciben prop <code>lang</code></span>
                  </label>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Probado en Safari en inglés</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Probado en Safari en español</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Verificado con curl: no hay textos mezclados</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Middleware redirigiendo correctamente</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Contenido mostrándose en idioma correcto</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Archivos de Referencia */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">📁 Archivos de Referencia</h2>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">📚 Documentación Principal</h3>
                <ul className="text-sm space-y-1">
                  <li>• <code>INTERNATIONALIZATION_UNIFIED_SYSTEM.md</code> - Guía completa del sistema</li>
                  <li>• <code>TRANSLATION_TEMPLATES.md</code> - Templates de código reutilizables</li>
                  <li>• <code>CONTACT_PAGE_EXAMPLE.md</code> - Ejemplo práctico completo</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">🔧 Herramientas</h3>
                <ul className="text-sm space-y-1">
                  <li>• <code>scripts/validate-i18n.js</code> - Script de validación automática</li>
                  <li>• <code>package.json</code> - Comando <code>npm run validate-i18n</code></li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">⚙️ Configuración</h3>
                <ul className="text-sm space-y-1">
                  <li>• <code>middleware.ts</code> - Detección y redirección de idioma</li>
                  <li>• <code>contexts/language-context.tsx</code> - Estado global de idioma</li>
                  <li>• <code>hooks/use-*-translations.ts</code> - Hooks de traducción</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Conclusión */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">🚀 Conclusión</h2>
            <p className="text-green-700 mb-4">
              Este sistema garantiza que <strong>TODAS las páginas traducidas funcionen de manera consistente</strong>. 
              Siguiendo estos patrones exactos, cualquier página nueva tendrá:
            </p>
            <ul className="text-green-700 space-y-2">
              <li>✅ <strong>Validación automática</strong> con <code>npm run validate-i18n</code></li>
              <li>✅ <strong>Estructura única</strong> <code>app/[lang]/**</code> sin duplicados</li>
              <li>✅ <strong>Traducciones completas</strong> en español e inglés</li>
              <li>✅ <strong>Detección automática</strong> de idioma</li>
              <li>✅ <strong>Verificación con curl</strong> para evitar textos mezclados</li>
              <li>✅ <strong>Funcionalidad robusta</strong> en todos los navegadores</li>
            </ul>
            <p className="text-green-700 mt-4 font-semibold">
              <strong>¡SISTEMA ESTABLE Y VERIFICADO - Usa esta guía como referencia absoluta!</strong> 🌍✨
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Documentación técnica completa del sistema de internacionalización end-to-end.',
      },
    },
  },
};

// 🧩 DOC ANIDADO: FAVICON WIDGET (END-TO-END)
export const FaviconWidgetDocs: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">🧩 Favicon Widget — Especificación Técnica End-to-End</h1>
            <p className="text-xl text-muted-foreground">Gestión de favicon + Open Graph (social preview) con soporte producción</p>
          </div>

          {/* Resumen */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">📋 Resumen</h2>
            <ul className="text-sm space-y-2">
              <li>• <strong>Componente</strong>: <code>components/admin/favicon-widget.tsx</code> (client)</li>
              <li>• <strong>API</strong>: <code>app/api/admin/favicon/route.ts</code> (GET/POST/DELETE)</li>
              <li>• <strong>Persistencia</strong>: Vercel KV (clave <code>favicon_config</code>, <code>og_image_url</code>, <code>og_image_last_updated</code>)</li>
              <li>• <strong>OG dinámica</strong>: <code>app/[lang]/opengraph-image/route.ts</code> y <code>app/opengraph-image/route.ts</code></li>
              <li>• <strong>SEO</strong>: <code>lib/seo-engine.ts</code> usa por defecto <code>/opengraph-image</code></li>
              <li>• <strong>Auth</strong>: Acceso al widget protegido por NextAuth (acceso vía /admin)</li>
            </ul>
          </div>

          {/* Flujo */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🏗️ Flujo Técnico</h2>
            <ol className="list-decimal pl-6 space-y-2 text-sm">
              <li>El usuario abre <code>/admin</code> (área protegida NextAuth) y usa <strong>FaviconWidget</strong>.</li>
              <li>El botón “Cambiar Favicon” hace <code>POST /api/admin/favicon</code> con <code>{`{ url, updatedBy }`}</code>.</li>
              <li>La API valida y guarda en KV: <code>favicon_config</code>, <code>og_image_url</code>, <code>og_image_last_updated</code>.</li>
              <li>Producción: <code>/opengraph-image</code> sirve la imagen OG leyendo <code>og_image_url</code> desde KV (persistente).</li>
              <li>SEO: <code>seo-engine</code> referencia <code>/opengraph-image</code> como <code>og:image</code> por defecto.</li>
            </ol>
          </div>

          {/* API */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🔌 API</h2>
            <div className="space-y-4 text-sm">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">POST /api/admin/favicon</h3>
                <div className="bg-gray-100 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                  <pre>{`Body JSON:
{
  "url": "https://assets.marioverdu.com/avatar/avatar-2.webp",
  "updatedBy": "admin-panel"
}

Efectos:
• Guarda favicon_config en KV
• Guarda og_image_url y og_image_last_updated en KV
• En local intenta escribir favicons y manifest en /public (no persiste en prod)
`}</pre>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">GET /api/admin/favicon</h3>
                <p>Devuelve configuración actual del favicon (KV).</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">DELETE /api/admin/favicon</h3>
                <p>Restaura configuración por defecto (favicon por defecto, sin tocar OG persistente).</p>
              </div>
            </div>
          </div>

          {/* OG Dinámica */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🖼️ Open Graph Dinámica</h2>
            <ul className="text-sm space-y-2">
              <li>• Endpoints: <code>/opengraph-image</code> y <code>/{`[lang]`}/opengraph-image</code></li>
              <li>• Lógica: leen <code>og_image_url</code> (KV) y hacen proxy sin cache (<code>Cache-Control: no-store</code>).</li>
              <li>• SEO: <code>seo-engine</code> usa <code>/opengraph-image</code> como fallback para <code>og:image</code>.</li>
            </ul>
          </div>

          {/* Tests */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">🧪 Tests (terminal)</h2>
            <div className="bg-gray-100 rounded-lg p-3 font-mono text-xs overflow-x-auto">
              <pre>{`# 1) Simular botón (local)
curl -s -X POST http://localhost:3000/api/admin/favicon \
  -H "Content-Type: application/json" \
  -d '{"url":"https://assets.marioverdu.com/avatar/avatar-2.webp","updatedBy":"terminal"}' | jq

# 2) Verificar endpoint OG (local)
curl -I http://localhost:3000/opengraph-image | cat
curl -I http://localhost:3000/es/opengraph-image | cat

# 3) Producción (después de deploy)
curl -IL https://marioverdu.com/opengraph-image | grep -iE "HTTP/|content-type|location"
# Ver meta og:image
curl -s https://marioverdu.com/es/work-experience | grep -i 'og:image' -n
`}</pre>
            </div>
          </div>

          {/* Reglas y Notas */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-800">⚠️ Reglas y Notas</h2>
            <ul className="text-sm text-yellow-800 space-y-2">
              <li>• Producción: el filesystem es inmutable; la OG debe servirse vía endpoint/Blob/KV.</li>
              <li>• El widget está bajo NextAuth; requiere sesión válida para usar POST/DELETE.</li>
              <li>• Añadir cache-busting en <code>og:image</code> (~<code>?v=og_image_last_updated</code>) acelera el refresco en redes.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Favicon Widget con actualización de favicon y Open Graph persistente (KV) y endpoint dinámico para producción.',
      },
    },
  },
};

// 📄 DOC ANIDADO: PDF DOWNLOAD SYSTEM
export const PDFDownloadSystem: Story = {
  render: () => (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">📄 Sistema de Generación de PDFs</h1>
          <p className="text-muted-foreground">
            Documentación técnica del sistema de caché inteligente
          </p>
        </div>

        {/* Estado Actual */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-green-800 mb-2">✅ Estado Actual - SISTEMA FUNCIONAL</h2>
          <ul className="text-green-700 space-y-1 text-sm">
            <li>• <strong>Generación dinámica</strong> con Puppeteer desde `/es/work-experience`</li>
            <li>• <strong>Caché inteligente</strong> con detección de cambios automática</li>
            <li>• <strong>Fallback robusto</strong> a PDF estático en caso de errores</li>
            <li>• <strong>Limpieza automática</strong> de archivos expirados</li>
          </ul>
        </div>

        {/* Componentes Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">API Endpoint</h3>
            <p className="text-sm text-muted-foreground mb-2">`/api/generate-pdf`</p>
            <ul className="text-xs space-y-1">
              <li>• Verifica caché antes de generar</li>
              <li>• Usa Puppeteer para capturar página</li>
              <li>• Guarda en caché automáticamente</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Servicio de Caché</h3>
            <p className="text-sm text-muted-foreground mb-2">`pdf-cache-service.ts`</p>
            <ul className="text-xs space-y-1">
              <li>• Hash basado en URL + idioma</li>
              <li>• Expiración automática (7 días)</li>
              <li>• Limpieza de archivos antiguos</li>
            </ul>
          </div>
        </div>

        {/* Flujo Técnico */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">🔄 Flujo Técnico</h2>
          <ol className="text-sm space-y-1 list-decimal pl-4">
            <li>Usuario hace clic en "Descargar en PDF"</li>
            <li>Frontend llama a `/api/generate-pdf`</li>
            <li>API verifica caché usando hash</li>
            <li>Si existe → devuelve PDF inmediatamente</li>
            <li>Si no existe → genera con Puppeteer</li>
            <li>PDF se guarda en caché y se devuelve</li>
          </ol>
        </div>

        {/* Componentes Storybook */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">🧪 Componentes Storybook</h2>
          <div className="space-y-2 text-sm">
            <div>
              <strong>ContextualMenu:</strong> 
              <code className="ml-2 bg-gray-100 px-1 rounded">ContextualMenu/Default</code>
            </div>
            <div>
              <strong>ContextualMenuLoading:</strong> 
              <code className="ml-2 bg-gray-100 px-1 rounded">ContextualMenuLoading/Default</code>
            </div>
          </div>
        </div>

        {/* Comandos de Testing */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">🧪 Comandos de Testing</h2>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Generar PDF:</strong>
              <code className="ml-2 bg-yellow-100 px-1 rounded text-xs">
                curl -X POST /api/generate-pdf
              </code>
            </div>
            <div>
              <strong>Limpiar caché:</strong>
              <code className="ml-2 bg-yellow-100 px-1 rounded text-xs">
                npm run cleanup-cache
              </code>
            </div>
          </div>
        </div>

        {/* Conclusión */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-green-800 mb-2">🚀 Conclusión</h2>
          <p className="text-green-700 text-sm">
            Sistema <strong>completamente funcional</strong> con generación dinámica, 
            caché inteligente y fallback robusto. ¡Listo para producción! 🎉
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Documentación técnica del sistema de generación de PDFs con caché inteligente.',
      },
    },
  },
};
