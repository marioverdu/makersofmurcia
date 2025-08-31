import React from "react";

interface ChatTuentiButtonMasterProps {
  isOpen: boolean;
  onClick: () => void;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
}

const getPositionStyle = (position: string = "bottom-right") => {
  switch (position) {
    case "bottom-left":
      return { bottom: 14, left: 14 };
    case "top-right":
      return { top: 14, right: 14 };
    case "top-left":
      return { top: 14, left: 14 };
    case "bottom-right":
    default:
      return { bottom: 14, right: 14 };
  }
};

const ChatTuentiButtonMaster: React.FC<ChatTuentiButtonMasterProps> = ({
  isOpen,
  onClick,
  position = "bottom-right",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`fixed z-[1000] w-9 h-9 bg-transparent rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${className}`}
      style={getPositionStyle(position)}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {isOpen ? (
        <img
          src="https://assets.marioverdu.com/button/chat/chat-close.svg"
          alt="Cerrar chat Tuenti"
          className="w-9 h-9 object-contain"
          draggable="false"
        />
      ) : (
        <img
          src="https://assets.marioverdu.com/button/chat/chat-tuenti-button.svg"
          alt="Abrir chat Tuenti"
          className="w-9 h-9 object-contain"
          draggable="false"
        />
      )}
    </button>
  );
};

export default ChatTuentiButtonMaster;
