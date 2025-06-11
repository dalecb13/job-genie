import { getAllCompanies } from "../../apis/companies.api";
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
  const { data: companies, isLoading, isError, error } = useQuery({ queryKey: ['companies'], queryFn: getAllCompanies });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (!companies) {
    toast.error('Could not find companies')
    return <p>
      Could not find companies
    </p>
  }

  const handleCompanySelect = (companyId: string) => {
    const company = companies
      .find((company) => company.id === companyId);
    onSelectCompany(company);
  }

  return (
    <Select onValueChange={handleCompanySelect}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select company" />
      </SelectTrigger>
      <SelectContent>
        {
          companies.map((company) => (
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
