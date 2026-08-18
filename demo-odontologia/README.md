# Ribera Odontología — Demo de nicho: odontología

Demo de prospección de **Sistemas Umbral**. Home larga + páginas de detalle + panel de muestra.
Negocio, profesionales, precios y reseñas son **ficticios**.

Es la segunda demo golden: se construyó para probar que el esqueleto Umbral aguanta el registro
opuesto al de la concesionaria (Litoral). Piel clara, pareja **Bisturí**, movimiento **sereno**.

## Qué trae

```
demo-odontologia/
├── index.html              # home: las 10 piezas del esqueleto
├── nosotros.html           # quiénes somos + cómo trabajamos + equipo
├── equipo.html             # los profesionales
├── tratamientos.html       # listado completo con filtros
├── servicio.html           # ficha de detalle (?s=chequeo, ?s=implantes, …)
├── cobertura.html          # obras sociales
├── preguntas.html          # preguntas frecuentes
├── turnos.html             # las tres vías de reserva
├── contacto.html           # vías de contacto + mapa
├── panel/index.html        # panel de muestra (4 pantallas navegables)
├── assets/
│   ├── css/styles.css      # sistema de diseño + componentes de la web
│   ├── css/panel.css       # el panel, con los mismos tokens
│   ├── js/main.js          # movimiento, filtros, WhatsApp, turnos
│   ├── js/panel.js         # datos y gráficos del panel
│   ├── js/lenis.min.js     # scroll suave (descargado, no CDN)
│   ├── data/negocio.js     # ← TODOS los datos editables viven acá
│   ├── data/creditos.json  # de dónde salió cada foto
│   └── img/                # 11 fotos, descargadas y locales
└── README.md
```

## Cómo se aplicó el ADN

| Decisión | Acá |
|---|---|
| Base visual | **Clara** (`#FAFAF7`), porque es salud |
| Hero | Foto del consultorio detrás, con velo **claro** y zoom lento de 18s. Texto a la izquierda, nunca centrado. |
| Menú | Transparente sobre el hero → sólido y compacto al bajar. Desplegable que agrupa las páginas del consultorio. |
| Tipografía | **Bisturí**: Fraunces + Inter, titular en caja mixta |
| Acento | Verde clínico `#0E7C6B`, en una sola variable |
| Movimiento | Registro **sereno**: 24px de desplazamiento, 0.8s, sin parallax en el hero |
| Núcleo | Forma **servicios** (no catálogo, no carta) |
| Conversión | WhatsApp **+ reserva de turno**, porque el rubro vive de la agenda |
| Firma | Chevron `›` en botones, viñetas, migas y en el reemplazo de fotos |

## Para personalizarla a un cliente real

Casi todo está en **un solo archivo**: `assets/data/negocio.js`.

1. **WhatsApp** → `whatsapp` (formato `54` + `9` + área + número, sin signos). Hoy tiene el número real de Sistemas Umbral.
2. **Nombre, dirección, horarios, teléfono, mail** → arriba del mismo archivo.
3. **Tratamientos** → el array `servicios`: nombre, precio, duración, qué incluye y las preguntas
   frecuentes. Cada uno genera su tarjeta en la home **y** su página de detalle, sola.
4. **Equipo, reseñas y números** → los arrays `equipo`, `resenas` y `stats`.
5. **Color de marca** → `--primary` en `assets/css/styles.css`. Una línea y se adapta todo el sitio.
6. **Fotos** → reemplazá los archivos de `assets/img/` conservando los nombres.
7. **Obras sociales y preguntas frecuentes** → los arrays `obrasSociales` y `faqGeneral`.
8. **Redes y contacto** → hoy son los de Sistemas Umbral (así el prospecto te escribe a vos). Al vender, van los del cliente.
9. **Mapa** → la dirección va en la URL del `iframe`, en la sección "Dónde estamos" de `index.html`.

Lo que **no** hay que tocar: el HTML de las tarjetas, del detalle ni del panel. Todo se dibuja solo
a partir de los datos.

## Ver la demo

```bash
python -m http.server 8777
```

Después abrí `http://localhost:8777`. **No la abras con doble clic** sobre el archivo: la página de
detalle usa la barra de direcciones para saber qué tratamiento mostrar y desde `file://` algunos
navegadores lo bloquean.

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
- **Windows y "reducir animaciones".** Muchas instalaciones lo traen activado de fábrica. Cuando se
  detecta, se apagan el scroll suave, el parallax y el titular que se arma — pero **quedan** las
  apariciones (más cortas) y los hovers. La web nunca se ve muerta.
- **Ninguna imagen rota.** Si una foto no carga aparece un gradiente de marca con el chevron y el
  texto alternativo.
- **El panel no guarda nada.** Es una maqueta navegable para la reunión, y lo dice en pantalla. El
  panel real con base de datos y turnos que se guardan se construye cuando el cliente contrata.
- **Fotos locales.** Están descargadas de Unsplash dentro del proyecto: en una reunión con mal wifi
  no dependés de que cargue un servidor ajeno. El origen de cada una está en `data/creditos.json`.
- La página lleva `noindex` y aviso de demostración en el pie, a propósito.

## El botón de WhatsApp

El glifo oficial está definido **una sola vez** en `main.js` y se inyecta en cada `<span class="wa-ico">`.
Nadie escribe un `<svg>` de WhatsApp a mano: así es imposible que salga el globo sin el auricular.
El flotante de abajo a la derecha es **solo el ícono**, sin texto.

## Verificado

- Las 10 páginas responden 200 y **no hay un solo link interno roto**.
- Sin errores de consola · sin scroll horizontal a 390px.
- Las 11 fotos cargan; ninguna rota.
- Los 3 íconos de WhatsApp de cada página dibujan el glifo oficial completo (se verifica el `path`).
- Header: transparente 74px en la home, sólido 62px en las internas.
- Filtros, desplegable, modal de turno, acordeón, navegación del panel y switches: funcionando.
- Los horarios ocupados del turnero son estables por día (no cambian a cada clic).
- Contraste del acento sobre el fondo: pasa AA.
