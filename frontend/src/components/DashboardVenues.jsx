import React, { useState, useEffect } from 'react';
import './css/LandingPage.css';
import axios from 'axios';

const DashboardVenues = ({ selectedVenue, selectedVenueId, startBooking }) => {
    const [venueData, setVenueData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch venue details if we have an ID but no data
    useEffect(() => {
        if (selectedVenueId && (!selectedVenue || !selectedVenue.images)) {
            fetchVenueDetails(selectedVenueId);
        } else if (selectedVenue) {
            // Use the provided venue data
            setVenueData(selectedVenue);
        }
    }, [selectedVenueId, selectedVenue]);

    const fetchVenueDetails = async (venueId) => {
        try {
            setLoading(true);
            setError(null);
            
            console.log(`Fetching venue details for ID: ${venueId}`);
            const response = await axios.get(`http://localhost:5000/api/venues/${venueId}`);
            
            // Transform the data for display
            const transformedVenue = {
                id: response.data.id || response.data.venue_ID,
                title: response.data.title || response.data.venue_Name,
                address: response.data.address,
                description: response.data.description || 'No description available',
                price: response.data.price,
                capacity: response.data.capacity,
                contact_email: response.data.contact_email || response.data.contact_Email,
                contact_phone: response.data.contact_phone || response.data.contact_Phone,
                images: response.data.images || response.data.all_images || [],
                main_image: response.data.main_image || response.data.image || 
                    'https://via.placeholder.com/800x400?text=No+Image'
            };
            
            setVenueData(transformedVenue);
            console.log('Venue details loaded:', transformedVenue);
        } catch (err) {
            console.error('Error fetching venue details:', err);
            setError('Failed to load venue details. Please try again.');
            // Fallback to the basic venue data if available
            if (selectedVenue) {
                setVenueData(selectedVenue);
            }
        } finally {
            setLoading(false);
        }
    };

    // Helper function to get full image URL
    const getFullImageUrl = (imagePath) => {
        if (!imagePath) return 'https://via.placeholder.com/800x400?text=No+Image';
        if (imagePath.startsWith('http')) return imagePath;
        if (imagePath.startsWith('/uploads/')) {
            return `http://localhost:5000${imagePath}`;
        }
        return `http://localhost:5000/uploads/venues/${imagePath}`;
    };

    // Show loading state
    if (loading) {
        return (
            <div className="tab-content active">
                <h1 style={{ padding: '25px 40px 10px', margin: 0, fontFamily: "'Playfair Display', serif" }}>
                    Loading Venue Details...
                </h1>
                <div style={{ 
                    textAlign: 'center', 
                    padding: '40px',
                    color: '#666'
                }}>
                    <div style={{ marginBottom: '20px' }}>
                        <div className="loading-spinner"></div>
                    </div>
                    <p>Loading venue information...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="tab-content active">
                <h1 style={{ padding: '25px 40px 10px', margin: 0, fontFamily: "'Playfair Display', serif" }}>
                    Venue Details
                </h1>
                <div style={{ 
                    textAlign: 'center', 
                    padding: '40px',
                    color: '#ff6b6b'
                }}>
                    <p>{error}</p>
                    <button 
                        onClick={() => selectedVenueId && fetchVenueDetails(selectedVenueId)}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            backgroundColor: '#bd9780',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Show no venue selected
    if (!venueData && !selectedVenueId) {
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

    // Show venue details
    const venue = venueData || selectedVenue;
    
    return (
        <div className="tab-content active">
            <h1 style={{ padding: '25px 40px 10px', margin: 0, fontFamily: "'Playfair Display', serif" }}>
                {venue.title}
            </h1>
            
            <div style={{ padding: '0 40px' }}>
                {/* Venue Image */}
                <div style={{ marginBottom: '30px' }}>
                    <img
                        src={getFullImageUrl(venue.main_image || venue.image || (venue.images && venue.images[0]))}
                        alt={venue.title}
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
                                {venue.address}
                            </p>
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <h3 style={{ marginBottom: '10px' }}>Description</h3>
                            <p style={{ color: '#666', lineHeight: '1.6' }}>
                                {venue.description}
                            </p>
                        </div>

                        {venue.capacity && (
                            <div style={{ marginBottom: '30px' }}>
                                <h3 style={{ marginBottom: '10px' }}>Capacity</h3>
                                <p style={{ color: '#666' }}>
                                    Up to {venue.capacity} people
                                </p>
                            </div>
                        )}

                        {/* Contact Information */}
                        {(venue.contact_email || venue.contact_phone) && (
                            <div style={{ marginBottom: '30px' }}>
                                <h3 style={{ marginBottom: '10px' }}>Contact Information</h3>
                                {venue.contact_email && (
                                    <p style={{ color: '#666', marginBottom: '5px' }}>
                                        <strong>Email:</strong> {venue.contact_email}
                                    </p>
                                )}
                                {venue.contact_phone && (
                                    <p style={{ color: '#666' }}>
                                        <strong>Phone:</strong> {venue.contact_phone}
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
                                    <span style={{ fontWeight: 'bold' }}>{venue.title}</span>
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
                                        ${parseFloat(venue.price).toFixed(2)}
                                    </span>
                                </div>
                                {venue.capacity && (
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between',
                                        marginBottom: '15px'
                                    }}>
                                        <span>Capacity:</span>
                                        <span>{venue.capacity} people</span>
                                    </div>
                                )}
                            </div>

                            <button
                                className="btn"
                                onClick={() => startBooking(venue)}
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