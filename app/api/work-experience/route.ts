import { NextRequest, NextResponse } from 'next/server';
import { getAllWorkExperienceData } from '@/lib/work-experience-db';

export async function GET(request: NextRequest) {
  try {
    const data = await getAllWorkExperienceData();
    
    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error fetching work experience data:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 });
  }
} 