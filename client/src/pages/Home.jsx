import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/courses');
                if (res.ok) {
                    const data = await res.json();
                    setCourses(data);
                } else {
                    console.error('Failed to fetch courses');
                }
            } catch (err) {
                console.error('Error fetching courses:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const heroSectionStyle = {
        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: '100px 0',
        borderRadius: '0 0 50px 50px',
        marginBottom: '60px',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 10px 30px rgba(255, 112, 67, 0.3)'
    };

    return (
        <div>
            <section style={heroSectionStyle}>
                <div className="container">
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: '800', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                        Unlock Your Potential
                    </h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '700px', margin: '0 auto 40px', opacity: 0.9 }}>
                        Join I Can Learn Academy to access top-tier tuition and educational resources designed to help you excel.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                        <Link to="/register" className="btn" style={{ background: 'white', color: 'var(--primary-color)', fontSize: '1.1rem', padding: '15px 35px' }}>
                            Get Started
                        </Link>
                        {/* <Link to="/courses" className="btn btn-secondary" style={{ borderColor: 'white', color: 'white' }}>
                            Browse Courses
                        </Link> */}
                    </div>
                </div>
            </section>

            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '2rem', borderLeft: '5px solid var(--primary-color)', paddingLeft: '20px' }}>
                        Popular Courses
                    </h2>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                        <p>Loading courses...</p>
                    </div>
                ) : courses.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '10px', boxShadow: 'var(--shadow-sm)' }}>
                        <h3 style={{ marginBottom: '10px' }}>No courses available yet.</h3>
                        <p>Check back soon or contact us for more information.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                        {courses.map(course => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                onAction={() => alert('Please login to enroll!')}
                                actionLabel="Enroll Now"
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="container" style={{ marginTop: '100px', marginBottom: '80px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '2rem' }}>Why Choose Us?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', textAlign: 'center' }}>
                    <div style={{ padding: '30px', background: 'white', borderRadius: '20px', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '20px' }}>🎓</div>
                        <h3 style={{ marginBottom: '15px', color: 'var(--text-dark)' }}>Expert Tutors</h3>
                        <p style={{ color: 'var(--text-light)' }}>Learn from the best educators in the field with years of proven experience.</p>
                    </div>
                    <div style={{ padding: '30px', background: 'white', borderRadius: '20px', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '20px' }}>🕐</div>
                        <h3 style={{ marginBottom: '15px', color: 'var(--text-dark)' }}>Flexible Learning</h3>
                        <p style={{ color: 'var(--text-light)' }}>Study at your own pace, anytime, anywhere access to materials.</p>
                    </div>
                    <div style={{ padding: '30px', background: 'white', borderRadius: '20px', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '20px' }}>📈</div>
                        <h3 style={{ marginBottom: '15px', color: 'var(--text-dark)' }}>Proven Results</h3>
                        <p style={{ color: 'var(--text-light)' }}>Our students consistently achieve top grades and excel in their exams.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
