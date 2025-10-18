export default function Footer() {
  return (
    <footer className="bg-secondary text-background py-12 px-4 md:px-8 border-t-8 border-primary">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3
              className="text-3xl md:text-4xl font-bold uppercase mb-4"
              style={{ fontFamily: "Climate Crisis, cursive" }}
            >
              CONTACTO
            </h3>
            <div className="space-y-2">
              <p className="font-bold">hola@makersofmurcia.org</p>
              <p className="font-bold">968 90 48 08</p>
              <p className="font-bold text-sm">
                CEEIM – Campus de Espinardo Nª7<br />
                30100 Espinardo – Murcia
              </p>
            </div>
          </div>

          <div>
            <h3
              className="text-3xl md:text-4xl font-bold uppercase mb-4"
              style={{ fontFamily: "Climate Crisis, cursive" }}
            >
              REDES SOCIALES
            </h3>
            <div className="flex flex-col gap-2">
              <a href="https://t.me/makersofmurcia" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-primary transition-colors">
                TELEGRAM
              </a>
              <a href="#" className="font-bold hover:text-primary transition-colors">
                FACEBOOK
              </a>
              <a href="#" className="font-bold hover:text-primary transition-colors">
                TWITTER
              </a>
              <a href="#" className="font-bold hover:text-primary transition-colors">
                YOUTUBE
              </a>
            </div>
          </div>

          <div>
            <h3
              className="text-3xl md:text-4xl font-bold uppercase mb-4"
              style={{ fontFamily: "Climate Crisis, cursive" }}
            >
              EVENTOS
            </h3>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Feria Maker Murcia</p>
              <p className="font-bold">Murmak18</p>
              <p className="font-bold">Murmak17</p>
              <p className="font-bold">Murmak16</p>
            </div>
          </div>

          <div>
            <h3
              className="text-3xl md:text-4xl font-bold uppercase mb-4"
              style={{ fontFamily: "Climate Crisis, cursive" }}
            >
              LEGAL
            </h3>
            <div className="flex flex-col gap-2">
              <a href="#" className="font-bold hover:text-primary transition-colors">
                AVISO LEGAL
              </a>
              <a href="#" className="font-bold hover:text-primary transition-colors">
                POLÍTICA PRIVACIDAD
              </a>
              <a href="#" className="font-bold hover:text-primary transition-colors">
                POLÍTICA COOKIES
              </a>
            </div>
          </div>
        </div>

        <div className="border-t-4 border-background pt-8 text-center">
          <p
            className="text-2xl md:text-3xl font-bold uppercase"
            style={{ fontFamily: "Climate Crisis, cursive" }}
          >
            © 2015 MAKERS OF MURCIA
          </p>
          <p className="font-bold mt-2">ASOCIACIÓN SIN ÁNIMO DE LUCRO</p>
          <p className="font-bold mt-1">MÁS DE 250 MAKERS Y SEGUIMOS SUMANDO</p>
        </div>
      </div>
    </footer>
  )
}