export default function FourOhFour() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      <h1 className="text-3xl font-bold mb-3">404 - Página no encontrada</h1>
      <p className="mb-6 text-gray-600">La página que intentas acceder no existe o no está disponible.</p>
      <a href="/" className="px-4 py-2 bg-black text-white rounded-md hover:bg-black/80 transition-colors">
        Volver al inicio
      </a>
    </div>
  )
}



