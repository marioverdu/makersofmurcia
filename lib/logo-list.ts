// Lista de logos disponibles en https://assets.marioverdu.com/logo/
export const LOGO_LIST = [
  {
    id: 1,
    name: "????",
    url: "https://assets.marioverdu.com/logo/12.png",
    filename: "12.png"
  },
  {
    id: 2,
    name: "IronHack",
    url: "https://assets.marioverdu.com/logo/4.png",
    filename: "4.png"
  },
  {
    id: 3,
    name: "UMU",
    url: "https://assets.marioverdu.com/logo/2.png",
    filename: "2.png"
  },
  {
    id: 4,
    name: "UMU",
    url: "https://assets.marioverdu.com/logo/3.png",
    filename: "3.png"
  },
  {
    id: 5,
    name: "Proqio",
    url: "https://assets.marioverdu.com/logo/8.png",
    filename: "8.png"
  },
  {
    id: 6,
    name: "Status Pilot",
    url: "https://assets.marioverdu.com/logo/7.png",
    filename: "7.png"
  },
  {
    id: 7,
    name: "Leverade",
    url: "https://assets.marioverdu.com/logo/9.png",
    filename: "9.png"
  },
  {
    id: 8,
    name: "Digio Soluciones",
    url: "https://assets.marioverdu.com/logo/10.png",
    filename: "10.png"
  },
  {
    id: 9,
    name: "Empty",
    url: "https://assets.marioverdu.com/logo/empty.png",
    filename: "empty.png"
  },
  {
    id: 10,
    name: "Autoescuela Nueva Cosmos",
    url: "https://assets.marioverdu.com/logo/12.png",
    filename: "12.png"
  }
]

// Función para obtener logo por ID
export const getLogoById = (id: number) => {
  return LOGO_LIST.find(logo => logo.id === id)
}

// Función para obtener logo por URL
export const getLogoByUrl = (url: string) => {
  return LOGO_LIST.find(logo => logo.url === url)
}

// Función para obtener logo por filename
export const getLogoByFilename = (filename: string) => {
  return LOGO_LIST.find(logo => logo.filename === filename)
}
