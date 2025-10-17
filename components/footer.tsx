export default function Footer() {
  return (
    <footer className="bg-secondary text-background py-12 px-4 md:px-8 border-t-8 border-primary">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3
              className="text-3xl md:text-4xl font-bold uppercase mb-4"
              style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
            >
              CONTACTO
            </h3>
            <p className="font-bold">info@asociacion.org</p>
            <p className="font-bold">+34 600 000 000</p>
          </div>

          <div>
            <h3
              className="text-3xl md:text-4xl font-bold uppercase mb-4"
              style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
            >
              SÍGUENOS
            </h3>
            <div className="flex flex-col gap-2">
              <a href="#" className="font-bold hover:text-primary transition-colors">
                INSTAGRAM
              </a>
              <a href="#" className="font-bold hover:text-primary transition-colors">
                TWITTER
              </a>
              <a href="#" className="font-bold hover:text-primary transition-colors">
                TIKTOK
              </a>
            </div>
          </div>

          <div>
            <h3
              className="text-3xl md:text-4xl font-bold uppercase mb-4"
              style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
            >
              LEGAL
            </h3>
            <div className="flex flex-col gap-2">
              <a href="#" className="font-bold hover:text-primary transition-colors">
                PRIVACIDAD
              </a>
              <a href="#" className="font-bold hover:text-primary transition-colors">
                TÉRMINOS
              </a>
              <a href="#" className="font-bold hover:text-primary transition-colors">
                COOKIES
              </a>
            </div>
          </div>
        </div>

        <div className="border-t-4 border-background pt-8 text-center">
          <p
            className="text-2xl md:text-3xl font-bold uppercase"
            style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
          >
            © 2025 ASOCIACIÓN SIN ÁNIMO DE LUCRO
          </p>
          <p className="font-bold mt-2">HECHO CON ❤️ PARA LA JUVENTUD</p>
        </div>
      </div>
    </footer>
  )
}


