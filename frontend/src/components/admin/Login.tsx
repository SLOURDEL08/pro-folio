// src/components/admin/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

// src/components/admin/Login.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    // Ajout de console.log pour déboguer
    console.log('Tentative de connexion avec:', { username, password });
    
    const { data } = await axios.post('http://localhost:5001/api/auth/login', {
      username,
      password
    });
    
    console.log('Réponse:', data);
    
    localStorage.setItem('adminToken', data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    navigate('/admin/dashboard');
  } catch (error: any) {
    console.error('Erreur de connexion:', error.response?.data || error);
    setError(error.response?.data?.message || 'Invalid credentials');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;