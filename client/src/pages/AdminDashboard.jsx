import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const { user, token } = useAuth(); // Assuming useAuth exposes token or we get it from localStorage
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({ title: '', description: '', price: '', instructor: '', image_url: '' });
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    // Re-verify admin status (also protected by route, but safe to check)
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
        } else {
            fetchCourses();
        }
    }, [user, navigate]);

    const fetchCourses = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/courses');
            const data = await res.json();
            setCourses(data);
        } catch (err) {
            console.error('Failed to fetch courses');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this course?')) return;

        try {
            const authToken = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3000/api/courses/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            if (res.ok) {
                setCourses(courses.filter(c => c.id !== id));
                setMsg('Course deleted successfully');
            } else {
                setMsg('Failed to delete course');
            }
        } catch (err) {
            setMsg('Error deleting course');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authToken = localStorage.getItem('token');
            const res = await fetch('http://localhost:3000/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(newCourse)
            });

            if (res.ok) {
                const addedCourse = await res.json();
                setCourses([...courses, addedCourse]);
                setNewCourse({ title: '', description: '', price: '', instructor: '', image_url: '' });
                setMsg('Course added successfully');
            } else {
                setMsg('Failed to add course');
            }
        } catch (err) {
            setMsg('Error adding course');
        }
    };

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <h1 style={{ marginBottom: '30px', borderBottom: '2px solid var(--primary-color)', paddingBottom: '10px' }}>
                Admin Dashboard
            </h1>

            {msg && <div style={{
                padding: '10px',
                background: msg.includes('Failed') || msg.includes('Error') ? '#ffebee' : '#e8f5e9',
                color: msg.includes('Failed') || msg.includes('Error') ? '#c62828' : '#2e7d32',
                marginBottom: '20px', borderRadius: '5px'
            }}>{msg}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
                {/* Add Course Form */}
                <div className="card">
                    <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Add New Course</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                value={newCourse.title}
                                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Instructor</label>
                            <input
                                type="text"
                                value={newCourse.instructor}
                                onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input
                                type="number"
                                value={newCourse.price}
                                onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                rows="3"
                                value={newCourse.description}
                                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label>Image URL (Optional)</label>
                            <input
                                type="text"
                                value={newCourse.image_url}
                                onChange={(e) => setNewCourse({ ...newCourse, image_url: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn" style={{ width: '100%' }}>Add Course</button>
                    </form>
                </div>

                {/* Course List */}
                <div>
                    <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Existing Courses</h2>
                    <div style={{ display: 'grid', gap: '15px' }}>
                        {courses.length === 0 ? <p>No courses found.</p> : courses.map(course => (
                            <div key={course.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{course.title}</h3>
                                    <p style={{ fontSize: '0.9rem', color: '#666' }}>{course.instructor} • ${course.price}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(course.id)}
                                    style={{
                                        background: '#ffEBEE', color: '#D32F2F', border: 'none',
                                        padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
