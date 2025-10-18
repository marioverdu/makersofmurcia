import Hero from "@/components/hero"
import MasonrySection from "@/components/masonry-section"
import Gallery from "@/components/gallery"
import PastEvents from "@/components/past-events"
import Testimonials from "@/components/testimonials"
import FinalCTA from "@/components/final-cta"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <MasonrySection />
      <Gallery />
      <PastEvents />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  )
}