# HANDOFF — Skill `demo-nicho` (Sistemas Umbral)

> Handoff único y vivo. Actualizado: 19/08/2026.

## ⚡ ARRANQUE — leé SOLO esto para retomar (el resto es referencia opcional)

- **Dónde está todo:** demos golden a mano en `demo-odontologia/` y `demo-restaurante/`.
  El diseño es fijo y vive en `estilo-umbral.md` (ADN v2.2) — **no lo leas entero: es el árbitro
  ante una duda.** Consultá solo la sección que tu tarea toque (§ del ADN citada abajo).
- **Estado en una línea:** **tres demos cerradas y commiteadas**, alineadas al ADN v2.2 — odontología
  (clara/servicios/Bisturí), restaurante Rescoldo (oscura/carta-menú-digital/Mantel) y **concesionaria
  Litoral Automotores** (oscura/catálogo/Motor, con **cotizador online**). La concesionaria además tiene
  **repo privada standalone** en GitHub (`ShadoxIA/litoral-automotores-demo`). Skill aún no extraído.
- **Tarea activa (próximo chat):** **desarrollar los paneles de administración reales, web por web, en
  orden.** Hasta ahora los `/panel` son maquetas navegables sin backend (§7 del ADN). Empieza el segundo
  producto: panel real con base de datos y login. Ver §7 y §8 para el detalle del arranque.
- **Correr una demo:** `cd "demo-restaurante" && python -m http.server 8777` → `http://localhost:8777`.
  (Ya no hay `plato.html`: la demo también abre con doble clic; el server queda como recomendación, y para
  odontología igual.)
- **Reglas duras:** contacto = datos de Sistemas Umbral (no tocar); color y WhatsApp en una variable cada
  uno; todo local (sin internet); sin frameworks/build; español rioplatense. Detalle en §3–§4.
- **Verificación:** no se ve el navegador desde la sesión (no compone frames) → se mide el DOM; el juicio
  estético es de Ian (manda capturas). Medir sirve para geometría/color/contraste, no reemplaza mirar.

**Rutina:** cuando Ian pide "resumen", se **actualiza ESTE mismo archivo** (no se crea otro, no crece sin
límite: al cerrar una demo su detalle se comprime a una línea), se le da el comando y él reinicia en otro chat.

---
<!-- ========== REFERENCIA (leé solo la parte que tu tarea toque) ========== -->

## 1. Qué estamos construyendo

Un skill de Claude Code llamado **`demo-nicho`**: Ian escribe *"creame una web para el nicho X"* y sale
una web demo completa, con datos ficticios y fotos reales, lista para prospectar en frío. La misma demo
se duplica y se completa cuando el negocio contrata (la original nunca se toca).

**Método:** primero se clavan demos golden a mano; después se extrae el skill del proceso que ya
funciona. No construir el skill en abstracto.

---

## 2. Estado actual

| Cosa | Estado |
|---|---|
| ADN del estilo (`estilo-umbral.md`) | **v2.2** — pulido contra la demo de odontología mirada en pantalla |
| Demo #2 — Ribera Odontología (`demo-odontologia/`) | **Cerrada y commiteada.** 9 páginas + panel. Encabezados internos con velo de acento (§3.2 del ADN) |
| Demo #3 — Rescoldo (restaurante, `demo-restaurante/`) | **Cerrada y commiteada.** Menú digital: ficha en modal + pedido de delivery (comanda) → WhatsApp. 9 páginas + panel |
| Demo #4 — Litoral Automotores (concesionaria, `demo-concesionaria/`) | **Cerrada y commiteada.** Piel Motor, núcleo **Catálogo** + **cotizador online** (permuta/venta/financiación). 9 páginas + panel. Ver §3.7 |
| Todo funciona sin internet | **Sí** (fuentes locales, mapa condicional) |
| Repo privada en GitHub | Monorepo `ShadoxIA/sistemas-umbral-demos` (las 3 demos) · **standalone** `ShadoxIA/litoral-automotores-demo` (solo la concesionaria) |
| Skill `demo-nicho` | **No empezado** — 3 demos ya alineadas; se extrae después de los paneles |

---

## 3. Demo #3 (CERRADA): Rescoldo (restaurante) — `demo-restaurante/`

Tercera demo golden. Parrilla ficticia **Rescoldo**, Concordia (Entre Ríos). Clonada de
`demo-odontologia/` y re-pelada al ADN v2.2. Registro **opuesto** a odontología: base oscura + núcleo carta.
Es el molde a clonar para la próxima demo (Motor).

### 3.1 Cómo verla
```bash
cd "demo-restaurante" && python -m http.server 8777
```
Abrir `http://localhost:8777`. Panel en `/panel/index.html`. (Ya no hay `plato.html`, así que también
abre con doble clic; el server queda como recomendación.)

### 3.2 Piel aplicada (lo que cambió vs odontología)
- **Base OSCURA** `#0A0A0C`. Se reescribió la capa de superficies del CSS: tarjetas/bandas suben un
  escalón (`--paper-2 #131316`, `--paper-3 #1E1E22`), texto invertido a blanco/niebla. Se dieron vuelta
  todos los `#fff` hardcodeados (tarjetas, footer, cierre, modal, inputs, panel).
- **Pareja Mantel**: Bodoni Moda (display, 400/700) + Inter (cuerpo). Fuentes locales en `assets/fonts/`
  (`bodoni-latin*.woff2`), Fraunces borrada. `fuentes.css` actualizado.
- **Acento terracota `#C9552D`** (`--primary`, relleno de botones) + **`--clay #E9A085`** (terracota
  aclarado, para TEXTO de acento sobre negro — el puro queda al filo de contraste). Ambos en `styles.css :root`.
- **Lavado del hero** (ADN §3.1): 3 pesos terracota — hondo `74,32,19` / medio `201,85,45` / claro `233,160,133`.
  Gradiente 115°, medido: titular 14.2, lead 13.3, lista derecha 5.8/7.2/6.0 (todo ≥4.5). Foto de hero oscura a propósito.
- **Movimiento equilibrado**: `--rise:32px`, `--dur:.6s`.
- **Núcleo = CARTA como MENÚ DIGITAL** (ADN §2, redefinido esta sesión). Cada plato: dos botones
  **Más info** (ficha en modal, `platoModal()`) y **Pedir** (lo suma a la comanda). Foto por plato,
  opcional (placeholder de marca si no hay). Estrella suman `incluye`/`faq`. Render en `main.js`
  (`renderDestacados`, `renderCartaMenu`, `botonesPlato`, `platoModal`).
- **Pedido de delivery = comanda** (`pedido()` en `main.js`): barra flotante → panel con cantidades,
  modo **Delivery / Take away**, datos y **medio de pago (Efectivo / Mercado Pago)** → **un solo mensaje**
  de WhatsApp. `sessionStorage`. El pago se **coordina por WhatsApp** (sin pasarela; Checkout MP integrado
  con Worker = upsell de la versión contratada).
- **Reserva de mesa** en vez de turno: modal con comensales + día + hora → WhatsApp (`#modal-reserva`).
- **Encabezados internos con velo de acento** (ADN §3.2, nuevo): foto teñida por sección, no banda plana.
  Backporteado a odontología.

### 3.3 Archivos renombrados (vs odontología)
`tratamientos.html`→`carta.html` · `cobertura.html`→`formas-pago.html` · `turnos.html`→`reservas.html`.
`servicio.html`/`plato.html` **eliminado** (la ficha vive en modal). Dropdown "Pacientes"→**"Comensales"**.
Header "Para llevar" → **"Pedir online"** (link a `carta.html`). 9 páginas + `panel/index.html`.

### 3.4 Dónde vive todo (regla Umbral: nada hardcodeado donde se pueda evitar)
- **Contenido editable** → `assets/data/negocio.js` (identidad, `carta` por categorías, `formasPago`,
  `faqGeneral`, `equipo`, `resenas`, `stats`).
- **Platos estrella** = `estrella:true` + `img` + `incluye` + `faq`. Hoy: **bife-chorizo, asado-tira,
  provoleta** (los únicos con foto real; el resto usa placeholder). Cualquier plato abre su ficha en modal.
- **Color y WhatsApp** → una variable cada uno (`--primary`/`--clay` en `styles.css`; `whatsapp` en `negocio.js`).
- **Contacto = datos de Sistemas Umbral** (WA `5491155168112`, mail, redes). NO tocar: el prospecto le escribe a Ian.
- **Fotos** → 8 en `assets/img/` (`hero`, `salon`, `plato-bife`, `plato-asado`, `plato-provoleta`,
  `equipo-1/2/3`), locales, origen en `assets/data/creditos.json`.

### 3.5 QA ya hecho (no repetir salvo que se toque algo)
10 páginas 200, cero links rotos, sin scroll-X a 390px, hero contraste medido ≥4.5, íconos WA con
auricular (3/3), fuentes Bodoni/Inter cargadas locales, mapa con fallback offline, filtros de carta +
modal reserva + panel oscuro OK. Sin errores de consola.
(Nota: el reveal mostró 8/43 con `.in` al medir porque el tab estaba oculto y el `IntersectionObserver`
no compone — NO es bug, revela normal al mostrar la página.)

### 3.6 Qué se hizo esta sesión (y quedó cerrada)
- **Encabezados internos con velo de acento** en restaurante + odontología, y regla nueva en el ADN (§3.2).
- **Carta → menú digital:** ficha de plato en **modal** (se eliminó `plato.html`), dos botones por plato
  (**Más info** / **Pedir**), pensado para celular (botones explícitos, sin depender del hover).
- **Pedido de delivery (comanda):** barra flotante + panel con cantidades, **Delivery / Take away**,
  datos y **medio de pago** → un solo mensaje de WhatsApp. Pago **coordinado por WhatsApp** (línea
  aclaratoria en la comanda: "no se cobra online").
- **Header:** "Para llevar" → **"Pedir online"** (a la carta), en las 8 páginas.
- Verificado por DOM (no hay captura desde la sesión): flujos, totales, validación, mensaje de WhatsApp,
  persistencia, mobile 375px sin desborde, cero errores de consola. Commiteada.

**Pendiente OPCIONAL (si Ian lo pide):** editar la carta desde el **panel** (agregar/sacar platos, precio,
subir foto) — no estaba en el alcance; y **~6-8 fotos reales extra** para que la carta se vea más llena.

---

## 3.7 Demo #4 (CERRADA): Litoral Automotores (concesionaria) — `demo-concesionaria/`

Clonada de `demo-restaurante/` y re-pelada a la pareja **Motor** (Archivo Expanded 700 + Inter, en
**MAYÚSCULAS**), base oscura, acento **lima ácido `#B8F224`**, movimiento **Alto** (48px · .45s · parallax
en el hero). Núcleo **Catálogo** (ADN §2): grilla de fichas de auto (foto + precio + 3 datos año/km/caja)
con **filtros combinados** (condición + tipo) y **ficha de detalle data-driven** `vehiculo.html?id=` (una
sola página para todos los autos; anda con doble clic). 9 páginas + panel (Resumen / Consultas / **Stock**,
sin Turnos: no es rubro de agenda). Se renombró `carta.html`→`catalogo.html`, `formas-pago.html`→
`financiacion.html`, `reservas.html`→`cotiza.html`; se **agregó** `vehiculo.html`. Dropdown "Comensales"→**"Clientes"**.

**Lo distintivo — el COTIZADOR** (`cotiza.html`, `cotizador()` en `main.js`): 3 modos —**permuta**,
**vender**, **financiar**— que calculan **en la misma página** y terminan en WhatsApp con el número ya
hecho. El usado se identifica por **marca + modelo + año + km** (desplegables dependientes marca→modelo);
**el cliente NUNCA escribe el precio**. El número mostrado = **valor de un ejemplar impecable, SIN
descontar margen** — un gancho generoso a propósito; el margen/regateo real es **presencial** (decisión de
Ian). Financiación por sistema francés; permuta ofrece financiar el saldo. Parámetros TODOS en
`negocio.js` bajo `cotizador` (tasa/CFT, plazos, depreciación por año, ajuste por km, y la tabla
`estimador.marcas → modelos → valorBase` con el valor impecable de mercado). **Estos parámetros son lo que
mañana configura el dueño desde el panel de admin** — es el gancho comercial del panel de este nicho.

**Piel/velo (aprendido acá):** el lima es un acento **muy claro**. Como relleno (botones, tags, pastillas)
lleva **texto oscuro** (`--primary-ink #10130A`), nunca blanco. Y el velo del hero **no** usa el lima
brillante donde hay texto —lo mataría— sino el lima en su **peso hondo (olivo `#2B3908`)**; el lima vivo
solo asoma en el borde derecho. Medido sobre foto+velo: titular 11.3, lead 11.6, lista 10.9/10.9/9.2,
borde 4.9 — todo ≥4.5. Reseñas en Inter (un párrafo largo en la display ancha en mayúsculas no se lee).

**Fotos:** 14 en `assets/img/` (Unsplash local, revisadas en mosaico): `hero`, `showroom`, `interior`,
8 autos (`auto-*`), 3 retratos (`equipo-*`). Origen en `assets/data/creditos.json`. **QA por DOM** (no hay
captura desde la sesión): 9 páginas + panel sin errores de consola, sin scroll-X a 375px, filtros/cotizador
(3 modos)/ficha `?id`/burger/FAQ OK, íconos WA 3/3 con auricular, Archivo Expanded cargada local.

**Pendiente:** juicio estético de Ian con capturas (colores, cortes de titular, cómo se ve el desglose del
cotizador). Nada bloqueante.

---

## 4. Decisiones cerradas (no rediscutir)

1. **Firma visual** — mismo esqueleto, distinta piel. Estructura, efectos y ritmo fijos; cambian color, tipografía, fotos y tono.
2. **Estructura** — home larga + 8 páginas internas (mapa fijo, ADN §1). Sin blog salvo pedido expreso.
3. **Movimiento** — 7 efectos fijos, intensidad en 3 niveles (sereno / equilibrado / alto) según nicho.
4. **Panel** — maqueta navegable con datos inventados. El panel real con base de datos se construye cuando un cliente paga.
5. **Base visual por nicho** — salud/inmobiliaria/jurídico → claro; concesionaria/gimnasio/restaurante/tech → oscuro.
6. **Tipografía** — 5 parejas cerradas con nombre (Motor, Bisturí, Mantel, Escritura, Taller). ADN §4.
7. **Conversión** — WhatsApp siempre + reserva (turno/mesa) en rubros de agenda.
8. **Datos** — negocio ficticio por rubro (no se personaliza por prospecto). Fotos y fuentes locales.
9. **Marca** — la agencia es **Sistemas Umbral**. NULIAN fue descartado.
10. **Contacto en las demos** — siempre los datos reales de Ian. El prospecto le escribe a él.
11. **Todo tiene que andar sin internet.** Nada por link a un servidor ajeno.

**Nichos hechos:** odontología, restaurante, concesionaria. **Candidatos que siguen:** inmobiliaria, gimnasio, turismo termal.

---

## 5. Lecciones de método (de la revisión de odontología — el skill NO debe repetir esto)

Ian miró la web renderizada y encontró **siete cosas**; ninguna era gusto, todas salían de mirar la
pantalla, no el código. Cada una quedó como regla en el ADN:

| Lo que vio Ian | Causa real | Regla en el ADN |
|---|---|---|
| El menú no se veía hasta scrollear | Texto blanco sobre velo claro | §1 — *contraste contra el hero*, no "blanco siempre" |
| Pasos y diferenciadores "no pegaban" | Dos numeraciones 01-04 seguidas en dos lenguajes visuales | §9 |
| El cierre era una banda a todo el ancho | — | §1 pieza 9 — bloque contenido, alineado a la izquierda |
| Sobraba espacio | Sección de diffs con 51% de padding | §13 — ninguna sección pasa de 25% |
| El hero tenía que teñirse con el acento | El velo neutro era regla equivocada | §3.1 — lavado de acento, medido |
| El titular partía una oración al medio | Salto librado al `max-width` | §9 — saltos explícitos con `<br>` |

**Dos errores que cometí y no repetir:**
1. Medí el contraste del fondo dando por sentado el color del texto. Daba bien y era ilegible: mis
   reglas de color quedaron *antes* de las originales con la misma especificidad. → **Medir contra
   `getComputedStyle`** (lo que el navegador realmente pinta). Los overrides de piel van **al final** de su bloque.
2. Copié la fórmula del sitio de referencia tal cual. No servía: en la referencia el hero está todo a la
   izquierda, en el nuestro el texto llega al ~93% del ancho. → **Adaptar la referencia al layout propio.**

---

## 6. Hallazgos técnicos (no repetir estos errores)

- **Fotos: Unsplash descargando local, y MIRARLAS con los ojos** antes de usar. Openverse no sirve
  (3 usables de 11, una con marca de agua). El endpoint `unsplash.com/napi` pide auth; se sacan las URLs
  del CDN público (`images.unsplash.com/photo-...`) leyendo el DOM de la página de búsqueda con el navegador.
- **El contenido no puede depender de JS para verse.** `data-reveal` se esconde solo si hay clase `js` en `<html>`.
- **Windows trae "reducir animaciones" de fábrica.** Se apagan solo scroll suave, parallax y titular animado; quedan apariciones cortas y hovers.
- **Ícono de WhatsApp: se define UNA vez** en el JS y se inyecta. Nunca `<svg>` a mano.
- **Header de páginas internas: `.header--interna`**, no depende del scroll.
- **Con la pestaña oculta**, `IntersectionObserver` no dispara y las transiciones CSS no avanzan. Verificando por código parece bug y no lo es.
- **El `http.server` de Python cachea el CSS.** Tras editar estilos: `Ctrl+F5` o cache-buster.
- **Fuentes de Google variables:** un solo `.woff2` por familia y subset cubre todos los pesos.
- **CSS: con especificidad pareja gana la última regla.** Overrides de piel al final de su bloque.

---

## 7. Próximos pasos

1. **Desarrollar los paneles de administración reales, web por web, en orden** — lo inmediato y el foco de
   los próximos chats. Hoy cada `/panel` es una **maqueta navegable sin backend** (ADN §7). Ahora se
   construye el **panel real**: base de datos + login, que el dueño usa para gestionar su web.
   - **Orden sugerido:** empezar por **la concesionaria** (`demo-concesionaria/`), porque su panel tiene el
     gancho comercial más claro — **configurar el cotizador** (tasa/CFT, plazos, depreciación y la tabla
     `estimador.marcas→modelos→valorBase`) y **el stock** (alta/baja/edición de autos, subir fotos), y ver
     las **consultas** que entran. Todo eso hoy vive ficticio en `negocio.js` y en `panel.js`; el trabajo es
     enchufarlo a datos reales que el dueño edita y la web lee.
   - **Stack previsto (ver CLAUDE.md raíz):** Supabase (base + Auth), Cloudflare Workers, y la web pública
     leyendo de ahí en vez de `negocio.js`. Definir con Ian: una instancia por web vs multi-tenant.
   - **Regla de oro a mantener:** la web pública tiene que **seguir andando sin internet** para las demos.
     El panel real es la capa que se activa cuando el negocio contrata; la demo local no puede romperse.
2. **Extraer el skill `demo-nicho`** (con `skill-creator`) — hay 3 demos alineadas al ADN. Queda **después**
   de los paneles. Debe encapsular: el ADN como referencia; el pipeline (piel por nicho → fotos Unsplash →
   revisión visual → datos ficticios → maquetado → QA anti-genérico); una demo como kernel; modos
   genérico / con brief de cliente.
3. **Definir los planes comerciales.**

---

## 8. Temas abiertos que Ian todavía no resolvió

- **Precio.** En `~/.claude/skills/propuestas/mi-negocio.md` figura "Sitios Web — desde USD 300". Lo que
  produce el skill (web + 8 páginas + panel + turnero) no entra en ese número y contradice el "no competir por precio".
- **El panel real.** Requiere Supabase (base + login). Segundo producto. **Ya es la tarea activa (§7):** se
  arranca web por web, empezando por la concesionaria (configurar cotizador + stock + consultas).
- **Deploy.** Por ahora local, a pedido de Ian.
- **Versión autocontenida para el celular.** Planteada, no decidida: un solo archivo (todo en una página
  con anclas) vs nueve autocontenidos (~20 MB). En notebook no hace falta nada: modo avión y doble clic anda.

---

## 9. Pendientes chicos en la demo de odontología (señalados, no mandados a arreglar)

- **Reseñas con nombres tipo "Verónica A.", "Nicolás P."** — el propio ADN §9 los prohíbe.
- **El teléfono del footer no es link `tel:`.**
- **El desplegable "El consultorio" quedó como link suelto** (Ian lo decidió así: las páginas
  institucionales que iría adentro no existen en el mapa fijo de 8).

---

## 10. Cómo trabajar con Ian

- Español rioplatense, tono directo, sin relleno.
- Señalar dudas y tradeoffs aunque se haya hecho exactamente lo pedido.
- **Ian mira la web y manda capturas.** Cuando marca algo sobre una captura, eso es la especificación.
- **No se puede ver el navegador desde la sesión** (el panel no compone frames): se verifica midiendo el
  DOM. Sirve para geometría, colores y contraste; no reemplaza que Ian mire. El juicio estético es suyo.
- Reglas de trabajo completas en `C:/Users/Ian/Desktop/Freelancer/CLAUDE.md` — leerlas antes de escribir código.
