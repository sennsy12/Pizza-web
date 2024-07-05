
// src/handlers/authHandler.js
// Sample hardcoded credentials for demo purposes
const DEMO_USER = {
    email: 'admin@example.com',
    password: 'admin123',
    token: 'demo-token'
  };
  
  export const loginUser = async (email, password) => {
    // Simulate server request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === DEMO_USER.email && password === DEMO_USER.password) {
          resolve(DEMO_USER.token);
        } else {
          reject('Invalid credentials');
        }
      }, 500);
    });
  };
  