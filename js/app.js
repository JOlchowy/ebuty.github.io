document.addEventListener('DOMContentLoaded', () => {
    let cartItems = [];

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

    function addToCart(product) {
        const existingItem = cartItems.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            product.quantity = 1;
            cartItems.push(product);
        }
        saveCartToLocalStorage();
    }

    loadCartFromLocalStorage();

    const products = [
        {
            id: 1,
            name: 'Nike Air Max',
            price: 349.99,
            img: 'img/nike-air-max.jpg'
        },
        {
            id: 2,
            name: 'Adidas Ultraboost',
            price: 399.99,
            img: 'img/adidas-ultraboost.jpg'
        },
        {
            id: 3,
            name: 'Puma RS',
            price: 299.99,
            img: 'img/puma-rs.jpg'
        },
        {
            id: 4,
            name: 'New Balance 574',
            price: 279.99,
            img: 'img/new-balance-574.jpg'
        },
        {
            id: 5,
            name: 'Reebok Classic',
            price: 259.99,
            img: 'img/reebok-classic.jpg'
        },
    ];

    const featuredContainer = document.getElementById('featured-products');

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-card');
        productDiv.innerHTML = `
      <img src="${product.img}"/>
      <h3>${product.name}</h3>
      <p>${product.price} zł</p>
      <button class="add-to-cart-btn" data-name="${product.name}" data-price="${product.price}">
        Dodaj do koszyka
      </button>
    `;
        featuredContainer.appendChild(productDiv);
    });

    featuredContainer.addEventListener('click', (mouseClick) => {
        if (mouseClick.target.classList.contains('add-to-cart-btn')) {
            const productName = mouseClick.target.dataset.name;
            const productPrice = parseFloat(mouseClick.target.dataset.price);

            const newProduct = {
                name: productName,
                price: productPrice
            };
            addToCart(newProduct);

            alert(`Dodano produkt ${productName} do koszyka!`);
        }
    });
});
