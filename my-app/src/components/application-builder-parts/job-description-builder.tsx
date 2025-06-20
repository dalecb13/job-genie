import { createJobTitle, getJobTitles } from "@/apis/job-titles.api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import Combobox from "../ui/combobox"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "../ui/input"
import { EditorProvider } from "@tiptap/react"
import { Button } from "../ui/button"
import { extensions } from "@/lib/editor.utils"

type Props = {
  jobTitle: string
  workType: string
  location: string
  jobDescriptionLink: string
  rawText: string

  handleJobTitleChange: (jobTitle: string) => void
  handleWorkTypeChange: (workType: string) => void
  handleLocationChange: (location: string) => void
  handleJobDescriptionLinkChange: (jobDescriptionLink: string) => void
  handleRawTextChange: (rawText: string) => void

  handleNext: () => void
}

const JobDescriptionBuilder: React.FC<Props> = ({
  location,
  jobDescriptionLink,
  rawText,
  handleWorkTypeChange,
  handleLocationChange,
  handleJobDescriptionLinkChange,
  handleRawTextChange,
  handleNext
}) => {
  const [jobTitleId, setJobTitleId] = useState('');
  const { data: jobTitles, isLoading, isError, error } = useQuery({ queryKey: ['jobTitles'], queryFn: getJobTitles });

  const createJobTitleMutation = useMutation({
    mutationFn: (name: string) => {
      return createJobTitle(name);
    }
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!jobTitles) return <p>No job titles found</p>;

  const jobTitleOptions: { label: string; value: string }[] = jobTitles.map((jobTitle) => ({
    label: jobTitle.title,
    value: jobTitle.id
  }));

  const handleCreateJobTitle = (name: string) => {
    createJobTitleMutation.mutate(name);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Combobox
        placeholder="Job Title"
        emptyMessage="No job title found"
        options={jobTitleOptions}
        value={jobTitleId}
        onValueChange={setJobTitleId}
        onCreate={handleCreateJobTitle}
      />
      <Select
        onValueChange={handleWorkTypeChange}
      >
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Remote or Hybrid?" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="Office">In Office</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
            <SelectItem value="Hybrid (4 in, 1 out)">Hybrid (4 in, 1 out)</SelectItem>
            <SelectItem value="Hybrid (3 in, 2 out)">Hybrid (3 in, 2 out)</SelectItem>
            <SelectItem value="Hybrid (2 in, 3 out)">Hybrid (2 in, 3 out)</SelectItem>
            <SelectItem value="Hybrid (1 in, 4 out)">Hybrid (1 in, 4 out)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        className="w-[300px]"
        placeholder="Location"
        value={location}
        onChange={(e) => handleLocationChange(e.target.value)}
      />
      <Input
        className="w-[300px]"
        placeholder="Job Description Link"
        value={jobDescriptionLink}
        onChange={(e) => handleJobDescriptionLinkChange(e.target.value)}
      />

      <div className="border border-gray-300 p-2 rounded h-[360px] w-full overflow-scroll">
        <EditorProvider
          extensions={extensions}
          content={rawText}
          onUpdate={(editor) => handleRawTextChange(editor.editor.getHTML())}
        />
      </div>

      <Button
        variant='outline'
        onClick={handleNext}
      >
        Save
      </Button>
    </div>
  )
}

export default JobDescriptionBuilder;
