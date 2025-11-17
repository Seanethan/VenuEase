const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./config/database'); // Now uses connection pool

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Test route
app.get('/', (req, res) => {
    console.log('✅ Root route accessed');
    res.json({ message: 'Server is working!' });
});

// USER REGISTRATION
app.post('/api/register', async (req, res) => {
    console.log('📝 Registration attempt:', req.body);
    
    const { full_Name, email, password, role } = req.body;

    // Simple validation
    if (!full_Name || !email || !password) {
        console.log('❌ Missing fields');
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if user already exists
        console.log('🔍 Checking if user exists...');
        const [existingUsers] = await db.query(
            'SELECT * FROM USERS WHERE email = ?', 
            [email]
        );

        if (existingUsers.length > 0) {
            console.log('❌ User already exists');
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        // Hash password
        console.log('🔐 Hashing password...');
        const saltRounds = 10;
        const password_Hash = await bcrypt.hash(password, saltRounds);

        // Insert new user
        console.log('💾 Inserting user into database...');
        const [result] = await db.query(
            'INSERT INTO USERS (full_Name, email, password_Hash, role) VALUES (?, ?, ?, ?)',
            [full_Name, email, password_Hash, role || 'staff']
        );

        console.log('✅ User registered successfully, ID:', result.insertId);
        res.status(201).json({ 
            message: 'User registered successfully',
            user_ID: result.insertId,
            full_Name: full_Name,
            email: email
        });

    } catch (error) {
        console.error('❌ Registration error:', error);
        res.status(500).json({ error: 'Internal server error: ' + error.message });
    }
});

// USER LOGIN
app.post('/api/login', async (req, res) => {
    console.log('🔑 Login attempt:', req.body);
    
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Find user by email
        console.log('🔍 Finding user...');
        const [users] = await db.query(
            'SELECT user_ID, full_Name, email, password_Hash, role FROM USERS WHERE email = ?', 
            [email]
        );

        if (users.length === 0) {
            console.log('❌ User not found');
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const user = users[0];

        // Check password
        console.log('🔑 Verifying password...');
        const isPasswordValid = await bcrypt.compare(password, user.password_Hash);
        
        if (!isPasswordValid) {
            console.log('❌ Invalid password');
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        console.log('✅ Login successful for user:', user.email);
        res.json({ 
            message: 'Login successful',
            user: {
                user_ID: user.user_ID,
                full_Name: user.full_Name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({ error: 'Internal server error: ' + error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Debug mode: ON`);
});