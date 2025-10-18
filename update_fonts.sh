#!/bin/bash

# Script para actualizar tipografías según especificaciones del usuario

echo "Actualizando tipografías..."

# Componentes que necesitan Climate Crisis solo en títulos principales
TITLE_COMPONENTS=("gallery.tsx" "testimonials.tsx" "final-cta.tsx" "footer.tsx")

# Para cada componente, mantener Climate Crisis solo en títulos principales
for component in "${TITLE_COMPONENTS[@]}"; do
    if [ -f "components/$component" ]; then
        echo "Procesando $component..."
        
        # Mantener Climate Crisis solo en títulos principales (h1, h2, h3)
        # Cambiar el resto a Plus Jakarta Sans
        sed -i '' 's/fontFamily: "var(--font-climate-crisis), Impact, sans-serif"/fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif"/g' "components/$component"
        
        # Restaurar Climate Crisis solo para títulos principales
        sed -i '' 's/<h[1-3][^>]*style="[^"]*fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif"/<h1 style="fontFamily: "var(--font-climate-crisis), Impact, sans-serif"/g' "components/$component"
        sed -i '' 's/<h[2-3][^>]*style="[^"]*fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif"/<h2 style="fontFamily: "var(--font-climate-crisis), Impact, sans-serif"/g' "components/$component"
        sed -i '' 's/<h3[^>]*style="[^"]*fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif"/<h3 style="fontFamily: "var(--font-climate-crisis), Impact, sans-serif"/g' "components/$component"
    fi
done

echo "Actualización completada."
