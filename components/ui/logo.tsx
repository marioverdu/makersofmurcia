interface LogoProps {
  width?: number
  height?: number
  className?: string
}

export function Logo({ width = 56, height = 56, className = "" }: LogoProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width, height }}>
      <div className="w-full h-full flex items-center justify-center bg-[#3D5B6A]/10 rounded-md">
        <span className="text-[#3D5B6A] font-bold">MV</span>
      </div>
    </div>
  )
}
