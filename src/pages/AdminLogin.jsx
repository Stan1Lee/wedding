import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch('https://backend-htcn.onrender.com/AdminLogin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const data = await res.json();
    if (res.ok) navigate('/AdminDashboard');
    else setError(data.error || 'Login failed');
  };

  return (
    <div className="p-8 max-w-sm mx-auto bg-white rounded-xl shadow space-y-4 mt-12">
      <h1 className="text-xl font-bold">Admin Login</h1>
      <input type="password" placeholder="Admin Password" className="input"
        onChange={e => setPassword(e.target.value)} />
      <button className="btn bg-red-500 text-white w-full hover:bg-red-300 hover:text-black" onClick={handleLogin}>Login</button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
