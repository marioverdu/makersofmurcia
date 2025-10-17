"use client"

import React, { useRef } from 'react'

type CategoryKey = "concept" | "portfolio" | "about"

interface CategoryTabsProps {
  selected: CategoryKey
  onChange?: (next: CategoryKey) => void
  onNavigate?: (next: CategoryKey) => void
  labels: {
    posts: string
    about: string
    portfolio?: string
  }
  className?: string
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ selected, onChange, onNavigate, labels, className = "" }) => {
  const conceptRef = useRef<HTMLButtonElement>(null)
  const portfolioRef = useRef<HTMLButtonElement>(null)
  const aboutRef = useRef<HTMLButtonElement>(null)

  const handle = (next: CategoryKey, ref: React.RefObject<HTMLButtonElement>) => {
    onChange?.(next)
    onNavigate?.(next)
    
    // Centrar el botón seleccionado inmediatamente sin transición
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'auto', // Sin transición suave
        block: 'nearest',
        inline: 'center'
      })
    }
  }

  return (
    <>
      <div className={`overflow-x-auto overflow-y-hidden scrollbar-hide ${className}`}>
        <div className="flex space-x-4 justify-center min-w-max px-2">
          <button
            ref={conceptRef}
            className={`text-[#333] whitespace-nowrap ${selected === "concept" ? "" : "opacity-50"} transition-opacity`}
            onClick={() => handle("concept", conceptRef)}
          >
            {labels.posts}
          </button>
          <button
            ref={portfolioRef}
            className={`text-[#333] whitespace-nowrap ${selected === "portfolio" ? "" : "opacity-50"} transition-opacity`}
            onClick={() => handle("portfolio", portfolioRef)}
          >
            {labels.portfolio ?? 'Portfolio'}
          </button>
          <button
            ref={aboutRef}
            className={`text-[#333] whitespace-nowrap ${selected === "about" ? "" : "opacity-50"} transition-opacity`}
            onClick={() => handle("about", aboutRef)}
          >
            {labels.about}
          </button>
        </div>
      </div>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  )
}

export default CategoryTabs


