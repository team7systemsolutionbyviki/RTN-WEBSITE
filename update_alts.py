import re

def update_html(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update logo alt
    content = re.sub(r'alt="RTN Letzz Nature Skin Care"', 'alt="RTN Natural Skin Care Logo"', content)
    
    # Update banner alt
    content = re.sub(r'alt="Natural Skincare Products"', 'alt="RTN Natural Skincare Products Assortment"', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

update_html('index.html')
update_html('products.html')
update_html('contact.html')

# Update script.js for product alts
with open('script.js', 'r', encoding='utf-8') as f:
    script_content = f.read()

# Replace alt="${p.name}" with alt="${p.alt || 'RTN Natural ' + p.name}" in renderProducts
script_content = script_content.replace('alt="${p.name}"', 'alt="${p.alt || \'RTN Natural \' + p.name + (p.category === \'Soaps\' && !p.name.includes(\'Herbal\') ? \' Herbal Soap\' : \'\')}"')
# Update in productModal and singleProductContainer
script_content = script_content.replace('alt="\' + p.name + \'"', 'alt="\' + (p.alt || \'RTN Natural \' + p.name) + \'"')

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(script_content)
