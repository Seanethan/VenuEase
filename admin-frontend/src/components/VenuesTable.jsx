import React from 'react';

const VenuesTable = ({ venues, onEditVenue }) => {
  const handleEdit = (venueId) => {
    onEditVenue(venueId);
  };

  return (
    <div className="venue-ease-venue-box">
      <table className="venue-ease-table">
        <thead>
          <tr>
            <th>venue_ID</th>
            <th>venue_Name</th>
            <th>Address</th>
            <th>Capacity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {venues.map(venue => (
            <tr key={venue.id}>
              <td>{venue.id}</td>
              <td>{venue.name}</td>
              <td>{venue.address}</td>
              <td>{venue.capacity}</td>
              <td>
                <button 
                  className="venue-ease-edit-btn"
                  onClick={() => handleEdit(venue.id)}
                >
                  EDIT
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VenuesTable;