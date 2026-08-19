# Rescoldo — Demo de nicho: restaurante (parrilla)

Demo de prospección de **Sistemas Umbral**. Home larga + páginas de detalle + panel de muestra.
Negocio, carta, precios y reseñas son **ficticios**.

Es la tercera demo golden: prueba que el esqueleto Umbral aguanta el registro **oscuro** con núcleo
**carta**. Piel oscura, pareja **Mantel** (Bodoni Moda + Inter), movimiento **equilibrado**, acento
terracota.

## Qué trae

```
demo-restaurante/
├── index.html              # home: las 10 piezas del esqueleto
├── nosotros.html           # quiénes somos + cómo funciona + equipo
├── equipo.html             # el parrillero, el salón y la cocina
├── carta.html              # menú digital: carta con filtros, ficha en modal y pedido delivery
├── formas-pago.html        # medios de pago y grupos/eventos
├── preguntas.html          # preguntas frecuentes
├── reservas.html           # las vías para reservar mesa
├── contacto.html           # vías de contacto + mapa
├── panel/index.html        # panel de muestra (4 pantallas navegables)
├── assets/
│   ├── css/styles.css      # sistema de diseño + componentes de la web
│   ├── css/panel.css       # el panel, con los mismos tokens
│   ├── js/main.js          # movimiento, carta, ficha en modal, pedido delivery, WhatsApp, reserva
│   ├── js/panel.js         # datos y gráficos del panel
│   ├── js/lenis.min.js     # scroll suave (descargado, no CDN)
│   ├── data/negocio.js     # ← TODOS los datos editables viven acá
│   ├── data/creditos.json  # de dónde salió cada foto
│   └── img/                # 8 fotos, descargadas y locales
└── README.md
```

## Cómo se aplicó el ADN (v2.2)

| Decisión | Acá |
|---|---|
| Base visual | **Oscura** (`#0A0A0C`), porque es una parrilla de noche |
| Hero | Foto de brasas al fuego detrás, con **lavado de acento** terracota y zoom lento de 18s. Texto a la izquierda, nunca centrado. |
| Menú | Transparente sobre el hero → sólido y compacto al bajar. Desplegable "Comensales" que agrupa las páginas del cliente. |
| Tipografía | **Mantel**: Bodoni Moda + Inter, titular en caja mixta |
| Acento | Terracota `#C9552D`, en una sola variable. Como texto sobre el fondo oscuro se usa `--clay` (terracota aclarado, legible) |
| Movimiento | Registro **equilibrado**: 32px de desplazamiento, 0.6s |
| Núcleo | Forma **carta** como menú digital (categorías; cada plato con ficha en modal y foto opcional) |
| Conversión | WhatsApp **+ pedido de delivery** (comanda en un solo mensaje) **+ reserva de mesa** |
| Firma | Chevron `›` en botones, viñetas, migas y en el reemplazo de fotos |

## Para personalizarla a un cliente real

Casi todo está en **un solo archivo**: `assets/data/negocio.js`.

1. **WhatsApp** → `whatsapp` (formato `54` + `9` + área + número, sin signos). Hoy tiene el número real de Sistemas Umbral.
2. **Nombre, dirección, horarios, teléfono, mail** → arriba del mismo archivo.
3. **La carta** → el array `carta`: categorías con sus platos (nombre, descripción, precio). Cualquier
   plato puede llevar `img` (foto). Los platos con `estrella: true` suman `incluye` ("cómo se sirve") y
   `faq`, que aparecen al abrir su ficha en el modal. Cada plato se puede pedir por delivery.
4. **Equipo, reseñas y números** → los arrays `equipo`, `resenas` y `stats`.
5. **Color de marca** → `--primary` (y su aclarado `--clay`) en `assets/css/styles.css`.
6. **Fotos** → reemplazá los archivos de `assets/img/` conservando los nombres.
7. **Formas de pago y preguntas frecuentes** → los arrays `formasPago` y `faqGeneral`.
8. **Redes y contacto** → hoy son los de Sistemas Umbral (así el prospecto te escribe a vos). Al vender, van los del cliente.
9. **Mapa** → la dirección va en la URL del `iframe`, en la sección "Dónde estamos" de `index.html`.

Lo que **no** hay que tocar: el HTML de las tarjetas, del detalle ni del panel. Todo se dibuja solo
a partir de los datos.

## Ver la demo

```bash
python -m http.server 8777
```

Después abrí `http://localhost:8777`. **No la abras con doble clic** sobre el archivo: la ficha de
plato usa la barra de direcciones para saber qué mostrar y desde `file://` algunos navegadores lo bloquean.

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
- **Fotos locales.** Descargadas de Unsplash dentro del proyecto: en una reunión con mal wifi no
  dependés de que cargue un servidor ajeno. El origen de cada una está en `data/creditos.json`.
- La página lleva `noindex` y aviso de demostración en el pie, a propósito.

## El botón de WhatsApp

El glifo oficial está definido **una sola vez** en `main.js` y se inyecta en cada `<span class="wa-ico">`.
El flotante de abajo a la derecha es **solo el ícono**, sin texto.

## Verificado

- Las 10 páginas (9 + panel) responden 200 y **no hay un solo link interno roto**.
- Sin errores de consola · sin scroll horizontal a 390px.
- Las 8 fotos cargan; ninguna rota.
- Los íconos de WhatsApp dibujan el glifo oficial completo (se verifica el `path`).
- **Contraste del hero medido sobre la foto real + gradiente**: titular 14.2, lead 13.3, lista de
  garantías (la mitad derecha, donde siempre falla) 5.8 / 7.2 / 6.0. Todo ≥4.5.
- Header: transparente sobre el hero con logo y links en blanco legibles desde el arranque.
- Filtros de la carta, desplegable, modal de reserva, acordeón, navegación del panel y switches: funcionando.
- La reserva termina en WhatsApp con el mensaje ya escrito (comensales + día + hora).
- Tipografías Bodoni Moda (400/700) e Inter cargadas locales, sin caer a la fuente de sistema.
