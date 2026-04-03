const fs = require('fs');
const path = require('path');

// Create a simple in-memory database simulation for demo
const createDemoDB = () => {
  const dbPath = path.join(__dirname, 'demo-db.json');
  
  const demoData = {
    users: [
      {
        _id: "admin123",
        name: "Admin User",
        email: "admin@123",
        password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukx.LFvOe", // admin@123 hashed
        role: "admin",
        createdAt: new Date().toISOString()
      },
      {
        _id: "student123",
        name: "Student User",
        email: "student@123",
        password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukx.LFvOe", // student@123 hashed
        role: "student",
        createdAt: new Date().toISOString()
      }
    ],
    outpasses: []
  };
  
  fs.writeFileSync(dbPath, JSON.stringify(demoData, null, 2));
  console.log('✅ Demo database created with default users!');
  console.log('📧 Admin Login: admin@123 / admin@123');
  console.log('📧 Student Login: student@123 / student@123');
};

createDemoDB();
