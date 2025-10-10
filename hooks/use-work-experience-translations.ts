import { useLanguage } from '@/contexts/language-context'

export interface WorkExperienceTranslations {
  // Secciones principales
  aboutMe: string
  workExperience: string
  education: string
  pinned: string
  
  // Descripción sobre mí
  aboutMeDescription: string
  
  // Experiencia laboral
  fullStackDeveloper: string
  simpleCMSDescription: string
  comingSoon: string
  
  // Proqio
  proqioDescription: string
  proqioInfoArchitecture: string
  proqioComponentResearch: string
  proqioDesignSystemRedesign: string
  proqioComponentDefinition: string
  proqioUserFlowImprovement: string
  proqioTailwindUITranslation: string
  
  // Status Pilot
  statusPilotDescription: string
  requirements: string
  requirementsGathering: string
  wireframing: string
  userFlowDefinition: string
  interactivePrototype: string
  exportableStyleGuide: string
  designSystemDefinition: string
  screenComponentization: string
  dimensionsSpacingReview: string
  accessibleDocumentation: string
  
  // Leverade
  leveradeDescription: string
  marketResearch: string
  continuousValidation: string
  brandAssetsHomogenization: string
  uxuiDesign: string
  designSystemUIDefinition: string
  versionControl: string
  styleGuideGeneration: string
  
  // Digio Soluciones
  digioDescription: string
  requirementsCommunication: string
  documentationInfoArchitecture: string
  uxDesign: string
  uiDesign: string
  designSystemMaintenance: string
  styleGuideAssetsGeneration: string
  highLowFidelityPrototyping: string
  testingBugReporting: string
  
  // marioverdu.com portfolio
  portfolioDescription: string
  
  // Portfolio projects
  dailyWine: string
  portfolioRedesign: string
  dainappRedesign: string
  savetechUITest: string
  readCvForkUI: string
  vapeShopUI: string
  youflixUIConcept: string
  nameUpConcept: string
  newsbotUIConcept: string
  universityAppUIConcept: string
  
  // Educación
  drivingLicense: string
  uxuiBootcamp: string
  advertisingPR: string
  
  // Botones y acciones
  downloadPDF: string
  seeMore: string
  seeLess: string
  
  // Estados de carga
  loading: string
  
  // Títulos de trabajo
  uxuiDesigner: string
  graphicDesigner: string
  
  // Portfolio intro
  portfolioIntro: string
}

const workExperienceTranslations: Record<string, WorkExperienceTranslations> = {
  es: {
    // Secciones principales
    aboutMe: 'Sobre mí',
    workExperience: 'Experiencia laboral',
    education: 'Educación',
    pinned: 'Anclado',
    
    // Descripción sobre mí
    aboutMeDescription: 'Desde 2017 diseño, valido, itero y prototipo productos digitales limpios, vibrantes y funcionales alineados con el negocio.',
    
    // Experiencia laboral
    fullStackDeveloper: 'Desarrollador Full stack',
    simpleCMSDescription: 'Gestor de contenidos SaaS que digitaliza, que te asiste en la digitalización de tu negocio como freelance con una curva de aprendizaje mínima y construido bajo su propio sistema de diseño propio mantenible en el tiempo.',
    comingSoon: 'Próximamente',
    
    // Proqio
    proqioDescription: 'En Proqio, trabajé en mejorar la arquitectura de información y homogeneizar patrones de diseño para su CRM y gestor de sensores.',
    proqioInfoArchitecture: 'Mejora de Arquitectura de Información - Detalles sobre reestructuración de arquitectura de información',
    proqioComponentResearch: 'Investigación de Componentes - Investigación sobre componentes esenciales',
    proqioDesignSystemRedesign: 'Rediseño del Sistema de Diseño - Mejora de consistencia y usabilidad',
    proqioComponentDefinition: 'Definición de Componentes - Desarrollo de componentes escalables',
    proqioUserFlowImprovement: 'Mejora de Flujo de Usuario y Arquitectura de Información - Abordaje de puntos de dolor',
    proqioTailwindUITranslation: 'Traducción de Bibliotecas TailwindUI a Sistema de Diseño - Aceleración de consistencia en desarrollo',
    
    // Status Pilot
    statusPilotDescription: 'En este MVP, tuve la oportunidad de diseñar de forma asíncrona según los requisitos de comportamiento de sus usuarios y los comportamientos de uso de su categoría de producto. Fue una experiencia excelente trabajando estrechamente con Brad Adams.',
    requirements: 'Requisitos:',
    requirementsGathering: 'Recopilación de Requisitos - Análisis de fortalezas y debilidades',
    wireframing: 'Wireframing - Creación de pantallas de baja y alta fidelidad',
    userFlowDefinition: 'Definición de Flujo de Usuario y Comportamiento - Establecimiento de flujos de usuario',
    interactivePrototype: 'Prototipo Interactivo en Figma - Desarrollo de prototipo interactivo',
    exportableStyleGuide: 'Guía de Estilo Exportable - Creación de guía de estilo',
    designSystemDefinition: 'Definición de Sistema de Diseño y Guía de Marca - Definición del sistema de diseño',
    screenComponentization: 'Componentización de Pantallas - Estilización y componentización de pantallas',
    dimensionsSpacingReview: 'Dimensiones, Espaciado y Revisión - Especificación de tamaños y espaciado',
    accessibleDocumentation: 'Documentación Accesible - Producción de documentación organizada',
    
    // Leverade
    leveradeDescription: 'En Leverade, diseñé soluciones de interfaz, visuales y de experiencia de usuario para sus diferentes líneas de productos, adaptándome al stack existente según las oportunidades que surgían entre los equipos de negocio, desarrollo y soporte.',
    marketResearch: 'Investigación de Mercado y Competencia - Análisis de mercado',
    continuousValidation: 'Validación Continua de Requisitos - Documentación de referencias visuales',
    brandAssetsHomogenization: 'Homogeneización de Assets de Marca - Estandarización de assets de marca',
    uxuiDesign: 'Diseño UX/UI - Flujos de usuario y prototipos',
    designSystemUIDefinition: 'Definición de Sistema de Diseño UI - Definición de sistemas de diseño escalables',
    versionControl: 'Control de Versiones y Mantenimiento del Sistema de Diseño - Control de versiones',
    styleGuideGeneration: 'Generación de Guía de Estilo y Assets - Atributos de marca',
    
    // Digio Soluciones
    digioDescription: 'Propuse 9 soluciones de interfaz y experiencia adaptadas a los requisitos de cada cliente. En Digio, pude involucrarme en todas las fases del proceso de diseño de producto ya que traté con clientes con necesidades y tecnologías diversas.',
    requirementsCommunication: 'Comunicación de Requisitos - Recopilación de requisitos',
    documentationInfoArchitecture: 'Documentación y Arquitectura de Información - Arquitectura de información',
    uxDesign: 'Diseño UX - Procesos de experiencia de usuario',
    uiDesign: 'Diseño UI - Sistemas de diseño escalables',
    designSystemMaintenance: 'Mantenimiento del Sistema de Diseño - Convenciones de nomenclatura',
    styleGuideAssetsGeneration: 'Generación de Guía de Estilo y Assets - Atributos de marca',
    highLowFidelityPrototyping: 'Prototipado de Alta y Baja Fidelidad - Prototipos interactivos',
    testingBugReporting: 'Pruebas, Reporte de Bugs y Soporte - Pruebas y reporte de errores',
    
    // marioverdu.com portfolio
    portfolioDescription: 'Portafolio de proyectos seleccionados a lo largo de diferentes años.',
    
    // Portfolio projects
    dailyWine: 'Daily Wine, UX/UI',
    portfolioRedesign: 'Rediseño de portafolio, UX/UI.',
    dainappRedesign: 'Dainapp, Rediseño.',
    savetechUITest: 'Savetech, UI, Prueba técnica',
    readCvForkUI: 'Read.Cv Fork, UI.',
    vapeShopUI: 'Vape Shop, UI',
    youflixUIConcept: 'Youflix, UI, Concepto',
    nameUpConcept: 'NameUp, Concepto.',
    newsbotUIConcept: 'Newsbot, UI, Concepto',
    universityAppUIConcept: 'App Universitaria, UI, Concepto',
    
    // Educación
    drivingLicense: 'Licencia de conducir',
    uxuiBootcamp: 'UX/UI Design Bootcamp',
    advertisingPR: 'Publicidad y RRPP',
    
    // Botones y acciones
    downloadPDF: 'Descargar PDF',
    seeMore: 'Ver más',
    seeLess: 'Ver menos',
    
    // Estados de carga
    loading: 'Cargando...',
    
    // Títulos de trabajo
    uxuiDesigner: 'Diseñador UX/UI',
    graphicDesigner: 'Diseñador gráfico',
    
    // Portfolio intro
    portfolioIntro: 'Portafolio de proyectos seleccionados a lo largo de diferentes años.'
  },
  en: {
    // Secciones principales
    aboutMe: 'About me',
    workExperience: 'Work experience',
    education: 'Education',
    pinned: 'Pinned',
    
    // Descripción sobre mí
    aboutMeDescription: 'Since 2017 I design, validate, iterate and prototype clean, vibrant and functional digital products aligned with business.',
    
    // Experiencia laboral
    fullStackDeveloper: 'Full Stack Developer',
    simpleCMSDescription: 'SaaS content manager that digitizes, assists you in digitizing your business as a freelancer with minimal learning curve and built under its own maintainable design system over time.',
    comingSoon: 'Coming soon',
    
    // Proqio
    proqioDescription: 'At Proqio, I worked on improving information architecture and homogenizing design patterns for their CRM and sensor manager.',
    proqioInfoArchitecture: 'Information Architecture Improvement - Details on information architecture restructuring',
    proqioComponentResearch: 'Component Research - Research on essential components',
    proqioDesignSystemRedesign: 'Design System Redesign - Consistency and usability improvement',
    proqioComponentDefinition: 'Component Definition - Scalable component development',
    proqioUserFlowImprovement: 'User Flow and Information Architecture Improvement - Addressing pain points',
    proqioTailwindUITranslation: 'TailwindUI Libraries Translation to Design System - Development consistency acceleration',
    
    // Status Pilot
    statusPilotDescription: 'In this MVP, I had the opportunity to design asynchronously according to the behavioral requirements of their users and the usage behaviors of their product category. It was an excellent experience working closely with Brad Adams.',
    requirements: 'Requirements:',
    requirementsGathering: 'Requirements Gathering - Strengths and weaknesses analysis',
    wireframing: 'Wireframing - Low and high fidelity screen creation',
    userFlowDefinition: 'User Flow and Behavior Definition - User flow establishment',
    interactivePrototype: 'Interactive Prototype in Figma - Interactive prototype development',
    exportableStyleGuide: 'Exportable Style Guide - Style guide creation',
    designSystemDefinition: 'Design System and Brand Guide Definition - Design system definition',
    screenComponentization: 'Screen Componentization - Screen styling and componentization',
    dimensionsSpacingReview: 'Dimensions, Spacing and Review - Size and spacing specification',
    accessibleDocumentation: 'Accessible Documentation - Organized documentation production',
    
    // Leverade
    leveradeDescription: 'At Leverade, I designed interface, visual and user experience solutions for their different product lines, adapting to the existing stack according to opportunities that arose between business, development and support teams.',
    marketResearch: 'Market and Competition Research - Market analysis',
    continuousValidation: 'Continuous Requirements Validation - Visual reference documentation',
    brandAssetsHomogenization: 'Brand Assets Homogenization - Brand asset standardization',
    uxuiDesign: 'UX/UI Design - User flows and prototypes',
    designSystemUIDefinition: 'UI Design System Definition - Scalable design system definition',
    versionControl: 'Version Control and Design System Maintenance - Version control',
    styleGuideGeneration: 'Style Guide and Assets Generation - Brand attributes',
    
    // Digio Soluciones
    digioDescription: 'I proposed 9 interface and experience solutions adapted to each client\'s requirements. At Digio, I was able to get involved in all phases of the product design process as I dealt with clients with diverse needs and technologies.',
    requirementsCommunication: 'Requirements Communication - Requirements gathering',
    documentationInfoArchitecture: 'Documentation and Information Architecture - Information architecture',
    uxDesign: 'UX Design - User experience processes',
    uiDesign: 'UI Design - Scalable design systems',
    designSystemMaintenance: 'Design System Maintenance - Naming conventions',
    styleGuideAssetsGeneration: 'Style Guide and Assets Generation - Brand attributes',
    highLowFidelityPrototyping: 'High and Low Fidelity Prototyping - Interactive prototypes',
    testingBugReporting: 'Testing, Bug Reporting and Support - Testing and error reporting',
    
    // marioverdu.com portfolio
    portfolioDescription: 'Portfolio of selected projects throughout different years.',
    
    // Portfolio projects
    dailyWine: 'Daily Wine, UX/UI',
    portfolioRedesign: 'Portfolio redesign, UX/UI.',
    dainappRedesign: 'Dainapp, Redesign.',
    savetechUITest: 'Savetech, UI, Technical test',
    readCvForkUI: 'Read.Cv Fork, UI.',
    vapeShopUI: 'Vape Shop, UI',
    youflixUIConcept: 'Youflix, UI, Concept',
    nameUpConcept: 'NameUp, Concept.',
    newsbotUIConcept: 'Newsbot, UI, Concept',
    universityAppUIConcept: 'University App, UI, Concept',
    
    // Educación
    drivingLicense: 'Driving license',
    uxuiBootcamp: 'UX/UI Design Bootcamp',
    advertisingPR: 'Advertising and PR',
    
    // Botones y acciones
    downloadPDF: 'Download PDF',
    seeMore: 'See more',
    seeLess: 'See less',
    
    // Estados de carga
    loading: 'Loading...',
    
    // Títulos de trabajo
    uxuiDesigner: 'UX/UI Designer',
    graphicDesigner: 'Graphic Designer',
    
    // Portfolio intro
    portfolioIntro: 'Portfolio of selected projects throughout different years.'
  }
}

export function useWorkExperienceTranslations(lang?: string): WorkExperienceTranslations {
  const { currentLanguage } = useLanguage()
  const language = lang || currentLanguage || 'es'
  return workExperienceTranslations[language] || workExperienceTranslations.es
}