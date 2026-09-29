// ================================
// CONFIGURATION
// ================================
const WHATSAPP_NUMBER = "919894252352"; // Must be country code + number without plus or spaces

// ================================
// PRODUCT DATA - EDIT PRODUCTS HERE
// ================================
const products = [
    { id: 1, name: "Goat Milk Soap", category: "Soaps", price: 110, image: "images/Goat Milk Soap.png", description: "Handcrafted Goat Milk Soap. Gentle Exfoliation, Deep Moisture, Soothing Care.", benefits: ["Gentle Exfoliation", "Deep Moisture"], status: "Available", usage: "For external use only." },
    { id: 2, name: "Kuppaimeni Soap", category: "Soaps", price: 85, image: "images/Kuppaimeni Soap.png", description: "Herbal Kuppaimeni Soap. Treats Acne & Pimples, Soothes Skin Irritation.", benefits: ["Treats Acne", "Deep Pore Cleansing"], status: "Available", usage: "For external use only." },
    { id: 3, name: "Kadukkai Soap", category: "Soaps", price: 90, image: "images/Kadukkai Soap.png", description: "Natural Kadukkai Soap. Purifies & Cleanses, Tightens Pores.", benefits: ["Purifies & Cleanses", "Even Skin Tone"], status: "Available", usage: "For external use only." },
    { id: 4, name: "Manjistha Soap", category: "Soaps", price: 90, image: "images/Manjistha Soap.png", description: "Rich in Antioxidants. Detoxifies & Purifies, Reduces Acne.", benefits: ["Detoxifies", "Accelerates Skin Repair"], status: "Available", usage: "For external use only." },
    { id: 5, name: "Nalangu Maavu Soap", category: "Soaps", price: 75, image: "images/Nalangu Maavu Soap.png", description: "Traditional Nalangu Maavu Soap. Improves Skin Complexion.", benefits: ["Improves Complexion", "Anti-Acne"], status: "Available", usage: "For external use only." },
    { id: 6, name: "Body Lotion", category: "Body Care", price: 85, image: "images/Body Lotion.png", description: "Ultra-moisturizing body lotion for 24-hour hydration and smooth skin.", benefits: ["Intense moisturization", "Softens dry skin"], status: "Available", usage: "Apply generously all over the body." },
    { id: 7, name: "Moisturizer", category: "Skin Care", price: 250, image: "images/Moisturizer.png", description: "Daily face moisturizer to keep your skin hydrated and glowing naturally.", benefits: ["Deep Hydration", "Non-greasy"], status: "Available", usage: "Apply on clean face daily." },
    { id: 8, name: "Aloe Vera Gel 100g", category: "Skin Care", price: 75, image: "images/Aloe Vera Gel.png", description: "Pure, natural aloe vera gel for everyday skin hydration and soothing care.", benefits: ["Refreshing and cooling", "Soothes irritated skin"], status: "Available", usage: "Apply a small amount to skin." },
    { id: 9, name: "Herbal Hair Oil 100ml", category: "Hair Care", price: 190, image: "images/Herbal Hair Oil.png", description: "Nourishing herbal hair oil to promote hair growth and control hair fall.", benefits: ["Controls hair fall", "Stimulates growth"], status: "Available", usage: "Massage into scalp and hair roots." },
    { id: 10, name: "Lip Balm Strawberry", category: "Lip Care", price: 75, image: "images/Lip Balm Strawberry.png", description: "Natural strawberry lip balm for soft, pink, and moisturized lips.", benefits: ["Heals chapped lips", "Natural strawberry tint"], status: "Available", usage: "Apply gently on lips." },
    { id: 11, name: "Lip Balm Rose", category: "Lip Care", price: 75, image: "images/Lip Balm Rose.png", description: "Natural rose lip balm to nourish and protect dry lips with a soft floral scent.", benefits: ["Long-lasting moisture", "Softens lips"], status: "Available", usage: "Apply gently on lips." },
    { id: 12, name: "Saffron Gel 50g", category: "Skin Care", price: 90, image: "images/Saffron Gel.png", description: "Premium Saffron Gel for glowing and radiant skin.", benefits: ["Skin Brightening", "Reduces Pigmentation"], status: "Available", usage: "Apply a small amount to skin." }
];

// ================================
// APPLICATION LOGIC
// ================================

// State
let cart = JSON.parse(localStorage.getItem('rtn_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('rtn_wishlist')) || [];
let activeCategory = 'All';
let searchQuery = '';
let currentLang = localStorage.getItem('rtn_lang') || 'en';

const translations = {
    en: {
        home: "Home",
        products: "Products",
        contact: "Contact",
        orderWhatsApp: "Order on WhatsApp",
        yourCart: "Your Cart",
        yourWishlist: "Your Wishlist",
        total: "Total:",
        checkout: "Order via WhatsApp",
        emptyCart: "Your cart is empty.",
        emptyWishlist: "Your wishlist is empty.",
        addItem: "Add Item",
        addMore: "Add More",
        inCart: "in cart",
        allProducts: "All Products",
        heroSubtitle: "Premium Quality",
        heroTitle: "Natural Care.<br>Healthy Skin.",
        heroDesc: "Discover quality skincare and beauty products from RTN Natural Skin Care. Formulated with nature's best ingredients for your radiant glow.",
        shopProducts: "Shop Products",
        badge1: "100% Natural",
        badge2: "Cruelty Free",
        aboutUs: "About Us",
        aboutTitle: "Bringing Nature's Best to Your Routine",
        aboutP1: "At <strong>RTN Natural Skin Care</strong>, we believe that true beauty comes from nature. We are a dedicated skincare and beauty product shop focused on delivering high-quality, effective, and safe products to our customers.",
        aboutP2: "Our carefully curated selection is designed to nourish, protect, and enhance your natural glow. We pride ourselves on exceptional customer service and making premium beauty accessible.",
        feat1: "Quality Ingredients",
        feat2: "Handpicked Selection",
        feat3: "Direct WhatsApp Ordering",
        footerDesc: "Premium skincare, beauty, and natural care products. Browse our catalog and order directly through WhatsApp.",
        quickLinks: "Quick Links",
        contactUs: "Contact Us"
    },
    ta: {
        prod_12_name: "குங்குமப்பூ ஜெல் 50g",
        prod_11_name: "ரோஜா லிப் பாம்",
        prod_10_name: "ஸ்ட்ராபெரி லிப் பாம்",
        prod_9_name: "மூலிகை முடி எண்ணெய் 100ml",
        prod_8_name: "கற்றாழை ஜெல் 100g",
        prod_7_name: "ஈரப்பதமூட்டி",
        prod_6_name: "பாடி லோஷன்",
        prod_5_name: "நலங்கு மாவு சோப்பு",
        prod_4_name: "மஞ்சிஷ்டா சோப்பு",
        prod_3_name: "கடுக்காய் சோப்பு",
        prod_2_name: "குப்பைமேனி சோப்பு",
        prod_1_name: "ஆட்டுப்பால் சோப்பு",
        status_OutofStock: "கையிருப்பில்லை",
        status_Available: "கையிருப்பில்",
        cat_LipCare: "உதடு பராமரிப்பு",
        cat_HairCare: "முடி பராமரிப்பு",
        cat_SkinCare: "சரும பராமரிப்பு",
        cat_BodyCare: "உடல் பராமரிப்பு",
        cat_Soaps: "சோப்புகள்",
        home: "முகப்பு",
        products: "பொருட்கள்",
        contact: "தொடர்பு",
        orderWhatsApp: "வாட்ஸ்அப்பில் ஆர்டர் செய்",
        yourCart: "உங்கள் கூடை",
        yourWishlist: "விருப்பப் பட்டியல்",
        total: "மொத்தம்:",
        checkout: "வாட்ஸ்அப் மூலம் ஆர்டர் செய்",
        emptyCart: "கூடை காலியாக உள்ளது.",
        emptyWishlist: "விருப்பப் பட்டியல் காலியாக உள்ளது.",
        addItem: "கூடையில் சேர்",
        addMore: "மேலும் சேர்",
        inCart: "கூடையில்",
        allProducts: "அனைத்து பொருட்கள்",
        heroSubtitle: "உயர்தரமானவை",
        heroTitle: "இயற்கை பராமரிப்பு.<br>ஆரோக்கியமான சருமம்.",
        heroDesc: "RTN இயற்கை சருமப் பராமரிப்பிலிருந்து தரமான அழகு சாதனப் பொருட்களைக் கண்டறியுங்கள். உங்கள் ஒளிரும் சருமத்திற்காக இயற்கையின் சிறந்த பொருட்களுடன் தயாரிக்கப்பட்டது.",
        shopProducts: "பொருட்களை வாங்குங்கள்",
        badge1: "100% இயற்கை",
        badge2: "தீங்கற்றது",
        aboutUs: "எங்களை பற்றி",
        aboutTitle: "இயற்கையின் சிறந்ததை உங்கள் பயன்பாட்டிற்கு கொண்டு வருகிறோம்",
        aboutP1: "<strong>RTN Natural Skin Care</strong> இல், உண்மையான அழகு இயற்கையிலிருந்து வருகிறது என்று நாங்கள் நம்புகிறோம். உயர்தரமான மற்றும் பாதுகாப்பான பொருட்களை வாடிக்கையாளர்களுக்கு வழங்குவதில் கவனம் செலுத்துகிறோம்.",
        aboutP2: "உங்களின் இயற்கையான அழகை அதிகரிக்க எங்கள் பொருட்கள் கவனமாக தேர்ந்தெடுக்கப்பட்டுள்ளன. சிறந்த வாடிக்கையாளர் சேவையையும், உயர்தர அழகையும் வழங்குவதில் நாங்கள் பெருமைப்படுகிறோம்.",
        feat1: "தரமான மூலப்பொருட்கள்",
        feat2: "கவனமாக தேர்ந்தெடுக்கப்பட்டவை",
        feat3: "நேரடி வாட்ஸ்அப் ஆர்டர்",
        footerDesc: "உயர்தர சருமப் பராமரிப்பு, அழகு மற்றும் இயற்கை பொருட்கள். எங்கள் கேட்லாக்கை உலாவவும், நேரடியாக வாட்ஸ்அப் மூலம் ஆர்டர் செய்யவும்.",
        quickLinks: "விரைவு இணைப்புகள்",
        contactUs: "தொடர்பு கொள்ள"
    },
    tanglish: {
        prod_12_name: "Saffron Gel 50g",
        prod_11_name: "Rose Lip Balm",
        prod_10_name: "Strawberry Lip Balm",
        prod_9_name: "Herbal Hair Oil 100ml",
        prod_8_name: "Aloe Vera Gel 100g",
        prod_7_name: "Moisturizer",
        prod_6_name: "Body Lotion",
        prod_5_name: "Nalangu Maavu Soap",
        prod_4_name: "Manjistha Soap",
        prod_3_name: "Kadukkai Soap",
        prod_2_name: "Kuppaimeni Soap",
        prod_1_name: "Goat Milk Soap",
        status_OutofStock: "Out of Stock",
        status_Available: "Available",
        cat_LipCare: "Lip Care",
        cat_HairCare: "Hair Care",
        cat_SkinCare: "Skin Care",
        cat_BodyCare: "Body Care",
        cat_Soaps: "Soaps",
        home: "Home",
        products: "Products",
        contact: "Contact",
        orderWhatsApp: "WhatsApp la Order Pannunga",
        yourCart: "Unga Cart",
        yourWishlist: "Unga Wishlist",
        total: "Total:",
        checkout: "WhatsApp la Order Pannunga",
        emptyCart: "Unga cart empty ah irukku.",
        emptyWishlist: "Unga wishlist empty ah irukku.",
        addItem: "Cart-la Add Pannunga",
        addMore: "Innum Add Pannunga",
        inCart: "cart-la irukku",
        allProducts: "Ella Products",
        heroSubtitle: "Premium Quality",
        heroTitle: "Natural Care.<br>Healthy Skin.",
        heroDesc: "RTN Natural Skin Care-la irundhu quality aana skincare products thedunga. Unga glowing skin-kaga nature-oda best ingredients vechu senjadhu.",
        shopProducts: "Products Vaangunga",
        badge1: "100% Natural",
        badge2: "Cruelty Free",
        aboutUs: "Engala Pathi",
        aboutTitle: "Nature-oda Best Ungalukaga",
        aboutP1: "<strong>RTN Natural Skin Care</strong>-la, unmaiyana azhagu nature-la irundhu dhan varudhu nu nambrom. Nalla quality, safe and effective products-a kudukkaradhula naanga focus panrom.",
        aboutP2: "Unga natural glow-a enhance panna nanga nalla products-a select panni vechurukom. Best customer service kudukkaradhula naanga peruma padrom.",
        feat1: "Quality aana Ingredients",
        feat2: "Handpicked aana Products",
        feat3: "Direct WhatsApp Order",
        footerDesc: "Premium skincare and beauty products. Enga catalog paarthu WhatsApp moolama direct ah order pannunga.",
        quickLinks: "Quick Links",
        contactUs: "Contact Pannunga"
    }
};

const t = (key) => (translations[currentLang] && translations[currentLang][key]) || key;

const tProdName = (p) => (translations[currentLang] && translations[currentLang]['prod_' + p.id + '_name']) || p.name;
const tCat = (cat) => {
    if (!cat) return cat;
    return (translations[currentLang] && translations[currentLang]['cat_' + cat.replace(/\s+/g, '')]) || cat;
};
const tStatus = (status) => {
    if (!status) return status;
    return (translations[currentLang] && translations[currentLang]['status_' + status.replace(/\s+/g, '')]) || status;
};


const updateStaticText = () => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });
};
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
    // Language Switcher Initialization
    const langSelects = document.querySelectorAll('#langSwitch');
    langSelects.forEach(select => {
        select.value = currentLang;
        select.addEventListener('change', (e) => {
            currentLang = e.target.value;
            localStorage.setItem('rtn_lang', currentLang);
            langSelects.forEach(s => s.value = currentLang);
            updateStaticText();
            renderCart();
            renderWishlist();
            if (document.getElementById('productGrid')) {
                initCategories();
                renderProducts();
            }
            if (document.getElementById('singleProductContainer')) {
                renderSingleProduct();
            }
        });
    });
    updateStaticText();

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
        cartItemsContainer.innerHTML = `<div class="empty-state"><i class="fa-solid fa-cart-shopping" style="font-size: 3rem; margin-bottom: 16px; opacity: 0.5;"></i><p>${t('emptyCart')}</p></div>`;
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
                    <div class="item-title">${tProdName(product)}</div>
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
        wishlistItemsContainer.innerHTML = `<div class="empty-state"><i class="fa-regular fa-heart" style="font-size: 3rem; margin-bottom: 16px; opacity: 0.5;"></i><p>${t('emptyWishlist')}</p></div>`;
    } else {
        wishlist.forEach(id => {
            const product = products.find(p => p.id === id);
            if(!product) return;
            
            const div = document.createElement('div');
            div.className = 'wishlist-item';
            div.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="item-img">
                <div class="item-details">
                    <div class="item-title">${tProdName(product)}</div>
                    <div class="item-price">${formatPrice(product.price)}</div>
                    <div style="margin-top: auto; display: flex; gap: 8px;">
                        <button class="btn btn-primary" style="padding: 4px 12px; font-size: 0.8rem;" onclick="addToCart(${product.id})">${t('addItem')}</button>
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
        btn.textContent = cat === 'All' ? t('allProducts') : tCat(cat);
        
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
                    <span class="product-category-tag">${tCat(p.category)}</span>
                    <img src="${p.image}" alt="${p.alt || 'RTN Natural ' + p.name + (p.category === 'Soaps' && !p.name.includes('Herbal') ? ' Herbal Soap' : '')}" class="product-img" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${tProdName(p)}</h3>
                    <p class="product-desc">${p.description}</p>
                    <div class="product-price-row">
                        <span class="price">${formatPrice(p.price)}</span>
                        ${p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : ''}
                    </div>
                    <div style="margin-bottom: 12px;"><span class="product-status ${statusClass}">${tStatus(p.status)}</span></div>
                    <div class="product-actions" style="margin-top: auto; display: flex; gap: 8px;">
                        <button class="btn btn-outline ${inWishlist ? 'active' : ''}" style="padding: 10px; flex: 0 0 auto;" onclick="toggleWishlist(${p.id}, event)" aria-label="Wishlist">
                            <i class="${inWishlist ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                        </button>
                        ${inCart ? `
                        <div style="flex: 1; display: flex; align-items: center; justify-content: space-between; background: var(--secondary-color); border-radius: var(--radius-full); padding: 4px; border: 1px solid var(--border-color);">
                            <button onclick="updateQty(${p.id}, -1); event.stopPropagation();" style="width: 36px; height: 36px; border-radius: 50%; border: none; background: var(--bg-card); color: var(--primary-color); font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; box-shadow: var(--shadow-sm);">-</button>
                            <span style="font-weight: 600; font-size: 1.1rem; color: var(--text-dark);">${cart.find(item => item.id === p.id).qty}</span>
                            <button onclick="updateQty(${p.id}, 1); event.stopPropagation();" style="width: 36px; height: 36px; border-radius: 50%; border: none; background: var(--primary-color); color: var(--bg-main); font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; box-shadow: var(--shadow-sm);">+</button>
                        </div>
                        ` : `
                        <button class="btn btn-primary" style="flex: 1;" onclick="addToCart(${p.id}, event)" ${p.status.toLowerCase() !== 'available' ? 'disabled' : ''}>
                            <i class="fa-solid fa-cart-shopping"></i> ${t('addItem')}
                        </button>
                        `}
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
                    <img src="${p.image}" alt="${p.alt || 'RTN Natural ' + p.name + (p.category === 'Soaps' && !p.name.includes('Herbal') ? ' Herbal Soap' : '')}" style="width: 100%; height: auto; display: block; object-fit: cover; aspect-ratio: 1;">
                </div>
                <div class="product-single-info">
                    <nav class="breadcrumb" style="margin-bottom: 16px; color: var(--text-muted); font-size: 0.9rem;">
                        <a href="index.html" style="color: var(--primary-color);">Home</a> &gt; 
                        <span>${tCat(p.category)}</span> &gt; 
                        <span>${tProdName(p)}</span>
                    </nav>
                    
                    <span class="modal-category" style="color: var(--accent-color); font-weight: 600; text-transform: uppercase; font-size: 0.9rem; margin-bottom: 8px; display: block;">${tCat(p.category)}</span>
                    <h1 style="font-size: 2.5rem; color: var(--primary-color); margin-bottom: 16px;">${tProdName(p)}</h1>
                    
                    <div class="modal-price-row" style="padding-bottom: 24px; border-bottom: 1px solid var(--border-color); margin-bottom: 32px; display: flex; align-items: center;">
                        <span class="modal-price" style="font-size: 2rem; font-weight: 700; color: var(--primary-color);">${formatPrice(p.price)}</span>
                        ${p.oldPrice ? `<span class="old-price" style="text-decoration: line-through; color: #9aa39d; font-size: 1.2rem; margin-left: 16px;">${formatPrice(p.oldPrice)}</span>` : ''}
                        <span class="product-status ${statusClass}" style="margin-left: auto; padding: 6px 12px; border-radius: 20px; font-weight: 500; background: ${p.status.toLowerCase() === 'available' ? '#e8f5e9' : '#ffebee'};">${tStatus(p.status)}</span>
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
                        ${inCart ? `
                        <div style="flex: 1; display: flex; align-items: center; justify-content: space-between; background: var(--secondary-color); border-radius: var(--radius-full); padding: 8px; border: 1px solid var(--border-color);">
                            <button onclick="updateQty(${p.id}, -1); event.stopPropagation();" style="width: 44px; height: 44px; border-radius: 50%; border: none; background: var(--bg-card); color: var(--primary-color); font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; box-shadow: var(--shadow-sm);">-</button>
                            <span style="font-weight: 700; font-size: 1.2rem; color: var(--text-dark);">${cart.find(item => item.id === p.id).qty} in cart</span>
                            <button onclick="updateQty(${p.id}, 1); event.stopPropagation();" style="width: 44px; height: 44px; border-radius: 50%; border: none; background: var(--primary-color); color: var(--bg-main); font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; box-shadow: var(--shadow-sm);">+</button>
                        </div>
                        ` : `
                        <button class="btn btn-primary btn-large" style="flex: 1;" onclick="addToCart(${p.id}, event)" ${p.status.toLowerCase() !== 'available' ? 'disabled' : ''}>
                            <i class="fa-solid fa-cart-shopping"></i> Add Item
                        </button>
                        `}
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
        
        setTimeout(() => {
            cart = [];
            localStorage.setItem('rtn_cart', JSON.stringify(cart));
            updateBadges();
            renderCart();
        }, 1000);
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
                        <img src="${p.image}" alt="${p.alt || 'RTN Natural ' + p.name + (p.category === 'Soaps' && !p.name.includes('Herbal') ? ' Herbal Soap' : '')}" style="width: 100%; height: auto; display: block; object-fit: cover; aspect-ratio: 1;">
                    </div>
                    <div class="product-single-info">
                        <nav class="breadcrumb" style="margin-bottom: 16px; color: var(--text-muted); font-size: 0.9rem;">
                            <a href="index.html" style="color: var(--primary-color);">Home</a> &gt; 
                            <a href="products.html" style="color: var(--primary-color);">Products</a> &gt; 
                            <span>${tProdName(p)}</span>
                        </nav>
                        
                        <span class="modal-category" style="color: var(--accent-color); font-weight: 600; text-transform: uppercase; font-size: 0.9rem; margin-bottom: 8px; display: block;">${tCat(p.category)}</span>
                        <h1 style="font-size: 2.5rem; color: var(--primary-color); margin-bottom: 16px;">${tProdName(p)}</h1>
                        
                        <div class="modal-price-row" style="padding-bottom: 24px; border-bottom: 1px solid var(--border-color); margin-bottom: 32px; display: flex; align-items: center;">
                            <span class="modal-price" style="font-size: 2rem; font-weight: 700; color: var(--primary-color);">${formatPrice(p.price)}</span>
                            ${p.oldPrice ? `<span class="old-price" style="text-decoration: line-through; color: #9aa39d; font-size: 1.2rem; margin-left: 16px;">${formatPrice(p.oldPrice)}</span>` : ''}
                            <span class="product-status ${statusClass}" style="margin-left: auto; padding: 6px 12px; border-radius: 20px; font-weight: 500; background: ${p.status.toLowerCase() === 'available' ? '#e8f5e9' : '#ffebee'};">${tStatus(p.status)}</span>
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
                            ${inCart ? `
                            <div style="flex: 1; display: flex; align-items: center; justify-content: space-between; background: var(--secondary-color); border-radius: var(--radius-full); padding: 8px; border: 1px solid var(--border-color);">
                                <button onclick="updateQty(${p.id}, -1); event.stopPropagation();" style="width: 44px; height: 44px; border-radius: 50%; border: none; background: var(--bg-card); color: var(--primary-color); font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; box-shadow: var(--shadow-sm);">-</button>
                                <span style="font-weight: 700; font-size: 1.2rem; color: var(--text-dark);">${cart.find(item => item.id === p.id).qty} ${t('inCart')}</span>
                                <button onclick="updateQty(${p.id}, 1); event.stopPropagation();" style="width: 44px; height: 44px; border-radius: 50%; border: none; background: var(--primary-color); color: var(--bg-main); font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; box-shadow: var(--shadow-sm);">+</button>
                            </div>
                            ` : `
                            <button class="btn btn-primary btn-large" style="flex: 1;" onclick="addToCart(${p.id}, event)" ${p.status.toLowerCase() !== 'available' ? 'disabled' : ''}>
                                <i class="fa-solid fa-cart-shopping"></i> ${t('addItem')}
                            </button>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// Banner Slider Logic
document.addEventListener('DOMContentLoaded', () => {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const banners = ['images/banner 1.png', 'images/banner 2.png', 'images/banner 3.png'];
        let currentBannerIndex = 0;
        
        setInterval(() => {
            heroImage.style.opacity = 0; // Fade out
            setTimeout(() => {
                currentBannerIndex = (currentBannerIndex + 1) % banners.length;
                heroImage.src = banners[currentBannerIndex];
                heroImage.style.opacity = 1; // Fade in
            }, 500); // Wait for fade out to complete before changing src
        }, 7000); // Change banner every 7 seconds
    }
});


// Theme Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    const savedTheme = localStorage.getItem('rtn_theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('rtn_theme', 'light');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('rtn_theme', 'dark');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        });
    }
});

