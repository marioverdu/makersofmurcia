import Link from "next/link"

export default function TestPreview() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Página de prueba para vista previa</h1>
      <p className="text-lg mb-4">Esta página debería verse correctamente en la vista previa de v0</p>
      <div className="flex gap-4 mt-4">
        <Link href="/" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition">
          Ir a Inicio
        </Link>
        <Link href="/login" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
          Ir a Login
        </Link>
      </div>
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Información adicional:</h2>
        <p>
          URL externa configurada: <span className="font-mono bg-gray-200 px-2 py-1 rounded">marioverdu.com</span>
        </p>
      </div>
    </div>
  )
}
