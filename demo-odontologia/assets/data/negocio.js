/* ============================================================
   Datos del negocio — TODO lo editable vive acá.
   Regla Umbral: ningún dato del negocio hardcodeado en el HTML
   donde se pueda evitar. El día que esto se enchufe a una base de
   datos real, se reemplaza este archivo y no se toca nada más.
   ============================================================ */
window.NEGOCIO = {

  // ---- Identidad ------------------------------------------------
  nombre: 'Ribera Odontología',
  bajada: 'Consultorio odontológico',
  ciudad: 'Concordia',
  provincia: 'Entre Ríos',
  direccion: 'Pellegrini 1243, Concordia, Entre Ríos',
  horarios: 'Lunes a viernes de 8 a 20 · Sábados de 9 a 13',
  // El teléfono que se muestra NO es ficticio: es el de Ian.
  // Un prospecto que ve la demo y llama tiene que llegarle a él,
  // no a un fijo inventado que no atiende nadie.
  telefono: '+54 9 11 5516-8112',

  // ---- Contacto real de Sistemas Umbral --------------------------
  // En las demos, el que escribe es un prospecto: tiene que llegarle a Ian.
  // Al vender la web, acá van los datos del cliente.
  email: 'sistemasumbral2026@gmail.com',
  whatsapp: '5491155168112',            // 54 9 + área + número, sin signos
  saludo: 'Hola 👋 Vengo de la web de Ribera Odontología. ',
  redes: {
    instagram: 'https://www.instagram.com/sistemasumbral/',
    facebook:  'https://www.facebook.com/sistemasumbral'
  },


  // ---- Obras sociales -------------------------------------------
  obrasSociales: [
    { nombre: 'OSDE', detalle: 'Planes 210 a 450 · consulta y prácticas básicas' },
    { nombre: 'Swiss Medical', detalle: 'SMG02 en adelante · con coseguro' },
    { nombre: 'IOSPER', detalle: 'Cobertura provincial · convenio directo' },
    { nombre: 'OSECAC', detalle: 'Consulta, limpieza y arreglos simples' },
    { nombre: 'PAMI', detalle: 'Prótesis y atención general para afiliados' },
    { nombre: 'Galeno', detalle: 'Planes azul y oro · con orden previa' },
    { nombre: 'Medifé', detalle: 'Todos los planes · reintegro parcial' },
    { nombre: 'Particular', detalle: 'Efectivo, transferencia y hasta 12 cuotas con tarjeta' }
  ],

  // ---- Preguntas frecuentes generales ---------------------------
  faqGeneral: [
    ['¿Atienden sin turno?', 'Solo urgencias. Para todo lo demás pedí turno por WhatsApp o desde la web: así te damos el tiempo real que necesita tu caso y no te hacemos esperar.'],
    ['¿Cuánto sale la primera consulta?', 'La consulta con diagnóstico y radiografía tiene un valor fijo, y te la descontamos del tratamiento si decidís hacerlo con nosotros.'],
    ['¿Me van a decir el precio antes?', 'Siempre. Salís de la primera visita con un plan escrito, con precios cerrados y con qué es urgente y qué puede esperar. Si algo cambia en el camino, se avisa antes.'],
    ['¿Trabajan con obras sociales?', 'Con la mayoría de las principales. Podés ver la lista completa en la página de obras sociales, y si la tuya no está te decimos cuánto sale como particular.'],
    ['¿Se puede pagar en cuotas?', 'Sí. Hasta 12 cuotas con tarjeta y planes propios en 3 o 6 pagos para tratamientos largos.'],
    ['Le tengo pánico al dentista, ¿qué hacen?', 'Es más común de lo que parece. Vamos despacio, explicamos cada paso, paramos cuando lo pedís y la primera visita puede ser solo para charlar y mirar, sin tocarte nada.'],
    ['¿Atienden chicos?', 'Sí, desde los 3 años. La primera visita de un chico es corta y sin instrumental: se trata de que el consultorio no le dé miedo.'],
    ['¿Qué pasa si me atraso o no puedo ir?', 'Avisanos por WhatsApp con la mayor anticipación posible y lo reprogramamos sin problema.']
  ],

  // ---- Servicios (el núcleo de este nicho) ----------------------
  servicios: [
    {
      id: 'chequeo',
      cat: 'prevencion',
      nombre: 'Chequeo y limpieza',
      tag: 'Lo más pedido',
      desc: 'Control completo, detartraje y pulido. Salís con un plan escrito de lo que hace falta y lo que puede esperar.',
      precio: 18000,
      duracion: '45 min',
      sesiones: '1 sesión',
      img: 'srv-chequeo',
      incluye: [
        'Control clínico de las 32 piezas y de las encías',
        'Detartraje con ultrasonido y pulido',
        'Detección temprana de caries',
        'Plan de tratamiento por escrito, con precios cerrados',
        'Instrucciones de higiene para tu caso puntual'
      ],
      faq: [
        ['¿Duele?', 'No. Es una limpieza con ultrasonido: se siente vibración y agua fría, nada más. Si tenés las encías muy inflamadas puede molestar un poco, y en ese caso usamos anestesia en gel.'],
        ['¿Cada cuánto conviene?', 'Cada seis meses para la mayoría. Si fumás, usás ortodoncia o tuviste problemas de encías, cada cuatro.'],
        ['¿Me van a querer vender algo más?', 'Te entregamos el plan por escrito con precios y prioridades. Vos decidís qué hacer y cuándo. No trabajamos con comisiones por tratamiento.']
      ]
    },
    {
      id: 'implantes',
      cat: 'rehabilitacion',
      nombre: 'Implantes dentales',
      tag: 'Con garantía escrita',
      desc: 'Reemplazo de la pieza perdida con implante de titanio y corona de porcelana. Planificado en 3D antes de tocarte.',
      precio: 520000,
      duracion: '90 min por sesión',
      sesiones: '2 sesiones + control',
      img: 'srv-implante',
      incluye: [
        'Tomografía 3D y planificación digital previa',
        'Implante de titanio de marca con trazabilidad',
        'Corona de porcelana hecha a medida del color de tus dientes',
        'Controles del primer año sin cargo',
        'Garantía escrita de 10 años sobre el implante'
      ],
      faq: [
        ['¿Cuánto tarda todo el tratamiento?', 'Entre 3 y 5 meses. La mayor parte es espera: el hueso tiene que integrar el implante antes de ponerle la corona. Las sesiones en el sillón son dos.'],
        ['¿Se puede pagar en cuotas?', 'Sí, hasta 12 cuotas con tarjeta y hay un plan propio en 6 pagos sin interés. Se arranca cuando está el 30%.'],
        ['¿Y si no tengo hueso suficiente?', 'Se hace un injerto previo. Lo sabemos con la tomografía del primer día, antes de que pagues nada.']
      ]
    },
    {
      id: 'ortodoncia',
      cat: 'ortodoncia',
      nombre: 'Ortodoncia invisible',
      tag: 'Sin brackets',
      desc: 'Alineadores transparentes que te sacás para comer. Con la simulación del resultado antes de empezar.',
      precio: 890000,
      duracion: 'Control cada 6 semanas',
      sesiones: '12 a 18 meses',
      img: 'srv-ortodoncia',
      incluye: [
        'Escaneo digital de la boca, sin pasta de molde',
        'Simulación en video de cómo va a quedar, antes de decidir',
        'Todos los juegos de alineadores del tratamiento',
        'Controles cada seis semanas incluidos',
        'Placa de contención al terminar'
      ],
      faq: [
        ['¿Se notan?', 'Muy poco. Son transparentes y finos. A un metro de distancia no se ven.'],
        ['¿Cuántas horas por día hay que usarlos?', '22 horas. Se sacan para comer y para lavarse los dientes. Si los usás menos, el tratamiento se estira.'],
        ['¿Sirve para cualquier caso?', 'Para la mayoría de los apiñamientos y separaciones. En mordidas muy complejas conviene brackets, y te lo decimos en la primera consulta aunque sea el tratamiento más barato.']
      ]
    },
    {
      id: 'estetica',
      cat: 'estetica',
      nombre: 'Estética dental',
      tag: null,
      desc: 'Blanqueamiento y carillas de porcelana. Diseño de sonrisa con prueba en la boca antes de tallar nada.',
      precio: 95000,
      duracion: '60 min',
      sesiones: '1 a 3 sesiones',
      img: 'srv-estetica',
      incluye: [
        'Blanqueamiento en consultorio con luz LED',
        'Diseño digital de la sonrisa sobre tu propia foto',
        'Prueba en boca antes de tallar cualquier pieza',
        'Kit de mantenimiento para casa',
        'Control al mes sin cargo'
      ],
      faq: [
        ['¿El blanqueamiento daña el esmalte?', 'No, hecho en consultorio y con las concentraciones correctas. Lo que sí puede dar es sensibilidad al frío por unos días.'],
        ['¿Cuánto dura el resultado?', 'Entre uno y dos años, según cuánto café, mate, vino o tabaco consumas.'],
        ['¿Las carillas son para siempre?', 'Duran entre 10 y 15 años bien cuidadas. Después se reemplazan.']
      ]
    },
    {
      id: 'urgencias',
      cat: 'prevencion',
      nombre: 'Urgencias',
      tag: 'Atención en el día',
      desc: 'Dolor, golpe o algo que se rompió. Guardamos turnos libres todos los días justamente para esto.',
      precio: 25000,
      duracion: '30 min',
      sesiones: 'Atención inmediata',
      img: 'srv-urgencia',
      incluye: [
        'Turnos reservados para urgencias todos los días',
        'Diagnóstico y control del dolor en la misma visita',
        'Radiografía en el momento si hace falta',
        'Resolución definitiva o provisoria según el caso',
        'Seguimiento por WhatsApp los días siguientes'
      ],
      faq: [
        ['¿Atienden sin turno?', 'Para urgencias sí. Escribinos por WhatsApp y te damos el hueco más cercano del día.'],
        ['¿Atienden los fines de semana?', 'Sábados hasta las 13. Fuera de ese horario dejá el mensaje y te contestamos apenas abrimos.'],
        ['¿Cuánto sale?', 'La consulta de urgencia tiene un valor fijo. Si hace falta un tratamiento, te pasamos el presupuesto antes de hacerlo.']
      ]
    },
    {
      id: 'diagnostico',
      cat: 'rehabilitacion',
      nombre: 'Diagnóstico digital',
      tag: null,
      desc: 'Radiografía panorámica y tomografía 3D en el consultorio. Sin mandarte a dar vueltas por la ciudad.',
      precio: 32000,
      duracion: '20 min',
      sesiones: '1 sesión',
      img: 'srv-diagnostico',
      incluye: [
        'Radiografía panorámica digital',
        'Tomografía 3D cuando el caso lo pide',
        'Informe explicado en lenguaje entendible',
        'Copia digital que te llevás por WhatsApp o mail',
        'Sin derivaciones: se hace todo acá'
      ],
      faq: [
        ['¿Tengo que pedir turno aparte?', 'No. Si en la consulta hace falta, se hace en el momento.'],
        ['¿Es mucha radiación?', 'Es equipo digital: la dosis es una fracción de la de un equipo viejo de placa. Igual usamos delantal plomado siempre.'],
        ['¿Sirve si me lo pidió otro odontólogo?', 'Sí, lo hacemos igual y te damos el archivo para que se lo lleves.']
      ]
    }
  ],

  // ---- Filtros del núcleo ---------------------------------------
  categorias: [
    { id: 'todos', label: 'Todos' },
    { id: 'prevencion', label: 'Prevención' },
    { id: 'ortodoncia', label: 'Ortodoncia' },
    { id: 'estetica', label: 'Estética' },
    { id: 'rehabilitacion', label: 'Rehabilitación' }
  ],

  // ---- Equipo ---------------------------------------------------
  equipo: [
    { nombre: 'Dra. Malena Ferreyra', rol: 'Directora · Implantología y rehabilitación', img: 'equipo-1' },
    { nombre: 'Dr. Tomás Bregliano', rol: 'Ortodoncia y ortopedia funcional', img: 'equipo-2' },
    { nombre: 'Lic. Carla Duarte', rol: 'Higiene, prevención y periodoncia', img: 'equipo-3' }
  ],

  // ---- Reseñas (sin avatar: regla anti-genérico) -----------------
  resenas: [
    { texto: 'Fui por una urgencia un viernes a la tarde y me atendieron en el día. Me explicaron qué tenía y cuánto salía antes de tocarme nada. Es la primera vez que salgo de un dentista sin sorpresas en la cuenta.', autor: 'Verónica A.', detalle: 'Urgencia · marzo 2026' },
    { texto: 'Me hice los alineadores. Lo que más me sirvió fue ver la simulación antes de arrancar: sabía exactamente cómo iba a terminar. Dieciséis meses y quedó igual que en el video.', autor: 'Nicolás P.', detalle: 'Ortodoncia invisible · 2025' },
    { texto: 'Le tengo pánico al dentista desde chica. Acá me dejaron ir despacio, parando cuando lo necesitaba. Me hice dos implantes que venía postergando hace cuatro años.', autor: 'Silvia M.', detalle: 'Implantes · enero 2026' }
  ],

  // ---- Números (se animan al entrar en pantalla) ----------------
  stats: [
    { n: 2014, suf: '', label: 'Atendiendo en Concordia desde' },
    { n: 6, suf: '', label: 'Profesionales en el equipo' },
    { n: 24, suf: ' h', label: 'Respondemos WhatsApp en menos de' },
    { n: 10, suf: ' años', label: 'Garantía escrita en implantes' }
  ]
};
