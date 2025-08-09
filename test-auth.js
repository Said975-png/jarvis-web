// Test script to verify authentication is working
const testAuth = async () => {
  const baseUrl = 'http://localhost:3001';
  
  console.log('Testing authentication endpoints...');
  
  // Test registration
  try {
    console.log('\n1. Testing registration...');
    const registerResponse = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'test123',
        name: 'Test User'
      }),
    });
    
    const registerData = await registerResponse.json();
    console.log('Registration response:', registerResponse.status, registerData);
    
    if (registerResponse.ok) {
      console.log('✅ Registration successful');
      const token = registerData.token;
      
      // Test login with same credentials
      console.log('\n2. Testing login...');
      const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'test123'
        }),
      });
      
      const loginData = await loginResponse.json();
      console.log('Login response:', loginResponse.status, loginData);
      
      if (loginResponse.ok) {
        console.log('✅ Login successful');
        
        // Test /me endpoint
        console.log('\n3. Testing /me endpoint...');
        const meResponse = await fetch(`${baseUrl}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const meData = await meResponse.json();
        console.log('Me response:', meResponse.status, meData);
        
        if (meResponse.ok) {
          console.log('✅ /me endpoint successful');
        } else {
          console.log('❌ /me endpoint failed');
        }
      } else {
        console.log('❌ Login failed');
      }
    } else {
      console.log('❌ Registration failed');
    }
  } catch (error) {
    console.error('Error testing auth:', error);
  }
};

// Only run if this is being executed directly (not imported)
if (typeof window === 'undefined') {
  testAuth();
}
