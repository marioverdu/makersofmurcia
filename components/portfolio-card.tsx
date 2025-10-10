"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card/default"
import Link from "next/link"

interface PortfolioCardProps {
  title: string
  description?: string
  imageUrl: string
  link: string
  date?: string // Añadido para la fecha
}

export function PortfolioCard({ title, description, imageUrl, link, date }: PortfolioCardProps) {
  return (
    <Card className="relative group w-full md:w-[304px] h-[227px] overflow-hidden">
      <Link href={link} className="absolute inset-0 z-10">
        <span className="sr-only">View {title} project</span>
      </Link>
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <div className="flex justify-between items-end w-full">
          <h3 className="text-lg font-semibold truncate pr-2">{title}</h3>
          {date && <span className="text-sm whitespace-nowrap text-right">{date}</span>}
        </div>
      </div>
    </Card>
  )
}
