import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../handlers/authHandler';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const success = await loginUser(email, password, rememberMe);
      if (success) {
        const role = localStorage.getItem('role');
        navigate(role === 'admin' ? '/admin' : '/profile');
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

  return (
    <div className="min-h-screen bg-dark-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white shadow-depth rounded-xl p-8 sm:p-10 transition-all duration-300 hover:shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-dark-900 mb-2 animate-slide-down">
              Welcome Back
            </h2>
            <p className="text-dark-600">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-error-100 text-error-700 rounded-lg animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  !isEmailValid(email) && email.length > 0
                    ? 'border-error-500 focus:ring-error-500'
                    : 'border-dark-300 focus:ring-primary-500'
                } focus:outline-none focus:ring-2 transition-colors`}
                required
              />
              {!isEmailValid(email) && email.length > 0 && (
                <p className="mt-1 text-sm text-error-500">Please enter a valid email address</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                required
                minLength={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-dark-300 rounded"
                />
                <span className="text-dark-600 text-sm">Remember me</span>
              </label>
              <a
                href="/forgot-password"
                className="text-sm text-primary-500 hover:text-primary-600 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.01] flex items-center justify-center"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin-slow" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-dark-600">
              Don't have an account?{' '}
              <a
                href="/register"
                className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
              >
                Create account
              </a>
            </p>
          </div>
        </div>

        <div className="text-center text-dark-500 text-sm">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;