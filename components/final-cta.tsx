import { Button } from "@/components/ui/button"

export default function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 lg:py-40 px-4 bg-secondary overflow-hidden">
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 25px,
          white 25px,
          white 26px
        ), repeating-linear-gradient(
          45deg,
          transparent,
          transparent 25px,
          white 25px,
          white 26px
        )`,
        }}
      />
      <div className="absolute inset-0 opacity-10 halftone-bg" />
      {/* </CHANGE> */}

      <div className="absolute top-10 left-10 w-40 h-40 border-8 border-primary rotate-45 opacity-40" />
      <div className="absolute bottom-10 right-10 w-48 h-48 border-8 border-accent rotate-12 opacity-40" />
      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-primary opacity-20 -rotate-12" />
      <div className="absolute top-1/4 left-1/3 w-40 h-40 bg-accent opacity-20 rotate-12" />
      {/* </CHANGE> */}

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2
          className="text-6xl md:text-8xl lg:text-[12rem] font-bold uppercase mb-12 leading-none text-stroke relative inline-block"
          style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif" }}
        >
          ÚNETE AL
          <br />
          MOVIMIENTO
          <span
            className="absolute inset-0 text-primary opacity-60 -z-10"
            style={{
              transform: "translate(6px, 6px)",
              fontFamily: "var(--font-anton), Impact, sans-serif",
            }}
            aria-hidden="true"
          >
            ÚNETE AL
            <br />
            MOVIMIENTO
          </span>
          <span
            className="absolute inset-0 text-accent opacity-40 -z-20"
            style={{
              transform: "translate(-4px, -4px)",
              fontFamily: "var(--font-anton), Impact, sans-serif",
            }}
            aria-hidden="true"
          >
            ÚNETE AL
            <br />
            MOVIMIENTO
          </span>
        </h2>
        {/* </CHANGE> */}

        <div className="inline-block bg-background border-4 border-background p-6 mb-12 rotate-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <p
            className="text-xl md:text-2xl lg:text-3xl font-bold text-secondary uppercase leading-tight"
            style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif" }}
          >
            ★ NO ESPERES MÁS ★
            <br />
            SÉ PARTE DEL CAMBIO
          </p>
        </div>
        {/* </CHANGE> */}

        <Button
          size="lg"
          className="relative bg-accent text-secondary hover:bg-accent/90 text-2xl md:text-3xl font-bold uppercase px-12 md:px-20 py-8 md:py-10 border-4 border-background shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-200 -rotate-2"
          style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif" }}
        >
          DESPIERTA YA
          <span className="absolute -top-4 -right-4 w-10 h-10 bg-primary border-2 border-background rotate-45 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
          <span className="absolute -bottom-4 -left-4 w-8 h-8 bg-primary border-2 border-background rotate-45 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
        </Button>

        {/* Contact info block */}
        <a 
          href="https://t.me/makersofmurcia" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-12 inline-block bg-secondary border-4 border-background p-4 -rotate-1 shadow-[6px_6px_0px_0px_rgba(255,0,0,0.6)] hover:shadow-[8px_8px_0px_0px_rgba(255,0,0,0.8)] transition-all duration-200 cursor-pointer"
        >
          <p
            className="text-background text-lg md:text-xl font-bold uppercase"
            style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif" }}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              @makersofmurcia
            </div>
          </p>
        </a>
        {/* </CHANGE> */}
      </div>
    </section>
  )
}