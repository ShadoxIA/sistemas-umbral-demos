/* ============================================================
   Datos del negocio — TODO lo editable vive acá.
   Regla Umbral: ningún dato del negocio hardcodeado en el HTML
   donde se pueda evitar. El día que esto se enchufe a una base de
   datos real, se reemplaza este archivo y no se toca nada más.

   Nicho: restaurante · núcleo CARTA como menú digital (menú por
   categorías, cada plato con ficha en modal y pedido por WhatsApp,
   precio siempre visible).
   ============================================================ */
window.NEGOCIO = {

  // ---- Identidad ------------------------------------------------
  nombre: 'Rescoldo',
  bajada: 'Parrilla de fuego lento',
  ciudad: 'Concordia',
  provincia: 'Entre Ríos',
  direccion: 'Av. Costanera 145, Concordia, Entre Ríos',
  horarios: 'Martes a domingo de 20 a 00:30 · Domingos también mediodía de 12 a 15',
  // El teléfono que se muestra NO es ficticio: es el de Ian.
  // Un prospecto que ve la demo y llama tiene que llegarle a él,
  // no a un fijo inventado que no atiende nadie.
  telefono: '+54 9 11 5516-8112',

  // ---- Contacto real de Sistemas Umbral --------------------------
  // En las demos, el que escribe es un prospecto: tiene que llegarle a Ian.
  // Al vender la web, acá van los datos del cliente.
  email: 'sistemasumbral2026@gmail.com',
  whatsapp: '5491155168112',            // 54 9 + área + número, sin signos
  saludo: 'Hola 👋 Vengo de la web de Rescoldo. ',
  redes: {
    instagram: 'https://www.instagram.com/sistemasumbral/',
    facebook:  'https://www.facebook.com/sistemasumbral'
  },

  // ---- Formas de pago (lo que aplica al rubro, reemplaza a "cobertura") ----
  formasPago: [
    { nombre: 'Efectivo', detalle: '10% de descuento sobre el total de la cuenta.' },
    { nombre: 'Tarjetas', detalle: 'Débito y crédito, todas las tarjetas. Hasta 3 cuotas sin interés.' },
    { nombre: 'MODO y QR', detalle: 'Pagás desde la mesa con el celular, sin esperar la máquina.' },
    { nombre: 'Transferencia', detalle: 'Alias en la boleta, se acredita al instante.' },
    { nombre: 'Cuenta corriente', detalle: 'Para clientes de siempre y empresas, con acuerdo previo.' },
    { nombre: 'Gift card', detalle: 'Tarjeta de regalo por el monto que quieras, para usar cuando quieran.' }
  ],

  // ---- Preguntas frecuentes generales ---------------------------
  faqGeneral: [
    ['¿Hace falta reservar?', 'De jueves a domingo, sí: se llena. Reservá por WhatsApp o desde la web y te guardamos la mesa. Entre semana solés entrar sin problema, salvo grupos grandes.'],
    ['¿Tienen opciones sin TACC?', 'Sí. La parrilla es naturalmente sin TACC y marcamos en la carta lo que es apto celíaco. Avisá al reservar y preparamos todo por separado, con utensilios aparte.'],
    ['¿Hay opciones vegetarianas?', 'Sí: provoleta, ensaladas de estación, pastas con salsas sin carne y guarniciones a la parrilla. No es lo nuestro, pero nadie se queda sin comer bien.'],
    ['¿Puedo ir con chicos?', 'Claro. Tenemos sillas altas, media porción para los más chicos y un patio interno donde se mueven tranquilos.'],
    ['¿Hacen delivery o para llevar?', 'Para llevar, sí, con el mismo fuego. Delivery propio en el centro de Concordia de jueves a domingo. Pedidos por WhatsApp.'],
    ['¿Tienen estacionamiento?', 'Hay estacionamiento sobre la costanera, a media cuadra, y un playón propio para comensales las noches de fin de semana.'],
    ['¿Reciben grupos grandes o eventos?', 'Sí. Tenemos un salón privado para hasta 40 personas, con menú cerrado para cumpleaños, empresas y fin de año. Se arma con anticipación.'],
    ['¿Cuánto sale comer, más o menos?', 'Un cubierto promedio con entrada para compartir, un corte de la parrilla, guarnición y una copa ronda un valor de referencia que te pasamos al reservar. Los precios de la carta están a la vista.']
  ],

  // ---- El núcleo: la CARTA, por categorías ----------------------
  // Menú digital: CUALQUIER plato puede llevar `img` (el dueño las sube
  // desde el panel). Cada plato tiene dos botones en la carta —"Más info"
  // abre su ficha en un modal sin salir de la carta, "Pedir" lo suma al
  // pedido de delivery. Los `estrella: true` además llevan `incluye`/`faq`.
  // En esta demo solo los estrella traen foto real; el resto muestra un
  // placeholder de marca hasta que se carguen desde el panel.
  carta: [
    {
      cat: 'entradas', label: 'Para empezar',
      items: [
        {
          id: 'provoleta',
          nombre: 'Provoleta a la llama',
          tag: 'La más pedida',
          desc: 'Provolone fundido sobre las brasas, orégano de la casa, un hilo de oliva y pan de campo tostado.',
          precio: 8900,
          estrella: true,
          img: 'plato-provoleta',
          incluye: [
            'Provolone estacionado, fundido directo sobre la parrilla',
            'Orégano y ají molido de la casa',
            'Pan de campo tostado al rescoldo',
            'Alcanza para compartir entre dos',
            'Apta celíacos si se pide sin el pan'
          ],
          faq: [
            ['¿Alcanza para compartir?', 'Sí, es una entrada pensada para dos. Si son cuatro y quieren picar, conviene pedir dos.'],
            ['¿La hacen sin gluten?', 'La provoleta es apta celíaca. La servimos sin el pan y con utensilios aparte si nos avisás.'],
            ['¿Se puede pedir sin orégano?', 'Por supuesto. Decinos y te la mandamos tal cual la quieras.']
          ]
        },
        { nombre: 'Empanadas de carne a cuchillo', desc: 'Carne cortada a cuchillo, jugosas, repulgue a mano. Se piden por unidad.', precio: 2400, estrella: false },
        { nombre: 'Tabla de fiambres y quesos', desc: 'Para la mesa: quesos estacionados, bondiola casera, salame de campo y encurtidos.', precio: 12500, estrella: false },
        { nombre: 'Chorizo y morcilla', desc: 'El clásico antes del asado, a las brasas, con chimichurri y pan.', precio: 5200, estrella: false }
      ]
    },
    {
      cat: 'parrilla', label: 'De la parrilla',
      items: [
        {
          id: 'bife-chorizo',
          nombre: 'Bife de chorizo de campo',
          tag: 'El corte de la casa',
          desc: 'Pieza de 400 g de novillo de pastura, sellada a fuego fuerte y terminada al costado de la parrilla.',
          precio: 17500,
          estrella: true,
          img: 'plato-bife',
          incluye: [
            'Corte de 400 g de novillo de pastura',
            'Cocción a leña, al punto que pidas',
            'Sal parrillera y chimichurri de la casa',
            'Una guarnición a elección incluida',
            'Servido en tabla, para cortar en la mesa'
          ],
          faq: [
            ['¿Qué punto recomiendan?', 'A punto jugoso, para que no pierda lo tierno. Pero lo hacemos como te guste: decilo al pedirlo y respetamos el punto.'],
            ['¿Viene con guarnición?', 'Sí, una a elección: papas rústicas, ensalada mixta o verduras a la parrilla. Las demás se suman aparte.'],
            ['¿Alcanza para dos?', 'Es un corte generoso para una persona con buen apetito. Para compartir conviene sumar una guarnición o una entrada.']
          ]
        },
        {
          id: 'asado-tira',
          nombre: 'Asado de tira',
          tag: 'Tres horas de fuego',
          desc: 'Tira ancha de novillo a fuego lento hasta que se desprende del hueso. Se sirve en tabla, con guarnición.',
          precio: 15200,
          estrella: true,
          img: 'plato-asado',
          incluye: [
            'Tira ancha de novillo, corte generoso',
            'Tres horas de cocción lenta a la parrilla',
            'Chimichurri y salsa criolla de la casa',
            'Una guarnición a elección incluida',
            'Servido en tabla, para compartir'
          ],
          faq: [
            ['¿Alcanza para compartir?', 'Sí. Es un corte largo y sustancioso: dos personas comen bien con una tira y un par de guarniciones.'],
            ['¿Por qué tarda tanto?', 'El asado de tira necesita fuego lento para ablandarse sin secarse. Por eso conviene reservar: lo tenemos a punto para tu hora.'],
            ['¿Se puede pedir para llevar?', 'Sí, sale igual de tierno. Lo empacamos para que aguante el viaje sin perder el jugo.']
          ]
        },
        { nombre: 'Mollejas al limón', desc: 'De corazón, selladas crocantes por fuera y jugosas adentro, terminadas con limón a la parrilla.', precio: 16800, estrella: false },
        { nombre: 'Ojo de bife', desc: 'Corte marmolado de 350 g, sellado y jugoso. El favorito de los que saben.', precio: 18900, estrella: false },
        { nombre: 'Vacío al horno de barro', desc: 'Cocido lento en horno de barro, tierno para cortar con el tenedor.', precio: 14800, estrella: false },
        { nombre: 'Bondiola de cerdo a la parrilla', desc: 'Marinada en hierbas y cocida despacio, con salsa criolla.', precio: 13500, estrella: false },
        { nombre: 'Guarniciones', desc: 'Papas rústicas, ensalada mixta, provenzal o verduras a la parrilla.', precio: 4200, estrella: false }
      ]
    },
    {
      cat: 'pastas', label: 'Pastas caseras',
      items: [
        { nombre: 'Sorrentinos de osobuco', desc: 'Rellenos de osobuco braseado, con salsa de tomate y albahaca de la huerta.', precio: 12800, estrella: false },
        { nombre: 'Ravioles de verdura y ricota', desc: 'Masa fina hecha en casa, con la salsa que elijas.', precio: 10900, estrella: false },
        { nombre: 'Ñoquis del 29', desc: 'De papa, livianos, con estofado lento o fileto. Solo los fines de semana.', precio: 10200, estrella: false }
      ]
    },
    {
      cat: 'postres', label: 'Postres',
      items: [
        { nombre: 'Flan casero', desc: 'Con dulce de leche y crema, o las dos cosas. Como debe ser.', precio: 5600, estrella: false },
        { nombre: 'Panqueque de manzana flambeado', desc: 'Flambeado en la mesa, con helado de crema americana.', precio: 6800, estrella: false },
        { nombre: 'Helado artesanal', desc: 'Dos bochas de la heladería de la esquina, sabores de estación.', precio: 4800, estrella: false }
      ]
    },
    {
      cat: 'vinos', label: 'Vinos y tragos',
      items: [
        { nombre: 'Malbec de la casa · copa', desc: 'Tinto de bodega entrerriana, servido a temperatura de sótano.', precio: 4200, estrella: false },
        { nombre: 'Malbec Reserva · botella', desc: 'Guarda de 12 meses, para acompañar la parrilla. Ver carta de vinos completa.', precio: 22000, estrella: false },
        { nombre: 'Gin tonic de estación', desc: 'Con botánicos y cítricos de Concordia.', precio: 6500, estrella: false },
        { nombre: 'Agua, gaseosa o cerveza artesanal', desc: 'Cerveza de la región, tirada. Gaseosas línea completa.', precio: 2600, estrella: false }
      ]
    }
  ],

  // ---- Filtros del núcleo (para la página de la carta) ----------
  categorias: [
    { id: 'todos', label: 'Toda la carta' },
    { id: 'entradas', label: 'Para empezar' },
    { id: 'parrilla', label: 'De la parrilla' },
    { id: 'pastas', label: 'Pastas' },
    { id: 'postres', label: 'Postres' },
    { id: 'vinos', label: 'Vinos y tragos' }
  ],

  // ---- Equipo ---------------------------------------------------
  equipo: [
    { nombre: 'Aníbal Sosa', rol: 'Parrillero · 20 años frente al fuego', img: 'equipo-1' },
    { nombre: 'Rocío Bianchi', rol: 'Jefa de salón y reservas', img: 'equipo-2' },
    { nombre: 'Marcelo Duarte', rol: 'Cocina y pastas caseras', img: 'equipo-3' }
  ],

  // ---- Reseñas (sin avatar: regla anti-genérico) -----------------
  resenas: [
    { texto: 'Fuimos por un cumpleaños de quince personas y armaron un menú cerrado impecable. El asado de tira se deshacía. Nos atendieron como si fuéramos los únicos en el salón.', autor: 'Gustavo R.', detalle: 'Cena de grupo · marzo 2026' },
    { texto: 'La provoleta y el bife de chorizo son otra categoría. Se nota la leña, no es una parrilla de gas disfrazada. La carta de vinos entrerrianos fue una sorpresa hermosa.', autor: 'Mariana T.', detalle: 'Cena para dos · 2025' },
    { texto: 'Soy celíaca y por primera vez comí en una parrilla sin miedo. Prepararon todo aparte, me avisaron qué era apto y qué no. Volví tres veces desde entonces.', autor: 'Lucía F.', detalle: 'Cena · enero 2026' }
  ],

  // ---- Números (se animan al entrar en pantalla) ----------------
  stats: [
    { n: 1998, suf: '', label: 'A fuego de leña en Concordia desde' },
    { n: 3, suf: ' h', label: 'De cocción lenta lleva el asado de tira' },
    { n: 100, suf: '%', label: 'Leña y carbón, nunca gas' },
    { n: 40, suf: '', label: 'Etiquetas en la carta de vinos' }
  ]
};
