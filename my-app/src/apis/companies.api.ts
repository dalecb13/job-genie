import type { AddCompanyDto, Company } from "../models/company.model";
// import supabase from "../utils/supabase";

const getAllCompanies = async (): Promise<Company[]> => {
  const response = await fetch('http://localhost:3000/company');
  const companies: Company[] = await response.json();
  return companies;
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
  // const { data, error } = await supabase
  //   .from("companies")
  //   .insert({
  //     company_name: addCompanyDto.companyName,
  //     link: addCompanyDto.website,
  //   })
  //   .select()
  //   .single();
  
  // if (error) {
  //   console.warn(error);
  //   throw error;
  // }

  // const company: Company = {
  //   id: data.id,
  //   createdAt: data.created_at,
  //   updatedAt: data.updated_at,
  //   companyName: data.company_name,
  //   website: data.link
  // }

  // return company;
};

export { getAllCompanies, createCompany };
