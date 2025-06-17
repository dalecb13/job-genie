import type { Company } from "@/models/company.model";
import type { JobTitle } from "@/models/job-title.model";
import type { WorkExperience } from "@/models/work-experience.model";

type JobTitleModel = {
  id: string;
  createdAt: string;
  updatedAt: string;

  title: string;
}

type CompanyModel = {
  id: string;
  createdAt: string;
  updatedAt: string;

  companyName: string;
  link: string;
  careerWebsites: string[]
}

type WorkExperienceModel = {
  id: string;
  createdAt: string;
  updatedAt: string;

  startDate: string;
  endDate: string;
  description: string;
  location: string;
  jobTitleId: string;
  companyId: string;
  jobTitle: JobTitleModel;
  company: CompanyModel;
}

const getAllWorkExperiences = async (): Promise<WorkExperience[]> => {
  const response = await fetch('http://localhost:3000/work-experiences');
  const workExperienceModels: WorkExperienceModel[] = await response.json();
  const workExperiences: WorkExperience[] = workExperienceModels.map(weModel => {
    const company: Company = {
      id: weModel.company.id,
      createdAt: new Date(weModel.company.createdAt),
      updatedAt: new Date(weModel.company.updatedAt),
      companyName: weModel.company.companyName,
      website: weModel.company.link,
    }
    const jobTitle: JobTitle = {
      id: weModel.jobTitle.id,
      title: weModel.jobTitle.title,
      createdAt: new Date(weModel.jobTitle.createdAt),
      updatedAt: new Date(weModel.jobTitle.updatedAt),
    }
    return {
      id: weModel.id,
      createdAt: new Date(weModel.createdAt),
      updatedAt: new Date(weModel.updatedAt),
      startDate: new Date(weModel.startDate),
      endDate: new Date(weModel.endDate),
      company,
      jobTitle,
      location: weModel.location,
      description: weModel.description,
      achievements: [],
    }
  })
  return workExperiences;
}

export { getAllWorkExperiences };
