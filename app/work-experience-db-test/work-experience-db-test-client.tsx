'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { UnifiedLoading } from "@/components/ui/unified-loading"
import { Button } from '@/components/ui/button';
import { WorkExperienceData, WorkExperience, Education, PortfolioProject, AboutMe } from '@/lib/work-experience-db'

interface TestResult {
  id: string
  step: string
  status: 'success' | 'error' | 'pending'
  message: string
  timestamp: Date
  data?: any
}

interface EditState {
  [key: string]: {
    value: string
    isEditing: boolean
    hasChanges: boolean
  }
}

export default function WorkExperienceDBTestClient() {
  const [data, setData] = useState<WorkExperienceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editState, setEditState] = useState<Record<string, EditState>>({})
  const [saving, setSaving] = useState(false)

  // Función para agregar resultados de test
  const addTestResult = useCallback((step: string, status: 'success' | 'error' | 'pending', message: string, data?: any) => {
    const result: TestResult = {
      id: `${Date.now()}-${Math.random()}`,
      step,
      status,
      message,
      timestamp: new Date(),
      data
    }
    setTestResults(prev => [...prev, result])
  }, [])

  // Función para cargar datos iniciales
  const fetchData = useCallback(async () => {
    try {
      addTestResult('Conexión a BD', 'pending', 'Iniciando conexión a la base de datos...')
      
      const response = await fetch('/api/work-experience')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result.success && result.data) {
        setData(result.data)
        addTestResult('Lectura de datos', 'success', `Datos cargados correctamente. ${result.data.workExperience.length} cards de experiencia, ${result.data.education.length} cards de educación`, result.data)
        
        // Inicializar estado de edición
        const newEditState: Record<string, EditState> = {}
        
        // Inicializar work experience
        result.data.workExperience.forEach((card: WorkExperience) => {
          newEditState[`work_${card.id}`] = {
            company_name: { value: card.company_name, isEditing: false, hasChanges: false },
            job_title: { value: card.job_title, isEditing: false, hasChanges: false },
            year: { value: card.year, isEditing: false, hasChanges: false },
            description: { value: card.description || '', isEditing: false, hasChanges: false },
            detailed_content: { value: card.detailed_content || '', isEditing: false, hasChanges: false }
          }
        })
        
        // Inicializar education
        result.data.education.forEach((card: Education) => {
          newEditState[`education_${card.id}`] = {
            institution_name: { value: card.institution_name, isEditing: false, hasChanges: false },
            degree_title: { value: card.degree_title, isEditing: false, hasChanges: false },
            year: { value: card.year, isEditing: false, hasChanges: false },
            description: { value: card.description || '', isEditing: false, hasChanges: false },
            detailed_content: { value: card.detailed_content || '', isEditing: false, hasChanges: false }
          }
        })
        
        setEditState(newEditState)
        addTestResult('Inicialización de estado', 'success', 'Estado de edición inicializado correctamente')
      } else {
        throw new Error(result.error || 'Error al cargar los datos')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      addTestResult('Lectura de datos', 'error', `Error al cargar datos: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }, [addTestResult])

  // Función para actualizar un campo
  const updateField = useCallback((cardId: string, field: string, value: string) => {
    setEditState(prev => ({
      ...prev,
      [cardId]: {
        ...prev[cardId],
        [field]: {
          value,
          isEditing: true,
          hasChanges: true
        }
      }
    }))
  }, [])

  // Función para guardar una card
  const saveCard = useCallback(async (cardId: string) => {
    if (!editState[cardId]) return false
    
    setSaving(true)
    try {
      const cardData = editState[cardId]
      const changedFields: Record<string, string> = {}
      
      // Recolectar campos cambiados
      Object.entries(cardData).forEach(([field, fieldState]) => {
        if (fieldState.hasChanges) {
          changedFields[field] = fieldState.value
        }
      })
      
      if (Object.keys(changedFields).length === 0) {
        addTestResult('Guardado', 'success', 'No hay cambios para guardar')
        return true
      }
      
      // Determinar tipo de card y ID
      const [cardType, id] = cardId.split('_')
      const numericId = parseInt(id)
      
      addTestResult('Guardado', 'pending', `Guardando cambios para ${cardType} ID ${id}...`)
      
      // Preparar request
      const request = {
        id: numericId,
        cardType: cardType === 'work' ? 'work_experience' : cardType,
        fields: changedFields
      }
      
      // Enviar request
      const response = await fetch('/api/work-experience/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      })
      
      const result = await response.json()
      
      if (result.success) {
        // Actualizar datos locales
        setData(prev => {
          if (!prev) return prev
          
          const newData = { ...prev }
          
          if (cardType === 'work') {
            const cardIndex = newData.workExperience.findIndex(card => card.id === numericId)
            if (cardIndex !== -1) {
              Object.entries(changedFields).forEach(([field, value]) => {
                (newData.workExperience[cardIndex] as any)[field] = value
              })
            }
          } else if (cardType === 'education') {
            const cardIndex = newData.education.findIndex(card => card.id === numericId)
            if (cardIndex !== -1) {
              Object.entries(changedFields).forEach(([field, value]) => {
                (newData.education[cardIndex] as any)[field] = value
              })
            }
          }
          
          return newData
        })
        
        // Resetear estado de edición
        setEditState(prev => ({
          ...prev,
          [cardId]: Object.keys(prev[cardId]).reduce((acc, field) => ({
            ...acc,
            [field]: {
              ...prev[cardId][field],
              isEditing: false,
              hasChanges: false
            }
          }), {})
        }))
        
        addTestResult('Guardado', 'success', `Card ${cardType} ID ${id} guardada correctamente`, changedFields)
        return true
      } else {
        throw new Error(result.error || 'Error al guardar')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      addTestResult('Guardado', 'error', `Error al guardar card: ${errorMessage}`)
      return false
    } finally {
      setSaving(false)
    }
  }, [editState, addTestResult])

  // Cargar datos al montar
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Función para ejecutar test completo
  const runFullTest = useCallback(async () => {
    setTestResults([])
    addTestResult('Test completo', 'pending', 'Iniciando test completo del sistema...')
    
    // Test 1: Cargar datos
    await fetchData()
    
    // Test 2: Simular edición
    if (data) {
      addTestResult('Simulación de edición', 'pending', 'Simulando edición de campos...')
      
      // Editar primera card de work experience
      if (data.workExperience.length > 0) {
        const firstCard = data.workExperience[0]
        const cardId = `work_${firstCard.id}`
        
        updateField(cardId, 'company_name', `${firstCard.company_name} [TEST]`)
        updateField(cardId, 'description', `${firstCard.description || ''} [TEST]`)
        
        addTestResult('Simulación de edición', 'success', `Campos editados para card ${firstCard.id}`)
        
        // Guardar cambios
        await saveCard(cardId)
      }
    }
    
    addTestResult('Test completo', 'success', 'Test completo finalizado')
  }, [data, fetchData, saveCard, updateField, addTestResult])

  if (loading) {
    return (
      <div className="text-center py-8">
        <UnifiedLoading />
        <p className="text-gray-600">Cargando datos de la base de datos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
        <button
          onClick={fetchData}
          className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={runFullTest}
          disabled={saving}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          🧪 Ejecutar Test Completo
        </button>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded"
        >
          {isEditing ? '🔒 Desactivar Edición' : '✏️ Activar Edición'}
        </button>
        <button
          onClick={() => setTestResults([])}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          🗑️ Limpiar Logs
        </button>
      </div>

      {/* Resultados de test */}
      <div className="bg-gray-100 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">📊 Resultados del Test</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {testResults.map((result) => (
            <div
              key={result.id}
              className={`p-3 rounded-lg border ${
                result.status === 'success' ? 'bg-green-50 border-green-200' :
                result.status === 'error' ? 'bg-red-50 border-red-200' :
                'bg-yellow-50 border-yellow-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{result.step}</span>
                <span className={`text-sm px-2 py-1 rounded ${
                  result.status === 'success' ? 'bg-green-200 text-green-800' :
                  result.status === 'error' ? 'bg-red-200 text-red-800' :
                  'bg-yellow-200 text-yellow-800'
                }`}>
                  {result.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{result.message}</p>
              {result.data && (
                <details className="mt-2">
                  <summary className="text-sm text-primary cursor-pointer">Ver datos</summary>
                  <pre className="text-xs bg-gray-200 p-2 rounded mt-1 overflow-x-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Cards de Work Experience */}
      {data && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">💼 Experiencia Laboral</h3>
          {data.workExperience.map((card) => {
            const cardId = `work_${card.id}`
            const cardEditState = editState[cardId] || {}
            const hasChanges = Object.values(cardEditState).some(field => field.hasChanges)
            
            return (
              <div key={card.id} className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold text-lg">{card.company_name}</h4>
                  {isEditing && hasChanges && (
                    <button
                      onClick={() => saveCard(cardId)}
                      disabled={saving}
                      className="bg-primary hover:bg-primary/80 text-white text-sm px-3 py-1 rounded disabled:opacity-50"
                    >
                      {saving ? 'Guardando...' : '💾 Guardar cambios'}
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Empresa
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={cardEditState.company_name?.value || card.company_name}
                        onChange={(e) => updateField(cardId, 'company_name', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                      />
                    ) : (
                      <p className="text-gray-800">{card.company_name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Puesto
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={cardEditState.job_title?.value || card.job_title}
                        onChange={(e) => updateField(cardId, 'job_title', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                      />
                    ) : (
                      <p className="text-gray-800">{card.job_title}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Año
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={cardEditState.year?.value || card.year}
                        onChange={(e) => updateField(cardId, 'year', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                      />
                    ) : (
                      <p className="text-gray-800">{card.year}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Descripción
                    </label>
                    {isEditing ? (
                      <textarea
                        value={cardEditState.description?.value || card.description || ''}
                        onChange={(e) => updateField(cardId, 'description', e.target.value)}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                      />
                    ) : (
                      <p className="text-gray-800">{card.description || 'Sin descripción'}</p>
                    )}
                  </div>
                </div>
                
                {hasChanges && (
                  <div className="mt-4 p-2 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-sm text-yellow-800">
                      ⚠️ Hay cambios sin guardar en esta card
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Cards de Educación */}
      {data && data.education.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">🎓 Educación</h3>
          {data.education.map((card) => {
            const cardId = `education_${card.id}`
            const cardEditState = editState[cardId] || {}
            const hasChanges = Object.values(cardEditState).some(field => field.hasChanges)
            
            return (
              <div key={card.id} className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold text-lg">{card.institution_name}</h4>
                  {isEditing && hasChanges && (
                    <button
                      onClick={() => saveCard(cardId)}
                      disabled={saving}
                      className="bg-primary hover:bg-primary/80 text-white text-sm px-3 py-1 rounded disabled:opacity-50"
                    >
                      {saving ? 'Guardando...' : '💾 Guardar cambios'}
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Institución
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={cardEditState.institution_name?.value || card.institution_name}
                        onChange={(e) => updateField(cardId, 'institution_name', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                      />
                    ) : (
                      <p className="text-gray-800">{card.institution_name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Título
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={cardEditState.degree_title?.value || card.degree_title}
                        onChange={(e) => updateField(cardId, 'degree_title', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                      />
                    ) : (
                      <p className="text-gray-800">{card.degree_title}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Año
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={cardEditState.year?.value || card.year}
                        onChange={(e) => updateField(cardId, 'year', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                      />
                    ) : (
                      <p className="text-gray-800">{card.year}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Descripción
                    </label>
                    {isEditing ? (
                      <textarea
                        value={cardEditState.description?.value || card.description || ''}
                        onChange={(e) => updateField(cardId, 'description', e.target.value)}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                      />
                    ) : (
                      <p className="text-gray-800">{card.description || 'Sin descripción'}</p>
                    )}
                  </div>
                </div>
                
                {hasChanges && (
                  <div className="mt-4 p-2 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-sm text-yellow-800">
                      ⚠️ Hay cambios sin guardar en esta card
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
