// ======== CART SYSTEM ========
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(name, price) {
  let cart = getCart();
  let existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  saveCart(cart);
  alert(`${name} ditambahkan ke keranjang.`);
}

function removeFromCart(name) {
  let cart = getCart().filter(item => item.name !== name);
  saveCart(cart);
  renderCart();
}

function updateCartCount() {
  let count = getCart().reduce((a, b) => a + b.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = count);
}

function renderCart() {
  const container = document.getElementById('cartItems');
  if (!container) return;

  const cart = getCart();
  if (cart.length === 0) {
    container.innerHTML = "<p>Keranjang kosong.</p>";
    document.getElementById('cartTotal').textContent = "Total: Rp0";
    return;
  }

  let total = 0;
  container.innerHTML = cart.map(item => {
    total += item.price * item.qty;
    return `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>Qty: ${item.qty}</span>
        <span>Rp${item.price * item.qty}</span>
        <button class="btn btn-outline small" onclick="removeFromCart('${item.name}')">Hapus</button>
      </div>
    `;
  }).join('');

  document.getElementById('cartTotal').textContent = "Total: Rp" + total.toLocaleString();
}
function sendChat(){
  const input = document.getElementById("chatInput");
  const box = document.querySelector(".messages");
  if(!input || !box) return;
  const txt = input.value.trim();
  if(txt === "") return;
  const el = document.createElement("div");
  el.className = "msg out";
  el.textContent = txt;
  box.appendChild(el);
  input.value = "";
  box.scrollTop = box.scrollHeight;
  // fake reply
  setTimeout(()=>{
    const r = document.createElement("div");
    r.className = "msg in";
    r.textContent = "Terima kasih! Kami akan membalas segera.";
    box.appendChild(r);
    box.scrollTop = box.scrollHeight;
  }, 700);
}
function goToPayment() {
  if (getCart().length === 0) {
    alert("Keranjang masih kosong!");
  } else {
    window.location.href = "payment.html";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCart();
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    if (navLinks && navLinks.classList.contains('active')) {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    }
  });
});
