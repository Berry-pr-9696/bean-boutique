// cart.js

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.querySelector('.cart-count');
  if (badge) {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();

  // Add to Cart
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      let cart = getCart();

      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      saveCart(cart);
      
      const originalText = button.textContent;
      button.textContent = 'Added! ✓';
      button.style.backgroundColor = '#4CAF50';
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
      }, 1500);
    });
  });

  // Cart Page Logic
  if (document.getElementById('cartTable')) {
    displayCart();
  }
});

function displayCart() {
  const cart = getCart();
  const tbody = document.querySelector('#cartTable tbody');
  const emptyState = document.getElementById('emptyCartState');
  tbody.innerHTML = '';
  let grandTotal = 0;

  if (cart.length === 0) {
    document.getElementById('cartTable').style.display = 'none';
    document.getElementById('grandTotal').style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
    return;
  } else {
    document.getElementById('cartTable').style.display = 'table';
    document.getElementById('grandTotal').style.display = 'block';
    if (emptyState) emptyState.style.display = 'none';
  }

  cart.forEach((item, index) => {
    const total = item.price * item.quantity;
    grandTotal += total;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <button onclick="updateQuantity(${index}, -1)" style="padding: 4px 10px; cursor:pointer;">−</button>
        <span style="margin: 0 10px;">${item.quantity}</span>
        <button onclick="updateQuantity(${index}, 1)" style="padding: 4px 10px; cursor:pointer;">+</button>
      </td>
      <td>$${total.toFixed(2)}</td>
      <td><button onclick="removeItem(${index})" style="color: red; background: none; border: none; cursor: pointer; text-decoration: underline;">Remove</button></td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById('grandTotal').textContent = `Total: $${grandTotal.toFixed(2)}`;
}

function updateQuantity(index, change) {
  const cart = getCart();
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart(cart);
  displayCart();
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  displayCart();
}