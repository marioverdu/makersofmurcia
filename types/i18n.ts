export type Locale = 'es' | 'en'

export interface Dictionary {
  common: {
    loading: string
    error: string
    notFound: string
    back: string
    next: string
    previous: string
    save: string
    cancel: string
    edit: string
    delete: string
    view: string
    close: string
    open: string
    search: string
    filter: string
    sort: string
    all: string
    none: string
    yes: string
    no: string
    ok: string
    submit: string
    reset: string
    confirm: string
    dismiss: string
  }
  navigation: {
    home: string
    posts: string
    workExperience: string
    contact: string
    admin: string
    login: string
    logout: string
  }
  home: {
    title: string
    subtitle: string
    description: string
    hero: {
      title: string
      subtitle: string
      cta: string
      learnMore: string
    }
    services: {
      title: string
      uxui: string
      web: string
      mobile: string
      consulting: string
    }
    about: {
      title: string
      description: string
    }
    sections: {
      randomTexts: string[]
      hero: {
        firstText: string
        secondText: string
      }
      mainTitle: string
      subtitle: string
      userUnderstanding: {
        badge: string
        title: string
        description: string
      }
      solutionDesign: {
        badge: string
        title: string
        description: string
      }
      testingLaunch: {
        badge: string
        title: string
        description: string
      }
      deploying: string
      cta: string
    }
  }
  posts: {
    title: string
    subtitle: string
    readMore: string
    publishedOn: string
    author: string
    tags: string
    categories: string
    search: string
    noPosts: string
    loading: string
    error: string
    posts: string
    aboutMe: string
    uiDeveloper: string
    hey: string
    musicUnlocked: string
    developmentMode: string
    productionInfo: string
    notice: string
    samplePostsInfo: string
    possibleSolutions: string
    checkApiFile: string
    ensureJsonResponse: string
    checkNeonConnection: string
    pageUnderMaintenance: string
    maintenanceMessage: string
  }
  workExperience: {
    title: string
    subtitle: string
    experience: string
    education: string
    skills: string
    projects: string
    current: string
    previous: string
    years: string
    months: string
    days: string
    technologies: string
    responsibilities: string
    achievements: string
    company: string
    position: string
    duration: string
    location: string
    description: string
  }
  contact: {
    title: string
    subtitle: string
    name: string
    email: string
    message: string
    send: string
    sending: string
    sent: string
    error: string
    phone: string
    subject: string
    required: string
    invalidEmail: string
    success: string
  }
  admin: {
    title: string
    dashboard: string
    posts: string
    routes: string
    analytics: string
    booking: string
    users: string
    settings: string
    logout: string
    protected: string
    unauthorized: string
  }
  footer: {
    copyright: string
    privacy: string
    terms: string
    contact: string
  }
}
