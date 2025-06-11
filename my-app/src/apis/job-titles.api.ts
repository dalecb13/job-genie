import type { JobTitle } from "../models/job-title.model";

const getJobTitles = async (): Promise<JobTitle[]> => {
  const response = await fetch('http://localhost:3000/job-title');
  const jobTitles = await response.json();
  return jobTitles;
}

const createJobTitle = async (jobTitle: string) => {
  const createResponse = await fetch('http://localhost:3000/job-title', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: jobTitle }),
  });
  const data = await createResponse.json();
  return data;
};

export { createJobTitle, getJobTitles };
