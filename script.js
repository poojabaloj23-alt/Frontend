// Single script that powers products, featured, wishlist and cart pages.

const products = [
  { id:1, name:"iPhone 14 Pro", price:999, image:"https://tse3.mm.bing.net/th/id/OIP.HXxAENZSawEIUNTRZZHLQwHaJM?pid=Api&P=0&h=180", description:"Apple iPhone 14 Pro — 128GB" },
  { id:2, name:"MacBook Air M2", price:1299, image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80", description:"Apple MacBook Air with M2 chip" },
  { id:3, name:"Sony WH-1000XM4 Headphones", price:349, image:"https://tse1.mm.bing.net/th/id/OIP.5h8sVu0_tn5aJt0LrGWOBwHaHa?pid=Api&P=0&h=180", description:"Sony WH1000XM4 Wireless Noise-Cancelling Headphones"},
  { id:4, name:"Samsung 4K Smart TV", price:799, image:"https://tse1.mm.bing.net/th/id/OIP.u10XKPhTk59nswaOskJS0AHaE8?pid=Api&P=0&h=180", description:"Samsung UHD Smart TV 55\"" },
  { id:5, name:"Gaming Mouse RGB", price:49, image:"https://tse2.mm.bing.net/th/id/OIP.lER3YZebzgAqm9sp2AA1kwHaHa?pid=Api&P=0&h=180", description:"Ergonomic gaming mouse with RGB" },
  { id:6, name:"Canon DSLR Camera", price:599, image:"https://tse3.mm.bing.net/th/id/OIP.W1NckwfPbq4yKyKBGOZ_NgHaHa?pid=Api&P=0&h=180", description:"Canon EOS series DSLR" },
  { id:7, name:"ear buds", price:899, image:"https://tse1.mm.bing.net/th/id/OIP.sAhg1nUyzhy8GssySD3_DAHaIC?pid=Api&P=0&h=180", description:"Wireless ear buds with charging case" },
  { id:8, name:"chair", price:568, image:"https://tse3.mm.bing.net/th/id/OIP.K7xcTHl-nGjUnD9ZOpePFgHaHa?pid=Api&P=0&h=180", description:"Erogonomic office chair" },
  { id:9, name:"Refrigerator", price:1988, image:"https://tse4.mm.bing.net/th/id/OIP.I8cgv6y1f1R2OcGOHwo9GQHaHa?pid=Api&P=0&h=180", description:"Double door fridge with freezer" },
  { id:10, name:"cooler", price:5000, image:"https://tse1.mm.bing.net/th/id/OIP.mdTCMuCQzw-WX5pnefHIsQHaHa?pid=Api&P=0&h=180", description:"High capacity air cooler" }
];

let filtered = [...products];

// helpers
function el(id){return document.getElementById(id)}
function formatPrice(n){return Number(n).toFixed(2)}
function fallbackImg(ev){ ev.target.onerror=null; ev.target.src='https://via.placeholder.com/400x300?text=Product+Image' }

// Render list of product objects into container (card layout)
function renderList(containerId, list){
  const container = el(containerId);
  if(!container) return;
  if(!list || list.length===0){
    container.innerHTML = '';
    const no = el('no-products');
    if(no) no.style.display = 'block';
    return;
  }
  if(el('no-products')) el('no-products').style.display='none';https://tse3.mm.bing.net/th/id/OIP.W1NckwfPbq4yKyKBGOZ_NgHaHa?pid=Api&P=0&h=180
  container.innerHTML = list.map(p=>`
    <article class="product-card">
      <img src="${p.image}" alt="${escapeHtml(p.name)}" onerror="this.onerror=null;this.src='https://via.placeholder.com/400x300?text=Product+Image'">
      <h3>${escapeHtml(p.name)}</h3>
      <div class="price">$${formatPrice(p.price)}</div>
      <div class="desc">${escapeHtml(p.description||'')}</div>
      <div class="actions">
        <button onclick="viewProduct(${p.id})">View</button>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
        <button onclick="addToWishlist(${p.id})">♡</button>
      </div>
    </article>
  `).join('');
}

// Featured on homepage
function displayFeaturedProducts(){
  const featured = products.slice(0,4);
  renderList('featured-products', featured);
}

// Products page
function initProductsPage(){
  filtered = [...products];
  renderList('product-list', filtered);
}

// Search and sort
function searchProducts(){
  const q = (el('search-box')?.value||'').trim().toLowerCase();
  filtered = products.filter(p => p.name.toLowerCase().includes(q) || (p.description||'').toLowerCase().includes(q));
  renderList('product-list', filtered);
}
function sortProducts(){
  const v = el('sort-select')?.value;
  if(!v) return;
  if(v==='price-low') filtered.sort((a,b)=>a.price-b.price);
  else if(v==='price-high') filtered.sort((a,b)=>b.price-a.price);
  else if(v==='name') filtered.sort((a,b)=>a.name.localeCompare(b.name));
  else filtered = [...products];
  renderList('product-list', filtered);
}

// Product detail page
function viewProduct(id){
  // navigate to product.html?id=...
  const target = `product.html?id=${id}`;
  if(location.pathname.endsWith('product.html')) {
    // if we are on product page just render
    renderProductDetail(id);
  } else {
    location.href = target;
  }
}
function getQueryParam(name){
  const params = new URLSearchParams(location.search);
  return params.get(name);
}
function renderProductDetail(id){
  const pid = Number(id);
  const p = products.find(x=>x.id===pid);
  const container = el('product-detail');
  if(!container) return;
  if(!p){
    container.innerHTML = '<div class="empty-message">Product not found.</div>';
    return;
  }
  container.innerHTML = `
    <div class="product-detail">
      <div>
        <img src="${p.image}" alt="${escapeHtml(p.name)}" onerror="this.onerror=null;this.src='https://via.placeholder.com/600x400?text=Product+Image'">
      </div>
      <div>
        <h2>${escapeHtml(p.name)}</h2>
        <p class="price">$${formatPrice(p.price)}</p>
        <p>${escapeHtml(p.description)}</p>
        <div style="margin-top:12px">
          <button class="btn" onclick="addToCart(${p.id})">Add to cart</button>
          <button class="btn" style="margin-left:8px" onclick="addToWishlist(${p.id})">Add to wishlist</button>
        </div>
      </div>
    </div>
  `;
}

// Cart & wishlist (localStorage)
function readCart(){ return JSON.parse(localStorage.getItem('cart')||'[]') }
function writeCart(v){ localStorage.setItem('cart', JSON.stringify(v)) }
function readWishlist(){ return JSON.parse(localStorage.getItem('wishlist')||'[]') }
function writeWishlist(v){ localStorage.setItem('wishlist', JSON.stringify(v)) }

function addToCart(id){
  const p = products.find(x=>x.id===id); if(!p) return;
  const cart = readCart();
  const item = cart.find(i=>i.id===id);
  if(item) item.quantity = (item.quantity||1)+1;
  else cart.push({ id:p.id, name:p.name, price:p.price, image:p.image, quantity:1 });
  writeCart(cart);
  toast(`${p.name} added to cart`);
  updateCartDisplay(); // if on cart page refresh
}

function addToWishlist(id){
  const p = products.find(x=>x.id===id); if(!p) return;
  const wl = readWishlist();
  if(!wl.find(i=>i.id===id)) wl.push({ id:p.id, name:p.name, price:p.price, image:p.image });
  writeWishlist(wl);
  toast(`${p.name} added to wishlist`);
  updateWishlistDisplay();
}

// Cart rendering on cart.html
function updateCartDisplay(){
  const container = el('cart-items');
  const empty = el('empty-cart');
  const summary = el('cart-summary');
  if(!container) return;
  const cart = readCart();
  if(cart.length===0){
    container.innerHTML=''; if(empty) empty.style.display='block'; if(summary) summary.style.display='none'; return;
  }
  if(empty) empty.style.display='none';
  if(summary) summary.style.display='block';
  container.innerHTML = cart.map((it, idx)=>`
    <div class="cart-item">
      <img src="${it.image}" alt="${escapeHtml(it.name)}" onerror="this.onerror=null;this.src='https://via.placeholder.com/100x80?text=Product'">
      <div style="flex:1">
        <h4>${escapeHtml(it.name)}</h4>
        <div class="cart-item-price">$${formatPrice(it.price)}</div>
        <div class="quantity-control">
          <button onclick="changeQuantity(${idx}, -1)">-</button>
          <span>${it.quantity}</span>
          <button onclick="changeQuantity(${idx}, 1)">+</button>
        </div>
      </div>
      <div>
        <button onclick="removeFromCart(${idx})" class="btn" style="background:${'#e74c3c'}">Remove</button>
      </div>
    </div>
  `).join('');
  updateCartSummary();
}
function changeQuantity(index, delta){
  const cart = readCart();
  if(!cart[index]) return;
  cart[index].quantity = (cart[index].quantity||1) + delta;
  if(cart[index].quantity < 1) cart.splice(index,1);
  writeCart(cart);
  updateCartDisplay();
}
function removeFromCart(index){
  const cart = readCart();
  if(!cart[index]) return;
  const name = cart[index].name;
  cart.splice(index,1);
  writeCart(cart);
  updateCartDisplay();
  toast(`${name} removed from cart`);
}
function updateCartSummary(){
  const cart = readCart();
  const subtotal = cart.reduce((s,i)=>s + i.price*(i.quantity||1),0);
  const shipping = cart.length>0 ? 10 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  if(el('subtotal')) el('subtotal').textContent = `$${formatPrice(subtotal)}`;
  if(el('shipping')) el('shipping').textContent = `$${formatPrice(shipping)}`;
  if(el('tax')) el('tax').textContent = `$${formatPrice(tax)}`;
  if(el('total')) el('total').textContent = `$${formatPrice(total)}`;
}
function proceedToCheckout(){ const cart = readCart(); if(cart.length===0){ toast('Cart empty'); return } toast('Proceed to checkout (demo)'); setTimeout(()=>alert('Checkout demo'),400) }

// Wishlist rendering
function updateWishlistDisplay(){
  const container = el('wishlist-items');
  const empty = el('empty-wishlist');
  if(!container) return;
  const wl = readWishlist();
  if(wl.length===0){ container.innerHTML=''; if(empty) empty.style.display='block'; return; }
  if(empty) empty.style.display='none';
  container.innerHTML = wl.map(item=>`
    <div class="product-card">
      <img src="${item.image}" alt="${escapeHtml(item.name)}" onerror="this.onerror=null;this.src='https://via.placeholder.com/250x200?text=Product'">
      <h3>${escapeHtml(item.name)}</h3>
      <div class="price">$${formatPrice(item.price)}</div>
      <div class="actions">
        <button onclick="addToCart(${item.id})">Add to Cart</button>
        <button onclick="removeFromWishlist(${item.id})">Remove</button>
      </div>
    </div>
  `).join('');
}
function removeFromWishlist(id){
  let wl = readWishlist();
  const item = wl.find(x=>x.id===id);
  wl = wl.filter(x=>x.id!==id);
  writeWishlist(wl);
  updateWishlistDisplay();
  toast(`${item?.name||'Item'} removed`);
}

// tiny utilities
function toast(msg){ const d=document.createElement('div'); d.textContent=msg; d.style.cssText='position:fixed;right:20px;bottom:20px;background:#333;color:#fff;padding:8px 12px;border-radius:6px;z-index:9999;'; document.body.appendChild(d); setTimeout(()=>d.remove(),2200) }
function escapeHtml(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;') }

// Initialization based on DOM presence
document.addEventListener('DOMContentLoaded', ()=>{
  if(el('featured-products')) displayFeaturedProducts();
  if(el('product-list')) initProductsPage();
  if(el('product-detail')){
    const id = getQueryParam('id');
    if(id) renderProductDetail(id);
    else el('product-detail').innerHTML = '<div class="empty-message">No product selected.</div>';
  }
  if(el('cart-items')) updateCartDisplay();
  if(el('wishlist-items')) updateWishlistDisplay();

});

