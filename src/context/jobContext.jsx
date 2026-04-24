import { createContext, useContext, useState } from 'react';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const applyJob = (job) => {
    if (!appliedJobs.find(j => j.job_id === job.job_id))
      setAppliedJobs([...appliedJobs, job]);
  };

  const saveJob = (job) => {
    if (!savedJobs.find(j => j.job_id === job.job_id))
      setSavedJobs([...savedJobs, job]);
  };

  const removeApplied = (jobId) =>
    setAppliedJobs(appliedJobs.filter(j => j.job_id !== jobId));

  return (
    <JobContext.Provider value={{
      appliedJobs, savedJobs,
      applyJob, saveJob, removeApplied,
      darkMode, setDarkMode
    }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => useContext(JobContext);
