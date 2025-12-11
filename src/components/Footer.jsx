import React from 'react';

const Footer = () => {
    const footerStyle = {
        background: '#333',
        color: '#fff',
        padding: '2rem 0',
        marginTop: 'auto'
    };

    return (
        <footer style={footerStyle}>
            <div className="container" style={{ textAlign: 'center' }}>
                <h3>I Can Learn Academy</h3>
                <p>Empowering students to achieve their best.</p>
                <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#ccc' }}>
                    &copy; {new Date().getFullYear()} I Can Learn Academy. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
