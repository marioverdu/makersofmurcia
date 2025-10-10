export function TypingIndicator() {
  return (
    <div
      className="userbubblemaster max-w-[95%] shadow-sm p-0 flex items-center justify-center border border-gray-100 backdrop-blur-sm"
      style={{
        background: 'rgba(255,255,255,0.80)',
        borderTopLeftRadius: 2, // esquina especial
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 8,
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      <div className="flex items-center justify-center gap-1 w-full" style={{ minWidth: 32, minHeight: 16, width: 32, height: 16 }}>
        <span className="w-2 h-2 bg-[#3D5B6A] rounded-full typing-dot" style={{ animationDelay: '0s' }}></span>
        <span className="w-2 h-2 bg-[#3D5B6A] rounded-full typing-dot" style={{ animationDelay: '0.15s' }}></span>
        <span className="w-2 h-2 bg-[#3D5B6A] rounded-full typing-dot" style={{ animationDelay: '0.3s' }}></span>
      </div>
      <style jsx>{`
        .typing-dot {
          display: inline-block;
          animation: messenger-typing 1.2s infinite cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes messenger-typing {
          0% { transform: translateY(0); opacity: 0.5; }
          20% { transform: translateY(-5px); opacity: 1; }
          40% { transform: translateY(0); opacity: 0.5; }
          100% { transform: translateY(0); opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
