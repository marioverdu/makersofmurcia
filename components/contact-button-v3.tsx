"use client"

interface ContactButtonV3Props {
  onClick?: () => void
  className?: string
  alt?: string
}

export function ContactButtonV3({ onClick, className = "", alt = "Contact" }: ContactButtonV3Props) {
  return (
    <button
      onClick={onClick}
      className={`w-[132px] h-[41px] px-4 py-2 bg-[#3D5B6A] text-white text-[15.2px] font-medium rounded-[6px] whitespace-nowrap relative before:absolute before:content-[''] before:rounded-[6px] before:border-2 before:border-[hsl(206,1%,27%)] before:-top-[3px] before:-left-[3px] before:-right-[3px] before:-bottom-[3px] before:opacity-0 hover:before:opacity-100 before:transition-opacity ${className}`}
    >
      {alt}
    </button>
  )
}
