# Handoff — Skill `demo-nicho` (Sistemas Umbral)

> Para retomar en otro chat sin re-explicar nada. Actualizado: 18/08/2026.
> **Leé primero** [`estilo-umbral.md`](estilo-umbral.md) — es la fuente de verdad del diseño, va en v2.2.
> ⚠️ `handoff-demos-por-nicho.md` quedó **obsoleto**, ignoralo.

---

## 1. Qué estamos construyendo

Un skill de Claude Code llamado **`demo-nicho`**: Ian escribe *"creame una web para el nicho de
odontología"* y sale una web demo completa, con datos ficticios y fotos reales, lista para mostrar
prospectando en frío.

La misma demo se duplica y se completa cuando el negocio contrata (la demo original nunca se toca,
sigue mostrándose a otros prospectos).

**Método:** primero se clavan demos golden a mano, después se extrae el skill del proceso que ya
funciona. No construir el skill en abstracto.

---

## 2. Estado actual

| Cosa | Estado |
|---|---|
| ADN del estilo (`estilo-umbral.md`) | **v2.2** — pulido contra la demo de odontología mirada en pantalla |
| Demo golden #1 — Litoral Automotores (concesionaria) | Hecha, **desactualizada al ADN v2.2** (ver §7) |
| Demo golden #2 — Ribera Odontología | **Hecha, revisada por Ian y corregida.** 9 páginas + panel |
| Todo funciona sin internet | **Sí** (fuentes locales, mapa condicional) |
| Repo privada en GitHub | **Sí** — `ShadoxIA/sistemas-umbral-demos` |
| Skill `demo-nicho` | **No empezado** ← próximo paso |
| Demo #3 (otro nicho) | **No empezada** ← el objetivo de la próxima sesión |

---

## 3. Cómo abrir las demos

Ver [`README.md`](README.md). Resumen: doble clic en `demo-odontologia/index.html`, o doble clic en
`abrir-demos.bat` si querés verlo desde el celular (mismo WiFi, no hace falta internet).

---

## 4. Decisiones cerradas (no rediscutir)

1. **Firma visual** — mismo esqueleto, distinta piel. Estructura, efectos y ritmo fijos; cambian color, tipografía, fotos y tono.
2. **Estructura** — home larga + 8 páginas internas (mapa fijo en el ADN §1). Sin blog salvo pedido expreso.
3. **Movimiento** — 7 efectos fijos, intensidad en 3 niveles según nicho (sereno / equilibrado / alto).
4. **Panel** — maqueta navegable con datos inventados. El panel real con base de datos se construye recién cuando un cliente paga.
5. **Base visual** — regla escrita por nicho: salud/inmobiliaria/jurídico → claro; concesionaria/gimnasio/restaurante/tech → oscuro.
6. **Tipografía** — 5 parejas cerradas con nombre (Motor, Bisturí, Mantel, Escritura, Taller). ADN §4.
7. **Conversión** — WhatsApp siempre + reserva de turno en rubros de agenda.
8. **Datos** — negocio ficticio por rubro (no se personaliza por prospecto). Fotos y fuentes locales.
9. **Marca** — la agencia es **Sistemas Umbral**. NULIAN fue descartado.
10. **Contacto en las demos** — siempre los datos reales de Ian. El prospecto le escribe a él.
11. **Todo tiene que andar sin internet.** Nada por link a un servidor ajeno.

**Nichos:** odontología/estética (hecho) y restaurantes (pendiente).

---

## 5. Lo que cambió en esta sesión (y por qué importa para el skill)

Ian revisó la demo en pantalla y encontró **siete cosas**. Ninguna era un detalle de gusto: todas
salieron de mirar la web renderizada, no el código. Esa es la lección de método más importante para
el skill.

| Lo que vio Ian | La causa real | Quedó en el ADN |
|---|---|---|
| El menú no se veía hasta scrollear | Texto blanco sobre velo claro | §1 — la regla es *contraste contra el hero*, no "blanco siempre" |
| Faltaba el desplegable de Pacientes | — | §1 — orden fijo de la barra |
| Los pasos y los diferenciadores "no pegaban" | Dos numeraciones 01-04 seguidas en dos lenguajes visuales | §9 — prohibición explícita |
| El cierre era una banda negra a todo el ancho | — | §1 pieza 9 — bloque contenido, alineado a la izquierda |
| Sobraba espacio | La sección de diffs era 51% padding | §13 — **ninguna sección pasa de 25% de padding** |
| El hero tenía que teñirse con el acento | El velo claro era una regla equivocada | §3.1 nueva — el lavado de acento, medido |
| El titular partía una oración al medio | Salto librado al `max-width` | §9 — los saltos van explícitos con `<br>` |

### Los dos errores que cometí y que el skill no debe repetir

1. **Medí el contraste del fondo y di por sentado el color del texto.** Los números daban bien y la
   web era ilegible: mis reglas de color habían quedado *antes* de las originales en el CSS, con la
   misma especificidad, así que perdían. → **Medir siempre contra `getComputedStyle`, el color que el
   navegador realmente pinta.** Está escrito en el ADN §3.1.
2. **Copié la fórmula del sitio de referencia tal cual.** No servía: en la referencia todo el
   contenido del hero está a la izquierda, en la nuestra llega al 95% del ancho. Hubo que recalcular
   los stops del gradiente. → **Adaptar la referencia al layout propio, no calcarla.**

---

## 6. Hallazgos técnicos (no repetir estos errores)

- **Openverse no sirve para fotos.** De 11 búsquedas trajo 3 usables y una con marca de agua de Getty. Usar **Unsplash descargando local**, y **mirar las fotos con los ojos** en un mosaico antes de usarlas.
- **El contenido no puede depender de JavaScript para verse.** Los bloques con `data-reveal` se esconden solo si hay clase `js` en `<html>`.
- **Windows trae "reducir animaciones" activado de fábrica.** Se apagan solo scroll suave, parallax y titular animado; quedan apariciones cortas y hovers.
- **El ícono de WhatsApp se define UNA vez** en el JS y se inyecta. Nunca escribir el `<svg>` a mano.
- **El header de páginas internas usa `.header--interna`**, que no depende del scroll.
- **Con la pestaña oculta**, `IntersectionObserver` no dispara y **las transiciones CSS no avanzan**. Verificando por código esto parece un bug y no lo es: hay que anular la transición para leer el estado final.
- **El `http.server` de Python cachea el CSS.** Después de editar estilos, `Ctrl+F5` o cache-buster.
- **Las fuentes de Google son variables:** un solo `.woff2` por familia y subset cubre todos los pesos. Bajarlas por peso duplica 3× el tamaño al pedo (768 KB → 254 KB).
- **CSS: con especificidad pareja gana la última regla.** Los overrides de piel van al final de su bloque, no al principio.

---

## 7. Próximos pasos

1. **Demo #3 — otro nicho.** Es lo que sigue. El candidato cerrado es **restaurantes**: pareja Mantel
   (Bodoni Moda + Inter), base oscura, acento terracota `#C9552D`, núcleo "carta", registro de
   movimiento equilibrado. Sirve para validar el ADN en el registro opuesto al de odontología.
   - **Antes de arrancar, leer `estilo-umbral.md` entero.** Va en v2.2 y tiene reglas nuevas que la
     demo de odontología ya cumple y Litoral no.
   - Copiar `demo-odontologia/` como punto de partida: la estructura, el CSS y el JS ya están
     alineados al ADN. Lo que cambia es la piel y `negocio.js`.
2. **Extraer el skill `demo-nicho`** (con `skill-creator`), recién cuando haya dos demos alineadas al
   mismo ADN. Debe encapsular: el ADN como referencia, el pipeline (piel por nicho → fotos de
   Unsplash → revisión visual → datos ficticios → maquetado → QA anti-genérico), la demo de
   odontología como kernel, y los modos genérico / con brief de cliente.
3. **Regenerar Litoral con el ADN v2.2.**
4. **Definir los planes comerciales.** Pendiente desde el arranque.

---

## 8. Temas abiertos que Ian todavía no resolvió

- **Precio.** En `~/.claude/skills/propuestas/mi-negocio.md` figura "Sitios Web Corporativos — desde USD 300". Lo que produce este skill (web + 8 páginas + panel + turnero) no entra en ese número, y contradice el objetivo de no competir por precio.
- **El panel real.** Requiere Supabase (base de datos + login). Es un segundo producto, se construye cuando alguien lo pague.
- **Deploy.** Por ahora todo local, a pedido de Ian. No hay interés en deployar las demos todavía.
- **Versión autocontenida para el celular.** Planteada, no decidida. Hoy, para ver la demo en el
  celular hace falta una red local entre celu y PC (alcanza el hotspot del celular, no consume
  datos). Una versión con fotos y fuentes incrustadas en base64 (~2.3 MB) se abriría sola en
  cualquier celular y se podría mandar por WhatsApp al prospecto. La decisión pendiente es si va
  en un solo archivo (todo en una página, con anclas) o en nueve autocontenidos (~20 MB, mantiene
  la estructura de sitio). **En la notebook no hace falta nada: modo avión y doble clic ya anda.**

---

## 9. Detalles chicos pendientes en la demo de odontología

Los señalé y Ian no los mandó a arreglar. Están pendientes, no olvidados:

- **Las reseñas usan "Verónica A.", "Nicolás P."** — nombres tipo "Juan P." que el propio ADN §9 prohíbe.
- **El teléfono del footer no es un link `tel:`** (el sitio de referencia sí los usa).
- **El desplegable "El consultorio" quedó como link suelto**, no como desplegable. Ian lo decidió así:
  las páginas institucionales que tendría adentro (tipo "La Fundación", "Publicaciones") no existen en
  el mapa fijo de 8 páginas, y no quiso crearlas.

---

## 10. Cómo trabajar con Ian

- Español rioplatense, tono directo, sin relleno.
- Señalar dudas y tradeoffs aunque se haya hecho exactamente lo pedido.
- **Ian mira la web y manda capturas.** Es el mejor control de calidad que hay: cada cosa que encontró
  en esta sesión era real. Cuando marca algo en rojo sobre una captura, eso es la especificación.
- **No se puede ver el navegador desde la sesión** (el panel no compone frames): se verifica midiendo
  el DOM y hay que decírselo, porque el juicio estético es suyo. Medir sirve para geometría, colores y
  contraste; no reemplaza mirar.
- Las reglas de trabajo están en `C:/Users/Ian/Desktop/Freelancer/CLAUDE.md` — leerlas antes de escribir código.
