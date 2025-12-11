import React from 'react';
import './css/LandingPage.css';

const DashboardPayment = ({ selectedVenue, selectedWallet, setSelectedWallet, backToBooking, processPayment, wallets }) => {
    return (
        <div className="tab-content active">
            <div className="payment-container">
                <h1 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '28px',
                    marginBottom: '30px',
                    paddingBottom: '10px',
                    borderBottom: '2px solid #bd9780'
                }}>
                    SELECT PAYMENT METHOD
                </h1>
                
                {/* Payment Summary */}
                <div style={{
                    background: 'white',
                    borderRadius: '10px',
                    padding: '25px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    marginBottom: '30px'
                }}>
                    <h3 style={{
                        fontWeight: 'bold',
                        marginBottom: '15px',
                        fontSize: '18px',
                        color: '#333'
                    }}>
                        PAYMENT SUMMARY
                    </h3>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '15px 0',
                        borderBottom: '1px solid #eee'
                    }}>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{selectedVenue?.title}</div>
                            <div style={{ color: '#666', fontSize: '14px' }}>{selectedVenue?.address}</div>
                        </div>
                        <div style={{
                            fontWeight: 'bold',
                            color: '#bd9780',
                            fontSize: '20px'
                        }}>
                            ₱{selectedVenue?.price}.00
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '15px 0'
                    }}>
                        <div style={{ fontWeight: 'bold' }}>Total Amount:</div>
                        <div style={{
                            fontWeight: 'bold',
                            color: '#bd9780',
                            fontSize: '24px'
                        }}>
                            ₱{selectedVenue?.price}.00
                        </div>
                    </div>
                </div>
                
                {/* E-WALLETS Section */}
                <div style={{
                    background: 'white',
                    borderRadius: '10px',
                    padding: '25px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    marginBottom: '30px'
                }}>
                    <h3 style={{
                        fontWeight: 'bold',
                        marginBottom: '20px',
                        fontSize: '18px',
                        color: '#333',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <span style={{ fontSize: '24px' }}>📱</span> E-WALLET PAYMENT
                    </h3>
                    
                    <div style={{ marginBottom: '20px', color: '#666' }}>
                        Select your preferred e-wallet and proceed to payment. You will be shown a QR code to scan.
                    </div>
                    
                    {wallets.map(wallet => (
                        <div 
                            key={wallet.id}
                            onClick={() => setSelectedWallet(wallet)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                margin: '15px 0',
                                padding: '15px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                background: selectedWallet?.id === wallet.id ? '#f0e1d8' : 'transparent',
                                border: selectedWallet?.id === wallet.id ? '2px solid #bd9780' : '1px solid #ddd',
                                transform: selectedWallet?.id === wallet.id ? 'translateY(-2px)' : 'none',
                                boxShadow: selectedWallet?.id === wallet.id ? '0 5px 15px rgba(189, 151, 128, 0.2)' : 'none'
                            }}
                        >
                            <div style={{
                                width: '50px',
                                height: '50px',
                                background: '#e0e0e0',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                fontSize: '18px',
                                color: '#333'
                            }}>
                                {wallet.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ 
                                    fontWeight: 'bold', 
                                    fontSize: '16px',
                                    color: '#333'
                                }}>
                                    {wallet.name}
                                </div>
                                <div style={{ 
                                    fontSize: '14px', 
                                    color: '#666',
                                    marginTop: '5px'
                                }}>
                                    {wallet.number}
                                </div>
                            </div>
                            {selectedWallet?.id === wallet.id && (
                                <div style={{
                                    color: '#bd9780',
                                    fontSize: '20px'
                                }}>
                                    ✓
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                
                {/* Payment Instructions */}
                {selectedWallet && (
                    <div style={{
                        background: '#f9f9f9',
                        borderRadius: '10px',
                        padding: '20px',
                        marginBottom: '30px',
                        borderLeft: '4px solid #bd9780'
                    }}>
                        <h4 style={{
                            fontWeight: 'bold',
                            marginBottom: '10px',
                            color: '#333'
                        }}>
                            Payment Instructions:
                        </h4>
                        <ol style={{
                            margin: 0,
                            paddingLeft: '20px',
                            color: '#666',
                            lineHeight: '1.6'
                        }}>
                            <li>Select "PROCEED TO PAYMENT" to see the QR code</li>
                            <li>Open your {selectedWallet.name} app</li>
                            <li>Tap "Scan QR Code" in the app</li>
                            <li>Point your camera at the QR code</li>
                            <li>Confirm the payment in your app</li>
                            <li>Wait for payment confirmation</li>
                        </ol>
                    </div>
                )}
                
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '30px',
                    paddingTop: '20px',
                    borderTop: '1px solid #ddd'
                }}>
                    <button 
                        className="btn"
                        onClick={backToBooking}
                        style={{
                            background: '#ddd',
                            color: '#333',
                            width: 'auto',
                            padding: '12px 30px'
                        }}
                    >
                        ← BACK
                    </button>
                    
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        {selectedWallet && (
                            <div style={{
                                fontWeight: 'bold',
                                color: '#bd9780',
                                fontSize: '18px'
                            }}>
                                Pay with: {selectedWallet.name}
                            </div>
                        )}
                        <button 
                            className="btn"
                            onClick={processPayment}
                            style={{ 
                                width: 'auto',
                                padding: '12px 40px',
                                fontSize: '16px'
                            }}
                            disabled={!selectedWallet}
                        >
                            PROCEED TO PAYMENT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPayment;