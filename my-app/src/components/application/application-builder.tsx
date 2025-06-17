import { useState } from "react";
import { Input } from "../ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import Combobox from "../ui/combobox";
import { createCompany, getAllCompanies } from "@/apis/companies.api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { CreateJobDescriptionDto } from "@/models/job-description.model";
import { createJobDescription } from "@/apis/job-descriptions.api";
import type { WorkType } from "@/models/work-type.enum";
import { createJobTitle, getJobTitles } from "@/apis/job-titles.api";

const extensions = [
  // Color.configure({ types: [TextStyle.name, ListItem.name] }),
  // TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const ApplicationBuilder = () => {
  const { data: companies } = useQuery({ queryKey: ['companies'], queryFn: getAllCompanies });
  const companyOptions = companies?.map((company) => ({
    label: company.companyName,
    value: company.id
  }));
  const createCompanyMutation = useMutation({
    mutationFn: (name: string) => {
      return createCompany({ companyName: name });
    }
  });
  const createJobDescriptionMutation = useMutation({
    mutationFn: (dto: CreateJobDescriptionDto) => {
      return createJobDescription(dto);
    }
  });
  const { data: jobTitles } = useQuery({ queryKey: ['jobTitles'], queryFn: getJobTitles });
  const jobTitleOptions = jobTitles?.map((jobTitle) => ({
    label: jobTitle.title,
    value: jobTitle.id
  }));
  const createJobTitleMutation = useMutation({
    mutationFn: (name: string) => {
      return createJobTitle(name);
    }
  });

  const [ company, setCompany ] = useState("");
  const [ jobTitle, setJobTitle ] = useState("");
  const [ location, setLocation ] = useState("");
  const [ workType, setWorkType ] = useState("");
  const [ jobDescriptionLink, setJobDescriptionLink ] = useState("");
  const [ rawText, setRawText ] = useState("");

  const handleCreateJobDescription = () => {
    createJobDescriptionMutation.mutate({
      companyId: company,
      workType: workType as WorkType,
      location: location,
      link: jobDescriptionLink,
      rawText: rawText,
      jobTitleId: jobTitle,
    });

  }

  return (
    <div className="flex flex-col gap-2">
      <Combobox
        placeholder="Company Name"
        emptyMessage="No companies found"
        options={companyOptions || []}
        value={company}
        onValueChange={setCompany}
        onCreate={createCompanyMutation.mutate}
      />
      <Combobox
        placeholder="Job Title"
        emptyMessage="No job titles found"
        options={jobTitleOptions || []}
        value={jobTitle}
        onValueChange={setJobTitle}
        onCreate={createJobTitleMutation.mutate}
      />
      <Select
        value={workType}
        onValueChange={setWorkType}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Work Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Office">In Office</SelectItem>
          <SelectItem value="Remote">Remote</SelectItem>
          <SelectItem value="Hybrid">Hybrid</SelectItem>
          <SelectItem value="Hybrid (4 in, 1 out)">Hybrid (4 in, 1 out)</SelectItem>
          <SelectItem value="Hybrid (3 in, 2 out)">Hybrid (3 in, 2 out)</SelectItem>
          <SelectItem value="Hybrid (2 in, 3 out)">Hybrid (2 in, 3 out)</SelectItem>
          <SelectItem value="Hybrid (1 in, 4 out)">Hybrid (1 in, 4 out)</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <Input
        placeholder="Job Description Link"
        value={jobDescriptionLink}
        onChange={(e) => setJobDescriptionLink(e.target.value)}
      />
      <div className="border border-gray-300 p-2 rounded h-[360px] w-full overflow-scroll">
        <EditorProvider
          extensions={extensions}
          content={rawText}
          onUpdate={(editor) => setRawText(editor.editor.getHTML())}
        />
      </div>
      <Button
        variant={"outline"}
        className="mt-4"
        onClick={handleCreateJobDescription}
        disabled={!company || !workType || !location || !jobDescriptionLink || createJobDescriptionMutation.status === 'pending'}
      >
        Create
      </Button>
    </div>
  )
}

export default ApplicationBuilder;
