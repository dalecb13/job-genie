import { getJobTitles } from "@/apis/job-titles.api"
import { useQuery } from "@tanstack/react-query"
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
import StarterKit from "@tiptap/starter-kit";
import { Button } from "../ui/button"

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
]

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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!jobTitles) return <p>No job titles found</p>;

  const jobTitleOptions: { label: string; value: string }[] = jobTitles.map((jobTitle) => ({
    label: jobTitle.title,
    value: jobTitle.id
  }));

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Combobox
        placeholder="Job Title"
        emptyMessage="No job title found"
        options={jobTitleOptions}
        value={jobTitleId}
        onValueChange={setJobTitleId}
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
