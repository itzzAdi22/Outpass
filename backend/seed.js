const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin@123', 12);
    const admin = new User({
      name: 'Admin User',
      email: 'admin@123',
      password: adminPassword,
      role: 'admin'
    });
    await admin.save();

    // Create student user
    const studentPassword = await bcrypt.hash('student@123', 12);
    const student = new User({
      name: 'Student User',
      email: 'student@123',
      password: studentPassword,
      role: 'student'
    });
    await student.save();

    console.log('✅ Default users created successfully!');
    console.log('📧 Admin Login: admin@123 / admin@123');
    console.log('📧 Student Login: student@123 / student@123');

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding users:', error.message);
    process.exit(1);
  }
};

seedUsers();
