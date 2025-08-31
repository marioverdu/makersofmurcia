"use client"

import { useState } from "react"
import Header from "@/components/header"
import { ContactForm } from "@/components/contact-form"
import { PrimaryButton } from "@/components/ui/buttons"
import type { Locale, Dictionary } from "@/types/i18n"

interface ContactPageClientProps {
  lang: Locale
  dict: Dictionary
}

export default function ContactPageClient({ lang, dict }: ContactPageClientProps) {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  return (
    <div className="min-h-screen w-full bg-[#F7F8FC] overflow-x-hidden pt-[40px]">
      {/* Sticky Header */}
      <Header />

      {/* Contact Page Content */}
      <div className="max-w-[1092px] mx-auto px-4 md:px-[60px] py-12">
        <h1 className="text-[hsl(206,1%,27%)] text-3xl font-medium mb-6">{dict.contact.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-[hsl(206,1%,27%)] mb-4">
              {dict.contact.subtitle}
            </p>
            <p className="text-[hsl(206,1%,27%)] mb-6">
              Puedes contactarnos a través del formulario o utilizando la información de contacto a continuación.
            </p>

            <div className="mt-8">
              <PrimaryButton onClick={() => setIsContactFormOpen(true)}>
                {dict.contact.send}
              </PrimaryButton>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[12px] shadow-sm">
            <h2 className="text-[hsl(206,1%,27%)] text-xl font-medium mb-4">
              Información de contacto
            </h2>

            <div className="space-y-4">
              <div>
                <p className="font-medium text-[hsl(206,1%,27%)]">{dict.contact.email}</p>
                <p className="text-[hsl(206,1%,27%)]">info@ejemplo.com</p>
              </div>

              <div>
                <p className="font-medium text-[hsl(206,1%,27%)]">{dict.contact.phone}</p>
                <p className="text-[hsl(206,1%,27%)]">+34 123 456 789</p>
              </div>

              <div>
                <p className="font-medium text-[hsl(206,1%,27%)]">Dirección</p>
                <p className="text-[hsl(206,1%,27%)]">Calle Ejemplo 123, 28001 Madrid</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form (independent from any specific component) */}
      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} />
    </div>
  )
}

