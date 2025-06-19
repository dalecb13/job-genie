import type { Technology, TechnologyModel } from "@/models/technology.model";
import type { Application, ApplicationModel } from "../models/application.model";
import type { Competency, CompetencyModel } from "@/models/competency.model";
import type { JobDescription } from "@/models/job-description.model";
import type { Company } from "@/models/company.model";
import type { Activity, ActivityModel } from "@/models/activity.model";

const getAllApplications = async () => {
  const getAllResponse = await fetch('http://localhost:3000/applications');
  const applications: Application[] = await getAllResponse.json();
  return applications;
};

const createApplication = async (jobDescriptionId: string): Promise<Application> => {
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
  const applicationModel: ApplicationModel = await getResponse.json();
  console.log('applicationModel', applicationModel);

  const technologies: Technology[] = applicationModel.jobDescription.technologies.map((tm: TechnologyModel) => {
    return {
      id: tm.id,
      name: tm.name,
      createdAt: new Date(tm.createdAt),
      updatedAt: new Date(tm.updatedAt),
    }
  });

  console.log('technologies', technologies);

  const competencies: Competency[] = applicationModel.jobDescription.competencies.map((cm: CompetencyModel) => {
    return {
      id: cm.id,
      name: cm.name,
      createdAt: new Date(cm.createdAt),
      updatedAt: new Date(cm.updatedAt),
    }
  });

  console.log('competencies', competencies);

  const jobDescription: JobDescription = {
    id: applicationModel.jobDescription.id,
    createdAt: new Date(applicationModel.jobDescription.createdAt),
    updatedAt: new Date(applicationModel.jobDescription.updatedAt),
    link: applicationModel.jobDescription.link,
    rawText: applicationModel.jobDescription.rawText,
    companyId: applicationModel.jobDescription.companyId,
    company: applicationModel.jobDescription.company,
    jobTitleId: applicationModel.jobDescription.jobTitleId,
    jobTitle: applicationModel.jobDescription.jobTitle,
    workType: applicationModel.jobDescription.workType,
    location: applicationModel.jobDescription.location,
    technologies,
    competencies,
  };

  console.log('jobDescription', jobDescription);

  const company: Company = {
    id: applicationModel.jobDescription.company.id,
    createdAt: new Date(applicationModel.jobDescription.company.createdAt),
    updatedAt: new Date(applicationModel.jobDescription.company.updatedAt),
    companyName: applicationModel.jobDescription.company.companyName,
    website: applicationModel.jobDescription.company.website
  };

  console.log('company', company);

  const activities: Activity[] = applicationModel.activities.map((am: ActivityModel) => {
    return {
      id: am.id,
      createdAt: new Date(am.createdAt),
      updatedAt: new Date(am.updatedAt),
      activityDate: new Date(am.activityDate),
      activityType: am.activityType,
      note: am.note,
      applicationId: am.applicationId
    }
  });

  console.log('activities', activities);

  const application: Application = {
    id: applicationModel.id,
    jobDescriptionId: applicationModel.jobDescriptionId,
    createdAt: new Date(applicationModel.createdAt),
    updatedAt: new Date(applicationModel.updatedAt),
    jobDescription,
    companyId: applicationModel.companyId,
    company,
    ownerId: applicationModel.ownerId,
    activities,
  }

  console.log('application', application);

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

const deleteApplicationById = async (id: string) => {
  const deleteResponse = await fetch(`http://localhost:3000/applications/${id}`, {
    method: 'DELETE',
  });
  const data = await deleteResponse.json();
  return data;
}

export { deleteApplicationById, createApplication, getAllApplications, getApplicationbyId, setApplicationId, updateApplication }
