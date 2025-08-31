"use client"

import React from "react"
import Link from "next/link"
import type { Locale } from "@/types/i18n"

interface StorybookHeaderTabsProps {
  className?: string
  pathname?: string
  lang?: Locale
}

export function StorybookHeaderTabs({ 
  className = "", 
  pathname = "/", 
  lang = "es" 
}: StorybookHeaderTabsProps) {
  // En Storybook, mostrar todas las secciones habilitadas
  const routesVisibility = {
    "/": true,
    "/posts": true,
    "/work-experience": true,
    "/contact": true,
  }

  // Detectar la página actual
  const isRootPage = pathname === '/' || pathname === `/${lang}` || pathname === `/${lang}/`
  const isPostsPage = pathname === '/posts' || pathname === `/${lang}/posts`
  const isWorkExperiencePage = pathname === '/work-experience' || pathname === `/${lang}/work-experience`
  const isContactPage = pathname === '/contact' || pathname === `/${lang}/contact`

  // En Storybook, usar rutas simples
  const getRoutePath = (route: string) => {
    return route === '/' ? '/' : route
  }

  return (
    <div className={`flex gap-[16px] h-[40px] mx-auto md:mx-0 justify-center md:justify-start items-center ${className}`}>
      {routesVisibility["/"] && (
        <Link
          href={getRoutePath('/')}
          className={`text-sm font-medium h-[40px] flex items-center px-1 border-b-2 ${
            isRootPage
              ? "text-[#3D5B6A] border-[#3D5B6A]"
              : "text-gray-500 font-normal border-transparent hover:border-[#3D5B6A] hover:text-[#3D5B6A]"
          } transition-colors`}
        >
          {lang === 'es' ? 'Inicio' : 'Home'}
        </Link>
      )}
      {routesVisibility["/posts"] && (
        <Link
          href={getRoutePath('/posts')}
          className={`text-sm font-medium h-[40px] flex items-center px-1 border-b-2 ${
            isPostsPage
              ? "text-[#3D5B6A] border-[#3D5B6A]"
              : "text-gray-500 font-normal border-transparent hover:border-[#3D5B6A] hover:text-[#3D5B6A]"
          } transition-colors`}
        >
          {lang === 'es' ? 'Posts' : 'Blog'}
        </Link>
      )}
      {routesVisibility["/work-experience"] && (
        <Link
          href={getRoutePath('/work-experience')}
          className={`text-sm font-medium h-[40px] flex items-center px-1 border-b-2 ${
            isWorkExperiencePage
              ? "text-[#3D5B6A] border-[#3D5B6A]"
              : "text-gray-500 font-normal border-transparent hover:border-[#3D5B6A] hover:text-[#3D5B6A]"
          } transition-colors`}
        >
          {lang === 'es' ? 'Experiencia' : 'Experience'}
        </Link>
      )}
      {routesVisibility["/contact"] && (
        <Link
          href={getRoutePath('/contact')}
          className={`text-sm font-medium h-[40px] flex items-center px-1 border-b-2 ${
            isContactPage
              ? "text-[#3D5B6A] border-[#3D5B6A]"
              : "text-gray-500 font-normal border-transparent hover:border-[#3D5B6A] hover:text-[#3D5B6A]"
          } transition-colors`}
        >
          {lang === 'es' ? 'Contacto' : 'Contact'}
        </Link>
      )}
    </div>
  )
}
