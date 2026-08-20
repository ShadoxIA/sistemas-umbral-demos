/* ============================================================
   Datos del negocio — TODO lo editable vive acá.
   Regla Umbral: ningún dato del negocio hardcodeado en el HTML
   donde se pueda evitar. El día que esto se enchufe a una base de
   datos real, se reemplaza este archivo y no se toca nada más.

   Nicho: concesionaria · núcleo CATÁLOGO (grilla de fichas de auto
   con foto, precio y tres datos + filtros; cada ficha lleva a su
   página de detalle). Incluye los parámetros del COTIZADOR: hoy son
   ficticios, mañana el dueño los configura desde el panel para que la
   web devuelva una cotización aproximada (permuta, financiación y
   compra de usado).
   ============================================================ */
window.NEGOCIO = {

  // ---- Identidad ------------------------------------------------
  nombre: 'Litoral Automotores',
  bajada: '0km y usados con garantía',
  ciudad: 'Santa Fe',
  provincia: 'Santa Fe',
  direccion: 'Bv. Pellegrini 3200, Santa Fe, Santa Fe',
  horarios: 'Lunes a viernes de 9 a 19 · Sábados de 9 a 13',
  // El teléfono que se muestra NO es ficticio: es el de Ian.
  // Un prospecto que ve la demo y llama tiene que llegarle a él,
  // no a un fijo inventado que no atiende nadie.
  telefono: '+54 9 11 5516-8112',

  // ---- Contacto real de Sistemas Umbral --------------------------
  // En las demos, el que escribe es un prospecto: tiene que llegarle a Ian.
  // Al vender la web, acá van los datos del cliente.
  email: 'sistemasumbral2026@gmail.com',
  whatsapp: '5491155168112',            // 54 9 + área + número, sin signos
  saludo: 'Hola 👋 Vengo de la web de Litoral Automotores. ',
  redes: {
    instagram: 'https://www.instagram.com/sistemasumbral/',
    facebook:  'https://www.facebook.com/sistemasumbral'
  },

  // ---- Financiación (lo que aplica al rubro, reemplaza a "cobertura") ----
  financiacion: [
    { nombre: 'Financiación 100%', detalle: 'Te llevás el auto sin entrega inicial. Sujeto a aprobación crediticia, en cuotas fijas en pesos.' },
    { nombre: 'Con entrega de tu usado', detalle: 'Tomamos tu usado como parte de pago y financiamos el saldo. Cotizás el aproximado en la web.' },
    { nombre: 'Prenda en cuotas', detalle: 'Hasta 60 cuotas con prenda sobre la unidad. Aprobación en el día con monotributo o recibo.' },
    { nombre: 'Crédito UVA y bancario', detalle: 'Trabajamos con los principales bancos. Te ayudamos con la carpeta y la gestión completa.' },
    { nombre: 'Transferencia y gestoría', detalle: 'Hacemos toda la transferencia, verificación policial y patentamiento por vos.' },
    { nombre: 'Garantía escrita', detalle: 'Todos los usados salen con garantía escrita de motor y caja, y revisación de 120 puntos.' }
  ],

  // ---- Parámetros del COTIZADOR ---------------------------------
  // TODO lo que define "cuánto te doy" y "cuánto pagás" vive acá, para que
  // el día de mañana el dueño lo edite desde el panel sin tocar código.
  // La cotización es SIEMPRE un aproximado: asume el usado en buen estado,
  // sujeto a revisión en la concesionaria.
  cotizador: {
    // Financiación: cuota por sistema francés.
    financiacion: {
      plazos: [12, 24, 36, 48, 60],   // cuotas ofrecidas
      cftAnual: 0.79,                 // costo financiero total anual aprox (ficticio)
      anticipoMinPct: 0.30,           // anticipo mínimo cuando NO es 100% financiado
      permite100: true                // habilita la opción "sin entrega" (100% financiado)
    },
    // Estimador del valor de un usado a partir de MARCA + MODELO + AÑO + KM.
    // Devuelve el valor de un ejemplar IMPECABLE de ese auto: es EL número que
    // ve el cliente, generoso a propósito para que se acerque. El margen real
    // (o la comisión de consignación) se define en persona, nunca online. El
    // cliente NUNCA escribe el precio: siempre se calcula. Mañana el dueño
    // carga estos valores desde el panel con data real y actual de mercado.
    estimador: {
      anioBase: 2026,
      deprAnual: 0.09,        // depreciación por año
      kmPromedioAnual: 15000, // km "esperados" por año de uso
      ajusteKmMax: 0.10,      // ± hasta 10% según los km reales vs los esperados
      // valorBase = valor de mercado de un ejemplar IMPECABLE (casi 0km), en pesos.
      marcas: [
        { marca: 'Toyota', modelos: [
          { modelo: 'Hilux',    valorBase: 68000000 },
          { modelo: 'Corolla',  valorBase: 42000000 },
          { modelo: 'RAV4',     valorBase: 80000000 },
          { modelo: 'Etios',    valorBase: 23000000 }
        ] },
        { marca: 'Ford', modelos: [
          { modelo: 'Ranger',   valorBase: 63000000 },
          { modelo: 'EcoSport', valorBase: 29000000 },
          { modelo: 'Focus',    valorBase: 31000000 }
        ] },
        { marca: 'Volkswagen', modelos: [
          { modelo: 'Amarok',   valorBase: 66000000 },
          { modelo: 'Gol',      valorBase: 21000000 },
          { modelo: 'Vento',    valorBase: 38000000 },
          { modelo: 'T-Cross',  valorBase: 44000000 }
        ] },
        { marca: 'Chevrolet', modelos: [
          { modelo: 'Onix',     valorBase: 27000000 },
          { modelo: 'Cruze',    valorBase: 39000000 },
          { modelo: 'Tracker',  valorBase: 45000000 }
        ] },
        { marca: 'Fiat', modelos: [
          { modelo: 'Cronos',   valorBase: 26000000 },
          { modelo: 'Toro',     valorBase: 48000000 }
        ] },
        { marca: 'Peugeot', modelos: [
          { modelo: '208',      valorBase: 28000000 },
          { modelo: '2008',     valorBase: 40000000 }
        ] },
        { marca: 'Renault', modelos: [
          { modelo: 'Kangoo',   valorBase: 30000000 },
          { modelo: 'Sandero',  valorBase: 24000000 },
          { modelo: 'Duster',   valorBase: 38000000 }
        ] },
        { marca: 'Jeep', modelos: [
          { modelo: 'Compass',  valorBase: 60000000 },
          { modelo: 'Renegade', valorBase: 46000000 }
        ] }
      ]
    }
  },

  // ---- Preguntas frecuentes generales ---------------------------
  faqGeneral: [
    ['¿Toman mi usado como parte de pago?', 'Sí, es lo más común. Cotizás el aproximado en la web en un minuto y después traés el auto: lo revisamos, verificamos y ahí te confirmamos el valor final. Lo que te doy en la web asume el auto en buen estado.'],
    ['¿Puedo financiar el 100%?', 'Sí, tenemos planes sin entrega inicial, sujetos a aprobación crediticia. También podés dejar tu usado como anticipo y financiar solo el saldo, que te baja mucho la cuota.'],
    ['¿Qué necesito para sacar la prenda?', 'DNI, constancia de CUIT o recibo de sueldo, y comprobante de domicilio. Con monotributo también se puede. La aprobación suele salir en el día.'],
    ['¿Los usados tienen garantía?', 'Todos salen con garantía escrita de motor y caja, y pasan una revisación de 120 puntos antes de publicarse. Si algo no está bien, lo arreglamos nosotros.'],
    ['¿Hacen la transferencia ustedes?', 'Sí. Nos ocupamos de la verificación policial, la transferencia y el patentamiento. Te entregamos el auto con todo en regla y a tu nombre.'],
    ['¿Puedo probar el auto antes de comprar?', 'Claro. Coordinás un test drive por WhatsApp o desde la web y lo manejás con un asesor. Sin compromiso.'],
    ['¿Reciben autos de otras provincias?', 'Sí, recibimos permutas de todo el Litoral. Coordinamos la logística y la verificación aunque el auto esté patentado en otra provincia.'],
    ['¿El precio de la web es el final?', 'Es el precio de lista de contado. Puede variar según la forma de pago y la unidad concreta. Lo confirmamos siempre por WhatsApp antes de cerrar.']
  ],

  // ---- El núcleo: el CATÁLOGO -----------------------------------
  // Cada auto: foto, precio y TRES datos (año · km · transmisión) en la
  // ficha de la grilla. Los `destacado: true` aparecen en la home y llevan
  // además `incluye` (equipamiento) y `faq` para su página de detalle.
  // `tipo` alimenta el filtro (pickup/suv/sedan/hatch) y `condicion` el
  // filtro 0km/usado. El precio está en pesos.
  catalogo: [
    {
      id: 'ram-1500-laramie',
      marca: 'RAM', modelo: '1500', version: 'Laramie 5.7 V8 4x4',
      tipo: 'pickup', condicion: '0km',
      anio: 2024, km: 0, transmision: 'Automática', combustible: 'Nafta',
      precio: 89500000, tag: '0 km', destacado: true, img: 'auto-ram',
      incluye: [
        'Motor 5.7 HEMI V8, 395 CV, tracción 4x4',
        'Caja automática de 8 velocidades',
        'Tapizado de cuero, butacas con calefacción y ventilación',
        'Pantalla Uconnect de 12", Apple CarPlay y Android Auto',
        'Cámara 360°, sensores y asistente de estacionamiento',
        'Garantía oficial de fábrica'
      ],
      faq: [
        ['¿Está disponible para entrega inmediata?', 'Sí, la unidad está físicamente en el salón. Entrega inmediata con toda la documentación al día.'],
        ['¿Aceptan mi pickup usada en parte de pago?', 'Sí. Tomamos tu Hilux, Ranger o Amarok y financiamos el saldo. Cotizá el aproximado desde la web.'],
        ['¿Tiene garantía?', 'Garantía oficial de fábrica RAM, más nuestro servicio de posventa en Santa Fe.']
      ]
    },
    {
      id: 'toyota-rav4-hybrid',
      marca: 'Toyota', modelo: 'RAV4', version: 'Hybrid Limited AWD',
      tipo: 'suv', condicion: 'usado',
      anio: 2023, km: 31000, transmision: 'Automática', combustible: 'Híbrido',
      precio: 71000000, tag: 'Híbrido', destacado: true, img: 'auto-rav4',
      incluye: [
        'Motor híbrido 2.5, 222 CV combinados, tracción integral',
        'Consumo real de 5,5 L cada 100 km',
        'Único dueño, service oficial al día',
        'Techo panorámico y portón eléctrico',
        'Toyota Safety Sense: frenado autónomo y control de crucero adaptativo',
        'Revisación de 120 puntos y garantía escrita'
      ],
      faq: [
        ['¿Cuánto consume de verdad?', 'En ciudad ronda los 5,5 L cada 100 km. El sistema híbrido recupera energía al frenar, así que en tránsito rinde muchísimo.'],
        ['¿La batería del híbrido tiene garantía?', 'Sí. Además de nuestra garantía de motor y caja, la batería híbrida conserva la cobertura extendida de Toyota.'],
        ['¿Se puede reservar?', 'Sí, con una seña se reserva y lo sacamos de publicación mientras coordinás la operación.']
      ]
    },
    {
      id: 'bmw-serie5-530i',
      marca: 'BMW', modelo: 'Serie 5', version: '530i M Sport',
      tipo: 'sedan', condicion: 'usado',
      anio: 2019, km: 88000, transmision: 'Automática', combustible: 'Nafta',
      precio: 47000000, tag: 'Línea premium', destacado: true, img: 'auto-serie5',
      incluye: [
        'Motor 2.0 turbo, 252 CV',
        'Paquete M Sport, llantas de 19"',
        'Tapizado de cuero Dakota, climatizador bizona',
        'Head-up display y asistente de conducción',
        'Historial de service en concesionario oficial',
        'Revisación de 120 puntos y garantía escrita'
      ],
      faq: [
        ['¿Tiene los services hechos?', 'Sí, con historial en oficial. Antes de entregarlo hacemos el service completo y la revisación de 120 puntos.'],
        ['¿Acepta permuta por un auto más chico?', 'Sí, y te devolvemos la diferencia o la financiamos. Cotizá tu usado en la web para tener el número aproximado.'],
        ['¿Cuánto sale el seguro?', 'Te acercamos tres cotizaciones de aseguradoras al momento de la entrega para que elijas la que más te convenga.']
      ]
    },
    {
      id: 'toyota-hilux-srx',
      marca: 'Toyota', modelo: 'Hilux', version: 'SRX 2.8 TDI 4x4',
      tipo: 'pickup', condicion: 'usado',
      anio: 2022, km: 78000, transmision: 'Manual', combustible: 'Diésel',
      precio: 42900000, tag: 'Permuta y financiación', destacado: false, img: 'auto-hilux'
    },
    {
      id: 'porsche-macan-s',
      marca: 'Porsche', modelo: 'Macan', version: 'S 3.0 V6',
      tipo: 'suv', condicion: 'usado',
      anio: 2020, km: 52000, transmision: 'Automática', combustible: 'Nafta',
      precio: 95000000, tag: 'Premium', destacado: false, img: 'auto-macan'
    },
    {
      id: 'bmw-serie4-coupe',
      marca: 'BMW', modelo: 'Serie 4', version: '430i Coupé M Sport',
      tipo: 'sedan', condicion: 'usado',
      anio: 2021, km: 45000, transmision: 'Automática', combustible: 'Nafta',
      precio: 58000000, tag: 'Coupé', destacado: false, img: 'auto-serie4'
    },
    {
      id: 'jeep-compass',
      marca: 'Jeep', modelo: 'Compass', version: 'Longitude 1.3T',
      tipo: 'suv', condicion: 'usado',
      anio: 2021, km: 64000, transmision: 'Automática', combustible: 'Nafta',
      precio: 38500000, tag: 'Financiación 100%', destacado: false, img: 'auto-compass'
    },
    {
      id: 'hyundai-i30',
      marca: 'Hyundai', modelo: 'i30', version: '1.6 GLS',
      tipo: 'hatch', condicion: 'usado',
      anio: 2018, km: 96000, transmision: 'Manual', combustible: 'Nafta',
      precio: 22900000, tag: 'Ideal primer auto', destacado: false, img: 'auto-i30'
    }
  ],

  // ---- Filtros del núcleo (para la página del catálogo) ---------
  // Dos dimensiones, se combinan con Y: condición + tipo.
  filtros: {
    condicion: [
      { id: 'todos', label: 'Todos' },
      { id: '0km',   label: '0 km' },
      { id: 'usado', label: 'Usados' }
    ],
    tipo: [
      { id: 'todos',  label: 'Todos' },
      { id: 'pickup', label: 'Pickups' },
      { id: 'suv',    label: 'SUV' },
      { id: 'sedan',  label: 'Sedanes' },
      { id: 'hatch',  label: 'Hatchbacks' }
    ]
  },

  // ---- Equipo ---------------------------------------------------
  equipo: [
    { nombre: 'Diego Ferreyra', rol: 'Ventas · 0km y planes de ahorro', img: 'equipo-1' },
    { nombre: 'Carla Montenegro', rol: 'Usados y tasación de permutas', img: 'equipo-2' },
    { nombre: 'Emanuel Rossi', rol: 'Financiación y gestoría', img: 'equipo-3' }
  ],

  // ---- Reseñas (sin avatar: regla anti-genérico) -----------------
  resenas: [
    { texto: 'Entregué mi Corolla y me llevé una Hilux financiando el saldo. La tasación que me dieron en la web fue casi igual a la que me pagaron después de revisarla. Cero vueltas.', autor: 'Marcos D.', detalle: 'Compró una Hilux SRX · abril 2026' },
    { texto: 'Buscaba un usado con garantía de verdad y acá me lo dieron por escrito. A los dos meses tuve un ruido en la caja y me lo cubrieron sin discutir. Se nota la seriedad.', autor: 'Valeria S.', detalle: 'Compró un Jeep Compass · 2025' },
    { texto: 'Me aprobaron la prenda en el día siendo monotributista. Emanuel me armó toda la carpeta y me explicó cada cuota. Salí manejando el auto el mismo sábado.', autor: 'Julián P.', detalle: 'Compró un Hyundai i30 · enero 2026' }
  ],

  // ---- Números (se animan al entrar en pantalla) ----------------
  stats: [
    { n: 1994, suf: '', label: 'Vendiendo autos en el Litoral desde' },
    { n: 6500, suf: '+', label: 'Autos entregados y patentados' },
    { n: 100, suf: '%', label: 'Financiación disponible, sin entrega' },
    { n: 120, suf: '', label: 'Puntos de revisión en cada usado' }
  ]
};
