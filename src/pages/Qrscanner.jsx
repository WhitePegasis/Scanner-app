// import { Html5QrcodeScanner } from 'html5-qrcode';
// import { useState, useEffect } from 'react';


// function Qrscanner() {
//     const [scanResult, setScanResult] = useState(null);
//     useEffect(() => {
//         const scanner = new Html5QrcodeScanner('reader', {
//             qrbox: { width: 250, height: 250, }, fps: 5
//             // supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA] 
//         });

//         scanner.clear();
//         function success(result) {
//             setScanResult(result);
//         }

//         function error(err) {
//             // scanner.clear(); 
//             console.warn(err);
//         }

//         // scanner.clear(); 
//         scanner.render(success, error);

//     }, [])

//     return (
//         <div className="App">

//             <h1>QR Code Scanning in React</h1>

//             {
//                 scanResult ?
//                     <div> <a href={"https://" + scanResult} > {scanResult}</a> </div>
//                     :
//                     <div id='reader' width='600px'></div>
//             }
//         </div>
//     );
// }

// export default Qrscanner;



import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './qrscannerstyles.css'

const Qrscanner = () => {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: { width: 250, height: 250 },
      fps: 5,
      rememberLastUsedCamera: false
    });

    function success(result) {
      setScanResult(result);
    }

    function error(err) {
      console.warn(err);
    }

    scanner.render(success, error);

    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div className="qr-scanner-container">
      <h1>QR Code Scanner</h1>

      {scanResult ? (
        <div className="result-container">
          <a href={`https://${scanResult}`} target="_blank" rel="noopener noreferrer">
            {scanResult}
          </a>
        </div>
      ) : (
        <div id="reader" className="reader-container"></div>
      )}
    </div>
  );
};

export default Qrscanner;
