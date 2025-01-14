document.addEventListener('DOMContentLoaded', () => {
    let cartItems = [];

    const cartContainer = document.getElementById('cart-container');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    function loadCartFromLocalStorage() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cartItems = JSON.parse(storedCart);
        } else {
            cartItems = [];
        }
    }

    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    function removeFromCart(productName) {
        const index = cartItems.findIndex(item => item.name === productName);
        if (index !== -1) {
            cartItems.splice(index, 1);
            saveCartToLocalStorage();
            renderCart();
        }
    }

    function updateQuantity(productName, newQty) {
        const item = cartItems.find(i => i.name === productName);
        if (item) {
            item.quantity = parseInt(newQty, 10);
            if (item.quantity < 1) {
                item.quantity = 1;
            }
        }
        saveCartToLocalStorage();
        renderCart();
    }

    function renderCart() {
        cartContainer.innerHTML = '';

        let totalCount = 0;
        let totalPrice = 0;

        cartItems.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${item.price} zł</div>
        </div>
        <div class="cart-item-quantity">
          <label>Ilość:</label>
          <input 
            type="number" 
            min="1" 
            value="${item.quantity}" 
            class="quantity-input"
            data-name="${item.name}"
          />
        </div>
        <button class="remove-btn" data-name="${item.name}">Usuń</button>
      `;

            cartContainer.appendChild(cartItemDiv);

            totalCount += item.quantity;
            totalPrice += item.price * item.quantity;
        });

        cartCount.textContent = totalCount;
        cartTotal.textContent = totalPrice.toFixed(2);
    }

    cartContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const productName = e.target.dataset.name;
            removeFromCart(productName);
        }
    });

    cartContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('quantity-input')) {
            const productName = e.target.dataset.name;
            const newQty = e.target.value;
            updateQuantity(productName, newQty);
        }
    });

    loadCartFromLocalStorage();
    renderCart();
});
