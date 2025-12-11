import React from 'react';
import './css/LandingPage.css';

const DashboardBooking = ({ selectedVenue, bookingData, setBookingData, cancelBooking, proceedToPayment }) => {
    return (
        <div className="tab-content active">
            <div className="booking-container">
                <h1 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '28px',
                    marginBottom: '10px'
                }}>
                    {selectedVenue?.title}
                </h1>
                
                <div style={{
                    background: 'white',
                    borderRadius: '10px',
                    padding: '25px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    marginBottom: '30px'
                }}>
                    <div style={{ marginBottom: '20px' }}>
                        <p style={{ margin: '5px 0' }}>
                            <strong>Address:</strong> {selectedVenue?.address}
                        </p>
                        <div style={{
                            fontWeight: 'bold',
                            color: '#bd9780',
                            fontSize: '18px',
                            margin: '15px 0'
                        }}>
                            PRICE: ₱{selectedVenue?.price}
                        </div>
                    </div>
                    
                    <h3 style={{
                        fontWeight: 'bold',
                        marginBottom: '15px',
                        fontSize: '18px',
                        color: '#333',
                        borderBottom: '1px solid #eee',
                        paddingBottom: '10px'
                    }}>
                        DESCRIPTION
                    </h3>
                    <p style={{ lineHeight: '1.6', color: '#666' }}>
                        {selectedVenue?.description} INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. UT ENIM AD MINIM VENIAM, QUIS NOSTRUD EXERCITATION ULLAMCO LABORIS NISI UT ALIQUIP EX EA COMMODO CONSEQUAT.
                    </p>
                </div>
                
                <div style={{
                    background: 'white',
                    borderRadius: '10px',
                    padding: '25px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    marginBottom: '20px'
                }}>
                    <h3 style={{
                        fontWeight: 'bold',
                        marginBottom: '15px',
                        fontSize: '18px',
                        color: '#333',
                        borderBottom: '1px solid #eee',
                        paddingBottom: '10px'
                    }}>
                        DATE & TIME
                    </h3>
                    
                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>From Date:</label>
                            <input 
                                type="date"
                                value={bookingData.fromDate}
                                onChange={(e) => setBookingData({...bookingData, fromDate: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    marginBottom: '15px',
                                    fontFamily: 'inherit'
                                }}
                            />
                            
                            <label style={{ display: 'block', marginBottom: '5px' }}>To Date:</label>
                            <input 
                                type="date"
                                value={bookingData.toDate}
                                onChange={(e) => setBookingData({...bookingData, toDate: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    marginBottom: '15px',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>
                        
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>From Time:</label>
                            <input 
                                type="time"
                                value={bookingData.fromTime}
                                onChange={(e) => setBookingData({...bookingData, fromTime: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    marginBottom: '15px',
                                    fontFamily: 'inherit'
                                }}
                            />
                            
                            <label style={{ display: 'block', marginBottom: '5px' }}>To Time:</label>
                            <input 
                                type="time"
                                value={bookingData.toTime}
                                onChange={(e) => setBookingData({...bookingData, toTime: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    marginBottom: '15px',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>
                    </div>
                </div>
                
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '15px',
                    marginTop: '30px'
                }}>
                    <button 
                        className="btn"
                        onClick={cancelBooking}
                        style={{
                            background: '#ddd',
                            color: '#333',
                            width: 'auto'
                        }}
                    >
                        CANCEL
                    </button>
                    <button 
                        className="btn"
                        onClick={proceedToPayment}
                        style={{ width: 'auto' }}
                    >
                        CONTINUE TO PAYMENT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardBooking;