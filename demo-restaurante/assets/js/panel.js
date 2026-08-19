/* ============================================================
   Panel de muestra — Rescoldo · Sistemas Umbral
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
    { dia: 'Lun', n: 42 }, { dia: 'Mar', n: 96 }, { dia: 'Mié', n: 118 },
    { dia: 'Jue', n: 174 }, { dia: 'Vie', n: 268 }, { dia: 'Sáb', n: 291 }, { dia: 'Dom', n: 203 }
  ];

  var MAS_VISTOS = [
    { nombre: 'Bife de chorizo de campo', n: 344 },
    { nombre: 'Asado de tira', n: 287 },
    { nombre: 'Provoleta a la llama', n: 219 },
    { nombre: 'Sorrentinos de osobuco', n: 141 },
    { nombre: 'Carta de vinos', n: 108 }
  ];

  var CONSULTAS = [
    { nombre: 'Gabriela Sosa', tel: '+54 9 345 415-2210', mirando: 'Reserva · sábado', hace: 'hace 8 min', estado: 'new', texto: 'Hola, ¿tienen mesa para 6 el sábado a las 21:30?' },
    { nombre: 'Empresa Del Litoral', tel: '+54 9 345 466-0184', mirando: 'Evento de empresa', hace: 'hace 40 min', estado: 'new', texto: 'Somos 22 personas para fin de año. ¿Arman menú cerrado?' },
    { nombre: 'Marcos Pérez', tel: '+54 9 345 401-7752', mirando: 'Sin TACC', hace: 'hace 2 h', estado: 'wait', texto: 'Mi señora es celíaca. ¿Pueden preparar todo aparte?' },
    { nombre: 'Julieta Franco', tel: '+54 9 345 488-3391', mirando: 'Para llevar', hace: 'ayer', estado: 'done', texto: '¿Hacen delivery de asado de tira al centro?' },
    { nombre: 'Diego Almada', tel: '+54 9 345 412-9067', mirando: 'Reserva · viernes', hace: 'ayer', estado: 'done', texto: 'Mesa para 2 el viernes, si se puede cerca de la ventana.' }
  ];

  var AGENDA = [
    { hora: '20:00', cliente: 'Familia Ortiz', detalle: 'Mesa 4 · 5 personas' },
    { hora: '20:30', cliente: null },
    { hora: '21:00', cliente: 'Gabriela Sosa', detalle: 'Mesa 9 · 6 personas' },
    { hora: '21:00', cliente: 'Aniversario Bianchi', detalle: 'Salón privado · 2 personas' },
    { hora: '21:30', cliente: null },
    { hora: '22:00', cliente: 'Grupo Del Litoral', detalle: 'Salón privado · 22 personas' },
    { hora: '22:30', cliente: 'Marcos y Ana', detalle: 'Mesa 2 · sin TACC' },
    { hora: '23:00', cliente: null }
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
  // Contenido editable — la CARTA (los cambios no se guardan: es maqueta)
  // ------------------------------------------------------------
  function contenido() {
    var box = $('#lista-contenido');
    if (!box || !N.carta) return;
    // aplano la carta a una lista de platos con su categoría
    var platos = [];
    N.carta.forEach(function (cat) {
      (cat.items || []).forEach(function (it) {
        platos.push({ nombre: it.nombre, precio: it.precio, cat: cat.label });
      });
    });
    box.innerHTML = platos.map(function (p, i) {
      return '<div class="edit-row">' +
        '<input value="' + esc(p.nombre) + '" aria-label="Nombre del plato">' +
        '<input value="' + p.precio.toLocaleString('es-AR') + '" aria-label="Precio">' +
        '<input value="' + esc(p.cat) + '" aria-label="Categoría">' +
        '<button class="switch on" role="switch" aria-checked="true" aria-label="Mostrar en la carta"></button>' +
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
  // Reservas del día
  // ------------------------------------------------------------
  function agenda() {
    var box = $('#agenda-hoy');
    if (!box) return;
    box.innerHTML = AGENDA.map(function (a) {
      if (!a.cliente) {
        return '<div class="slot-row libre"><time>' + a.hora + '</time>' +
               '<span>Libre</span><span style="font-size:.84rem">Se puede reservar</span></div>';
      }
      return '<div class="slot-row"><time>' + a.hora + '</time>' +
             '<span><b>' + esc(a.cliente) + '</b><small style="display:block;color:var(--fog);font-size:.84rem">' +
             esc(a.detalle) + '</small></span>' +
             '<span class="badge badge--new">Confirmada</span></div>';
    }).join('');
  }

  // ------------------------------------------------------------
  function init() {
    nav(); chart(); ranking(); consultas(); contenido(); agenda();
    var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
