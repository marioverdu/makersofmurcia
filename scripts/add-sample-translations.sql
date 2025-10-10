-- Script para agregar traducciones de ejemplo al inglés
-- Esto demuestra cómo el sistema funcionará con contenido bilingüe

-- Actualizar el post ID 18 con traducciones al inglés
UPDATE posts SET 
  title_en = 'Embedded Images in Table Test',
  content_en = '<h1>Testing Embedded Images in Tables</h1>
<p>This is a comprehensive test to verify that embedded images work correctly within AdvancedTableV2 components. The system should properly handle image rendering and responsive behavior.</p>

<h2>Key Features Tested</h2>
<ul>
  <li>Image embedding within table cells</li>
  <li>Responsive image behavior</li>
  <li>Cross-browser compatibility</li>
  <li>Mobile optimization</li>
</ul>

<h3>Implementation Details</h3>
<p>The AdvancedTableV2 component has been enhanced to support:</p>
<ol>
  <li>Dynamic image resizing</li>
  <li>Lazy loading for performance</li>
  <li>Fallback handling for broken images</li>
  <li>Accessibility improvements</li>
</ol>

<blockquote>
  <p>This test validates the complete integration between the table system and media management functionality.</p>
</blockquote>',
  excerpt_en = 'Comprehensive test for embedded images in AdvancedTableV2 components, validating responsive behavior and cross-browser compatibility.'
WHERE id = 18;

-- Agregar más traducciones de ejemplo si hay otros posts
UPDATE posts SET 
  title_en = CASE 
    WHEN id = 1 THEN 'Test Update - Tables System'
    WHEN id = 2 THEN 'Advanced Testing - Second Post'
    WHEN id = 3 THEN 'Development Progress - Third Post'
    ELSE title_en
  END,
  content_en = CASE 
    WHEN id = 1 THEN '<h1>Tables System Update</h1><p>This post describes the latest updates to our advanced table system, including new features and improvements in performance and user experience.</p>'
    WHEN id = 2 THEN '<h1>Advanced Testing</h1><p>Comprehensive testing of the new features implemented in the system, ensuring everything works correctly across different browsers and devices.</p>'
    WHEN id = 3 THEN '<h1>Development Progress</h1><p>Regular update on the development progress, highlighting completed features and upcoming milestones in the project timeline.</p>'
    ELSE content_en
  END,
  excerpt_en = CASE 
    WHEN id = 1 THEN 'Latest updates to the advanced table system with performance improvements.'
    WHEN id = 2 THEN 'Comprehensive testing of new system features across different platforms.'
    WHEN id = 3 THEN 'Development progress update with completed features and upcoming milestones.'
    ELSE excerpt_en
  END
WHERE id IN (1, 2, 3) AND title_en IS NULL;

-- Verificar que las traducciones se agregaron correctamente
SELECT 
  id,
  title_es,
  title_en,
  CASE 
    WHEN title_en IS NOT NULL THEN '✅ Traducido'
    ELSE '❌ Solo español'
  END as estado_traduccion
FROM posts 
ORDER BY id;
