// ================================
// CONFIGURATION
// ================================
const WHATSAPP_NUMBER = "919894252352"; // Must be country code + number without plus or spaces

// ================================
// PRODUCT DATA - EDIT PRODUCTS HERE
// ================================
const products = [
    { id: 1, name: "Goat Milk Soap", category: "Soaps", price: 150, image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=600&auto=format&fit=crop", description: "Handcrafted Goat Milk Soap. Gentle Exfoliation, Deep Moisture, Soothing Care.", benefits: ["Gentle Exfoliation", "Deep Moisture"], status: "Available", usage: "For external use only." },
    { id: 2, name: "Kuppaimeni Soap", category: "Soaps", price: 150, image: "https://images.unsplash.com/photo-1556228720-1c27bef1bb23?q=80&w=600&auto=format&fit=crop", description: "Herbal Kuppaimeni Soap. Treats Acne & Pimples, Soothes Skin Irritation.", benefits: ["Treats Acne", "Deep Pore Cleansing"], status: "Available", usage: "For external use only." },
    { id: 3, name: "Kadukkai Soap", category: "Soaps", price: 150, image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=600&auto=format&fit=crop", description: "Natural Kadukkai Soap. Purifies & Cleanses, Tightens Pores.", benefits: ["Purifies & Cleanses", "Even Skin Tone"], status: "Available", usage: "For external use only." },
    { id: 4, name: "Manjistha Soap", category: "Soaps", price: 150, image: "https://images.unsplash.com/photo-1608248593842-83b0f5904033?q=80&w=600&auto=format&fit=crop", description: "Rich in Antioxidants. Detoxifies & Purifies, Reduces Acne.", benefits: ["Detoxifies", "Accelerates Skin Repair"], status: "Available", usage: "For external use only." },
    { id: 5, name: "Nalangu Maavu Soap", category: "Soaps", price: 150, image: "https://images.unsplash.com/photo-1570823616858-3d5f308cecf4?q=80&w=600&auto=format&fit=crop", description: "Traditional Nalangu Maavu Soap. Improves Skin Complexion.", benefits: ["Improves Complexion", "Anti-Acne"], status: "Available", usage: "For external use only." },
    { id: 6, name: "Body Lotion", category: "Body Care", price: 299, image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop", description: "Ultra-moisturizing body lotion for 24-hour hydration and smooth skin.", benefits: ["Intense moisturization", "Softens dry skin"], status: "Available", usage: "Apply generously all over the body." },
    { id: 7, name: "Moisturizer", category: "Skin Care", price: 250, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop", description: "Daily face moisturizer to keep your skin hydrated and glowing naturally.", benefits: ["Deep Hydration", "Non-greasy"], status: "Available", usage: "Apply on clean face daily." },
    { id: 8, name: "Aloe Vera Gel", category: "Skin Care", price: 199, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop", description: "Pure, natural aloe vera gel for everyday skin hydration and soothing care.", benefits: ["Refreshing and cooling", "Soothes irritated skin"], status: "Available", usage: "Apply a small amount to skin." },
    { id: 9, name: "Herbal Hair Oil", category: "Hair Care", price: 349, image: "https://images.unsplash.com/photo-1608280633857-79b8a82d02c9?q=80&w=600&auto=format&fit=crop", description: "Nourishing herbal hair oil to promote hair growth and control hair fall.", benefits: ["Controls hair fall", "Stimulates growth"], status: "Available", usage: "Massage into scalp and hair roots." },
    { id: 10, name: "Lip Balm Strawberry", category: "Lip Care", price: 99, image: "https://images.unsplash.com/photo-1629731671587-c1285cb15be9?q=80&w=600&auto=format&fit=crop", description: "Natural strawberry lip balm for soft, pink, and moisturized lips.", benefits: ["Heals chapped lips", "Natural strawberry tint"], status: "Available", usage: "Apply gently on lips." },
    { id: 11, name: "Lip Balm Rose", category: "Lip Care", price: 99, image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=600&auto=format&fit=crop", description: "Natural rose lip balm to nourish and protect dry lips with a soft floral scent.", benefits: ["Long-lasting moisture", "Softens lips"], status: "Available", usage: "Apply gently on lips." }
];

// ================================
// APPLICATION LOGIC
// ================================

// State
let cart = JSON.parse(localStorage.getItem('rtn_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('rtn_wishlist')) || [];
let activeCategory = 'All';
let searchQuery = '';

// DOM Elements
const productGrid = document.getElementById('productGrid');
const categoryFilters = document.getElementById('categoryFilters');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');
const modal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

// Cart & Wishlist Elements
const cartToggle = document.getElementById('cartToggle');
const wishlistToggle = document.getElementById('wishlistToggle');
const cartSidebar = document.getElementById('cartSidebar');
const wishlistSidebar = document.getElementById('wishlistSidebar');
const closeCart = document.getElementById('closeCart');
const closeWishlist = document.getElementById('closeWishlist');
const cartItemsContainer = document.getElementById('cartItems');
const wishlistItemsContainer = document.getElementById('wishlistItems');
const cartTotalElement = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const cartBadge = document.getElementById('cartBadge');
const wishlistBadge = document.getElementById('wishlistBadge');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    updateBadges();
    renderCart();
    renderWishlist();
    setupEventListeners();
    
    if (document.getElementById('singleProductContainer')) {
        renderSingleProduct();
    }
    
    if (document.getElementById('productGrid')) {
        initCategories();
        renderProducts();
    }
});

// Utilities
const formatPrice = (price) => `₹${price}`;

const saveState = () => {
    localStorage.setItem('rtn_cart', JSON.stringify(cart));
    localStorage.setItem('rtn_wishlist', JSON.stringify(wishlist));
    updateBadges();
    if (document.getElementById('productGrid')) renderProducts();
    if (document.getElementById('singleProductContainer')) renderSingleProduct();
};

// State Modifiers
window.addToCart = (id, event) => {
    if(event) event.stopPropagation();
    const product = products.find(p => p.id === id);
    if(product.status === 'Out of Stock') {
        alert('Sorry, this product is currently out of stock.');
        return;
    }
    
    const existingItem = cart.find(item => item.id === id);
    if(existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ id: id, qty: 1 });
    }
    
    saveState();
    renderCart();
    

};

window.removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    saveState();
    renderCart();
};

window.updateQty = (id, change) => {
    const item = cart.find(item => item.id === id);
    if(item) {
        item.qty += change;
        if(item.qty <= 0) {
            removeFromCart(id);
        } else {
            saveState();
            renderCart();
        }
    }
};

window.toggleWishlist = (id, event) => {
    if(event) event.stopPropagation();
    if(wishlist.includes(id)) {
        wishlist = wishlist.filter(itemId => itemId !== id);
    } else {
        wishlist.push(id);
    }
    saveState();
    renderWishlist();
};

const updateBadges = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartBadge.textContent = totalItems;
    wishlistBadge.textContent = wishlist.length;
};

// UI Renderers
const renderCart = () => {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    if(cart.length === 0) {
        cartItemsContainer.innerHTML = `<div class="empty-state"><i class="fa-solid fa-cart-shopping" style="font-size: 3rem; margin-bottom: 16px; opacity: 0.5;"></i><p>Your cart is empty.</p></div>`;
    } else {
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if(!product) return;
            
            total += product.price * item.qty;
            
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="item-img">
                <div class="item-details">
                    <div class="item-title">${product.name}</div>
                    <div class="item-price">${formatPrice(product.price)}</div>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                        <span class="qty-text">${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(div);
        });
    }
    cartTotalElement.textContent = formatPrice(total);
};

const renderWishlist = () => {
    wishlistItemsContainer.innerHTML = '';
    
    if(wishlist.length === 0) {
        wishlistItemsContainer.innerHTML = `<div class="empty-state"><i class="fa-regular fa-heart" style="font-size: 3rem; margin-bottom: 16px; opacity: 0.5;"></i><p>Your wishlist is empty.</p></div>`;
    } else {
        wishlist.forEach(id => {
            const product = products.find(p => p.id === id);
            if(!product) return;
            
            const div = document.createElement('div');
            div.className = 'wishlist-item';
            div.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="item-img">
                <div class="item-details">
                    <div class="item-title">${product.name}</div>
                    <div class="item-price">${formatPrice(product.price)}</div>
                    <div style="margin-top: auto; display: flex; gap: 8px;">
                        <button class="btn btn-primary" style="padding: 4px 12px; font-size: 0.8rem;" onclick="addToCart(${product.id})">Add to Cart</button>
                        <button class="remove-btn" style="margin-left: auto;" onclick="toggleWishlist(${product.id})"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `;
            wishlistItemsContainer.appendChild(div);
        });
    }
};

const initCategories = () => {
    if (!categoryFilters) return;
    const categories = ['All', ...new Set(products.map(p => p.category))];
    categoryFilters.innerHTML = '';
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `filter-btn ${cat === 'All' ? 'active' : ''}`;
        btn.dataset.filter = cat;
        btn.textContent = cat === 'All' ? 'All Products' : cat;
        
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            activeCategory = cat;
            renderProducts();
        });
        categoryFilters.appendChild(btn);
    });
};

const renderProducts = () => {
    if (!productGrid) return;
    
    const filteredProducts = products.filter(p => {
        const matchCategory = activeCategory === 'All' || p.category === activeCategory;
        const searchLower = searchQuery.toLowerCase();
        const matchSearch = p.name.toLowerCase().includes(searchLower) || 
                            p.category.toLowerCase().includes(searchLower) ||
                            p.description.toLowerCase().includes(searchLower);
        return matchCategory && matchSearch;
    });
    
    productGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
        
        filteredProducts.forEach(p => {
            const statusClass = p.status.toLowerCase() === 'available' ? 'status-available' : 'status-outofstock';
            const inWishlist = wishlist.includes(p.id);
            const inCart = cart.some(item => item.id === p.id);
            
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image-container" onclick="viewProduct(${p.id})">
                    <span class="product-category-tag">${p.category}</span>
                    <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${p.name}</h3>
                    <p class="product-desc">${p.description}</p>
                    <div class="product-price-row">
                        <span class="price">${formatPrice(p.price)}</span>
                        ${p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : ''}
                    </div>
                    <div style="margin-bottom: 12px;"><span class="product-status ${statusClass}">${p.status}</span></div>
                    <div class="product-actions" style="margin-top: auto; display: flex; gap: 8px;">
                        <button class="btn btn-outline ${inWishlist ? 'active' : ''}" style="padding: 10px; flex: 0 0 auto;" onclick="toggleWishlist(${p.id}, event)" aria-label="Wishlist">
                            <i class="${inWishlist ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                        </button>
                        <button class="btn ${inCart ? 'btn-secondary' : 'btn-primary'}" style="flex: 1;" onclick="addToCart(${p.id}, event)" ${p.status.toLowerCase() !== 'available' ? 'disabled' : ''}>
                            <i class="fa-solid fa-cart-shopping"></i> ${inCart ? 'Add More' : 'Add Item'}
                        </button>
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }
};

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderProducts();
    });
}

window.viewProduct = (id) => {
    window.location.href = `product.html?id=${id}`;
};

const renderSingleProduct = () => {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const p = products.find(prod => prod.id === id);
    
    const container = document.getElementById('singleProductContainer');
    if (!p) {
        container.innerHTML = `<div class="container" style="padding: 100px 20px; text-align: center;"><h2>Product not found</h2><a href="index.html" class="btn btn-primary" style="margin-top: 20px;">Return to Home</a></div>`;
        return;
    }
    
    const statusClass = p.status.toLowerCase() === 'available' ? 'status-available' : 'status-outofstock';
    const benefitsHtml = p.benefits.map(b => `<li>${b}</li>`).join('');
    const inWishlist = wishlist.includes(p.id);
    const inCart = cart.some(item => item.id === p.id);
    
    document.title = `${p.name} | RTN Natural Skin Care`;
    
    container.innerHTML = `
        <div class="container" style="padding: 60px 20px;">
            <div class="product-single-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start;">
                <div class="product-single-image" style="border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm);">
                    <img src="${p.image}" alt="${p.name}" style="width: 100%; height: auto; display: block; object-fit: cover; aspect-ratio: 1;">
                </div>
                <div class="product-single-info">
                    <nav class="breadcrumb" style="margin-bottom: 16px; color: var(--text-muted); font-size: 0.9rem;">
                        <a href="index.html" style="color: var(--primary-color);">Home</a> &gt; 
                        <span>${p.category}</span> &gt; 
                        <span>${p.name}</span>
                    </nav>
                    
                    <span class="modal-category" style="color: var(--accent-color); font-weight: 600; text-transform: uppercase; font-size: 0.9rem; margin-bottom: 8px; display: block;">${p.category}</span>
                    <h1 style="font-size: 2.5rem; color: var(--primary-color); margin-bottom: 16px;">${p.name}</h1>
                    
                    <div class="modal-price-row" style="padding-bottom: 24px; border-bottom: 1px solid var(--border-color); margin-bottom: 32px; display: flex; align-items: center;">
                        <span class="modal-price" style="font-size: 2rem; font-weight: 700; color: var(--primary-color);">${formatPrice(p.price)}</span>
                        ${p.oldPrice ? `<span class="old-price" style="text-decoration: line-through; color: #9aa39d; font-size: 1.2rem; margin-left: 16px;">${formatPrice(p.oldPrice)}</span>` : ''}
                        <span class="product-status ${statusClass}" style="margin-left: auto; padding: 6px 12px; border-radius: 20px; font-weight: 500; background: ${p.status.toLowerCase() === 'available' ? '#e8f5e9' : '#ffebee'};">${p.status}</span>
                    </div>
                    
                    <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 32px; line-height: 1.8;">${p.description}</p>
                    
                    <div class="modal-benefits" style="margin-bottom: 32px;">
                        <h4 class="modal-section-title" style="font-size: 1.1rem; font-weight: 600; margin-bottom: 12px;">Key Benefits</h4>
                        <ul style="list-style: none; padding: 0;">
                            ${benefitsHtml}
                        </ul>
                    </div>
                    
                    ${p.usage ? `
                    <div style="margin-bottom: 40px;">
                        <h4 class="modal-section-title" style="font-size: 1.1rem; font-weight: 600; margin-bottom: 12px;">How to Use</h4>
                        <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.7;">${p.usage}</p>
                    </div>
                    ` : ''}
                    
                    <div class="product-single-actions" style="display: flex; gap: 16px; margin-top: auto;">
                        <button class="btn btn-outline ${inWishlist ? 'active' : ''}" style="padding: 16px; font-size: 1.2rem; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;" onclick="toggleWishlist(${p.id}, event)">
                            <i class="${inWishlist ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                        </button>
                        <button class="btn ${inCart ? 'btn-secondary' : 'btn-primary'} btn-large" style="flex: 1;" onclick="addToCart(${p.id}, event)" ${p.status.toLowerCase() !== 'available' ? 'disabled' : ''}>
                            <i class="fa-solid fa-cart-shopping"></i> ${inCart ? 'Add More' : 'Add Item'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.innerHTML = `
        @media (max-width: 768px) {
            .product-single-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        .modal-benefits li { position: relative; padding-left: 24px; margin-bottom: 8px; color: var(--text-muted); }
        .modal-benefits li::before { content: '\\f00c'; font-family: 'Font Awesome 6 Free'; font-weight: 900; position: absolute; left: 0; top: 2px; color: var(--primary-color); font-size: 0.9rem; }
    `;
    document.head.appendChild(style);
};

// Setup General Event Listeners
const setupEventListeners = () => {
    // Sidebar toggles
    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        wishlistSidebar.classList.remove('active');
    });
    
    wishlistToggle.addEventListener('click', () => {
        wishlistSidebar.classList.add('active');
        cartSidebar.classList.remove('active');
    });
    
    closeCart.addEventListener('click', () => cartSidebar.classList.remove('active'));
    closeWishlist.addEventListener('click', () => wishlistSidebar.classList.remove('active'));
    
    // Close sidebars on outside click
    cartSidebar.addEventListener('click', (e) => {
        if(e.target === cartSidebar) cartSidebar.classList.remove('active');
    });
    wishlistSidebar.addEventListener('click', (e) => {
        if(e.target === wishlistSidebar) wishlistSidebar.classList.remove('active');
    });

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });
    
    // Sticky Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = 'var(--shadow-sm)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // Checkout via WhatsApp
    checkoutBtn.addEventListener('click', () => {
        if(cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        let message = `Hello RTN Natural Skin Care,\n\nI would like to place an order for the following items:\n\n`;
        let total = 0;
        
        cart.forEach((item, index) => {
            const p = products.find(prod => prod.id === item.id);
            if(p) {
                const lineTotal = p.price * item.qty;
                total += lineTotal;
                message += `${index + 1}. ${p.name}\n   Qty: ${item.qty} x ${formatPrice(p.price)} = ${formatPrice(lineTotal)}\n\n`;
            }
        });
        
        message += `*Total Amount: ${formatPrice(total)}*\n\nPlease confirm availability and payment details.`;
        
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    });
};

window.renderSingleProduct = () => {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const p = products.find(prod => prod.id === id);
    
    const container = document.getElementById('singleProductContainer');
    if (!p) {
        if(container) container.innerHTML = `<div class="container" style="padding: 100px 20px; text-align: center;"><h2>Product not found</h2><a href="index.html" class="btn btn-primary" style="margin-top: 20px;">Return to Home</a></div>`;
        return;
    }
    
    const statusClass = p.status.toLowerCase() === 'available' ? 'status-available' : 'status-outofstock';
    const benefitsHtml = (p.benefits || []).map(b => `<li>${b}</li>`).join('');
    const inWishlist = wishlist.includes(p.id);
    const inCart = cart.some(item => item.id === p.id);
    
    document.title = `${p.name} | RTN Natural Skin Care`;
    
    if(container) {
        container.innerHTML = `
            <div class="container" style="padding: 60px 20px;">
                <div class="product-single-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start;">
                    <div class="product-single-image" style="border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm);">
                        <img src="${p.image}" alt="${p.name}" style="width: 100%; height: auto; display: block; object-fit: cover; aspect-ratio: 1;">
                    </div>
                    <div class="product-single-info">
                        <nav class="breadcrumb" style="margin-bottom: 16px; color: var(--text-muted); font-size: 0.9rem;">
                            <a href="index.html" style="color: var(--primary-color);">Home</a> &gt; 
                            <a href="products.html" style="color: var(--primary-color);">Products</a> &gt; 
                            <span>${p.name}</span>
                        </nav>
                        
                        <span class="modal-category" style="color: var(--accent-color); font-weight: 600; text-transform: uppercase; font-size: 0.9rem; margin-bottom: 8px; display: block;">${p.category}</span>
                        <h1 style="font-size: 2.5rem; color: var(--primary-color); margin-bottom: 16px;">${p.name}</h1>
                        
                        <div class="modal-price-row" style="padding-bottom: 24px; border-bottom: 1px solid var(--border-color); margin-bottom: 32px; display: flex; align-items: center;">
                            <span class="modal-price" style="font-size: 2rem; font-weight: 700; color: var(--primary-color);">${formatPrice(p.price)}</span>
                            ${p.oldPrice ? `<span class="old-price" style="text-decoration: line-through; color: #9aa39d; font-size: 1.2rem; margin-left: 16px;">${formatPrice(p.oldPrice)}</span>` : ''}
                            <span class="product-status ${statusClass}" style="margin-left: auto; padding: 6px 12px; border-radius: 20px; font-weight: 500; background: ${p.status.toLowerCase() === 'available' ? '#e8f5e9' : '#ffebee'};">${p.status}</span>
                        </div>
                        
                        <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 32px; line-height: 1.8;">${p.description}</p>
                        
                        <div class="modal-benefits" style="margin-bottom: 32px;">
                            <h4 class="modal-section-title" style="font-size: 1.1rem; font-weight: 600; margin-bottom: 12px;">Key Benefits</h4>
                            <ul style="list-style: none; padding: 0;">
                                ${benefitsHtml}
                            </ul>
                        </div>
                        
                        ${p.usage ? `
                        <div style="margin-bottom: 40px;">
                            <h4 class="modal-section-title" style="font-size: 1.1rem; font-weight: 600; margin-bottom: 12px;">How to Use</h4>
                            <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.7;">${p.usage}</p>
                        </div>
                        ` : ''}
                        
                        <div class="product-single-actions" style="display: flex; gap: 16px; margin-top: auto;">
                            <button class="btn btn-outline ${inWishlist ? 'active' : ''}" style="padding: 16px; font-size: 1.2rem; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;" onclick="toggleWishlist(${p.id}, event)">
                                <i class="${inWishlist ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                            </button>
                            <button class="btn ${inCart ? 'btn-secondary' : 'btn-primary'} btn-large" style="flex: 1;" onclick="addToCart(${p.id}, event)" ${p.status.toLowerCase() !== 'available' ? 'disabled' : ''}>
                                <i class="fa-solid fa-cart-shopping"></i> ${inCart ? 'Add More' : 'Add Item'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};
