#!/usr/bin/env node

/**
 * Script para ejecutar la migración de traducciones de posts
 * Ejecutar con: node scripts/run-posts-migration.js
 */

import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
  try {
    console.log('🚀 Iniciando migración de traducciones de posts...');
    
    // Leer el archivo SQL
    const migrationPath = path.join(__dirname, 'migrate-posts-translations.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    // Dividir en comandos individuales
    const commands = migrationSQL
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));
    
    console.log(`📝 Ejecutando ${commands.length} comandos SQL...`);
    
    // Ejecutar cada comando
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      if (command) {
        console.log(`⚡ Ejecutando comando ${i + 1}/${commands.length}...`);
        await sql.query(command);
      }
    }
    
    console.log('✅ Migración completada exitosamente!');
    console.log('📋 Cambios realizados:');
    console.log('   - Agregadas columnas title_es, title_en');
    console.log('   - Agregadas columnas content_es, content_en');
    console.log('   - Agregadas columnas excerpt_es, excerpt_en');
    console.log('   - Migrados datos existentes al español');
    console.log('   - Creados índices para performance');
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    process.exit(1);
  }
}

// Ejecutar migración
runMigration();
