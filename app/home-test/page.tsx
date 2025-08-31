import Link from "next/link"

export default function HomeTest() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Configuración de Clerk Actualizada</h1>
      <p className="text-lg mb-4">Se ha añadido marioverdu.com como URL externa permitida</p>
      <div className="flex gap-4 mt-4">
        <Link href="/" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition">
          Ir a Inicio
        </Link>
        <Link href="/login" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
          Ir a Login
        </Link>
      </div>
    </div>
  )
}
