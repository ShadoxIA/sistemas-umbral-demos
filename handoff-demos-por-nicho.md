# Handoff — Automatización de landings demo por nicho (Sistemas Umbral)

> Documento para retomar el trabajo desde **Claude Code**. Resume decisiones, estado actual, ubicaciones y próximos pasos.
> Fecha: 18/08/2026 · Proyecto: Sistemas Umbral (Agencia)

---

## 1. Objetivo

Automatizar la creación de **páginas web demo por nicho** (genéricas y personalizadas) para salir a prospectar en frío. La meta final es un **skill** (`demo-nicho`) que, con pocas indicaciones, genere landings de una sola página, a medida del rubro, con calidad de agencia y movimiento, listas para desplegar.

Método acordado: **primero clavamos UNA demo golden** (concesionaria de usados) y **de ahí extraemos el skill** (el skill = reproducir el proceso que ya funciona). No construir el skill en abstracto.

---

## 2. Decisiones cerradas

| Tema | Decisión |
|---|---|
| Vehículo | **Skill** llamado `demo-nicho` (no un prompt suelto). Se extrae DESPUÉS de validar la demo golden. |
| Formato de salida | **Mini-proyecto ordenado** (carpeta con `index.html` + `assets/css` + `assets/js` + README). |
| Variación por nicho | **Totalmente a medida por nicho**. Se reconcilia con "automatizar" así: **kernel fijo** (pipeline, secciones, movimiento, WhatsApp, filtro anti-genérico, QA) + **capa de arte que se genera fresca por nicho**. La firma NO es un look fijo: es el nivel de craft + el método. |
| Movimiento | **Sobrio y elegante** + **Lenis** (scroll suave, CDN). Reveal al scroll, hovers, sticky header. Respeta `prefers-reduced-motion`. |
| Imágenes | Las consigue Claude de **stock (Unsplash) por hotlink de URL**, con **fallback a gradiente de marca** si alguna no carga (nunca imagen rota). El cliente reemplaza por fotos reales en `assets/img/`. |
| Deploy | **Vercel** (estático, sin build). |
| Conversión | **WhatsApp directo** con mensaje pre-armado. Número en UNA sola variable. |
| Referencia estética | **accenture.com/es-es** — la miramos de verdad (no solo texto). Clave: **la tipografía ES el héroe** (titular gigante en mayúsculas sobre negro puro, sin foto en el hero), el símbolo `>` como firma, bloques de color audaces, mucho aire, editorial. |
| Dirección de arte (concesionaria) | **Editorial audaz** — negro puro, **titular gigante mayúsculas**, motivo **chevron `›`** como firma propia (nuestra versión del `>`), acento **violeta eléctrico** (`--primary: #8B31FF`, una sola variable, cambiable a ámbar/azul acero). |

---

## 3. Estado actual

**Demo golden v2 — "Litoral Automotores" (concesionaria de usados ficticia, Concordia, E.R.) — HECHA, verificada (mobile 390px + desktop) y desplegada en vivo.**

- **URL en vivo (Vercel, cuenta del usuario):**
  https://litoral-automotores-demo-dd7she7ca-nunezlucas932-8998s-projects.vercel.app
  - ⚠️ Ojo: Vercel puede tener **"Deployment Protection"** activada (pide login para verla). Para mostrarla a un prospecto: Vercel → proyecto `litoral-automotores-demo` → Settings → Deployment Protection → desactivar "Vercel Authentication".
- Artifact de Cowork: `demo-concesionaria-usados` (v2).

### Contenido de la demo
Hero tipográfico gigante ("TU PRÓXIMO AUTO, ELEGIDO CON LA **CABEZA FRÍA**") · banda fotográfica full-bleed · diferenciadores 01–04 · catálogo de 8 unidades con filtros (Todas/Camionetas/SUV/Autos) · financiación (pasos) · "tomamos tu usado" (permuta) · nosotros + stats animados · reseñas · ubicación con mapa · CTA de cierre · footer · WhatsApp flotante. Copy rioplatense. `noindex` + aviso de demo. Datos/precios ficticios marcados "de referencia".

### Detalles técnicos
- Stack: HTML + CSS (custom properties) + JS vanilla + **Lenis** (CDN) + Google Fonts (Space Grotesk + Inter). Sin framework.
- **Número de WhatsApp:** variable `WA_NUMBER` en `assets/js/main.js` (hoy placeholder `5493450000000`).
- **Color de marca:** variable `--primary` en `assets/css/styles.css`.
- **Fallback de imágenes:** `img[data-fallback]` + handler en `main.js` (gradiente + label).
- Fotos: URLs de `images.unsplash.com` (hotlink). Mapeadas por categoría (pickup→Hilux/Amarok/Ranger, SUV→Renegade/Taos/EcoSport, auto→Corolla/Gol). No siempre coincide el modelo exacto con la foto → se reemplazan por el inventario real.

---

## 4. Ubicaciones (dónde está todo)

### En el Proyecto de Claude (persistente entre sesiones)
- `claude/brief-skill-demos-por-nicho.md` — **el brief completo del skill** (arquitectura kernel + arte por nicho, pipeline, biblioteca de secciones, filtro anti-genérico, contrato de imágenes, presets del Top 5 de nichos). **Fuente de verdad para construir el skill.**
- `claude/demo-concesionaria-usados.html` — la demo golden v2 (versión autocontenida).

### Docs de referencia ya existentes en el proyecto (útiles)
- `claude/prompt-diseno-estetica.md` — manifiesto anti-genérico (lista "prohibido"). **Es el corazón del diferenciador.**
- `claude/marca-sistemas-umbral.md` — identidad de marca Umbral (violeta, Space Grotesk/Inter).
- `claude/nichos-concordia-ranking.md` — Top 15 nichos (Top 5: odonto/estética, inmobiliarias, turismo termal, concesionarias, gimnasios).
- `claude/prompt-web-aberturas-aluminio-concordia.md` — demo previa (aberturas), referencia de mecánica WhatsApp.

### Workspace de esta sesión (efímero — si retomás en Claude Code, recreá o pedí el zip)
- `demo-concesionaria-usados/` → `index.html`, `assets/css/styles.css`, `assets/js/main.js`, `README.md`, `preview.html` (autocontenido), `build-preview.mjs` (inliner).

---

## 5. Próximos pasos

1. **Validar la demo v2** (¿el nivel editorial va por acá? ¿ajustar violeta/titulares/secciones?).
2. Menores de la demo: reemplazar `WA_NUMBER`, meter fotos reales del cliente, desactivar Deployment Protection si se comparte.
3. **Extraer el skill `demo-nicho`** del proceso de esta demo (usar `skill-creator`). Debe encapsular:
   - Pipeline: Paso 0 dirección de arte (con freno) → sistema de diseño (variables) → contenido → maquetado + movimiento → QA anti-genérico + demo-safe.
   - Biblioteca de secciones (header, hero tipográfico, banda, diferenciadores, catálogo con filtros, financiación/pasos, permuta, nosotros+stats, reseñas, ubicación+mapa, closer, footer, WA flotante).
   - Kernel: Lenis + reveal, WhatsApp directo, fallback de imágenes, mobile-first 390px, accesibilidad AA, `noindex` + aviso demo.
   - Filtro anti-genérico (heredar de `prompt-diseno-estetica.md`).
   - Modos: **genérico** (solo el nicho → negocio ficticio) y **personalizado** (brief con nombre/zona/WhatsApp/color/servicios/fotos).
   - Presets de arranque: Top 5 nichos.
   - Salida: mini-proyecto ordenado + README con deploy a Vercel.
   - Entregar como `.skill` para instalar.
4. Correr la 2da demo con el skill ya hecho (siguiente nicho sugerido: **odontología/estética** o **inmobiliarias**).

---

## 6. Cómo continuar en Claude Code

- Empezá leyendo `claude/brief-skill-demos-por-nicho.md` (el diseño del skill) y `claude/prompt-diseno-estetica.md` (el filtro de calidad).
- Para el skill, usá el patrón de la demo v2 como plantilla base del kernel.
- El estilo de la demo (v2) es el "golden reference": negro puro, titular gigante mayúsculas, chevron `›` como firma, acento en una variable CSS, Lenis + reveal sobrio, WhatsApp directo.
- Regla de oro heredada de Umbral: **ningún dato del negocio hardcodeado donde se pueda evitar** (color y número de WhatsApp en una sola variable cada uno).
