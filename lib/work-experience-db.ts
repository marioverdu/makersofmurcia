import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Interfaces para los tipos de datos
export interface AboutMe {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface WorkExperience {
  id: number;
  company_name: string;
  job_title: string;
  year: string;
  description: string;
  detailed_content: string;
  logo_url: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface PortfolioProject {
  id: number;
  project_name: string;
  job_title: string;
  year: string;
  description: string;
  detailed_content: string;
  logo_url: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: number;
  institution_name: string;
  degree_title: string;
  year: string;
  description: string;
  detailed_content: string;
  logo_url: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface WorkExperienceData {
  aboutMe: AboutMe | null;
  workExperience: WorkExperience[];
  portfolioProjects: PortfolioProject[];
  education: Education[];
}

// Funciones para obtener datos
export async function getAboutMe(): Promise<AboutMe | null> {
  try {
    const result = await pool.query('SELECT * FROM about_me ORDER BY id LIMIT 1');
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching about me:', error);
    return null;
  }
}

export async function getWorkExperience(): Promise<WorkExperience[]> {
  try {
    const result = await pool.query('SELECT * FROM work_experience ORDER BY order_index ASC, year DESC');
    return result.rows;
  } catch (error) {
    console.error('Error fetching work experience:', error);
    return [];
  }
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const result = await pool.query('SELECT * FROM portfolio_projects ORDER BY order_index ASC, year DESC');
    return result.rows;
  } catch (error) {
    console.error('Error fetching portfolio projects:', error);
    return [];
  }
}

export async function getEducation(): Promise<Education[]> {
  try {
    const result = await pool.query('SELECT * FROM education ORDER BY order_index ASC, year DESC');
    return result.rows;
  } catch (error) {
    console.error('Error fetching education:', error);
    return [];
  }
}

export async function getAllWorkExperienceData(): Promise<WorkExperienceData> {
  try {
    const [aboutMe, workExperience, portfolioProjects, education] = await Promise.all([
      getAboutMe(),
      getWorkExperience(),
      getPortfolioProjects(),
      getEducation()
    ]);

    return {
      aboutMe,
      workExperience,
      portfolioProjects,
      education
    };
  } catch (error) {
    console.error('Error fetching all work experience data:', error);
    return {
      aboutMe: null,
      workExperience: [],
      portfolioProjects: [],
      education: []
    };
  }
}

// Funciones para actualizar datos
export async function updateAboutMe(id: number, data: Partial<AboutMe>): Promise<AboutMe> {
  try {
    const fields = Object.keys(data).filter(key => key !== 'id' && key !== 'created_at' && key !== 'updated_at');
    const values = fields.map((_, index) => `$${index + 2}`);
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    
    const query = `
      UPDATE about_me 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;
    
    const result = await pool.query(query, [id, ...fields.map(field => data[field as keyof AboutMe])]);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating about me:', error);
    throw error;
  }
}

export async function updateWorkExperience(id: number, data: Partial<WorkExperience>): Promise<WorkExperience> {
  try {
    const fields = Object.keys(data).filter(key => key !== 'id' && key !== 'created_at' && key !== 'updated_at');
    const values = fields.map((_, index) => `$${index + 2}`);
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    
    const query = `
      UPDATE work_experience 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;
    
    const result = await pool.query(query, [id, ...fields.map(field => data[field as keyof WorkExperience])]);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating work experience:', error);
    throw error;
  }
}

export async function updatePortfolioProject(id: number, data: Partial<PortfolioProject>): Promise<PortfolioProject> {
  try {
    const fields = Object.keys(data).filter(key => key !== 'id' && key !== 'created_at' && key !== 'updated_at');
    const values = fields.map((_, index) => `$${index + 2}`);
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    
    const query = `
      UPDATE portfolio_projects 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;
    
    const result = await pool.query(query, [id, ...fields.map(field => data[field as keyof PortfolioProject])]);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating portfolio project:', error);
    throw error;
  }
}

export async function updateEducation(id: number, data: Partial<Education>): Promise<Education> {
  try {
    const fields = Object.keys(data).filter(key => key !== 'id' && key !== 'created_at' && key !== 'updated_at');
    const values = fields.map((_, index) => `$${index + 2}`);
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    
    const query = `
      UPDATE education 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;
    
    const result = await pool.query(query, [id, ...fields.map(field => data[field as keyof Education])]);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating education:', error);
    throw error;
  }
}

// Función genérica para actualizar cualquier tipo de card
export async function updateCard(cardType: string, id: number, field: string, value: string): Promise<any> {
  try {
    let tableName: string;
    
    switch (cardType) {
      case 'aboutMe':
        tableName = 'about_me';
        break;
      case 'workExperience':
        tableName = 'work_experience';
        break;
      case 'portfolioProjects':
        tableName = 'portfolio_projects';
        break;
      case 'education':
        tableName = 'education';
        break;
      default:
        throw new Error(`Tipo de card no válido: ${cardType}`);
    }
    
    const query = `
      UPDATE ${tableName} 
      SET ${field} = $1, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $2 
      RETURNING *
    `;
    
    const result = await pool.query(query, [value, id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating ${cardType}:`, error);
    throw error;
  }
}
