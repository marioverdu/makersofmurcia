import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white bg-opacity-90 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-[1000px] mx-auto py-4 flex justify-between items-center px-4 md:px-[60px]">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src="https://assets.marioverdu.com/avatar/avatar-2.webp"
              alt="Mario Verdú"
              fill
              className="object-cover"
            />
          </div>
          <span className="font-semibold text-lg">Mario Verdú</span>
        </Link>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-gray-600 hover:text-cyan-600 transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/posts" className="text-gray-600 hover:text-cyan-600 transition-colors font-medium">
                Posts
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-600 hover:text-cyan-600 transition-colors">
                Sobre mí
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
