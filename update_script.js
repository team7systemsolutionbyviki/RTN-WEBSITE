const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

const prodData = {
    ta: {
        cat_Soaps: 'சோப்புகள்',
        cat_BodyCare: 'உடல் பராமரிப்பு',
        cat_SkinCare: 'சரும பராமரிப்பு',
        cat_HairCare: 'முடி பராமரிப்பு',
        cat_LipCare: 'உதடு பராமரிப்பு',
        status_Available: 'கையிருப்பில்',
        status_OutofStock: 'கையிருப்பில்லை',
        prod_1_name: 'ஆட்டுப்பால் சோப்பு',
        prod_2_name: 'குப்பைமேனி சோப்பு',
        prod_3_name: 'கடுக்காய் சோப்பு',
        prod_4_name: 'மஞ்சிஷ்டா சோப்பு',
        prod_5_name: 'நலங்கு மாவு சோப்பு',
        prod_6_name: 'பாடி லோஷன்',
        prod_7_name: 'ஈரப்பதமூட்டி',
        prod_8_name: 'கற்றாழை ஜெல்',
        prod_9_name: 'மூலிகை முடி எண்ணெய்',
        prod_10_name: 'ஸ்ட்ராபெரி லிப் பாம்',
        prod_11_name: 'ரோஜா லிப் பாம்'
    },
    tanglish: {
        cat_Soaps: 'Soaps',
        cat_BodyCare: 'Body Care',
        cat_SkinCare: 'Skin Care',
        cat_HairCare: 'Hair Care',
        cat_LipCare: 'Lip Care',
        status_Available: 'Available',
        status_OutofStock: 'Out of Stock',
        prod_1_name: 'Goat Milk Soap',
        prod_2_name: 'Kuppaimeni Soap',
        prod_3_name: 'Kadukkai Soap',
        prod_4_name: 'Manjistha Soap',
        prod_5_name: 'Nalangu Maavu Soap',
        prod_6_name: 'Body Lotion',
        prod_7_name: 'Moisturizer',
        prod_8_name: 'Aloe Vera Gel',
        prod_9_name: 'Herbal Hair Oil',
        prod_10_name: 'Strawberry Lip Balm',
        prod_11_name: 'Rose Lip Balm'
    }
};

for (const lang in prodData) {
    for (const key in prodData[lang]) {
        code = code.replace(new RegExp(lang + ':\\s*\\{'), lang + ': {\n        ' + key + ': "' + prodData[lang][key] + '",');
    }
}

// Add the helper functions right after const t = ...
const helperCode = `
const tProdName = (p) => (translations[currentLang] && translations[currentLang]['prod_' + p.id + '_name']) || p.name;
const tCat = (cat) => {
    if (!cat) return cat;
    return (translations[currentLang] && translations[currentLang]['cat_' + cat.replace(/\\s+/g, '')]) || cat;
};
const tStatus = (status) => {
    if (!status) return status;
    return (translations[currentLang] && translations[currentLang]['status_' + status.replace(/\\s+/g, '')]) || status;
};
`;

code = code.replace('const t = (key) => translations[currentLang][key] || key;', 'const t = (key) => (translations[currentLang] && translations[currentLang][key]) || key;\n' + helperCode);

// Replace usages in renderCart
code = code.replace(/<div class="item-title">\$\{product\.name\}<\/div>/g, '<div class="item-title">${tProdName(product)}</div>');

// Replace usages in renderWishlist
// In renderWishlist, the product name is rendered as <div class="item-title">${product.name}</div>
// It's the same regex as above.

// Replace usages in renderProducts
code = code.replace(/<span class="product-category-tag">\$\{p\.category\}<\/span>/g, '<span class="product-category-tag">${tCat(p.category)}</span>');
code = code.replace(/<h3 class="product-title">\$\{p\.name\}<\/h3>/g, '<h3 class="product-title">${tProdName(p)}</h3>');
code = code.replace(/<span class="product-status \$\{statusClass\}">\$\{p\.status\}<\/span>/g, '<span class="product-status ${statusClass}">${tStatus(p.status)}</span>');

// Replace usages in renderSingleProduct
code = code.replace(/<span>\$\{p\.category\}<\/span> &gt;/g, '<span>${tCat(p.category)}</span> &gt;');
code = code.replace(/<span>\$\{p\.name\}<\/span>/g, '<span>${tProdName(p)}</span>');
code = code.replace(/<span class="modal-category"([^>]*)>\$\{p\.category\}<\/span>/g, '<span class="modal-category"$1>${tCat(p.category)}</span>');
code = code.replace(/<h1([^>]*)>\$\{p\.name\}<\/h1>/g, '<h1$1>${tProdName(p)}</h1>');
code = code.replace(/<span class="product-status \$\{statusClass\}"([^>]*)>\$\{p\.status\}<\/span>/g, '<span class="product-status ${statusClass}"$1>${tStatus(p.status)}</span>');

// Replace usages in initCategories
code = code.replace(/btn\.textContent = cat === 'All' \? t\('allProducts'\) : cat;/g, "btn.textContent = cat === 'All' ? t('allProducts') : tCat(cat);");

fs.writeFileSync('script.js', code);
console.log('script.js updated successfully!');
