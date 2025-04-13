// Productos de muestra
const products = [
    {
        id: 1,
        name: "Runner Pro 2025",
        price: 129.99,
        category: "running",
        rating: 4.8,
        image: "img/taba1.png"
    },
    {
        id: 2,
        name: "Urban Comfort X",
        price: 89.99,
        category: "casual",
        rating: 4.5,
        image: "/api/placeholder/250/220"
    },
    {
        id: 3,
        name: "Basketball Elite",
        price: 149.99,
        category: "deportivas",
        rating: 4.9,
        image: "/api/placeholder/250/220"
    },
    {
        id: 4,
        name: "Trail Runner Extreme",
        price: 159.99,
        category: "running",
        rating: 4.7,
        image: "/api/placeholder/250/220"
    },
    {
        id: 5,
        name: "Classic Lifestyle",
        price: 79.99,
        category: "casual",
        rating: 4.6,
        image: "/api/placeholder/250/220"
    },
    {
        id: 6,
        name: "Tennis Pro Tour",
        price: 119.99,
        category: "deportivas",
        rating: 4.8,
        image: "/api/placeholder/250/220"
    },
    {
        id: 7,
        name: "Marathon Master",
        price: 139.99,
        category: "running",
        rating: 4.9,
        image: "/api/placeholder/250/220"
    },
    {
        id: 8,
        name: "Street Fashion",
        price: 99.99,
        category: "casual",
        rating: 4.5,
        image: "/api/placeholder/250/220"
    },
    {
        id: 9,
        name: "Ivano Low Brisk",
        price: 179.99,
        category: "casual",
        rating: 4.5,
        image: "/api/placeholder/250/220"
    },
    {
        id: 10,
        name: "SIvano Low Brisk Black",
        price: 179.99,
        category: "casual",
        rating: 4.5,
        image: "/api/placeholder/250/220"
    },
    {
        id: 11,
        name: "Running Ultra Free 3.0",
        price: 149.99,
        category: "deportivas",
        rating: 4.5,
        image: "/api/placeholder/250/220"
    },
    {
        id: 12,
        name: "Running Shoes",
        price: 19.99,
        category: "running",
        rating: 4.5,
        image: "/api/placeholder/250/220"
    }
];

// Carrito
let cart = [];

// DOM Elements
const productContainer = document.getElementById('productContainer');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeModal = document.getElementById('closeModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const filterButtons = document.querySelectorAll('.filter-btn');

// Mostrar productos
function displayProducts(category = 'all') {
    productContainer.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        
        // Generar estrellas de rating
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(product.rating)) {
                stars += '★';
            } else if (i - 0.5 <= product.rating) {
                stars += '½';
            } else {
                stars += '☆';
            }
        }
        
        productElement.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">€${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
                    <div class="rating">${stars} <span>(${product.rating})</span></div>
                </div>
            </div>
        `;
        
        productContainer.appendChild(productElement);
    });
    
    // Añadir listeners a los botones de añadir al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            addToCart(parseInt(this.getAttribute('data-id')));
        });
    });
}

// Añadir producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        
        updateCartCount();
        showAddedToCartNotification(product.name);
    }
}

// Mostrar notificación de producto añadido
function showAddedToCartNotification(productName) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '1000';
    notification.textContent = `¡${productName} añadido al carrito!`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 2000);
}

// Actualizar contador del carrito
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Renderizar items del carrito
function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Tu carrito está vacío</p>';
        cartTotal.textContent = '€0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('modal-product');
        
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>€${item.price.toFixed(2)} x ${item.quantity}</p>
                <p>Total: €${itemTotal.toFixed(2)}</p>
            </div>
        `;
        
        cartItems.appendChild(itemElement);
    });
    
    cartTotal.textContent = `€${total.toFixed(2)}`;
}

// Event Listeners
cartIcon.addEventListener('click', () => {
    renderCartItems();
    cartModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remover clase active de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Añadir clase active al botón clickeado
        this.classList.add('active');
        // Filtrar productos
        displayProducts(this.getAttribute('data-filter'));
    });
});

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
});

// Animación de desplazamiento suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});