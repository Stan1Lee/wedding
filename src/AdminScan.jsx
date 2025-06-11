// import React, { useEffect } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import axios from "axios";

// export default function AdminScan() {
//   useEffect(() => {
//     const scanner = new Html5QrcodeScanner("reader", {
//       fps: 10,
//       qrbox: 250,
//     });

//     scanner.render(
//       async (decodedText, decodedResult) => {
//         // Send QR to backend for validation
//         try {
//           const response = await axios.post(`http://localhost/wedding/api.php?qr=${decodedText}`);
//           const result = await response.json();
//           alert(result.message || "Scanned, but no message received.");
//         } catch (err) {
//           alert("Error verifying QR code.");
//         }

//         scanner.clear();
//       },
//       (errorMessage) => {
//         console.warn("QR Scan Error:", errorMessage);
//       }
//     );

//     return () => {
//       // Cleanup on unmount
//       scanner.clear().catch(error => console.error("Scanner clear error", error));
//     };
//   }, []);

//   return (
//     <div className="p-8 max-w-lg mx-auto text-center">
//       <h1 className="text-2xl font-bold mb-4">Admin QR Code Scanner</h1>
//       <div id="reader" className="mx-auto w-full" />
//     </div>
//   );
// }


import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

export default function AdminScan() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      async (decodedText, decodedResult) => {
        // Send QR to backend for validation
        try {
            const response = await axios.post("http://localhost/wedding/api.php", {
              qr: decodedText // Send the QR data in the request body
            }); // Sending as GET param for simplicity, but POST body is cleaner
          const result = response.data; // Axios already parses JSON, so use .data

          alert(result.message || "Scanned, but no message received.");
          // You might want to display the message in a UI element instead of alert
        } catch (err) {
          console.error("QR Verification Error:", err);
          alert("Error verifying QR code. Please try again.");
        }

        // It's usually good to clear after a successful scan if you want a one-time scan
        // If you want continuous scanning, remove or conditionally call scanner.clear()
        scanner.clear();
      },
      (errorMessage) => {
        console.warn("QR Scan Error:", errorMessage);
      }
    );

    return () => {
      // Cleanup on unmount
      scanner
        .clear()
        .catch((error) => console.error("Scanner clear error", error));
    };
  }, []);

  return (
    <div className="p-8 max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Admin QR Code Scanner</h1>
      <div id="reader" className="mx-auto w-full" />
    </div>
  );
}