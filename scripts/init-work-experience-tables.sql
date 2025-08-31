-- Script para crear las tablas de work experience en Neon
-- Ejecutar con: node scripts/setup-work-experience-db.cjs

-- Tabla para "Sobre mí"
CREATE TABLE IF NOT EXISTS about_me (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL DEFAULT 'Sobre mí',
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para experiencia laboral
CREATE TABLE IF NOT EXISTS work_experience (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  job_title VARCHAR(255) NOT NULL,
  year VARCHAR(50) NOT NULL,
  description TEXT,
  detailed_content TEXT,
  logo_url VARCHAR(500),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para proyectos del portafolio
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id SERIAL PRIMARY KEY,
  project_name VARCHAR(255) NOT NULL,
  job_title VARCHAR(255) NOT NULL,
  year VARCHAR(50) NOT NULL,
  description TEXT,
  detailed_content TEXT,
  logo_url VARCHAR(500),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para educación
CREATE TABLE IF NOT EXISTS education (
  id SERIAL PRIMARY KEY,
  institution_name VARCHAR(255) NOT NULL,
  degree_title VARCHAR(255) NOT NULL,
  year VARCHAR(50) NOT NULL,
  description TEXT,
  detailed_content TEXT,
  logo_url VARCHAR(500),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos iniciales para "Sobre mí"
INSERT INTO about_me (title, description) VALUES 
('Sobre mí', 'Desde 2017 diseño, valido, itero y prototipo productos digitales limpios, vibrantes y funcionales alineados con el negocio.')
ON CONFLICT (id) DO NOTHING;

-- Insertar datos iniciales para experiencia laboral
INSERT INTO work_experience (company_name, job_title, year, description, detailed_content, logo_url, order_index) VALUES 
('????', 'Desarrollador Full stack', '2025', 'Gestor de contenidos <strong>SaaS</strong> que digitaliza, que te asiste en la digitalización de tu negocio como <strong>freelance</strong> con una <strong>curva de aprendizaje mínima</strong> y construido bajo su propio <strong>sistema de diseño propio mantenible en el tiempo</strong>.', '', '???? Logo', 1),
('Proqio', 'Diseñador UX/UI', '2023', 'NDA', 'En Proqio, trabajé en mejorar la arquitectura de información y homogeneizar patrones de diseño para su CRM y gestor de sensores.

Mejora de Arquitectura de Información - Detalles sobre reestructuración de arquitectura de información
Investigación de Componentes - Investigación sobre componentes esenciales
Rediseño del Sistema de Diseño - Mejora de consistencia y usabilidad
Definición de Componentes - Desarrollo de componentes escalables
Mejora de Flujo de Usuario y Arquitectura de Información - Abordaje de puntos de dolor
Traducción de Bibliotecas TailwindUI a Sistema de Diseño - Aceleración de consistencia en desarrollo', 'Proqio Logo', 2),
('Status Pilot', 'Diseñador UX/UI', '2022', 'NDA', 'En este MVP, tuve la oportunidad de diseñar de forma asíncrona según los requisitos de comportamiento de sus usuarios y los comportamientos de uso de su categoría de producto. Fue una experiencia excelente trabajando estrechamente con Brad Adams.

Requisitos:

Recopilación de Requisitos - Análisis de fortalezas y debilidades
Wireframing - Creación de pantallas de baja y alta fidelidad
Definición de Flujo de Usuario y Comportamiento - Establecimiento de flujos de usuario
Prototipo Interactivo en Figma - Desarrollo de prototipo interactivo
Guía de Estilo Exportable - Creación de guía de estilo
Definición de Sistema de Diseño y Guía de Marca - Definición del sistema de diseño
Componentización de Pantallas - Estilización y componentización de pantallas
Dimensiones, Espaciado y Revisión - Especificación de tamaños y espaciado
Documentación Accesible - Producción de documentación organizada', 'Status Pilot Logo', 3),
('Leverade', 'Diseñador UX/UI', '2022', 'NDA', 'En Leverade, diseñé soluciones de interfaz, visuales y de experiencia de usuario para sus diferentes líneas de productos, adaptándome al stack existente según las oportunidades que surgían entre los equipos de negocio, desarrollo y soporte.

Investigación de Mercado y Competencia - Análisis de mercado
Validación Continua de Requisitos - Documentación de referencias visuales
Homogeneización de Assets de Marca - Estandarización de assets de marca
Diseño UX/UI - Flujos de usuario y prototipos
Definición de Sistema de Diseño UI - Definición de sistemas de diseño escalables
Control de Versiones y Mantenimiento del Sistema de Diseño - Control de versiones
Generación de Guía de Estilo y Assets - Atributos de marca', 'Leverade Logo', 4),
('Digio Soluciones', 'Diseñador UX/UI', '2020', 'NDA', 'Propuse 9 soluciones de interfaz y experiencia adaptadas a los requisitos de cada cliente. En Digio, pude involucrarme en todas las fases del proceso de diseño de producto ya que traté con clientes con necesidades y tecnologías diversas.

Comunicación de Requisitos - Recopilación de requisitos
Documentación y Arquitectura de Información - Arquitectura de información
Diseño UX - Procesos de experiencia de usuario
Diseño UI - Sistemas de diseño escalables
Mantenimiento del Sistema de Diseño - Convenciones de nomenclatura
Generación de Guía de Estilo y Assets - Atributos de marca
Prototipado de Alta y Baja Fidelidad - Prototipos interactivos
Pruebas, Reporte de Bugs y Soporte - Pruebas y reporte de errores', 'Digio Soluciones Logo', 5),
('marioverdu.com', 'Diseñador UX/UI', '2018-2024', 'Portafolio de proyectos seleccionados a lo largo de diferentes años.', '', 'marioverdu.com Logo', 6)
ON CONFLICT (id) DO NOTHING;

-- Insertar datos iniciales para proyectos del portafolio
INSERT INTO portfolio_projects (project_name, job_title, year, description, detailed_content, logo_url, order_index) VALUES 
('Daily Wine, UX/UI', 'Diseñador UX/UI', '2024', '', '', 'Daily Wine, UX/UI Logo', 1),
('Rediseño de portafolio, UX/UI', 'Diseñador UX/UI', '2021', '', '', 'Rediseño de portafolio, UX/UI Logo', 2),
('Dainapp, Rediseño', 'Diseñador UX/UI', '2021', '', '', 'Dainapp, Rediseño Logo', 3),
('Savetech, UI, Prueba técnica', 'Diseñador UX/UI', '2021', '', '', 'Savetech, UI, Prueba técnica Logo', 4),
('Read.Cv Fork, UI', 'Diseñador UX/UI', '2021', '', '', 'Read.Cv Fork, UI Logo', 5),
('Vape Shop, UI', 'Diseñador UX/UI', '2028', '', '', 'Vape Shop, UI Logo', 6),
('Youflix, UI, Concepto', 'Diseñador UX/UI', '2017', '', '', 'Youflix, UI, Concepto Logo', 7),
('NameUp, Concepto', 'Diseñador gráfico', '2016', '', '', 'NameUp, Concepto Logo', 8),
('Newsbot, UI, Concepto', 'Diseñador UX/UI', '2017', '', '', 'Newsbot, UI, Concepto Logo', 9),
('App Universitaria, UI, Concepto', 'Diseñador UX/UI', '2017', '', '', 'App Universitaria, UI, Concepto Logo', 10)
ON CONFLICT (id) DO NOTHING;

-- Insertar datos iniciales para educación
INSERT INTO education (institution_name, degree_title, year, description, detailed_content, logo_url, order_index) VALUES 
('Autoescuela Nueva Cosmos', 'Licencia de conducir', '2025', '', '', 'Autoescuela Nueva Cosmos Logo', 1),
('IronHack', 'UX/UI Design Bootcamp', '2018', '', '', 'UX/UI Design Bootcamp Logo', 2),
('UMU', 'Publicidad y RRPP', '2018', '', '', 'Publicidad y RRPP Logo', 3),
('UMU', 'Publicidad y RRPP', '2017', '', '', 'Publicidad y RRPP Logo', 4)
ON CONFLICT (id) DO NOTHING;

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_work_experience_order ON work_experience(order_index);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_order ON portfolio_projects(order_index);
CREATE INDEX IF NOT EXISTS idx_education_order ON education(order_index); 