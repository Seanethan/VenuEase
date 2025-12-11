import React from 'react';
import './css/LandingPage.css';

const DashboardVenues = ({ selectedVenue, offers, setSelectedVenue, startBooking }) => {
    // If we have a selected venue from Offers tab, show only that one
    const venueToShow = selectedVenue || offers[0];
    
    return (
        <div className="tab-content active">
            <div style={{ padding: '40px' }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <h1 style={{ 
                        margin: 0, 
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '32px'
                    }}>
                        {selectedVenue ? 'Selected Venue' : 'Featured Venues'}
                    </h1>
                    {selectedVenue && (
                        <button 
                            className="btn"
                            onClick={() => setSelectedVenue(null)}
                            style={{
                                background: '#ddd',
                                color: '#333',
                                width: 'auto'
                            }}
                        >
                            View All Venues
                        </button>
                    )}
                </div>

                <div className="venue-info">
                    <img 
                        src={venueToShow.image} 
                        alt={venueToShow.title}
                        style={{
                            width: '380px',
                            height: '300px',
                            objectFit: 'cover',
                            borderRadius: '10px'
                        }}
                    />
                    <div className="venue-text">
                        <h2>{venueToShow.title}</h2>
                        <p style={{ 
                            fontSize: '14px', 
                            color: '#666',
                            marginBottom: '20px'
                        }}>
                            {venueToShow.venueAddress || venueToShow.address}<br />
                            PRICE: {venueToShow.venuePrice || `₱${venueToShow.price}`}
                        </p>
                        <h3 style={{ margin: '20px 0 10px 0', color: '#333' }}>
                            Description:
                        </h3>
                        <p style={{ lineHeight: '1.6', color: '#666' }}>
                            {venueToShow.venueDescription || venueToShow.description}
                        </p>
                    </div>
                </div>

                <h3 style={{ 
                    margin: '40px 0 20px 0', 
                    fontSize: '24px',
                    color: '#333',
                    borderBottom: '2px solid #bd9780',
                    paddingBottom: '10px'
                }}>
                    REVIEWS
                </h3>

                <div className="reviews">
                    {venueToShow.reviews?.map(review => (
                        <div key={review.id} className="review-card">
                            <div style={{
                                fontSize: '40px',
                                marginBottom: '15px'
                            }}>
                                {review.avatar}
                            </div>
                            <h4 style={{ margin: '10px 0', fontSize: '18px' }}>
                                {review.comment.split('!')[0]}!
                            </h4>
                            <p style={{ 
                                margin: '10px 0', 
                                fontSize: '14px',
                                lineHeight: '1.4'
                            }}>
                                {review.comment.split('!')[1]}
                            </p>
                            <div style={{ 
                                marginTop: '15px', 
                                fontSize: '20px',
                                color: '#FFD700'
                            }}>
                                {'★'.repeat(review.rating)}
                            </div>
                            <p style={{ marginTop: '10px', fontSize: '12px' }}>
                                - {review.user}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="buttons" style={{
                    display: 'flex',
                    gap: '20px',
                    justifyContent: 'center',
                    marginTop: '30px'
                }}>
                    <button className="btn" style={{ width: '200px' }}>
                        ➤ Make a Review
                    </button>
                    <button 
                        className="btn" 
                        style={{ width: '200px' }}
                        onClick={() => startBooking(venueToShow)}
                    >
                        ➤ Book Now!
                    </button>
                </div>

                {!selectedVenue && (
                    <div style={{ marginTop: '50px' }}>
                        <h3 style={{ 
                            marginBottom: '20px', 
                            fontSize: '24px',
                            color: '#333'
                        }}>
                            Other Venues
                        </h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '20px'
                        }}>
                            {offers.slice(1, 3).map(venue => (
                                <div 
                                    key={venue.id}
                                    onClick={() => setSelectedVenue(venue)}
                                    style={{
                                        background: 'white',
                                        padding: '20px',
                                        borderRadius: '10px',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        gap: '15px',
                                        alignItems: 'center'
                                    }}>
                                        <img 
                                            src={venue.image}
                                            alt={venue.title}
                                            style={{
                                                width: '100px',
                                                height: '80px',
                                                objectFit: 'cover',
                                                borderRadius: '5px'
                                            }}
                                        />
                                        <div>
                                            <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>
                                                {venue.title}
                                            </h4>
                                            <p style={{ 
                                                fontSize: '12px', 
                                                color: '#666',
                                                margin: '0 0 5px 0'
                                            }}>
                                                {venue.address}
                                            </p>
                                            <div style={{
                                                fontWeight: 'bold',
                                                color: '#bd9780'
                                            }}>
                                                {venue.venuePrice || `₱${venue.price}`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardVenues;