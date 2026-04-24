import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { JobProvider } from './context/JobContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JobDetail from './pages/JobDetail';
import Applied from './pages/Applied';

export default function App() {
  return (
    <JobProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/applied" element={<Applied />} />
        </Routes>
      </BrowserRouter>
    </JobProvider>
  );
}
