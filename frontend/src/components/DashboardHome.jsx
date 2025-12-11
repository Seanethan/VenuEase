import React, { useState } from 'react';
import './css/LandingPage.css';

const DashboardHome = ({ recentEvents }) => {
    const [expandedEvents, setExpandedEvents] = useState({});

    const toggleEventExpand = (eventId) => {
        setExpandedEvents(prev => ({
            ...prev,
            [eventId]: !prev[eventId]
        }));
    };

    return (
        <div className="tab-content active">
            <h1 className="section-title" style={{ padding: '25px 40px 10px', margin: 0, fontFamily: "'Playfair Display', serif" }}>
                Recent Events
            </h1>
            
            {recentEvents.map(event => (
                <div key={event.id} className="event-container" style={{
                    display: 'flex',
                    gap: '30px',
                    padding: '30px 40px',
                    background: 'white',
                    margin: '20px 40px',
                    borderRadius: '10px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                    <div className="event-img" style={{ flex: 1 }}>
                        <img 
                            src={event.image} 
                            alt={event.title}
                            style={{ 
                                width: '100%', 
                                height: '300px', 
                                objectFit: 'cover',
                                borderRadius: '10px'
                            }}
                        />
                    </div>
                    <div className="event-details" style={{ flex: 2 }}>
                        <h3 style={{ marginTop: 0, color: '#333' }}>{event.title}</h3>
                        <p style={{ 
                            lineHeight: '1.6',
                            color: '#666',
                            maxHeight: expandedEvents[event.id] ? 'none' : '120px',
                            overflow: 'hidden'
                        }}>
                            {event.description}
                        </p>
                        <button 
                            className="read-more-btn"
                            onClick={() => toggleEventExpand(event.id)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#bd9780',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                padding: '5px 0',
                                marginTop: '10px'
                            }}
                        >
                            {expandedEvents[event.id] ? 'Read Less <' : 'Read More >'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardHome;