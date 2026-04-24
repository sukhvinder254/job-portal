import { useNavigate } from 'react-router-dom';
import { useJob } from '../context/JobContext';

export default function JobCard({ job }) {
  const navigate = useNavigate();
  const { applyJob, appliedJobs } = useJob();
  const isApplied = appliedJobs.find(j => j.job_id === job.job_id);

  return (
    <div
      className="bg-gray-800 rounded-xl p-4 cursor-pointer hover:bg-gray-700 transition shadow-lg border border-gray-700"
      onClick={() => navigate(`/job/${job.job_id}`)}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-lg font-bold text-white">{job.job_title}</h2>
          <p className="text-blue-400">{job.employer_name}</p>
          <p className="text-gray-400 text-sm">{job.job_city}, {job.job_country}</p>
        </div>
        {job.employer_logo && (
          <img src={job.employer_logo} alt="logo" className="w-12 h-12 rounded-lg object-contain bg-white p-1" />
        )}
      </div>
      <div className="flex gap-2 mt-3 flex-wrap">
        <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
          {job.job_employment_type}
        </span>
        {job.job_is_remote && (
          <span className="bg-green-800 text-green-300 text-xs px-2 py-1 rounded-full">
            🌐 Remote
          </span>
        )}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          applyJob(job);
        }}
        className={`mt-3 w-full py-2 rounded-lg text-sm font-bold ${
          isApplied
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isApplied ? '✅ Applied' : 'Quick Apply'}
      </button>
    </div>
  );
}
