/* ============================================================
   Panel de muestra — Ribera Odontología · Sistemas Umbral
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
    { dia: 'Lun', n: 128 }, { dia: 'Mar', n: 164 }, { dia: 'Mié', n: 141 },
    { dia: 'Jue', n: 189 }, { dia: 'Vie', n: 232 }, { dia: 'Sáb', n: 97 }, { dia: 'Dom', n: 54 }
  ];

  var MAS_VISTOS = [
    { nombre: 'Implantes dentales', n: 312 },
    { nombre: 'Ortodoncia invisible', n: 268 },
    { nombre: 'Chequeo y limpieza', n: 201 },
    { nombre: 'Estética dental', n: 154 },
    { nombre: 'Urgencias', n: 96 }
  ];

  var CONSULTAS = [
    { nombre: 'Micaela Ríos', tel: '+54 9 345 415-2210', mirando: 'Ortodoncia invisible', hace: 'hace 12 min', estado: 'new', texto: 'Hola, quería saber si los alineadores se pueden pagar en cuotas.' },
    { nombre: 'Hernán Costa', tel: '+54 9 345 466-0184', mirando: 'Implantes dentales', hace: 'hace 1 h', estado: 'new', texto: 'Perdí una muela hace dos años. ¿Sirvo para implante?' },
    { nombre: 'Lucía Benítez', tel: '+54 9 345 401-7752', mirando: 'Urgencias', hace: 'hace 3 h', estado: 'wait', texto: 'Me duele mucho una muela desde anoche. ¿Tienen lugar hoy?' },
    { nombre: 'Rodrigo Sena', tel: '+54 9 345 488-3391', mirando: 'Chequeo y limpieza', hace: 'ayer', estado: 'done', texto: '¿Atienden los sábados a la mañana?' },
    { nombre: 'Paula Andrada', tel: '+54 9 345 412-9067', mirando: 'Estética dental', hace: 'ayer', estado: 'done', texto: 'Quería consultar por el blanqueamiento y cuánto dura.' }
  ];

  var AGENDA = [
    { hora: '08:30', paciente: 'Marta Giménez', trat: 'Control de ortodoncia' },
    { hora: '09:15', paciente: null },
    { hora: '10:00', paciente: 'Juan Ledesma', trat: 'Limpieza' },
    { hora: '10:45', paciente: 'Ana Suárez', trat: 'Colocación de corona' },
    { hora: '11:30', paciente: null },
    { hora: '14:00', paciente: 'Familia Ortiz (2)', trat: 'Chequeo' },
    { hora: '14:45', paciente: 'Reservado urgencias', trat: 'Turno guardado' },
    { hora: '15:30', paciente: 'Diego Almirón', trat: 'Implante · 2da sesión' }
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
  // Contenido editable (los cambios no se guardan: es una maqueta)
  // ------------------------------------------------------------
  function contenido() {
    var box = $('#lista-contenido');
    if (!box || !N.servicios) return;
    box.innerHTML = N.servicios.map(function (s, i) {
      return '<div class="edit-row">' +
        '<input value="' + esc(s.nombre) + '" aria-label="Nombre del tratamiento">' +
        '<input value="' + s.precio.toLocaleString('es-AR') + '" aria-label="Precio">' +
        '<input value="' + esc(s.duracion) + '" aria-label="Duración">' +
        '<button class="switch' + (i < 5 ? ' on' : '') + '" role="switch" aria-checked="' + (i < 5) +
        '" aria-label="Mostrar en la web"></button>' +
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
  // Agenda del día
  // ------------------------------------------------------------
  function agenda() {
    var box = $('#agenda-hoy');
    if (!box) return;
    box.innerHTML = AGENDA.map(function (a) {
      if (!a.paciente) {
        return '<div class="slot-row libre"><time>' + a.hora + '</time>' +
               '<span>Libre</span><span style="font-size:.84rem">Se puede reservar</span></div>';
      }
      return '<div class="slot-row"><time>' + a.hora + '</time>' +
             '<span><b>' + esc(a.paciente) + '</b><small style="display:block;color:var(--fog);font-size:.84rem">' +
             esc(a.trat) + '</small></span>' +
             '<span class="badge badge--new">Confirmado</span></div>';
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
