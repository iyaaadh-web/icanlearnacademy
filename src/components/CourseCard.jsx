import React from 'react';

const CourseCard = ({ course, onAction, actionLabel = 'View Details' }) => {
    return (
        <div className="card">
            <div style={{ height: '150px', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {course.image_url ? (
                    <img src={course.image_url} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <span style={{ color: '#aaa' }}>No Image</span>
                )}
            </div>
            <div style={{ padding: '15px' }}>
                <h3 style={{ marginBottom: '10px' }}>{course.title}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '10px' }}>
                    {course.description ? course.description.substring(0, 80) + '...' : 'No description'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>${course.price}</span>
                    <button className="btn" onClick={() => onAction(course)}>
                        {actionLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
