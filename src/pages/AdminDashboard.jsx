import { useEffect, useState, useCallback } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function AdminDashboard() {
  const [guests, setGuests] = useState([]);
  const [scanMessage, setScanMessage] = useState('');

  const fetchGuests = async () => {
    const res = await fetch('/guests');
    const data = await res.json();
    setGuests(data);
  };

  const checkInGuest = useCallback(async guestId => {
    const res = await fetch('https://backend-htcn.onrender.com/checkin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guest_id: guestId })
    });
    const data = await res.json();
    setScanMessage(data.message || data.error);
    fetchGuests();
  }, []);

  useEffect(() => {
    fetchGuests();
    const scanner = new Html5QrcodeScanner('reader', { fps: 10, qrbox: 250 });
    scanner.render(decodedText => {
      checkInGuest(decodedText);
      scanner.clear();
    }, () => {});

    return () => scanner.clear().catch(() => {});
  }, [checkInGuest]);

  return (
    <div className="p-8 max-w-5xl mx-auto bg-white rounded-xl shadow mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div id="reader" className="mb-4" style={{ width: '100%' }}></div>
      {scanMessage && <p className="text-green-600">{scanMessage}</p>}
      <table className="w-full text-left border mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Checked In</th>
            <th className="p-2">QR ID</th>
          </tr>
        </thead>
        <tbody>
          {guests.map(g => (
            <tr key={g.id} className="border-t">
              <td className="p-2">{g.name}</td>
              <td className="p-2">{g.email}</td>
              <td className="p-2 text-green-700">{g.checked_in ? 'Yes' : 'No'}</td>
              <td className="p-2 text-xs">{g.qr_code_data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
