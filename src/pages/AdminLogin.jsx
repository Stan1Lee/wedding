import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch('/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const data = await res.json();
    if (res.ok) navigate('/admin-dashboard');
    else setError(data.error || 'Login failed');
  };

  return (
    <div className="p-8 max-w-sm mx-auto bg-white rounded-xl shadow space-y-4 mt-12">
      <h1 className="text-xl font-bold">Admin Login</h1>
      <input type="password" placeholder="Admin Password" className="input"
        onChange={e => setPassword(e.target.value)} />
      <button className="btn bg-blue-600 text-white w-full" onClick={handleLogin}>Login</button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
