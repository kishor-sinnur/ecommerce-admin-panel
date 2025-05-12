    const express = require('express');
    const cors = require('cors');
    const morgan = require('morgan');
    const dotenv = require('dotenv');
    const bcrypt = require('bcryptjs');
    const connectDB = require('./config/db');
    const User = require('./models/user.model');
    const path = require('path');


    dotenv.config();
    connectDB();

    const app = express();

    // Middleware
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());

    // ✅ Serve static files from uploads folder
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


    // Routes
    app.use('/api/products', require('./routes/product.routes'));
    app.use('/api/orders', require('./routes/order.routes'));
    app.use('/api/auth', require('./routes/auth.routes'));

    // Seed admin user
    const seedAdminUser = async () => {
    const adminEmail = 'admin2@example.com';
    const adminPassword = 'Admin123';

    try {
        const existing = await User.findOne({ email: adminEmail });
        if (existing) {
        console.log('✅ Admin user already exists');
        } else {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const user = new User({ email: adminEmail, password: hashedPassword });
        await user.save();
        console.log('✅ Admin user seeded successfully');
        }
    } catch (err) {
        console.error('❌ Seeding admin user failed:', err);
    }
    };

    seedAdminUser(); // Run once at startup

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
