import React, { useState } from 'react';
import '../styles/ScheduleJob.css';

const companies = [
  'Tesla', 'Apple', 'Amazon', 'Google', 'Microsoft', 'Netflix'
];

const frequencies = ['Now', 'Daily', 'Weekly', 'Bi-Weekly'];

const ScheduleJob = () => {
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [runTime, setRunTime] = useState('00:00');
  const [frequency, setFrequency] = useState('Daily');
  const [numberOfDays, setNumberOfDays] = useState(14);
  const [message, setMessage] = useState('');

  const toggleCompany = (company) => {
    setSelectedCompanies(prev =>
      prev.includes(company)
        ? prev.filter(c => c !== company)
        : [...prev, company]
    );
  };

  const scheduleJob = async () => {
    const payload = {
      frequency,
      run_time: runTime,
      number_of_days: numberOfDays,
      list_of_companies: selectedCompanies
    };

    try {
      const response = await fetch('https://news-scheduling-service-production.up.railway.app/scheduler/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();
      setMessage('Job scheduled successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Error scheduling job.');
    }
  };

  return (
    <div>
      {/* Gradient Header Section */}
      <div className="news-header-area fade-in" style={{ animationDelay: '0.2s' }}>
        <h1>Schedule a News Aggregation Job</h1>
        <p>Set up a job to aggregate news for your selected companies at your preferred schedule.</p>
      </div>

      <div className="schedule-job-container">
        <div className="fade-in" style={{ animationDelay: '0.4s' }}>
          <label>Select Companies:</label>
          <div className="company-grid">
            {companies.map(company => (
              <div
                key={company}
                className={`company-box ${selectedCompanies.includes(company) ? 'selected' : ''}`}
                onClick={() => toggleCompany(company)}
              >
                <h3>{company}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-in" style={{ animationDelay: '0.6s', marginTop: '20px' }}>
          <label>Frequency:</label>
          <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
            {frequencies.map(freq => (
              <option key={freq} value={freq}>{freq}</option>
            ))}
          </select>
        </div>

        <div className="fade-in" style={{ animationDelay: '0.8s', marginTop: '20px' }}>
          <label>Run Time:</label>
          <input type="time" value={runTime} onChange={(e) => setRunTime(e.target.value)} />
        </div>

        <div className="fade-in" style={{ animationDelay: '1s', marginTop: '20px' }}>
          <label>Number of Days:</label>
          <select value={numberOfDays} onChange={(e) => setNumberOfDays(Number(e.target.value))}>
            {Array.from({ length: 14 }, (_, i) => i + 1).map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <button 
          className="fade-in" 
          style={{ animationDelay: '1.2s', marginTop: '20px' }} 
          onClick={scheduleJob}
        >
          Schedule Job
        </button>

        {message && (
          <p className="fade-in" style={{ animationDelay: '1.4s', marginTop: '20px' }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ScheduleJob;
