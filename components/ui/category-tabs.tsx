"use client"

import React from 'react'

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
  const handle = (next: CategoryKey) => {
    onChange?.(next)
    onNavigate?.(next)
  }
  return (
    <div className={`flex space-x-4 justify-center ${className}`}>
      <button
        className={`text-[#333] whitespace-nowrap ${selected === "concept" ? "" : "opacity-50"}`}
        onClick={() => handle("concept")}
      >
        {labels.posts}
      </button>
      <button
        className={`text-[#333] whitespace-nowrap ${selected === "portfolio" ? "" : "opacity-50"}`}
        onClick={() => handle("portfolio")}
      >
        {labels.portfolio ?? 'Portfolio'}
      </button>
      <button
        className={`text-[#333] whitespace-nowrap ${selected === "about" ? "" : "opacity-50"}`}
        onClick={() => handle("about")}
      >
        {labels.about}
      </button>
    </div>
  )
}

export default CategoryTabs


