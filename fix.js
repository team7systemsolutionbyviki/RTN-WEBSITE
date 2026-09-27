const fs = require('fs');
['index.html', 'products.html', 'product.html', 'contact.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/data-i18n=\"? home\\?>/g, 'data-i18n="home">');
    content = content.replace(/data-i18n=\\?\"?products\\?\"?>/g, 'data-i18n="products">');
    content = content.replace(/data-i18n=\\?\"?contact\\?\"?>/g, 'data-i18n="contact">');
    content = content.replace(/data-i18n=\\?\"?orderWhatsApp\\?\"?>/g, 'data-i18n="orderWhatsApp">');
    content = content.replace(/data-i18n=\\?\"?yourCart\\?\"?>/g, 'data-i18n="yourCart">');
    content = content.replace(/data-i18n=\\?\"?total\\?\"?>/g, 'data-i18n="total">');
    content = content.replace(/data-i18n=\\?\"?checkout\\?\"?>/g, 'data-i18n="checkout">');
    content = content.replace(/data-i18n=\\?\"?yourWishlist\\?\"?>/g, 'data-i18n="yourWishlist">');
    fs.writeFileSync(file, content);
});
console.log('Done replacing malformed attributes.');
