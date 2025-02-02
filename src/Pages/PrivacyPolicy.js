import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div style={styles.privacyPolicy}>
            <h1 style={styles.header}>Privacy Policy</h1>
            <p style={styles.intro}>
                At ITME (Innovations and Trends in Multidisciplinary Engineering), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you interact with our website.
            </p>

            <section style={styles.policySection}>
                <h2 style={styles.sectionHeader}>Information We Collect</h2>
                <h3 style={styles.subHeader}>Personal Information</h3>
                <p>We may collect personal information, including but not limited to:</p>
                <ul>
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Contact information</li>
                </ul>

                <h3 style={styles.subHeader}>Usage Data</h3>
                <p>We automatically collect information on how you interact with our website, such as:</p>
                <ul>
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Pages visited</li>
                    <li>Time spent on pages</li>
                </ul>
            </section>

            <section style={styles.policySection}>
                <h2 style={styles.sectionHeader}>Use of Information</h2>
                <p>We may use your personal information for purposes such as:</p>
                <ul>
                    <li>Providing and maintaining our website</li>
                    <li>Improving and personalizing your experience</li>
                    <li>Responding to your inquiries</li>
                    <li>Sending newsletters and promotional materials</li>
                </ul>
            </section>

            <section style={styles.policySection}>
                <h2 style={styles.sectionHeader}>Third-Party Disclosure</h2>
                <p>We do not sell or trade your personal information to outside parties, except with trusted third parties who assist in our business operations and service delivery.</p>
            </section>

            <section style={styles.policySection}>
                <h2 style={styles.sectionHeader}>Security</h2>
                <p>We implement reasonable security measures to protect your personal data. However, please be aware that no transmission over the internet is 100% secure.</p>
            </section>

            <section style={styles.policySection}>
                <h2 style={styles.sectionHeader}>Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                    <li>Access your personal information</li>
                    <li>Correct inaccuracies</li>
                    <li>Request deletion of your information</li>
                </ul>
            </section>

            <section style={styles.policySection}>
                <h2 style={styles.sectionHeader}>Changes to This Privacy Policy</h2>
                <p>We reserve the right to update this policy. Changes will take effect immediately upon posting on this page.</p>
            </section>

            <section style={styles.policySection}>
                <h2 style={styles.sectionHeader}>Contact Information</h2>
                <p>If you have any questions or concerns, please contact us at <a href="mailto:itme@krmangalam.edu.in" style={styles.link}>itme@krmangalam.edu.in</a>.</p>
            </section>
        </div>
    );
};

const styles = {
    privacyPolicy: {
        maxWidth: '800px',
        margin: 'auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        color: '#333',
    },
    header: {
        fontSize: '2.2rem',
        background: 'linear-gradient(90deg, #004aad, #0078d7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
        marginBottom: '20px',
    },
    intro: {
        fontSize: '1.1rem',
        marginBottom: '20px',
    },
    policySection: {
        marginBottom: '20px',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '15px',
    },
    sectionHeader: {
        fontSize: '1.5rem',
        color: '#0078d7',
    },
    subHeader: {
        fontSize: '1.2rem',
        color: '#004aad',
    },
    link: {
        color: '#004aad',
        textDecoration: 'none',
    },
};

export default PrivacyPolicy;
