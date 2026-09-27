const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const replacements = [
    [/<span class="hero-subtitle">Premium Quality<\/span>/, `<span class="hero-subtitle" data-i18n="heroSubtitle">Premium Quality</span>`],
    [/<h1 class="hero-title">Natural Care.<br>Healthy Skin.<\/h1>/, `<h1 class="hero-title" data-i18n="heroTitle">Natural Care.<br>Healthy Skin.</h1>`],
    [/<p class="hero-description">Discover quality skincare and beauty products from RTN Natural Skin Care. Formulated with nature's best ingredients for your radiant glow.<\/p>/, `<p class="hero-description" data-i18n="heroDesc">Discover quality skincare and beauty products from RTN Natural Skin Care. Formulated with nature's best ingredients for your radiant glow.</p>`],
    [/<a href="products.html" class="btn btn-secondary">Shop Products<\/a>/, `<a href="products.html" class="btn btn-secondary" data-i18n="shopProducts">Shop Products</a>`],
    [/<div class="floating-badge badge-1">100% Natural<\/div>/, `<div class="floating-badge badge-1" data-i18n="badge1">100% Natural</div>`],
    [/<div class="floating-badge badge-2">Cruelty Free<\/div>/, `<div class="floating-badge badge-2" data-i18n="badge2">Cruelty Free</div>`],
    [/<span class="section-subtitle">About Us<\/span>/, `<span class="section-subtitle" data-i18n="aboutUs">About Us</span>`],
    [/<h2>Bringing Nature's Best to Your Routine<\/h2>/, `<h2 data-i18n="aboutTitle">Bringing Nature's Best to Your Routine</h2>`],
    [/<p>At <strong>RTN Natural Skin Care<\/strong>, we believe that true beauty comes from nature. We are a dedicated skincare and beauty product shop focused on delivering high-quality, effective, and safe products to our customers.<\/p>/, `<p data-i18n="aboutP1">At <strong>RTN Natural Skin Care</strong>, we believe that true beauty comes from nature. We are a dedicated skincare and beauty product shop focused on delivering high-quality, effective, and safe products to our customers.</p>`],
    [/<p>Our carefully curated selection is designed to nourish, protect, and enhance your natural glow. We pride ourselves on exceptional customer service and making premium beauty accessible.<\/p>/, `<p data-i18n="aboutP2">Our carefully curated selection is designed to nourish, protect, and enhance your natural glow. We pride ourselves on exceptional customer service and making premium beauty accessible.</p>`],
    [/<li><i class="fa-solid fa-check"><\/i> Quality Ingredients<\/li>/, `<li><i class="fa-solid fa-check"></i> <span data-i18n="feat1">Quality Ingredients</span></li>`],
    [/<li><i class="fa-solid fa-check"><\/i> Handpicked Selection<\/li>/, `<li><i class="fa-solid fa-check"></i> <span data-i18n="feat2">Handpicked Selection</span></li>`],
    [/<li><i class="fa-solid fa-check"><\/i> Direct WhatsApp Ordering<\/li>/, `<li><i class="fa-solid fa-check"></i> <span data-i18n="feat3">Direct WhatsApp Ordering</span></li>`],
    [/<p>Premium skincare, beauty, and natural care products. Browse our catalog and order directly through WhatsApp.<\/p>/, `<p data-i18n="footerDesc">Premium skincare, beauty, and natural care products. Browse our catalog and order directly through WhatsApp.</p>`],
    [/<h3>Quick Links<\/h3>/, `<h3 data-i18n="quickLinks">Quick Links</h3>`],
    [/<h3>Contact Us<\/h3>/, `<h3 data-i18n="contactUs">Contact Us</h3>`],
    [/<li><a href="index.html#about">About Us<\/a><\/li>/, `<li><a href="index.html#about" data-i18n="aboutUs">About Us</a></li>`]
];

replacements.forEach(([regex, replace]) => {
    html = html.replace(regex, replace);
});

fs.writeFileSync('index.html', html);
console.log('index.html updated successfully.');
