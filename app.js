(() => {
  'use strict';

  // ---------- Config ----------
  const PRICE = 3800, HOME_SUP = 350, MAX_QTY = 10;
  const WA_NUM = '213556011290';
  const EMAIL = 'dazaiosa2000@gmail.com';
  const PRODUCT = 'WAGMI — Rengoku Special Drop Hoodie';
  // Set to true to start with Stop Desk selected (size is never preselected).
  const PRESELECT_STOP_DESK = false;
  const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

  const WILAYAS = ['Adrar','Chlef','Laghouat','Oum El Bouaghi','Batna','Béjaïa','Biskra','Béchar','Blida','Bouira','Tamanrasset','Tébessa','Tlemcen','Tiaret','Tizi Ouzou','Alger','Djelfa','Jijel','Sétif','Saïda','Skikda','Sidi Bel Abbès','Annaba','Guelma','Constantine','Médéa','Mostaganem',"M'Sila",'Mascara','Ouargla','Oran','El Bayadh','Illizi','Bordj Bou Arréridj','Boumerdès','El Tarf','Tindouf','Tissemsilt','El Oued','Khenchela','Souk Ahras','Tipaza','Mila','Aïn Defla','Naâma','Aïn Témouchent','Ghardaïa','Relizane','Timimoun','Bordj Badji Mokhtar','Ouled Djellal','Béni Abbès','In Salah','In Guezzam','Touggourt','Djanet',"El M'Ghair",'El Meniaa','Aflou','Barika','El Kantara','Bir El Ater','El Aricha','Ksar Chellala','Aïn Oussera','Messaad','Ksar El Boukhari','Bou Saâda','El Abiodh Sidi Cheikh'];
  // Confirmed Stop Desk rates by wilaya number. Missing = to be confirmed (46, 59–69).
  const RATES = {1:1100,2:450,3:700,4:500,5:500,6:500,7:600,8:1100,9:450,10:450,11:1400,12:600,13:500,14:500,15:450,16:450,17:600,18:500,19:400,20:600,21:500,22:500,23:500,24:600,25:450,26:450,27:500,28:500,29:600,30:800,31:450,32:800,33:1700,34:450,35:450,36:600,37:1400,38:500,39:800,40:600,41:600,42:450,43:500,44:450,45:800,47:800,48:500,49:1100,50:1700,51:700,52:1100,53:1100,54:1700,55:800,56:1700,57:800,58:1000};

  const ALL = [
    { src: 'assets/wagmi-worn-back.jpg', name: 'WORN', alt: 'Model wearing the hoodie, back view', desc: 'The back artwork and sleeve dragons, worn.', kind: 'photo', ratio: '1121/1403' },
    { src: 'assets/cut-back.png', name: 'BACK', alt: 'Hoodie back view', desc: 'Full back: dragon composition with purple lightning, gold flame and cyan clouds, plus both sleeve dragons.', kind: 'cut', ratio: '975/1300' },
    { src: 'assets/cut-front.png', name: 'FRONT', alt: 'Hoodie front view', desc: 'Dragon emblem with kanji on the chest, kangaroo pocket, sleeve artwork on both arms.', kind: 'cut', ratio: '960/1280' },
    { src: 'assets/cut-sleeve.png', name: 'SLEEVE', alt: 'Sleeve artwork close-up', desc: 'Close-up of the sleeve: a dragon coiled around a blade, with the emblem at the shoulder.', kind: 'cut', ratio: '975/1300' },
    { src: 'assets/wagmi-art-back.jpg', name: 'BACK ARTWORK', alt: 'Back artwork', desc: '', kind: 'art', ratio: '3/4' },
    { src: 'assets/wagmi-art-sleeve.jpg', name: 'SLEEVE ARTWORK', alt: 'Sleeve artwork', desc: '', kind: 'art', ratio: '3/4' }
  ];
  const GN = 4; // first four images are in the main gallery; all six in the lightbox

  const fmt = n => n.toLocaleString('en-US') + ' DA';
  const code2 = i => String(i).padStart(2, '0');
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const el = (tag, attrs = {}, kids = []) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else if (k === 'style') Object.assign(n.style, v);
      else n.setAttribute(k, v);
    }
    kids.forEach(c => n.append(c));
    return n;
  };

  // ---------- Atmosphere: embers + lightning ----------
  function makeEmbers(host) {
    const count = +host.dataset.embers;
    let s = +host.dataset.seed;
    const r = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    for (let i = 0; i < count; i++) {
      const sz = 2 + Math.round(r() * 3);
      const cyan = i % 4 === 0;
      host.append(el('span', { class: 'ember', style: {
        left: `${(r() * 100).toFixed(1)}%`, bottom: `${(-5 + r() * 25).toFixed(1)}%`,
        width: `${sz}px`, height: `${sz}px`,
        background: cyan ? '#c9f6ff' : i % 3 ? '#f2a926' : '#ffe066',
        boxShadow: cyan ? '0 0 8px 2px rgba(127,208,255,.6)' : '0 0 8px 2px rgba(255,214,90,.55)',
        animation: `wEmber ${(7 + r() * 8).toFixed(1)}s linear ${(-r() * 14).toFixed(1)}s infinite`
      } }));
    }
  }

  const BOLT_A = '62,0 38,92 60,98 26,190 52,196 14,300';
  const BOLT_B = '40,0 64,80 42,88 72,172 46,180 80,300';
  const BOLTS = {
    hero: [
      [BOLT_A, { left: '8%', top: '4%', width: '20%', height: '58%' }, 4.2, 1.4],
      [BOLT_B, { right: '10%', top: '34%', width: '16%', height: '52%' }, 5.6, 3.2]
    ],
    spirit: [
      ['55,0 30,100 58,108 20,210 50,216 10,300', { left: '2%', top: '6%', width: '14%', height: '70%' }, 6.4, 2.2]
    ],
    cta: [
      [BOLT_A, { left: '6%', top: '0%', width: '14%', height: '80%' }, 4.8, 0.8],
      [BOLT_B, { right: '6%', top: '10%', width: '12%', height: '75%' }, 5.9, 2.6]
    ]
  };
  function makeBolts(host) {
    const NS = 'http://www.w3.org/2000/svg';
    BOLTS[host.dataset.bolts].forEach(([pts, pos, dur, delay]) => {
      const svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('viewBox', '0 0 100 300');
      svg.setAttribute('preserveAspectRatio', 'none');
      svg.setAttribute('class', 'bolt');
      Object.assign(svg.style, pos, { animation: `wBolt ${dur}s linear ${delay}s infinite` });
      [['#ffe066', 3], ['#fffbe6', 1.2]].forEach(([stroke, w]) => {
        const pl = document.createElementNS(NS, 'polyline');
        pl.setAttribute('points', pts);
        pl.setAttribute('fill', 'none');
        pl.setAttribute('stroke', stroke);
        pl.setAttribute('stroke-width', w);
        pl.setAttribute('stroke-linejoin', 'miter');
        pl.setAttribute('vector-effect', 'non-scaling-stroke');
        svg.append(pl);
      });
      host.append(svg);
    });
  }
  $$('[data-embers]').forEach(makeEmbers);
  $$('[data-bolts]').forEach(makeBolts);

  // ---------- Smooth scroll ----------
  const scrollToEl = (node, off = 80) => {
    if (node) window.scrollTo({ top: node.getBoundingClientRect().top + window.scrollY - off, behavior: 'smooth' });
  };
  $$('[data-scroll]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.dataset.scroll;
    scrollToEl(document.getElementById(id), id === 'top' ? 200 : 74);
  }));

  // ---------- Scroll reveal ----------
  if ('IntersectionObserver' in window) {
    const els = $$('[data-reveal]').filter(n => n.getBoundingClientRect().top > window.innerHeight * 0.92);
    els.forEach(n => n.classList.add('reveal-pending'));
    const rio = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); rio.unobserve(e.target); }
    }), { threshold: 0.12 });
    els.forEach(n => rio.observe(n));
  }

  // ---------- Gallery ----------
  const stage = $('#stage');
  let gi = 0;
  const slides = ALL.slice(0, GN).map((im, i) =>
    el('div', { class: `slide ${im.kind}` }, [el('img', { src: im.src, alt: im.alt, loading: i ? 'lazy' : 'eager' })]));
  stage.prepend(...slides); // beneath the brackets / tag / nav overlays

  const thumbs = ALL.slice(0, GN).map((im, i) => {
    const b = el('button', { type: 'button', class: `thumb ${im.kind}`, 'aria-label': im.name }, [
      el('span', { class: 'frame' }, [el('img', { src: im.src, alt: '', loading: 'lazy' })]),
      el('span', { class: 'label', text: `${code2(i + 1)} ${im.name}` })
    ]);
    b.addEventListener('click', () => setGallery(i));
    $('#thumbs').append(b);
    return b;
  });

  function setGallery(i) {
    gi = (i + GN) % GN;
    slides.forEach((s, k) => s.classList.toggle('is-active', k === gi));
    thumbs.forEach((t, k) => { t.classList.toggle('is-active', k === gi); t.setAttribute('aria-pressed', String(k === gi)); });
    $('#g-counter').textContent = `${code2(gi + 1)} / ${code2(GN)}`;
    $('#g-tag-name').textContent = ALL[gi].name;
    $('#g-name').textContent = ALL[gi].name;
    $('#g-desc').textContent = ALL[gi].desc;
  }
  setGallery(0);
  $('#g-prev').addEventListener('click', e => { e.stopPropagation(); setGallery(gi - 1); });
  $('#g-next').addEventListener('click', e => { e.stopPropagation(); setGallery(gi + 1); });
  stage.addEventListener('click', () => openLb(gi));
  stage.addEventListener('keydown', e => {
    if (e.target !== stage) return;
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(gi); }
    if (e.key === 'ArrowRight') setGallery(gi + 1);
    if (e.key === 'ArrowLeft') setGallery(gi - 1);
  });

  // Swipe (gallery stage + lightbox)
  function swipe(node, onStep) {
    let tx = null, ty = null;
    node.addEventListener('touchstart', e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
    node.addEventListener('touchend', e => {
      if (tx == null) return;
      const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) onStep(dx < 0 ? 1 : -1);
      tx = null;
    });
  }
  swipe(stage, d => setGallery(gi + d));

  // ---------- Lightbox ----------
  const lb = $('#lightbox'), lbFrame = $('#lb-frame'), lbImg = $('#lb-img');
  let lbi = 0, lbReturn = null;
  function renderLb() {
    const it = ALL[lbi];
    lbImg.src = it.src; lbImg.alt = it.alt;
    lbFrame.className = `lb-frame ${it.kind}`;
    lbFrame.style.aspectRatio = it.ratio;
    $('#lb-counter').textContent = `${code2(lbi + 1)} / ${code2(ALL.length)}`;
    $('#lb-name').textContent = it.name;
  }
  function openLb(i) {
    lbi = i; lbReturn = document.activeElement;
    renderLb(); lb.hidden = false; document.body.classList.add('lb-open');
    $('#lb-close').focus({ preventScroll: true });
    updateSticky();
  }
  function closeLb() {
    lb.hidden = true; document.body.classList.remove('lb-open');
    lbReturn && lbReturn.focus && lbReturn.focus({ preventScroll: true });
    updateSticky();
  }
  function lbStep(d) {
    lbi = (lbi + d + ALL.length) % ALL.length;
    if (lbi < GN) setGallery(lbi);
    renderLb();
  }
  lb.addEventListener('click', closeLb);
  lbFrame.addEventListener('click', e => e.stopPropagation());
  $('#lb-close').addEventListener('click', e => { e.stopPropagation(); closeLb(); });
  $('#lb-prev').addEventListener('click', e => { e.stopPropagation(); lbStep(-1); });
  $('#lb-next').addEventListener('click', e => { e.stopPropagation(); lbStep(1); });
  swipe(lb, lbStep);
  window.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowRight') lbStep(1);
    if (e.key === 'ArrowLeft') lbStep(-1);
  });
  $$('[data-lb]').forEach(b => b.addEventListener('click', () => openLb(+b.dataset.lb)));

  // ---------- Order state ----------
  const form = $('#wagmi-order');
  const state = {
    size: null, qty: 1, wil: '', method: PRESELECT_STOP_DESK ? 'desk' : null,
    name: '', phone: '', commune: '', address: '', desk: '', notes: '',
    errors: {}, status: 'idle', errDetail: ''
  };

  // Wilaya options
  const select = $('#wilaya');
  WILAYAS.forEach((nm, i) => {
    const r = RATES[i + 1];
    select.append(el('option', { value: String(i + 1), text: `${code2(i + 1)} — ${nm}  ·  ${r ? 'Stop Desk ' + fmt(r) : 'price to be confirmed'}` }));
  });

  // Size buttons (details section + order form share state)
  const sizeBtns = [];
  $$('[data-sizes]').forEach(host => SIZES.forEach(z => {
    const b = el('button', { type: 'button', class: 'size-btn', 'aria-pressed': 'false', 'data-size': z, text: z });
    b.addEventListener('click', () => upd('size', z));
    host.append(b); sizeBtns.push(b);
  }));

  function upd(k, v) {
    state[k] = v;
    delete state.errors[k];
    render();
  }

  function calc() {
    const n = parseInt(state.wil, 10);
    const hasW = !!n;
    const base = hasW ? (RATES[n] ?? null) : null;
    const confirmed = hasW && base != null;
    const sup = state.method === 'home' ? HOME_SUP : 0;
    const fee = confirmed && state.method ? base + sup : null;
    const subtotal = PRICE * state.qty;
    const total = fee != null ? subtotal + fee : null;
    const wName = hasW ? `${code2(n)} — ${WILAYAS[n - 1]}` : '';
    const methodLabel = state.method === 'home' ? 'Home Delivery' : state.method === 'desk' ? 'Stop Desk' : '';
    return { n, base, hasW, confirmed, tbc: hasW && base == null, sup, fee, subtotal, total, wName, methodLabel };
  }

  function validate(c) {
    const s = state, e = {};
    if (!s.size) e.size = 'Select a size';
    if (s.name.trim().length < 2) e.name = 'Required';
    const p = s.phone.replace(/[\s.\-()]/g, '');
    if (!p) e.phone = 'Required';
    else if (!(/^(?:\+213|00213|0)[5-7]\d{8}$/.test(p) || /^(?:\+213|00213|0)[2-4]\d{7}$/.test(p))) e.phone = 'Invalid number';
    if (!c.hasW) e.wilaya = 'Select a wilaya';
    if (!s.method) e.method = 'Select a method';
    if (!s.commune.trim()) e.commune = 'Required';
    if (s.method === 'home' && !s.address.trim()) e.address = 'Required for home delivery';
    return e;
  }

  const val = x => (x && String(x).trim()) || '—';

  function waText(c) {
    const s = state;
    const lines = ['🔥 WAGMI ORDER', '', 'Product:', PRODUCT, '', 'Price:', fmt(PRICE), '',
      'Name:', val(s.name), '', 'Phone:', val(s.phone), '', 'Size:', val(s.size), '', 'Quantity:', String(s.qty), '',
      'Wilaya:', val(c.wName), '', 'Commune:', val(s.commune), '', 'Delivery:', val(c.methodLabel), '',
      'Delivery fee:', c.fee != null ? fmt(c.fee) : (c.tbc ? 'To be confirmed' : '—'), '',
      'Total:', c.total != null ? fmt(c.total) : `To be confirmed (product subtotal ${fmt(c.subtotal)})`, ''];
    if (s.method === 'home') lines.push('Address:', val(s.address), '');
    if (s.method === 'desk') lines.push('Stop Desk:', val(s.desk), '');
    lines.push('Notes:', val(s.notes));
    return lines.join('\n');
  }
  const waHref = text => `https://wa.me/${WA_NUM}?text=${encodeURIComponent(text)}`;

  function emailText(c, date) {
    const s = state, bar = '================================';
    return [bar, 'NEW WAGMI ORDER', bar, '', `Order date/time: ${date}`, '', 'Customer:', `Full Name: ${s.name.trim()}`, `Phone: ${s.phone.trim()}`, '',
      'Product:', PRODUCT, '', `Size: ${s.size}`, `Quantity: ${s.qty}`, '', `Product subtotal: ${fmt(c.subtotal)}`, '',
      'Delivery:', `Wilaya: ${c.wName}`, `Commune: ${s.commune.trim()}`, `Delivery method: ${c.methodLabel}`, '',
      `Stop Desk base price: ${fmt(c.base)}`, `Home delivery supplement: ${fmt(c.sup)}`, `Final delivery fee: ${fmt(c.fee)}`, '',
      `Address: ${s.method === 'home' ? val(s.address) : '—'}`, `Stop Desk location: ${s.method === 'desk' ? val(s.desk) : '—'}`, '',
      `Additional notes: ${val(s.notes)}`, '', bar, 'TOTAL TO COLLECT:', `${c.total.toLocaleString('en-US')} DA`, bar].join('\n');
  }

  // ---------- Render ----------
  const NS_LABEL = 'Not selected';
  function renderRows(host, rows) {
    host.replaceChildren(...rows.map(([k, v]) => {
      const cls = (v === NS_LABEL || v === '—') ? 'v muted' : v === 'To be confirmed' ? 'v tbc-v' : 'v';
      return el('div', { class: 'row' }, [el('span', { class: 'k', text: k }), el('span', { class: cls, text: v })]);
    }));
  }
  const setHidden = (name, v) => { form.elements[name].value = v; };

  function render() {
    const s = state, c = calc();
    const sending = s.status === 'sending';

    // Sizes
    sizeBtns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.size === s.size)));
    $('[data-field="size"] .size-row').classList.toggle('invalid', !!s.errors.size);
    const hint = $('#size-hint');
    hint.textContent = s.size ? `Size ${s.size} selected` : 'Tap a size to select it';
    hint.classList.toggle('on', !!s.size);

    // Quantity
    $('#qty').textContent = s.qty;

    // Errors
    $$('[data-err]').forEach(n => { n.textContent = s.errors[n.dataset.err] || ''; });
    ['name', 'phone', 'commune', 'address'].forEach(k => $(`[data-input="${k}"]`).classList.toggle('invalid', !!s.errors[k]));
    select.classList.toggle('invalid', !!s.errors.wilaya);
    $('.methods').classList.toggle('invalid', !!s.errors.method);
    $('#form-err').hidden = !Object.keys(s.errors).length;

    // Wilaya
    $('#wilaya-hint').textContent = c.confirmed ? `Stop Desk ${fmt(c.base)} · Home Delivery ${fmt(c.base + HOME_SUP)}` : c.tbc ? 'Delivery price to be confirmed' : 'All 69 wilayas available';
    $('#tbc').hidden = !c.tbc;
    $('#tbc-name').textContent = c.hasW ? WILAYAS[c.n - 1] : '';

    // Delivery method cards
    $$('.method').forEach(b => b.setAttribute('aria-checked', String(b.dataset.method === s.method)));
    $('#desk-price').textContent = c.confirmed ? fmt(c.base) : c.tbc ? 'TBC' : '';
    $('#home-price').textContent = c.confirmed ? fmt(c.base + HOME_SUP) : c.tbc ? 'TBC' : '+350 DA';
    $('#address-field').hidden = s.method !== 'home';
    $('#desk-field').hidden = s.method !== 'desk';

    // Summary
    renderRows($('#rows-a'), [['Size', s.size || NS_LABEL], ['Quantity', String(s.qty)], ['Unit price', fmt(PRICE)], ['Product subtotal', fmt(c.subtotal)]]);
    renderRows($('#rows-b'), [
      ['Wilaya', c.wName || NS_LABEL],
      ['Delivery method', c.methodLabel || NS_LABEL],
      ['Stop Desk base price', c.confirmed ? fmt(c.base) : c.tbc ? 'To be confirmed' : '—'],
      ['Home Delivery supplement', s.method ? fmt(c.sup) : '—'],
      ['Delivery fee', c.fee != null ? fmt(c.fee) : c.tbc ? 'To be confirmed' : '—']
    ]);
    $('#total-big').textContent = c.total != null ? fmt(c.total) : '—';
    $('#total-note').textContent = c.total != null ? `Product ${fmt(c.subtotal)} + delivery ${fmt(c.fee)}`
      : c.tbc ? 'Delivery price to be confirmed on WhatsApp.' : 'Select your wilaya and delivery method to see your total.';

    // Hidden fields (no-JS fallback / transparency); the real submit builds its own payload.
    setHidden('_subject', `🔥 NEW WAGMI RENGOKU ORDER — ${s.name.trim()}`);
    setHidden('_next', location.href.split('#')[0] + '#order');
    setHidden('Size', s.size || '');
    setHidden('Quantity', String(s.qty));
    setHidden('Delivery method', c.methodLabel);
    setHidden('Product subtotal', fmt(c.subtotal));
    setHidden('Final delivery fee', c.fee != null ? fmt(c.fee) : '');
    setHidden('TOTAL TO COLLECT', c.total != null ? fmt(c.total) : '');

    // Submit + errors
    const btn = $('#submit');
    btn.disabled = sending || c.tbc;
    btn.textContent = sending ? 'SENDING ORDER…' : c.tbc ? 'PRICE TO BE CONFIRMED' : 'CONFIRM MY ORDER';
    $('#submit-error').hidden = s.status !== 'error';
    $('#submit-error-detail').hidden = !s.errDetail;
    $('#submit-error-detail').textContent = s.errDetail;

    // WhatsApp links
    const href = waHref(waText(c));
    $$('[data-wa]').forEach(a => { a.href = href; });
  }

  // ---------- Inputs ----------
  $$('[data-input]').forEach(inp => inp.addEventListener('input', () => {
    const k = inp.dataset.input;
    if (k === 'desk' || k === 'notes') { state[k] = inp.value; render(); }
    else upd(k, inp.value);
  }));
  select.addEventListener('change', () => upd('wil', select.value));
  $$('.method').forEach(b => b.addEventListener('click', () => upd('method', b.dataset.method)));
  $('#qty-dec').addEventListener('click', () => { state.qty = Math.max(1, state.qty - 1); render(); });
  $('#qty-inc').addEventListener('click', () => { state.qty = Math.min(MAX_QTY, state.qty + 1); render(); });
  $('#wa-size').href = waHref('Hi WAGMI, I need help choosing a size for the Rengoku Special Drop Hoodie.');

  // ---------- Submit (FormSubmit AJAX) ----------
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (state.status === 'sending') return;
    const c = calc();
    const errors = validate(c);
    if (Object.keys(errors).length) {
      state.errors = errors; render();
      const first = ['size', 'wilaya', 'method', 'commune', 'address', 'name', 'phone'].find(k => errors[k]);
      setTimeout(() => scrollToEl($(`[data-field="${first}"]`), 100), 30);
      return;
    }
    if (!c.confirmed || c.total == null) return;

    const s = state;
    const date = new Date().toLocaleString('fr-DZ', { timeZone: 'Africa/Algiers', dateStyle: 'full', timeStyle: 'short' });
    const payload = {
      _subject: `🔥 NEW WAGMI RENGOKU ORDER — ${s.name.trim()}`,
      _template: 'table',
      _captcha: 'false',
      'Order date/time': date,
      'Full Name': s.name.trim(),
      'Phone': s.phone.trim(),
      'Product': PRODUCT,
      'Size': s.size,
      'Quantity': String(s.qty),
      'Product subtotal': fmt(c.subtotal),
      'Wilaya': c.wName,
      'Commune': s.commune.trim(),
      'Delivery method': c.methodLabel,
      'Stop Desk base price': fmt(c.base),
      'Home delivery supplement': fmt(c.sup),
      'Final delivery fee': fmt(c.fee),
      'Address': s.method === 'home' ? s.address.trim() : '—',
      'Stop Desk location': s.method === 'desk' ? (s.desk.trim() || '—') : '—',
      'Additional notes': s.notes.trim() || '—',
      'TOTAL TO COLLECT': fmt(c.total),
      'Order summary': emailText(c, date)
    };

    state.status = 'sending'; state.errDetail = ''; render();
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });
      let data = null; try { data = await res.json(); } catch (_) {}
      if (res.ok && data && String(data.success) === 'true') {
        showSuccess({ name: s.name.trim(), size: s.size, qty: s.qty, wName: c.wName, method: c.methodLabel, total: c.total });
      } else {
        state.status = 'error'; state.errDetail = data && data.message ? String(data.message) : ''; render();
      }
    } catch (_) {
      state.status = 'error'; state.errDetail = ''; render();
    }
  });

  function showSuccess(snap) {
    state.status = 'success';
    const rows = [['Customer', snap.name], ['Product', PRODUCT], ['Size', snap.size], ['Quantity', String(snap.qty)], ['Wilaya', snap.wName], ['Delivery method', snap.method]];
    $('#receipt-rows').replaceChildren(...rows.map(([k, v]) => el('div', { class: 'r' }, [el('span', { class: 'k', text: k }), el('span', { class: 'v', text: v })])));
    $('#receipt-total').textContent = fmt(snap.total);
    $('#order-flow').hidden = true;
    $('#order-success').hidden = false;
    setTimeout(() => scrollToEl($('#order'), 74), 50);
  }

  $('#new-order').addEventListener('click', () => {
    Object.assign(state, { status: 'idle', size: null, qty: 1, notes: '', errors: {}, errDetail: '' });
    $('[data-input="notes"]').value = '';
    $('#order-success').hidden = true;
    $('#order-flow').hidden = false;
    render();
  });

  // ---------- Sticky mobile CTA ----------
  const sticky = $('#sticky');
  const mq = window.matchMedia('(max-width: 899px)');
  let past = false, inOrder = false;
  function updateSticky() { sticky.hidden = !(mq.matches && past && !inOrder && lb.hidden); }
  mq.addEventListener ? mq.addEventListener('change', updateSticky) : mq.addListener(updateSticky);
  window.addEventListener('scroll', () => {
    const p = window.scrollY > 520;
    if (p !== past) { past = p; updateSticky(); }
  }, { passive: true });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(es => es.forEach(e => { inOrder = e.isIntersecting; updateSticky(); }), { threshold: 0 }).observe($('#order'));
  }
  past = window.scrollY > 520;

  // Restore field values if the browser autofilled / kept them on reload
  $$('[data-input]').forEach(inp => { if (inp.value) state[inp.dataset.input] = inp.value; });
  if (select.value) state.wil = select.value;

  render();
  updateSticky();
})();
