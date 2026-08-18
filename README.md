# Demos Sistemas Umbral

Portfolio de webs demo por nicho. Cada demo es una plantilla reutilizable: se construye una vez con
datos ficticios, se muestra en vivo o por link, y se re-brandea para el cliente que la compre.

**Todo anda sin internet.** Sin build, sin npm, sin framework. HTML, CSS y JavaScript común.

---

## Cómo abrir las demos

### Opción 1 — Doble clic (lo más simple)

Abrí `demo-odontologia/index.html` con doble clic. Listo.

Funciona sin servidor y sin internet. Es lo que conviene para mirar rápido en la propia PC.

### Opción 2 — Servidor local (necesario para ver desde el celular)

Doble clic en **`abrir-demos.bat`**.

Levanta un servidor en el puerto 8777, abre el navegador solo, y te imprime en pantalla las dos
direcciones:

```
En esta PC:        http://localhost:8777/demo-odontologia/index.html
Desde el celular:  http://192.168.1.12:8777/demo-odontologia/index.html
```

Para verlo en el celular, **la PC y el celular tienen que estar en el mismo WiFi**. No hace falta
que ese WiFi tenga internet: alcanza con que los dos estén colgados de la misma red.

> **Sobre el firewall:** en tu PC ya está permitido — hay reglas de entrada para Python activas en
> el perfil **Público**, y tu WiFi (`Personal-WiFi-D6F 2`) está catalogado como Público. Debería
> andar sin tocar nada.
>
> Si alguna vez te conectás a otra red y el celular no entra, es porque Windows la catalogó como
> **Privada** y las reglas no la cubren. Cuando aparezca el cartel de Windows preguntando, tildá
> **las dos** casillas (privadas y públicas) y listo.

Para cortar el servidor: `Ctrl+C` en la ventana negra, o cerrala.

---

## Qué necesita internet y qué no

| Parte | Sin internet |
|---|---|
| Tipografías (Fraunces + Inter) | ✅ Van locales en `assets/fonts/`, 254 KB |
| Fotos | ✅ Todas locales en `assets/img/` |
| Scroll suave (Lenis) | ✅ La librería está descargada al proyecto |
| Ícono y links de WhatsApp | ✅ El SVG está en el JS. Los links abren si hay datos/WiFi |
| Panel de muestra | ✅ Todo local |
| **Mapa de Google** | ⚠️ Es lo único que lo pide. Sin conexión muestra un bloque de marca con la dirección, que abre Google Maps al tocarlo — nunca el cartel de error del navegador |

---

## Estructura

```
.
├── abrir-demos.bat            # levanta el servidor local (para el celular)
├── estilo-umbral.md           # ★ el ADN de diseño — leer antes de tocar nada
├── HANDOFF.md                 # estado del proyecto y próximos pasos
├── muestra-tipografias.html   # las 5 parejas tipográficas en contexto
├── demo-odontologia/          # ★ demo golden — la referencia actual
│   ├── index.html + 8 páginas internas
│   ├── panel/index.html       # panel de muestra, 4 pantallas
│   └── assets/
│       ├── data/negocio.js    # ★ TODOS los datos editables acá
│       ├── css/ · js/ · img/ · fonts/
└── demo-concesionaria-usados.zip   # demo vieja, sin actualizar al ADN v2
```

---

## Para re-brandear una demo a un cliente

1. Duplicar la carpeta. **La demo original no se toca**: se sigue mostrando a otros prospectos.
2. Editar `assets/data/negocio.js` — nombre, dirección, horarios, servicios, precios, equipo, reseñas.
3. Cambiar `--primary` en `assets/css/styles.css` por el acento del logo del cliente.
4. Reemplazar las fotos de `assets/img/` manteniendo los nombres.
5. Poner el WhatsApp y el mail del cliente en `negocio.js`.
6. Sacar el `noindex` y el aviso de demostración del pie.

---

## Aviso

Los negocios, direcciones, precios y reseñas de las demos son **ficticios**.
Los datos de contacto son los reales de Sistemas Umbral, a propósito: quien abre una demo es un
prospecto, y si toca WhatsApp tiene que escribirle a Ian.
