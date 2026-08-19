# El estilo Sistemas Umbral — ADN de las webs

> Fuente de verdad del skill `demo-nicho`. Todo lo que está acá es **fijo**: no se rediscute por nicho,
> no se improvisa, no se hace la excepción en silencio. Lo que varía por nicho está marcado como
> **[capa de nicho]** y siempre elige de una lista cerrada.
>
> Versión 2.2 · 18/08/2026 · Base: Litoral Automotores (oscuro/catálogo) + Ribera Odontología (claro/servicios)
>
> **v2.1** — correcciones sobre la demo de odontología mirada en pantalla: header visible desde el arranque (§1), desplegable del cliente (§1), cierre como bloque contenido (§1 pieza 9), dos reglas nuevas en el filtro anti-genérico (§9) y el límite de 25% de padding por sección (§13).
>
> **v2.2** — el hero pasa de velo claro a **lavado de acento medido** (§3.1, nuevo). El header vuelve a ser transparente en blanco sobre el hero, ahora que el fondo es oscuro. Orden fijo de la barra con Equipo suelto, pastilla de página actual y dos botones a la derecha (§1). Corte del header a 1080px.

---

## 0. La idea en una línea

Una web Umbral se reconoce por **el esqueleto y el ritmo**, no por el color. Dos webs de rubros
distintos comparten estructura, tiempos de animación y detalles de acabado; cambian de piel.

**La prueba:** si le sacás el logo y los colores a dos webs Umbral, un diseñador tiene que poder decir
"estas dos las hizo el mismo estudio". Y el dueño de cada negocio tiene que sentir que la suya es
única.

---

## 1. El esqueleto de la home (orden fijo)

Toda home Umbral tiene estas diez piezas, **en este orden**. Ninguna se saltea. La única que cambia
de contenido según el rubro es la número 5.

| # | Pieza | Qué hace | Regla dura |
|---|---|---|---|
| 1 | **Header** | Logo, navegación, botón de acción | Sticky. Cambia de estado al scrollear (se compacta y gana fondo). |
| 2 | **Hero** | El titular gigante sobre una foto teñida | Foto del negocio de fondo con **lavado de acento** (ver §3.1) y zoom lento de 18s. Texto **alineado a la izquierda**, nunca centrado. Máximo 7 palabras. Una sola palabra en acento, en el tono claro de la paleta. |
| 3 | **Números** | Cuatro cifras que se cuentan solas | Banda compacta sobre fondo apenas distinto. Entra rápido y sin texto largo: es lo primero después del hero. |
| 4 | **Nosotros** | Quiénes son y su regla de la casa | Foto del local al costado, texto al lado. Acá va la frase que define cómo trabajan. |
| 5 | **El núcleo** | **[capa de nicho]** — ver §2 | Lo que el negocio vende. Es la sección más larga y la que lleva a las páginas de detalle. |
| 6 | **Cómo se trabaja** | Los pasos, de la consulta a la entrega | Tres o cuatro pasos numerados. Saca el miedo a preguntar. |
| 7 | **Diferenciadores 01–04** + **reseñas** | Por qué este y no el de al lado | Exactamente cuatro, numerados, **una sola línea de texto cada uno**. Van abajo, no arriba: al principio nadie lee párrafos. Reseñas sin avatar genérico. |
| 8 | **Dónde estamos** | Mapa y datos reales | Mapa embebido, dirección, horarios, teléfono. |
| 9 | **Cierre** | La última oportunidad de que escriban | Una sola frase y un solo botón. Nada más. **Bloque oscuro contenido** dentro del container (no banda a todo el ancho), con papel alrededor, texto a la izquierda y botón a la derecha. |
| 10 | **Footer** | Cuatro columnas + redes | Marca y bajada · páginas del negocio · páginas para el cliente · contacto (dirección, teléfono, mail, horarios). Redes en círculo abajo de la marca. En las demos: aviso de "demostración" + `noindex`. |

**Flotante:** botón de WhatsApp que aparece después del hero y no se va más.

### Páginas internas (mapa fijo)

Ocho páginas además de la home. Se generan todas aunque el negocio sea chico: una web con secciones
propias se ve seria, y son las que el dueño espera encontrar.

| Página | Qué lleva |
|---|---|
| **Quiénes somos** | La historia, la regla de la casa, los números y el equipo. |
| **Equipo** | Quién es cada uno y qué hace. |
| **El núcleo** (tratamientos / catálogo / carta) | El listado completo con filtros. |
| **Ficha de detalle** | Una por ítem: foto grande, qué incluye, precio, preguntas frecuentes y botón de WhatsApp que menciona ese ítem. |
| **Cobertura / formas de pago** | Obras sociales, financiación o lo que aplique al rubro. |
| **Preguntas frecuentes** | Ocho preguntas reales, en acordeón. Saca objeciones antes de que las digan. |
| **Turnos / reservas** | Las tres vías de contacto y qué traer. Solo en rubros de agenda. |
| **Contacto** | Las vías, el mapa, cómo llegar. |

**Sin blog.** Solo si el cliente lo pide expresamente: un blog vacío o desactualizado hace más daño
que no tenerlo.

- **Panel de muestra** — ver §7.

### El menú
- **Orden de la barra, fijo:** Inicio · [la empresa] · [el núcleo] · Equipo · **[cliente] ▾** · Contacto.
  - Un solo desplegable, el del **cliente** ("Pacientes", "Clientes"): cobertura o formas de pago,
    preguntas frecuentes, turnos online. Es el menú que la gente busca.
  - Lo demás va suelto. **Equipo no se esconde en un desplegable**: en negocios de servicio, la
    cara de quien atiende es argumento de venta.
  - Un desplegable de un solo ítem no es un desplegable: si queda uno, pasa a link suelto.
  - Las columnas del footer repiten **los mismos grupos, con las mismas etiquetas**.
- **Página actual: pastilla**, no subrayado. Sobre el hero, blanco al 16%; con el header sólido,
  acento al 8% con el texto en acento.
- **Dos botones a la derecha, no uno:** el urgente en fantasma ("Urgencias", "Presupuesto ya") y
  el de conversión en sólido ("Reservar turno"). El fantasma sobre el hero va con borde blanco
  al 55%. Ambos salen a WhatsApp con mensajes distintos.
- **La barra colapsa a hamburguesa antes que el resto del layout.** Con seis ítems más dos botones
  no entra por debajo de ~1100px: el corte del header va en **1080px**, el del resto de las
  grillas queda en 860. Son dos media queries distintas, a propósito.
- El botón de acción va **separado del menú**, a la derecha y en color de acento.
- **Sobre el hero:** transparente, con logo y links en **blanco** — la barra se apoya sobre el
  lavado de acento y se lee sin fondo propio. Al bajar, pasa a papel sólido con texto en tinta.
  - **La regla no es "blanco siempre": es contraste contra el hero.** Si por lo que sea el hero
    queda claro, el menú blanco desaparece y la web arranca sin barra visible. Pasó en la demo
    de odontología. Antes de entregar se abre la home arriba de todo y se confirma que se leen
    el logo y los links **sin scrollear**.
- **Al bajar:** gana fondo claro al 86% con desenfoque, sombra suave, la altura baja de 74 a 58px y el logo se achica. En páginas internas arranca ya sólido.

---

## 2. El núcleo por nicho **[capa de nicho]**

La pieza 5 cambia de forma según lo que el negocio vende. Hay **tres formas**, no más:

| Forma | Para quién | Cómo se ve |
|---|---|---|
| **Catálogo** | Concesionaria, inmobiliaria, tienda | Grilla de fichas con foto, precio y tres datos. Filtros arriba. Cada ficha lleva a su página. |
| **Servicios** | Odontología, estética, gimnasio, estudios profesionales | Lista de servicios con qué incluye, cuánto sale y cuánto dura. Cada uno lleva a su página con el detalle y el paso a paso. |
| **Carta** | Restaurante, café, bar | **Menú digital**: categorías con precio siempre visible. Cada plato con dos botones — *Más info* (abre la ficha en un modal, sin salir de la carta) y *Pedir* (lo suma a la comanda: delivery o take away, por WhatsApp). Foto por plato, opcional (la carga el dueño). |

Ningún nicho combina dos formas. Si un negocio vende productos *y* servicios, gana el que le da de
comer: se elige uno y el otro va como sección secundaria.

**La forma Carta es un menú digital, no un catálogo de e-commerce** (aprendido en la demo de Rescoldo):

- **La carta es la entrada.** El dueño la linkea en Instagram/Google y la gente cae directo ahí, no en
  la home. Tiene que pararse sola y dejar claro a primera vista que se puede *ver* y *pedir*.
- **Nada de hover como única pista.** Se ve en el celular: la acción va en **botones explícitos**, no en
  "tocá la fila". La ficha del plato abre en **modal** (nunca una página tipo producto: eso se siente
  tienda online).
- **El pedido es una comanda, no un changuito.** *Pedir* (en la carta) o *Agregar al pedido* (en la ficha)
  **solo suman** el plato y avisan con un toast; no abren nada. Una **barra flotante** muestra el resumen y
  abre la comanda, que se toca cuando el cliente terminó de elegir. La comanda tiene los platos con
  cantidad, el **modo de entrega** (delivery / take away — el take away no pide dirección, muestra la del
  local), los **datos** y el **medio de pago** (efectivo / el que use el negocio). Todo sale en **un solo
  mensaje de WhatsApp** para que quien atiende solo confirme. Lenguaje de restaurante ("Tu pedido", "Enviar
  por WhatsApp"), nunca "carrito/checkout/pagar". Sin pasarela: el pago se coordina en la entrega.
- **Comer en el salón vs. pedir** conviven: en la ficha, *Agregar al pedido* arma la comanda; *Comer acá*
  queda como gancho para definir con el cliente (mostrar al mozo, o mandar el pedido de mesa al panel de
  recepción). La reserva de mesa vive en la web, **no** en el plato.

---

## 3. La piel: base visual **[capa de nicho]**

Regla escrita, sin corazonadas:

| Registro | Nichos | Fondo | Texto |
|---|---|---|---|
| **Oscuro** | Concesionaria, gimnasio, restaurante, bar, tecnología, industria | Negro casi puro `#0A0A0C` | Blanco y gris niebla |
| **Claro** | Odontología, estética, salud, inmobiliaria, jurídico, contable, educación | Blanco hueso `#FAFAF7` | Negro tinta y gris |

El color de acento sale del logo del cliente y vive en **una sola variable**. En las demos (negocio
ficticio) se elige un acento que no sea el azul ni el rojo de siempre.

### 3.1 El lavado del hero

La foto del hero **no se atenúa con un velo neutro: se tiñe con el color de acento**. Es lo que hace
que la portada se sienta de la marca y no una foto de stock con un filtro gris encima.

**Cómo se sacan los tres pesos** a partir del único acento de la marca:
acento **hondo** = el acento con la luminosidad al ~45% · acento **medio** = el acento tal cual ·
acento **claro** = el acento con la luminosidad al ~180%. En Ribera: `#08403A` · `#0E7C6B` · `#6FE3CD`.
El claro es además el color de la palabra acentuada del titular y del chevron sobre fondo oscuro.

Tres pesos del mismo acento, en diagonal a 115°:

```
linear-gradient(115deg,
  rgba(<acento hondo>, .95)  0%,     /* el acento oscurecido — acá va el titular */
  rgba(<acento hondo>, .90) 55%,
  rgba(<acento>,       .72) 80%,
  rgba(<acento claro>, .22) 100%)    /* acá se abre y la foto respira */
```

**Los stops no se eligen a ojo: se miden.** El texto del hero va en blanco, y el contenido llega hasta
el 95% del ancho porque la lista de garantías vive en la columna derecha. La regla dura:

> **Contraste ≥4 contra blanco en todo el ancho donde haya texto.**
> Se muestrea la foto real con el gradiente aplicado, en 5 o 6 puntos horizontales. Si el último
> tramo con texto baja de 4, se corre el stop — no se deja pasar.
>
> **Y se mide contra el color que el navegador REALMENTE pinta**, leído con `getComputedStyle`,
> no contra el que uno cree que puso. Pasarle blanco a la cuenta cuando el CSS terminó pintando
> gris da un número lindo y una web ilegible: la lista de garantías de la demo dio 6.3 en el
> papel y 1.7 en pantalla, porque las reglas de color del hero habían quedado **antes** de las
> originales en el archivo, con la misma especificidad. Con especificidad pareja gana la última:
> los overrides de piel del hero van **al final** del bloque del hero, no al principio.

En la demo de odontología el primer intento (3 stops, copiando la referencia tal cual) daba **2.36 al
62% del ancho**: la lista de la derecha era ilegible. Con cuatro stops quedó en 10.3 / 7.9 / 4.5 / 4.0.

**Lo que sigue prohibido** es el velo **neutro** — negro o gris — con texto centrado: esa es la receta
de plantilla. Teñir con el acento y alinear a la izquierda es lo contrario.

### 3.2 El encabezado de página interna

El encabezado de cada página interna (`.pagehero`: miga de pan, eyebrow, titular, lead) **lleva el mismo
lavado del hero** (§3.1), no una banda de color plano. Una banda plana `--paper-2` se ve muerta —
sobre base oscura queda "toda negra", sobre base clara pasa más desapercibida pero igual apaga la página.

La receta:
- Una **foto de fondo distinta por sección** (`.pagehero--<slug>`, imagen por CSS), para que no sea siempre
  la misma banda. Se reusan fotos que ya están en la demo; alcanza con que cada sección tenga la suya, no
  hace falta una foto nueva. Repetir una foto entre dos secciones es aceptable.
- El **mismo velo de acento** del hero por encima (en `::after`), y el texto al frente en blanco + eyebrow
  en el tono claro del acento. La miga de pan sube a blanco tenue (el gris `--fog` no se lee sobre el velo).

Es menos crítico que el hero —no hay lista a la derecha— así que el mismo gradiente del hero alcanza sin
volver a medir. Regla: **ninguna sección interna queda como color plano.** Vale para todos los nichos, no
solo los de base oscura.

---

## 4. La piel: tipografía **[capa de nicho]**

Cinco parejas cerradas. Se elige una, no se inventa ninguna. Todas de Google Fonts, todas gratis.
Validadas visualmente el 18/08/2026.

| Pareja | Nichos | Display | Texto | Caja | Acento de demo | Carácter |
|---|---|---|---|---|---|---|
| **Motor** | Concesionaria, gimnasio, industria, tecnología | Archivo Expanded 700 | Inter | MAYÚSCULAS | Lima ácido `#B8F224` | Ancha y con presencia, como el lettering del baúl de un auto. |
| **Bisturí** | Odontología, estética, salud | Fraunces 600 | Inter | Caja mixta | Verde clínico `#0E7C6B` | Cálida y precisa. Confianza sin frialdad de hospital. |
| **Mantel** | Restaurante, café, bar, hotelería | Bodoni Moda 700 | Inter | Caja mixta | Terracota `#C9552D` | Alto contraste, tipo carta de restaurante bueno. |
| **Escritura** | Inmobiliaria, jurídico, contable, seguros | Newsreader 600 | Inter | Caja mixta | Azul petróleo `#1F4E5F` | Editorial seria, de diario de calidad. |
| **Taller** | Oficios, construcción, servicios técnicos | Bricolage Grotesque 800 | Inter | MAYÚSCULAS | Amarillo de obra `#FFC300` | Maciza pero con remates hechos a mano: construida, no estampada. |

**Inter siempre para el texto de lectura.** Es la constante: cambia la voz del titular, no la del
cuerpo. Eso es parte de la firma.

**La caja es parte de la piel.** Las dos parejas sin serif van en mayúsculas; las tres con serif, en
caja mixta. Un serif en mayúsculas gigantes se ve duro y viejo, y en salud gritar directamente no
queda bien.

**Los acentos de la tabla son para las demos** (negocio ficticio). Ninguno se repite y ninguno es el
azul ni el rojo de siempre. En una web de cliente real el acento sale de su logo.

**Space Grotesk es de Sistemas Umbral, no de los clientes.** Es la letra de la agencia: propuestas,
documentos internos, marca propia. Salió del catálogo de nichos justamente para que no se confunda tu
identidad con la de un cliente.

**Prohibidas siempre:** Montserrat, Poppins, Playfair Display, Lato, Raleway, Open Sans. Son las
tipografías de la plantilla de Wix, y se reconocen a un kilómetro.

---

## 5. El movimiento

### 5.1 Los siete efectos de la casa (fijos)

Este es el repertorio. No se agregan efectos nuevos por capricho.

1. **Scroll suave (Lenis)** — el scroll tiene peso e inercia. Es lo primero que se nota y lo que más "caro" hace sentir al sitio.
2. **Aparición al entrar en pantalla** — los bloques suben 24px y se revelan. En grupos, escalonado de 80ms entre elementos.
3. **Titular que se arma** — el hero entra palabra por palabra, no de golpe.
4. **Zoom lento en el hero** — la foto de fondo entra en 1.1 y baja a 1.0 en 18 segundos. Casi no se percibe, y es lo que hace que la portada se sienta viva en vez de una postal.
5. **Foto que respira al pasar el mouse** — zoom lento de 1.0 a 1.06 y ganancia leve de color. Nunca al revés (nada de foto que se achica).
6. **Números que cuentan** — las estadísticas suben desde cero cuando entran en pantalla.
7. **Botón que se levanta** — al pasar el mouse gana altura y sombra, y el chevron se corre 3px a la derecha.

### 5.2 Los tres registros de intensidad **[capa de nicho]**

Mismos siete efectos, distinta amplitud:

| Registro | Nichos | Cómo se siente |
|---|---|---|
| **Sereno** | Salud, odontología, jurídico, contable | Movimientos de 24px, duración 0.8s, sin parallax en el hero. Todo llega despacio y se queda quieto. |
| **Equilibrado** | Inmobiliaria, restaurante, estética, educación | Los valores de referencia. Movimientos de 32px, 0.6s. |
| **Alto** | Concesionaria, gimnasio, bar, tecnología | Movimientos de 48px, 0.45s, parallax marcado, titular con más peso visual. Golpea. |

### 5.3 La regla de Windows (crítica)

Windows viene con "reducir animaciones" activado de fábrica en muchas instalaciones. Si apagamos
todos los efectos cuando detectamos eso, Ian abre su propia demo en su PC **y la ve muerta**.

**Regla:** con "reducir animaciones" activado se apagan el parallax, el scroll suave y el titular que
se arma. **Se mantienen** las apariciones (más cortas y sin desplazamiento) y los hovers. La web
nunca queda plana del todo.

---

## 6. La firma discreta: el chevron `›`

El detalle que se repite en todas las webs Umbral, siempre chico, nunca protagonista:

- Al final de cada botón principal, y se corre 3px a la derecha en el hover.
- Como viñeta de las listas, en color de acento, en vez del punto o el tilde.
- Como separador entre las migas de navegación.
- En el gradiente de reemplazo cuando una foto no carga.

Nunca aparece grande, nunca como elemento decorativo suelto, nunca compite con el logo del cliente.
Es la costura del sastre: se nota si sabés mirar.

---

## 7. El panel de muestra

Se genera con cada demo, en `/panel`. **No guarda nada**: son pantallas navegables con datos
inventados, hechas para la reunión.

| Pantalla | Qué muestra | Por qué vende |
|---|---|---|
| **Resumen** | Visitas de la semana, consultas recibidas, qué se miró más | "Vas a saber si la web trabaja o no" |
| **Consultas** | Lista de los WhatsApp que entraron, con qué producto miraban | "Sabés de qué te vienen a hablar antes de contestar" |
| **Contenido** | El stock o los servicios, editables desde ahí | "Cambiás el precio vos, sin llamarme" |
| **Turnos** | Solo en rubros de agenda: calendario con los turnos del día | Es el gancho del negocio principal |

Mismo estilo que la web: el panel se ve como una pieza de la misma familia, no como una plantilla de
Bootstrap pegada atrás.

---

## 8. Fotos

- El skill **las busca y las descarga solo**. Ian no busca fotos nunca.
- Quedan guardadas en `assets/img/` dentro del proyecto, optimizadas. **Nunca por link a un servidor ajeno**: en una reunión con mal wifi, un link roto te hunde la venta.
- Si igual alguna falla, aparece un gradiente de marca con el chevron. Nunca el ícono de imagen rota.
- Los créditos de cada foto se guardan en `assets/data/creditos.json`.

**Fuente: Unsplash, descargando local.** Openverse se probó en la demo de odontología y **no sirve**:
de 11 búsquedas trajo 3 fotos usables (una casa de ladrillos para "recepción dental", una enfermera
militar con un bebé para "asistente dental") y **una con marca de agua de Getty**, que además es un
problema de licencia. Su índice es Flickr y Wikimedia: fotos amateur de hace quince años.

**Las fotos se miran antes de usarlas, siempre.** Se arma un mosaico con todas las descargadas y se
revisa con los ojos. En rubros de salud y comida la foto mala no es un detalle: hunde la percepción
de calidad de toda la web. Descartar y volver a buscar es parte del trabajo, no una excepción.

---

## 9. El filtro anti-genérico

Antes de dar una web por terminada, ninguna de estas puede estar presente:

- ❌ Hero con foto de fondo, **texto centrado** encima y **velo neutro** (negro o gris). La foto sí va — lo que está prohibido es esa receta: el velo Umbral se tiñe con el **acento** (§3.1) y el texto va alineado a la izquierda.
- ❌ **Texto blanco sobre un lavado sin medir.** Si no muestreaste el contraste sobre la foto real, no sabés si se lee. La mitad derecha del hero es donde siempre falla.
- ❌ **Titular partido en medio de una oración.** Si hay un punto, el renglón corta **en el punto** y la segunda oración va entera abajo. Una palabra huérfana colgando arriba después del punto no tiene simetría. Si el corte tiene que caer en otro lado, el punto pasa a ser **coma**.
  Los saltos de los titulares van **explícitos con `<br>`**, nunca librados al `max-width`: el ancho cambia con la fuente y el idioma, y el corte termina donde no lo elegíste. Se verifica leyendo los renglones renderizados, no mirando el HTML.
- ❌ Las tipografías prohibidas de §4.
- ❌ Íconos de línea genéricos para los diferenciadores (el maletín, el cohete, el escudo).
- ❌ Reseñas con avatar de dibujito o con nombres tipo "Juan P.".
- ❌ Azul corporativo `#007BFF` o rojo `#FF0000` como acento.
- ❌ Textos de relleno: "soluciones a medida", "calidad y confianza", "años de experiencia" sin un número real.
- ❌ Tres columnas iguales con ícono, título y párrafo. La composición tiene que tener jerarquía.
- ❌ Todo centrado. El alineado a la izquierda es más editorial y más difícil de hacer bien.
- ❌ **Menú que no se ve hasta scrollear.** Pasó en la demo de odontología: texto blanco sobre velo claro. Antes de entregar, abrir la home arriba de todo y confirmar que se leen el logo y los links.
- ❌ **Dos numeraciones 01–04 seguidas** en dos lenguajes visuales distintos. Si los pasos van numerados, los diferenciadores no pueden ir pegados abajo con otra numeración.
- ❌ Bordes redondeados grandes por todos lados. Umbral usa radios chicos (4–8px).
- ❌ Sombras difusas tipo "tarjetita flotante" de Material Design.

---

## 10. Lo que nunca se toca

- **El número de WhatsApp** vive en una sola variable, en un solo archivo.
- **El color de acento** vive en una sola variable, en un solo archivo.
- **Los datos del negocio** (stock, servicios, carta) viven en un archivo aparte, no incrustados en el HTML. Es lo que hace que el día que se enchufe una base de datos real no haya que rehacer nada.
- Sin framework, sin build, sin npm. HTML + CSS + JavaScript común, y las librerías descargadas al proyecto.
- Mobile primero, probado a 390px de ancho antes que en la computadora.
- Las demos llevan `noindex` y aviso de demostración en el pie.
- **La web se tiene que ver aunque el JavaScript falle.** El contenido que aparece al scrollear arranca
  invisible, y eso es una bomba: si el script no carga, queda la página en blanco. El contenido se
  esconde **solo** cuando el script está vivo (una clase `js` que el propio script le pone al `<html>`).
  Sin JavaScript se ve todo de una, sin animación. Además, lo que ya está en pantalla al cargar se
  revela sin esperar al observador de scroll — que no dispara si la pestaña arranca en segundo plano.

---

---

## 11. El botón de WhatsApp

Es el que convierte. No puede fallar, y falla siempre por lo mismo: alguien redibuja el logo a mano y
sale un globo sin el auricular adentro.

- **El glifo oficial completo, definido UNA sola vez** en el JavaScript, e inyectado en todos los
  botones del sitio. Nadie escribe un `<svg>` de WhatsApp a mano en el HTML. Nunca.
- **El globo flotante es solo el ícono**: círculo verde, sin texto al lado, abajo a la derecha.
  Aparece pasado el hero y no se va más.
- Los botones de WhatsApp **dentro** del contenido sí llevan texto además del ícono.
- Cada botón manda un **mensaje distinto ya escrito**, que menciona dónde tocó la persona
  ("Me interesa la Hilux 2021", "Quiero consultar por implantes").
- Verificación obligatoria antes de entregar: contar los íconos en pantalla y confirmar que todos
  dibujaron el auricular.

---

## 12. Los datos de contacto en las demos

**Todas las demos llevan los datos de Sistemas Umbral, no datos inventados.** El que abre la demo es
un prospecto: si toca WhatsApp tiene que escribirte a vos.

| Dato | Valor |
|---|---|
| WhatsApp | `5491155168112` |
| Email | sistemasumbral2026@gmail.com |
| Instagram | https://www.instagram.com/sistemasumbral/ |
| Facebook | https://www.facebook.com/sistemasumbral |

Lo que sí queda ficticio: nombre del negocio, dirección, horarios, teléfono fijo, precios y reseñas.
El footer cierra con **"Hecho por Sistemas Umbral ›"** enlazado a tu WhatsApp.

Al vender la web, estos datos se reemplazan por los del cliente y la firma queda como crédito.

---

## 13. Densidad: el aire se gana, no se regala

El espacio en blanco es una herramienta, no un relleno. Si un bloque de aire no separa dos ideas
distintas, sobra — y obliga a scrollear de más.

- Secciones: entre 44 y 82px arriba y abajo. No más.
- El hero ocupa **76% de la altura de pantalla como máximo**, no la pantalla entera.
- Entre el título de una sección y su contenido: 26 a 42px.
- **Nada de párrafos largos arriba de todo.** Al principio la gente escanea: los números y las fotos
  entran primero, los textos explicativos van más abajo.
- Los cuatro diferenciadores llevan **una línea** de texto cada uno, no tres.
- **Ninguna sección puede ser más de un 25% padding.** Se mide: `padding / alto total`. Si da más, esa sección tiene poco contenido para el aire que ocupa — o se junta con la de al lado, o se aprieta. En la demo de odontología los diferenciadores daban 51% y se resolvió uniéndolos a las reseñas.
- Cuando un bloque trae **padding propio** (la caja del cierre), la sección que lo contiene usa la mitad del suyo: si no, se suman y quedan 126px de aire alrededor de tres líneas de texto.

---

## Pendiente de definir

- [ ] Los planes comerciales — qué funciones entran en cada plan.
- [ ] El preset de restaurantes (el de odontología ya está probado en la demo).
- [ ] Qué se hace con la demo cuando el cliente firma (proceso de duplicar y completar).
- [ ] Regenerar Litoral con el ADN v2 (hoy tiene el hero sin foto, el ícono viejo de WhatsApp y el footer de una sola fila).
