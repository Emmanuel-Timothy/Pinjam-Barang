
// Basic interactions for PinjamBarang prototype
let cart = JSON.parse(localStorage.getItem("pb_cart") || "[]");
function updateCartBadge(){
  const el = document.getElementById("cartCount");
  if(!el) return;
  el.textContent = cart.length;
}
function addToCart(name){
  cart.push(name);
  localStorage.setItem("pb_cart", JSON.stringify(cart));
  updateCartBadge();
  alert(name + " ditambahkan ke keranjang! 🛒");
}
function fakeLogin(form){
  form.addEventListener('submit', e=>{
    e.preventDefault();
    // Immediately "log in"
    localStorage.setItem("pb_user","user_prototype");
    window.location.href = "pinjam.html";
  });
}
function fakeSignup(form){
  form.addEventListener('submit', e=>{
    e.preventDefault();
    localStorage.setItem("pb_user","new_user");
    window.location.href = "pinjam.html";
  });
}
function loadCartPage(){
  const cont = document.getElementById("cart");
  const items = JSON.parse(localStorage.getItem("pb_cart") || "[]");
  if(!cont) return;
  if(items.length === 0) cont.innerHTML = "<p>Keranjang kosong.</p>";
  else cont.innerHTML = "<ul>" + items.map(i=>"<li>"+i+"</li>").join("") + "</ul>";
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
window.addEventListener('load', ()=>{
  updateCartBadge();
  const loginForm = document.getElementById("loginForm");
  if(loginForm) fakeLogin(loginForm);
  const signupForm = document.getElementById("signupForm");
  if(signupForm) fakeSignup(signupForm);
  loadCartPage();
});
