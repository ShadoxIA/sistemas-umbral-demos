/* ============================================================
   Panel de muestra — Litoral Automotores · Sistemas Umbral
   Todos los datos son inventados y viven acá. No hay backend:
   el panel real (con base de datos) se construye al contratar.
   ============================================================ */
(function () {
  'use strict';

  var N = window.NEGOCIO || {};
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[<>&"]/g, function (c) {
    return ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c]; }); }

  // ------------------------------------------------------------
  // Datos de muestra
  // ------------------------------------------------------------
  var VISITAS = [
    { dia: 'Lun', n: 214 }, { dia: 'Mar', n: 288 }, { dia: 'Mié', n: 331 },
    { dia: 'Jue', n: 402 }, { dia: 'Vie', n: 468 }, { dia: 'Sáb', n: 521 }, { dia: 'Dom', n: 294 }
  ];

  var MAS_VISTOS = [
    { nombre: 'RAM 1500 Laramie', n: 512 },
    { nombre: 'Toyota RAV4 Hybrid', n: 431 },
    { nombre: 'Toyota Hilux SRX 4x4', n: 388 },
    { nombre: 'BMW Serie 5 530i', n: 246 },
    { nombre: 'Hyundai i30', n: 173 }
  ];

  var CONSULTAS = [
    { nombre: 'Gabriel Sosa', tel: '+54 9 342 415-2210', mirando: 'RAM 1500 Laramie', hace: 'hace 6 min', estado: 'new', texto: 'Hola, ¿la RAM está disponible? Entrego una Hilux 2019 en parte de pago.' },
    { nombre: 'Flota Del Litoral SRL', tel: '+54 9 342 466-0184', mirando: 'Cotizador · financiación', hace: 'hace 35 min', estado: 'new', texto: 'Necesitamos 3 utilitarios financiados a 48 cuotas. ¿Trabajan con empresas?' },
    { nombre: 'Marcos Pérez', tel: '+54 9 342 401-7752', mirando: 'Toyota RAV4 Hybrid', hace: 'hace 2 h', estado: 'wait', texto: 'Vi la RAV4 híbrida. ¿Me pasás el detalle de la cuota financiando el 100%?' },
    { nombre: 'Julieta Franco', tel: '+54 9 342 488-3391', mirando: 'Cotizador · permuta', hace: 'ayer', estado: 'done', texto: 'Cotizé mi Corolla 2020 por la Compass. Me dio un saldo bárbaro, ¿lo cerramos?' },
    { nombre: 'Diego Almada', tel: '+54 9 342 412-9067', mirando: 'BMW Serie 5 530i', hace: 'ayer', estado: 'done', texto: '¿El BMW tiene los services en oficial? Quiero coordinar un test drive.' }
  ];

  // ------------------------------------------------------------
  // Navegación entre pantallas
  // ------------------------------------------------------------
  function nav() {
    $$('.side nav button').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.side nav button').forEach(function (x) { x.classList.remove('active'); });
        $$('.view').forEach(function (v) { v.classList.remove('active'); });
        b.classList.add('active');
        var v = $('#view-' + b.getAttribute('data-view'));
        if (v) v.classList.add('active');
        var h = $('#head-titulo'), p = $('#head-sub');
        if (h) h.textContent = b.getAttribute('data-titulo');
        if (p) p.textContent = b.getAttribute('data-sub');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  // ------------------------------------------------------------
  // Gráfico de barras en SVG (sin librerías)
  // ------------------------------------------------------------
  function chart() {
    var svg = $('#chart-visitas');
    if (!svg) return;
    var W = 720, H = 220, padB = 30, padT = 16, padL = 34;
    var max = Math.max.apply(null, VISITAS.map(function (v) { return v.n; }));
    var step = (W - padL) / VISITAS.length;
    var bw = Math.min(48, step * .52);
    var parts = [];

    [0, .5, 1].forEach(function (f) {
      var y = padT + (H - padT - padB) * (1 - f);
      parts.push('<line class="grid-line" x1="' + padL + '" y1="' + y + '" x2="' + W + '" y2="' + y + '"/>');
      parts.push('<text x="0" y="' + (y + 4) + '">' + Math.round(max * f) + '</text>');
    });

    VISITAS.forEach(function (v, i) {
      var h = (H - padT - padB) * (v.n / max);
      var x = padL + i * step + (step - bw) / 2;
      var y = H - padB - h;
      parts.push('<rect class="bar" x="' + x + '" y="' + y + '" width="' + bw + '" height="' + h +
                 '" rx="3"><title>' + v.dia + ': ' + v.n + ' visitas</title></rect>');
      parts.push('<text x="' + (x + bw / 2) + '" y="' + (H - 10) + '" text-anchor="middle">' + v.dia + '</text>');
    });

    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.innerHTML = parts.join('');
  }

  // ------------------------------------------------------------
  // Ranking de lo más mirado
  // ------------------------------------------------------------
  function ranking() {
    var ul = $('#rank-vistos');
    if (!ul) return;
    var max = MAS_VISTOS[0].n;
    ul.innerHTML = MAS_VISTOS.map(function (r) {
      return '<li><div class="rank__top"><b>' + esc(r.nombre) + '</b><span>' + r.n + ' visitas</span></div>' +
             '<div class="rank__bar"><i style="width:' + Math.round(r.n / max * 100) + '%"></i></div></li>';
    }).join('');
  }

  // ------------------------------------------------------------
  // Consultas de WhatsApp
  // ------------------------------------------------------------
  function consultas() {
    var tb = $('#tbl-consultas');
    if (!tb) return;
    var wa = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.53 15.23L2 22l4.9-1.28A10 10 0 1 0 12 2z"/></svg>';
    var etq = { new: ['badge--new', 'Sin responder'], wait: ['badge--wait', 'Esperando'], done: ['badge--done', 'Respondida'] };
    tb.innerHTML = CONSULTAS.map(function (c) {
      var e = etq[c.estado];
      return '<tr>' +
        '<td><b>' + esc(c.nombre) + '</b><small>' + esc(c.tel) + '</small></td>' +
        '<td>' + esc(c.mirando) + '<small>' + esc(c.hace) + '</small></td>' +
        '<td style="max-width:280px">' + esc(c.texto) + '</td>' +
        '<td><span class="badge ' + e[0] + '">' + e[1] + '</span></td>' +
        '<td><a class="wa-mini" href="https://wa.me/' + N.whatsapp + '" target="_blank" rel="noopener">' + wa + 'Responder</a></td>' +
      '</tr>';
    }).join('');
  }

  // ------------------------------------------------------------
  // Contenido editable — el STOCK (los cambios no se guardan: es maqueta)
  // ------------------------------------------------------------
  function contenido() {
    var box = $('#lista-contenido');
    if (!box || !N.catalogo) return;
    box.innerHTML = N.catalogo.map(function (a) {
      return '<div class="edit-row">' +
        '<input value="' + esc(a.marca + ' ' + a.modelo + ' ' + a.version) + '" aria-label="Vehículo">' +
        '<input value="' + a.precio.toLocaleString('es-AR') + '" aria-label="Precio">' +
        '<input value="' + (a.condicion === '0km' ? '0 km' : 'Usado') + '" aria-label="Condición">' +
        '<button class="switch on" role="switch" aria-checked="true" aria-label="Publicar en la web"></button>' +
      '</div>';
    }).join('');

    $$('.switch', box).forEach(function (sw) {
      sw.addEventListener('click', function () {
        var on = sw.classList.toggle('on');
        sw.setAttribute('aria-checked', on ? 'true' : 'false');
        aviso();
      });
    });
    $$('input', box).forEach(function (inp) { inp.addEventListener('change', aviso); });
  }

  var avisoTimer = null;
  function aviso() {
    var el = $('#guardado');
    if (!el) return;
    el.textContent = 'Cambio registrado (en la demo no se guarda)';
    el.style.opacity = '1';
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(function () { el.style.opacity = '0'; }, 2600);
  }

  // ------------------------------------------------------------
  function init() {
    nav(); chart(); ranking(); consultas(); contenido();
    var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
