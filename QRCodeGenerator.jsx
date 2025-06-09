import QRCode from 'qrcode';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [qrDataURL, setQrDataURL] = useState('');

  const handleGenerate = async () => {
    if (text.trim() === '') {
      toast.error("Input can't be empty!");
      return;
    }

    try {
      const dataUrl = await QRCode.toDataURL(text);
      setQrDataURL(dataUrl);
      toast.success("QR code generated!");
    } catch (err) {
      console.error('Failed to generate QR code:', err);
      toast.error("Failed to generate QR!");
    }
  };

  const handleClear = () => {
    setText('');
    setQrDataURL('');
    toast('Cleared!', { icon: '🧹' });
  };

  const handleDownload = () => {
    if (!qrDataURL) return;
    const link = document.createElement('a');
    link.href = qrDataURL;
    link.download = 'qr-code.png';
    link.click();
    toast.success("QR code downloaded!");
  };

  return (
    <div className="dark:bg-gray-900 min-h-screen flex items-center justify-center px-4 py-10">
      <Toaster position="top-center" />
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 max-w-md w-full space-y-6 transition-colors duration-300">
        <h1 className="text-3xl font-bold text-center text-pink-600 dark:text-pink-400">
          QR Code Generator
        </h1>

        <input
          type="text"
          placeholder="Enter text or URL"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 border-2 border-pink-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 dark:bg-gray-700 dark:text-white transition"
        />

        <div className="flex flex-wrap gap-4 justify-between">
          <button
            onClick={handleGenerate}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-2 rounded-xl transition shadow-md"
          >
            Generate
          </button>
          <button
            onClick={handleDownload}
            disabled={!qrDataURL}
            className={`${
              qrDataURL
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-green-300 cursor-not-allowed'
            } text-white font-semibold px-6 py-2 rounded-xl transition shadow-md`}
          >
            Download
          </button>
          <button
            onClick={handleClear}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-xl transition shadow-md"
          >
            Clear
          </button>
        </div>

        <div className="flex justify-center">
          {qrDataURL ? (
            <img
              src={qrDataURL}
              alt="Generated QR Code"
              className="mt-6 shadow-md rounded-lg p-2 bg-white"
            />
          ) : (
            <div className="mt-6 w-52 h-52 flex items-center justify-center bg-pink-100 dark:bg-gray-700 rounded-lg border border-dashed border-pink-300 dark:border-gray-500">
              <p className="text-pink-500 dark:text-pink-300 text-sm text-center">
                QR will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
