const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./config/database');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'VenuEase Server is running!' });
});

// Test database connection
app.get('/api/test-db', async (req, res) => {
    try {
        const [results] = await db.execute('SELECT 1 + 1 AS result');
        const [admins] = await db.execute('SELECT COUNT(*) as count FROM admin');
        res.json({ 
            message: 'Database connected successfully',
            testResult: results[0].result,
            adminCount: admins[0].count,
            status: 'OK'
        });
    } catch (error) {
        res.status(500).json({ error: 'Database connection failed: ' + error.message });
    }
});

// CUSTOMER REGISTRATION - DEBUG VERSION
app.post('/api/customer/register', async (req, res) => {
    console.log('🔔 REGISTRATION REQUEST RECEIVED');
    console.log('📦 Request body:', req.body);
    
    const { full_name, email, password, phone } = req.body;

    // Validate required fields
    if (!full_name || !email || !password) {
        console.log('❌ Missing fields:', { full_name, email, password: !!password });
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        console.log('🔍 Step 1: Checking database connection...');
        
        // Test database connection first
        const [dbTest] = await db.execute('SELECT 1');
        console.log('✅ Database connection OK');

        console.log('🔍 Step 2: Checking if customer exists...');
        const [existingCustomers] = await db.execute(
            'SELECT * FROM customers WHERE email = ?', 
            [email]
        );

        if (existingCustomers.length > 0) {
            console.log('❌ Customer already exists with email:', email);
            return res.status(400).json({ error: 'Customer already exists with this email' });
        }

        console.log('✅ Email is available');

        console.log('🔍 Step 3: Hashing password...');
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);
        console.log('✅ Password hashed');

        console.log('🔍 Step 4: Inserting into database...');
        console.log('📝 Insert data:', { full_name, email, password_hash: '***', phone });
        
        const [result] = await db.execute(
            'INSERT INTO customers (full_name, email, password_hash, phone) VALUES (?, ?, ?, ?)',
            [full_name, email, password_hash, phone || null]
        );

        console.log('✅ Database insert successful. ID:', result.insertId);
        
        res.status(201).json({ 
            message: 'Customer registered successfully',
            customer_id: result.insertId,
            full_name: full_name,
            email: email
        });

    } catch (error) {
        console.error('❌ REGISTRATION ERROR:', error);
        console.error('❌ Error details:', {
            message: error.message,
            code: error.code,
            sqlMessage: error.sqlMessage
        });
        res.status(500).json({ error: 'Internal server error: ' + error.message });
    }
});

// CUSTOMER LOGIN
app.post('/api/customer/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const [customers] = await db.execute(
            'SELECT customer_id, full_name, email, password_hash, phone, is_active FROM customers WHERE email = ?', 
            [email]
        );

        if (customers.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const customer = customers[0];
        
        // Check if account is active
        if (!customer.is_active) {
            return res.status(400).json({ error: 'Account is deactivated' });
        }
        
        const isPasswordValid = await bcrypt.compare(password, customer.password_hash);
        
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        res.json({ 
            message: 'Login successful',
            user: {
                user_id: customer.customer_id,
                full_name: customer.full_name,
                email: customer.email,
                phone: customer.phone,
                role: 'customer',
                userType: 'customer'
            }
        });

    } catch (error) {
        console.error('Customer login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ADMIN/STAFF LOGIN (with plain text passwords for testing)
app.post('/api/admin/login', async (req, res) => {
    const { email, password } = req.body;

    console.log('🔐 Admin login attempt:', { email, password });

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const [admins] = await db.execute(
            'SELECT admin_id, full_name, email, password_hash, role, is_active FROM admin WHERE email = ?', 
            [email]
        );

        console.log('📊 Found admins:', admins.length);

        if (admins.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const admin = admins[0];
        
        // Check if account is active
        if (!admin.is_active) {
            return res.status(400).json({ error: 'Account is deactivated' });
        }
        
        // For testing: Use bcrypt comparison if password is hashed, otherwise plain text
        let isPasswordValid = false;
        
        // Check if password appears to be hashed (starts with $2b$ or similar)
        if (admin.password_hash.startsWith('$2')) {
            isPasswordValid = await bcrypt.compare(password, admin.password_hash);
        } else {
            // Plain text comparison for testing
            isPasswordValid = password === admin.password_hash;
        }
        
        console.log('🔑 Password valid:', isPasswordValid);
        
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        console.log('✅ Login successful for:', admin.email);
        
        res.json({ 
            message: 'Login successful',
            user: {
                user_id: admin.admin_id,
                full_name: admin.full_name,
                email: admin.email,
                role: admin.role,
                userType: 'admin'
            }
        });

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET ALL CUSTOMERS (Admin only)
app.get('/api/admin/customers', async (req, res) => {
    try {
        const [customers] = await db.execute(
            'SELECT customer_id, full_name, email, phone, date_created, is_active FROM customers ORDER BY date_created DESC'
        );
        res.json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET ALL STAFF (Admin only)
app.get('/api/admin/staff', async (req, res) => {
    try {
        const [staff] = await db.execute(
            'SELECT admin_id, full_name, email, role, date_created, is_active FROM admin ORDER BY role, date_created DESC'
        );
        res.json(staff);
    } catch (error) {
        console.error('Error fetching staff:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// CREATE NEW STAFF (Admin only)
app.post('/api/admin/staff', async (req, res) => {
    const { full_name, email, password, role } = req.body;

    if (!full_name || !email || !password || !role) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const [existing] = await db.execute('SELECT * FROM admin WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Staff already exists with this email' });
        }

        // Hash the password
        const password_hash = await bcrypt.hash(password, 10);
        
        const [result] = await db.execute(
            'INSERT INTO admin (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)',
            [full_name, email, password_hash, role]
        );

        res.status(201).json({ 
            message: 'Staff account created successfully',
            admin_id: result.insertId,
            full_name: full_name,
            email: email,
            role: role
        });

    } catch (error) {
        console.error('Staff creation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET ALL VENUES
app.get('/api/venues', async (req, res) => {
    try {
        const [venues] = await db.execute('SELECT * FROM venue ORDER BY venue_name');
        res.json(venues);
    } catch (error) {
        console.error('Error fetching venues:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// CREATE VENUE (Admin only)
app.post('/api/admin/venues', async (req, res) => {
    const { venue_name, address, capacity, description, price_per_hour } = req.body;

    if (!venue_name || !address || !capacity || !price_per_hour) {
        return res.status(400).json({ error: 'Venue name, address, capacity, and price per hour are required' });
    }

    try {
        const [result] = await db.execute(
            'INSERT INTO venue (venue_name, address, capacity, description, price_per_hour) VALUES (?, ?, ?, ?, ?)',
            [venue_name, address, capacity, description || null, price_per_hour]
        );

        res.status(201).json({ 
            message: 'Venue created successfully',
            venue_id: result.insertId,
            venue_name: venue_name
        });

    } catch (error) {
        console.error('Error creating venue:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET ALL EVENTS
app.get('/api/events', async (req, res) => {
    try {
        const [events] = await db.execute(`
            SELECT e.*, v.venue_name, v.address 
            FROM events e 
            LEFT JOIN venue v ON e.venue_id = v.venue_id 
            ORDER BY e.event_date DESC
        `);
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET ALL EVENTS (Admin only - with more details)
app.get('/api/admin/events', async (req, res) => {
    try {
        const [events] = await db.execute(`
            SELECT e.*, v.venue_name, 
                   COUNT(b.booking_id) as total_bookings
            FROM events e 
            LEFT JOIN venue v ON e.venue_id = v.venue_id 
            LEFT JOIN booking b ON e.event_id = b.event_id
            GROUP BY e.event_id
            ORDER BY e.event_date DESC
        `);
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// CREATE EVENT (Admin only)
app.post('/api/admin/events', async (req, res) => {
    const { event_name, description, event_date, venue_id } = req.body;

    if (!event_name || !event_date) {
        return res.status(400).json({ error: 'Event name and date are required' });
    }

    try {
        const [result] = await db.execute(
            'INSERT INTO events (event_name, description, event_date, venue_id) VALUES (?, ?, ?, ?)',
            [event_name, description || null, event_date, venue_id || null]
        );

        res.status(201).json({ 
            message: 'Event created successfully',
            event_id: result.insertId,
            event_name: event_name
        });

    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET ALL BOOKINGS (Admin only)
app.get('/api/admin/bookings', async (req, res) => {
    try {
        const [bookings] = await db.execute(`
            SELECT b.booking_id, c.full_name, v.venue_name, e.event_name, 
                   b.start_time, b.end_time, b.status, b.booking_date,
                   b.total_price
            FROM booking b
            JOIN customers c ON b.customer_id = c.customer_id
            LEFT JOIN venue v ON b.venue_id = v.venue_id
            LEFT JOIN events e ON b.event_id = e.event_id
            ORDER BY b.booking_date DESC
        `);
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// CUSTOMER BOOKINGS
app.get('/api/customer/bookings/:customerId', async (req, res) => {
    const { customerId } = req.params;
    
    try {
        const [bookings] = await db.execute(`
            SELECT b.*, v.venue_name, v.address, e.event_name
            FROM booking b
            LEFT JOIN venue v ON b.venue_id = v.venue_id
            LEFT JOIN events e ON b.event_id = e.event_id
            WHERE b.customer_id = ?
            ORDER BY b.booking_date DESC
        `, [customerId]);
        
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching customer bookings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// CREATE BOOKING
app.post('/api/bookings', async (req, res) => {
    const { customer_id, venue_id, event_id, start_time, end_time, total_price } = req.body;

    if (!customer_id || !start_time || !end_time || !total_price) {
        return res.status(400).json({ error: 'Customer ID, time slots, and total price are required' });
    }

    try {
        // Check venue availability
        const [conflictingBookings] = await db.execute(`
            SELECT * FROM booking 
            WHERE venue_id = ? 
            AND status IN ('confirmed', 'pending')
            AND (
                (start_time < ? AND end_time > ?) OR
                (start_time >= ? AND start_time < ?) OR
                (end_time > ? AND end_time <= ?)
            )
        `, [venue_id, end_time, start_time, start_time, end_time, start_time, end_time]);

        if (conflictingBookings.length > 0) {
            return res.status(400).json({ error: 'Venue is already booked for this time slot' });
        }

        const [result] = await db.execute(
            'INSERT INTO booking (customer_id, venue_id, event_id, start_time, end_time, total_price, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [customer_id, venue_id || null, event_id || null, start_time, end_time, total_price, 'pending']
        );

        res.status(201).json({ 
            message: 'Booking request submitted successfully',
            booking_id: result.insertId,
            status: 'pending'
        });

    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// UPDATE BOOKING STATUS (Admin only)
app.put('/api/admin/bookings/:bookingId/status', async (req, res) => {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!['confirmed', 'cancelled', 'pending'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    try {
        await db.execute(
            'UPDATE booking SET status = ? WHERE booking_id = ?',
            [status, bookingId]
        );

        res.json({ 
            message: `Booking ${status} successfully`,
            booking_id: bookingId,
            status: status
        });

    } catch (error) {
        console.error('Error updating booking status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// UPDATE CUSTOMER STATUS (Activate/Deactivate)
app.put('/api/admin/customers/:customerId/status', async (req, res) => {
    const { customerId } = req.params;
    const { is_active } = req.body;

    if (typeof is_active !== 'boolean') {
        return res.status(400).json({ error: 'is_active must be boolean' });
    }

    try {
        await db.execute(
            'UPDATE customers SET is_active = ? WHERE customer_id = ?',
            [is_active, customerId]
        );

        res.json({ 
            message: `Customer ${is_active ? 'activated' : 'deactivated'} successfully`,
            customer_id: customerId,
            is_active: is_active
        });

    } catch (error) {
        console.error('Error updating customer status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// UPDATE STAFF STATUS (Activate/Deactivate)
app.put('/api/admin/staff/:staffId/status', async (req, res) => {
    const { staffId } = req.params;
    const { is_active } = req.body;

    if (typeof is_active !== 'boolean') {
        return res.status(400).json({ error: 'is_active must be boolean' });
    }

    try {
        await db.execute(
            'UPDATE admin SET is_active = ? WHERE admin_id = ?',
            [is_active, staffId]
        );

        res.json({ 
            message: `Staff ${is_active ? 'activated' : 'deactivated'} successfully`,
            admin_id: staffId,
            is_active: is_active
        });

    } catch (error) {
        console.error('Error updating staff status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Add to server.js - Test database operations
app.get('/api/debug/db-test', async (req, res) => {
    try {
        console.log('🧪 Testing database operations...');
        
        // Test 1: Basic query
        const [test1] = await db.execute('SELECT 1 + 1 AS result');
        console.log('✅ Basic query:', test1[0].result);
        
        // Test 2: Check customers table
        const [tables] = await db.execute(`
            SELECT TABLE_NAME 
            FROM information_schema.TABLES 
            WHERE TABLE_SCHEMA = 'venuese' AND TABLE_NAME = 'customers'
        `);
        console.log('✅ customers table exists:', tables.length > 0);
        
        // Test 3: Check table structure
        const [columns] = await db.execute(`
            SELECT COLUMN_NAME, DATA_TYPE, EXTRA
            FROM information_schema.COLUMNS 
            WHERE TABLE_SCHEMA = 'venuese' AND TABLE_NAME = 'customers'
        `);
        console.log('✅ customers columns:', columns);
        
        // Test 4: Try to insert a test record
        const [insertTest] = await db.execute(
            'INSERT INTO customers (full_name, email, password_hash) VALUES (?, ?, ?)',
            ['Test User', 'test@test.com', 'temp_password']
        );
        console.log('✅ Insert test successful. ID:', insertTest.insertId);
        
        // Clean up
        await db.execute('DELETE FROM customers WHERE email = ?', ['test@test.com']);
        console.log('✅ Test record cleaned up');
        
        res.json({
            status: 'SUCCESS',
            tests: {
                basic_query: 'PASS',
                table_exists: 'PASS', 
                table_structure: 'PASS',
                insert_operation: 'PASS'
            }
        });
        
    } catch (error) {
        console.error('❌ DB TEST FAILED:', error);
        res.status(500).json({
            status: 'FAILED',
            error: error.message,
            sqlMessage: error.sqlMessage
        });
    }
});