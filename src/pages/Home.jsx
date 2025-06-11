import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [qrImage, setQrImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) setQrImage(data.qr_code_image);
      else setMessage(data.error);
    } catch (err) {
      setMessage('Server error');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow space-y-4 mt-12">
      <h1 className="text-2xl font-bold">Wedding Invitation</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Full Name" required className="input"
          onChange={e => setFormData({ ...formData, name: e.target.value })} />
        <input type="email" placeholder="Email" required className="input"
          onChange={e => setFormData({ ...formData, email: e.target.value })} />
        <button type="submit" className="btn bg-red-500 text-white w-full">Get My QR Code</button>
      </form>
      {qrImage && <img src={qrImage} alt="QR Code" className="mx-auto mt-4" />}
      {message && <p className="text-red-500">{message}</p>}
    </div>
  );
}
