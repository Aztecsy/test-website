/* ============================================================
   VELVET — script.js
   ============================================================ */

// ============================================================
// PRODUCT DATA
// ============================================================
const PRODUCTS = [
  { id:1,  name:'Velvet Rose',       category:'Vibrators',    price:49.99,  origPrice:69.99,  rating:4.5, reviews:84,  badge:'sale',  inStock:true  },
  { id:2,  name:'Luxe Pearl',        category:'Couples',      price:79.99,  origPrice:null,   rating:4.0, reviews:62,  badge:null,    inStock:true  },
  { id:3,  name:'Midnight Whisper',  category:'Accessories',  price:129.99, origPrice:169.99, rating:4.5, reviews:118, badge:'sale',  inStock:true  },
  { id:4,  name:'Silk Touch',        category:'Wellness',     price:64.99,  origPrice:null,   rating:4.0, reviews:47,  badge:null,    inStock:true  },
  { id:5,  name:'Aurora Pulse',      category:'Lingerie',     price:34.99,  origPrice:49.99,  rating:4.5, reviews:93,  badge:'sale',  inStock:false },
  { id:6,  name:'Golden Haze',       category:'BDSM',         price:89.99,  origPrice:null,   rating:5.0, reviews:31,  badge:null,    inStock:true  },
  { id:7,  name:'Crimson Bloom',     category:'Vibrators',    price:149.99, origPrice:199.99, rating:4.5, reviews:156, badge:'new',   inStock:true  },
  { id:8,  name:'Obsidian Dream',    category:'Couples',      price:44.99,  origPrice:null,   rating:4.0, reviews:29,  badge:null,    inStock:false },
  { id:9,  name:'Ivory Bliss',       category:'Accessories',  price:99.99,  origPrice:139.99, rating:4.5, reviews:72,  badge:'sale',  inStock:true  },
  { id:10, name:'Scarlet Desire',    category:'Wellness',     price:59.99,  origPrice:null,   rating:4.0, reviews:53,  badge:null,    inStock:true  },
  { id:11, name:'Sapphire Wave',     category:'Lingerie',     price:74.99,  origPrice:99.99,  rating:4.5, reviews:44,  badge:'sale',  inStock:true  },
  { id:12, name:'Ruby Embrace',      category:'BDSM',         price:119.99, origPrice:null,   rating:5.0, reviews:88,  badge:null,    inStock:true  },
  { id:13, name:'Onyx Fantasy',      category:'Vibrators',    price:69.99,  origPrice:94.99,  rating:4.0, reviews:61,  badge:'new',   inStock:false },
  { id:14, name:'Amethyst Glow',     category:'Couples',      price:54.99,  origPrice:null,   rating:4.5, reviews:37,  badge:null,    inStock:true  },
  { id:15, name:'Jade Serenity',     category:'Wellness',     price:39.99,  origPrice:54.99,  rating:4.0, reviews:26,  badge:'sale',  inStock:true  },
  { id:16, name:'Coral Rush',        category:'Accessories',  price:94.99,  origPrice:null,   rating:5.0, reviews:109, badge:null,    inStock:true  },
  { id:17, name:'Indigo Night',      category:'BDSM',         price:84.99,  origPrice:114.99, rating:4.5, reviews:77,  badge:'new',   inStock:true  },
  { id:18, name:'Silver Mist',       category:'Lingerie',     price:109.99, origPrice:null,   rating:4.0, reviews:58,  badge:null,    inStock:false },
  { id:19, name:'Bronze Tempt',      category:'Vibrators',    price:29.99,  origPrice:44.99,  rating:4.5, reviews:19,  badge:'sale',  inStock:true  },
  { id:20, name:'Lavender Bliss',    category:'Couples',      price:139.99, origPrice:189.99, rating:5.0, reviews:142, badge:'new',   inStock:true  },
];

PRODUCTS.forEach((p, i) => {
  p.image = `https://picsum.photos/seed/velvet${p.id}/400/530`;
  p.images = [0,1,2,3].map(j => `https://picsum.photos/seed/velvet${p.id}x${j}/600/800`);
  p.description = 'Crafted from premium body-safe silicone, this elegant piece delivers whisper-quiet yet powerful sensations. Featuring multiple intensity settings and a fully waterproof design for total freedom.';
});

// ============================================================
// STATE
// ============================================================
let cart     = JSON.parse(localStorage.getItem('velvet-cart')     || '[]');
let wishlist = JSON.parse(localStorage.getItem('velvet-wishlist') || '[]');
let darkMode = localStorage.getItem('velvet-theme') !== 'light';

const saveCart     = () => localStorage.setItem('velvet-cart',     JSON.stringify(cart));
const saveWishlist = () => localStorage.setItem('velvet-wishlist', JSON.stringify(wishlist));
const getCartTotal = () => cart.reduce((s, i) => s + i.price * i.qty, 0);
const getCartCount = () => cart.reduce((s, i) => s + i.qty, 0);

function updateCartBadges() {
  const count = getCartCount();
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

// ============================================================
// AGE GATE
// ============================================================
function initAgeGate() {
  const gate = document.getElementById('age-gate');
  if (!gate) return;
  if (localStorage.getItem('velvet-age-verified') === '1') { gate.style.display = 'none'; return; }

  document.getElementById('age-enter')?.addEventListener('click', () => {
    localStorage.setItem('velvet-age-verified', '1');
    gate.style.transition = 'opacity .5s';
    gate.style.opacity = '0';
    setTimeout(() => gate.style.display = 'none', 500);
  });
  document.getElementById('age-exit')?.addEventListener('click', () => {
    window.location.href = 'https://www.google.com';
  });
}

// ============================================================
// LOADER
// ============================================================
function initLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  window.addEventListener('load', () => setTimeout(() => loader.classList.add('hidden'), 400));
}

// ============================================================
// THEME
// ============================================================
function initTheme() {
  if (!darkMode) document.body.classList.add('light-mode');
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      darkMode = !darkMode;
      document.body.classList.toggle('light-mode', !darkMode);
      localStorage.setItem('velvet-theme', darkMode ? 'dark' : 'light');
    });
  });
}

// ============================================================
// NAVBAR & MOBILE MENU
// ============================================================
function initNavbar() {
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');
  const overlay     = document.getElementById('mobile-menu-overlay');
  const closeBtn    = document.getElementById('mobile-close');

  const openMenu  = () => { hamburger?.classList.add('open'); mobileMenu?.classList.add('open'); overlay?.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeMenu = () => { hamburger?.classList.remove('open'); mobileMenu?.classList.remove('open'); overlay?.classList.remove('open'); document.body.style.overflow = ''; };

  hamburger?.addEventListener('click', () => mobileMenu?.classList.contains('open') ? closeMenu() : openMenu());
  overlay?.addEventListener('click', closeMenu);
  closeBtn?.addEventListener('click', closeMenu);

  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
}

// ============================================================
// NAV SEARCH OVERLAY
// ============================================================
function initNavSearch() {
  const btn     = document.getElementById('nav-search-btn');
  const overlay = document.getElementById('nav-search-overlay');
  const close   = document.getElementById('nav-search-close');
  const input   = document.getElementById('nav-search-input');

  btn?.addEventListener('click',   () => { overlay?.classList.add('open'); setTimeout(() => input?.focus(), 100); });
  close?.addEventListener('click', () => overlay?.classList.remove('open'));
  overlay?.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
  input?.addEventListener('keypress', e => {
    if (e.key === 'Enter' && input.value.trim())
      window.location.href = `search.html?q=${encodeURIComponent(input.value.trim())}`;
  });
}

// ============================================================
// SCROLL FEATURES
// ============================================================
function initScrollFeatures() {
  const btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => btn?.classList.toggle('visible', window.scrollY > 400), { passive: true });
  btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ============================================================
// FADE IN (Intersection Observer)
// ============================================================
function initFadeIn() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
}

// ============================================================
// COOKIE BANNER
// ============================================================
function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (!banner || localStorage.getItem('velvet-cookies')) return;
  setTimeout(() => banner.classList.add('visible'), 1500);
  document.getElementById('cookie-accept')?.addEventListener('click',  () => { localStorage.setItem('velvet-cookies', '1'); banner.classList.remove('visible'); });
  document.getElementById('cookie-decline')?.addEventListener('click', () => banner.classList.remove('visible'));
}

// ============================================================
// TOAST
// ============================================================
function showToast(message, type = 'default', icon = '✓') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-msg">${message}</span><button class="toast-close" onclick="this.parentElement.remove()">✕</button>`;
  container.appendChild(t);
  setTimeout(() => { t.classList.add('removing'); t.addEventListener('animationend', () => t.remove()); }, 3500);
}

// ============================================================
// CAROUSEL
// ============================================================
function initCarousel(wrapper, auto = true) {
  if (!wrapper) return;
  const track   = wrapper.querySelector('.carousel-track');
  const prevBtn = wrapper.querySelector('.carousel-btn.prev');
  const nextBtn = wrapper.querySelector('.carousel-btn.next');
  const dots    = wrapper.querySelectorAll('.carousel-dot');
  if (!track) return;

  let current = 0;
  const items = track.children;

  function itemWidth() { return items[0] ? items[0].offsetWidth + 24 : 284; }
  function maxIdx()    { const vis = Math.max(1, Math.floor(wrapper.querySelector('.carousel-track-outer').offsetWidth / itemWidth())); return Math.max(0, items.length - vis); }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, maxIdx()));
    track.style.transform = `translateX(-${current * itemWidth()}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
  window.addEventListener('resize', () => goTo(0));

  if (auto) {
    let timer = setInterval(() => goTo(current >= maxIdx() ? 0 : current + 1), 3800);
    wrapper.addEventListener('mouseenter', () => clearInterval(timer));
    wrapper.addEventListener('mouseleave', () => { timer = setInterval(() => goTo(current >= maxIdx() ? 0 : current + 1), 3800); });
  }
}

// ============================================================
// ADD TO CART
// ============================================================
function addToCart(productId, qty = 1) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  const ex = cart.find(i => i.id === productId);
  if (ex) ex.qty += qty;
  else cart.push({ id: p.id, name: p.name, price: p.price, image: p.image, qty, variant: 'Standard' });
  saveCart();
  updateCartBadges();
  showToast(`${p.name} added to cart`, 'success', '🛍️');
}

// ============================================================
// WISHLIST
// ============================================================
function toggleWishlist(productId) {
  const p   = PRODUCTS.find(x => x.id === productId);
  const idx = wishlist.findIndex(i => i.id === productId);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    saveWishlist();
    showToast(`Removed from wishlist`, 'default', '♡');
  } else {
    wishlist.push({ id: p.id, name: p.name, price: p.price, image: p.image });
    saveWishlist();
    showToast(`${p.name} saved to wishlist`, 'success', '♥');
  }
  document.querySelectorAll(`.card-action-btn[onclick="toggleWishlist(${productId})"]`).forEach(btn => {
    btn.textContent = wishlist.some(i => i.id === productId) ? '♥' : '♡';
  });
}

// ============================================================
// RENDER PRODUCT CARD
// ============================================================
function renderProductCard(p) {
  const wished = wishlist.some(w => w.id === p.id);
  return `<div class="product-card fade-in" data-id="${p.id}" data-category="${p.category}" data-price="${p.price}" data-rating="${p.rating}">
    <div class="product-card-img-wrap">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      ${p.badge === 'sale' ? '<span class="product-badge badge-sale">Sale</span>' : ''}
      ${p.badge === 'new'  ? '<span class="product-badge badge-new">New</span>'   : ''}
      <div class="product-card-actions">
        <button class="card-action-btn" onclick="toggleWishlist(${p.id})" title="Wishlist">${wished ? '♥' : '♡'}</button>
        <button class="card-action-btn" onclick="openQuickView(${p.id})" title="Quick View">⊕</button>
      </div>
      <div class="quick-view-overlay">
        <button class="quick-view-btn" onclick="openQuickView(${p.id})">Quick View</button>
      </div>
    </div>
    <div class="product-card-body">
      <div class="product-card-category">${p.category}</div>
      <h3 class="product-card-name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <div class="product-card-rating">
        <span class="stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5 - Math.floor(p.rating))}</span>
        <span class="rating-count">(${p.reviews})</span>
      </div>
      <div class="product-card-price">
        <span class="price-current">€${p.price.toFixed(2)}</span>
        ${p.origPrice ? `<span class="price-original">€${p.origPrice.toFixed(2)}</span>` : ''}
      </div>
    </div>
    <div class="product-card-footer">
      <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  </div>`;
}

// ============================================================
// QUICK VIEW MODAL
// ============================================================
function openQuickView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const overlay = document.getElementById('quick-view-modal');
  if (!overlay) return;
  const set = (elId, val) => { const el = document.getElementById(elId); if (el) el.textContent = val; };
  document.getElementById('qv-img').src = p.image;
  set('qv-category', p.category);
  set('qv-name', p.name);
  set('qv-price', `€${p.price.toFixed(2)}`);
  set('qv-orig',  p.origPrice ? `€${p.origPrice.toFixed(2)}` : '');
  set('qv-stars', '★'.repeat(Math.floor(p.rating)) + '☆'.repeat(5 - Math.floor(p.rating)));
  document.getElementById('qv-add-cart').onclick = () => { addToCart(id); closeQuickView(); };
  document.getElementById('qv-view-full').href = `product.html?id=${id}`;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeQuickView() {
  document.getElementById('quick-view-modal')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================================
// ACCORDION
// ============================================================
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item   = header.closest('.accordion-item');
      const body   = item.querySelector('.accordion-body');
      const inner  = item.querySelector('.accordion-body-inner');
      const isOpen = item.classList.contains('open');
      item.closest('.accordion')?.querySelectorAll('.accordion-item').forEach(s => {
        s.classList.remove('open');
        s.querySelector('.accordion-body').style.maxHeight = '0';
      });
      if (!isOpen) { item.classList.add('open'); body.style.maxHeight = inner.offsetHeight + 'px'; }
    });
  });
}

// ============================================================
// NEWSLETTER
// ============================================================
function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input?.value) { showToast('Welcome! Check your inbox for a special gift.', 'success', '✉'); input.value = ''; }
    });
  });
}

// ============================================================
// HOMEPAGE
// ============================================================
function initHomepage() {
  const featuredWrap = document.getElementById('featured-carousel');
  if (featuredWrap) {
    const track = featuredWrap.querySelector('.carousel-track');
    if (track) track.innerHTML = PRODUCTS.slice(0, 8).map(renderProductCard).join('');
    initCarousel(featuredWrap, true);
  }

  const testimonialsWrap = document.getElementById('testimonials-carousel');
  if (testimonialsWrap) initCarousel(testimonialsWrap, true);

  document.querySelectorAll('.category-card[data-category]').forEach(card => {
    card.addEventListener('click', () => window.location.href = `shop.html?category=${encodeURIComponent(card.dataset.category)}`);
  });
}

// ============================================================
// SHOP PAGE
// ============================================================
function initShop() {
  const container = document.getElementById('products-container');
  if (!container) return;

  let filtered  = [...PRODUCTS];
  let gridView  = true;

  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('category');

  function renderProducts() {
    const gridEl = document.getElementById('grid-view');
    const listEl = document.getElementById('list-view');
    if (gridView) {
      if (gridEl) { gridEl.style.display = 'grid'; gridEl.innerHTML = filtered.map(renderProductCard).join(''); }
      if (listEl) listEl.style.display = 'none';
    } else {
      if (listEl) {
        listEl.style.display = 'flex';
        listEl.innerHTML = filtered.map(p => `
          <div class="product-list-item fade-in" data-id="${p.id}">
            <div class="product-list-img"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
            <div class="product-list-body">
              <div class="product-list-info">
                <div class="product-card-category">${p.category}</div>
                <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
                <p>${p.description.slice(0, 120)}…</p>
                <div class="product-card-rating">
                  <span class="stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5 - Math.floor(p.rating))}</span>
                  <span class="rating-count">(${p.reviews})</span>
                </div>
              </div>
              <div class="product-list-footer">
                <div class="product-card-price">
                  <span class="price-current">€${p.price.toFixed(2)}</span>
                  ${p.origPrice ? `<span class="price-original">€${p.origPrice.toFixed(2)}</span>` : ''}
                </div>
                <div style="display:flex;gap:8px">
                  <button class="btn btn-outline" style="padding:8px 16px;font-size:11px" onclick="toggleWishlist(${p.id})">♡ Wishlist</button>
                  <button class="btn" style="padding:8px 16px;font-size:11px" onclick="addToCart(${p.id})">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>`).join('');
      }
      if (gridEl) gridEl.style.display = 'none';
    }
    const countEl = document.getElementById('results-count');
    if (countEl) countEl.textContent = `${filtered.length} products`;
    initFadeIn();
  }

  function applyFilters() {
    const cats      = [...document.querySelectorAll('.filter-category:checked')].map(i => i.value);
    const maxPrice  = parseFloat(document.getElementById('price-max')?.value || 200);
    const ratings   = [...document.querySelectorAll('.filter-rating:checked')].map(i => parseFloat(i.value));
    const inStock   = document.getElementById('filter-instock')?.checked;
    const saleOnly  = document.getElementById('filter-sale')?.checked;
    const sort      = document.getElementById('sort-select')?.value || 'featured';

    filtered = PRODUCTS.filter(p => {
      if (cats.length && !cats.includes(p.category)) return false;
      if (p.price > maxPrice) return false;
      if (ratings.length && !ratings.some(r => p.rating >= r)) return false;
      if (inStock && !p.inStock) return false;
      if (saleOnly && !p.origPrice) return false;
      return true;
    });

    if (sort === 'price-asc')  filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'rating')     filtered.sort((a, b) => b.rating - a.rating);
    if (sort === 'newest')     filtered.sort((a, b) => b.id - a.id);

    renderProducts();
  }

  // Pre-filter by category from URL
  if (catParam) {
    const cb = document.querySelector(`.filter-category[value="${catParam}"]`);
    if (cb) cb.checked = true;
  }

  document.querySelectorAll('.filter-category, .filter-rating, #filter-instock, #filter-sale').forEach(el => el.addEventListener('change', applyFilters));
  document.getElementById('price-max')?.addEventListener('input', function() {
    const d = document.getElementById('price-display-max');
    if (d) d.textContent = `€${this.value}`;
    applyFilters();
  });
  document.getElementById('sort-select')?.addEventListener('change', applyFilters);

  document.getElementById('view-grid')?.addEventListener('click', () => {
    gridView = true;
    document.getElementById('view-grid')?.classList.add('active');
    document.getElementById('view-list')?.classList.remove('active');
    renderProducts();
  });
  document.getElementById('view-list')?.addEventListener('click', () => {
    gridView = false;
    document.getElementById('view-list')?.classList.add('active');
    document.getElementById('view-grid')?.classList.remove('active');
    renderProducts();
  });

  applyFilters();
}

// ============================================================
// PRODUCT PAGE
// ============================================================
function initProductPage() {
  if (!document.getElementById('product-page')) return;

  const params  = new URLSearchParams(window.location.search);
  const id      = parseInt(params.get('id')) || 1;
  const p       = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];

  const set = (elId, val) => { const el = document.getElementById(elId); if (el) el.textContent = val; };

  // Gallery
  const mainImg = document.getElementById('gallery-main-img');
  if (mainImg) mainImg.src = p.images[0];
  document.querySelectorAll('.product-thumb').forEach((thumb, i) => {
    const img = thumb.querySelector('img');
    if (img) img.src = p.images[i % p.images.length];
    thumb.addEventListener('click', () => {
      if (mainImg) mainImg.src = p.images[i % p.images.length];
      document.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  // Info
  set('product-name',         p.name);
  set('product-category',     p.category);
  set('product-price',        `€${p.price.toFixed(2)}`);
  set('product-rating-val',   p.rating);
  set('product-review-count', `(${p.reviews} reviews)`);
  set('product-stars',        '★'.repeat(Math.floor(p.rating)) + '☆'.repeat(5 - Math.floor(p.rating)));
  if (p.origPrice) {
    const orig = document.getElementById('product-orig-price');
    if (orig) { orig.textContent = `€${p.origPrice.toFixed(2)}`; orig.style.display = 'inline'; }
  }
  const desc = document.getElementById('product-description');
  if (desc) desc.textContent = p.description;

  // Qty
  const qtyInput = document.getElementById('qty-input');
  document.getElementById('qty-minus')?.addEventListener('click', () => { if (qtyInput && parseInt(qtyInput.value) > 1) qtyInput.value = parseInt(qtyInput.value) - 1; });
  document.getElementById('qty-plus')?.addEventListener('click',  () => { if (qtyInput) qtyInput.value = parseInt(qtyInput.value) + 1; });

  document.getElementById('add-to-cart-btn')?.addEventListener('click',    () => addToCart(p.id, parseInt(qtyInput?.value) || 1));
  document.getElementById('add-to-wishlist-btn')?.addEventListener('click', () => toggleWishlist(p.id));

  document.querySelectorAll('.color-swatch').forEach(s => {
    s.addEventListener('click', () => { document.querySelectorAll('.color-swatch').forEach(x => x.classList.remove('active')); s.classList.add('active'); });
  });

  // Also bought
  const grid = document.getElementById('also-bought-grid');
  if (grid) { grid.innerHTML = PRODUCTS.filter(x => x.id !== p.id).slice(0, 4).map(renderProductCard).join(''); initFadeIn(); }
}

// ============================================================
// CART PAGE
// ============================================================
function initCartPage() {
  const cartItemsEl = document.getElementById('cart-items');
  if (!cartItemsEl) return;

  function render() {
    if (!cart.length) {
      cartItemsEl.innerHTML = `<div class="empty-state"><div class="empty-state-icon">🛍️</div><h3>Your cart is empty</h3><p style="margin-bottom:24px">Discover our luxurious collection</p><a href="shop.html" class="btn">Shop Now</a></div>`;
    } else {
      cartItemsEl.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-img"><img src="${item.image}" alt="${item.name}"></div>
          <div>
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-variant">${item.variant || 'Standard'}</div>
            <div class="cart-item-actions">
              <div class="quantity-selector" style="transform:scale(.85);transform-origin:left">
                <button class="qty-btn" onclick="updateQty(${item.id},${item.qty - 1})">−</button>
                <input class="qty-input" type="number" value="${item.qty}" min="1" onchange="updateQty(${item.id},parseInt(this.value))">
                <button class="qty-btn" onclick="updateQty(${item.id},${item.qty + 1})">+</button>
              </div>
              <button class="cart-item-remove" onclick="removeItem(${item.id})">Remove</button>
            </div>
          </div>
          <div class="cart-item-price">€${(item.price * item.qty).toFixed(2)}</div>
        </div>`).join('');
    }
    updateSummary();
    updateCartBadges();
  }

  function updateSummary() {
    const sub      = getCartTotal();
    const shipping = sub >= 50 ? 0 : 4.99;
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('summary-subtotal', `€${sub.toFixed(2)}`);
    set('summary-shipping', shipping === 0 ? 'FREE' : `€${shipping.toFixed(2)}`);
    set('summary-total',    `€${(sub + shipping).toFixed(2)}`);
  }

  window.updateQty  = (id, qty) => { if (qty < 1) { window.removeItem(id); return; } const i = cart.find(x => x.id === id); if (i) { i.qty = qty; saveCart(); render(); } };
  window.removeItem = (id)      => { cart = cart.filter(i => i.id !== id); saveCart(); render(); showToast('Item removed', 'default', '✕'); };

  document.getElementById('apply-coupon')?.addEventListener('click', () => {
    const code = document.getElementById('coupon-input')?.value.trim().toUpperCase();
    if      (code === 'VELVET10') showToast('10% discount applied!', 'success', '🏷️');
    else if (code === 'WELCOME')  showToast('Welcome discount applied!', 'success', '🎁');
    else                          showToast('Invalid coupon code', 'warning', '⚠');
  });

  const upsell = document.getElementById('cart-also-like');
  if (upsell) { upsell.innerHTML = PRODUCTS.slice(0, 4).map(renderProductCard).join(''); }

  render();
}

// ============================================================
// CHECKOUT
// ============================================================
function initCheckout() {
  const steps = document.querySelectorAll('.checkout-step-item');
  const forms = document.querySelectorAll('.checkout-form');
  if (!steps.length) return;

  let step = 0;
  function goTo(idx) {
    step = idx;
    steps.forEach((s, i) => { s.classList.toggle('active', i === idx); s.classList.toggle('complete', i < idx); });
    forms.forEach((f, i)  => f.classList.toggle('active', i === idx));
  }

  document.querySelectorAll('.step-next').forEach(btn => btn.addEventListener('click', () => {
    if (step < steps.length - 1) goTo(step + 1);
    else { showToast('Order placed! Check your email.', 'success', '🎉'); setTimeout(() => window.location.href = 'index.html', 2000); }
  }));
  document.querySelectorAll('.step-back').forEach(btn => btn.addEventListener('click', () => { if (step > 0) goTo(step - 1); }));

  const items = document.getElementById('checkout-summary-items');
  if (items) {
    const sub = getCartTotal();
    const shipping = sub >= 50 ? 0 : 4.99;
    items.innerHTML = cart.length
      ? cart.map(i => `<div class="summary-line"><span>${i.name} × ${i.qty}</span><span>€${(i.price*i.qty).toFixed(2)}</span></div>`).join('')
      + `<div class="summary-line" style="margin-top:8px"><span>Shipping</span><span>${shipping===0?'FREE':'€'+shipping.toFixed(2)}</span></div>`
      : '<p style="font-size:13px;color:var(--text-secondary)">No items</p>';
    const tot = document.getElementById('checkout-total');
    if (tot) tot.textContent = `€${(sub + shipping).toFixed(2)}`;
  }
}

// ============================================================
// WISHLIST PAGE
// ============================================================
function initWishlistPage() {
  const grid = document.getElementById('wishlist-grid');
  if (!grid) return;

  function render() {
    if (!wishlist.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">♡</div><h3>Your wishlist is empty</h3><p style="margin-bottom:24px">Save items you love</p><a href="shop.html" class="btn">Discover Products</a></div>`;
      return;
    }
    grid.innerHTML = wishlist.map(item => `
      <div class="wishlist-card fade-in" data-id="${item.id}">
        <div class="wishlist-card-img"><img src="${item.image}" alt="${item.name}" loading="lazy"></div>
        <div class="wishlist-card-body">
          <div class="product-card-category">${PRODUCTS.find(p => p.id === item.id)?.category || ''}</div>
          <h3 class="product-card-name"><a href="product.html?id=${item.id}">${item.name}</a></h3>
          <div class="product-card-price"><span class="price-current">€${item.price.toFixed(2)}</span></div>
          <div class="wishlist-card-actions">
            <button class="btn" style="padding:10px;font-size:11px" onclick="moveToCart(${item.id})">Move to Cart</button>
            <button class="btn btn-ghost" style="padding:10px;font-size:11px" onclick="removeWish(${item.id})">Remove</button>
          </div>
        </div>
      </div>`).join('');
    initFadeIn();
  }

  window.moveToCart = id => { addToCart(id); wishlist = wishlist.filter(i => i.id !== id); saveWishlist(); render(); };
  window.removeWish = id => { wishlist = wishlist.filter(i => i.id !== id); saveWishlist(); render(); showToast('Removed from wishlist', 'default', '✕'); };
  render();
}

// ============================================================
// ACCOUNT PAGE
// ============================================================
function initAccountPage() {
  // Auth tabs
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.auth-panel').forEach(p => p.classList.remove('active'));
      document.getElementById(`auth-${target}`)?.classList.add('active');
    });
  });

  const dashboard = document.getElementById('dashboard-view');
  const authBox   = document.getElementById('auth-box');

  document.getElementById('login-form')?.addEventListener('submit', e => {
    e.preventDefault();
    if (authBox) authBox.style.display = 'none';
    if (dashboard) dashboard.style.display = 'block';
    showToast('Welcome back to Velvet!', 'success', '✓');
  });
  document.getElementById('register-form')?.addEventListener('submit', e => {
    e.preventDefault();
    if (authBox) authBox.style.display = 'none';
    if (dashboard) dashboard.style.display = 'block';
    showToast('Account created! Welcome to Velvet.', 'success', '🎉');
  });

  // Account tabs (dashboard sections)
  document.querySelectorAll('.account-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      document.querySelectorAll('.account-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.account-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`panel-${target}`)?.classList.add('active');
    });
  });
}

// ============================================================
// SEARCH PAGE
// ============================================================
function initSearchPage() {
  const input    = document.getElementById('search-input');
  const results  = document.getElementById('search-results');
  const noRes    = document.getElementById('no-results');
  const countEl  = document.getElementById('search-result-count');
  if (!input) return;

  const params = new URLSearchParams(window.location.search);
  const q = params.get('q') || '';
  if (q) { input.value = q; doSearch(q); }

  input.addEventListener('input', () => doSearch(input.value));
  document.getElementById('search-submit-btn')?.addEventListener('click', () => doSearch(input.value));
  input.addEventListener('keypress', e => { if (e.key === 'Enter') doSearch(input.value); });

  document.querySelectorAll('.suggestion-tag').forEach(tag => {
    tag.addEventListener('click', () => { input.value = tag.textContent; doSearch(tag.textContent); });
  });

  function doSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) { if (results) results.innerHTML = ''; if (noRes) noRes.style.display = 'none'; if (countEl) countEl.textContent = ''; return; }
    const found = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    if (countEl) countEl.textContent = `${found.length} result${found.length !== 1 ? 's' : ''} for "${query}"`;
    if (!found.length) { if (results) results.innerHTML = ''; if (noRes) noRes.style.display = 'block'; }
    else { if (noRes) noRes.style.display = 'none'; if (results) { results.innerHTML = found.map(renderProductCard).join(''); initFadeIn(); } }
  }
}

// ============================================================
// CONTACT PAGE
// ============================================================
function initContactPage() {
  document.getElementById('contact-form')?.addEventListener('submit', e => {
    e.preventDefault();
    showToast("Message sent! We'll respond within 24 hours.", 'success', '✉');
    e.target.reset();
  });

  const chatBtn    = document.getElementById('chat-open-btn');
  const chatWindow = document.getElementById('chat-window');
  chatBtn?.addEventListener('click', () => chatWindow?.classList.toggle('open'));

  const chatSend  = document.getElementById('chat-send');
  const chatInput = document.getElementById('chat-input-field');
  const chatMsgs  = document.getElementById('chat-messages');

  function sendMsg() {
    const msg = chatInput?.value.trim();
    if (!msg || !chatMsgs) return;
    chatMsgs.insertAdjacentHTML('beforeend', `<div class="chat-msg user-msg"><div class="chat-bubble-msg">${msg}</div></div>`);
    if (chatInput) chatInput.value = '';
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
    setTimeout(() => {
      chatMsgs.insertAdjacentHTML('beforeend', `<div class="chat-msg bot"><div class="chat-bubble-msg">Thank you! A team member will be with you shortly. Average response time: under 2 min. 💜</div></div>`);
      chatMsgs.scrollTop = chatMsgs.scrollHeight;
    }, 1200);
  }

  chatSend?.addEventListener('click', sendMsg);
  chatInput?.addEventListener('keypress', e => { if (e.key === 'Enter') sendMsg(); });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initAgeGate();
  initLoader();
  initTheme();
  initNavbar();
  initNavSearch();
  initScrollFeatures();
  initFadeIn();
  initCookieBanner();
  initNewsletter();
  initAccordions();
  initHomepage();
  initShop();
  initProductPage();
  initCartPage();
  initCheckout();
  initWishlistPage();
  initAccountPage();
  initSearchPage();
  initContactPage();
  updateCartBadges();

  // Quick view modal close
  document.getElementById('quick-view-modal')?.addEventListener('click', e => { if (e.target === document.getElementById('quick-view-modal')) closeQuickView(); });
  document.getElementById('qv-close')?.addEventListener('click', closeQuickView);

  // Keyboard close for overlays
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeQuickView();
      document.getElementById('nav-search-overlay')?.classList.remove('open');
    }
  });
});
