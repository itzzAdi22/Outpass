const axios = require('axios');

async function testLogin() {
  try {
    console.log('🧪 Testing API endpoints...');
    
    // Test admin login
    console.log('\n📧 Testing admin login...');
    const adminResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@123',
      password: 'admin@123'
    });
    console.log('✅ Admin login successful:', adminResponse.data);
    
    // Test student login
    console.log('\n📧 Testing student login...');
    const studentResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'student@123',
      password: 'student@123'
    });
    console.log('✅ Student login successful:', studentResponse.data);
    
    console.log('\n🎉 All API tests passed!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.response?.data || error.message);
  }
}

testLogin();
