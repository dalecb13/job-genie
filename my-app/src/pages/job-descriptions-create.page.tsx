import { useState } from "react";
import type { Company } from "../models/company.model";
import CompanySelector from "../components/companies/company-selector";
import JobTitleSelector from "../components/job-titles/job-title-selector";
import { createJobDescription } from "../apis/job-descriptions.api";
import type { WorkType } from "../models/work-type.enum";
import WorkTypeSelector from "../components/work-type/work-type-selector";
import { SimpleEditor } from "../components/common/tiptap-templates/simple/simple-editor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import type { CreateJobDescriptionDto } from "@/models/job-description.model";

const CreateJobDescriptionPage = () => {
  const createJobDescriptionMutation = useMutation({
    mutationFn: (createJobDescriptionDto: CreateJobDescriptionDto) => {
      return createJobDescription(createJobDescriptionDto);
    }
  });
  const [ selectedCompany, setSelectedCompany ] = useState<Company | undefined>(undefined);
  const [ jobTitleId, setJobTitleId ] = useState<string | undefined>(undefined);
  const [ jobDescriptionLink, setJobDescriptionLink ] = useState<string>("");
  const [ descriptionText, setDescriptionText ] = useState<string>(`<p>Paste job description here</p>`);
  const [ workType, setWorkType ] = useState<WorkType | undefined>(undefined);

  return (
    <div className="w-full grid grid-cols-3 gap-4">
      <div className="col-span-2 h-1/2 border p-4 rounded-md">
        <SimpleEditor />
      </div>

      <div className="flex flex-col gap-4 overflow-auto">
        <CompanySelector onSelectCompany={setSelectedCompany} />

        <JobTitleSelector onSelectTitleId={setJobTitleId} />

        <WorkTypeSelector onSelectWorkType={setWorkType} />

        <Input
          className="w-[280px]"
          id="jobDescriptionLink"
          type="text"
          value={jobDescriptionLink}
          placeholder="Link to job description"
          onChange={(event) => setJobDescriptionLink(event.target.value)}
        ></Input>

        <Button
          className="w-[280px]"
          variant={"outline"}
          onClick={() => createJobDescriptionMutation.mutate({
            companyId: selectedCompany!.id,
            jobTitleId: jobTitleId!,
            workType: workType!,
            link: jobDescriptionLink,
            rawText: descriptionText
          })}
          disabled={createJobDescriptionMutation.status === 'pending' || !selectedCompany || !jobTitleId || !workType || !jobDescriptionLink || !descriptionText}
        >
          {
            createJobDescriptionMutation.status === 'pending'
              ? "Creating..."
              : "Create"
          }
        </Button>
      </div>
    </div>
  )
}

export default CreateJobDescriptionPage;
