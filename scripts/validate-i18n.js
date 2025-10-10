#!/usr/bin/env node

/**
 * Script de Validación de Internacionalización
 * Verifica que todas las páginas traducidas sigan el patrón correcto
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuración
const CONFIG = {
  appDir: './app',
  componentsDir: './components',
  hooksDir: './hooks',
  requiredPatterns: {
    // Patrones que deben estar presentes
    languageDetection: 'detectBrowserLanguage',
    languageContext: 'useLanguage',
    translationHook: 'useWorkExperienceTranslations',
    consoleLog: 'console.log.*🌍',
    langProp: 'lang\\?:'
  },
  forbiddenPatterns: {
    // Patrones que NO deben estar presentes
    hardcodedLang: 'lang="es"',
    hardcodedText: '"Sobre mí"|"About me"|"Experiencia laboral"|"Educación"|"Diseñador UX/UI"|"Full Stack"',
    missingLangProp: 'function.*\\{.*\\}.*\\{.*\\}.*\\}'
  }
}

// Colores para output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logSection(title) {
  log(`\n${colors.bold}${colors.blue}=== ${title} ===${colors.reset}`)
}

// Función para leer archivos recursivamente
function readFilesRecursively(dir, extensions = ['.tsx', '.ts']) {
  const files = []
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir)
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        traverse(fullPath)
      } else if (extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath)
      }
    }
  }
  
  traverse(dir)
  return files
}

// Función para validar archivo
function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const issues = []
  const warnings = []
  
  // Reglas adicionales estrictas para i18n
  const forbiddenStrings = [
    'Experiencia laboral', 'Educación', 'Diseñador UX/UI', 'Desarrollador Full stack',
    'Portafolio de proyectos seleccionados', 'Requisitos:', 'Wireframing',
    'Definición de Flujo de Usuario', 'Prototipo Interactivo', 'Guía de Estilo',
    'Sistema de Diseño', 'Componentización', 'Dimensiones, Espaciado', 'Documentación Accesible',
    'Investigación de Mercado', 'Validación Continua', 'Homogeneización', 'Control de Versiones',
    'Generación de Guía', 'Comunicación de Requisitos', 'Arquitectura de Información',
    'Diseño UX', 'Diseño UI', 'Mantenimiento del Sistema de Diseño', 'Prototipado', 'Pruebas, Reporte de Bugs'
  ]
  
  // Solo validar archivos que realmente necesitan traducciones
  // Validar SOLO producción: app/[lang]/** y componentes críticos
  const inLangApp = filePath.includes(`${path.sep}app${path.sep}[lang]${path.sep}`)
  const isCriticalComponent = filePath.includes('components/work-experience') || filePath.includes('components/education-section') || filePath.includes('components/work-experience-client')
  const shouldValidate = inLangApp || isCriticalComponent
  
  if (!shouldValidate) {
    return { issues: [], warnings: [] }
  }
  
  // Verificar patrones requeridos solo para archivos relevantes
  // No exigir detección en page.tsx: la gestión es vía middleware
  
  if (filePath.includes('-client.tsx') && (inLangApp || isCriticalComponent)) {
    // Verificar que los componentes cliente usen el contexto de idioma
    if (!content.includes('useLanguage')) {
      issues.push('Client component should use useLanguage hook')
    }
    // logs opcionales: no bloquear
  }
  
  if (filePath.includes('translations.ts') && (inLangApp || isCriticalComponent)) {
    // Verificar que los hooks de traducción sigan el patrón
    if (!content.includes('useLanguage')) {
      issues.push('Translation hook should use useLanguage')
    }
    if (!content.includes('lang?:')) {
      issues.push('Translation hook should accept optional lang parameter')
    }
  }
  
  if ((filePath.includes('work-experience') || filePath.includes('education-section')) && (inLangApp || isCriticalComponent)) {
    // Verificar que los componentes de work experience usen traducciones
    if (!content.includes('useWorkExperienceTranslations')) {
      issues.push('Work experience component should use translations')
    }
    if (!content.includes('lang?:')) {
      issues.push('Component should accept lang prop')
    }
    // Detectar español hardcodeado
    for (const s of forbiddenStrings) {
      if (content.includes(s)) {
        issues.push(`Hardcoded text detected: "${s}"`) 
      }
    }
  }
  
  if (filePath.includes('chat-tuenti')) {
    // Verificar que los componentes de chat usen traducciones
    if (!content.includes('useChatTranslations')) {
      issues.push('Chat component should use translations')
    }
  }
  
  if (filePath.includes('language-switcher')) {
    // Verificar que el language switcher use el contexto
    if (!content.includes('useLanguage')) {
      issues.push('Language switcher should use useLanguage')
    }
  }
  
  return { issues, warnings }
}

// Función principal
function main() {
  log(`${colors.bold}🌍 VALIDACIÓN DE INTERNACIONALIZACIÓN${colors.reset}`)
  log('Verificando que todas las páginas traducidas sigan el patrón correcto...\n')
  
  const allFiles = [
    ...readFilesRecursively(CONFIG.appDir),
    ...readFilesRecursively(CONFIG.componentsDir),
    ...readFilesRecursively(CONFIG.hooksDir)
  ]
  
  const results = {
    total: allFiles.length,
    passed: 0,
    failed: 0,
    warnings: 0,
    details: []
  }
  
  // Validar cada archivo
  for (const file of allFiles) {
    const { issues, warnings } = validateFile(file)
    
    if (issues.length === 0) {
      results.passed++
      if (warnings.length > 0) {
        results.warnings++
        results.details.push({
          file,
          status: 'warning',
          issues: [],
          warnings
        })
      }
    } else {
      results.failed++
      results.details.push({
        file,
        status: 'failed',
        issues,
        warnings
      })
    }
  }
  
  // Mostrar resultados
  logSection('RESUMEN')
  log(`Total de archivos: ${results.total}`)
  log(`✅ Pasaron: ${results.passed}`, 'green')
  log(`❌ Fallaron: ${results.failed}`, 'red')
  log(`⚠️  Advertencias: ${results.warnings}`, 'yellow')
  
  // Mostrar detalles de archivos con problemas
  if (results.failed > 0 || results.warnings > 0) {
    logSection('DETALLES')
    
    for (const detail of results.details) {
      const statusColor = detail.status === 'failed' ? 'red' : 'yellow'
      const statusIcon = detail.status === 'failed' ? '❌' : '⚠️'
      
      log(`${statusIcon} ${detail.file}`, statusColor)
      
      if (detail.issues.length > 0) {
        for (const issue of detail.issues) {
          log(`   • ${issue}`, 'red')
        }
      }
      
      if (detail.warnings.length > 0) {
        for (const warning of detail.warnings) {
          log(`   • ${warning}`, 'yellow')
        }
      }
    }
  }
  
  // Mostrar recomendaciones
  if (results.failed > 0) {
    logSection('RECOMENDACIONES')
    log('Para arreglar los problemas:')
    log('1. Revisa la guía: INTERNATIONALIZATION_UNIFIED_SYSTEM.md')
    log('2. Usa los templates: TRANSLATION_TEMPLATES.md')
    log('3. Asegúrate de seguir el patrón estándar')
    log('4. Prueba en ambos idiomas antes de deployar')
  }
  
  // Mostrar archivos que necesitan atención
  const translationFiles = allFiles.filter(file => 
    file.includes('translations') || 
    file.includes('-client.tsx') ||
    file.includes('/page.tsx')
  )
  
  if (translationFiles.length > 0) {
    logSection('ARCHIVOS DE TRADUCCIÓN ENCONTRADOS')
    for (const file of translationFiles) {
      log(`📄 ${file}`)
    }
  }
  
  // Mostrar comandos útiles
  logSection('COMANDOS ÚTILES')
  log('Para probar en desarrollo:')
  log('  npm run dev')
  log('')
  log('Para probar en Safari en inglés:')
  log('  curl -s "http://localhost:3000/" -H "Accept-Language: en-US,en;q=0.9"')
  log('')
  log('Para probar en Safari en español:')
  log('  curl -s "http://localhost:3000/" -H "Accept-Language: es-ES,es;q=0.9"')
  
  // Exit code
  process.exit(results.failed > 0 ? 1 : 0)
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { validateFile, readFilesRecursively }
