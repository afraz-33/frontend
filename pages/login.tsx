import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../src/app/globals.css'

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:1337/api/auth/local', {
        identifier,
        password,
      });
      localStorage.setItem('token', res.data.jwt); // Save JWT token
      router.push('/dashboard'); // Redirect to dashboard after login
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error('Login failed:', err);
    }
  };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-2xl p-20 py-25 min-h-[750px] flex flex-col justify-between">
        <h1 className="text-4xl font-bold text-blue-700  text-center">ADMIN LOGIN</h1>
        {error && <p className="text-md text-red-700 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-8">
          <div>
            <input 
              type="text" 
              value={identifier} 
              onChange={(e) => setIdentifier(e.target.value)} 
              placeholder="Email" 
              required 
              className="w-full p-4 text-xl border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <input 
              type={showPassword ? 'text' : 'password'}
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              required 
              className="w-full p-4 text-xl border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <div className="mt-4">
              <label className="text-lg text-gray-600">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="form-checkbox rounded text-green-500"
                />
                <span className="ml-2">Show Password</span>
              </label>
            </div>
          </div>
          <button type="submit" className="w-1/2 p-10 mx-auto bg-blue-900 text-white py-2 rounded-lg font-medium hover:bg-blue-600 text-xl flex flex-col justify-between">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};


export default Login;