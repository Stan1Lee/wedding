import React, { useState } from 'react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: name.trim(),
      email: email.trim(),
    };

    try {
      const res = await fetch('http://localhost/wedding/api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setQrCode(result.qr_code);
        setMessage('Registration successful!');
      } else {
        setMessage(result.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Event Registration</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>

      {message && <p className="mt-4 text-red-500">{message}</p>}

      {qrCode && (
        <div className="mt-4 text-center">
          <p className="mb-2">Download your QR Code:</p>
          <img src={`http://localhost/wedding-api/${qrCode}`} alt="QR Code" className="mx-auto" />
          <a
            href={`http://localhost/wedding-api/${qrCode}`}
            download
            className="text-blue-600 underline"
          >
            Download QR Code
          </a>
        </div>
      )}
    </div>
  );
}

export default Register;


// import React, {useState} from "react";

// /**
//  * Register component handles the event registration process.
//  * It includes a form for user input and displays a QR code upon successful registration.
//  * 
//  * @component
//  * @returns {JSX.Element} The rendered Register component.
//  */
// export default function Register(){
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [qrImage, setQrImage] = useState(null);
//     const [message, setMessage] = useState("");


//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append("name", name);
//         formData.append("email", email);


//         try{
//             const response = await fetch("http://localhost/wedding/api.php",{
//                 method: 'POST',
//                 body: formData
//             });

//             const data = await response.json();

//             if (data.status === 'success') {
//                 setQrImage('http://localhost/wedding/${data.qrr}');
//                 setMessage("Registration successful! Check Ur Email.");
//         } else {
//             setMessage("data.message");
//         }
//     } catch (err) {
//         setMessage("Error regsistering.");
//     }
// };


//     return (
//         // style to display the form and QR code
//         <div className="p-8 max-w-lg mx-auto">
//             <h1 className="text-2xl font-bold mb-4">Event Registration</h1> 
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <input 
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                     className="border p-2 w-full rounded"
//                     required
//                     placeholder="Name"
//                 />
//                 <input 
//                     type="email"
//                     value={email}
//                     required
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="border p-2 w-full rounded"
//                     placeholder="Email"                />
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
//             </form>

//             {message && <p className="mt-4 text-green-600">{message}</p>}
//            {qrImage && (
//             <div className="mt-4">
//                 <img src= {qrImage} alt="QR Code" className="mx-auto" />
//                 <a href={qrImage} download="qr-code.png" className="block mt-2 text-blue-700 underline text-center">
//                     Download QR Code
//                 </a>
//             </div>
//            )}
//         </div>
//     );
// }