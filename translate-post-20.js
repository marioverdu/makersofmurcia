import fetch from 'node-fetch';

async function translatePost20() {
  try {
    // Primero obtener el post actual
    const response = await fetch('http://localhost:3000/api/posts/20');
    const post = await response.json();
    
    console.log('Post actual:', {
      title: post.title,
      excerpt: post.excerpt
    });
    
    // Traducir el título y excerpt
    const translatedData = {
      title_en: 'Attachable Gamepads for Phones with Massive Camera Module',
      excerpt_en: 'Attachable gamepads for Vivo x200 Pro'
    };
    
    // Actualizar el post
    const updateResponse = await fetch('http://localhost:3000/api/posts/20', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(translatedData)
    });
    
    if (updateResponse.ok) {
      console.log('✅ Post 20 traducido exitosamente');
      console.log('Título en inglés:', translatedData.title_en);
      console.log('Extracto en inglés:', translatedData.excerpt_en);
    } else {
      console.error('❌ Error al actualizar el post');
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

translatePost20();
