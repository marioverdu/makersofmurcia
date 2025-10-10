"use client"

import { useState } from "react"

export default function SystemTestPage() {
  const [testResult, setTestResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testSystem = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/test-kv-connection?t=${Date.now()}`)
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      const data = await response.json()
      setTestResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
      setTestResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Prueba del Sistema</h1>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Estado del Sistema de Almacenamiento</h2>
        <p className="mb-6 text-gray-600">
          El sistema ahora funciona sin Redis/KV. Utiliza únicamente base de datos PostgreSQL, localStorage del
          navegador y memoria temporal para un rendimiento óptimo.
        </p>

        <button
          onClick={testSystem}
          disabled={loading}
          className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/80 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 mb-6"
        >
          {loading ? "Probando sistema..." : "Probar sistema"}
        </button>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md mb-6">
            <div className="flex">
              <div className="text-red-400">❌</div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error de conexión</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {testResult && (
          <div className="p-6 rounded-md bg-green-50 border border-green-200">
            <div className="flex items-center mb-4">
              <div className="text-green-400 text-xl">✅</div>
              <h3 className="ml-3 text-lg font-semibold text-green-800">{testResult.message}</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded border">
                <span className="font-medium text-gray-600">Base de datos PostgreSQL:</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    testResult.results?.database?.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {testResult.results?.database?.success ? "✅ Conectada" : "❌ Error"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded border">
                <span className="font-medium text-gray-600">Sistema de almacenamiento:</span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  ✅ Funcionando
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded border">
                <span className="font-medium text-gray-600">Redis/KV:</span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                  🗑️ Eliminado (no necesario)
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Entorno:</strong> {testResult.results?.env?.NODE_ENV} |<strong> Vercel:</strong>{" "}
                {testResult.results?.env?.VERCEL_ENV} |<strong> Timestamp:</strong>{" "}
                {new Date(testResult.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 flex items-center">
          <span className="text-xl mr-2">ℹ️</span>
          Información del Sistema
        </h3>
        <p className="text-blue-800 mt-3 mb-4">
          Tu aplicación ahora funciona de manera más eficiente y simple sin Redis/KV:
        </p>
        <ul className="space-y-2 text-blue-700">
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✅</span>
            <strong>Base de datos PostgreSQL (Neon):</strong> Para datos persistentes y críticos
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✅</span>
            <strong>localStorage:</strong> Para preferencias del usuario en el navegador
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✅</span>
            <strong>Memoria temporal:</strong> Para caché de sesión y datos temporales
          </li>
          <li className="flex items-center">
            <span className="text-red-500 mr-2">🗑️</span>
            <strong>Redis/KV:</strong> Eliminado completamente (era redundante)
          </li>
        </ul>
      </div>

      <div className="mt-6 bg-green-50 p-6 rounded-lg border border-green-200">
        <h3 className="font-semibold text-green-900 flex items-center">
          <span className="text-xl mr-2">🎉</span>
          Beneficios de la Limpieza
        </h3>
        <ul className="space-y-2 text-green-700 mt-3">
          <li className="flex items-center">
            <span className="text-green-500 mr-2">💰</span>
            Menos costos (una integración menos que pagar)
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">🚀</span>
            Código más simple y mantenible
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">🔧</span>
            Menos configuración y variables de entorno
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">🛡️</span>
            Menos puntos de fallo en el sistema
          </li>
        </ul>
      </div>
    </div>
  )
}
