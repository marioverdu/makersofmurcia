"use client"

import React, { useState } from 'react';
import type { Locale } from '@/types/i18n'
import { useWorkExperienceTranslations } from '@/hooks/use-work-experience-translations'
import { EditableField } from './editable-field';
import type { WorkExperienceCard, CardEditState } from '@/types/work-experience';

interface WorkExperienceCardProps {
  card: WorkExperienceCard;
  index: number;
  totalCards: number;
  isEditing: boolean;
  editState: CardEditState;
  onUpdateField: (field: string, value: string) => void;
  onSave: () => Promise<boolean>;
  onCancel: () => void;
  lang?: Locale;
}

export function WorkExperienceCard({
  card,
  index,
  totalCards,
  isEditing,
  editState,
  onUpdateField,
  onSave,
  onCancel,
  lang = 'es'
}: WorkExperienceCardProps) {
  const t = useWorkExperienceTranslations(lang)
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const imageRef = React.useRef<HTMLDivElement>(null);

  const timelineType = index === 0 ? "start" : index === totalCards - 1 ? "end" : "middle";
  const isWebUXUICard = card.company_name === "marioverdu.com";
  const isMarioVerduLogo = card.logo_url === "https://assets.marioverdu.com/logo/empty.png";
  const shouldShowFooter = card.company_name !== "marioverdu.com";

  // Auto-expand when editing
  React.useEffect(() => {
    if (isEditing) {
      setIsExpanded(true);
    }
  }, [isEditing]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      console.log('🔄 Saving card:', card.id);
      const success = await onSave();
      if (success) {
        console.log('✅ Card saved successfully');
      } else {
        console.error('❌ Failed to save card');
      }
    } catch (error) {
      console.error('❌ Error saving card:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges = Object.values(editState).some(field => field.hasChanges);

  return (
    <div className="flex flex-col relative pl-8 pb-0 w-full md:max-w-[576px]">
      {/* Timeline Divider */}
      <TimelineDivider type={timelineType} imageRef={imageRef} />
      
      {/* Card Content */}
      <div className="flex flex-col relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-start gap-4 p-4">
          {/* Logo */}
          <div 
            ref={imageRef}
            className="flex-shrink-0 w-11 h-11 rounded-lg overflow-hidden bg-gray-100"
          >
            <img
              src={`https://assets.marioverdu.com/logo/${card.logo_url}`}
              alt={`${card.company_name} logo`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Company Name */}
            <div className="mb-1">
              <EditableField
                value={editState.company_name?.value || card.company_name}
                isEditing={isEditing}
                hasChanges={editState.company_name?.hasChanges || false}
                onValueChange={(value) => onUpdateField('company_name', value)}
                onSave={handleSave}
                onCancel={onCancel}
                className="text-sm font-semibold text-gray-800"
                placeholder="Nombre de la empresa"
              />
            </div>

            {/* Job Title */}
            <div className="mb-1">
              <EditableField
                value={editState.job_title?.value || card.job_title}
                isEditing={isEditing}
                hasChanges={editState.job_title?.hasChanges || false}
                onValueChange={(value) => onUpdateField('job_title', value)}
                onSave={handleSave}
                onCancel={onCancel}
                className="text-sm font-medium text-gray-600"
                placeholder="Cargo"
              />
            </div>

            {/* Year */}
            <div className="flex items-center justify-between">
              <EditableField
                value={editState.year?.value || card.year}
                isEditing={isEditing}
                hasChanges={editState.year?.hasChanges || false}
                onValueChange={(value) => onUpdateField('year', value)}
                onSave={handleSave}
                onCancel={onCancel}
                className="text-xs font-medium text-gray-500"
                placeholder={lang === 'en' ? 'Year' : 'Año'}
                maxLength={4}
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-4 pb-4">
          <EditableField
            value={editState.description?.value || card.description || ''}
            isEditing={isEditing}
            hasChanges={editState.description?.hasChanges || false}
            onValueChange={(value) => onUpdateField('description', value)}
            onSave={handleSave}
            onCancel={onCancel}
            className="text-sm font-normal leading-tight pr-6"
            placeholder={lang === 'en' ? 'Description...' : 'Descripción...'}
            multiline
            rows={2}
          />
        </div>

        {/* Detailed Content */}
        {(isExpanded || isWebUXUICard) && (
          <div className="px-4 pb-4">
            <EditableField
              value={editState.detailed_content?.value || card.detailed_content || ''}
              isEditing={isEditing}
              hasChanges={editState.detailed_content?.hasChanges || false}
              onValueChange={(value) => onUpdateField('detailed_content', value)}
              onSave={handleSave}
              onCancel={onCancel}
              className="text-sm font-normal text-gray-600"
              placeholder={lang === 'en' ? 'Detailed content...' : 'Contenido detallado...'}
              multiline
              rows={4}
            />
          </div>
        )}

        {/* Footer */}
        {shouldShowFooter && (
          <div className="py-2 px-3 border-t border-gray-200 flex justify-end w-full">
            {isEditing ? (
              <button 
                onClick={handleSave}
                disabled={isSaving || !hasChanges}
                className="text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ color: "#3B82F6" }}
              >
                {isSaving ? (lang === 'en' ? 'Saving...' : 'Guardando...') : (lang === 'en' ? 'Save changes' : 'Guardar cambios')}
              </button>
            ) : (
              <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-xs" 
                style={{ color: "#6C727F" }}
              >
                {isExpanded ? (lang === 'en' ? 'See less' : 'Ver menos') : (lang === 'en' ? 'See more' : 'Ver más')}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Timeline Divider Component
function TimelineDivider({ 
  type, 
  imageRef 
}: { 
  type: "start" | "middle" | "end";
  imageRef: React.RefObject<HTMLDivElement>;
}) {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const lineTopRef = React.useRef<HTMLDivElement>(null);
  const lineBottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updatePosition = () => {
      if (!imageRef.current || !dotRef.current) return;

      const imageRect = imageRef.current.getBoundingClientRect();
      const dotRect = dotRef.current.getBoundingClientRect();
      const parentRect = dotRef.current.parentElement?.getBoundingClientRect();

      if (!parentRect) return;

      const imageCenterY = imageRect.top + imageRect.height / 2 - parentRect.top;
      dotRef.current.style.top = `${imageCenterY}px`;

      if (type === "start") {
        if (lineBottomRef.current) {
          lineBottomRef.current.style.top = `${imageCenterY + dotRect.height / 2}px`;
          lineBottomRef.current.style.height = `calc(100% - ${imageCenterY + dotRect.height / 2}px)`;
        }
      } else if (type === "middle") {
        if (lineTopRef.current) {
          lineTopRef.current.style.height = `${imageCenterY - dotRect.height / 2}px`;
        }
        if (lineBottomRef.current) {
          lineBottomRef.current.style.top = `${imageCenterY + dotRect.height / 2}px`;
          lineBottomRef.current.style.height = `calc(100% - ${imageCenterY + dotRect.height / 2}px)`;
        }
      } else if (type === "end") {
        if (lineTopRef.current) {
          lineTopRef.current.style.height = `${imageCenterY - dotRect.height / 2}px`;
        }
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [imageRef, type]);

  return (
    <div className="relative flex flex-col items-center h-full">
      {(type === "middle" || type === "end") && (
        <div
          ref={lineTopRef}
          className="w-px bg-gray-300 flex-shrink-0"
          style={{ height: "0px" }}
        />
      )}

      <div
        ref={dotRef}
        className="w-2 h-2 rounded-full flex-shrink-0 flex-grow-0 aspect-square z-10 bg-cyan-500 border-2 border-white shadow-lg"
        style={{ position: "absolute" }}
      />

      {(type === "start" || type === "middle") && (
        <div
          ref={lineBottomRef}
          className="w-px bg-gray-300 flex-shrink-0"
          style={{ position: "absolute", top: "0px", height: "100%" }}
        />
      )}
    </div>
  );
}
