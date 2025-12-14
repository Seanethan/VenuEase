// DashboardVenues.jsx - Updated version
import React from 'react';
import './css/LandingPage.css';

const DashboardVenues = ({ selectedVenue, startBooking }) => {
    if (!selectedVenue) {
        return (
            <div className="tab-content active">
                <h1 style={{ padding: '25px 40px 10px', margin: 0, fontFamily: "'Playfair Display', serif" }}>
                    Venue Details
                </h1>
                <div style={{ 
                    textAlign: 'center', 
                    padding: '40px',
                    color: '#666'
                }}>
                    <p>Please select a venue from the Offers tab to view details.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="tab-content active">
            <h1 style={{ padding: '25px 40px 10px', margin: 0, fontFamily: "'Playfair Display', serif" }}>
                {selectedVenue.title}
            </h1>
            
            <div style={{ padding: '0 40px' }}>
                {/* Venue Image */}
                <div style={{ marginBottom: '30px' }}>
                    <img
                        src={selectedVenue.image}
                        alt={selectedVenue.title}
                        style={{
                            width: '100%',
                            height: '400px',
                            objectFit: 'cover',
                            borderRadius: '8px'
                        }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
                        }}
                    />
                </div>

                {/* Venue Details */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '2fr 1fr', 
                    gap: '40px' 
                }}>
                    {/* Left Column - Details */}
                    <div>
                        <h2 style={{ color: '#bd9780', marginBottom: '20px' }}>Venue Details</h2>
                        
                        <div style={{ marginBottom: '30px' }}>
                            <h3 style={{ marginBottom: '10px' }}>Address</h3>
                            <p style={{ color: '#666', lineHeight: '1.6' }}>
                                {selectedVenue.address}
                            </p>
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <h3 style={{ marginBottom: '10px' }}>Description</h3>
                            <p style={{ color: '#666', lineHeight: '1.6' }}>
                                {selectedVenue.description}
                            </p>
                        </div>

                        {selectedVenue.capacity && (
                            <div style={{ marginBottom: '30px' }}>
                                <h3 style={{ marginBottom: '10px' }}>Capacity</h3>
                                <p style={{ color: '#666' }}>
                                    Up to {selectedVenue.capacity} people
                                </p>
                            </div>
                        )}

                        {/* Contact Information */}
                        {(selectedVenue.contact_email || selectedVenue.contact_phone) && (
                            <div style={{ marginBottom: '30px' }}>
                                <h3 style={{ marginBottom: '10px' }}>Contact Information</h3>
                                {selectedVenue.contact_email && (
                                    <p style={{ color: '#666', marginBottom: '5px' }}>
                                        <strong>Email:</strong> {selectedVenue.contact_email}
                                    </p>
                                )}
                                {selectedVenue.contact_phone && (
                                    <p style={{ color: '#666' }}>
                                        <strong>Phone:</strong> {selectedVenue.contact_phone}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Column - Booking Card */}
                    <div>
                        <div style={{
                            background: '#f8f8f8',
                            padding: '25px',
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0'
                        }}>
                            <h3 style={{ 
                                color: '#bd9780', 
                                marginBottom: '20px',
                                textAlign: 'center'
                            }}>
                                Booking Summary
                            </h3>
                            
                            <div style={{ marginBottom: '25px' }}>
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    marginBottom: '10px'
                                }}>
                                    <span>Venue:</span>
                                    <span style={{ fontWeight: 'bold' }}>{selectedVenue.title}</span>
                                </div>
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    marginBottom: '15px'
                                }}>
                                    <span>Price:</span>
                                    <span style={{ 
                                        fontWeight: 'bold', 
                                        color: '#bd9780',
                                        fontSize: '18px'
                                    }}>
                                        ₱{selectedVenue.price}
                                    </span>
                                </div>
                                {selectedVenue.capacity && (
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between',
                                        marginBottom: '15px'
                                    }}>
                                        <span>Capacity:</span>
                                        <span>{selectedVenue.capacity} people</span>
                                    </div>
                                )}
                            </div>

                            <button
                                className="btn"
                                onClick={() => startBooking(selectedVenue)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: '#bd9780',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                BOOK THIS VENUE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardVenues;