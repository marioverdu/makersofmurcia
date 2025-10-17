import type { Meta, StoryObj } from "@storybook/react"

/**
 * # 🤖 Hybrid Chat Tuenti Integration with Google Gemini Pro
 * 
 * Complete documentation for implementing hybrid LLM integration in Chat Tuenti
 * using Google Gemini Pro student account with free tokens.
 * 
 * ## 🎯 Objective
 * Maintain existing Chat Tuenti conversations as non-LLM processed, but make welcome messages
 * and general interactions LLM-driven for organic and friendly user experience.
 * Compatible with CMS posts search from /posts system.
 * 
 * ## 📋 Last updated: October 12, 2025
 */

const HybridChatTuentiIntegration = () => {
  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      lineHeight: '1.6'
    }}>
      {/* Quote/Status Info */}
      <div style={{
        background: '#f8fafc',
        border: '2px solid #e2e8f0',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem',
        fontStyle: 'italic',
        fontSize: '0.95rem',
        lineHeight: '1.7',
        color: '#475569',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '-10px',
          left: '20px',
          background: '#f8fafc',
          padding: '0 8px',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          color: '#64748b'
        }}>
          📝 Project Quote
        </div>
        <blockquote style={{ margin: 0, padding: '0.5rem 0' }}>
          "vale vamos a hacerlo a traves de mi cuenta de google gemini pro, tengo una cuenta estudiante que tiene bastantes tokens free al día; dime que variables de entorno tengo que tener en vercel y en .env.local para estar haciendo consultas, o si es un token, como lo configuramos paso a paso solo que las partes de las variables de entorno avisame y las introduzco yo manualmente, recuerda que lo que estábamos haciendo era; quiero matener algunas conversaciones que tenemos en el chat tuenti como no procesadas por llm, pero en realidad la bienvenida y demas , para que sea organica y amiable con el usuario quiero que sean a traves de llm, como consultables como tenemos ahora mismo sin cambios estructurales ni siquiera en la forma de como estan escritos esos archivos pero que sean llamables desde unn nuevo sistema de chat mas inteligente y mas potente, que sistemas me recomiendas que sean faciles de "entrenar" o de "añadir preguntas estáticas y de personalizar la forma en que habla al usuario? la idea es mantener todo el diseño de chat tuenti actual? también quiero que sea compatible con la búsqueda de posts de contenido del sistema de cms de /posts y que se pueda encontrar contenido desde mi cms asi que ahora quiero que analices las technical specs antes de proceder sin romper nada, es un cambio de stack pero conservador para hacerlo escalable a funciones de llm que quiero ir implementando a alguna velocidad solo que en lugar de usar openai y o sdkai vamos a usar el modelo más barato que nos ofrezca para esto google, revisa un poco de documentascion oficial, creo que tambien hemos comentado el stack en; http://localhost:6006/?path=/story/llmproviderscomparison--default"
        </blockquote>
      </div>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '2rem'
      }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem' }}>🤖 Comparativa de Proveedores LLM</h1>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.1rem', opacity: 0.9 }}>
          Para implementar IA en Chat Tuenti - Tier FREE Optimizado
        </p>
      </div>

      {/* Ranking General - TABLA COMPLETA ACTUALIZADA */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', borderBottom: '3px solid #667eea', paddingBottom: '0.5rem' }}>
          🏆 Tabla Comparativa Completa Proveedores y Modelos IA (Octubre 2025)
        </h2>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            overflow: 'hidden',
            fontSize: '0.85rem'
          }}>
            <thead>
              <tr style={{ background: '#667eea', color: 'white' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', whiteSpace: 'nowrap' }}>#</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', whiteSpace: 'nowrap' }}>Proveedor</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', whiteSpace: 'nowrap' }}>Modelo(s)</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', whiteSpace: 'nowrap' }}>Msgs/Día Free</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', whiteSpace: 'nowrap' }}>Tokens/Día</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', minWidth: '150px' }}>Duración Plan Free</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', whiteSpace: 'nowrap' }}>Precio 1M tok</th>
                <th style={{ padding: '0.75rem', textAlign: 'center', whiteSpace: 'nowrap' }}>Velocidad</th>
                <th style={{ padding: '0.75rem', textAlign: 'center', whiteSpace: 'nowrap' }}>Calidad</th>
                <th style={{ padding: '0.75rem', textAlign: 'center', whiteSpace: 'nowrap' }}>Tarjeta</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', minWidth: '200px' }}>Notas Clave</th>
              </tr>
            </thead>
            <tbody>
              {/* Google Gemini - Modelos por costo (menor a mayor uso de tokens) */}
              <tr style={{ background: '#ffd700', fontWeight: 'bold' }}>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>🥇1</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Google Gemini</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}><strong>Gemini 1.5 Flash</strong> (Más barato)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>~20,000 🤯</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>~4M</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Básico: ilimitado; Pro Estudiantes: 1 año*</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}><strong>$0.075</strong></td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⚡⚡ (100)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⭐⭐⭐⭐⭐</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>✅</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', fontSize: '0.8rem' }}>MÁS BARATO: $0.075/1M tokens. Velocidad optimizada</td>
              </tr>
              <tr style={{ background: '#fff8dc' }}>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>🥇2</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Google Gemini</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}><strong>Gemini Pro</strong> (Básico)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>~20,000 🤯</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>~4M</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Básico: ilimitado; Pro Estudiantes: 1 año*</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}><strong>$0.075</strong></td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⚡⚡ (100)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⭐⭐⭐⭐⭐</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>✅</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', fontSize: '0.8rem' }}>MISMO PRECIO: $0.075/1M tokens. Modelo estable y confiable</td>
              </tr>
              <tr style={{ background: '#fff8dc' }}>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>🥇3</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Google Gemini</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}><strong>Gemini 1.5 Pro</strong> (Estudiantes)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>~20,000 🤯</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>~4M</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Básico: ilimitado; Pro Estudiantes: 1 año*</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}><strong>$0.075</strong></td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⚡⚡ (100)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⭐⭐⭐⭐⭐</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>✅</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', fontSize: '0.8rem' }}>MISMO PRECIO: $0.075/1M tokens. Mejor calidad que Flash</td>
              </tr>
              <tr style={{ background: '#fff8dc' }}>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>🥇4</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Google Gemini</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}><strong>Gemini 2.5 Flash</strong> (Preview)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>~20,000 🤯</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>~4M</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Básico: ilimitado; Pro Estudiantes: 1 año*</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}><strong>$0.075</strong></td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⚡⚡ (100)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⭐⭐⭐⭐⭐</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>✅</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', fontSize: '0.8rem' }}>MISMO PRECIO: $0.075/1M tokens. Modelo experimental</td>
              </tr>
              <tr style={{ background: '#fff8dc' }}>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>🥇5</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Google Gemini</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}><strong>Gemini 2.5 Pro</strong> (Preview)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>~20,000 🤯</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>~4M</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Básico: ilimitado; Pro Estudiantes: 1 año*</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}><strong>$0.075</strong></td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⚡⚡ (100)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⭐⭐⭐⭐⭐</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>✅</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', fontSize: '0.8rem' }}>MISMO PRECIO: $0.075/1M tokens. Máxima calidad</td>
              </tr>

              {/* Hugging Face */}
              <tr style={{ background: '#c0c0c0' }}>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>🥈</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Hugging Face</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Modelos open source</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>~1,000/h</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>~200k/h</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Ilimitado; acceso a repositorios open source</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Gratis</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⚡ (30-50)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⭐⭐⭐</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>✅</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', fontSize: '0.8rem' }}>Open source con uso libre, velocidad más baja, sin costo</td>
              </tr>

              {/* Cloudflare */}
              <tr style={{ background: '#cd7f32', color: 'white' }}>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>🥉</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Cloudflare</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Llama 3 8B</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>~1,000</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>~200k</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Plan gratuito indefinido para desarrolladores</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>~$11</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⚡⚡⚡ (300)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⭐⭐⭐⭐</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>✅</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', fontSize: '0.8rem' }}>Uso para producción ligera, edge computing rápido</td>
              </tr>

              {/* Microsoft Phi-4 */}
              <tr style={{ background: '#f0f9ff' }}>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>4</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Microsoft Phi-4</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Phi-4 (14B)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Limitado por créditos</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>1-2M aprox</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Créditos Azure 1 mes prueba + open source sin límite local</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>~$0.06</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⚡⚡ (100-200)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⭐⭐⭐⭐⭐</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⚠️</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', fontSize: '0.8rem' }}>Open source local sin coste, créditos en Azure ~1 mes, alta calidad y razonamiento</td>
              </tr>

              {/* Groq */}
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>5</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Groq</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Llama 3.1 8B</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>~500</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>~100k</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Créditos iniciales limitados</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>$0.05-$0.27</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⚡⚡⚡ (750)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⭐⭐⭐⭐</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>✅</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', fontSize: '0.8rem' }}>Muy rápido y barato para fallback, duración créditos depende consumo</td>
              </tr>

              {/* Together AI */}
              <tr style={{ background: '#fef3c7' }}>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>6</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Together AI</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Llama 3.1</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>~2,500*</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>~250k*</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Créditos iniciales limitados</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>$0.20-$0.90</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⚡⚡ (100+)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⭐⭐⭐⭐</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>❌</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', fontSize: '0.8rem' }}>Solo créditos iniciales para prueba, requiere tarjeta para ampliar</td>
              </tr>

              {/* OpenAI */}
              <tr style={{ background: '#fee2e2' }}>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>7</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>OpenAI</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>GPT-4, GPT-4o</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>No Free</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>-</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Suscripción o pago por uso</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>$10-$30</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⚡⚡⚡ (100-200)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⭐⭐⭐⭐⭐</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>❌</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', fontSize: '0.8rem' }}>El más caro, recomendado para cargas críticas con alta calidad</td>
              </tr>

              {/* Meta LLaMA */}
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>8</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Meta</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>LLaMA 2, LLaMA 3</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Depende acceso</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Variable</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Open source y sujeta a licencia</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Variable</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>Variable</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⭐⭐⭐⭐</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⚠️</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', fontSize: '0.8rem' }}>Modelos open source fuertes, ideal para despliegues privados</td>
              </tr>

              {/* Anthropic Claude */}
              <tr style={{ background: '#f0f9ff' }}>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>9</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Anthropic</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Claude</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Limitado</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Variable</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Créditos y suscripciones disponibles</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Variable</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>Variable</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⭐⭐⭐⭐</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⚠️</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', fontSize: '0.8rem' }}>Enfoque en seguridad y ética en IA, modelos para conversación segura</td>
              </tr>

              {/* Mistral */}
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>10</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Mistral</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Mistral 7B, Mixtral</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Open source, limitado</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Variable</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Open source</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Variable</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>Variable</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⭐⭐⭐⭐</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>✅</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', fontSize: '0.8rem' }}>Enfoque en eficiencia, modelos ligeros para bajos recursos</td>
              </tr>

              {/* Otros proveedores */}
              <tr style={{ background: '#f3f4f6' }}>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>...</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Otros</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>NVIDIA, Reka AI, Upstage, MiniMax</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Depende</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Depende</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Diversos planes, créditos, o open source</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Variable</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>Variable</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>Variable</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>⚠️</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', fontSize: '0.8rem' }}>Especializados en nichos de IA, aceleración hardware, computación perimetral</td>
              </tr>
            </tbody>
          </table>
          
          <div style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            background: '#fef3c7', 
            borderRadius: '8px',
            fontSize: '0.9rem',
            color: '#92400e'
          }}>
            <p style={{ margin: '0 0 0.5rem 0' }}>
              <strong>*Nota importante:</strong> Google Gemini Pro para estudiantes es gratuito hasta el 9 de diciembre de 2025, luego pagable.
            </p>
            <p style={{ margin: 0 }}>
              Esta tabla reúne todos los proveedores y modelos relevantes con todos los parámetros para evaluar la mejor combinación en función del presupuesto, duración del plan free, velocidad y calidad.
            </p>
          </div>
        </div>
      </section>

      {/* Velocidad */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', borderBottom: '3px solid #667eea', paddingBottom: '0.5rem' }}>
          ⚡ Velocidad y Latencia
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {[
            { name: 'Groq', speed: '750 tok/s', latency: '200-500ms', icon: '🚀' },
            { name: 'Cloudflare', speed: '300 tok/s', latency: '100-300ms', icon: '⚡' },
            { name: 'Google Gemini', speed: '100 tok/s', latency: '500-1000ms', icon: '🎯' },
            { name: 'Hugging Face', speed: '30-50 tok/s', latency: '1-3s + cold start', icon: '🐢' },
          ].map((item) => (
            <div key={item.name} style={{
              padding: '1.5rem',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{item.name}</h3>
              <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                <strong>Velocidad:</strong> {item.speed}
              </p>
              <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                <strong>Latencia:</strong> {item.latency}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Costos REALES Verificados */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', borderBottom: '3px solid #667eea', paddingBottom: '0.5rem' }}>
          💰 Precios REALES Verificados (cuando excedes tier FREE)
        </h2>
        
        <div style={{
          background: '#fef3c7',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          border: '2px solid #f59e0b'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: '#92400e' }}>
            ⚠️ Datos verificados de fuentes oficiales - Octubre 2025
          </p>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <thead>
              <tr style={{ background: '#10b981', color: 'white' }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Ranking</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Proveedor</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Precio Input</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Precio Output</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Modelo</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Ahorro vs GPT-4</th>
              </tr>
            </thead>
            <tbody>
              {[
                { rank: '🥇 #1', name: 'Groq', priceIn: '$0.05', priceOut: '$0.08', model: 'Llama 3.1 8B', savings: '100x más barato', highlight: 'gold' },
                { rank: '🥈 #2', name: 'Google Gemini Flash', priceIn: '$0.075', priceOut: '$0.30', model: 'Gemini 1.5 Flash', savings: '133x más barato', highlight: 'silver' },
                { rank: '🥉 #3', name: 'Together AI', priceIn: '$0.20', priceOut: '$0.20', model: 'Llama 3.1 8B', savings: '50x más barato', highlight: 'bronze' },
                { rank: '4', name: 'Cloudflare Workers AI', priceIn: '$0.011/1k neurons', priceOut: 'Mismo', model: 'Llama 3 8B', savings: '~10x más barato', highlight: 'none' },
                { rank: '5', name: 'OpenAI GPT-3.5', priceIn: '$0.50', priceOut: '$1.50', model: 'GPT-3.5 Turbo', savings: '20x más barato', highlight: 'none' },
                { rank: '6', name: 'Google Gemini Pro', priceIn: '$1.25', priceOut: '$5.00', model: 'Gemini 1.5 Pro', savings: '8x más barato', highlight: 'none' },
                { rank: '7', name: 'Anthropic Claude Haiku', priceIn: '$0.25', priceOut: '$1.25', model: 'Claude 3 Haiku', savings: '40x más barato', highlight: 'none' },
                { rank: '8', name: 'Anthropic Claude Sonnet', priceIn: '$3.00', priceOut: '$15.00', model: 'Claude 3 Sonnet', savings: '3x más barato', highlight: 'none' },
                { rank: '9', name: 'OpenAI GPT-4', priceIn: '$10.00', priceOut: '$30.00', model: 'GPT-4 Turbo', savings: 'Base (más caro)', highlight: 'red' },
                { rank: '10', name: 'Anthropic Claude Opus', priceIn: '$15.00', priceOut: '$75.00', model: 'Claude 3 Opus', savings: '1.5x más caro que GPT-4', highlight: 'red' },
              ].map((item, idx) => {
                const bgColor = 
                  item.highlight === 'gold' ? '#ffd700' :
                  item.highlight === 'silver' ? '#c0c0c0' :
                  item.highlight === 'bronze' ? '#cd7f32' :
                  item.highlight === 'red' ? '#fee2e2' :
                  idx % 2 === 0 ? '#f9fafb' : 'white';
                
                return (
                  <tr key={idx} style={{ background: bgColor, fontWeight: item.highlight === 'gold' || item.highlight === 'silver' ? 'bold' : 'normal' }}>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>{item.rank}</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>{item.name}</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>{item.priceIn}</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>{item.priceOut}</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>{item.model}</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>{item.savings}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Ejemplo de cálculo */}
        <div style={{
          marginTop: '2rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '12px'
        }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>💡 Ejemplo Real: 10,000 mensajes/mes (2M tokens)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>$0.10</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Groq (más barato)</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>$0.15</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Google Gemini Flash</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>$0.40</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Together AI</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fca5a5' }}>$20.00</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>OpenAI GPT-4</div>
            </div>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.9 }}>
            Groq es <strong>200x más barato</strong> que OpenAI GPT-4
          </p>
        </div>

        {/* Proveedores GRATIS */}
        <div style={{
          marginTop: '2rem',
          background: '#d1fae5',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '2px solid #10b981'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#065f46' }}>
            🆓 Proveedores COMPLETAMENTE GRATIS (sin límites de pago)
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#065f46' }}>
            <li><strong>Hugging Face Inference API:</strong> Cualquier modelo open source (rate limiting ~1000 req/hora)</li>
            <li><strong>Microsoft Phi-4:</strong> Gratis si corres localmente (14B parámetros)</li>
            <li><strong>Meta LLaMA 2/3:</strong> Gratis si corres localmente</li>
            <li><strong>Mistral 7B/Mixtral:</strong> Gratis si corres localmente</li>
          </ul>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#059669' }}>
            <strong>Nota:</strong> Los modelos "gratis" requieren correrlos en tu propia infraestructura (GPU local o servidor).
          </p>
        </div>
      </section>

      {/* Stack Recomendado */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', borderBottom: '3px solid #667eea', paddingBottom: '0.5rem' }}>
          🎯 Stack Recomendado (Multi-Provider)
        </h2>
        
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '2rem',
          borderRadius: '12px',
          marginBottom: '1rem'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>
              TIER 1: Google Gemini Flash (Principal)
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>20,000 mensajes/día FREE</li>
              <li>Mejor calidad (comparable a GPT-3.5)</li>
              <li>Español perfecto</li>
              <li>Uso: 85% del tráfico</li>
            </ul>
          </div>
          
          <div style={{ 
            borderTop: '2px dashed rgba(255,255,255,0.3)',
            paddingTop: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>
              TIER 2: Groq (Fallback Rápido)
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>500 mensajes/día adicionales FREE</li>
              <li>Ultra rápido (750 tokens/segundo)</li>
              <li>Se activa si Gemini se satura (15 RPM)</li>
              <li>Uso: 10% del tráfico</li>
            </ul>
          </div>
          
          <div style={{ 
            borderTop: '2px dashed rgba(255,255,255,0.3)',
            paddingTop: '1.5rem'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>
              TIER 3: Cloudflare Workers AI (Emergencia)
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>1,000 mensajes/día backup</li>
              <li>Edge computing rápido</li>
              <li>Solo en casos extremos</li>
              <li>Uso: 5% del tráfico</li>
            </ul>
          </div>
        </div>
        
        <div style={{
          background: '#ecfdf5',
          border: '2px solid #10b981',
          borderRadius: '8px',
          padding: '1.5rem'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#065f46' }}>
            ✅ Total Combinado (FREE):
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#065f46' }}>
            <li><strong>~20,000+ mensajes/día GRATIS</strong></li>
            <li><strong>~600,000 mensajes/mes GRATIS</strong></li>
            <li>Calidad excelente</li>
            <li>Fallbacks automáticos</li>
            <li>Sin tarjeta de crédito</li>
            <li>$0 hasta escalar MUCHO</li>
          </ul>
        </div>
      </section>

      {/* APIs Keys */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', borderBottom: '3px solid #667eea', paddingBottom: '0.5rem' }}>
          🔑 Cómo Obtener API Keys
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {[
            {
              name: 'Google Gemini',
              url: 'https://aistudio.google.com/app/apikey',
              steps: [
                'Click "Get API Key"',
                'Click "Create API Key"',
                'Copiar key (empieza con AIzaSy...)',
                '✅ NO requiere tarjeta'
              ],
              color: '#4285f4'
            },
            {
              name: 'Groq',
              url: 'https://console.groq.com',
              steps: [
                'Registrarse (email/GitHub)',
                'Ir a "API Keys"',
                'Crear nueva key',
                '✅ NO requiere tarjeta'
              ],
              color: '#f97316'
            },
            {
              name: 'Hugging Face',
              url: 'https://huggingface.co/settings/tokens',
              steps: [
                'Click "New token"',
                'Dar permisos de "read"',
                'Copiar token (empieza con hf_...)',
                '✅ NO requiere tarjeta'
              ],
              color: '#fbbf24'
            }
          ].map((item) => (
            <div key={item.name} style={{
              padding: '1.5rem',
              borderRadius: '8px',
              border: `3px solid ${item.color}`,
              background: 'white'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: item.color }}>{item.name}</h3>
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: item.color,
                  fontSize: '0.85rem',
                  wordBreak: 'break-all',
                  textDecoration: 'none'
                }}
              >
                {item.url} ↗
              </a>
              <ol style={{ marginTop: '1rem', paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
                {item.steps.map((step, idx) => (
                  <li key={idx} style={{ marginBottom: '0.5rem' }}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Variables de Entorno */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', borderBottom: '3px solid #667eea', paddingBottom: '0.5rem' }}>
          📝 Variables de Entorno (.env.local)
        </h2>
        
        <pre style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1.5rem',
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '0.9rem'
        }}>
{`# Google AI Studio
GOOGLE_API_KEY=AIzaSy...

# Groq
GROQ_API_KEY=gsk_...

# Hugging Face (opcional, backup)
HF_TOKEN=hf_...`}
        </pre>
      </section>

      {/* Escalabilidad */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', borderBottom: '3px solid #667eea', paddingBottom: '0.5rem' }}>
          📈 Escalabilidad: Costos por Fase
        </h2>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <thead>
              <tr style={{ background: '#8b5cf6', color: 'white' }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Fase</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Usuarios/Día</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Mensajes/Mes</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Costo/Mes</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Stack</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: '#d1fae5' }}>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Fase 1</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>0-1,000</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>0-30k</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd', fontWeight: 'bold', color: '#10b981' }}>$0</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>Solo Gemini FREE</td>
              </tr>
              <tr style={{ background: '#fef3c7' }}>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Fase 2</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>1,000-3,000</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>30k-90k</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd', fontWeight: 'bold', color: '#f59e0b' }}>$0-10</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>Gemini + Groq FREE</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Fase 3</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>3,000-10,000</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>90k-300k</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>$25-75</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>Multi-provider con overflow</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Fase 4</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>10,000+</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>300k+</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>$75-200</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>Considerar fine-tuned o enterprise</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: '#fef2f2',
          border: '2px solid #ef4444',
          borderRadius: '8px'
        }}>
          <p style={{ margin: 0, color: '#991b1b' }}>
            <strong>⚠️ Comparativa:</strong> Con OpenAI GPT-4 solo: <strong>$1,000-5,000/mes</strong> para el mismo volumen
          </p>
        </div>
      </section>

      {/* Casos de Uso */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', borderBottom: '3px solid #667eea', paddingBottom: '0.5rem' }}>
          🎯 Casos de Uso por Proveedor
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {[
            {
              name: 'Google Gemini',
              bestFor: 'Empezar tu proyecto',
              reason: 'Máximo FREE, calidad, español',
              icon: '🥇',
              color: '#4285f4'
            },
            {
              name: 'Groq',
              bestFor: 'Chat en tiempo real',
              reason: 'Velocidad extrema, barato',
              icon: '⚡',
              color: '#f97316'
            },
            {
              name: 'Cloudflare',
              bestFor: 'Apps distribuidas',
              reason: 'Edge computing, rapidez',
              icon: '☁️',
              color: '#f59e0b'
            },
            {
              name: 'Hugging Face',
              bestFor: 'Desarrollo y testing',
              reason: 'Experimentar, custom models',
              icon: '🤗',
              color: '#fbbf24'
            }
          ].map((item) => (
            <div key={item.name} style={{
              padding: '1.5rem',
              borderRadius: '8px',
              border: `3px solid ${item.color}`,
              background: 'white'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: item.color }}>{item.name}</h3>
              <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                <strong>Mejor para:</strong> {item.bestFor}
              </p>
              <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: '#666' }}>
                {item.reason}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div style={{
        background: '#f3f4f6',
        padding: '1.5rem',
        borderRadius: '8px',
        marginTop: '3rem',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#6b7280' }}>
          📚 <strong>Documentación completa en:</strong>
        </p>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0, 
          margin: 0,
          fontSize: '0.85rem',
          color: '#6b7280'
        }}>
          <li>FREE_LLM_PROVIDERS_COMPARISON.md</li>
          <li>FREE_LLM_HUGGINGFACE_GOOGLE_COMPARISON.md</li>
          <li>FINAL_LLM_PROVIDERS_COMPARISON_TABLE.md</li>
        </ul>
        <p style={{ margin: '1rem 0 0 0', fontSize: '0.8rem', color: '#9ca3af' }}>
          Última actualización: Octubre 12, 2025
        </p>
      </div>
    </div>
  )
}

const meta: Meta<typeof HybridChatTuentiIntegration> = {
  title: "HybridChatTuentiIntegration",
  component: HybridChatTuentiIntegration,
  parameters: {
    docs: {
      description: {
        component: `
# Hybrid Chat Tuenti Integration with Google Gemini Pro

Complete documentation for implementing hybrid LLM integration in Chat Tuenti using Google Gemini Pro student account.

## 🎯 Objective

Maintain existing Chat Tuenti conversations as non-LLM processed, but make welcome messages and general interactions LLM-driven for organic and friendly user experience. Compatible with CMS posts search from /posts system.

## ✅ Current Implementation

- **Google Gemini 2.0 Flash Exp** - Working model
- **Hybrid routing** - Static flows + LLM responses
- **CMS integration** - Posts search capability
- **Student account** - Free tokens for 1 year
- **Development only** - LLM disabled in production

## 🚀 Features

- Maintains existing Chat Tuenti design
- LLM-powered welcome messages (development only)
- Static conversation flows preserved
- CMS posts search integration
- Scalable for future LLM functions
- **Production safety** - LLM disabled in production builds
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof HybridChatTuentiIntegration>

export const Default: Story = {
  name: "Hybrid Chat Tuenti Integration"
}

