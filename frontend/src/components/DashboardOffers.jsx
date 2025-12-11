import React from 'react';
import './css/LandingPage.css';

const DashboardOffers = ({ offers, filteredOffers, searchQuery, setSearchQuery, handleBookNow }) => {
    return (
        <div className="tab-content active">
            <h1 style={{ padding: '25px 40px 10px', margin: 0, fontFamily: "'Playfair Display', serif" }}>
                Offers
            </h1>
            
            <div className="search-box" style={{ margin: '20px 40px', textAlign: 'right' }}>
                <input 
                    type="text" 
                    placeholder="Search venues..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        padding: '8px 12px',
                        borderRadius: '20px',
                        border: '1px solid #ccc',
                        width: '250px'
                    }}
                />
            </div>

            <div className="offers-container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '30px',
                padding: '0 40px 40px'
            }}>
                {filteredOffers.map(offer => (
                    <div key={offer.id} className="offer-card" style={{
                        background: 'white',
                        padding: '15px',
                        borderRadius: '8px',
                        display: 'flex',
                        gap: '15px',
                        border: '1px solid #ccc',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s',
                        cursor: 'pointer'
                    }}>
                        <img 
                            src={offer.image} 
                            alt={offer.title}
                            style={{
                                width: '230px',
                                height: '150px',
                                objectFit: 'cover',
                                borderRadius: '6px'
                            }}
                        />
                        <div style={{ flex: 1 }}>
                            <div className="offer-title" style={{
                                fontWeight: 'bold',
                                fontSize: '20px',
                                marginBottom: '10px',
                                color: '#bd9780'
                            }}>
                                {offer.title}
                            </div>
                            <p style={{ lineHeight: '1.5', color: '#666', marginBottom: '15px' }}>
                                <strong>Address:</strong> {offer.address}<br /><br />
                                <strong>Description:</strong> {offer.description}
                            </p>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                alignItems: 'flex-end'
                            }}>
                                <div style={{
                                    fontWeight: 'bold',
                                    color: '#bd9780',
                                    fontSize: '18px'
                                }}>
                                    ₱{offer.price}
                                </div>
                                <button 
                                    className="btn"
                                    onClick={() => handleBookNow(offer)}
                                    style={{
                                        marginTop: '15px',
                                        padding: '8px 20px',
                                        width: 'auto'
                                    }}
                                >
                                    BOOK NOW
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardOffers;