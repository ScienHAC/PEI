import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title = "ITME - Innovative Trends in Multidisciplinary Engineering",
    description = "International peer-reviewed journal publishing high-quality research in tribology, materials engineering, and interdisciplinary domains. Open access, rapid review process.",
    keywords = "ITME Journal, Tribology, Materials Engineering, Research Publication, Peer Review, Open Access, Engineering Research, Academic Journal, K.R. Mangalam University, School of Engineering and Technology",
    url = "",
    type = "website",
    author = "ITME Editorial Board",
    publishedTime = "",
    modifiedTime = ""
}) => {
    const siteUrl = 'https://itme.krmangalam.edu.in';
    const fullUrl = `${siteUrl}${url}`;
    const imageUrl = `${siteUrl}/ITME_LOGO.png`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            <meta name="googlebot" content="index, follow" />
            <link rel="canonical" href={fullUrl} />
            
            {/* Language and Charset */}
            <html lang="en" />
            <meta charSet="UTF-8" />
            
            {/* Viewport */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            
            {/* Academic/Journal Specific */}
            <meta name="citation_journal_title" content="Innovative Trends in Multidisciplinary Engineering" />
            <meta name="citation_journal_abbrev" content="ITME" />
            <meta name="citation_publisher" content="K.R. Mangalam University" />
            <meta name="citation_publication_date" content="2024" />
            <meta name="dc.publisher" content="K.R. Mangalam University" />
            <meta name="dc.type" content="Text" />
            <meta name="dc.format" content="text/html" />
            <meta name="dc.language" content="en" />
            
            {/* Publication Dates */}
            {publishedTime && <meta property="article:published_time" content={publishedTime} />}
            {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="ITME Journal Logo" />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:site_name" content="ITME Journal" />
            <meta property="og:locale" content="en_US" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
            <meta name="twitter:site" content="@ITMEJournal" />
            <meta name="twitter:creator" content="@ITMEJournal" />

            {/* Additional SEO */}
            <meta name="theme-color" content="#084c61" />
            <meta name="msapplication-TileColor" content="#084c61" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            
            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Periodical",
                    "name": "Innovative Trends in Multidisciplinary Engineering",
                    "alternateName": "ITME",
                    "description": description,
                    "url": siteUrl,
                    "logo": imageUrl,
                    "publisher": {
                        "@type": "Organization",
                        "name": "K.R. Mangalam University",
                        "url": "https://krmangalam.edu.in"
                    },
                    "issn": "To be assigned",
                    "inLanguage": "en",
                    "datePublished": "2024",
                    "keywords": keywords.split(', ')
                })}
            </script>
        </Helmet>
    );
};

export default SEO;