import axios from 'axios';

const KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const HOST = import.meta.env.VITE_RAPIDAPI_HOST;

export const searchJobs = async (query, page = 1) => {
  const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
    params: {
      query: query,
      page: page,
      num_pages: 1,
      date_posted: 'all'
    },
    headers: {
      'x-rapidapi-key': KEY,
      'x-rapidapi-host': HOST
    }
  });
  return response.data;
};

export const getJobDetails = async (jobId) => {
  const response = await axios.get('https://jsearch.p.rapidapi.com/job-details', {
    params: { job_id: jobId },
    headers: {
      'x-rapidapi-key': KEY,
      'x-rapidapi-host': HOST
    }
  });
  return response.data;
};

