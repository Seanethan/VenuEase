import React, { useState } from 'react';
import './css/LandingPage.css';
import DashboardHome from './DashboardHome.jsx';
import DashboardOffers from './DashboardOffers.jsx';
import DashboardVenues from './DashboardVenues.jsx';
import DashboardBooking from './DashboardBooking.jsx';
import DashboardPayment from './DashboardPayment.jsx';
import QRCodeModal from './QRCodeModal.jsx';
import PaymentSuccessModal from './PaymentSuccessModal.jsx';

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
    const [searchQuery, setSearchQuery] = useState('');

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

    // Mock data for offers
    const offers = [
        {
            id: 1,
            title: "THE REVEREND",
            address: "Bago Bantay, Quezon City",
            venueAddress: "Aregante Street, Biñang, Dasmariñas, City",
            price: 666,
            venuePrice: "₱14,000",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            venueDescription: "Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            reviews: [
                { id: 1, user: "John Doe", rating: 5, comment: "Excellent and Cool! Very accommodating staff and beautiful venue.", avatar: "👤" },
                { id: 2, user: "Jane Smith", rating: 5, comment: "Loved the atmosphere. Highly recommended.", avatar: "👤" },
                { id: 3, user: "Mike Johnson", rating: 5, comment: "Perfect for any event. Will book again.", avatar: "👤" }
            ]
        },
        {
            id: 2,
            title: "GRAND BALLROOM",
            address: "Makati City",
            venueAddress: "Ayala Avenue, Makati City",
            price: 1200,
            venuePrice: "₱25,000",
            image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Elegant ballroom perfect for weddings and corporate events.",
            venueDescription: "A luxurious ballroom with crystal chandeliers and marble floors. Perfect for grand weddings, corporate galas, and formal events. Features state-of-the-art audio-visual equipment and professional event planning services.",
            reviews: [
                { id: 1, user: "Sarah Wilson", rating: 5, comment: "Absolutely stunning venue! Perfect for our wedding.", avatar: "👤" },
                { id: 2, user: "David Chen", rating: 4, comment: "Great for corporate events. Professional staff.", avatar: "👤" }
            ]
        },
        {
            id: 3,
            title: "GARDEN PAVILION",
            address: "Tagaytay City",
            venueAddress: "Crosswinds, Tagaytay City",
            price: 950,
            venuePrice: "₱18,000",
            image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Beautiful garden venue with scenic views.",
            venueDescription: "Nestled in the mountains of Tagaytay, this garden pavilion offers breathtaking views of Taal Lake. Perfect for intimate weddings, family gatherings, and outdoor corporate retreats.",
            reviews: [
                { id: 1, user: "Maria Garcia", rating: 5, comment: "Magical venue with amazing views!", avatar: "👤" },
                { id: 2, user: "Robert Kim", rating: 5, comment: "Perfect sunset wedding spot.", avatar: "👤" }
            ]
        },
        {
            id: 4,
            title: "URBAN LOFT",
            address: "Taguig City",
            venueAddress: "Bonifacio Global City, Taguig",
            price: 850,
            venuePrice: "₱15,000",
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Modern loft space for creative events and gatherings.",
            venueDescription: "Industrial-chic loft space with exposed brick walls and high ceilings. Ideal for art exhibitions, product launches, startup events, and creative workshops. Features flexible layout options.",
            reviews: [
                { id: 1, user: "Alex Turner", rating: 5, comment: "Perfect for our product launch!", avatar: "👤" },
                { id: 2, user: "Lisa Park", rating: 4, comment: "Great atmosphere for creative events.", avatar: "👤" }
            ]
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

    const filteredOffers = offers.filter(offer => 
        offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        <button className="btn">
                            Profile Settings
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
                        offers={offers}
                        filteredOffers={filteredOffers}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        handleBookNow={handleBookNow}
                    />
                )}
                {activeTab === 'venues' && (
                    <DashboardVenues 
                        selectedVenue={selectedVenue}
                        offers={offers}
                        setSelectedVenue={setSelectedVenue}
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