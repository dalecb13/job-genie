import type { Achievement } from "./achievement.model";

export type WorkExperience = {
  id: string;
  startDate: string;
  endDate: string;
  companyName: string;
  jobTitle: string;
  location: string;
  description: string;
  achievements: Achievement[];
}
