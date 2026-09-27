const fs = require('fs');
const files = ['index.html', 'products.html', 'product.html', 'contact.html'];

const buttonHTML = `                <button class="icon-btn" id="themeToggle" aria-label="Toggle Theme">
                    <i class="fa-solid fa-moon"></i>
                </button>
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('id="themeToggle"')) {
        content = content.replace(
            /<button class="icon-btn" id="wishlistToggle"/,
            buttonHTML + '                <button class="icon-btn" id="wishlistToggle"'
        );
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
