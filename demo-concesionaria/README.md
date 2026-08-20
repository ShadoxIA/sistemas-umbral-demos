# Litoral Automotores — Demo de nicho: concesionaria

Demo de prospección de **Sistemas Umbral**. Home larga + catálogo con filtros + ficha de cada auto +
cotizador online + panel de muestra. Negocio, stock, precios y reseñas son **ficticios**.

Prueba que el esqueleto Umbral aguanta el registro **oscuro** con núcleo **catálogo**. Piel oscura,
pareja **Motor** (Archivo Expanded + Inter, MAYÚSCULAS), movimiento **alto**, acento lima ácido.

## Qué trae

```
demo-concesionaria/
├── index.html              # home: las 10 piezas del esqueleto
├── nosotros.html           # quiénes somos + cómo funciona + equipo
├── equipo.html             # ventas, tasación y financiación
├── catalogo.html           # el núcleo: grilla de autos con filtros (condición + tipo)
├── vehiculo.html           # ficha de detalle, data-driven (?id=…): una sola página para todos los autos
├── financiacion.html       # planes: 100%, prenda, permuta, crédito
├── preguntas.html          # preguntas frecuentes
├── cotiza.html             # cotizador online: permuta, financiación y venta de usado
├── contacto.html           # vías de contacto + mapa
├── panel/index.html        # panel de muestra (3 pantallas navegables)
├── assets/
│   ├── css/styles.css      # sistema de diseño + componentes de la web
│   ├── css/panel.css       # el panel, con los mismos tokens
│   ├── js/main.js          # movimiento, catálogo, filtros, ficha, cotizador, WhatsApp
│   ├── js/panel.js         # datos y gráficos del panel
│   ├── js/lenis.min.js     # scroll suave (descargado, no CDN)
│   ├── data/negocio.js     # ← TODOS los datos editables viven acá (catálogo + parámetros del cotizador)
│   ├── data/creditos.json  # de dónde salió cada foto
│   └── img/                # 14 fotos, descargadas y locales
└── README.md
```

## Cómo se aplicó el ADN (v2.2)

| Decisión | Acá |
|---|---|
| Base visual | **Oscura** (`#0A0A0C`) |
| Hero | Foto de una pickup detrás, con **lavado de acento** (lima en su peso hondo, olivo) y zoom lento de 18s + **parallax** al scrollear. Texto a la izquierda. |
| Menú | Transparente sobre el hero → sólido y compacto al bajar. Desplegable "Clientes" con financiación, preguntas y cotizador. |
| Tipografía | **Motor**: Archivo Expanded (700) + Inter, titulares en **MAYÚSCULAS** |
| Acento | Lima ácido `#B8F224`, en una sola variable. Como es muy claro, va como **relleno con texto oscuro** (botones/tags) y como **texto de acento** sobre el fondo negro (`--clay`). El velo del hero usa su peso hondo (olivo) para no matar el contraste. |
| Movimiento | Registro **alto**: 48px de desplazamiento, 0.45s, parallax marcado |
| Núcleo | Forma **catálogo**: grilla de fichas con foto, precio y tres datos (año · km · caja), filtros arriba, cada ficha lleva a **su página** de detalle |
| Conversión | WhatsApp (mensaje por auto) **+ cotizador online** (permuta / financiación / venta) que termina en WhatsApp con el número ya calculado |
| Firma | Chevron `›` en botones, viñetas, migas y en el reemplazo de fotos |

## El cotizador (lo específico de este nicho)

Vive en `cotiza.html` y se calcula **en la misma página**, sin preguntar por WhatsApp. El usado se
identifica por **marca + modelo + año + km** (el cliente **nunca escribe el precio**: la web lo calcula).
Tres modos:

- **Entregar mi usado (permuta):** elegís el 0km/usado que querés, cargás tu usado y te dice cuánto te
  tomamos y qué saldo queda (con opción de financiarlo).
- **Vender mi usado:** te da la tasación estimada de tu auto.
- **Financiar:** elegís el auto, si va con entrega o 100% financiado y el plazo → cuota aproximada.

El número que ve el cliente es el valor de un ejemplar **impecable** de ese auto: es **generoso a
propósito** (el gancho para que se acerque). El margen real se define **en persona**, nunca online.
**Todos los parámetros** (tasa/CFT, plazos, depreciación y la tabla `marcas → modelos → valorBase`) viven
en `negocio.js`, bajo `cotizador`. La idea: el día que se arme el panel real, el dueño carga ahí los
valores de mercado reales y la web recalcula sola. Hoy son ficticios.

## Para personalizarla a un cliente real

Casi todo está en **un solo archivo**: `assets/data/negocio.js`.

1. **WhatsApp** → `whatsapp` (formato `54` + `9` + área + número, sin signos). Hoy tiene el número real de Sistemas Umbral.
2. **Nombre, dirección, horarios, teléfono, mail** → arriba del mismo archivo.
3. **El stock** → el array `catalogo`: cada auto con marca, modelo, versión, tipo, condición, año, km,
   transmisión, combustible, precio e `img`. Los `destacado: true` salen en la home y suman `incluye`
   (equipamiento) y `faq`, que aparecen en su ficha.
4. **El cotizador** → el objeto `cotizador`: tasa/CFT y plazos en `financiacion`, y la tabla de valores de
   mercado impecables en `estimador.marcas` (marca → modelos → `valorBase`), más la depreciación por año y el ajuste por km.
5. **Equipo, reseñas y números** → los arrays `equipo`, `resenas` y `stats`.
6. **Color de marca** → `--primary` (y su texto `--clay`, más los pesos `--wash-*` del hero) en `assets/css/styles.css`.
7. **Fotos** → reemplazá los archivos de `assets/img/` conservando los nombres.
8. **Financiación y preguntas frecuentes** → los arrays `financiacion` y `faqGeneral`.
9. **Redes y contacto** → hoy son los de Sistemas Umbral (así el prospecto te escribe a vos). Al vender, van los del cliente.

Lo que **no** hay que tocar: el HTML de las tarjetas, de la ficha, del cotizador ni del panel. Todo se
dibuja solo a partir de los datos.

## Ver la demo

Abre con **doble clic** en `index.html` (todo es local, sin internet: fuentes y librerías descargadas).
Para probar el mapa embebido conviene un server local:

```bash
python -m http.server 8777
```

Después abrí `http://localhost:8777`. El panel está en `/panel/index.html`.

## Publicarla

Es un sitio estático, sin build.

```bash
vercel --prod
```

Si la vas a mostrar a un prospecto, revisá que **Deployment Protection** esté desactivada en Vercel
(si no, pide login para verla).

## Detalles que importan

- **La web se ve aunque JavaScript falle.** El contenido solo se esconde si el script está vivo
  (clase `js` en `<html>`). Sin JS aparece todo de una, sin animación. Nunca una página en blanco.
- **Windows y "reducir animaciones".** Cuando se detecta, se apagan el scroll suave, el parallax y el
  titular que se arma — pero **quedan** las apariciones (más cortas) y los hovers. Nunca se ve muerta.
- **Ninguna imagen rota.** Si una foto no carga aparece un gradiente de marca con el chevron y el texto alternativo.
- **El panel no guarda nada.** Es una maqueta navegable para la reunión, y lo dice en pantalla.
- **Fotos locales.** Descargadas de Unsplash dentro del proyecto. El origen de cada una está en `data/creditos.json`.
- La página lleva `noindex` y aviso de demostración en el pie, a propósito.

## El botón de WhatsApp

El glifo oficial está definido **una sola vez** en `main.js` y se inyecta en cada `<span class="wa-ico">`.
El flotante de abajo a la derecha es **solo el ícono**, sin texto.
