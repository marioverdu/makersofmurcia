"use client"

// Estilos de animación para el efecto flotante
const floatingAnimations = `
  @keyframes float1 {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-4px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes float2 {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes float3 {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
    100% { transform: translateY(0px); }
  }
  
  .float-1 {
    animation: float1 9s ease-in-out infinite;
  }
  
  .float-2 {
    animation: float2 7s ease-in-out infinite;
  }
  
  .float-3 {
    animation: float3 10s ease-in-out infinite;
  }
`

interface MasterStackedImagesProps {
  className?: string
  width?: string // Ahora acepta valores como "50vw", "100%", etc.
  preset?: "home" | "default"
}

export function MasterStackedImages({ className = "", width = "100%", preset = "default" }: MasterStackedImagesProps) {
  // Determine if we're using the home preset
  const homePreset = preset === "home"

  // Remove bottom margin when used in contexts other than styleguide
  const marginClass = className.includes("order-") ? "" : "mb-8"

  return (
    <>
      <style jsx global>
        {floatingAnimations}
      </style>
      <div
        className={`rounded-[12px] overflow-hidden ${marginClass} relative ${className}`}
        style={{
          width: width,
          aspectRatio: "16/9",
          position: "relative",
          backgroundColor: "rgb(247, 248, 252)",
        }}
      >
        <div className="relative w-full h-full">
          {/* Image 10 - top right */}
          <img
            alt="Know your user 10 top right"
            className="absolute object-contain float-1"
            src="https://assets.marioverdu.com/landing/know-your-user/know-your-user-10.png"
            style={
              homePreset
                ? {
                    top: "-0.5%",
                    left: "calc(17% + 72px)",
                    width: "calc(82% - 72px - 1%)",
                    zIndex: 13,
                    height: "auto",
                    maxWidth: "none",
                    transformOrigin: "right top",
                  }
                : {
                    top: "-1%",
                    left: "calc(51% + 72px)",
                    width: "calc(47% - 72px)",
                    zIndex: 13,
                    height: "auto",
                    maxWidth: "none",
                    transformOrigin: "right top",
                  }
            }
          />

          {/* Image 7 - centered and down */}
          <img
            alt="Know your user 7 centered"
            className="absolute object-contain float-2"
            src="https://assets.marioverdu.com/landing/know-your-user/know-your-user-7.png"
            style={
              homePreset
                ? {
                    bottom: "-20px",
                    left: "35%",
                    transform: "translateX(0)",
                    width: "12%",
                    zIndex: 12,
                    height: "auto",
                    maxWidth: "none",
                  }
                : {
                    bottom: "-20px",
                    left: "35%",
                    transform: "translateX(0)",
                    width: "35%",
                    zIndex: 12,
                    height: "auto",
                    maxWidth: "none",
                  }
            }
          />

          {/* Image 6 - centered */}
          <img
            alt="Know your user 6 centered"
            className="absolute object-contain float-3"
            src="https://assets.marioverdu.com/landing/know-your-user/know-your-user-6.png"
            style={
              homePreset
                ? {
                    bottom: "30%", // Changed from 45% to 30% to move it more down
                    right: "35%", // Changed from 20% to 35% to move it more to the left
                    width: "9.6%",
                    zIndex: 11,
                    height: "auto",
                    maxWidth: "none",
                  }
                : {
                    bottom: "30%", // Changed from 45% to 30% to move it more down
                    right: "35%", // Changed from 20% to 35% to move it more to the left
                    width: "30.4%",
                    zIndex: 11,
                    height: "auto",
                    maxWidth: "none",
                  }
            }
          />

          {/* Image 8 - right */}
          <img
            alt="Know your user 8"
            className="absolute object-contain float-1"
            src="https://assets.marioverdu.com/landing/know-your-user/know-your-user-8.png"
            style={
              homePreset
                ? {
                    top: "20%",
                    left: "70%",
                    transform: "translate(-50%, -50%)",
                    width: "15%",
                    zIndex: 11,
                    height: "auto",
                    maxWidth: "none",
                  }
                : {
                    top: "20%",
                    left: "70%",
                    transform: "translate(-50%, -50%)",
                    width: "30%",
                    zIndex: 11,
                    height: "auto",
                    maxWidth: "none",
                  }
            }
          />

          {/* Image 9 - bottom right */}
          <img
            alt="Know your user 9"
            className="absolute object-contain float-2"
            src="https://assets.marioverdu.com/landing/know-your-user/know-your-user-9.png"
            style={
              homePreset
                ? {
                    top: "72%",
                    right: "calc(7% + 8px)",
                    width: "12%",
                    zIndex: 11,
                    height: "auto",
                    maxWidth: "none",
                    transform: "translate(0, -50%)",
                    transformOrigin: "right center",
                  }
                : {
                    top: "72%",
                    right: "calc(7% + 8px)",
                    width: "24%",
                    zIndex: 11,
                    height: "auto",
                    maxWidth: "none",
                    transform: "translate(0, -50%)",
                    transformOrigin: "right center",
                  }
            }
          />

          {/* Image 3 - far left */}
          <img
            alt="Know your user 3 centered"
            className="absolute object-contain float-3"
            src="https://assets.marioverdu.com/landing/know-your-user/know-your-user-3.png"
            style={
              homePreset
                ? {
                    top: "70%",
                    left: "2%",
                    width: "8%",
                    zIndex: 10,
                    height: "auto",
                    maxWidth: "none",
                  }
                : {
                    top: "70%",
                    left: "2%",
                    width: "25%",
                    zIndex: 10,
                    height: "auto",
                    maxWidth: "none",
                  }
            }
          />

          {/* Image 1 - top left */}
          <img
            alt="Know your user 1"
            className="absolute object-contain float-2"
            src="https://assets.marioverdu.com/landing/know-your-user/know-your-user-1.png"
            style={
              homePreset
                ? {
                    top: "calc(1% - 16px)",
                    left: "calc(1% - 16px)",
                    width: "16%",
                    height: "auto",
                    maxWidth: "none",
                    transformOrigin: "left top",
                  }
                : {
                    top: "calc(1% - 16px)",
                    left: "calc(1% - 16px)",
                    width: "50%",
                    height: "auto",
                    maxWidth: "none",
                    transformOrigin: "left top",
                  }
            }
          />

          {/* Image 2 - middle left */}
          <img
            alt="Know your user 2"
            className="absolute object-contain float-3"
            src="https://assets.marioverdu.com/landing/know-your-user/know-your-user-2.png"
            style={
              homePreset
                ? {
                    top: "15%",
                    left: "2%",
                    width: "8.4%",
                    height: "auto",
                    maxWidth: "none",
                    transformOrigin: "left top",
                  }
                : {
                    top: "30%",
                    left: "2%",
                    width: "28%",
                    height: "auto",
                    maxWidth: "none",
                    transformOrigin: "left top",
                  }
            }
          />

          {/* Image 3 bottom */}
          <img
            alt="Know your user 3"
            className="absolute object-contain float-1"
            src="https://assets.marioverdu.com/landing/know-your-user/know-your-user-3.png"
            style={
              homePreset
                ? {
                    top: "35%",
                    left: "1%",
                    width: "15%",
                    zIndex: 3,
                    height: "auto",
                    maxWidth: "none",
                    transformOrigin: "left top",
                  }
                : {
                    top: "80%",
                    left: "1%",
                    width: "50%",
                    zIndex: 3,
                    height: "auto",
                    maxWidth: "none",
                    transformOrigin: "left top",
                  }
            }
          />
        </div>
      </div>
    </>
  )
}
