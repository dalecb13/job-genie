export type CreateWorkExperienceDto = {
  startDate: Date;
  endDate: Date;
  location: string;
  description: string;

  jobTitleId: string;
  companyId: string;
};
