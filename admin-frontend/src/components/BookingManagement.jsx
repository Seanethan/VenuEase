import React, { useState } from 'react';
import VenueManagement from './VenueManagement';
import EditVenueForm from './EditVenueForm';
import VenuesTable from './VenuesTable';

const BookingManagement = () => {
  const [venues, setVenues] = useState([
    { 
      id: 'V001', 
      name: 'Sunset Hall', 
      address: 'Manila', 
      capacity: '250',
      contact: '09123456789',
      email: 'sunset@example.com',
      price: '1500',
      priceType: 'Hourly',
      description: 'Beautiful sunset view venue with modern amenities.'
    },
    { 
      id: 'V002', 
      name: 'Blue Lagoon Venue', 
      address: 'Quezon City', 
      capacity: '380',
      contact: '09234567890',
      email: 'bluelagoon@example.com',
      price: '2500',
      priceType: 'Hourly',
      description: 'Luxurious venue with lagoon view and premium facilities.'
    },
    { 
      id: 'V003', 
      name: 'Royal Pavilion', 
      address: 'Pasig', 
      capacity: '500',
      contact: '09345678901',
      email: 'royal@example.com',
      price: '5000',
      priceType: 'Daily',
      description: 'Royal treatment with premium services and luxurious ambiance.'
    },
  ]);
  
  const [showAddVenueForm, setShowAddVenueForm] = useState(false);
  const [showEditVenueForm, setShowEditVenueForm] = useState(false);
  const [editingVenueId, setEditingVenueId] = useState(null);

  const handleAddVenue = (newVenue) => {
    const lastId = venues.length > 0 ? venues[venues.length - 1].id : 'V000';
    const lastNumber = parseInt(lastId.replace('V', ''));
    const newId = 'V' + String(lastNumber + 1).padStart(3, '0');
    
    const newVenueObj = {
      id: newId,
      ...newVenue
    };
    
    setVenues([...venues, newVenueObj]);
    setShowAddVenueForm(false);
  };

  const handleEditVenue = (venueId) => {
    setEditingVenueId(venueId);
    setShowEditVenueForm(true);
  };

  const handleUpdateVenue = (updatedVenue) => {
    setVenues(venues.map(venue => {
      if (venue.id === editingVenueId) {
        return {
          ...venue,
          ...updatedVenue
        };
      }
      return venue;
    }));
    
    setShowEditVenueForm(false);
    setEditingVenueId(null);
  };

  const handleCancelEdit = () => {
    setShowEditVenueForm(false);
    setEditingVenueId(null);
  };

  const handleBackFromEdit = () => {
    setShowEditVenueForm(false);
    setEditingVenueId(null);
  };

  const getEditingVenue = () => {
    return venues.find(venue => venue.id === editingVenueId);
  };

  return (
    <section className="venue-ease-page">
      {/* Title Row */}
      <div className="venue-ease-title-row">
        <h2>REGISTERED VENUES</h2>
        {!showAddVenueForm && !showEditVenueForm && (
          <button 
            className="venue-ease-add-btn"
            onClick={() => setShowAddVenueForm(true)}
          >
            Add Venues +
          </button>
        )}
      </div>

      {/* Back button for edit mode */}
      {showEditVenueForm && (
        <button 
          className="venue-ease-back-btn"
          onClick={handleBackFromEdit}
        >
          ← Back to Venues List
        </button>
      )}

      {/* New Venue Form */}
      {showAddVenueForm && (
        <VenueManagement 
          onAddVenue={handleAddVenue}
          onCancel={() => setShowAddVenueForm(false)}
        />
      )}

      {/* Edit Venue Form */}
      {showEditVenueForm && (
        <EditVenueForm 
          venue={getEditingVenue()}
          onUpdateVenue={handleUpdateVenue}
          onCancel={handleCancelEdit}
        />
      )}

      {/* Existing Venues Table */}
      {!showAddVenueForm && !showEditVenueForm && (
        <VenuesTable 
          venues={venues}
          onEditVenue={handleEditVenue}
        />
      )}
    </section>
  );
};

export default BookingManagement;