import { useState } from "react";
import type { Company } from "../models/company.model";
import CompanySelector from "../components/companies/company-selector";
import JobTitleSelector from "../components/job-titles/job-title-selector";
import { createJobDescription } from "../apis/job-descriptions.api";
import type { WorkType } from "../models/work-type.enum";
import WorkTypeSelector from "../components/work-type/work-type-selector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import type { CreateJobDescriptionDto } from "@/models/job-description.model";
import { EditorProvider } from "@tiptap/react";
import { extensions } from "@/lib/editor.utils";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const CreateJobDescriptionPage = () => {
  const navigate = useNavigate();
  const createJobDescriptionMutation = useMutation({
    mutationFn: (createJobDescriptionDto: CreateJobDescriptionDto) => {
      return createJobDescription(createJobDescriptionDto);
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success('Job description created');
      navigate(`/job-descriptions/${data.id}`);
    },
    onError: (error) => {
      console.warn(error);
      toast.error('Could not create job description');
    }
  });
  const [ selectedCompany, setSelectedCompany ] = useState<Company | undefined>(undefined);
  const [ jobTitleId, setJobTitleId ] = useState<string | undefined>(undefined);
  const [ jobDescriptionLink, setJobDescriptionLink ] = useState<string>("");
  const [ descriptionText, setDescriptionText ] = useState<string>('');
  const [ location, setLocation ] = useState<string>('');
  const [ workType, setWorkType ] = useState<WorkType | undefined>(undefined);

  return (
    <div className="w-full flex gap-4">
      <div className="w-md flex flex-col gap-4 overflow-auto">
        <CompanySelector onSelectCompany={setSelectedCompany} />

        <JobTitleSelector onSelectTitleId={setJobTitleId} />

        <WorkTypeSelector onSelectWorkType={setWorkType} />

        <Input
          className=""
          id="jobDescriptionLink"
          type="text"
          value={jobDescriptionLink}
          placeholder="Link to job description"
          onChange={(event) => setJobDescriptionLink(event.target.value)}
        ></Input>

        <Input
          className=""
          id="location"
          type="text"
          value={location}
          placeholder="Job location"
          onChange={(event) => setLocation(event.target.value)}
        ></Input>

        <Button
          className=""
          variant={"outline"}
          onClick={() => createJobDescriptionMutation.mutate({
            companyId: selectedCompany!.id,
            jobTitleId: jobTitleId!,
            workType: workType!,
            link: jobDescriptionLink,
            rawText: descriptionText,
            location
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

      <div className="w-full h-1/2 border p-4 rounded-md">
        <EditorProvider
          extensions={extensions}
          content={descriptionText}
          onUpdate={(editor) => setDescriptionText(editor.editor.getHTML())}
        />
      </div>
    </div>
  )
}

export default CreateJobDescriptionPage;
