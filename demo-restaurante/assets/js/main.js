/* ============================================================
   Rescoldo — interacción
   Sistemas Umbral · registro de movimiento EQUILIBRADO
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
  function money(n) { return '$ ' + n.toLocaleString('es-AR'); }
  function img(name) { return 'assets/img/' + name + '.jpg'; }

  // Aplana la carta (categorías → items) y saca los platos estrella.
  // El núcleo de este nicho es la CARTA, no una lista de servicios.
  function platosEstrella() {
    var out = [];
    (N.carta || []).forEach(function (cat) {
      (cat.items || []).forEach(function (it) { if (it.estrella) out.push(it); });
    });
    return out;
  }
  // Índice de TODA la carta: cada plato recibe una key estable (su id si es
  // estrella, o cat-índice si no) para poder abrir su ficha en el modal sin
  // depender de que tenga id. Se estampa __key en el item para el render.
  var PLATOS = {};
  function indexCarta() {
    PLATOS = {};
    (N.carta || []).forEach(function (cat) {
      (cat.items || []).forEach(function (it, i) {
        var key = it.id || (cat.cat + '-' + i);
        it.__key = key;
        PLATOS[key] = { it: it, cat: cat.label };
      });
    });
  }

  // Miniatura de un plato: la foto si la tiene, o un placeholder de marca
  // (NO una imagen rota) hasta que el dueño la cargue desde el panel.
  function thumb(it) {
    if (it.img) return '<img loading="lazy" src="' + img(it.img) + '" alt="' + esc(it.nombre) + '">';
    return '<span class="thumb-ph" aria-hidden="true">' +
      '<svg viewBox="0 0 34 34" fill="none"><path d="M13 10l7 7-7 7" stroke="currentColor" ' +
      'stroke-width="2.6" stroke-linecap="square"/></svg></span>';
  }

  // ------------------------------------------------------------
  // Ícono de WhatsApp — el glifo OFICIAL completo, definido UNA vez.
  // Regla Umbral: el logo de WhatsApp no se dibuja a mano ni se recorta.
  // Se inyecta desde acá en todo <span class="wa-ico"> del sitio.
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
          '<path d="M372 250l34 26-34 26" fill="none" stroke="#C9552D" stroke-width="7" stroke-linecap="square"/>' +
          '<text x="400" y="342" fill="#E9A085" font-family="Georgia,serif" font-size="23" ' +
          'text-anchor="middle" font-weight="bold" letter-spacing="3">RESCOLDO</text>' +
          '<text x="400" y="374" fill="#8A8A93" font-family="sans-serif" font-size="16" ' +
          'text-anchor="middle">' + label + '</text></svg>';
        el.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
      }, { once: true });
    });
  }

  // ------------------------------------------------------------
  // Header + menú móvil + WhatsApp flotante
  // ------------------------------------------------------------
  function header() {
    var h = $('.header');
    if (!h) return;
    // En páginas internas el header ya arranca sólido y se queda así.
    if (h.classList.contains('header--interna')) return;
    var on = function () { h.classList.toggle('scrolled', window.scrollY > 20); };
    on(); window.addEventListener('scroll', on, { passive: true });
  }

  // ------------------------------------------------------------
  // Mapa: solo se pide a Google si hay conexión.
  // Regla Umbral §8: sin wifi, un recurso remoto que falla muestra el
  // cartel de error del navegador y hunde la venta. Sin conexión queda el
  // bloque de marca con la dirección, que igual lleva a Maps.
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

    // Lo que ya está en pantalla al cargar se muestra sin esperar al observador.
    // Evita el parpadeo del contenido de arriba y cubre el caso de la pestaña
    // que arranca en segundo plano (ahí el observador no dispara nunca).
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

  // ------------------------------------------------------------
  // Titular que se arma palabra por palabra
  // (con "menos movimiento" activado, aparece entero)
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
      s.style.transitionDelay = (i * 55) + 'ms';
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

  // ------------------------------------------------------------
  // Núcleo: la CARTA
  //   · destacados = platos estrella con foto (home)
  //   · menú = lista por categorías con precio (home + carta.html)
  //   · filtros = solo en carta.html, muestran/ocultan categorías
  // ------------------------------------------------------------
  // Dos botones por plato, siempre visibles (en celular no hay hover que
  // insinúe que algo se abre): "Más info" abre la ficha en modal, "Pedir"
  // suma el plato al pedido de delivery.
  function botonesPlato(it, chevMasInfo) {
    return '<div class="plato-acc">' +
      '<button class="btn btn-ghost btn-sm" data-info="' + esc(it.__key) + '">Más info' +
        (chevMasInfo ? ' <span class="chev">›</span>' : '') + '</button>' +
      '<button class="btn btn-primary btn-sm" data-add="' + esc(it.__key) + '">Pedir</button>' +
    '</div>';
  }

  function renderDestacados() {
    var grid = $('#destacados-grid');
    if (!grid) return;
    grid.innerHTML = platosEstrella().map(function (s, i) {
      return '' +
      '<article class="dish" data-reveal data-delay="' + ((i % 3) * 80) + '">' +
        '<span class="dish__media" data-info="' + esc(s.__key) + '" role="button" tabindex="0" ' +
          'aria-label="Ver ' + esc(s.nombre) + '">' +
          '<img loading="lazy" src="' + img(s.img) + '" alt="' + esc(s.nombre) + '">' +
          (s.tag ? '<span class="dish__tag">' + esc(s.tag) + '</span>' : '') +
        '</span>' +
        '<div class="dish__body">' +
          '<h3 class="dish__name">' + esc(s.nombre) + '</h3>' +
          '<p class="dish__desc">' + esc(s.desc) + '</p>' +
          '<div class="dish__foot">' +
            '<div class="dish__price"><small>Valor de referencia</small><b>' + money(s.precio) + '</b></div>' +
          '</div>' +
          botonesPlato(s, false) +
        '</div>' +
      '</article>';
    }).join('');
  }

  function renderCartaMenu() {
    var root = $('#carta-menu');
    if (!root || !N.carta) return;
    root.innerHTML = N.carta.map(function (cat) {
      var filas = (cat.items || []).map(function (it) {
        var chip = it.estrella ? '<span class="star">Estrella</span>' : '';
        return '<li class="menu__item">' +
          '<span class="menu__thumb" data-info="' + esc(it.__key) + '" role="button" tabindex="0" ' +
            'aria-label="Ver ' + esc(it.nombre) + '">' + thumb(it) + '</span>' +
          '<div class="menu__item-main">' +
            '<div class="menu__item-name"><h4>' + esc(it.nombre) + '</h4>' + chip + '</div>' +
            '<p>' + esc(it.desc) + '</p>' +
          '</div>' +
          '<div class="menu__price">' + money(it.precio) + '</div>' +
          botonesPlato(it, false) +
        '</li>';
      }).join('');
      return '<div class="menu__cat" data-cat="' + cat.cat + '" data-reveal>' +
        '<h3>' + esc(cat.label) + '</h3>' +
        '<ul class="menu__list">' + filas + '</ul>' +
      '</div>';
    }).join('');
  }

  // ------------------------------------------------------------
  // Ficha de plato en MODAL — se abre DENTRO de la carta (no navega).
  // Un mismo modal sirve a cualquier plato (estrella o no). Los estrella
  // muestran además "cómo lo servimos" y sus preguntas. Los botones de
  // acción son de PEDIDO (delivery) o de salón: la reserva de mesa vive
  // en la web, no en el plato. Se abre con [data-info].
  // ------------------------------------------------------------
  var openInfo = function () {}, closeInfo = function () {};
  function platoModal() {
    if (!N.carta) return;

    var modal = document.createElement('div');
    modal.className = 'modal modal--plato';
    modal.id = 'modal-plato';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = '<div class="modal__box modal__box--plato"></div>';
    document.body.appendChild(modal);
    var box = $('.modal__box', modal);

    function abrir(key) {
      var reg = PLATOS[key];
      if (!reg) return;
      var s = reg.it;
      var incluye = (s.incluye && s.incluye.length)
        ? '<h3 class="h-sub plato__h">Cómo lo servimos</h3>' +
          '<ul class="detail__list">' +
          s.incluye.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>'
        : '';
      var faqBlock = (s.faq && s.faq.length)
        ? '<div class="faq plato__faq">' + s.faq.map(function (f) {
            return '<div class="faq__item">' +
              '<button class="faq__q" aria-expanded="false">' + esc(f[0]) + '<span class="chev">›</span></button>' +
              '<div class="faq__a"><p>' + esc(f[1]) + '</p></div></div>';
          }).join('') + '</div>'
        : '';
      box.innerHTML =
        '<div class="plato__media">' + thumb(s) + '</div>' +
        '<div class="plato__body">' +
          '<div class="modal__head">' +
            '<div>' +
              '<span class="eyebrow">' + esc(s.tag || reg.cat) + '</span>' +
              '<h2 class="h-sub plato__name" id="plato-titulo">' + esc(s.nombre) + '</h2>' +
            '</div>' +
            '<button class="modal__close" data-cerrar-plato aria-label="Cerrar">×</button>' +
          '</div>' +
          '<p class="plato__desc">' + esc(s.desc) + '</p>' +
          '<div class="plato__price"><b>' + money(s.precio) + '</b><small>Valor de referencia</small></div>' +
          incluye + faqBlock +
          '<div class="detail__actions plato__actions">' +
            '<button class="btn btn-primary" data-add-close="' + esc(s.__key) + '">Agregar al pedido <span class="chev">›</span></button>' +
            '<button class="btn btn-ghost" type="button">Comer acá</button>' +
          '</div>' +
        '</div>';
      modal.setAttribute('aria-labelledby', 'plato-titulo');
      faq();
      box.scrollTop = 0;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function cerrar(keepLock) {
      modal.classList.remove('open');
      if (!keepLock) document.body.style.overflow = '';
    }
    openInfo = abrir; closeInfo = cerrar;

    // Abrir con [data-info] (botón "Más info" o la miniatura). Cerrar con
    // la × o tocando el fondo.
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-cerrar-plato]') || e.target === modal) { cerrar(); return; }
      var trigger = e.target.closest('[data-info]');
      if (trigger) { abrir(trigger.getAttribute('data-info')); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) { cerrar(); return; }
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var trigger = e.target.closest && e.target.closest('[data-info]');
      if (trigger) { e.preventDefault(); abrir(trigger.getAttribute('data-info')); }
    });
  }

  // ------------------------------------------------------------
  // El PEDIDO (delivery) — una COMANDA, no un changuito de ecommerce.
  //   · "Pedir" en cada plato lo suma (o incrementa) y avisa con un toast.
  //   · una barra flotante muestra el resumen y abre la comanda.
  //   · la comanda lista los platos con cantidad + los datos de entrega
  //     y manda TODO en un solo mensaje de WhatsApp: quien atiende confirma.
  //   · se guarda en sessionStorage: sobrevive al saltar de página.
  // ------------------------------------------------------------
  var PEDIDO_KEY = 'rescoldo_pedido';

  function pedido() {
    if (!N.carta) return;

    function leer() {
      try { return JSON.parse(sessionStorage.getItem(PEDIDO_KEY)) || []; }
      catch (e) { return []; }
    }
    var items = leer();   // [{ key, qty }]

    function guardar() {
      try { sessionStorage.setItem(PEDIDO_KEY, JSON.stringify(items)); } catch (e) {}
    }
    function total() {
      return items.reduce(function (t, l) {
        var reg = PLATOS[l.key]; return t + (reg ? reg.it.precio * l.qty : 0);
      }, 0);
    }
    function cantidad() { return items.reduce(function (n, l) { return n + l.qty; }, 0); }

    function sumar(key, delta) {
      if (!PLATOS[key]) return;
      var l = items.filter(function (x) { return x.key === key; })[0];
      if (!l) { if (delta < 0) return; l = { key: key, qty: 0 }; items.push(l); }
      l.qty += delta;
      if (l.qty <= 0) items = items.filter(function (x) { return x.key !== key; });
      guardar(); pintar();
    }
    function quitar(key) { items = items.filter(function (x) { return x.key !== key; }); guardar(); pintar(); }
    function vaciar() { items = []; guardar(); pintar(); }

    // ---- barra flotante ----
    var bar = document.createElement('button');
    bar.className = 'pedido-bar'; bar.id = 'pedido-bar'; bar.type = 'button';
    bar.setAttribute('aria-label', 'Ver mi pedido');
    document.body.appendChild(bar);

    // ---- panel de la comanda ----
    var panel = document.createElement('div');
    panel.className = 'modal modal--pedido'; panel.id = 'modal-pedido';
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-labelledby', 'pedido-titulo');
    panel.innerHTML =
      '<div class="modal__box modal__box--pedido">' +
        '<div class="modal__head">' +
          '<div><span class="eyebrow">Tu pedido</span>' +
            '<h2 class="h-sub" id="pedido-titulo" style="margin-top:6px">La comanda</h2></div>' +
          '<button class="modal__close" data-cerrar-pedido aria-label="Cerrar">×</button>' +
        '</div>' +
        '<div class="pedido__lineas" id="pedido-lineas"></div>' +
        '<div class="pedido__total"><span>Total</span><b id="pedido-total"></b></div>' +
        '<div class="pedido__form">' +
          '<div class="pedido__opciones">' +
            '<span class="pedido__lbl">¿Cómo lo querés?</span>' +
            '<div class="seg-group" id="ped-modo">' +
              '<button type="button" class="seg is-active" data-modo="Delivery">Delivery</button>' +
              '<button type="button" class="seg" data-modo="Retiro">Take away</button>' +
            '</div>' +
          '</div>' +
          '<div class="field"><label for="ped-nombre">Nombre</label>' +
            '<input id="ped-nombre" type="text" autocomplete="name" placeholder="Tu nombre"></div>' +
          '<div class="field"><label for="ped-tel">Teléfono</label>' +
            '<input id="ped-tel" type="tel" autocomplete="tel" placeholder="Por si hay que coordinar"></div>' +
          '<div class="field" id="ped-field-dir"><label for="ped-dir">Dirección de entrega</label>' +
            '<input id="ped-dir" type="text" autocomplete="street-address" placeholder="Calle, número, piso, entrecalles"></div>' +
          '<p class="pedido__retiro" id="ped-retiro" hidden>Retirás en <b>' + esc(N.direccion || '') + '</b>. Te avisamos por WhatsApp cuando esté listo.</p>' +
          '<div class="pedido__opciones">' +
            '<span class="pedido__lbl">¿Cómo pagás?</span>' +
            '<div class="seg-group" id="ped-pago">' +
              '<button type="button" class="seg is-active" data-pago="Efectivo">Efectivo</button>' +
              '<button type="button" class="seg" data-pago="Mercado Pago">Mercado Pago</button>' +
            '</div>' +
            '<p class="pedido__pago-nota">El pago lo coordinás por WhatsApp al confirmar el pedido. No se cobra online.</p>' +
          '</div>' +
          '<div class="field"><label for="ped-notas">Indicaciones</label>' +
            '<textarea id="ped-notas" rows="2" placeholder="Punto de cocción, timbre, sin sal… (opcional)"></textarea></div>' +
        '</div>' +
        '<p class="pedido__aviso" id="pedido-aviso" hidden></p>' +
        '<button class="btn btn-wa btn-block" id="pedido-enviar"><span class="wa-ico"></span>Enviar pedido por WhatsApp</button>' +
        '<button class="pedido__vaciar" type="button" data-vaciar>Vaciar pedido</button>' +
        '<p class="modal__note">En la demo, enviar abre WhatsApp con el pedido ya escrito. En la versión ' +
          'contratada, el pedido entra solo al panel del restaurante.</p>' +
      '</div>';
    document.body.appendChild(panel);

    var lineasEl = $('#pedido-lineas', panel);
    var totalEl = $('#pedido-total', panel);
    var enviarEl = $('#pedido-enviar', panel);
    var avisoEl = $('#pedido-aviso', panel);
    pintarIconosWa(panel);

    // ---- toast ----
    var toastEl = document.createElement('div');
    toastEl.className = 'pedido-toast';
    toastEl.setAttribute('role', 'status'); toastEl.setAttribute('aria-live', 'polite');
    document.body.appendChild(toastEl);
    var toastTimer;
    function toast(txt) {
      toastEl.textContent = txt; toastEl.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 1800);
    }

    function pintar() {
      var n = cantidad(), t = total();
      if (n > 0) {
        bar.innerHTML = '<span class="pedido-bar__txt"><b>Ver mi pedido</b>' +
          '<span>' + n + (n === 1 ? ' plato' : ' platos') + ' · ' + money(t) + '</span></span>' +
          '<span class="chev">›</span>';
        document.body.classList.add('has-pedido');
      } else {
        document.body.classList.remove('has-pedido');
      }
      if (!n) {
        lineasEl.innerHTML = '<p class="pedido__vacio">Todavía no sumaste nada. ' +
          'Tocá <b>Pedir</b> en cualquier plato de la carta.</p>';
      } else {
        lineasEl.innerHTML = items.map(function (l) {
          var reg = PLATOS[l.key]; if (!reg) return '';
          var it = reg.it;
          return '<div class="pedido__linea">' +
            '<div class="pedido__linea-info"><b>' + esc(it.nombre) + '</b>' +
              '<span>' + money(it.precio) + ' c/u</span></div>' +
            '<div class="pedido__qty">' +
              '<button type="button" data-menos="' + esc(l.key) + '" aria-label="Restar uno">–</button>' +
              '<span>' + l.qty + '</span>' +
              '<button type="button" data-mas="' + esc(l.key) + '" aria-label="Sumar uno">+</button>' +
            '</div>' +
            '<div class="pedido__linea-sub">' + money(it.precio * l.qty) + '</div>' +
            '<button class="pedido__quitar" type="button" data-quitar="' + esc(l.key) + '" aria-label="Quitar del pedido">×</button>' +
          '</div>';
        }).join('');
      }
      totalEl.textContent = money(t);
      enviarEl.disabled = !n;
    }

    function abrirPanel() { panel.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function cerrarPanel() { panel.classList.remove('open'); document.body.style.overflow = ''; }

    bar.addEventListener('click', abrirPanel);

    // Delivery / Retiro: cambia si se pide la dirección o no.
    function aplicarModo(modo) {
      var retiro = modo === 'Retiro';
      $('#ped-field-dir', panel).hidden = retiro;
      $('#ped-retiro', panel).hidden = !retiro;
    }

    document.addEventListener('click', function (e) {
      // "Pedir" en la carta: suma y avisa, sin abrir la comanda (se sigue mirando).
      var add = e.target.closest('[data-add]');
      if (add) { sumar(add.getAttribute('data-add'), 1); toast('Sumado a tu pedido ✓'); return; }
      // "Agregar al pedido" en la ficha: suma, avisa y cierra la ficha para ver la barra.
      var addClose = e.target.closest('[data-add-close]');
      if (addClose) { sumar(addClose.getAttribute('data-add-close'), 1); toast('Sumado a tu pedido ✓'); closeInfo(); return; }
      // segmentos (modo de entrega / método de pago)
      var seg = e.target.closest('.seg');
      if (seg && panel.contains(seg)) {
        $$('.seg', seg.parentElement).forEach(function (x) { x.classList.remove('is-active'); x.setAttribute('aria-pressed', 'false'); });
        seg.classList.add('is-active'); seg.setAttribute('aria-pressed', 'true');
        if (seg.hasAttribute('data-modo')) aplicarModo(seg.getAttribute('data-modo'));
        return;
      }
      if (e.target.closest('[data-cerrar-pedido]') || e.target === panel) { cerrarPanel(); return; }
      if (e.target.closest('[data-vaciar]')) { vaciar(); return; }
      var mas = e.target.closest('[data-mas]'); if (mas) { sumar(mas.getAttribute('data-mas'), 1); return; }
      var menos = e.target.closest('[data-menos]'); if (menos) { sumar(menos.getAttribute('data-menos'), -1); return; }
      var quit = e.target.closest('[data-quitar]'); if (quit) { quitar(quit.getAttribute('data-quitar')); return; }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('open')) cerrarPanel();
    });

    function segVal(id, attr) { var a = $('#' + id + ' .seg.is-active', panel); return a ? a.getAttribute(attr) : ''; }

    enviarEl.addEventListener('click', function () {
      if (!cantidad()) return;
      var modo = segVal('ped-modo', 'data-modo') || 'Delivery';
      var pago = segVal('ped-pago', 'data-pago') || 'Efectivo';
      var esDelivery = modo === 'Delivery';
      var nombre = $('#ped-nombre', panel).value.trim();
      var tel = $('#ped-tel', panel).value.trim();
      var dir = $('#ped-dir', panel).value.trim();
      var notas = $('#ped-notas', panel).value.trim();
      if (!nombre || !tel || (esDelivery && !dir)) {
        avisoEl.textContent = esDelivery
          ? 'Completá nombre, teléfono y dirección para enviar el pedido.'
          : 'Completá nombre y teléfono para enviar el pedido.';
        avisoEl.hidden = false;
        return;
      }
      avisoEl.hidden = true;
      var lineas = items.map(function (l) {
        var it = PLATOS[l.key].it;
        return '• ' + l.qty + '× ' + it.nombre + ' — ' + money(it.precio * l.qty);
      }).join('\n');
      var msg = 'Quiero hacer un pedido (' + (esDelivery ? 'Delivery' : 'Take away — retiro en el local') + '):\n\n' + lineas +
        '\n\nTotal: ' + money(total()) +
        '\nPago: ' + pago +
        '\n\nNombre: ' + nombre +
        '\nTeléfono: ' + tel +
        (esDelivery ? '\nDirección: ' + dir : '') +
        (notas ? '\nIndicaciones: ' + notas : '');
      window.open(waLink(msg), '_blank', 'noopener');
    });

    pintar();   // estado inicial (puede venir de sessionStorage)
  }

  function renderFiltros() {
    var filtros = $('#carta-filtros');
    if (!filtros || !N.categorias) return;
    filtros.innerHTML = N.categorias.map(function (c, i) {
      return '<button class="filter' + (i === 0 ? ' active' : '') + '" data-filter="' + c.id +
             '" aria-pressed="' + (i === 0) + '">' + esc(c.label) + '</button>';
    }).join('');

    var cats = $$('.menu__cat', $('#carta-menu'));
    $$('.filter', filtros).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.filter', filtros).forEach(function (x) {
          x.classList.remove('active'); x.setAttribute('aria-pressed', 'false');
        });
        b.classList.add('active'); b.setAttribute('aria-pressed', 'true');
        var f = b.getAttribute('data-filter');
        cats.forEach(function (c) {
          c.style.display = (f === 'todos' || c.getAttribute('data-cat') === f) ? '' : 'none';
        });
      });
    });
  }

  // ------------------------------------------------------------
  // Equipo, reseñas, stats
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

  function faq() {
    $$('.faq__item').forEach(function (item) {
      var q = $('.faq__q', item), a = $('.faq__a', item);
      if (q.dataset.listo) return;
      q.dataset.listo = '1';
      q.addEventListener('click', function () {
        var open = item.classList.toggle('open');
        q.setAttribute('aria-expanded', open ? 'true' : 'false');
        a.style.height = open ? a.scrollHeight + 'px' : '0px';
      });
    });
  }

  // ------------------------------------------------------------
  // Reserva de mesa — MUESTRA: no guarda nada, termina en WhatsApp
  // ------------------------------------------------------------
  function reservas() {
    var modal = $('#modal-reserva');
    if (!modal) return;

    var elPersonas = $('#reserva-personas');
    var elFecha = $('#reserva-fecha');
    var elSlots = $('#reserva-slots');
    var elConfirm = $('#reserva-confirmar');
    var elegido = null;

    // próximos 14 días de servicio (cierra los lunes)
    if (elFecha) {
      var opts = [], d = new Date(), n = 0;
      while (opts.length < 14 && n < 40) {
        d.setDate(d.getDate() + 1); n++;
        if (d.getDay() === 1) continue; // lunes cerrado
        var f = d.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
        opts.push('<option value="' + f + '">' + f.charAt(0).toUpperCase() + f.slice(1) + '</option>');
      }
      elFecha.innerHTML = opts.join('');
    }

    function pintarSlots() {
      if (!elSlots) return;
      var horas = ['20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00'];
      // ocupados de muestra: estables por fecha, no aleatorios en cada click
      var semilla = (elFecha && elFecha.selectedIndex || 0) + 3;
      elegido = null;
      if (elConfirm) elConfirm.setAttribute('disabled', 'disabled');
      elSlots.innerHTML = horas.map(function (h, i) {
        var taken = ((i * 7 + semilla * 5) % 11) < 4;
        return '<button class="slot' + (taken ? ' taken' : '') + '"' + (taken ? ' disabled' : '') +
               ' data-hora="' + h + '">' + h + '</button>';
      }).join('');
      $$('.slot:not(.taken)', elSlots).forEach(function (b) {
        b.addEventListener('click', function () {
          $$('.slot', elSlots).forEach(function (x) { x.classList.remove('active'); });
          b.classList.add('active');
          elegido = b.getAttribute('data-hora');
          if (elConfirm) elConfirm.removeAttribute('disabled');
        });
      });
    }
    pintarSlots();
    if (elFecha) elFecha.addEventListener('change', pintarSlots);

    function abrir() {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function cerrar() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-reserva]');
      if (t) { e.preventDefault(); abrir(); }
      if (e.target.closest('[data-cerrar]') || e.target === modal) cerrar();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) cerrar();
    });

    if (elConfirm) {
      elConfirm.addEventListener('click', function () {
        var msg = 'Quiero reservar una mesa para ' + (elPersonas ? elPersonas.value : '') +
                  ' el ' + (elFecha ? elFecha.value : '') + ' a las ' + (elegido || '') + '.';
        window.open(waLink(msg), '_blank', 'noopener');
        cerrar();
      });
    }
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
  // Formas de pago y preguntas frecuentes generales
  // ------------------------------------------------------------
  function renderFormasPago() {
    var g = $('#formas-grid');
    if (!g || !N.formasPago) return;
    g.innerHTML = N.formasPago.map(function (o, i) {
      return '<div class="obra" data-reveal data-delay="' + ((i % 3) * 60) + '">' +
        '<b>' + esc(o.nombre) + '</b><span>' + esc(o.detalle) + '</span></div>';
    }).join('');
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
              '<rect x="1" y="1" width="32" height="32" rx="7" stroke="#E9A085" stroke-width="1.6"/>' +
              '<path d="M13 10l7 7-7 7" stroke="#E9A085" stroke-width="2.6" stroke-linecap="square"/></svg>' +
            '<span class="brand__name">Rescoldo<span>Parrilla</span></span></a>' +
          '<p class="footer__tagline">Parrilla a fuego de leña en el corazón de ' + esc(N.ciudad) + '. ' +
            'Cortes de campo, pastas caseras y vinos de la región.</p>' +
          '<div class="redes">' +
            (r.instagram ? '<a href="' + r.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + ICO_IG + '</a>' : '') +
            (r.facebook ? '<a href="' + r.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + ICO_FB + '</a>' : '') +
            '<a class="red-wa" href="' + wa + '" target="_blank" rel="noopener" aria-label="WhatsApp"><span class="wa-ico"></span></a>' +
            '<a href="mailto:' + esc(N.email) + '" aria-label="Email">' + ICO_MAIL + '</a>' +
          '</div>' +
        '</div>' +

        '<div><h4>El restaurante</h4><ul>' +
          '<li><a href="nosotros.html">Quiénes somos</a></li>' +
          '<li><a href="equipo.html">Nuestro equipo</a></li>' +
          '<li><a href="carta.html">La carta</a></li>' +
          '<li><a href="reservas.html">Reservar mesa</a></li>' +
        '</ul></div>' +

        '<div><h4>Comensales</h4><ul>' +
          '<li><a href="formas-pago.html">Formas de pago</a></li>' +
          '<li><a href="preguntas.html">Preguntas frecuentes</a></li>' +
          '<li><a href="reservas.html">Reservas online</a></li>' +
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
    mapa();            // va después de pintarDatos: usa la dirección ya escrita
    indexCarta();      // estampa __key en cada plato: lo usan los renders y el modal
    renderDestacados();
    renderCartaMenu();
    renderFiltros();
    platoModal();
    pedido();
    renderEquipo();
    renderResenas();
    renderStats();
    renderFormasPago();
    renderFaqGeneral();
    pintarIconosWa();
    buildWaLinks();
    imgFallback();
    header();
    mobileNav();
    waFloat();
    splitTitle();
    reveal();
    counters();
    reservas();
    smooth();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
