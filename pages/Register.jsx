import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            login(data.user, data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
            <div className="card" style={{ padding: '30px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--primary-color)' }}>Create Account</h2>
                {error && <div className="error-msg">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn"
                        style={{ width: '100%', marginTop: '10px' }}
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>
                <p style={{ marginTop: '20px', textAlign: 'center' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
