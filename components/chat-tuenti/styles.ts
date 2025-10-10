export const chatStyles = `
@keyframes msn-blink {
  0%, 49% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0;
  }
}

.msn-blinking {
  animation: msn-blink 1s steps(1) infinite;
}

@keyframes blink {
  0% {
    opacity: 0.2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}

.typing-indicator {
  display: inline-block;
  font-style: italic;
  color: #666;
  font-weight: 500;
}

.typing-indicator::after {
  content: "...";
  animation: blink 1.4s infinite both;
  font-weight: bold;
}

.chat-tuenti-window {
  transition: all 0.3s ease-in-out;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.chat-tuenti-window.hidden {
  transform: translateY(4px);
  opacity: 0;
  pointer-events: none;
}

/* Estilos para manejar el teclado virtual */
@media screen and (max-width: 767px) {
  .chat-tuenti-window.keyboard-open {
    height: 50vh !important;
    max-height: 50vh !important;
  }
}

/* Estilos adicionales para el chat */
.message-container {
  display: flex;
  flex-direction: column;
}

.message-iframe {
  background-color: transparent;
  padding: 0;
  overflow: hidden;
  border-radius: 8px;
}

.quick-replies {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.quick-reply-button {
  padding: 8px 16px;
  font-size: 14px;
  border: 1px solid #dedede;
  border-radius: 6px;
  color: #333333;
  background-color: transparent;
  transition: all 0.2s ease;
  cursor: pointer;
}

.quick-reply-button:hover, .quick-reply-button:focus {
  background-color: transparent;
  border-color: #518b0d;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.quick-reply-option {
  background-color: transparent !important;
  color: #333333;
}

.quick-reply-option:hover, .quick-reply-option:focus {
  background-color: transparent !important;
  border-color: #518b0d;
}

.typing-indicator-container {
  color: #333333;
  font-size: 14px;
}

/* Estilos para el área de mensajes */
.chat-messages {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #F9FCFF !important;
  scrollbar-width: thin;
  scrollbar-color: rgba(61, 91, 106, 0.3) transparent;
}

.chat-messages::-webkit-scrollbar {
  width: 4px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: rgba(61, 91, 106, 0.3);
  border-radius: 2px;
}

/* Contenedor de mensaje */
.message-container {
  display: flex;
  flex-direction: column;
}

/* Contenedor de mensaje del usuario */
.user-container {
  align-items: flex-end;
}

/* Contenedor de mensaje del asistente */
.assistant-container {
  max-width: 80%;
}

/* Nombre del asistente */
.assistant-name {
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 14px;
  color: #333333;
}

/* Burbuja de mensaje base */
.message-bubble {
  padding: 12px;
  font-size: 14px;
  max-width: 80%;
  border-radius: 12px;
}

/* Burbuja de mensaje del usuario */
.user-bubble {
  background-color: #518b0d;
  color: white;
  border-top-right-radius: 0;
}

/* Burbuja de mensaje del asistente */
.assistant-bubble {
  background-color: #e2e8f0;
  color: #333333;
  border-top-left-radius: 0;
}

/* Mensaje del sistema */
.system-message {
  background-color: transparent;
  border: none !important;
  border-radius: 8px;
  padding: 10px 12px;
  margin: 8px 0;
  text-align: center;
  font-size: 13px;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  max-width: 100%;
}

.system-message svg {
  flex-shrink: 0;
}

.quick-reply-container {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  /* Eliminar max-height y overflow para que no haya scroll interno */
  max-height: none !important;
  overflow-y: visible !important;
}

.systeminfochat, .systeminfochat .whitespace-pre-wrap {
  max-height: none !important;
  overflow: visible !important;
}

.quick-reply-button, .quick-reply-option {
  border: none !important;
  width: 182px !important; /* Ancho fijo para todas las quick replies del sistema */
  min-width: 182px !important;
  max-width: 182px !important;
  box-sizing: border-box;
  display: block;
  margin-left: 0;
  margin-right: 0;
}

`;
