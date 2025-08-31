const fetch = require('node-fetch');

async function testPostView() {
  try {
    console.log('🧪 Probando visualización de posts...');
    
    // Probar la API
    console.log('📡 Probando API...');
    const apiResponse = await fetch('http://localhost:3001/api/posts/diseno-interfaces-tailwind');
    const apiData = await apiResponse.json();
    
    if (apiResponse.ok) {
      console.log('✅ API funcionando correctamente');
      console.log(`📝 Título: ${apiData.title}`);
      console.log(`🆔 ID: ${apiData.id}`);
      console.log(`🔗 Slug: ${apiData.slug}`);
    } else {
      console.log('❌ Error en API:', apiResponse.status);
      return;
    }
    
    // Probar la página
    console.log('🌐 Probando página...');
    const pageResponse = await fetch('http://localhost:3001/posts/view/diseno-interfaces-tailwind');
    const pageHtml = await pageResponse.text();
    
    if (pageResponse.ok) {
      console.log('✅ Página cargando correctamente');
      
      // Verificar contenido
      if (pageHtml.includes('animate-pulse')) {
        console.log('⚠️  Página en estado de loading');
      }
      
      if (pageHtml.includes('Error')) {
        console.log('❌ Página muestra error');
      }
      
      if (pageHtml.includes('Diseño de interfaces modernas')) {
        console.log('✅ Contenido del post encontrado');
      } else {
        console.log('❌ Contenido del post no encontrado');
      }
      
      // Verificar si hay errores de JavaScript
      if (pageHtml.includes('console.error') || pageHtml.includes('Error:')) {
        console.log('⚠️  Posibles errores de JavaScript detectados');
      }
      
    } else {
      console.log('❌ Error cargando página:', pageResponse.status);
    }
    
  } catch (error) {
    console.error('❌ Error en prueba:', error.message);
  }
}

testPostView(); 