import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('/jobs').then(res => setJobs(res.data));
  }, []);

  return (
    <div>
      {jobs.map(job => (
        <div key={job._id}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <strong>{job.salary}</strong>
        </div>
      ))}
    </div>
  );
};

export default EmployeeJobs;
