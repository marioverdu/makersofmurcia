import { redirect } from 'next/navigation'

export default function RootPage() {
  // Redirigir a la página raíz en español por defecto
  redirect('/es')
}
