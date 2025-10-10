"use client"

import React from 'react';
import dynamic from 'next/dynamic';

// Importar TipTap de forma completamente dinámica
const TipTapEditorCore = dynamic(() => import('./TipTapEditorCore'), {
  ssr: false,
  loading: () => <div className="w-full h-32 bg-gray-100 animate-pulse rounded flex items-center justify-center">
    <span className="text-gray-500">Cargando editor...</span>
  </div>
});

interface TipTapEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
}

const TipTapEditor: React.FC<TipTapEditorProps> = (props) => {
  // Solo renderizar en el cliente
  if (typeof window === 'undefined') {
    return (
      <div className={props.className}>
        <div className="w-full h-32 bg-gray-100 animate-pulse rounded flex items-center justify-center">
          <span className="text-gray-500">Cargando editor...</span>
        </div>
      </div>
    );
  }

  return <TipTapEditorCore {...props} />;
};

export default TipTapEditor;
