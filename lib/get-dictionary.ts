import type { Locale } from '@/types/i18n'

const dictionaries = {
  es: () => import('@/app/dictionaries/es.json').then((module) => module.default),
  en: () => import('@/app/dictionaries/en.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  try {
    const dictionary = await dictionaries[locale]()
    return dictionary
  } catch (error) {
    console.error(`Error loading dictionary for locale ${locale}:`, error)
    // Fallback to Spanish if there's an error
    try {
      const fallbackDictionary = await dictionaries.es()
      return fallbackDictionary
    } catch (fallbackError) {
      console.error('Error loading fallback dictionary:', fallbackError)
      // Return a minimal dictionary to prevent crashes
      return {
        common: {
          loading: 'Cargando...',
          error: 'Error',
          notFound: 'No encontrado',
          back: 'Volver',
          next: 'Siguiente',
          previous: 'Anterior',
          save: 'Guardar',
          cancel: 'Cancelar',
          edit: 'Editar',
          delete: 'Eliminar',
          view: 'Ver',
          close: 'Cerrar',
          open: 'Abrir',
          search: 'Buscar',
          filter: 'Filtrar',
          sort: 'Ordenar',
          all: 'Todos',
          none: 'Ninguno',
          yes: 'Sí',
          no: 'No',
          ok: 'OK',
          submit: 'Enviar',
          reset: 'Resetear',
          confirm: 'Confirmar',
          dismiss: 'Descartar'
        },
        navigation: {
          home: 'Inicio',
          posts: 'Posts',
          workExperience: 'Experiencia',
          contact: 'Contacto',
          admin: 'Admin',
          login: 'Login',
          logout: 'Logout'
        },
        home: {
          title: 'Mario Verdú',
          subtitle: 'Desarrollo de producto digital',
          description: 'Desarrollo de producto digital alineado con tu visión de negocio'
        },
        posts: {
          title: 'Blog',
          subtitle: 'Artículos sobre desarrollo y tecnología',
          aboutMe: 'Sobre mí',
          search: 'Buscar posts...',
          noPosts: 'No hay posts disponibles',
          loading: 'Cargando posts...',
          error: 'Error al cargar posts',
          posts: 'Posts',
          pageUnderMaintenance: 'Página en mantenimiento',
          maintenanceMessage: 'Estamos trabajando para mejorar esta página.',
          hey: '¡Hola!',
          developmentMode: 'Modo desarrollo: Usando posts de muestra',
          productionInfo: 'En producción, esta página cargará posts desde la base de datos Neon.',
          notice: 'Nota:',
          samplePostsInfo: 'Se están mostrando posts de muestra mientras se resuelve el problema con la API.',
          checkApiFile: 'Verifica que existe el archivo app/api/posts/route.ts',
          musicUnlocked: '🎵 Música desbloqueada'
        }
      }
    }
  }
}
