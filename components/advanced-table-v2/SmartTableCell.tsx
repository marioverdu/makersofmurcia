import React, { useState, useRef, useEffect } from 'react';
import { MediaItem } from '../../hooks/use-advanced-table-v2';

interface SmartTableCellProps {
  children: React.ReactNode;
  cellId: string;
  onAddMedia: (cellId: string) => void;
  mediaItems: MediaItem[];
  onRemoveMedia?: (mediaId: string) => void;
  className?: string;
}

export const SmartTableCell: React.FC<SmartTableCellProps> = ({
  children,
  cellId,
  onAddMedia,
  mediaItems,
  onRemoveMedia,
  className = ''
}) => {
  const [showMediaButton, setShowMediaButton] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cellRef = useRef<HTMLTableCellElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const cellMedia = mediaItems.filter(item => item.cellId === cellId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cellRef.current && !cellRef.current.contains(event.target as Node)) {
        setShowMediaButton(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCellClick = () => {
    setShowMediaButton(true);
  };

  const handleMediaButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddMedia(cellId);
  };

  const handleRemoveMedia = (e: React.MouseEvent, mediaId: string) => {
    e.stopPropagation();
    onRemoveMedia?.(mediaId);
  };

  return (
    <td
      ref={cellRef}
      className={`relative group ${className}`}
      onClick={handleCellClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Contenido de texto */}
      <div className="min-h-[24px]">
        {children}
      </div>

      {/* Media items */}
      {cellMedia.length > 0 && (
        <div className="mt-2 space-y-2">
          {cellMedia.map((media) => (
            <div key={media.id} className="relative group/media">
              {media.type === 'image' ? (
                <img
                  src={media.url}
                  alt={media.filename}
                  className="max-w-full h-auto max-h-16 sm:max-h-20 md:max-h-24 lg:max-h-32 min-w-[92px] rounded border border-gray-200"
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm text-gray-600 truncate">{media.filename}</span>
                </div>
              )}
              
              {/* Remove button */}
              {onRemoveMedia && (
                <button
                  onClick={(e) => handleRemoveMedia(e, media.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover/media:opacity-100 transition-opacity text-xs hover:bg-red-600"
                  title="Eliminar media"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Botón + para media */}
      {(isHovered || showMediaButton) && (
        <button
          ref={buttonRef}
          onClick={handleMediaButtonClick}
                      className="absolute -right-2 -top-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-primary/80 transition-colors shadow-lg z-10"
          title="Insertar media"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      )}
    </td>
  );
};

export default SmartTableCell;
