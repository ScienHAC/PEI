import React from 'react';

/**
 * Reusable maintenance / placeholder panel.
 * Props:
 *  - title: main heading
 *  - message: secondary explanatory text
 *  - note (optional): subtle italic note
 */
const Maintenance = ({ title = 'Section', message = 'This section is temporarily unavailable.', note }) => {
    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <div style={styles.iconCircle} aria-hidden="true">
                    <div style={{width:34,height:34,position:'relative'}}>
                        <span style={{
                            position:'absolute',inset:0,borderRadius:'50%',
                            background:'linear-gradient(135deg,#0b5d73,#0d728c)',
                            boxShadow:'0 0 0 4px rgba(11,93,115,0.15)',
                            display:'flex',alignItems:'center',justifyContent:'center',
                            fontSize:14,fontWeight:600,color:'#fff',letterSpacing:'.5px'
                        }}>IT</span>
                    </div>
                </div>
                <h1 style={styles.heading}>{title}</h1>
                <p style={styles.message}>{message}</p>
                {note && <p style={styles.note}>{note}</p>}
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        background: '#f7f9fb',
    },
    card: {
        maxWidth: 760,
        width: '100%',
        background: '#ffffff',
        borderRadius: 24,
        padding: '50px 42px',
        boxShadow: '0 8px 28px -6px rgba(16,44,55,0.25), 0 2px 6px rgba(16,44,55,0.15)',
        textAlign: 'center',
        fontFamily: '"Roboto Slab", Georgia, serif'
    },
    iconCircle: {
        width: 86,
        height: 86,
        margin: '0 auto 22px',
        borderRadius: 28,
        background: 'linear-gradient(135deg,#e5edf2,#d2dce3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px -6px rgba(16,44,55,0.25), inset 0 2px 4px rgba(255,255,255,0.65)'
    },
    heading: {
        fontSize: '2.1rem',
        margin: '0 0 14px',
        letterSpacing: '.5px',
        color: '#103844'
    },
    message: {
        fontSize: '1.05rem',
        margin: '0 auto 10px',
        maxWidth: 560,
        lineHeight: 1.55,
        color: '#465a63'
    },
    note: {
        fontSize: '.85rem',
        margin: 0,
        color: '#6b7d86',
        fontStyle: 'italic'
    }
};

export default Maintenance;
