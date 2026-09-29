import re

def update_index():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace head meta tags
    head_pattern = re.compile(r'<title>.*?</title>.*?<meta property="og:type" content="website">', re.DOTALL)
    
    new_head = """<title>RTN Natural Skin Care | Herbal & Natural Skincare Products</title>
    <meta name="description" content="Discover RTN Natural Skin Care's premium herbal & natural skincare products. Shop our organic soaps, aloe vera gel, herbal hair oil, and body lotion today.">
    <meta name="keywords" content="RTN Natural, RTN Natural Skin Care, RTN Natural skincare, Natural skincare products, Herbal skincare products, Herbal soap, Manjistha soap, Nalangu Maavu soap, Herbal hair oil, Aloe vera gel, Body lotion, Moisturizer, Lip balm, Kadukkai soap, Saffron gel">
    <meta name="robots" content="index, follow">
    <meta name="author" content="RTN Natural Skin Care">
    <link rel="canonical" href="https://rtnnatural.in/">
    
    <!-- Open Graph Metadata -->
    <meta property="og:title" content="RTN Natural Skin Care | Herbal & Natural Skincare Products">
    <meta property="og:description" content="Discover RTN Natural Skin Care's premium herbal & natural skincare products. Shop our organic soaps, aloe vera gel, herbal hair oil, and body lotion today.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://rtnnatural.in/">
    <meta property="og:image" content="https://rtnnatural.in/images/banner%201.png">
    <meta property="og:site_name" content="RTN Natural Skin Care">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="RTN Natural Skin Care | Herbal & Natural Skincare Products">
    <meta name="twitter:description" content="Discover RTN Natural Skin Care's premium herbal & natural skincare products. Shop our organic soaps, aloe vera gel, herbal hair oil, and body lotion today.">
    <meta name="twitter:image" content="https://rtnnatural.in/images/banner%201.png">

    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "RTN Natural Skin Care",
      "url": "https://rtnnatural.in/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://rtnnatural.in/products.html?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "RTN Natural Skin Care",
      "url": "https://rtnnatural.in/",
      "logo": "https://rtnnatural.in/images/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-98942-52352",
        "contactType": "customer service",
        "availableLanguage": ["English", "Tamil"]
      }
    }
    </script>"""
    
    if head_pattern.search(content):
        content = head_pattern.sub(new_head, content)
    
    content = content.replace('<h1 class="hero-title" data-i18n="heroTitle">Natural Care.<br>Healthy Skin.</h1>', '<h1 class="hero-title">RTN Natural Skin Care</h1>')
    content = content.replace('<h2 data-i18n="aboutTitle">Bringing Nature\'s Best to Your Routine</h2>', '<h2>About RTN Natural Skin Care</h2>')
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)


def update_seo(filepath, title, description, canonical_url):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace head meta tags
    head_pattern = re.compile(r'<title>.*?</title>.*?<meta property="og:type" content="website">', re.DOTALL)
    
    new_head = f"""<title>{title}</title>
    <meta name="description" content="{description}">
    <meta name="keywords" content="RTN Natural, RTN Natural Skin Care, RTN Natural skincare, Natural skincare products, Herbal skincare products, Herbal soap, Manjistha soap, Nalangu Maavu soap, Herbal hair oil, Aloe vera gel, Body lotion, Moisturizer, Lip balm, Kadukkai soap, Saffron gel">
    <meta name="robots" content="index, follow">
    <meta name="author" content="RTN Natural Skin Care">
    <link rel="canonical" href="{canonical_url}">
    
    <!-- Open Graph Metadata -->
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{canonical_url}">
    <meta property="og:image" content="https://rtnnatural.in/images/banner%201.png">
    <meta property="og:site_name" content="RTN Natural Skin Care">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{description}">
    <meta name="twitter:image" content="https://rtnnatural.in/images/banner%201.png">"""
    
    if head_pattern.search(content):
        content = head_pattern.sub(new_head, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

update_index()
update_seo('products.html', 'Products | RTN Natural Skin Care', 'Shop our collection of natural and herbal skincare products, including handmade soaps, aloe vera gel, and herbal hair oil.', 'https://rtnnatural.in/products.html')
update_seo('contact.html', 'Contact Us | RTN Natural Skin Care', 'Get in touch with RTN Natural Skin Care. Order via WhatsApp, email us, or find our contact information here.', 'https://rtnnatural.in/contact.html')
