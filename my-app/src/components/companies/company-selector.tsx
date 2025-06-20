import { getCompaniesPage } from "../../apis/companies.api";
import type { Company } from "../../models/company.model";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
  onSelectCompany: (company: Company | undefined) => void
}

const CompanySelector: React.FC<Props> = ({ onSelectCompany }) => {
  const { data: companiesResponse, isLoading, isError, error, isFetching } = useQuery({ queryKey: ['companies'], queryFn: () => getCompaniesPage(1, 100) });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (!companiesResponse && !isFetching) {
    toast.error('Could not find companies')
    return <p>
      Could not find companies
    </p>
  }

  if (!companiesResponse) {
    return <p>Loading...</p>
  }

  const handleCompanySelect = (companyId: string) => {
    const company = companiesResponse
      .companies
      .find((company) => company.id === companyId);
    onSelectCompany(company);
  }

  return (
    <Select onValueChange={handleCompanySelect}>
      <SelectTrigger className="">
        <SelectValue placeholder="Select company" />
      </SelectTrigger>
      <SelectContent>
        {
          companiesResponse
            .companies
            .map((company) => (
              <SelectItem
                key={company.id}
                value={company.id}
              >
                {company.companyName}
              </SelectItem>
            ))
        }
      </SelectContent>
    </Select>
  )
}

export default CompanySelector;
