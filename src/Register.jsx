// import React, { useState } from 'react';

// function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [qrCode, setQrCode] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = {
//       name: name.trim(),
//       email: email.trim(),
//     };

//     try {
//       const res = await fetch('http://localhost/wedding/api.php', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await res.json();

//       if (result.success) {
//         setQrCode(result.qr_code);
//         setMessage('Registration successful!');
//       } else {
//         setMessage(result.message || 'Registration failed.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setMessage('Something went wrong.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <h1 className="text-3xl font-bold mb-4">Event Registration</h1>
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="w-full mb-4 px-3 py-2 border rounded"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full mb-4 px-3 py-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
//         >
//           Register
//         </button>
//       </form>

//       {message && <p className="mt-4 text-red-500">{message}</p>}

//       {qrCode && (
//         <div className="mt-4 text-center">
//           <p className="mb-2">Download your QR Code:</p>
//           <img src={`http://localhost/wedding-api/${qrCode}`} alt="QR Code" className="mx-auto" />
//           <a
//             href={`http://localhost/wedding-api/${qrCode}`}
//             download
//             className="text-blue-600 underline"
//           >
//             Download QR Code
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Register;


// import React, { useState } from "react";
// import axios from "axios";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [qrCodeUrl, setQrCodeUrl] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost/wedding/api.php", {
//         name,
//         email
//       });

//       if (response.data.status === "success") {
//         setMessage("Registered successfully!");
//         setQrCodeUrl("http://localhost/wedding/" + response.data.qr);  // update path
//       } else {
//         setMessage(response.data.message || "Registration failed.");
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       setMessage("Something went wrong.");
//     }
//   };
  

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-2">Event Registration</h2>
//       <form onSubmit={handleRegister} className="space-y-2">
//         <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="border p-2 w-full" required />
//         <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full" required />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
//       </form>

//       {message && <p className="mt-4">{message}</p>}
//       {qrCodeUrl && (
//         <div className="mt-4">
//           <p>Scan this QR code at the event:</p>
//           <img src={qrCodeUrl} alt="QR Code" className="mt-2" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Register;



// // export default Register;


// ... (your existing code)
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost/wedding/api.php", {
        name,
        email,
      });

      if (response.data.status === "success") {
        setMessage("Registered successfully!");
        setQrCodeUrl("http://localhost/wedding/" + response.data.qr); // This is correct, 'qr' is the path from API
      } else {
        setMessage(response.data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Event Registration</h2>
      <form onSubmit={handleRegister} className="space-y-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
      {qrCodeUrl && (
        <div className="mt-4">
          <p>Scan this QR code at the event:</p>
          <img src={qrCodeUrl} alt="QR Code" className="mt-2" />
          <p className="text-sm text-gray-600 mt-1">
            Please save this QR code.
          </p>
        </div>
      )}
    </div>
  );
};

export default Register;