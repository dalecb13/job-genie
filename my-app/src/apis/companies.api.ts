import type { AddCompanyDto, Company, PaginatedCompanies, PaginatedCompanyResponse } from "../models/company.model";

const getAllCompanies = async (): Promise<Company[]> => {
  const response = await fetch('http://localhost:3000/company');
  const companies: Company[] = await response.json();
  return companies;
}

const getCompaniesPage = async (pageNumber: number, pageSize: number): Promise<PaginatedCompanies> => {
  const take = pageSize;
  const skip = (pageNumber - 1) * take;
  const response = await fetch(`http://localhost:3000/company?take=${take}&skip=${skip}`);
  const paginatedCompanyResponse: PaginatedCompanyResponse = await response.json();
  const companies: Company[] = paginatedCompanyResponse.companies.map((companyModel) => ({
    id: companyModel.id,
    createdAt: new Date(companyModel.createdAt),
    updatedAt: new Date(companyModel.updatedAt),
    companyName: companyModel.companyName,
    website: companyModel.link
  }))
  const paginatedCompanies: PaginatedCompanies = {
    companies,
    total: paginatedCompanyResponse.total
  }
  return paginatedCompanies;
}

const createCompany = async (addCompanyDto: AddCompanyDto): Promise<Company> => {
  try {
    const createResponse = await fetch('http://localhost:3000/company', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addCompanyDto),
    });

    const company = await createResponse.json();
    return company;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

export { getAllCompanies, createCompany, getCompaniesPage };
