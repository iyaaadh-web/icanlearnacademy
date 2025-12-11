import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';

const Dashboard = () => {
    const { user } = useAuth();
    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(false); // Enable fetch when backend ready

    useEffect(() => {
        // Mock data for dashboard
        // In real app, fetch from /api/my-courses with token
        setMyCourses([]);
    }, []);

    return (
        <div className="container">
            <div style={{
                background: 'linear-gradient(to right, var(--primary-color), #ff8a65)',
                color: '#fff',
                padding: '30px',
                borderRadius: '10px',
                marginBottom: '30px',
                marginTop: '20px'
            }}>
                <h1>Welcome, {user?.name}!</h1>
                <p>Manage your learning journey here.</p>
            </div>

            <div style={{ display: 'flex', gap: '30px' }}>
                <aside style={{ width: '250px' }}>
                    <div className="card" style={{ padding: '20px' }}>
                        <ul style={{ listStyle: 'none' }}>
                            <li style={{ padding: '10px 0', borderBottom: '1px solid #eee', fontWeight: 'bold', color: 'var(--primary-color)' }}>My Courses</li>
                            <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>Assignments</li>
                            <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>Grades</li>
                            <li style={{ padding: '10px 0' }}>Profile Settings</li>
                        </ul>
                    </div>
                </aside>

                <main style={{ flex: 1 }}>
                    <h2 style={{ marginBottom: '20px' }}>My Enrolled Courses</h2>
                    {myCourses.length === 0 ? (
                        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
                            <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>You haven't enrolled in any courses yet.</p>
                            <button className="btn" onClick={() => window.location.href = '/'}>Browse Courses</button>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                            {myCourses.map(course => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    actionLabel="Go to Classroom"
                                    onAction={() => alert('Entering classroom...')}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
