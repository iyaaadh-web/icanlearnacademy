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

    const navStyle = {
        background: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '1rem 0'
    };

    const navContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    };

    const logoStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'var(--primary-color)'
    };

    return (
        <nav className="navbar">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                    I Can Learn Academy
                </Link>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <Link to="/" style={{ fontWeight: 500 }}>Home</Link>
                    {/* <Link to="/courses" style={{ fontWeight: 500 }}>Courses</Link> */} {/* Hiding for now until page exists or maps to home */}

                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <Link to="/admin" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Admin</Link>
                            )}
                            <Link to="/dashboard" style={{ fontWeight: 500 }}>Dashboard</Link>
                            <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{user.name}</span>
                            <button
                                onClick={handleLogout}
                                className="btn btn-secondary"
                                style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ fontWeight: 500 }}>Login</Link>
                            <Link to="/register" className="btn" style={{ padding: '8px 20px' }}>Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
