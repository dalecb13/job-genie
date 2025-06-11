import { useEffect, useState } from "react";
import { getAllCompanies } from "../../apis/companies.api";
import type { Company } from "../../models/company.model";

const CompanyList = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ companies, setCompanies ] = useState<Company[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      const companies = await getAllCompanies();
      setCompanies(companies);
      setIsLoading(false);
    }
    fetchCompanies();
  }, []);;

  return (
    <div>
      {
        isLoading
        ? <p>Loading...</p>
        : null
      }

      {
        !companies || companies.length === 0
        ? <p>No companies found</p>
        : (
          <div>
            {companies.map((company) => (
              <div
                key={company.id}
                className="flex flex-row gap-2"
              >
                <p>{company.companyName}</p>
                <p>{company.website}</p>
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}

export default CompanyList;
