/* ============================================================
   Litoral Automotores — interacción
   Sistemas Umbral · registro de movimiento ALTO (48px · .45s · parallax)
   Núcleo: CATÁLOGO (grilla de fichas + filtros + página de detalle) y
   COTIZADOR (permuta / financiación / venta) con parámetros en negocio.js.
   ============================================================ */
(function () {
  'use strict';

  var N = window.NEGOCIO || {};
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ------------------------------------------------------------
  // Utilidades
  // ------------------------------------------------------------
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(s) { return String(s).replace(/[<>&"]/g, function (c) {
    return ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c]; }); }
  function money(n) { return '$ ' + Math.round(n).toLocaleString('es-AR'); }
  function km(n) { return n > 0 ? n.toLocaleString('es-AR') + ' km' : '0 km'; }
  function img(name) { return 'assets/img/' + name + '.jpg'; }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function autoById(id) { return (N.catalogo || []).filter(function (a) { return a.id === id; })[0]; }

  // ------------------------------------------------------------
  // Ícono de WhatsApp — el glifo OFICIAL completo, definido UNA vez.
  // Regla Umbral: el logo de WhatsApp no se dibuja a mano ni se recorta.
  // ------------------------------------------------------------
  var WA_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z';

  function pintarIconosWa(ctx) {
    $$('.wa-ico', ctx).forEach(function (el) {
      if (el.dataset.listo) return;
      el.dataset.listo = '1';
      el.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">' +
                     '<path d="' + WA_PATH + '"/></svg>';
    });
  }

  // ------------------------------------------------------------
  // WhatsApp: un solo número, mensajes pre-armados
  // ------------------------------------------------------------
  function waLink(msg) {
    return 'https://wa.me/' + N.whatsapp + '?text=' + encodeURIComponent((N.saludo || '') + (msg || ''));
  }
  function buildWaLinks(ctx) {
    $$('[data-wa]', ctx).forEach(function (el) {
      el.setAttribute('href', waLink(el.getAttribute('data-wa')));
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
  }

  // ------------------------------------------------------------
  // Imágenes: nunca una imagen rota. Gradiente de marca + chevron.
  // ------------------------------------------------------------
  function imgFallback(ctx) {
    $$('img', ctx).forEach(function (el) {
      if (el.dataset.noFallback) return;
      el.addEventListener('error', function () {
        if (el.dataset.failed) return;
        el.dataset.failed = '1';
        var label = (el.getAttribute('alt') || '').replace(/[<>&]/g, '');
        var svg =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">' +
          '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="#1E1E22"/><stop offset="1" stop-color="#0A0A0C"/>' +
          '</linearGradient></defs>' +
          '<rect width="800" height="600" fill="url(#g)"/>' +
          '<path d="M372 250l34 26-34 26" fill="none" stroke="#B8F224" stroke-width="7" stroke-linecap="square"/>' +
          '<text x="400" y="342" fill="#C4F53D" font-family="Arial,sans-serif" font-size="23" ' +
          'text-anchor="middle" font-weight="bold" letter-spacing="4">LITORAL</text>' +
          '<text x="400" y="374" fill="#8A8A93" font-family="sans-serif" font-size="16" ' +
          'text-anchor="middle">' + label + '</text></svg>';
        el.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
      }, { once: true });
    });
  }

  // ------------------------------------------------------------
  // Header + parallax + WhatsApp flotante
  // ------------------------------------------------------------
  function header() {
    var h = $('.header');
    if (!h) return;
    if (h.classList.contains('header--interna')) return;
    var on = function () { h.classList.toggle('scrolled', window.scrollY > 20); };
    on(); window.addEventListener('scroll', on, { passive: true });
  }

  // Parallax marcado del hero (registro ALTO). Se apaga con "menos movimiento".
  function parallax() {
    if (reduce) return;
    var foto = $('.hero__foto');
    if (!foto) return;
    var on = function () {
      var y = window.scrollY;
      if (y > window.innerHeight) return;   // solo mientras el hero está en pantalla
      foto.style.transform = 'translateY(' + (y * 0.18).toFixed(1) + 'px)';
    };
    on(); window.addEventListener('scroll', on, { passive: true });
  }

  // ------------------------------------------------------------
  // Mapa: solo se pide a Google si hay conexión (regla Umbral §8).
  // ------------------------------------------------------------
  function mapa() {
    var cajas = $$('[data-mapa]');
    if (!cajas.length) return;
    var q = encodeURIComponent(N.direccion || '');
    var maps = 'https://www.google.com/maps?q=' + q;

    cajas.forEach(function (caja) {
      var off = $('.place__map-off', caja);
      if (off) {
        var a = document.createElement('a');
        a.className = off.className; a.href = maps;
        a.target = '_blank'; a.rel = 'noopener';
        a.innerHTML = off.innerHTML;
        off.parentNode.replaceChild(a, off);
      }
      if (!navigator.onLine) return;
      var f = document.createElement('iframe');
      f.title = 'Mapa de ubicación';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.src = 'https://www.google.com/maps?q=' + q + '&output=embed';
      f.addEventListener('load', function () { caja.classList.add('con-mapa'); });
      caja.appendChild(f);
    });
  }

  function mobileNav() {
    var burger = $('.burger'), menu = $('.mobile-nav');
    if (!burger || !menu) return;
    var toggle = function (open) {
      burger.classList.toggle('open', open);
      menu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    burger.addEventListener('click', function () { toggle(!menu.classList.contains('open')); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { toggle(false); }); });
  }

  function waFloat() {
    var f = $('.wa-float');
    if (!f) return;
    var on = function () { f.classList.toggle('show', window.scrollY > 520); };
    on(); window.addEventListener('scroll', on, { passive: true });
  }

  // ------------------------------------------------------------
  // Reveal al entrar en pantalla (con escalonado)
  // ------------------------------------------------------------
  function reveal() {
    var els = $$('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('in'); }); return;
    }
    els.forEach(function (e) {
      var r = e.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        var d = parseInt(e.getAttribute('data-delay') || '0', 10);
        setTimeout(function () { e.classList.add('in'); }, reduce ? 0 : d);
      }
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var d = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(function () { el.classList.add('in'); }, reduce ? 0 : d);
        io.unobserve(el);
      });
    }, { threshold: .1, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  // Vuelve a observar los [data-reveal] que se inyectan después (catálogo).
  function revealScan() { reveal(); }

  // ------------------------------------------------------------
  // Titular que se arma palabra por palabra
  // ------------------------------------------------------------
  function splitTitle() {
    var t = $('[data-split]');
    if (!t) return;
    if (reduce) { t.classList.add('title-in'); return; }

    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part.trim()) { frag.appendChild(document.createTextNode(part)); return; }
            var w = document.createElement('span');
            w.className = 'word';
            var inner = document.createElement('span');
            inner.textContent = part;
            w.appendChild(inner);
            frag.appendChild(w);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1 && !child.classList.contains('word')) {
          walk(child);
        }
      });
    };
    walk(t);

    $$('.word > span', t).forEach(function (s, i) {
      s.style.transitionDelay = (i * 50) + 'ms';
    });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { t.classList.add('title-in'); });
    });
  }

  // ------------------------------------------------------------
  // Contadores
  // ------------------------------------------------------------
  function counters() {
    var nums = $$('[data-count]');
    if (!nums.length || !('IntersectionObserver' in window)) return;
    var run = function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suf = el.getAttribute('data-suffix') || '';
      var raw = el.getAttribute('data-raw') === '1';
      var fmt = function (v) { return raw ? String(Math.round(v)) : Math.round(v).toLocaleString('es-AR'); };
      if (reduce) { el.textContent = fmt(target) + suf; return; }
      var start = null, dur = 1500;
      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = fmt(target * (1 - Math.pow(1 - p, 3))) + suf;
        if (p < 1) requestAnimationFrame(step); else el.textContent = fmt(target) + suf;
      };
      requestAnimationFrame(step);
    };
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: .5 });
    nums.forEach(function (n) { io.observe(n); });
  }

  // ============================================================
  // NÚCLEO · CATÁLOGO
  //   · tarjeta .auto (foto, precio y tres datos) reutilizable
  //   · destacados = autos con `destacado:true` (home)
  //   · catálogo completo + filtros (condición + tipo) en catalogo.html
  //   · ficha de detalle en vehiculo.html?id=…
  // ============================================================
  function autoCard(a) {
    var href = 'vehiculo.html?id=' + encodeURIComponent(a.id);
    var spec = function (k, v) {
      return '<div class="auto__spec"><span class="k">' + k + '</span><span class="v">' + esc(v) + '</span></div>';
    };
    return '' +
    '<article class="auto" data-reveal data-tipo="' + esc(a.tipo) + '" data-cond="' + esc(a.condicion) + '">' +
      '<a class="auto__media" href="' + href + '" aria-label="Ver ' + esc(a.marca + ' ' + a.modelo) + '">' +
        '<img loading="lazy" src="' + img(a.img) + '" alt="' + esc(a.marca + ' ' + a.modelo + ' ' + a.version) + '">' +
        (a.tag ? '<span class="auto__tag">' + esc(a.tag) + '</span>' : '') +
        '<span class="auto__cond">' + (a.condicion === '0km' ? '0 km' : 'Usado') + '</span>' +
      '</a>' +
      '<div class="auto__body">' +
        '<div class="auto__marca">' + esc(a.marca + ' ' + a.modelo) + '</div>' +
        '<h3 class="auto__name">' + esc(a.version) + '</h3>' +
        '<div class="auto__specs">' +
          spec('Año', a.anio) + spec('Kilómetros', km(a.km)) + spec('Caja', a.transmision) +
        '</div>' +
        '<div class="auto__foot">' +
          '<div class="auto__price"><small>Precio</small><b>' + money(a.precio) + '</b></div>' +
          '<a class="auto__link" href="' + href + '">Ver ficha <span class="chev">›</span></a>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function renderDestacados() {
    var grid = $('#destacados-grid');
    if (!grid || !N.catalogo) return;
    grid.innerHTML = (N.catalogo.filter(function (a) { return a.destacado; })).map(function (a, i) {
      return autoCard(a).replace('data-reveal', 'data-reveal data-delay="' + ((i % 3) * 80) + '"');
    }).join('');
  }

  function renderCatalogo() {
    var grid = $('#catalogo-grid');
    if (!grid || !N.catalogo) return;
    grid.innerHTML = N.catalogo.map(function (a, i) {
      return autoCard(a).replace('data-reveal', 'data-reveal data-delay="' + ((i % 3) * 70) + '"');
    }).join('');
  }

  // Filtros: dos dimensiones (condición + tipo) que se combinan con Y.
  function filtrosCatalogo() {
    var box = $('#catalogo-filtros');
    var grid = $('#catalogo-grid');
    if (!box || !grid || !N.filtros) return;

    var estado = { condicion: 'todos', tipo: 'todos' };

    function fila(dim, label, opciones) {
      return '<div class="filtro-row"><span class="filtro-lbl">' + label + '</span>' +
        '<div class="filters" data-dim="' + dim + '">' +
          opciones.map(function (o, i) {
            return '<button class="filter' + (i === 0 ? ' active' : '') + '" data-f="' + o.id +
                   '" aria-pressed="' + (i === 0) + '">' + esc(o.label) + '</button>';
          }).join('') +
        '</div></div>';
    }
    box.innerHTML =
      fila('condicion', 'Condición', N.filtros.condicion) +
      fila('tipo', 'Tipo', N.filtros.tipo);

    var countEl = $('#catalogo-count');
    function aplicar() {
      var visibles = 0;
      $$('.auto', grid).forEach(function (card) {
        var okC = estado.condicion === 'todos' || card.getAttribute('data-cond') === estado.condicion;
        var okT = estado.tipo === 'todos' || card.getAttribute('data-tipo') === estado.tipo;
        var show = okC && okT;
        card.style.display = show ? '' : 'none';
        if (show) visibles++;
      });
      if (countEl) {
        countEl.innerHTML = visibles
          ? '<b>' + visibles + '</b> ' + (visibles === 1 ? 'vehículo disponible' : 'vehículos disponibles')
          : '';
      }
      var vacio = $('#catalogo-vacio');
      if (vacio) vacio.hidden = visibles > 0;
    }

    box.addEventListener('click', function (e) {
      var b = e.target.closest('.filter');
      if (!b) return;
      var dim = b.parentElement.getAttribute('data-dim');
      $$('.filter', b.parentElement).forEach(function (x) {
        x.classList.remove('active'); x.setAttribute('aria-pressed', 'false');
      });
      b.classList.add('active'); b.setAttribute('aria-pressed', 'true');
      estado[dim] = b.getAttribute('data-f');
      aplicar();
    });
    aplicar();
  }

  // Ficha de detalle — vehiculo.html?id=…  (una sola página, data-driven)
  function renderFicha() {
    var root = $('#ficha');
    if (!root) return;
    var id = new URLSearchParams(window.location.search).get('id');
    var a = id && autoById(id);

    if (!a) {
      root.innerHTML =
        '<nav class="crumbs"><a href="index.html">Inicio</a><span class="sep">›</span>' +
        '<a href="catalogo.html">Catálogo</a><span class="sep">›</span><span>No encontrado</span></nav>' +
        '<h1>Ese vehículo ya no está publicado</h1>' +
        '<p class="lead" style="margin:14px 0 26px">Puede que se haya vendido. Mirá el resto del stock disponible.</p>' +
        '<a class="btn btn-primary" href="catalogo.html">Ver el catálogo <span class="chev">›</span></a>';
      return;
    }

    document.title = a.marca + ' ' + a.modelo + ' ' + a.version + ' — Litoral Automotores';
    var titulo = a.marca + ' ' + a.modelo;
    var msg = 'Me interesa el ' + a.marca + ' ' + a.modelo + ' ' + a.version + ' (' + a.anio + '). ¿Sigue disponible?';

    var specDefs = [
      ['Año', a.anio], ['Kilómetros', km(a.km)], ['Transmisión', a.transmision],
      ['Combustible', a.combustible], ['Condición', a.condicion === '0km' ? '0 km' : 'Usado'],
      ['Segmento', ({ pickup: 'Pickup', suv: 'SUV', sedan: 'Sedán', hatch: 'Hatchback' })[a.tipo] || a.tipo]
    ];
    var specs = specDefs.map(function (s) {
      return '<div class="detail__spec"><span class="k">' + s[0] + '</span><span class="v">' + esc(s[1]) + '</span></div>';
    }).join('');

    var incluye = (a.incluye && a.incluye.length)
      ? '<h2 class="h-sub detail__h">Equipamiento destacado</h2>' +
        '<ul class="detail__list">' + a.incluye.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>'
      : '';

    var faqBlock = (a.faq && a.faq.length)
      ? '<h2 class="h-sub detail__h">Preguntas sobre esta unidad</h2>' +
        '<div class="faq">' + a.faq.map(function (f) {
          return '<div class="faq__item">' +
            '<button class="faq__q" aria-expanded="false">' + esc(f[0]) + '<span class="chev">›</span></button>' +
            '<div class="faq__a"><p>' + esc(f[1]) + '</p></div></div>';
        }).join('') + '</div>'
      : '';

    root.innerHTML =
      '<nav class="crumbs"><a href="index.html">Inicio</a><span class="sep">›</span>' +
        '<a href="catalogo.html">Catálogo</a><span class="sep">›</span><span>' + esc(titulo) + '</span></nav>' +
      '<div class="detail__grid">' +
        '<div class="detail__media" data-reveal>' +
          '<img src="' + img(a.img) + '" alt="' + esc(a.marca + ' ' + a.modelo + ' ' + a.version) + '">' +
        '</div>' +
        '<div data-reveal data-delay="80">' +
          '<div class="detail__marca">' + esc(a.marca + ' ' + a.modelo) + (a.tag ? ' · ' + esc(a.tag) : '') + '</div>' +
          '<h1>' + esc(a.version) + '</h1>' +
          '<div class="detail__price"><b>' + money(a.precio) + '</b><small>Precio de lista · contado</small></div>' +
          '<div class="detail__specs">' + specs + '</div>' +
          incluye +
          '<div class="detail__actions">' +
            '<a class="btn btn-wa" data-wa="' + esc(msg) + '"><span class="wa-ico"></span>Consultar por WhatsApp</a>' +
            '<a class="btn btn-ghost" href="cotiza.html">Cotizar o financiar <span class="chev">›</span></a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      faqBlock;

    pintarIconosWa(root);
    buildWaLinks(root);
    imgFallback(root);
    faq();
    revealScan();
  }

  // ============================================================
  // COTIZADOR — permuta / financiación / venta.
  // Todo se calcula acá con los parámetros de negocio.js (que mañana
  // configura el dueño desde el panel). Es SIEMPRE un aproximado:
  // asume el usado en buen estado, sujeto a revisión.
  // ============================================================
  // Valor de un ejemplar IMPECABLE del usado, a partir de marca + modelo +
  // año + km. Sin margen: es el número (generoso) que ve el cliente; el
  // ajuste real es presencial. El cliente nunca escribe el precio.
  function estimarUsado(marca, modelo, anio, kmReal) {
    var E = N.cotizador && N.cotizador.estimador;
    if (!E) return null;
    var mk = (E.marcas || []).filter(function (x) { return x.marca === marca; })[0];
    if (!mk) return null;
    var md = (mk.modelos || []).filter(function (x) { return x.modelo === modelo; })[0];
    if (!md || md.valorBase == null) return null;
    var anios = Math.max(0, E.anioBase - anio);
    var val = md.valorBase * Math.pow(1 - E.deprAnual, anios);
    var esperado = Math.max(1, E.kmPromedioAnual * anios);
    var desvio = (esperado - (kmReal || 0)) / esperado;      // + si tiene menos km que lo esperado
    var factor = 1 + clamp(desvio, -1, 1) * E.ajusteKmMax;
    val = val * factor;
    return Math.max(0, Math.round(val / 100000) * 100000);   // redondeo a la centena de mil
  }

  // Cuota por sistema francés
  function cuotaFrances(monto, iMensual, n) {
    if (monto <= 0 || n <= 0) return 0;
    if (iMensual <= 0) return monto / n;
    var f = Math.pow(1 + iMensual, n);
    return monto * (iMensual * f) / (f - 1);
  }

  function cotizador() {
    var raiz = $('#cotizador');
    if (!raiz || !N.cotizador) return;

    var C = N.cotizador;
    var estado = { modo: 'permuta' };

    // ---- opciones que salen de negocio.js ----
    var optVehiculos = (N.catalogo || []).map(function (a) {
      return '<option value="' + esc(a.id) + '">' + esc(a.marca + ' ' + a.modelo + ' ' + a.version + ' — ' + money(a.precio)) + '</option>';
    }).join('');
    var optMarcas = (C.estimador.marcas || []).map(function (m) {
      return '<option value="' + esc(m.marca) + '">' + esc(m.marca) + '</option>';
    }).join('');
    var optPlazos = (C.financiacion.plazos || []).map(function (p) {
      return '<option value="' + p + '">' + p + ' cuotas</option>';
    }).join('');
    // años: del actual hacia atrás 25
    var anioBase = C.estimador.anioBase;
    var optAnios = '';
    for (var y = anioBase; y >= anioBase - 25; y--) optAnios += '<option value="' + y + '">' + y + '</option>';

    // ---- markup de los tres paneles + el resultado ----
    // El usado se identifica por MARCA + MODELO + AÑO + KM. El cliente nunca
    // escribe el precio: la web lo calcula y muestra el valor de un ejemplar
    // impecable (el gancho). El ajuste real es presencial.
    raiz.innerHTML =
      '<div class="cotiz__modos" role="tablist">' +
        '<button class="cotiz__modo active" data-modo="permuta">Entregar mi usado</button>' +
        '<button class="cotiz__modo" data-modo="venta">Vender mi usado</button>' +
        '<button class="cotiz__modo" data-modo="financiacion">Financiar</button>' +
      '</div>' +
      '<div class="cotiz">' +
        '<div class="cotiz__forms">' +

          // --- PERMUTA ---
          '<div class="cotiz__panel active" data-panel="permuta">' +
            '<p class="cotiz__intro">Entregás tu usado como parte de pago del auto que te llevás. Lo tasamos asumiéndolo en excelente estado; el valor final lo confirmamos al verlo.</p>' +
            '<div class="cotiz__form">' +
              '<div class="field"><label for="p-veh">Auto que querés llevarte</label><select id="p-veh">' + optVehiculos + '</select></div>' +
              '<div class="cotiz__row">' +
                '<div class="field"><label for="p-marca">Marca de tu usado</label><select id="p-marca">' + optMarcas + '</select></div>' +
                '<div class="field"><label for="p-modelo">Modelo</label><select id="p-modelo"></select></div>' +
              '</div>' +
              '<div class="cotiz__row">' +
                '<div class="field"><label for="p-anio">Año</label><select id="p-anio">' + optAnios + '</select></div>' +
                '<div class="field"><label for="p-km">Kilómetros</label><input id="p-km" type="number" inputmode="numeric" placeholder="Ej: 80000"></div>' +
              '</div>' +
              '<div class="field"><label for="p-plazo">Si financiás el saldo</label><select id="p-plazo">' + optPlazos + '</select></div>' +
            '</div>' +
          '</div>' +

          // --- VENTA ---
          '<div class="cotiz__panel" data-panel="venta">' +
            '<p class="cotiz__intro">¿Solo querés saber cuánto vale tu auto? Cargá los datos y te damos la tasación estimada, asumiéndolo en excelente estado. Acercate y la confirmamos en persona.</p>' +
            '<div class="cotiz__form">' +
              '<div class="cotiz__row">' +
                '<div class="field"><label for="v-marca">Marca</label><select id="v-marca">' + optMarcas + '</select></div>' +
                '<div class="field"><label for="v-modelo">Modelo</label><select id="v-modelo"></select></div>' +
              '</div>' +
              '<div class="cotiz__row">' +
                '<div class="field"><label for="v-anio">Año</label><select id="v-anio">' + optAnios + '</select></div>' +
                '<div class="field"><label for="v-km">Kilómetros</label><input id="v-km" type="number" inputmode="numeric" placeholder="Ej: 80000"></div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          // --- FINANCIACIÓN ---
          '<div class="cotiz__panel" data-panel="financiacion">' +
            '<p class="cotiz__intro">Elegí el auto y el plan. Te mostramos la cuota aproximada. Podés financiar el 100% o dejar una entrega inicial para que la cuota baje.</p>' +
            '<div class="cotiz__form">' +
              '<div class="field"><label for="f-veh">Auto</label><select id="f-veh">' + optVehiculos + '</select></div>' +
              '<div class="field"><label>¿Cómo lo pagás?</label>' +
                '<div class="cotiz__modos" style="margin-bottom:0">' +
                  '<button type="button" class="cotiz__modo active" data-entrega="con" style="padding:10px 16px">Con entrega inicial</button>' +
                  (C.financiacion.permite100 ? '<button type="button" class="cotiz__modo" data-entrega="100" style="padding:10px 16px">Financiar el 100%</button>' : '') +
                '</div>' +
              '</div>' +
              '<div class="field range-field" data-anticipo><label for="f-anticipo">Entrega inicial: <output id="f-anticipo-out"></output></label>' +
                '<input id="f-anticipo" type="range" min="0" max="80" step="5"></div>' +
              '<div class="field"><label for="f-plazo">Plazo</label><select id="f-plazo">' + optPlazos + '</select></div>' +
            '</div>' +
          '</div>' +

        '</div>' +

        // --- RESULTADO ---
        '<aside class="cotiz__result" id="cotiz-result"></aside>' +
      '</div>';

    var resEl = $('#cotiz-result', raiz);

    // Estado de la entrega en financiación (con / 100%)
    var entrega = 'con';

    function num(id) { var el = $('#' + id, raiz); return el ? parseFloat(el.value) : NaN; }
    function val(id) { var el = $('#' + id, raiz); return el ? el.value : ''; }

    // Poblar el select de modelos según la marca elegida (marca → modelo)
    function poblarModelos(marcaSel, modeloSel) {
      var sel = $('#' + modeloSel, raiz);
      if (!sel) return;
      var mk = (C.estimador.marcas || []).filter(function (x) { return x.marca === val(marcaSel); })[0];
      sel.innerHTML = (mk ? mk.modelos : []).map(function (m) {
        return '<option value="' + esc(m.modelo) + '">' + esc(m.modelo) + '</option>';
      }).join('');
    }

    function bloqueDesglose(lineas) {
      return '<ul class="cotiz__desglose">' + lineas.map(function (l) {
        return '<li' + (l[2] ? ' class="total"' : '') + '><span>' + esc(l[0]) + '</span><b>' + esc(l[1]) + '</b></li>';
      }).join('') + '</ul>';
    }
    function resultado(titulo, sub, big, bigLabel, desglose, nota, waMsg) {
      resEl.innerHTML =
        '<h3>' + esc(titulo) + '</h3>' +
        '<p class="cotiz__result-sub">' + esc(sub) + '</p>' +
        '<div class="cotiz__big"><small>' + esc(bigLabel) + '</small>' + esc(big) + '</div>' +
        desglose +
        '<p class="cotiz__nota">' + esc(nota) + '</p>' +
        '<a class="btn btn-wa btn-block" data-wa="' + esc(waMsg) + '"><span class="wa-ico"></span>Coordinar por WhatsApp</a>';
      pintarIconosWa(resEl);
      buildWaLinks(resEl);
    }
    function placeholder(txt) {
      resEl.innerHTML = '<h3>Tu cotización</h3><p class="cotiz__placeholder">' + esc(txt) + '</p>';
    }

    var cftMensual = C.financiacion.cftAnual / 12;

    function recompute() {
      if (estado.modo === 'permuta') {
        var a = autoById(val('p-veh'));
        var tasacion = estimarUsado(val('p-marca'), val('p-modelo'), num('p-anio'), num('p-km'));
        if (!a) { placeholder('Elegí el auto que querés.'); return; }
        if (tasacion == null) { placeholder('Completá los datos de tu usado para ver el aproximado.'); return; }
        var saldo = a.precio - tasacion;
        var mLabel = val('p-marca') + ' ' + val('p-modelo');
        var lineas = [
          ['Precio del ' + a.marca + ' ' + a.modelo, money(a.precio)],
          ['Tomamos tu ' + mLabel, '– ' + money(tasacion)],
          [saldo >= 0 ? 'Saldo a abonar / financiar' : 'Saldo a tu favor', money(Math.abs(saldo)), true]
        ];
        if (saldo > 0) {
          var n = parseInt(val('p-plazo'), 10) || C.financiacion.plazos[0];
          var cuota = cuotaFrances(saldo, cftMensual, n);
          lineas.push(['Saldo en ' + n + ' cuotas de', money(cuota)]);
        }
        var waMsg = 'Quiero entregar mi ' + mLabel + ' ' + (num('p-anio') || '') + ' (' + (num('p-km') || 0) +
          ' km) por el ' + a.marca + ' ' + a.modelo + ' ' + a.version + '. La web tasó mi usado en ' + money(tasacion) +
          ' y me da un saldo de ' + money(Math.abs(saldo)) + '. ¿Lo confirmamos?';
        resultado('Tu permuta, estimada', 'Tasación de tu usado (excelente estado)', money(tasacion), 'Te tomamos tu usado por',
          bloqueDesglose(lineas), 'Tasación generosa, asumiendo el auto impecable. La confirmamos al revisarlo en el local.', waMsg);

      } else if (estado.modo === 'venta') {
        var tas = estimarUsado(val('v-marca'), val('v-modelo'), num('v-anio'), num('v-km'));
        if (tas == null) { placeholder('Completá los datos de tu usado para ver la tasación.'); return; }
        var mLabelV = val('v-marca') + ' ' + val('v-modelo');
        var lineasV = [
          ['Tu auto', mLabelV + ' ' + (num('v-anio') || '')],
          ['Kilómetros', km(num('v-km') || 0)],
          ['Tasación estimada', money(tas), true]
        ];
        var waMsgV = 'Quiero vender mi ' + mLabelV + ' ' + (num('v-anio') || '') + ' (' + (num('v-km') || 0) +
          ' km). La web me tasó en ' + money(tas) + '. ¿Coordinamos para verlo?';
        resultado('Tu tasación', 'Cuánto vale tu usado, estimado', money(tas), 'Tu auto vale, aproximado',
          bloqueDesglose(lineasV), 'Tasación generosa, asumiendo el auto impecable. El precio final lo cerramos al verlo en el local.', waMsgV);

      } else { // financiacion
        var af = autoById(val('f-veh'));
        if (!af) { placeholder('Elegí un auto para ver la cuota.'); return; }
        var antPct = entrega === '100' ? 0 : (num('f-anticipo') || 0) / 100;
        var anticipo = Math.round(af.precio * antPct / 100000) * 100000;
        var monto = af.precio - anticipo;
        var nf = parseInt(val('f-plazo'), 10) || C.financiacion.plazos[0];
        var cuotaF = cuotaFrances(monto, cftMensual, nf);
        var totalPagar = anticipo + cuotaF * nf;
        var lineasF = [
          ['Precio del auto', money(af.precio)],
          ['Entrega inicial', money(anticipo)],
          ['Monto a financiar', money(monto)],
          ['Plazo', nf + ' cuotas'],
          ['Total aproximado a pagar', money(totalPagar), true]
        ];
        var waMsgF = 'Quiero financiar el ' + af.marca + ' ' + af.modelo + ' ' + af.version +
          (antPct ? ' con una entrega de ' + money(anticipo) : ' financiando el 100%') +
          ' en ' + nf + ' cuotas. La web me estimó una cuota de ' + money(cuotaF) + '. ¿Me pasás el detalle?';
        resultado('Tu financiación, estimada', 'Cuota mensual aproximada', money(cuotaF), nf + ' cuotas fijas de',
          bloqueDesglose(lineasF), 'Cuota estimada con un CFT anual del ' + Math.round(C.financiacion.cftAnual * 100) +
          '% (ficticio en la demo). Sujeta a aprobación crediticia.', waMsgF);
      }
    }

    // ---- eventos ----
    $$('.cotiz__modo[data-modo]', raiz).forEach(function (b) {
      b.addEventListener('click', function () {
        estado.modo = b.getAttribute('data-modo');
        $$('.cotiz__modo[data-modo]', raiz).forEach(function (x) { x.classList.toggle('active', x === b); });
        $$('.cotiz__panel', raiz).forEach(function (p) { p.classList.toggle('active', p.getAttribute('data-panel') === estado.modo); });
        recompute();
      });
    });
    // entrega con / 100% (dentro de financiación)
    $$('.cotiz__modo[data-entrega]', raiz).forEach(function (b) {
      b.addEventListener('click', function () {
        entrega = b.getAttribute('data-entrega');
        $$('.cotiz__modo[data-entrega]', raiz).forEach(function (x) { x.classList.toggle('active', x === b); });
        var wrap = $('[data-anticipo]', raiz);
        if (wrap) wrap.style.display = entrega === '100' ? 'none' : '';
        recompute();
      });
    });

    // slider de anticipo
    var antMin = Math.round(C.financiacion.anticipoMinPct * 100);
    var slider = $('#f-anticipo', raiz), sliderOut = $('#f-anticipo-out', raiz);
    if (slider) {
      slider.min = antMin; slider.value = antMin;
      var syncOut = function () { if (sliderOut) sliderOut.textContent = slider.value + '%'; };
      syncOut();
      slider.addEventListener('input', function () { syncOut(); recompute(); });
    }

    // inputs que recalculan. Al cambiar la marca, se repuebla su modelo.
    ['p-veh', 'p-marca', 'p-modelo', 'p-anio', 'p-km', 'p-plazo',
     'v-marca', 'v-modelo', 'v-anio', 'v-km',
     'f-veh', 'f-plazo'].forEach(function (id) {
      var el = $('#' + id, raiz);
      if (!el) return;
      var handler = function () {
        if (id === 'p-marca') poblarModelos('p-marca', 'p-modelo');
        if (id === 'v-marca') poblarModelos('v-marca', 'v-modelo');
        recompute();
      };
      el.addEventListener('input', handler);
      el.addEventListener('change', handler);
    });

    // valores iniciales sensatos
    poblarModelos('p-marca', 'p-modelo');
    poblarModelos('v-marca', 'v-modelo');
    var pAnio = $('#p-anio', raiz); if (pAnio) pAnio.value = anioBase - 4;
    var vAnio = $('#v-anio', raiz); if (vAnio) vAnio.value = anioBase - 4;
    var pKm = $('#p-km', raiz); if (pKm) pKm.value = 60000;
    var vKm = $('#v-km', raiz); if (vKm) vKm.value = 60000;

    recompute();
  }

  // ------------------------------------------------------------
  // Equipo, reseñas, stats, financiación, FAQ general
  // ------------------------------------------------------------
  function renderEquipo() {
    var g = $('#equipo-grid');
    if (!g || !N.equipo) return;
    g.innerHTML = N.equipo.map(function (m, i) {
      return '<article class="member" data-reveal data-delay="' + (i * 80) + '">' +
        '<div class="member__media"><img loading="lazy" src="' + img(m.img) + '" alt="' + esc(m.nombre) + '"></div>' +
        '<h3>' + esc(m.nombre) + '</h3><p>' + esc(m.rol) + '</p></article>';
    }).join('');
  }

  function renderResenas() {
    var g = $('#resenas-grid');
    if (!g || !N.resenas) return;
    var star = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.2 6.6.9-4.8 4.6 1.2 6.6L12 17.2 6.1 20.3l1.2-6.6L2.5 9.1l6.6-.9z"/></svg>';
    g.innerHTML = N.resenas.map(function (r, i) {
      return '<article class="review" data-reveal data-delay="' + (i * 80) + '">' +
        '<div class="review__stars" aria-label="5 de 5">' + star.repeat(5) + '</div>' +
        '<p>' + esc(r.texto) + '</p>' +
        '<footer><b>' + esc(r.autor) + '</b>' + esc(r.detalle) + '</footer></article>';
    }).join('');
  }

  function renderStats() {
    var g = $('#stats-grid');
    if (!g || !N.stats) return;
    g.innerHTML = N.stats.map(function (s, i) {
      var raw = s.n > 1900 && s.n < 2100 ? ' data-raw="1"' : '';
      return '<div class="stat" data-reveal data-delay="' + (i * 70) + '">' +
        '<b data-count="' + s.n + '" data-suffix="' + (s.suf || '') + '"' + raw + '>0</b>' +
        '<span>' + esc(s.label) + '</span></div>';
    }).join('');
  }

  function renderFinanciacion() {
    var g = $('#financiacion-grid');
    if (!g || !N.financiacion) return;
    g.innerHTML = N.financiacion.map(function (o, i) {
      return '<div class="obra" data-reveal data-delay="' + ((i % 3) * 60) + '">' +
        '<b>' + esc(o.nombre) + '</b><span>' + esc(o.detalle) + '</span></div>';
    }).join('');
  }

  function faq() {
    $$('.faq__item').forEach(function (item) {
      var q = $('.faq__q', item), a = $('.faq__a', item);
      if (!q || q.dataset.listo) return;
      q.dataset.listo = '1';
      q.addEventListener('click', function () {
        var open = item.classList.toggle('open');
        q.setAttribute('aria-expanded', open ? 'true' : 'false');
        a.style.height = open ? a.scrollHeight + 'px' : '0px';
      });
    });
  }

  function renderFaqGeneral() {
    var g = $('#faq-general');
    if (!g || !N.faqGeneral) return;
    g.innerHTML = N.faqGeneral.map(function (f) {
      return '<div class="faq__item">' +
        '<button class="faq__q" aria-expanded="false">' + esc(f[0]) + '<span class="chev">›</span></button>' +
        '<div class="faq__a"><p>' + esc(f[1]) + '</p></div></div>';
    }).join('');
    faq();
  }

  // ------------------------------------------------------------
  // Lenis + anclas
  // ------------------------------------------------------------
  function smooth() {
    var lenis = null;
    if (!reduce && window.Lenis) {
      lenis = new window.Lenis({ duration: 1.15, smoothWheel: true });
      var raf = function (t) { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id.length < 2) return;
        var t = $(id);
        if (!t) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(t, { offset: -70 });
        else t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      });
    });
  }

  // ------------------------------------------------------------
  // Menú desplegable del header
  // ------------------------------------------------------------
  function dropdown() {
    $$('.nav__drop').forEach(function (d) {
      var btn = $('button', d);
      if (!btn) return;
      var abrir = function (v) {
        d.classList.toggle('open', v);
        btn.setAttribute('aria-expanded', v ? 'true' : 'false');
      };
      btn.addEventListener('click', function (e) { e.stopPropagation(); abrir(!d.classList.contains('open')); });
      d.addEventListener('mouseenter', function () { abrir(true); });
      d.addEventListener('mouseleave', function () { abrir(false); });
      document.addEventListener('click', function () { abrir(false); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') abrir(false); });
    });
  }

  // ------------------------------------------------------------
  // Footer — se arma solo desde los datos del negocio
  // ------------------------------------------------------------
  var ICO_IG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.06 1.17-.26 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.07.36-2.24.41-1.27.06-1.65.07-4.86.07s-3.59-.01-4.86-.07c-1.17-.06-1.82-.26-2.24-.42-.57-.22-.96-.48-1.38-.9-.42-.42-.69-.82-.9-1.38-.16-.42-.36-1.07-.42-2.24-.05-1.26-.06-1.65-.06-4.84s.02-3.59.06-4.86c.06-1.17.26-1.81.42-2.23.21-.57.48-.96.9-1.38.42-.42.81-.69 1.38-.9.42-.17 1.05-.36 2.22-.42C8.42 2.18 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.02 7.05.07 5.78.13 4.91.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.91.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.02 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.67 1.34 1.08 2.13 1.38.77.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.02 4.95-.07c1.28-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.67-.67 1.08-1.34 1.38-2.13.3-.77.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.02-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.94 19.86.63c-.77-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0z"/><path d="M12 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"/><circle cx="18.41" cy="5.59" r="1.44"/></svg>';
  var ICO_FB = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.02 24 18.06 24 12.07z"/></svg>';
  var ICO_MAIL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M3 7l9 6 9-6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function renderFooter() {
    var f = $('[data-footer]');
    if (!f) return;
    var r = N.redes || {};
    var wa = 'https://wa.me/' + N.whatsapp;

    f.innerHTML =
    '<div class="container">' +
      '<div class="footer__grid">' +

        '<div>' +
          '<a href="index.html" class="brand">' +
            '<svg class="brand__mark" viewBox="0 0 34 34" fill="none" aria-hidden="true">' +
              '<rect x="1" y="1" width="32" height="32" rx="7" stroke="#B8F224" stroke-width="1.6"/>' +
              '<path d="M13 10l7 7-7 7" stroke="#B8F224" stroke-width="2.6" stroke-linecap="square"/></svg>' +
            '<span class="brand__name">Litoral<span>Automotores</span></span></a>' +
          '<p class="footer__tagline">0km y usados con garantía en ' + esc(N.ciudad) + '. ' +
            'Permuta, financiación 100% y gestoría propia.</p>' +
          '<div class="redes">' +
            (r.instagram ? '<a href="' + r.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + ICO_IG + '</a>' : '') +
            (r.facebook ? '<a href="' + r.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + ICO_FB + '</a>' : '') +
            '<a class="red-wa" href="' + wa + '" target="_blank" rel="noopener" aria-label="WhatsApp"><span class="wa-ico"></span></a>' +
            '<a href="mailto:' + esc(N.email) + '" aria-label="Email">' + ICO_MAIL + '</a>' +
          '</div>' +
        '</div>' +

        '<div><h4>La concesionaria</h4><ul>' +
          '<li><a href="nosotros.html">Quiénes somos</a></li>' +
          '<li><a href="equipo.html">Nuestro equipo</a></li>' +
          '<li><a href="catalogo.html">Catálogo</a></li>' +
          '<li><a href="cotiza.html">Cotizá tu usado</a></li>' +
        '</ul></div>' +

        '<div><h4>Clientes</h4><ul>' +
          '<li><a href="financiacion.html">Financiación</a></li>' +
          '<li><a href="preguntas.html">Preguntas frecuentes</a></li>' +
          '<li><a href="cotiza.html">Cotizador online</a></li>' +
          '<li><a href="contacto.html">Contacto</a></li>' +
        '</ul></div>' +

        '<div><h4>Contacto</h4><ul class="footer__contacto">' +
          '<li><span class="k">Dirección</span><span>' + esc(N.direccion) + '</span></li>' +
          '<li><span class="k">Teléfono</span><span>' + esc(N.telefono) + '</span></li>' +
          '<li><span class="k">Email</span><a href="mailto:' + esc(N.email) + '">' + esc(N.email) + '</a></li>' +
          '<li><span class="k">Horarios</span><span>' + esc(N.horarios) + '</span></li>' +
        '</ul></div>' +

      '</div>' +
      '<div class="footer__bottom">' +
        '<span>© <span id="year"></span> ' + esc(N.nombre) + ' · ' + esc(N.ciudad) + ', ' + esc(N.provincia) + '</span>' +
        '<span class="demo-note">Sitio de demostración · negocio y precios ficticios</span>' +
        '<a class="footer__firma" href="' + wa + '" target="_blank" rel="noopener">' +
          'Hecho por <b>Sistemas Umbral</b> <span class="chev">›</span></a>' +
      '</div>' +
    '</div>';

    pintarIconosWa(f);
    buildWaLinks(f);
  }

  // ------------------------------------------------------------
  // Datos del negocio al DOM
  // ------------------------------------------------------------
  function pintarDatos() {
    $$('[data-n]').forEach(function (el) {
      var v = N[el.getAttribute('data-n')];
      if (v) el.textContent = v;
    });
    var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
  }

  // ------------------------------------------------------------
  // Init
  // ------------------------------------------------------------
  function init() {
    renderFooter();
    dropdown();
    pintarDatos();
    mapa();
    renderDestacados();
    renderCatalogo();
    filtrosCatalogo();
    renderFicha();
    cotizador();
    renderEquipo();
    renderResenas();
    renderStats();
    renderFinanciacion();
    renderFaqGeneral();
    pintarIconosWa();
    buildWaLinks();
    imgFallback();
    header();
    parallax();
    mobileNav();
    waFloat();
    splitTitle();
    reveal();
    counters();
    smooth();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
