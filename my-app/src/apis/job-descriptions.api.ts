import { toast } from "sonner";
import type { CreateJobDescriptionDto, JobDescription } from "../models/job-description.model";

const getJobDescriptions = async (): Promise<JobDescription[]> => {
  const response = await fetch('http://localhost:3000/job-descriptions');
  const jobDescriptions = await response.json();
  return jobDescriptions;
}

const createJobDescription = async (createJobDescriptionDto: CreateJobDescriptionDto) => {
  const body = JSON.stringify({
    link: createJobDescriptionDto.link,
    rawText: createJobDescriptionDto.rawText,
    companyId: createJobDescriptionDto.companyId,
    jobTitleId: createJobDescriptionDto.jobTitleId,
    workType: createJobDescriptionDto.workType,
    location: createJobDescriptionDto.location
  });
  const createResponse = await fetch('http://localhost:3000/job-descriptions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  const data = await createResponse.json();

  return data;
}

const getJobDescriptionById = async (id: string | undefined): Promise<JobDescription> => {
  const response = await fetch(`http://localhost:3000/job-descriptions/${id}`);
  const jobDescription = await response.json();
  return jobDescription;
}

const updateJobDescription = async (id: string, rawText: string) => {
  const updateResponse = await fetch(`http://localhost:3000/job-descriptions/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      rawText
    }),
  });
  const data = await updateResponse.json();
  toast('Updated job description')
  return data;
}

const deleteJobDescriptionById = async (id: string) => {
  const deleteResponse = await fetch(`http://localhost:3000/job-descriptions/${id}`, {
    method: 'DELETE',
  });
  const data = await deleteResponse.json();
  return data;
}

export { createJobDescription, getJobDescriptions, getJobDescriptionById, updateJobDescription, deleteJobDescriptionById };
