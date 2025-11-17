const mysql = require('mysql2');

// Create a connection pool instead of single connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1439', 
    database: 'VenuEase'
});

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:');
        console.error('Error:', err.message);
        console.log('💡 Troubleshooting tips:');
        console.log('1. Make sure MySQL is running in XAMPP/WAMP');
        console.log('2. Check if database "VenuEase" exists');
        console.log('3. Verify your MySQL username/password');
        return;
    }
    console.log('✅ Connected to MySQL database successfully!');
    connection.release(); // Release the connection back to the pool
});

// Export the pool instead of connection
module.exports = pool.promise();