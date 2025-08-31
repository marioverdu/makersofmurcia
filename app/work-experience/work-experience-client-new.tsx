"use client"

import React, { useState, useEffect, useRef } from "react"
import { UnifiedLoading } from "@/components/ui/unified-loading"
import { Button } from "@/components/ui/button"
import { useWorkExperience } from '@/hooks/use-work-experience';
import { WorkExperienceCard } from '@/components/work-experience-card';
import { EditableField } from '@/components/editable-field';
import { HeaderTabs } from '@/components/ui/header/tabs';
import { HeaderContextualMenu } from '@/components/ui/header/header-contextual-menu';
import { Footer } from '@/components/footer';
import { ProfileCardWidescreens, ProfileCardPhone } from '@/components/profile-card';
import ChatTuentiButtonMaster from '@/components/chat-tuenti/chat-tuenti-button-master';
import ChatTuentiMaster from '@/components/chat-tuenti/chat-tuenti-master';
import { ExternalLink } from 'lucide-react';
import type { Locale, Dictionary } from '@/types/i18n';

// HeaderV2 Component
function HeaderV2({ isAvatarInHeader, lang }: { isAvatarInHeader: boolean; lang: Locale }) {
  return (
    <div
      style={{
        width: '100%',
        height: '40px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'none',
        zIndex: 1000,
      }}
    >
      <div className="h-full flex" style={{ marginTop: '16px' }}>
        <div className="bg-transparent header-blue-padding" />
        <div className="flex-1 flex items-center justify-between relative custom-header-padding glass-bg">
          <div
            style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', paddingLeft: 8 }}
          >
            <img
              alt="Mario Verdú"
              width={28}
              height={28}
              className={`h-[28px] w-[28px] object-cover rounded-full ${isAvatarInHeader ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              src="https://assets.marioverdu.com/avatar/avatar-2.webp"
            />
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <HeaderTabs className="mx-auto md:mx-0 justify-center md:justify-start" />
          </div>
          {/* Selector de idioma al extremo derecho */}
          <div 
            className="language-container"
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              paddingRight: '8px',
              width: '44px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <HeaderContextualMenu currentLang={lang} hidden={true} />
          </div>
        </div>
        <div className="bg-transparent header-blue-padding" />
      </div>
      <style jsx>{`
        @media (min-width: 480px) {
          .bg-cyan-400 {
            width: 32px !important;
            background: transparent !important;
          }
        }
        .custom-header-padding {
          position: relative;
          padding-left: 0px;
          padding-right: 0px;
        }
        .glass-bg {
          background: rgba(255,255,255,0.3);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 12px;
          border: 1px solid rgba(0, 94, 182, 0.1);
        }
        .header-blue-padding {
          width: 12px;
        }
        @media (min-width: 480px) {
          .header-blue-padding {
            width: 32px;
          }
        }
      `}</style>
    </div>
  );
}

interface WorkExperienceClientNewProps {
  lang?: Locale;
  dict?: Dictionary;
}

export default function WorkExperienceClientNew({ lang = 'es', dict }: WorkExperienceClientNewProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isAvatarInHeader, setIsAvatarInHeader] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const {
    data,
    loading,
    error,
    isEditing,
    editState,
    setIsEditing,
    updateField,
    saveCard,
    cancelEdit,
    hasUnsavedChanges,
    refetch
  } = useWorkExperience();

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle scroll for avatar
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 150;
      setIsAvatarInHeader(window.scrollY > scrollThreshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle edit mode activation
  useEffect(() => {
    const handleActivateEdit = (event: CustomEvent) => {
      setIsEditing(event.detail.isEditing);
    };

    window.addEventListener("activateWorkExperienceEdit", handleActivateEdit as EventListener);
    return () => {
      window.removeEventListener("activateWorkExperienceEdit", handleActivateEdit as EventListener);
    };
  }, [setIsEditing]);

  const toggleChat = () => setIsChatOpen((prev) => !prev);

  // Loading state
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="text-center">
          <UnifiedLoading />
          <p className="text-gray-600">Cargando contenido...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error al cargar el contenido</h1>
        <p className="text-lg text-gray-600 mb-4">{error}</p>
        <button 
          onClick={() => refetch()} 
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
        >
          Recargar página
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">No hay datos disponibles</h1>
      </div>
    );
  }

  return (
    <>
              <HeaderV2 isAvatarInHeader={isAvatarInHeader} lang={lang} />
      
      <div
        className="min-h-screen flex flex-col"
        style={{
          backgroundImage: "url('https://assets.marioverdu.com/bg/work-experience-bg.min.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Profile Card Section */}
        <section className="mt-[40px]">
          {isMobile ? (
            <ProfileCardPhone />
          ) : (
            <ProfileCardWidescreens />
          )}
        </section>

        {/* Main Content Section */}
        <section className="mt-0">
          <div className="flex justify-center items-start w-full relative px-4 md:px-[60px]">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start relative z-10 w-full max-w-[1092px] pt-0 pb-0 gap-8 mb-[72px]">
              
              {/* Left Column */}
              <div className="flex flex-col gap-8 duplicated-column w-full md:max-w-[576px] pt-0 pl-0">
                
                {/* About Me Section */}
                <div className="about-me flex flex-col w-full mb-8">
                  <h2 className="text-sm font-medium text-[hsl(var(--color-text))] mb-4">
                    {data.aboutMe?.title || 'Sobre mí'}
                  </h2>
                  {data.aboutMe && editState.aboutMe && (
                    <EditableField
                      value={editState.aboutMe.description.value}
                      isEditing={isEditing}
                      hasChanges={editState.aboutMe.description.hasChanges}
                      onValueChange={(value) => updateField(data.aboutMe!.id, 'aboutMe', 'description', value)}
                      onSave={() => saveCard(data.aboutMe!.id, 'aboutMe')}
                      onCancel={() => cancelEdit(data.aboutMe!.id, 'aboutMe')}
                      className="text-sm font-normal"
                      style={{ color: "#6C727F" }}
                      multiline
                      rows={3}
                    />
                  )}
                </div>

                {/* Work Experience Section */}
                <div className="work-experience-section flex flex-col w-full">
                  <h2 className="text-sm font-medium text-[hsl(var(--color-text))] mb-2 mt-0">
                    Experiencia laboral
                  </h2>
                  <div className="relative w-full">
                    {data.workExperience.length === 0 ? (
                      <div className="text-gray-500 text-sm">Cargando experiencia laboral...</div>
                    ) : (
                      data.workExperience.map((card, index) => (
                        <WorkExperienceCard
                          key={card.id}
                          card={card}
                          index={index}
                          totalCards={data.workExperience.length}
                          isEditing={isEditing}
                          editState={editState.workExperience[card.id] || {}}
                          onUpdateField={(field, value) => updateField(card.id, 'workExperience', field, value)}
                          onSave={() => saveCard(card.id, 'workExperience')}
                          onCancel={() => cancelEdit(card.id, 'workExperience')}
                        />
                      ))
                    )}
                  </div>
                </div>

                {/* Education Section */}
                <div className="education-section flex flex-col w-full">
                  <h2 className="text-sm font-medium text-[hsl(var(--color-text))] mb-2 mt-0">
                    Educación
                  </h2>
                  <div className="relative w-full">
                    {data.education.length === 0 ? (
                      <div className="text-gray-500 text-sm">Cargando educación...</div>
                    ) : (
                      data.education.map((card, index) => (
                        <WorkExperienceCard
                          key={card.id}
                          card={{
                            ...card,
                            company_name: card.institution_name,
                            job_title: card.degree_title
                          }}
                          index={index}
                          totalCards={data.education.length}
                          isEditing={isEditing}
                          editState={editState.education[card.id] || {}}
                          onUpdateField={(field, value) => updateField(card.id, 'education', field, value)}
                          onSave={() => saveCard(card.id, 'education')}
                          onCancel={() => cancelEdit(card.id, 'education')}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Anchored */}
              <div className="hidden md:flex flex-col w-fit mt-0 right-0 mr-[44px] pl-0">
                <h2 className="text-sm font-medium text-[hsl(var(--color-text))] mb-4">Anclado</h2>
                <a
                  href="https://linkedin.com/in/marioverdu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-normal text-gray-500 flex items-center hover:underline"
                >
                  LinkedIn
                  <ExternalLink className="ml-1 inline" size={8} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        
        {/* Chat Components */}
        <div style={{ width: '100%', height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 32 }}>
          <ChatTuentiButtonMaster isOpen={isChatOpen} onClick={toggleChat} />
        </div>
        <ChatTuentiMaster isOpen={isChatOpen} toggleChat={toggleChat} botName="Mario Verdú" isMobile={isMobile} />
      </div>
    </>
  );
}
