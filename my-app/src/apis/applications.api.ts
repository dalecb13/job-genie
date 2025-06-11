import type { Technology } from "@/models/technology.model";
import type { Application } from "../models/application.model";
import type { Competency } from "@/models/competency.model";

const getAllApplications = async () => {
  const getAllResponse = await fetch('http://localhost:3000/applications');
  const applications: Application[] = await getAllResponse.json();
  return applications;
};

const createApplication = async (jobDescriptionId: string) => {
  const createResponse = await fetch('http://localhost:3000/applications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ jobDescriptionId }),
  });
  const data = await createResponse.json();
  return data;
};

const getApplicationbyId = async (id: string | undefined) => {
  const getResponse = await fetch(`http://localhost:3000/applications/${id}`);
  const application: Application = await getResponse.json();
  return application;
};

const setApplicationId = (set: (id: string) => void) => async (id: string) => {
  set(id);
}

const updateApplication = async (applicationId: string, technologies: Technology[], competencies: Competency[]) => {
  await fetch(`http://localhost:3000/applications/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ technologies, competencies, id: applicationId }),
  })
}

export { createApplication, getAllApplications, getApplicationbyId, setApplicationId, updateApplication }
