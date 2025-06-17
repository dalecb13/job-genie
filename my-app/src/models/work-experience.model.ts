import type { Achievement } from "./achievement.model";
import type { Company } from "./company.model";
import type { JobTitle } from "./job-title.model";

export type WorkExperience = {
  id: string;
  startDate: Date;
  endDate: Date;
  company: Company;
  jobTitle: JobTitle;
  location: string;
  description: string;
  achievements: Achievement[];
}
