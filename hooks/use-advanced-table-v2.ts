import { useState, useCallback } from 'react';

export interface TableConfig {
  rows: number;
  cols: number;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'file';
  url: string;
  filename: string;
  size?: number;
  cellId: string;
}

export interface UseAdvancedTableV2Return {
  tableConfig: TableConfig;
  isTableMenuOpen: boolean;
  openTableMenu: () => void;
  closeTableMenu: () => void;
  updateTableConfig: (config: Partial<TableConfig>) => void;
  resetTableConfig: () => void;
  // Media functionality
  mediaItems: MediaItem[];
  isMediaModalOpen: boolean;
  activeCellId: string | null;
  openMediaModal: (cellId: string) => void;
  closeMediaModal: () => void;
  addMediaItem: (item: Omit<MediaItem, 'id'>) => void;
  removeMediaItem: (id: string) => void;
  getMediaForCell: (cellId: string) => MediaItem[];
}

export const useAdvancedTableV2 = (): UseAdvancedTableV2Return => {
  const [tableConfig, setTableConfig] = useState<TableConfig>({ rows: 3, cols: 3 });
  const [isTableMenuOpen, setIsTableMenuOpen] = useState(false);
  
  // Media state
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [activeCellId, setActiveCellId] = useState<string | null>(null);

  const openTableMenu = useCallback(() => {
    setIsTableMenuOpen(true);
  }, []);

  const closeTableMenu = useCallback(() => {
    setIsTableMenuOpen(false);
  }, []);

  const updateTableConfig = useCallback((config: Partial<TableConfig>) => {
    setTableConfig(prev => ({ ...prev, ...config }));
  }, []);

  const resetTableConfig = useCallback(() => {
    setTableConfig({ rows: 3, cols: 3 });
  }, []);

  // Media functions
  const openMediaModal = useCallback((cellId: string) => {
    setActiveCellId(cellId);
    setIsMediaModalOpen(true);
  }, []);

  const closeMediaModal = useCallback(() => {
    setIsMediaModalOpen(false);
    setActiveCellId(null);
  }, []);

  const addMediaItem = useCallback((item: Omit<MediaItem, 'id'>) => {
    const newItem: MediaItem = {
      ...item,
      id: `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    setMediaItems(prev => [...prev, newItem]);
  }, []);

  const removeMediaItem = useCallback((id: string) => {
    setMediaItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const getMediaForCell = useCallback((cellId: string) => {
    return mediaItems.filter(item => item.cellId === cellId);
  }, [mediaItems]);

  return {
    tableConfig,
    isTableMenuOpen,
    openTableMenu,
    closeTableMenu,
    updateTableConfig,
    resetTableConfig,
    // Media functionality
    mediaItems,
    isMediaModalOpen,
    activeCellId,
    openMediaModal,
    closeMediaModal,
    addMediaItem,
    removeMediaItem,
    getMediaForCell,
  };
};
