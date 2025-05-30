import React, { useEffect} from "react";
import { Html5QrcodeScanner} from "html5-qrcode";

const AdminScan = () =>{
    useEffect(( )=>{
        const scanner = new Html5QrcodeScanner("reader", {
            qrbox: 250,
            fps: 10,
        
    });
        scanner.render(
            async (qrText) => {
                const response = await fetch("http://localhost/wedding/api.php?qr=${qrText}");
                const result = await response.json();
                alert(result.message);
                scanner.clear();
            },
            (err) => {
                console.error(err);
            }
        );}, []);
    return (
        <div className="p-8 max-lg mx-auto">
            <h1 className="font-bold text-2xl mb-4">Admin QR Scanner</h1>
            <div id="reader" className="mx-auto w-full"></div>
        </div>
    );
}

export default AdminScan;