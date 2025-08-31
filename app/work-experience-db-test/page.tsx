import { Suspense } from 'react'
import WorkExperienceDBTestClient from './work-experience-db-test-client'

export default function WorkExperienceDBTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            🧪 Test de Base de Datos - Work Experience
          </h1>
          <p className="text-gray-600 mb-8">
            Test completo del proceso de lectura, edición y guardado de cards a través de la base de datos Neon SQL.
          </p>
          
          <Suspense fallback={<div className="text-center py-8">Cargando test...</div>}>
            <WorkExperienceDBTestClient />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
