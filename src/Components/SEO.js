import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title = "ITME - Innovations in Tribology and Materials Engineering",
    description = "International peer-reviewed journal publishing high-quality research in tribology, materials engineering, and interdisciplinary domains. Open access, rapid review process.",
    keywords = "ITME Journal, Tribology, Materials Engineering, Research Publication, Peer Review, Open Access, Engineering Research, Academic Journal",
    url = "",
    type = "website"
}) => {
    const siteUrl = 'https://itme.krmangalam.edu.in';
    const fullUrl = `${siteUrl}${url}`;
    const imageUrl = `${siteUrl}/ITME_LOGO.png`;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:url" content={fullUrl} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
        </Helmet>
    );
};

export default SEO;