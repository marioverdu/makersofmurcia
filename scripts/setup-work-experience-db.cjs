require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function setupWorkExperienceDatabase() {
  try {
    console.log('🔗 Conectando a la base de datos...');
    
    // Leer el archivo SQL
    const sqlPath = path.join(__dirname, 'init-work-experience-tables.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('📄 Ejecutando script SQL...');
    
    // Ejecutar el script SQL
    await pool.query(sqlContent);
    
    console.log('✅ Base de datos configurada correctamente');
    console.log('📊 Tablas creadas:');
    console.log('   - about_me');
    console.log('   - work_experience');
    console.log('   - portfolio_projects');
    console.log('   - education');
    console.log('📝 Datos iniciales insertados');
    
  } catch (error) {
    console.error('❌ Error configurando la base de datos:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  setupWorkExperienceDatabase()
    .then(() => {
      console.log('🎉 Configuración completada exitosamente');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Error en la configuración:', error);
      process.exit(1);
    });
}

module.exports = { setupWorkExperienceDatabase }; 