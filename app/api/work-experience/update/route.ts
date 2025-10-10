import { NextRequest, NextResponse } from 'next/server';
import { 
  updateWorkExperience, 
  updateEducation, 
  updatePortfolioProject, 
  updateAboutMe 
} from '@/lib/work-experience-db';
import type { UpdateCardRequest, ApiResponse } from '@/types/work-experience';

export async function PUT(request: NextRequest) {
  try {
    const body: UpdateCardRequest = await request.json();
    const { id, cardType, fields } = body;
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'ID es requerido'
      }, { status: 400 });
    }

    if (!cardType) {
      return NextResponse.json({
        success: false,
        error: 'Tipo de card es requerido'
      }, { status: 400 });
    }

    if (!fields || Object.keys(fields).length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Campos a actualizar son requeridos'
      }, { status: 400 });
    }

    let updatedData;

    // Update based on card type
    switch (cardType) {
      case 'work_experience':
        updatedData = await updateWorkExperience(id, fields);
        break;
      
      case 'education':
        updatedData = await updateEducation(id, fields);
        break;
      
      case 'portfolio_projects':
        updatedData = await updatePortfolioProject(id, fields);
        break;
      
      case 'about_me':
        updatedData = await updateAboutMe(id, fields);
        break;
      
      default:
        return NextResponse.json({
          success: false,
          error: `Tipo de card no válido: ${cardType}`
        }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data: updatedData
    } as ApiResponse);

  } catch (error) {
    console.error('Error updating card:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor'
    } as ApiResponse, { status: 500 });
  }
}
