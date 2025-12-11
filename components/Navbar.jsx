import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                    I Can Learn Academy
                </Link>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <Link to="/" style={{ fontWeight: '500' }}>Home</Link>

                    {user ? (
                        <>
                            <Link to="/dashboard" style={{ fontWeight: '500' }}>Dashboard</Link>
                            {user.role === 'admin' && (
                                <Link to="/admin" style={{ color: 'var(--primary-dark)', fontWeight: 'bold' }}>Admin Panel</Link>
                            )}
                            <span style={{ color: '#666' }}>Hi, {user.name}</span>
                            <button onClick={handleLogout} className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.9rem' }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ fontWeight: '500' }}>Login</Link>
                            <Link to="/register" className="btn" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                                Gets Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
