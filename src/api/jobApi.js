import axios from 'axios';

const KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const HOST = import.meta.env.VITE_RAPIDAPI_HOST;

const mockJobs = [
  { job_id: '1', job_title: 'React Developer', employer_name: 'Google', job_city: 'New York', job_country: 'US', job_employment_type: 'FULLTIME', job_is_remote: true, employer_logo: null },
  { job_id: '2', job_title: 'Frontend Engineer', employer_name: 'Microsoft', job_city: 'Seattle', job_country: 'US', job_employment_type: 'FULLTIME', job_is_remote: false, employer_logo: null },
  { job_id: '3', job_title: 'UI Developer', employer_name: 'Amazon', job_city: 'Austin', job_country: 'US', job_employment_type: 'CONTRACTOR', job_is_remote: true, employer_logo: null },
  { job_id: '4', job_title: 'JavaScript Developer', employer_name: 'Meta', job_city: 'San Francisco', job_country: 'US', job_employment_type: 'FULLTIME', job_is_remote: false, employer_logo: null },
  { job_id: '5', job_title: 'Full Stack Developer', employer_name: 'Netflix', job_city: 'Los Angeles', job_country: 'US', job_employment_type: 'PARTTIME', job_is_remote: true, employer_logo: null },
  { job_id: '6', job_title: 'Data Analyst', employer_name: 'Apple', job_city: 'Chicago', job_country: 'US', job_employment_type: 'FULLTIME', job_is_remote: false, employer_logo: null },
];

export const searchJobs = async (query) => {
  try {
    const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
      params: { query, page: 1, num_pages: 1 },
      headers: { 'x-rapidapi-key': KEY, 'x-rapidapi-host': HOST }
    });
    if (response.data?.data?.length > 0) return response.data;
    return { data: mockJobs.filter(j => j.job_title.toLowerCase().includes(query.toLowerCase())) };
  } catch {
    return { data: mockJobs.filter(j => j.job_title.toLowerCase().includes(query.toLowerCase())) };
  }
};

export const getJobDetails = async (jobId) => {
  try {
    const response = await axios.get('https://jsearch.p.rapidapi.com/job-details', {
      params: { job_id: jobId },
      headers: { 'x-rapidapi-key': KEY, 'x-rapidapi-host': HOST }
    });
    if (response.data?.data?.length > 0) return response.data;
    return { data: [mockJobs.find(j => j.job_id === jobId) || mockJobs[0]] };
  } catch {
    return { data: [mockJobs.find(j => j.job_id === jobId) || mockJobs[0]] };
  }
};
