const foods = [
  { id: 1, name: "Veg Burger + Fries", canteen: "Main Canteen", price: 99, img: "https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=400" },
  { id: 2, name: "Chai & Samosa Combo", canteen: "Chai Tapri", price: 49, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400" },
  { id: 3, name: "Veg Biryani", canteen: "Hostel Mess", price: 129, img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400" },
  { id: 4, name: "Cold Coffee", canteen: "Juice Center", price: 60, img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400" },
  { id: 5, name: "Masala Dosa", canteen: "South Indian", price: 80, img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400" },
  { id: 6, name: "Chicken Roll", canteen: "Main Canteen", price: 110, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400" },
];
let cart = []; let isLoggedIn = false;

function showToast(msg){ const t=document.getElementById('toast'); t.innerText=msg; t.style.display='block'; setTimeout(()=>t.style.display='none',3000); }

function displayFoods(list){ const c=document.getElementById('food-container'); c.innerHTML=""; list.forEach(f=>{ c.innerHTML+=`<div class="card"><img src="${f.img}"><div class="card-body"><h4>${f.name}</h4><p>${f.canteen}</p><div class="card-footer"><span class="price">₹${f.price}</span><button class="add-btn" onclick="addToCart(${f.id})">Add +</button></div></div></div>`; }); }

function addToCart(id){ if(!isLoggedIn){ document.getElementById('loginModal').style.display='flex'; showToast("Pehle Login karo bhai!"); return; } cart.push(foods.find(f=>f.id===id)); document.getElementById('cart-count').innerText=cart.length; showToast("Added to Cart 🛒"); }

document.getElementById('cartBtn').onclick=()=>{ document.getElementById('cartModal').style.display='flex'; let h=""; let total=0; cart.forEach(i=>{h+=`<p>${i.name} - ₹${i.price}</p>`; total+=i.price;}); document.getElementById('cart-items').innerHTML=h||"Cart empty"; document.getElementById('total-price').innerText=`Total: ₹${total}`; };
document.getElementById('closeCart').onclick=()=>document.getElementById('cartModal').style.display='none';
document.getElementById('loginBtn').onclick=()=>document.getElementById('loginModal').style.display='flex';

function doLogin(){ let id=document.getElementById('studentId').value; if(id.length<3) return showToast("Sahi ID daalo"); isLoggedIn=true; document.getElementById('loginModal').style.display='none'; document.getElementById('loginBtn').innerText="✅ "+id; showToast("Welcome "+id+"!"); document.getElementById('hero-text').innerText=`Welcome ${id}, Craving? We Deliver in 15 Mins!`; }

function placeOrder(){
  if(cart.length===0) return showToast("Cart empty hai");
  document.getElementById('cartModal').style.display='none';
  document.getElementById('trackModal').style.display='flex';
  let total=cart.reduce((s,i)=>s+i.price,0);
  document.getElementById('orderIdText').innerText="Order ID: #CAMPUS"+Math.floor(Math.random()*90000+10000);
  document.getElementById('bill').innerHTML=`<hr style="margin:15px 0"><p><b>Total Paid: ₹${total}</b> (UPI)</p><p style="font-size:12px;color:#777">Delivery: Hostel Block A - Room 101</p><br><img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=CampusEats${total}" />`;
  
  // Tracking Animation - shocked effect
  setTimeout(()=>{ document.getElementById('track-progress').style.width="35%"; document.getElementById('step2').style.color="#ff4d00"; },1000);
  setTimeout(()=>{ document.getElementById('track-progress').style.width="70%"; document.getElementById('step3').style.color="#ff4d00"; },3000);
  setTimeout(()=>{ document.getElementById('track-progress').style.width="100%"; document.getElementById('step4').style.color="green"; showToast("Delivered! Enjoy your food 🔥"); },5000);
}
document.getElementById('search').addEventListener('input',(e)=>{ let v=e.target.value.toLowerCase(); displayFoods(foods.filter(f=>f.name.toLowerCase().includes(v))); });
displayFoods(foods);