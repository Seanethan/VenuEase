import React, { useState, useEffect } from 'react';

const EditVenueForm = ({ venue, onUpdateVenue, onCancel }) => {
  const [venueData, setVenueData] = useState({
    name: '',
    contact: '',
    email: '',
    price: '',
    priceType: 'Hourly',
    capacity: '',
    address: '',
    description: ''
  });

  useEffect(() => {
    if (venue) {
      setVenueData({
        name: venue.name || '',
        contact: venue.contact || '',
        email: venue.email || '',
        price: venue.price || '',
        priceType: venue.priceType || 'Hourly',
        capacity: venue.capacity || '',
        address: venue.address || '',
        description: venue.description || ''
      });
    }
  }, [venue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenueData({ ...venueData, [name]: value });
  };

  const handleSubmit = () => {
    const { name, contact, email, price, capacity, address } = venueData;
    
    if (!name || !contact || !email || !price || !capacity || !address) {
      alert('Please fill in all required fields!');
      return;
    }
    
    onUpdateVenue(venueData);
  };

  const handleImageUpload = () => {
    alert('Image upload functionality would open a file dialog in a real application.');
  };

  if (!venue) return null;

  return (
    <div className="venue-ease-form-container">
      <h1>EDITING VENUE "{venue.name}"</h1>

      <div className="venue-ease-top-section">
        <div className="venue-ease-image-upload">
          <div 
            className="venue-ease-image-box"
            onClick={handleImageUpload}
          >
            <span>+</span>
            <p>Update Image</p>
          </div>
        </div>

        <div className="venue-ease-inputs">
          {/* Name Field */}
          <div className="venue-ease-form-row">
            <label>Name:</label>
            <input 
              type="text" 
              name="name"
              value={venueData.name}
              onChange={handleChange}
            />
          </div>

          {/* Contact Field */}
          <div className="venue-ease-form-row">
            <label>Contact:</label>
            <input 
              type="text" 
              name="contact"
              value={venueData.contact}
              onChange={handleChange}
            />
          </div>

          {/* Email Field */}
          <div className="venue-ease-form-row">
            <label>Email:</label>
            <input 
              type="email" 
              name="email"
              value={venueData.email}
              onChange={handleChange}
            />
          </div>

          {/* Price Field */}
          <div className="venue-ease-price-row">
            <label>Price:</label>
            <div className="venue-ease-price-input-container">
              <input 
                type="number" 
                name="price"
                value={venueData.price}
                onChange={handleChange}
                placeholder="Enter price"
              />
              <select 
                name="priceType"
                value={venueData.priceType}
                onChange={handleChange}
              >
                <option>Hourly</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
          </div>

          {/* Capacity Field */}
          <div className="venue-ease-form-row">
            <label>Capacity:</label>
            <input 
              type="number" 
              name="capacity"
              value={venueData.capacity}
              onChange={handleChange}
            />
          </div>

          {/* Address Field */}
          <div className="venue-ease-form-row">
            <label>Address:</label>
            <textarea 
              name="address"
              value={venueData.address}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="venue-ease-description">
        <textarea 
          placeholder="Write about your venue..."
          name="description"
          value={venueData.description}
          onChange={handleChange}
        />
      </div>

      <div className="venue-ease-form-actions">
        <button 
          className="venue-ease-cancel-btn"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          className="venue-ease-update-btn-form"
          onClick={handleSubmit}
        >
          Update Venue
        </button>
      </div>
    </div>
  );
};

export default EditVenueForm;