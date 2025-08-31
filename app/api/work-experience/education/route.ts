import { NextRequest, NextResponse } from 'next/server';
import { updateEducation } from '@/lib/work-experience-db';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'ID es requerido'
      }, { status: 400 });
    }
    
    const updatedData = await updateEducation(id, data);
    
    return NextResponse.json({
      success: true,
      data: updatedData
    });
  } catch (error) {
    console.error('Error updating education:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 });
  }
} 