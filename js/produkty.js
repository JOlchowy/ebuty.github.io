document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('products-grid');

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

    productsGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const priceElement = e.target.previousElementSibling;
            const rawPrice = priceElement.innerText.replace(' zł', '');
            const productPrice = parseFloat(rawPrice);

            const productName = e.target.dataset.name;

            const newProduct = {
                name: productName,
                price: productPrice
            };

            addToCart(newProduct);

            alert(`Dodano produkt: ${productName} do koszyka!`);
        }
    });
});
