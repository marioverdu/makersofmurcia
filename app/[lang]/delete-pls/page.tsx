import { AdvancedTableV2View } from "@/components/advanced-table-v2"

export default function DeletePlsTestPage() {
  // Tabla ancha para probar el scroll horizontal
  const testTableContent = `
    <table>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Modelo de Gamepad</th>
          <th>Valoración</th>
          <th>Características principales</th>
          <th>Compatibilidad</th>
          <th>Precio aproximado</th>
          <th>Disponibilidad</th>
          <th>Conectividad</th>
          <th>Batería</th>
          <th>Peso</th>
          <th>Dimensiones</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>https://gamesir.com/cdn/shop/files/G8_0ec9fb51-32f8-485b-8ea7-2a9d18b9747e.png?v=1741246755</td>
          <td>GameSir G8 Plus (Bluetooth)</td>
          <td>⭐⭐⭐⭐</td>
          <td>Similar al G8 pero con Bluetooth, sin passthrough, carga adicional del teléfono</td>
          <td>Android, iOS, Windows</td>
          <td>€45-55</td>
          <td>Disponible en Europa</td>
          <td>Bluetooth 5.0</td>
          <td>600mAh, hasta 20h</td>
          <td>280g</td>
          <td>170 x 110 x 35mm</td>
          <td>Excelente</td>
        </tr>
        <tr>
          <td>https://i.ytimg.com/vi/UPcM0nzvKiU/hq720.jpg</td>
          <td>REDMI Gaming Controller</td>
          <td>⭐⭐⭐</td>
          <td>Control básico, diseño gaming con clip trasero, buena relación calidad-precio</td>
          <td>Android principalmente</td>
          <td>€25-35</td>
          <td>Disponible online</td>
          <td>Bluetooth 5.0</td>
          <td>500mAh, hasta 15h</td>
          <td>250g</td>
          <td>160 x 100 x 30mm</td>
          <td>Bueno</td>
        </tr>
        <tr>
          <td>https://m.media-amazon.com/images/I/61M++x2C96L._UF894,1000_QL80_.jpg</td>
          <td>GameSir X4 / X4 Aileron</td>
          <td>⭐⭐⭐⭐⭐</td>
          <td>Diseño avanzado, buena calidad, opciones inalámbricas, triggers analógicos</td>
          <td>Android, iOS, PC</td>
          <td>€60-75</td>
          <td>Disponible</td>
          <td>USB-C + Bluetooth</td>
          <td>800mAh, hasta 25h</td>
          <td>320g</td>
          <td>180 x 115 x 40mm</td>
          <td>Premium</td>
        </tr>
        <tr>
          <td>———————————————</td>
          <td>———————————————</td>
          <td>————————</td>
          <td>————————————————————————————————————————————————————————————————————————</td>
          <td>———————————————————</td>
          <td>—————————————————</td>
          <td>—————————————————————</td>
          <td>—————————————————</td>
          <td>—————————————————</td>
          <td>————————</td>
          <td>—————————————————</td>
          <td>————————————</td>
        </tr>
        <tr>
          <td>https://preview.redd.it/redmagic-shadow-blade-2-with-iphone-15-pro-black-v0-8gbxw80y859d1.jpeg</td>
          <td>RedMagic Shadowblade 2</td>
          <td>⭐⭐⭐⭐</td>
          <td>Diseño pro gamer, buena ergonomía, rendimiento sólido, RGB opcional</td>
          <td>Android, algunos iOS</td>
          <td>€50-65</td>
          <td>Limitada en Europa</td>
          <td>USB-C directo</td>
          <td>No aplica (cableado)</td>
          <td>300g</td>
          <td>175 x 108 x 38mm</td>
          <td>Muy bueno</td>
        </tr>
        <tr>
          <td>https://m.media-amazon.com/images/I/61efJo-qxiS.jpg</td>
          <td>Backbone One (PlayStation/Xbox variants)</td>
          <td>⭐⭐⭐⭐⭐</td>
          <td>Ligero, ergonómico, pads laterales sin clip trasero, calidad premium</td>
          <td>iOS principalmente</td>
          <td>€90-110</td>
          <td>Disponible premium</td>
          <td>Lightning/USB-C directo</td>
          <td>No aplica (cableado)</td>
          <td>185g</td>
          <td>155 x 95 x 25mm</td>
          <td>Premium iOS</td>
        </tr>
        <tr>
          <td>https://www.notebookcheck.net/fileadmin/_processed_/1/3/csm_M-Con-V2-gaming-controller-mid_35e0e6810c.jpg</td>
          <td>M-Con V2 Gaming Controller</td>
          <td>⭐⭐</td>
          <td>Mando básico, construcción sencilla, precio económico</td>
          <td>Android básico</td>
          <td>€15-25</td>
          <td>No está a la venta en Europa</td>
          <td>Bluetooth básico</td>
          <td>400mAh, hasta 12h</td>
          <td>200g</td>
          <td>150 x 90 x 28mm</td>
          <td>Descontinuado EU</td>
        </tr>
        <tr>
          <td>https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5FSzGRbaGB6ZuoAKVjK0Z23BOyGHv6knjig&s</td>
          <td>GameSir X2 / X2S Type-C</td>
          <td>⭐⭐⭐⭐</td>
          <td>Diseño que deja espacio para el módulo, buen agarre, conexión USB-C estable</td>
          <td>Android e iOS (con adaptador)</td>
          <td>€40-50</td>
          <td>Disponible</td>
          <td>USB-C directo</td>
          <td>No aplica (cableado)</td>
          <td>260g</td>
          <td>165 x 105 x 32mm</td>
          <td>Recomendado</td>
        </tr>
        <tr>
          <td>https://m.media-amazon.com/images/I/71+GwlwjuOL.jpg</td>
          <td>Razer Kishi V2 / Kishi V3 Pro</td>
          <td>⭐⭐⭐⭐⭐</td>
          <td>Diseño compacto, se conecta al puerto USB-C o Lightning, muy popular, calidad Razer</td>
          <td>Android, iOS</td>
          <td>€80-100</td>
          <td>Ampliamente disponible</td>
          <td>USB-C/Lightning directo</td>
          <td>No aplica (cableado)</td>
          <td>240g</td>
          <td>158 x 98 x 30mm</td>
          <td>Top tier</td>
        </tr>
        <tr>
          <td>https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnNvfS0uUDCpPcv6_gKWHWbAW2R8boLBFFLg&s</td>
          <td>GameSir X3 Type-C Cooling</td>
          <td>⭐⭐⭐⭐</td>
          <td>Personalizable, ajuste cómodo para móvil gaming, ventilador integrado</td>
          <td>Android gaming phones</td>
          <td>€55-70</td>
          <td>Disponible especializado</td>
          <td>USB-C + ventilador</td>
          <td>No aplica (powered by phone)</td>
          <td>340g</td>
          <td>185 x 120 x 45mm</td>
          <td>Gaming specialist</td>
        </tr>
        <tr>
          <td>https://ae01.alicdn.com/kf/Sf05ec5566f7f4aa69de2447896934616A.jpg</td>
          <td>iPega PG-9083S / PG-9083S Red Knight / PG-9211</td>
          <td>⭐⭐⭐</td>
          <td>Soporte telescópico, clip trasero tradicional, múltiples variantes disponibles</td>
          <td>Android, algunos iOS</td>
          <td>€20-35</td>
          <td>Disponible online</td>
          <td>Bluetooth 4.0/5.0</td>
          <td>380mAh, hasta 18h</td>
          <td>220g</td>
          <td>140 x 85 x 25mm</td>
          <td>Un solo mando básico</td>
        </tr>
        <tr>
          <td>https://www.powerplanetonline.com/cdnassets/gamepad_gamesir_t4_pro_04_ad_l.jpg</td>
          <td>GameSir T4 Pro / T4 Kaleid RGB</td>
          <td>⭐⭐⭐</td>
          <td>Clip trasero clásico, soporte ajustable, Bluetooth en T4 Kaleid, luces RGB</td>
          <td>Android, PC, iOS básico</td>
          <td>€35-45</td>
          <td>Disponible</td>
          <td>Bluetooth 5.0</td>
          <td>600mAh, hasta 22h</td>
          <td>290g</td>
          <td>165 x 100 x 35mm</td>
          <td>Más feo que pegarle a un pie pero funcional</td>
        </tr>
      </tbody>
    </table>
  `

  return (
    <div className="min-h-screen bg-[#F7F8FC] pt-[140px]">
      <div className="w-full px-4 sm:w-[83.33%] sm:px-0 max-w-[1000px] mx-auto flex flex-col items-center">
        <div className="bg-[rgba(203,219,227,0.1)] border border-[rgba(0,94,182,0.1)] rounded-[12px] shadow-md w-full md:w-[658px] xl:w-[800px] mb-8 block">
          
          {/* Exactamente el mismo diseño que las vistas de posts */}
          <article className="pt-6 px-4 pb-4 overflow-hidden">
            <div className="mb-6">
              <h1 className="text-2xl text-left mb-3 font-['Arial_Medium',_Arial,_sans-serif] font-normal">
                🎮 Tabla de Prueba: Gamepads para Móvil - Test Scroll Horizontal
              </h1>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>Página de prueba para testear scroll horizontal</span>
                <span className="mx-2">•</span>
                <span>SimpleTableConverter Test</span>
              </div>
              <p className="text-gray-600 text-left mb-6 text-lg leading-relaxed">
                Esta tabla es intencionalmente ancha para probar el scroll horizontal del SimpleTableConverter. 
                Debería aparecer una barra de scroll horizontal cuando la tabla sea más ancha que el contenedor.
              </p>
            </div>

            {/* Content usando AdvancedTableV2View (estable) */}
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-6">Comparativa Completa de Gamepads</h2>
              
              <p className="mb-4">
                La siguiente tabla contiene información detallada sobre diferentes modelos de gamepads. 
                Como tiene muchas columnas, debería activarse el scroll horizontal automáticamente.
              </p>

              <AdvancedTableV2View content={testTableContent} />
              
              <p className="mt-4">
                <strong>Instrucciones de prueba:</strong>
              </p>
              <ul>
                <li>Si ves una barra de scroll horizontal → ✅ Funciona correctamente</li>
                <li>Si la tabla se sale del contenedor → ❌ Necesita corrección</li>
                <li>Prueba en diferentes tamaños de pantalla</li>
                <li>Verifica que puedes hacer scroll horizontal para ver todas las columnas</li>
              </ul>
            </div>

            {/* Footer como en las vistas de posts */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Página de prueba</span>
                <span>Test: Scroll horizontal AdvancedTableV2View</span>
              </div>
            </div>
          </article>
        </div>

        {/* Botón para volver */}
        <div className="w-full md:w-[658px] xl:w-[800px] flex justify-center">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            ← Volver (Eliminar esta página después de las pruebas)
          </button>
        </div>
      </div>
    </div>
  )
}
