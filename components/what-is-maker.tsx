"use client"

import { Card } from "@/components/ui/card"

export default function WhatIsMaker() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent rotate-45 rounded-full" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary rotate-12 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-secondary rotate-45 rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section title */}
        <div className="relative mb-16 text-center">
          <h2
            className="text-5xl md:text-7xl lg:text-9xl font-bold uppercase text-center text-stroke-red relative inline-block w-full"
            style={{ fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif" }}
          >
            ¿QUÉ ES UN MAKER?
            <span
              className="absolute inset-0 text-accent opacity-40 -z-10"
              style={{
                transform: "translate(5px, 5px)",
                fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif",
              }}
              aria-hidden="true"
            >
              ¿QUÉ ES UN MAKER?
            </span>
          </h2>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
            <span className="block w-64 h-3 bg-primary rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]" />
          </div>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Definition card */}
          <Card className="bg-white border-4 border-secondary p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden -rotate-1">
            <div className="absolute -top-8 -left-4 text-[120px] md:text-[160px] opacity-20 leading-none select-none font-serif">
              ?
            </div>
            
            <div className="relative z-10">
              <h3
                className="text-3xl md:text-4xl font-bold uppercase mb-6 text-secondary"
                style={{ fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif" }}
              >
                Definición
              </h3>
              <p className="text-lg md:text-xl text-secondary leading-relaxed">
                El término <strong>maker</strong>, de inglés, denota una persona que utiliza las nuevas tecnologías en el proceso creativo para la creación de un objeto físico, o lo que se conoce como la <strong>fabricación digital</strong>.
              </p>
            </div>
          </Card>

          {/* Association info card */}
          <Card className="bg-white border-4 border-secondary p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden rotate-1">
            <div className="absolute -top-8 -right-4 text-[120px] md:text-[160px] opacity-20 leading-none select-none font-serif">
              ⚙️
            </div>
            
            <div className="relative z-10">
              <h3
                className="text-3xl md:text-4xl font-bold uppercase mb-6 text-secondary"
                style={{ fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif" }}
              >
                Nuestra Asociación
              </h3>
              <p className="text-lg md:text-xl text-secondary leading-relaxed mb-6">
                Somos una <strong>asociación sin ánimo de lucro</strong> que sirve como plataforma de encuentro para todos aquellos que se sienten identificados con la cultura maker: <strong>ciencias, tecnologías, ingenierías, matemáticas (CTIM) y artes</strong>.
              </p>
              <p className="text-lg md:text-xl text-secondary leading-relaxed">
                Nos interesa la <strong>fabricación digital</strong>: impresión 3D, robótica, mecánica, electrónica, programación; en general, la intersección de las nuevas tecnologías con las artes tradicionales.
              </p>
            </div>
          </Card>
        </div>

        {/* Makerspace info */}
        <div className="mt-12">
          <Card className="bg-white border-4 border-secondary p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden -rotate-1">
            <div className="absolute -top-8 -left-4 text-[120px] md:text-[160px] opacity-20 leading-none select-none font-serif">
              🏭
            </div>
            
            <div className="relative z-10 text-center">
              <h3
                className="text-3xl md:text-4xl font-bold uppercase mb-6 text-secondary"
                style={{ fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif" }}
              >
                Makerspace
              </h3>
              <p className="text-lg md:text-xl text-secondary leading-relaxed max-w-4xl mx-auto">
                El <strong>makerspace</strong> es nuestro taller comunitario donde gente con intereses en ciencias, tecnologías, ingenierías, matemáticas (CTIM) y artes se puede conocer, socializar y colaborar. Es un <strong>laboratorio de comunidad abierta</strong>.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
