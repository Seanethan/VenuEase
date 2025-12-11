import React from 'react';
import './css/LandingPage.css';

const PaymentSuccessModal = ({ selectedVenue, closePaymentModal }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: 'white',
                padding: '40px',
                borderRadius: '10px',
                textAlign: 'center',
                maxWidth: '500px',
                width: '90%',
                boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
            }}>
                <div style={{ fontSize: '60px', color: '#4CAF50', marginBottom: '20px' }}>✓</div>
                <h2 style={{ 
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '24px',
                    marginBottom: '20px'
                }}>
                    PAYMENT SUCCESSFUL!
                </h2>
                
                <div style={{ 
                    margin: '20px 0',
                    padding: '15px',
                    background: '#f9f9f9',
                    borderRadius: '8px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                        <span>Amount Paid:</span>
                        <span>₱{selectedVenue?.price}.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                        <span>Venue:</span>
                        <span>{selectedVenue?.title}</span>
                    </div>
                </div>
                
                <p style={{ color: '#666' }}>
                    Your payment has been processed successfully. You will receive a confirmation email shortly.
                </p>
                
                <button 
                    className="btn"
                    onClick={closePaymentModal}
                    style={{ marginTop: '20px', width: 'auto' }}
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccessModal;