// import React from 'react';
// import Register from './Register';
// import AdminScan from './AdminScan';


// function App() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* <Register />
//       <hr className='my-8 border-gray-300' />
//       <AdminScan /> */}
//     </div>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin/>} />
        {/* <Route path="/AdminLogin" element={<AdminLogin />} /> */}
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
