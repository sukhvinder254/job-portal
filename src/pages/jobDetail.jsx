import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobDetails } from '../api/jobApi';
import { useJob } from '../context/JobContext';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applyJob, appliedJobs, darkMode } = useJob();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const isApplied = appliedJobs.find(j => j.job_id === id);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getJobDetails(id);
        setJob(data.data[0]);
      } catch {
        console.error('Error');
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-blue-400 text-2xl">
      ⏳ Loading job details...
    </div>
  );

  if (!job) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-400 text-2xl">
      Job not found!
    </div>
  );

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white mb-6 flex items-center gap-2"
        >
          ← Back
        </button>
        <div className="bg-gray-800 rounded-xl p-6 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{job.job_title}</h1>
              <p className="text-blue-400 text-xl">{job.employer_name}</p>
              <p className="text-gray-400 mt-1">{job.job_city}, {job.job_country}</p>
            </div>
            {job.employer_logo && (
              <img src={job.employer_logo} alt="logo" className="w-16 h-16 rounded-xl object-contain bg-white p-1" />
            )}
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            <span className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full">
              {job.job_employment_type}
            </span>
            {job.job_is_remote && (
              <span className="bg-green-800 text-green-300 text-sm px-3 py-1 rounded-full">
                🌐 Remote
              </span>
            )}
            {job.job_min_salary && (
              <span className="bg-blue-800 text-blue-300 text-sm px-3 py-1 rounded-full">
                💰 ${job.job_min_salary}k - ${job.job_max_salary}k
              </span>
            )}
          </div>
          <button
            onClick={() => applyJob(job)}
            className={`mt-6 w-full py-3 rounded-xl font-bold text-lg ${
              isApplied
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isApplied ? '✅ Already Applied' : '🚀 Apply Now'}
          </button>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Job Description</h2>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {job.job_description?.slice(0, 1500)}...
          </p>
        </div>
      </div>
    </div>
  );
}
