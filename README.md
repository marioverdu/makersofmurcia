# 🚀 Light CMS Template

Una versión extremadamente ligera del proyecto original, optimizada para desarrollo de componentes con Design System completo y Storybook integrado.

## ✨ Características

- **🎨 Design System Completo**: Tokens CSS, componentes UI base y guías de estilo
- **📚 Storybook Integrado**: Documentación interactiva de componentes
- **🔐 Autenticación**: NextAuth.js con Google OAuth configurado
- **⚡ Next.js 15**: App Router con React 19 y TypeScript
- **🎯 Tailwind CSS**: Sistema de estilos con tokens personalizados
- **🧩 Componentes UI**: Biblioteca completa de componentes Radix UI

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Iniciar Storybook
npm run storybook
```

## 📁 Estructura del Proyecto

```
├── app/
│   ├── [lang]/           # Página raíz con internacionalización
│   ├── login/            # Sistema de autenticación
│   ├── api/auth/         # APIs de autenticación
│   └── layout.tsx        # Layout principal
├── components/
│   ├── ui/               # Componentes UI base (Radix + shadcn)
│   ├── auth/             # Componentes de autenticación
│   └── design-system/    # Componentes del Design System
├── styles/
│   ├── tokens.css        # Tokens CSS del Design System
│   ├── utilities.css     # Clases utilitarias
│   └── globals.css       # Estilos globales
├── stories/
│   ├── DesignSystem.stories.tsx  # Documentación del Design System
│   └── ui/               # Stories de componentes UI
└── lib/                  # Utilidades y configuración
```

## 🎨 Design System

El Design System está completamente integrado en Storybook y se basa en:

- **Tokens CSS**: Variables CSS dinámicas en `styles/tokens.css`
- **Componentes Base**: Biblioteca completa de componentes Radix UI
- **Documentación**: Storybook como fuente única de verdad

### Ver Design System

```bash
npm run storybook
```

Accede a `http://localhost:6006` para ver la documentación completa.

## 🚀 Desarrollo

### Comandos Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run storybook    # Storybook
npm run lint         # Linting
```

### Agregar Nuevos Componentes

1. Crear componente en `components/ui/`
2. Agregar story en `stories/ui/`
3. Documentar en Storybook si es parte del Design System

## 📦 Dependencias Principales

- **Next.js 15**: Framework React
- **React 19**: Biblioteca de UI
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Sistema de estilos
- **Radix UI**: Componentes accesibles
- **NextAuth.js**: Autenticación
- **Storybook**: Documentación de componentes

## 🎯 Objetivo

Este template está diseñado para ser una base ligera y funcional que permita:

- Desarrollo rápido de nuevos componentes
- Documentación automática con Storybook
- Sistema de autenticación listo para usar
- Design System escalable y mantenible

## 📝 Notas

- Se eliminaron todas las funcionalidades específicas del proyecto original
- Se mantuvieron solo los elementos esenciales para desarrollo
- El Design System sigue las reglas del proyecto original (solo en Storybook)
- La autenticación está configurada para desarrollo y producción

---

**Versión**: 0.1.0  
**Última actualización**: Octubre 2024