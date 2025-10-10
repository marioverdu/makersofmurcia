#!/usr/bin/env node

/**
 * Script para limpiar contenido de tablas de todos los posts existentes
 * Elimina completamente cualquier rastro de tablas, controles y eventos inline
 */

const { sql } = require('@vercel/postgres');

// Función para limpiar completamente contenido con tablas
function cleanTableContent(content) {
  if (!content || typeof content !== 'string') return content;
  
  return content
    // Eliminar divs table-container completos con su contenido
    .replace(/<div[^>]*class="[^"]*table-container[^"]*"[^>]*>.*?<\/div>/gs, '')
    // Eliminar tablas completas
    .replace(/<table[^>]*>.*?<\/table>/gs, '')
    // Eliminar controles de tabla
    .replace(/<div[^>]*class="[^"]*table-controls[^"]*"[^>]*>.*?<\/div>/gs, '')
    // Eliminar botones de control de tabla
    .replace(/<button[^>]*onclick="(?:addColumn|addRow|removeTable)[^"]*"[^>]*>.*?<\/button>/gs, '')
    // Eliminar eventos inline relacionados con tablas
    .replace(/on\w+="[^"]*(?:handleTable|showTable|addColumn|addRow|removeTable|handleColumn)[^"]*"/g, '')
    // Eliminar atributos draggable y data-table-id
    .replace(/draggable="[^"]*"/g, '')
    .replace(/data-table-id="[^"]*"/g, '')
    // Eliminar cualquier onclick que contenga funciones no definidas
    .replace(/onclick="[^"]*"/g, '')
    // Eliminar cualquier onmousedown, onmouseup, onselectstart relacionado con tablas
    .replace(/on(?:mouse|select|key|paste|drag|drop)="[^"]*"/g, '')
    // Eliminar tags HTML restantes que puedan contener referencias a tablas
    .replace(/<[^>]*>/g, '')
    .trim();
}

async function cleanAllPosts() {
  try {
    console.log('🔄 Iniciando limpieza de contenido de tablas en todos los posts...');
    
    // Obtener todos los posts
    const { rows: posts } = await sql`
      SELECT id, title, content 
      FROM posts 
      WHERE content LIKE '%table%' 
         OR content LIKE '%handleTable%' 
         OR content LIKE '%showTable%' 
         OR content LIKE '%addColumn%' 
         OR content LIKE '%addRow%' 
         OR content LIKE '%removeTable%' 
         OR content LIKE '%handleColumn%'
         OR content LIKE '%table-container%'
         OR content LIKE '%data-table-id%'
    `;
    
    console.log(`📊 Encontrados ${posts.length} posts con contenido de tablas`);
    
    if (posts.length === 0) {
      console.log('✅ No hay posts que limpiar');
      return;
    }
    
    let cleanedCount = 0;
    
    for (const post of posts) {
      const originalContent = post.content;
      const cleanedContent = cleanTableContent(originalContent);
      
      if (cleanedContent !== originalContent) {
        // Actualizar el post con contenido limpio
        await sql`
          UPDATE posts 
          SET content = ${cleanedContent}, 
              updated_at = NOW() 
          WHERE id = ${post.id}
        `;
        
        cleanedCount++;
        console.log(`🧹 Limpiado post: "${post.title}" (ID: ${post.id})`);
      }
    }
    
    console.log(`🎉 Limpieza completada! ${cleanedCount} posts actualizados`);
    
  } catch (error) {
    console.error('❌ Error durante la limpieza:', error);
    process.exit(1);
  }
}

// Ejecutar la limpieza
cleanAllPosts()
  .then(() => {
    console.log('✅ Script de limpieza completado exitosamente');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });
