import { useQuery } from "@tanstack/react-query"
import Combobox from "../ui/combobox"
import { getAllCompanies } from "@/apis/companies.api"
import { Button } from "../ui/button"

type Props = {
  companyId: string
  website: string
  careerWebsite: string

  handleCompanyIdChange: (companyName: string) => void

  handleNext: () => void
}

const CompanyBuilder: React.FC<Props> = ({ companyId, handleCompanyIdChange, handleNext }) => {
  const { data: companies, isLoading, isError, error } = useQuery({ queryKey: ['companies'], queryFn: getAllCompanies });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!companies) return <p>No companies found</p>;

  const companyOptions: { label: string; value: string }[] = companies.map((company) => ({
    label: company.companyName,
    value: company.id
  }))

  return (
    <div className="mt-16 flex flex-col justify-center items-center gap-2">
      <Combobox
        placeholder="Company Name"
        emptyMessage="No companies found"
        options={companyOptions}
        value={companyId}
        onValueChange={handleCompanyIdChange}
        // handleCreate={handleCreateCompany}
      />
      {/* <Input
        placeholder="Website Link"
        value={website}
        onChange={handleWebsiteChange}
      />
      <Input
        placeholder="Career Website Link"
        value={careerWebsite}
        onChange={handleCareerWebsiteChange}
      /> */}
      {
        companyId
        ? <Button
            variant={"outline"}
            className="mt-4"
            onClick={handleNext}
          >
            Next
          </Button>
        : null
      }
    </div>
  )
}

export default CompanyBuilder;
