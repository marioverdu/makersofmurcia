"use client"

import { useState, useEffect } from 'react'

export interface AboutMe {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface WorkExperience {
  id: number;
  company_name: string;
  job_title: string;
  year: string;
  description: string;
  detailed_content: string;
  logo_url: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface PortfolioProject {
  id: number;
  project_name: string;
  job_title: string;
  year: string;
  description: string;
  detailed_content: string;
  logo_url: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: number;
  institution_name: string;
  degree_title: string;
  year: string;
  description: string;
  detailed_content: string;
  logo_url: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface WorkExperienceData {
  aboutMe: AboutMe | null;
  workExperience: WorkExperience[];
  portfolioProjects: PortfolioProject[];
  education: Education[];
}

export function useWorkExperienceData() {
  const [data, setData] = useState<WorkExperienceData>({
    aboutMe: null,
    workExperience: [],
    portfolioProjects: [],
    education: []
  })
  const [loading, setLoading] = useState(typeof window !== 'undefined')
  const [error, setError] = useState<string | null>(null)

  // Función para cargar datos desde la API
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/work-experience')
      const result = await response.json()
      
      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error || 'Error al cargar los datos')
      }
    } catch (err) {
      console.error('Error fetching work experience data:', err)
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  // Función para actualizar datos
  const updateData = async (cardType: string, id: number, field: string, value: string) => {
    try {
      let endpoint: string
      
      switch (cardType) {
        case 'aboutMe':
          endpoint = '/api/work-experience/about-me'
          break
        case 'workExperience':
          endpoint = '/api/work-experience/work-experience'
          break
        case 'portfolioProjects':
          endpoint = '/api/work-experience/portfolio-projects'
          break
        case 'education':
          endpoint = '/api/work-experience/education'
          break
        default:
          throw new Error(`Tipo de card no válido: ${cardType}`)
      }
      
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          [field]: value
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        // Recargar los datos para obtener la versión actualizada
        await fetchData()
        return { success: true }
      } else {
        throw new Error(result.error || 'Error al actualizar')
      }
    } catch (err) {
      console.error('Error updating data:', err)
      return { success: false, error: err instanceof Error ? err.message : 'Error desconocido' }
    }
  }

  // Cargar datos al montar el componente (solo en cliente)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchData()
    }
  }, [])

  return {
    data,
    loading,
    error,
    updateData,
    refetch: fetchData
  }
}
