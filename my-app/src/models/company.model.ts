export type Company = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  companyName: string;
  website: string | null;
}

export type CompanyModel = {
  id: string;
  createdAt: string;
  updatedAt: string;
  companyName: string;
  link: string;
}

export type AddCompanyDto = {
  companyName: string;
  link?: string;
}
