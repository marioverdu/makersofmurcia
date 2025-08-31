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
        contact: {
          title: 'Contacto',
          subtitle: '¿Tienes un proyecto en mente? Hablemos',
          name: 'Nombre',
          email: 'Email',
          message: 'Mensaje',
          send: 'Enviar mensaje',
          sending: 'Enviando...',
          sent: 'Mensaje enviado',
          error: 'Error al enviar mensaje',
          phone: 'Teléfono',
          subject: 'Asunto',
          required: 'Campo requerido',
          invalidEmail: 'Email inválido',
          success: '¡Gracias por tu mensaje! Te responderé pronto.'
        },
        posts: {
          title: 'Blog y contenido',
          subtitle: 'Artículos y recursos sobre desarrollo digital',
          readMore: 'Leer más',
          publishedOn: 'Publicado el',
          author: 'Autor',
          tags: 'Etiquetas',
          categories: 'Categorías',
          search: 'Buscar posts...',
          noPosts: 'No hay posts disponibles',
          loading: 'Cargando posts...',
          error: 'Error al cargar posts',
          posts: 'Posts',
          aboutMe: 'Sobre mi',
          uiDeveloper: 'Frontend Developer (Next.js / React)',
          hey: '¡Hey!',
          musicUnlocked: '¡Música desbloqueada!',
          developmentMode: 'Modo desarrollo: Usando posts de muestra',
          productionInfo: 'En producción, esta página cargará posts desde la base de datos Neon.',
          notice: 'Aviso:',
          samplePostsInfo: 'Se están mostrando posts de muestra mientras se resuelve el problema con la API.',
          possibleSolutions: 'Posibles soluciones:',
          checkApiFile: 'Verifica que existe el archivo app/api/posts/route.ts',
          ensureJsonResponse: 'Asegúrate de que la API devuelve un objeto JSON válido',
          checkNeonConnection: 'Comprueba la conexión con la base de datos Neon',
          pageUnderMaintenance: 'Página en Mantenimiento',
          maintenanceMessage: 'Disculpa las molestias, estamos trabajando para mejorar.'
        }
      }
    }
  }
}
