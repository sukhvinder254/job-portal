import { useJob } from '../context/JobContext';
import { useNavigate } from 'react-router-dom';

export default function Applied() {
  const { appliedJobs, removeApplied, darkMode } = useJob();
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">📋 Applied Jobs</h1>
        <p className="text-gray-400 mb-6">{appliedJobs.length} jobs applied</p>
        {appliedJobs.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-xl">No applications yet!</p>
            <p className="text-sm mt-2">Go to Home and apply for jobs</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {appliedJobs.map(job => (
              <div
                key={job.job_id}
                className="bg-gray-800 rounded-xl p-4 border border-gray-700"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => navigate(`/job/${job.job_id}`)}
                >
                  <h2 className="text-lg font-bold text-white">{job.job_title}</h2>
                  <p className="text-blue-400">{job.employer_name}</p>
                  <p className="text-gray-400 text-sm">{job.job_city}, {job.job_country}</p>
                </div>
                <div className="flex gap-2 mt-3">
                  <span className="bg-green-800 text-green-300 text-xs px-2 py-1 rounded-full">
                    ✅ Applied
                  </span>
                </div>
                <button
                  onClick={() => removeApplied(job.job_id)}
                  className="mt-3 w-full py-2 rounded-lg text-sm font-bold bg-red-500 hover:bg-red-600 text-white"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
