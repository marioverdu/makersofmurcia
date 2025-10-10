# 📋 TEMPLATES DE CÓDIGO PARA INTERNACIONALIZACIÓN

## 🎯 **TEMPLATE 1: Hook de Traducciones**

```typescript
// hooks/use-[nombre-pagina]-translations.ts
import { useLanguage } from '@/contexts/language-context'

export interface [NombrePagina]Translations {
  // Campos de traducción - personalizar según necesidad
  titulo: string
  subtitulo: string
  descripcion: string
  botonPrincipal: string
  botonSecundario: string
  mensajeError: string
  mensajeExito: string
  // ... más campos según necesidad
}

const [nombrePagina]Translations: Record<string, [NombrePagina]Translations> = {
  es: {
    titulo: 'Título en Español',
    subtitulo: 'Subtítulo en Español',
    descripcion: 'Descripción en español que puede ser larga.',
    botonPrincipal: 'Botón Principal',
    botonSecundario: 'Botón Secundario',
    mensajeError: 'Ha ocurrido un error',
    mensajeExito: 'Operación exitosa'
  },
  en: {
    titulo: 'Title in English',
    subtitulo: 'Subtitle in English',
    descripcion: 'Description in English that can be long.',
    botonPrincipal: 'Primary Button',
    botonSecundario: 'Secondary Button',
    mensajeError: 'An error occurred',
    mensajeExito: 'Operation successful'
  }
}

export function use[NombrePagina]Translations(lang?: string): [NombrePagina]Translations {
  const { currentLanguage } = useLanguage()
  const language = lang || currentLanguage || 'es'
  return [nombrePagina]Translations[language] || [nombrePagina]Translations.es
}
```

## 🎯 **TEMPLATE 2: Página con Detección Automática**

```typescript
// app/[nombre-pagina]/page.tsx
import { Metadata } from "next"
import { headers } from 'next/headers'
import { getDictionary } from "@/lib/get-dictionary"
import [NombrePagina]Client from "./[nombre-pagina]-client"

// Función para detectar idioma del navegador
function detectBrowserLanguage(): 'es' | 'en' {
  const headersList = headers()
  const acceptLanguage = headersList.get('accept-language') || ''
  const userAgent = headersList.get('user-agent') || ''
  
  // Detectar idioma desde Accept-Language
  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [code] = lang.split(';')
        return code.trim().split('-')[0].toLowerCase()
      })
      .filter(lang => lang === 'es' || lang === 'en')
    
    if (languages.length > 0) {
      return languages[0] as 'es' | 'en'
    }
  }
  
  // Detectar desde User-Agent
  if (userAgent.toLowerCase().includes('en')) {
    return 'en'
  }
  
  // Fallback a español
  return 'es'
}

// Metadata SEO
export const metadata: Metadata = {
  title: "[Título de la Página] | Mario Verdú",
  description: "[Descripción de la página para SEO]"
}

export default async function [NombrePagina]Page() {
  const detectedLang = detectBrowserLanguage()
  
  console.log('🌍 [[NombrePagina]Page] Detected language:', detectedLang)
  
  // Usar el idioma detectado
  const dict = await getDictionary(detectedLang)
  return (
    <>
      {/* Schema markup si es necesario */}
      <[NombrePagina]Client lang={detectedLang} dict={dict} />
    </>
  )
}
```

## 🎯 **TEMPLATE 3: Página con Ruta de Idioma**

```typescript
// app/[lang]/[nombre-pagina]/page.tsx
import type React from "react"
import type { Locale } from "@/types/i18n"
import [NombrePagina]Client from "./[nombre-pagina]-client"
import { getDictionary } from "@/lib/get-dictionary"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function [NombrePagina]Page({ params }: PageProps) {
  const { lang } = await params
  
  const dict = await getDictionary(lang)
  
  return <[NombrePagina]Client lang={lang} dict={dict} />
}
```

## 🎯 **TEMPLATE 4: Página Específica en Inglés**

```typescript
// app/en/[nombre-pagina]/page.tsx
import type React from "react"
import { Metadata } from "next"
import { seoEngine, seoConfigs } from "@/lib/seo-engine"
import [NombrePagina]Client from "../[nombre-pagina]-client"
import { getDictionary } from "@/lib/get-dictionary"

export const metadata: Metadata = {
  title: "[Page Title] | Mario Verdú - UX/UI Designer",
  description: "[Page description in English for SEO]"
}

export default async function [NombrePagina]EnPage() {
  const dict = await getDictionary('en')
  
  return (
    <>
      {/* Schema markup si es necesario */}
      <[NombrePagina]Client lang="en" dict={dict} />
    </>
  )
}
```

## 🎯 **TEMPLATE 5: Componente Cliente**

```typescript
// app/[lang]/[nombre-pagina]/[nombre-pagina]-client.tsx
"use client"

import type React from "react"
import type { Locale, Dictionary } from "@/types/i18n"
import { useLanguage } from "@/contexts/language-context"
import { use[NombrePagina]Translations } from "@/hooks/use-[nombre-pagina]-translations"

interface [NombrePagina]ClientProps {
  lang: Locale
  dict?: Dictionary
}

export default function [NombrePagina]Client({ lang, dict }: [NombrePagina]ClientProps) {
  const { currentLanguage, isLoading: languageLoading } = useLanguage()
  
  // Usar el idioma del contexto si está disponible, sino el prop
  const displayLanguage = languageLoading ? lang : (currentLanguage || lang)
  
  // Hook de traducciones específicas para esta página
  const t = use[NombrePagina]Translations(displayLanguage)
  
  console.log('🌍 [[NombrePagina]Client] Language detection:', {
    lang,
    currentLanguage,
    languageLoading,
    displayLanguage
  })
  
  return (
    <div className="min-h-screen">
      {/* Header si es necesario */}
      
      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{t.titulo}</h1>
        <p className="text-lg mb-6">{t.descripcion}</p>
        
        {/* Contenido condicional basado en idioma */}
        {displayLanguage === 'es' ? (
          <div>
            <p>Contenido específico en español</p>
          </div>
        ) : (
          <div>
            <p>Specific content in English</p>
          </div>
        )}
        
        {/* Botones usando traducciones */}
        <div className="flex gap-4 mt-8">
          <button className="px-6 py-2 bg-blue-500 text-white rounded">
            {t.botonPrincipal}
          </button>
          <button className="px-6 py-2 border border-gray-300 rounded">
            {t.botonSecundario}
          </button>
        </div>
      </main>
      
      {/* Footer si es necesario */}
    </div>
  )
}
```

## 🎯 **TEMPLATE 6: Componente con Traducciones**

```typescript
// components/[nombre-componente].tsx
"use client"

import { use[NombrePagina]Translations } from "@/hooks/use-[nombre-pagina]-translations"

export interface [NombreComponente]Props {
  className?: string
  lang?: string
  // Props específicas del componente
  titulo?: string
  descripcion?: string
}

export function [NombreComponente]({ 
  className = "", 
  lang,
  titulo,
  descripcion 
}: [NombreComponente]Props) {
  const t = use[NombrePagina]Translations(lang)
  
  return (
    <div className={`[nombre-componente] ${className}`}>
      <h2 className="text-xl font-semibold mb-2">
        {titulo || t.titulo}
      </h2>
      <p className="text-gray-600 mb-4">
        {descripcion || t.descripcion}
      </p>
      
      {/* Contenido específico del componente */}
      <div className="space-y-2">
        {/* Usar traducciones del hook */}
        <p>{t.mensajeExito}</p>
      </div>
    </div>
  )
}
```

## 🎯 **TEMPLATE 7: Loading Component**

```typescript
// app/[lang]/[nombre-pagina]/loading.tsx
import { UnifiedPageLoading } from "@/components/ui/unified-page-loading"

export default function Loading() {
  return <UnifiedPageLoading />
}
```

## 🎯 **TEMPLATE 8: Metadata SEO**

```typescript
// Para páginas con SEO específico
import { Metadata } from "next"
import { seoEngine, seoConfigs } from "@/lib/seo-engine"

export const metadata: Metadata = seoEngine.generateMetadata(seoConfigs.[nombrePagina])

// O metadata personalizada
export const metadata: Metadata = {
  title: "[Título] | Mario Verdú",
  description: "[Descripción]",
  openGraph: {
    title: "[Título] | Mario Verdú",
    description: "[Descripción]",
    url: "https://marioverdu.com/[ruta]",
    siteName: "Mario Verdú",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "[Título] | Mario Verdú",
    description: "[Descripción]",
  },
}
```

## 🔧 **INSTRUCCIONES DE USO**

### **Para Crear una Nueva Página Traducida:**

1. **Copiar Template 1** → Crear hook de traducciones
2. **Copiar Template 2** → Crear página con detección automática
3. **Copiar Template 5** → Crear componente cliente
4. **Copiar Template 6** → Crear componentes específicos si es necesario
5. **Copiar Template 7** → Crear loading component
6. **Personalizar** → Adaptar contenido y traducciones
7. **Probar** → Verificar en ambos idiomas

### **Para Crear una Página con Ruta Específica:**

1. **Copiar Template 1** → Crear hook de traducciones
2. **Copiar Template 3** → Crear página con ruta de idioma
3. **Copiar Template 4** → Crear página específica en inglés
4. **Copiar Template 5** → Crear componente cliente
5. **Personalizar** → Adaptar contenido y traducciones
6. **Probar** → Verificar en ambos idiomas

## ⚠️ **NOTAS IMPORTANTES**

- **Reemplazar `[nombre-pagina]`** con el nombre real de la página
- **Reemplazar `[NombrePagina]`** con el nombre en PascalCase
- **Personalizar campos** en el hook de traducciones según necesidad
- **Incluir logs de debugging** en todos los componentes
- **Probar siempre** en ambos idiomas antes de deployar
- **Seguir convenciones** de nomenclatura del proyecto

## 🚀 **EJEMPLO PRÁCTICO**

Para crear una página traducida:

1. Hook de traducciones (Template 1)
2. Página con detección automática (Template 2)
3. Componente cliente (Template 5)
4. Loading component (Template 7)

**¡Usa estos templates como base para cualquier página traducida!** 🌍✨
