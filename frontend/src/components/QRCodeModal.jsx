import React from 'react';
import './css/LandingPage.css';

const QRCodeModal = ({ selectedPaymentMethod, selectedVenue, closeQRModal, confirmPayment }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{
                background: 'white',
                padding: '40px',
                borderRadius: '15px',
                textAlign: 'center',
                maxWidth: '500px',
                width: '90%',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
            }}>
                <button 
                    onClick={closeQRModal}
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                        color: '#666',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#eee'}
                    onMouseLeave={(e) => e.target.style.background = 'none'}
                >
                    ×
                </button>
                
                <div style={{ 
                    fontSize: '40px',
                    marginBottom: '20px',
                    color: '#bd9780'
                }}>
                    {selectedPaymentMethod.icon === 'GC' && '💰'}
                    {selectedPaymentMethod.icon === 'PP' && '💳'}
                    {selectedPaymentMethod.icon === 'MP' && '📱'}
                </div>
                
                <h2 style={{ 
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '24px',
                    marginBottom: '10px',
                    color: '#333'
                }}>
                    Scan QR Code to Pay
                </h2>
                
                <p style={{ 
                    color: '#666',
                    marginBottom: '30px',
                    fontSize: '16px'
                }}>
                    Open your <strong>{selectedPaymentMethod.name}</strong> app and scan the QR code below
                </p>
                
                {/* QR Code Display */}
                <div style={{
                    width: '250px',
                    height: '250px',
                    background: '#fff',
                    margin: '0 auto 30px',
                    padding: '15px',
                    borderRadius: '10px',
                    border: '1px solid #ddd',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                }}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: `url(${selectedPaymentMethod.qrCode}) center/contain no-repeat`,
                        backgroundColor: '#f5f5f5',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        color: '#666'
                    }}>
                        {/* Fallback text if image doesn't load */}
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '40px', marginBottom: '10px' }}>📱</div>
                            <div>{selectedPaymentMethod.name} QR Code</div>
                        </div>
                    </div>
                </div>
                
                <div style={{ 
                    margin: '20px 0',
                    padding: '15px',
                    background: '#f9f9f9',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#666'
                }}>
                    <p><strong>Amount to Pay:</strong> ₱{selectedVenue?.price || '0'}.00</p>
                    <p><strong>Payment Method:</strong> {selectedPaymentMethod.name}</p>
                </div>
                
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button 
                        className="btn"
                        onClick={closeQRModal}
                        style={{
                            background: '#ddd',
                            color: '#333',
                            width: 'auto'
                        }}
                    >
                        Cancel
                    </button>
                    <button 
                        className="btn"
                        onClick={confirmPayment}
                        style={{ width: 'auto' }}
                    >
                        I Have Paid
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QRCodeModal;