export type Company = {
  id: string;
  createdAt: string;
  updatedAt: string;
  companyName: string;
  website: string | null;
}

export type CompanyModel = {
  id: string;
  created_at: string;
  updated_at: string;
  company_name: string;
  link: string;
}

export type AddCompanyDto = {
  companyName: string;
  link?: string;
}
