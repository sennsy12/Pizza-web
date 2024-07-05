// authMiddleware.js
const DEMO_USER = {
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  };
  
  const authenticateUser = (req, res, next) => {
    const { email, password } = req.body;
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      req.user = { role: DEMO_USER.role };
      next();
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  };
  

  
  module.exports = {
    authenticateUser,
  };
  