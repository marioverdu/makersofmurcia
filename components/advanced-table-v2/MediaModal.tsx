import React, { useState, useRef } from 'react';
import ConfirmableModal from '@/components/ui/ConfirmableModal';
import { PrimaryButton } from '@/components/ui/primary-button';
import { MediaItem } from '../../hooks/use-advanced-table-v2';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMedia: (item: Omit<MediaItem, 'id' | 'cellId'>) => void;
  cellId: string;
}

export const MediaModal: React.FC<MediaModalProps> = ({
  isOpen,
  onClose,
  onAddMedia,
  cellId
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'embed'>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [embedUrl, setEmbedUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleUploadSubmit = async () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    try {
      // Simular upload - en producción aquí iría la lógica real de upload
      const fakeUrl = URL.createObjectURL(uploadedFile);
      
      onAddMedia({
        type: uploadedFile.type.startsWith('image/') ? 'image' : 'file',
        url: fakeUrl,
        filename: uploadedFile.name,
        size: uploadedFile.size
      });
      
      onClose();
      setUploadedFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEmbedSubmit = () => {
    if (!embedUrl.trim()) return;
    
    onAddMedia({
      type: 'image',
      url: embedUrl.trim(),
      filename: 'Embedded Image'
    });
    
    onClose();
    setEmbedUrl('');
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <ConfirmableModal isOpen={isOpen} onClose={onClose} title="Insertar Media" className="w-full max-w-md mx-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'upload'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-600'
            }`}
          >
            Subir Archivo
          </button>
          <button
            onClick={() => setActiveTab('embed')}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'embed'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-600'
            }`}
          >
            Incrustar URL
          </button>
      </div>

      {/* Content */}
      <div className="p-4">
          {activeTab === 'upload' ? (
            <div className="space-y-4">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="mt-2 text-sm text-gray-600">
                  Arrastra un archivo aquí o haz clic para seleccionar
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                />
              </div>
              
              {uploadedFile && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">
                    <strong>Archivo seleccionado:</strong> {uploadedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Tamaño: {(uploadedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              )}
              
              <button
                onClick={handleEmbedSubmit}
                disabled={!embedUrl.trim()}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? 'Subiendo...' : 'Insertar Archivo'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  URL de la imagen
                </label>
                <input
                  type="url"
                  value={embedUrl}
                  onChange={(e) => setEmbedUrl(e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                />
              </div>
              
              <PrimaryButton
                onClick={handleEmbedSubmit}
                disabled={!embedUrl.trim()}
                className="w-full"
              >
                Incrustar Imagen
              </PrimaryButton>
            </div>
          )}
      </div>
    </ConfirmableModal>
  );
};

export default MediaModal;
