import { Link } from 'react-router-dom';
import { useJob } from '../context/JobContext';

export default function Navbar() {
  const { darkMode, setDarkMode, appliedJobs } = useJob();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <div className="text-2xl font-bold text-blue-400">💼 JobVision</div>
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-blue-400 transition">Home</Link>
        <Link to="/applied" className="hover:text-blue-400 transition">
          Applied
          {appliedJobs.length > 0 && (
            <span className="ml-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
              {appliedJobs.length}
            </span>
          )}
        </Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-600"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}
