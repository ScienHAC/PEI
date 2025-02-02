import React from 'react';

const TermsAndConditions = () => {
    return (
        <div style={styles.termsContainer}>
            <h1 style={styles.header}>Terms & Conditions</h1>

            <section style={styles.policySection}>
                <h2 style={styles.sectionHeader}>1. Acceptance of Terms</h2>
                <p>By accessing and using this website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
            </section>

            <section style={styles.policySection}>
                <h2 style={styles.sectionHeader}>2. Use License</h2>
                <p>
                    a. Permission is granted to temporarily download one copy of the materials on the ITME website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                </p>
                <p>
                    b. This license shall automatically terminate if you violate any of these restrictions and may be terminated by ITME at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
                </p>
            </section>

            <section style={styles.policySection}>
                <h2 style={styles.sectionHeader}>3. Disclaimer</h2>
                <p>The materials on the ITME website are provided on an 'as is' basis. ITME makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            </section>

            <section style={styles.policySection}>
                <h2 style={styles.sectionHeader}>4. Revisions and Errata</h2>
                <p>The materials appearing on the ITME website could include technical, typographical, or photographic errors. ITME does not warrant that any of the materials on its website are accurate, complete, or current.</p>
            </section>

            <section style={styles.policySection}>
                <h2 style={styles.sectionHeader}>5. Links</h2>
                <p>ITME has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by ITME of the site. Use of any such linked website is at the user's own risk.</p>
            </section>

            <section style={styles.policySection}>
                <h2 style={styles.sectionHeader}>6. Modifications to Terms of Use</h2>
                <p>ITME may revise these terms of use for its website at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these Terms and Conditions.</p>
            </section>

            <section style={styles.policySection}>
                <h2 style={styles.sectionHeader}>7. Contact Information</h2>
                <p>If you have any questions about these Terms and Conditions, you may contact us at <a href="mailto:itme@krmangalam.edu.in" style={styles.link}>itme@krmangalam.edu.in</a>.</p>
            </section>
        </div>
    );
};

const styles = {
    termsContainer: {
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
    policySection: {
        marginBottom: '20px',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '15px',
    },
    sectionHeader: {
        fontSize: '1.5rem',
        color: '#0078d7',
    },
    link: {
        color: '#004aad',
        textDecoration: 'none',
    },
};

export default TermsAndConditions;
