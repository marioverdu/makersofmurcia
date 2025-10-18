"use client"

import Hero from "@/components/hero"
import WhatIsMaker from "@/components/what-is-maker"
import Team from "@/components/team"
import Gallery from "@/components/gallery"
import Testimonials from "@/components/testimonials"
import FinalCTA from "@/components/final-cta"
import Footer from "@/components/footer"

export default function RootPageClient() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WhatIsMaker />
      <Team />
      <Gallery />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  )
}