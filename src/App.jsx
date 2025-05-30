import React from 'react';
import Register from './Register';
import AdminScan from './AdminScan';


function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Register />
      <hr className='my-8 border-gray-300' />
      <AdminScan />
    </div>
  );
}

export default App;
