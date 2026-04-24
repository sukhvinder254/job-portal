import { useState } from 'react';
import { searchJobs } from '../api/jobApi';
import { useJob } from '../context/JobContext';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';

export default function Home() {
  const { darkMode } = useJob();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setSearched(true);
    try {
      const data = await searchJobs(query);
      setJobs(data.data || []);
    } catch {
      console.error('Error fetching jobs');
    }
    setLoading(false);
  };

  const filteredJobs = jobs.filter(job => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Remote') return job.job_is_remote;
    return job.job_employment_type?.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">💼 Find Your Dream Job</h1>
        <p className="text-gray-400 mb-6">Search thousands of jobs worldwide</p>
        <SearchBar onSearch={handleSearch} />
        <FilterBar onFilter={setActiveFilter} activeFilter={activeFilter} />
        <div className="mt-8">
          {loading && (
            <div className="text-center text-blue-400 text-xl mt-20">
              ⏳ Searching jobs...
            </div>
          )}
          {!loading && searched && filteredJobs.length === 0 && (
            <div className="text-center text-gray-400 mt-20">
              <p className="text-5xl mb-4">😕</p>
              <p className="text-xl">No jobs found!</p>
            </div>
          )}
          {!loading && !searched && (
            <div className="text-center text-gray-400 mt-20">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-xl">Search for jobs above!</p>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map(job => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
