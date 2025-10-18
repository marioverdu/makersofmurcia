import Hero from "@/components/hero"
import Team from "@/components/team"
import Gallery from "@/components/gallery"
import Event from "@/components/event"
import Testimonials from "@/components/testimonials"
import FinalCTA from "@/components/final-cta"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Team />
      <Gallery />
      <Event />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  )
}