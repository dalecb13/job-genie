import { useState } from "react";
import CompanySelector from "../companies/company-selector";
import JobTitleSelector from "../job-titles/job-title-selector";
import WorkTypeSelector from "../work-type/work-type-selector";
import type { Company } from "../../models/company.model";
import type { WorkType } from "../../models/work-type.enum";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { createJobDescription } from "@/apis/job-descriptions.api";
import type { CreateJobDescriptionDto } from "@/models/job-description.model";

const CreateJobDescription = () => {
  const createJobDescriptionMutation = useMutation({
    mutationFn: (createJobDescriptionDto: CreateJobDescriptionDto) => {
      return createJobDescription(createJobDescriptionDto);
    }
  });
  const [ selectedCompany, setSelectedCompany ] = useState<Company | undefined>(undefined);
  const [ jobTitleId, setJobTitleId ] = useState<string | undefined>(undefined);
  const [ jobType, setJobType ] = useState<WorkType | undefined>(undefined);

  const handleSelectCompany = (company: Company | undefined) => {
    setSelectedCompany(company);
  }

  const handleSelectJobTitle = (id: string | undefined) => {
    setJobTitleId(id);
  }
  
  const handleSelectJobType = (jobType: WorkType) => {
    setJobType(jobType);
  }

  return (
    <div>
      <CompanySelector onSelectCompany={handleSelectCompany} />

      <JobTitleSelector onSelectTitleId={handleSelectJobTitle} />

      <WorkTypeSelector onSelectWorkType={handleSelectJobType} />

      <label htmlFor="jobDescription">Job Description</label>
      <input id="jobDescription" type="text" placeholder="Software Engineer"></input>

      <label htmlFor="rawText">Raw Text</label>
      <input id="rawText" type="text" placeholder="Software Engineer"></input>

      <Button
        variant="outline"
        onClick={() => createJobDescriptionMutation.mutate({
          companyId: selectedCompany!.id,
          jobTitleId: jobTitleId!,
          workType: jobType!,
          link: "",
          rawText: ""
        })}
        disabled={!selectedCompany || !jobTitleId || !jobType}
      >Create</Button>
    </div>
  )
}

export default CreateJobDescription;
