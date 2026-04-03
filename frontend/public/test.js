// Test script to run in browser console
async function testConnection() {
  console.log('🧪 Testing frontend-backend connection...');
  
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@123',
        password: 'admin@123'
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ SUCCESS! Backend connection working:', data);
      console.log('📧 User:', data.user);
      console.log('🔑 Token:', data.token.substring(0, 50) + '...');
    } else {
      console.log('❌ Backend responded with error:', data);
    }
  } catch (error) {
    console.error('❌ Network/CORS Error:', error);
    console.log('🔍 Check browser console for CORS errors');
  }
}

// Auto-run test
testConnection();

// Also make it available globally
window.testConnection = testConnection;
