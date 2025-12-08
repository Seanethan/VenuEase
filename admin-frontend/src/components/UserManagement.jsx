import React, { useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: '001', name: 'Sean de Lara', email: 'delara.sean@gmail.com', bookings: '0 Warnings', isBanned: false, isSelected: false },
    { id: '002', name: 'Jenat Iguod', email: 'iguod.jenat@gmail.com', bookings: '10 Bookings', isBanned: true, isSelected: false },
    { id: '003', name: 'Elixer Alcoba', email: 'alcobaelixer@gmail.com', bookings: '9 Bookings', isBanned: false, isSelected: false },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');

  const handleUserAction = (userId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, isBanned: !user.isBanned };
      }
      return user;
    }));
  };

  const handleUserSelect = (userId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, isSelected: !user.isSelected };
      }
      return user;
    }));
  };

  const handleSelectAllUsers = (checked) => {
    setUsers(users.map(user => ({ ...user, isSelected: checked })));
  };

  const handleBulkAction = (action) => {
    const selectedUsers = users.filter(user => user.isSelected);
    
    if (selectedUsers.length === 0) {
      alert(`Please select at least one user to ${action.toLowerCase()}`);
      return;
    }
    
    if (action === 'DELETE ACCOUNT') {
      if (confirm(`Are you sure you want to delete ${selectedUsers.length} user(s)?`)) {
        setUsers(users.filter(user => !user.isSelected));
        alert(`Successfully deleted ${selectedUsers.length} user(s)`);
      }
    } else if (action === 'BAN MULTIPLE') {
      if (confirm(`Are you sure you want to ban ${selectedUsers.length} user(s)?`)) {
        setUsers(users.map(user => {
          if (user.isSelected) {
            return { ...user, isBanned: true };
          }
          return user;
        }));
        alert(`Successfully banned ${selectedUsers.length} user(s)`);
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.includes(searchTerm)
  );

  return (
    <section className="venue-ease-page">
      <h2>USER MANAGEMENT</h2>

      {/* Search Row */}
      <div className="venue-ease-search-row">
        <input 
          type="text" 
          placeholder="Search user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="venue-ease-search-input"
        />
      </div>

      <table className="venue-ease-table">
        <thead>
          <tr>
            <th>
              <input 
                type="checkbox" 
                onChange={(e) => handleSelectAllUsers(e.target.checked)}
              />
            </th>
            <th>ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Bookings</th>
            <th>Log</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>
                <input 
                  type="checkbox" 
                  checked={user.isSelected}
                  onChange={() => handleUserSelect(user.id)}
                />
              </td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.bookings}</td>
              <td>
                <button 
                  className={`venue-ease-btn ${user.isBanned ? 'venue-ease-unban' : 'venue-ease-ban'}`}
                  onClick={() => handleUserAction(user.id)}
                >
                  {user.isBanned ? 'UN-BAN' : 'BAN'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="venue-ease-actions">
        <button onClick={() => handleBulkAction('DELETE ACCOUNT')}>DELETE ACCOUNT</button>
        <button onClick={() => handleBulkAction('BAN MULTIPLE')}>BAN MULTIPLE</button>
      </div>
    </section>
  );
};

export default UserManagement;