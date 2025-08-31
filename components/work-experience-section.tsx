"use client"
import { WorkCard } from "./work-card"
import { WexpNestedCard } from "./work-card"

export interface WorkExperienceSectionProps {
  className?: string
}

export function WorkExperienceSection({ className = "" }: WorkExperienceSectionProps) {
  return (
    <div className={`flex flex-col w-full work-experience-section ${className}`}>
      <h2 className="text-sm font-medium text-[hsl(var(--color-text))] mb-2 mt-0">Experiencia laboral</h2>
      <div className="relative w-full">
        {/* Work experience cards */}
        <div className="relative w-full">
          {/* Nueva tarjeta Lorem Ipsum */}
          <WorkCard
            companyName="????"
            jobTitle="Desarrollador Full stack"
            year="2025"
            description={
              <>
                Gestor de contenidos <strong>SaaS</strong> que digitaliza, que te asiste en la digitalización de tu negocio como <strong>freelance</strong> con una <strong>curva de aprendizaje mínima</strong> y construido bajo su propio <strong>sistema de diseño propio mantenible en el tiempo</strong>.
              </>
            }
            detailedContent={null}
            timelineType="start"
            logoSrc="https://assets.marioverdu.com/logo/12.png" // Usar un placeholder para el logo
            hideExpandButton={true}
          />

          {/* Proqio */}
          <WorkCard
            companyName="Proqio"
            jobTitle="Diseñador UX/UI"
            year="2023"
            description="En Proqio, trabajé en mejorar la arquitectura de información y homogeneizar patrones de diseño para su CRM y gestor de sensores."
            detailedContent={
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong>Mejora de Arquitectura de Información</strong> - Detalles sobre reestructuración de
                  arquitectura de información
                </li>
                <li>
                  <strong>Investigación de Componentes</strong> - Investigación sobre componentes esenciales
                </li>
                <li>
                  <strong>Rediseño del Sistema de Diseño</strong> - Mejora de consistencia y usabilidad
                </li>
                <li>
                  <strong>Definición de Componentes</strong> - Desarrollo de componentes escalables
                </li>
                <li>
                  <strong>Mejora de Flujo de Usuario y Arquitectura de Información</strong> - Abordaje de puntos de
                  dolor
                </li>
                <li>
                  <strong>Traducción de Bibliotecas TailwindUI a Sistema de Diseño</strong> - Aceleración de
                  consistencia en desarrollo
                </li>
              </ul>
            }
            timelineType="middle" // Cambiado a middle ya que ahora hay una tarjeta antes
            logoSrc="https://assets.marioverdu.com/logo/8.png"
          />

          {/* Status Pilot */}
          <WorkCard
            companyName="Status Pilot"
            jobTitle="Diseñador UX/UI"
            year="2022"
            description="En este MVP, tuve la oportunidad de diseñar de forma asíncrona según los requisitos de comportamiento de sus usuarios y los comportamientos de uso de su categoría de producto. Fue una experiencia excelente trabajando estrechamente con Brad Adams."
            detailedContent={
              <>
                <p className="mb-2">
                  <strong>Requisitos:</strong>
                </p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>
                    <strong>Recopilación de Requisitos</strong> - Análisis de fortalezas y debilidades
                  </li>
                  <li>
                    <strong>Wireframing</strong> - Creación de pantallas de baja y alta fidelidad
                  </li>
                  <li>
                    <strong>Definición de Flujo de Usuario y Comportamiento</strong> - Establecimiento de flujos de
                    usuario
                  </li>
                  <li>
                    <strong>Prototipo Interactivo en Figma</strong> - Desarrollo de prototipo interactivo
                  </li>
                  <li>
                    <strong>Guía de Estilo Exportable</strong> - Creación de guía de estilo
                  </li>
                  <li>
                    <strong>Definición de Sistema de Diseño y Guía de Marca</strong> - Definición del sistema de diseño
                  </li>
                  <li>
                    <strong>Componentización de Pantallas</strong> - Estilización y componentización de pantallas
                  </li>
                  <li>
                    <strong>Dimensiones, Espaciado y Revisión</strong> - Especificación de tamaños y espaciado
                  </li>
                  <li>
                    <strong>Documentación Accesible</strong> - Producción de documentación organizada
                  </li>
                </ul>
              </>
            }
            timelineType="middle"
            logoSrc="https://assets.marioverdu.com/logo/7.png"
          />

          {/* Leverade */}
          <WorkCard
            companyName="Leverade"
            jobTitle="Diseñador UX/UI"
            year="2022"
            description="En Leverade, diseñé soluciones de interfaz, visuales y de experiencia de usuario para sus diferentes líneas de productos, adaptándome al stack existente según las oportunidades que surgían entre los equipos de negocio, desarrollo y soporte."
            detailedContent={
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong>Investigación de Mercado y Competencia</strong> - Análisis de mercado
                </li>
                <li>
                  <strong>Validación Continua de Requisitos</strong> - Documentación de referencias visuales
                </li>
                <li>
                  <strong>Homogeneización de Assets de Marca</strong> - Estandarización de assets de marca
                </li>
                <li>
                  <strong>Diseño UX/UI</strong> - Flujos de usuario y prototipos
                </li>
                <li>
                  <strong>Definición de Sistema de Diseño UI</strong> - Definición de sistemas de diseño escalables
                </li>
                <li>
                  <strong>Control de Versiones y Mantenimiento del Sistema de Diseño</strong> - Control de versiones
                </li>
                <li>
                  <strong>Generación de Guía de Estilo y Assets</strong> - Atributos de marca
                </li>
              </ul>
            }
            timelineType="middle"
            logoSrc="https://assets.marioverdu.com/logo/9.png"
          />

          {/* Digio Soluciones */}
          <WorkCard
            companyName="Digio Soluciones"
            jobTitle="Diseñador UX/UI"
            year="2020"
            description="Propuse 9 soluciones de interfaz y experiencia adaptadas a los requisitos de cada cliente. En Digio, pude involucrarme en todas las fases del proceso de diseño de producto ya que traté con clientes con necesidades y tecnologías diversas."
            detailedContent={
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong>Comunicación de Requisitos</strong> - Recopilación de requisitos
                </li>
                <li>
                  <strong>Documentación y Arquitectura de Información</strong> - Arquitectura de información
                </li>
                <li>
                  <strong>Diseño UX</strong> - Procesos de experiencia de usuario
                </li>
                <li>
                  <strong>Diseño UI</strong> - Sistemas de diseño escalables
                </li>
                <li>
                  <strong>Mantenimiento del Sistema de Diseño</strong> - Convenciones de nomenclatura
                </li>
                <li>
                  <strong>Generación de Guía de Estilo y Assets</strong> - Atributos de marca
                </li>
                <li>
                  <strong>Prototipado de Alta y Baja Fidelidad</strong> - Prototipos interactivos
                </li>
                <li>
                  <strong>Pruebas, Reporte de Bugs y Soporte</strong> - Pruebas y reporte de errores
                </li>
              </ul>
            }
            timelineType="middle"
            logoSrc="https://assets.marioverdu.com/logo/10.png"
          />

          {/* marioverdu.com */}
                <WorkCard
            companyName="marioverdu.com"
            jobTitle="Diseñador UX/UI"
            year="2018-2024"
            description=""
            detailedContent={
              <>
                <p className="mb-4">Portafolio de proyectos seleccionados a lo largo de diferentes años.</p>
                <WexpNestedCard companyName="Daily Wine, UX/UI" jobTitle="Diseñador UX/UI" year="2024" logoSrc="https://assets.marioverdu.com/logo/empty.png" />
                <WexpNestedCard companyName="Rediseño de portafolio, UX/UI." jobTitle="Diseñador UX/UI" year="2021" logoSrc="https://assets.marioverdu.com/logo/empty.png" />
                <WexpNestedCard companyName="Dainapp, Rediseño." jobTitle="Diseñador UX/UI" year="2021" logoSrc="https://assets.marioverdu.com/logo/empty.png" />
                <WexpNestedCard companyName="Savetech, UI, Prueba técnica" jobTitle="Diseñador UX/UI" year="2021" logoSrc="https://assets.marioverdu.com/logo/empty.png" />
                <WexpNestedCard companyName="Read.Cv Fork, UI." jobTitle="Diseñador UX/UI" year="2021" logoSrc="https://assets.marioverdu.com/logo/empty.png" />
                <WexpNestedCard companyName="Vape Shop, UI" jobTitle="Diseñador UX/UI" year="2028" logoSrc="https://assets.marioverdu.com/logo/empty.png" />
                <WexpNestedCard companyName="Youflix, UI, Concepto" jobTitle="Diseñador UX/UI" year="2017" logoSrc="https://assets.marioverdu.com/logo/empty.png" />
                <WexpNestedCard companyName="NameUp, Concepto." jobTitle="Diseñador gráfico" year="2016" logoSrc="https://assets.marioverdu.com/logo/empty.png" />
                <WexpNestedCard companyName="Newsbot, UI, Concepto" jobTitle="Diseñador UX/UI" year="" logoSrc="https://assets.marioverdu.com/logo/empty.png" />
                <WexpNestedCard companyName="App Universitaria, UI, Concepto" jobTitle="Diseñador UX/UI" year="" logoSrc="https://assets.marioverdu.com/logo/empty.png" />
              </>
            }
            timelineType="end"
            logoSrc="https://assets.marioverdu.com/logo/empty.png"
          />
        </div>
      </div>
    </div>
  )
}
