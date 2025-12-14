import React, { useState } from 'react';
import './css/LandingPage.css';
import DashboardHome from './DashboardHome.jsx';
import DashboardOffers from './DashboardOffers.jsx';
import DashboardVenues from './DashboardVenues.jsx';
import DashboardBooking from './DashboardBooking.jsx';
import DashboardPayment from './DashboardPayment.jsx';
import QRCodeModal from './QRCodeModal.jsx';
import PaymentSuccessModal from './PaymentSuccessModal.jsx';
import { FaUserCircle } from 'react-icons/fa';

const Dashboard = ({ user, onLogout }) => {
    const [activeTab, setActiveTab] = useState('home');
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [bookingData, setBookingData] = useState({
        fromDate: '',
        toDate: '',
        fromTime: '',
        toTime: ''
    });
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [showQRModal, setShowQRModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    // Mock data for events
    const recentEvents = [
        {
            id: 1,
            title: "Wedding Celebration",
            image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
        },
        {
            id: 2,
            title: "Corporate Conference",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Another detailed description about the corporate conference event with additional information about the venue, speakers, and schedule."
        }
    ];

    // Updated wallets with QR codes
    const wallets = [
        { 
            id: 1, 
            name: "GCash", 
            number: "+63 000 000 0000", 
            icon: "GC",
            qrCode: "/gcash-qr.png",
            instructions: "Scan this QR code using GCash app to pay"
        },
        { 
            id: 2, 
            name: "PayPal", 
            number: "user@example.com", 
            icon: "PP",
            qrCode: "/paypal-qr.png",
            instructions: "Scan this QR code using PayPal app to pay"
        },
        { 
            id: 3, 
            name: "Maya", 
            number: "+63 000 000 0000", 
            icon: "MP",
            qrCode: "/maya_qr_for_payment.jpg",
            instructions: "Scan this QR code using Maya app to pay"
        }
    ];

    const handleBookNow = (offer) => {
        console.log('Booking offer from Dashboard:', offer);
        setSelectedVenue(offer);
        setActiveTab('venues');
    };

    const startBooking = (offer) => {
        setSelectedVenue(offer);
        setActiveTab('booking');
    };

    const cancelBooking = () => {
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            setBookingData({
                fromDate: '',
                toDate: '',
                fromTime: '',
                toTime: ''
            });
            setSelectedVenue(null);
            setActiveTab('venues');
        }
    };

    const proceedToPayment = () => {
        if (!bookingData.fromDate || !bookingData.toDate || !bookingData.fromTime || !bookingData.toTime) {
            alert("Please fill in all date and time fields");
            return;
        }
        setActiveTab('payment');
    };

    const backToBooking = () => {
        setActiveTab('booking');
    };

    const processPayment = () => {
        if (!selectedWallet) {
            alert("Please select a payment method");
            return;
        }
        setSelectedPaymentMethod(selectedWallet);
        setShowQRModal(true);
    };

    const confirmPayment = () => {
        setShowQRModal(false);
        setShowPaymentModal(true);
        setTimeout(() => {
            setShowPaymentModal(false);
            setSelectedWallet(null);
            setBookingData({
                fromDate: '',
                toDate: '',
                fromTime: '',
                toTime: ''
            });
            setSelectedVenue(null);
            setActiveTab('venues');
        }, 3000);
    };

    const closeQRModal = () => {
        setShowQRModal(false);
    };

    const closePaymentModal = () => {
        setShowPaymentModal(false);
        setSelectedWallet(null);
        setBookingData({
            fromDate: '',
            toDate: '',
            fromTime: '',
            toTime: ''
        });
        setSelectedVenue(null);
        setActiveTab('venues');
    };

    return (
        <div className="dashboard">
            {/* Header */}
            <header className="header">
                <div className="container1">
                    <div className="logo">
                        <h1>VENUEASE</h1>
                        <p>Welcome, <strong>{user.full_Name}</strong></p>
                    </div>
                    <nav className="navigation">
                        <button className="profile-icon-btn" title="Profile Settings">
                            <FaUserCircle size={26} />
                        </button>
                        <button 
                            className="btn-logout"
                            onClick={onLogout}
                        >
                            Logout
                        </button>
                    </nav>
                </div>
            </header>

            {/* Tabs Navigation */}
            <div style={{
                display: 'flex',
                gap: '25px',
                padding: '10px 40px',
                borderBottom: '2px solid #333',
                background: 'white'
            }}>
                <button 
                    onClick={() => {
                        setActiveTab('home');
                        setSelectedVenue(null);
                    }}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: activeTab === 'home' ? '#bd9780' : '#333',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        paddingBottom: '8px',
                        borderBottom: activeTab === 'home' ? '2px solid #bd9780' : 'none'
                    }}
                >
                    Home
                </button>
                <button 
                    onClick={() => {
                        setActiveTab('offers');
                        setSelectedVenue(null);
                    }}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: activeTab === 'offers' ? '#bd9780' : '#333',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        paddingBottom: '8px',
                        borderBottom: activeTab === 'offers' ? '2px solid #bd9780' : 'none'
                    }}
                >
                    Offers
                </button>
                <button 
                    onClick={() => {
                        setActiveTab('venues');
                    }}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: activeTab === 'venues' ? '#bd9780' : '#333',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        paddingBottom: '8px',
                        borderBottom: activeTab === 'venues' ? '2px solid #bd9780' : 'none'
                    }}
                >
                    Venues
                </button>
            </div>

            {/* Main Content */}
            <div className="dashboard-content">
                {activeTab === 'home' && (
                    <DashboardHome 
                        recentEvents={recentEvents}
                    />
                )}
                {activeTab === 'offers' && (
                    <DashboardOffers 
                        handleBookNow={handleBookNow}
                    />
                )}
                {activeTab === 'venues' && (
                    <DashboardVenues 
                        selectedVenue={selectedVenue}
                        startBooking={startBooking}
                    />
                )}
                {activeTab === 'booking' && (
                    <DashboardBooking 
                        selectedVenue={selectedVenue}
                        bookingData={bookingData}
                        setBookingData={setBookingData}
                        cancelBooking={cancelBooking}
                        proceedToPayment={proceedToPayment}
                    />
                )}
                {activeTab === 'payment' && (
                    <DashboardPayment 
                        selectedVenue={selectedVenue}
                        selectedWallet={selectedWallet}
                        setSelectedWallet={setSelectedWallet}
                        backToBooking={backToBooking}
                        processPayment={processPayment}
                        wallets={wallets}
                    />
                )}
            </div>

            {/* Modals */}
            {showQRModal && selectedPaymentMethod && (
                <QRCodeModal 
                    selectedPaymentMethod={selectedPaymentMethod}
                    selectedVenue={selectedVenue}
                    closeQRModal={closeQRModal}
                    confirmPayment={confirmPayment}
                />
            )}

            {showPaymentModal && (
                <PaymentSuccessModal 
                    selectedVenue={selectedVenue}
                    closePaymentModal={closePaymentModal}
                />
            )}
        </div>
    );
};

export default Dashboard;