#!/usr/bin/env node

/**
 * Script para limpiar contenido de tablas usando la API del proyecto
 * Elimina completamente cualquier rastro de tablas, controles y eventos inline
 */

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
    
    // Obtener todos los posts desde la API
    const response = await fetch('http://localhost:3001/api/posts');
    if (!response.ok) {
      throw new Error(`Error al obtener posts: ${response.status}`);
    }
    
    const posts = await response.json();
    console.log(`📊 Encontrados ${posts.length} posts totales`);
    
    // Filtrar posts que contengan contenido de tablas
    const postsWithTables = posts.filter(post => 
      post.content && (
        post.content.includes('<table') || 
        post.content.includes('handleTableSelection') || 
        post.content.includes('showTableControls') || 
        post.content.includes('table-container') || 
        post.content.includes('data-table-id') ||
        post.content.includes('addColumn') ||
        post.content.includes('addRow') ||
        post.content.includes('removeTable') ||
        post.content.includes('handleColumnDrag') ||
        post.content.includes('handleTableKeydown') ||
        post.content.includes('handleTablePaste')
      )
    );
    
    console.log(`📊 Encontrados ${postsWithTables.length} posts con contenido de tablas`);
    
    if (postsWithTables.length === 0) {
      console.log('✅ No hay posts que limpiar');
      return;
    }
    
    let cleanedCount = 0;
    
    for (const post of postsWithTables) {
      const originalContent = post.content;
      const cleanedContent = cleanTableContent(originalContent);
      
      if (cleanedContent !== originalContent) {
        // Actualizar el post usando la API
        const updateResponse = await fetch(`http://localhost:3001/api/posts/${post.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...post,
            content: cleanedContent,
            updated_at: new Date().toISOString()
          })
        });
        
        if (updateResponse.ok) {
          cleanedCount++;
          console.log(`🧹 Limpiado post: "${post.title}" (ID: ${post.id})`);
        } else {
          console.error(`❌ Error al actualizar post ${post.id}: ${updateResponse.status}`);
        }
      }
    }
    
    console.log(`🎉 Limpieza completada! ${cleanedCount} posts actualizados`);
    
  } catch (error) {
    console.error('❌ Error durante la limpieza:', error);
    console.log('💡 Asegúrate de que el servidor esté ejecutándose en http://localhost:3001');
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
