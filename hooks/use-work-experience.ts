import { useState, useEffect, useCallback } from 'react';
import type { 
  WorkExperienceData, 
  WorkExperienceCard, 
  EducationCard, 
  PortfolioProjectCard, 
  AboutMeCard,
  CardEditState,
  WorkExperienceEditState,
  UpdateCardRequest,
  ApiResponse
} from '@/types/work-experience';

interface UseWorkExperienceReturn {
  data: WorkExperienceData | null;
  loading: boolean;
  error: string | null;
  isEditing: boolean;
  editState: WorkExperienceEditState;
  setIsEditing: (editing: boolean) => void;
  updateField: (cardId: number, cardType: keyof WorkExperienceEditState, field: string, value: string) => void;
  saveCard: (cardId: number, cardType: keyof WorkExperienceEditState) => Promise<boolean>;
  cancelEdit: (cardId: number, cardType: keyof WorkExperienceEditState) => void;
  hasUnsavedChanges: boolean;
  refetch: () => Promise<void>;
}

export function useWorkExperience(): UseWorkExperienceReturn {
  const [data, setData] = useState<WorkExperienceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editState, setEditState] = useState<WorkExperienceEditState>({
    workExperience: {},
    education: {},
    portfolioProjects: {},
    aboutMe: null
  });

  // Initialize edit state with current data
  const initializeEditState = useCallback((workData: WorkExperienceData) => {
    const newEditState: WorkExperienceEditState = {
      workExperience: {},
      education: {},
      portfolioProjects: {},
      aboutMe: null
    };

    // Initialize work experience cards
    workData.workExperience.forEach(card => {
      newEditState.workExperience[card.id] = {
        company_name: { value: card.company_name, isEditing: false, hasChanges: false },
        job_title: { value: card.job_title, isEditing: false, hasChanges: false },
        year: { value: card.year, isEditing: false, hasChanges: false },
        description: { value: card.description || '', isEditing: false, hasChanges: false },
        detailed_content: { value: card.detailed_content || '', isEditing: false, hasChanges: false }
      };
    });

    // Initialize education cards
    workData.education.forEach(card => {
      newEditState.education[card.id] = {
        institution_name: { value: card.institution_name, isEditing: false, hasChanges: false },
        degree_title: { value: card.degree_title, isEditing: false, hasChanges: false },
        year: { value: card.year, isEditing: false, hasChanges: false },
        description: { value: card.description || '', isEditing: false, hasChanges: false },
        detailed_content: { value: card.detailed_content || '', isEditing: false, hasChanges: false }
      };
    });

    // Initialize portfolio projects
    workData.portfolioProjects.forEach(card => {
      newEditState.portfolioProjects[card.id] = {
        project_name: { value: card.project_name, isEditing: false, hasChanges: false },
        job_title: { value: card.job_title, isEditing: false, hasChanges: false },
        year: { value: card.year, isEditing: false, hasChanges: false },
        description: { value: card.description || '', isEditing: false, hasChanges: false },
        detailed_content: { value: card.detailed_content || '', isEditing: false, hasChanges: false }
      };
    });

    // Initialize about me
    if (workData.aboutMe) {
      newEditState.aboutMe = {
        title: { value: workData.aboutMe.title, isEditing: false, hasChanges: false },
        description: { value: workData.aboutMe.description, isEditing: false, hasChanges: false }
      };
    }

    setEditState(newEditState);
  }, []);

  // Fetch data from API
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/work-experience');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<WorkExperienceData> = await response.json();
      
      if (result.success && result.data) {
        setData(result.data);
        // Initialize edit state
        initializeEditState(result.data);
      } else {
        setError(result.error || 'Error al cargar los datos');
      }
    } catch (err) {
      console.error('Error fetching work experience data:', err);
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  }, [initializeEditState]);

  // Update a field in edit state
  const updateField = useCallback((cardId: number, cardType: keyof WorkExperienceEditState, field: string, value: string) => {
    setEditState(prev => {
      const newState = { ...prev };
      
      if (cardType === 'aboutMe' && newState.aboutMe) {
        newState.aboutMe[field] = {
          value,
          isEditing: true,
          hasChanges: true
        };
      } else if (newState[cardType] && newState[cardType][cardId]) {
        newState[cardType][cardId][field] = {
          value,
          isEditing: true,
          hasChanges: true
        };
      }
      
      return newState;
    });
  }, []);

  // Save a card to the database
  const saveCard = useCallback(async (cardId: number, cardType: keyof WorkExperienceEditState): Promise<boolean> => {
    try {
      const cardEditState = cardType === 'aboutMe' 
        ? editState.aboutMe 
        : editState[cardType][cardId];

      if (!cardEditState) {
        console.error('Card edit state not found');
        return false;
      }

      // Collect changed fields
      const changedFields: Record<string, string> = {};
      Object.entries(cardEditState).forEach(([field, fieldState]) => {
        if (fieldState.hasChanges) {
          changedFields[field] = fieldState.value;
        }
      });

      if (Object.keys(changedFields).length === 0) {
        return true;
      }

      // Prepare request
      const request: UpdateCardRequest = {
        id: cardId,
        cardType: cardType === 'aboutMe' ? 'about_me' : cardType as any,
        fields: changedFields
      };

      // Send update request
      const response = await fetch('/api/work-experience/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      });

      const result: ApiResponse = await response.json();

      if (result.success) {
        
        // Update local data
        setData(prev => {
          if (!prev) return prev;
          
          const newData = { ...prev };
          
          if (cardType === 'aboutMe' && newData.aboutMe) {
            Object.entries(changedFields).forEach(([field, value]) => {
              (newData.aboutMe as any)[field] = value;
            });
          } else if (cardType === 'workExperience') {
            const cardIndex = newData.workExperience.findIndex(card => card.id === cardId);
            if (cardIndex !== -1) {
              Object.entries(changedFields).forEach(([field, value]) => {
                (newData.workExperience[cardIndex] as any)[field] = value;
              });
            }
          } else if (cardType === 'education') {
            const cardIndex = newData.education.findIndex(card => card.id === cardId);
            if (cardIndex !== -1) {
              Object.entries(changedFields).forEach(([field, value]) => {
                (newData.education[cardIndex] as any)[field] = value;
              });
            }
          } else if (cardType === 'portfolioProjects') {
            const cardIndex = newData.portfolioProjects.findIndex(card => card.id === cardId);
            if (cardIndex !== -1) {
              Object.entries(changedFields).forEach(([field, value]) => {
                (newData.portfolioProjects[cardIndex] as any)[field] = value;
              });
            }
          }
          
          return newData;
        });

        // Reset edit state for this card
        setEditState(prev => {
          const newState = { ...prev };
          
          if (cardType === 'aboutMe' && newState.aboutMe) {
            Object.keys(changedFields).forEach(field => {
              newState.aboutMe![field] = {
                ...newState.aboutMe![field],
                isEditing: false,
                hasChanges: false
              };
            });
          } else if (newState[cardType] && newState[cardType][cardId]) {
            Object.keys(changedFields).forEach(field => {
              newState[cardType][cardId][field] = {
                ...newState[cardType][cardId][field],
                isEditing: false,
                hasChanges: false
              };
            });
          }
          
          return newState;
        });

        return true;
      } else {
        console.error('❌ Error saving card:', result.error);
        return false;
      }
    } catch (err) {
      console.error('❌ Error saving card:', err);
      return false;
    }
  }, [editState]);

  // Cancel editing for a card
  const cancelEdit = useCallback((cardId: number, cardType: keyof WorkExperienceEditState) => {
    setEditState(prev => {
      const newState = { ...prev };
      
      if (cardType === 'aboutMe' && newState.aboutMe) {
        Object.keys(newState.aboutMe).forEach(field => {
          newState.aboutMe![field] = {
            ...newState.aboutMe![field],
            isEditing: false,
            hasChanges: false
          };
        });
      } else if (newState[cardType] && newState[cardType][cardId]) {
        Object.keys(newState[cardType][cardId]).forEach(field => {
          newState[cardType][cardId][field] = {
            ...newState[cardType][cardId][field],
            isEditing: false,
            hasChanges: false
          };
        });
      }
      
      return newState;
    });
  }, []);

  // Check if there are unsaved changes
  const hasUnsavedChanges = useCallback(() => {
    const checkCardType = (cardType: keyof WorkExperienceEditState) => {
      if (cardType === 'aboutMe') {
        return editState.aboutMe && Object.values(editState.aboutMe).some(field => field.hasChanges);
      }
      return Object.values(editState[cardType]).some(card => 
        Object.values(card).some(field => field.hasChanges)
      );
    };

    return checkCardType('workExperience') || 
           checkCardType('education') || 
           checkCardType('portfolioProjects') || 
           checkCardType('aboutMe');
  }, [editState]);

  // Load data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    isEditing,
    editState,
    setIsEditing,
    updateField,
    saveCard,
    cancelEdit,
    hasUnsavedChanges: hasUnsavedChanges(),
    refetch: fetchData
  };
}
