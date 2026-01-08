// components/QRScanner.jsx
import { useEffect } from "react";

const QrScanner = ({ onScanSuccess }) => {
  useEffect(() => {
    let scannerInstance;
    const loadScanner = async () => {
      const module = await import("html5-qrcode");
      const Html5QrcodeScanner = module.Html5QrcodeScanner;

      scannerInstance = new Html5QrcodeScanner("reader", {
        fps: 5,
        qrbox: 250,
      });

      scannerInstance.render(
        (result) => {
          scannerInstance.clear();
          onScanSuccess(result);
        },
        (error) => {
          console.warn("QR Scan Error:", error);
        }
      );
    };

    loadScanner();

    return () => {
      if (scannerInstance) {
        scannerInstance.clear().catch(() => {});
      }
    };
  }, [onScanSuccess]);

  return <div id="reader" />;
};

export default QrScanner;
