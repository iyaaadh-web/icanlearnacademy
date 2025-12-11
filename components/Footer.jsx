import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            background: 'var(--secondary-color)',
            color: 'var(--text-white)',
            padding: '40px 0',
            marginTop: 'auto'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                    <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>I Can Learn Academy</h3>
                    <p style={{ maxWidth: '300px', color: '#B0BEC5' }}>Empowering students with quality tuition in Maths, Science, and English.</p>
                </div>
                <div>
                    <h4 style={{ color: '#fff', marginBottom: '15px' }}>Quick Links</h4>
                    <ul style={{ listStyle: 'none' }}>
                        <li style={{ marginBottom: '8px' }}><a href="/" style={{ color: '#B0BEC5' }}>Home</a></li>
                        <li style={{ marginBottom: '8px' }}><a href="/dashboard" style={{ color: '#B0BEC5' }}>Courses</a></li>
                    </ul>
                </div>
                <div>
                    <h4 style={{ color: '#fff', marginBottom: '15px' }}>Contact</h4>
                    <p style={{ color: '#B0BEC5', marginBottom: '8px' }}>support@icanlearn.com</p>
                    <p style={{ color: '#B0BEC5' }}>+123 456 7890</p>
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #37474F', color: '#78909C', fontSize: '0.9rem' }}>
                &copy; {new Date().getFullYear()} I Can Learn Academy. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
