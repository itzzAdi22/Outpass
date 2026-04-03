const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

async function fixPasswords() {
  try {
    const dbPath = path.join(__dirname, 'demo-db.json');
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    // Hash the passwords correctly
    const adminPassword = await bcrypt.hash('admin@123', 12);
    const studentPassword = await bcrypt.hash('student@123', 12);
    
    // Update the passwords
    data.users[0].password = adminPassword;
    data.users[1].password = studentPassword;
    
    // Save back to file
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    
    console.log('✅ Passwords fixed successfully!');
    console.log('📧 Admin Login: admin@123 / admin@123');
    console.log('📧 Student Login: student@123 / student@123');
    
    // Test the hashes
    const adminTest = await bcrypt.compare('admin@123', adminPassword);
    const studentTest = await bcrypt.compare('student@123', studentPassword);
    
    console.log('✅ Admin password test:', adminTest);
    console.log('✅ Student password test:', studentTest);
    
  } catch (error) {
    console.error('❌ Error fixing passwords:', error.message);
  }
}

fixPasswords();
