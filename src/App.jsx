import DarkModeToggle from './components/DarkModeToggle'; // ✅ add this
import QRCodeGenerator from './components/QRCodeGenerator';

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <DarkModeToggle /> {/* ✅ add this */}
      <QRCodeGenerator />
    </div>
  );
};

export default App;
