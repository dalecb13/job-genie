import { getJobTitles } from "../../apis/job-titles.api";
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
  onSelectTitleId: (id: string | undefined) => void;
}

const JobTitleSelector: React.FC<Props> = ({ onSelectTitleId }: Props) => {
  const { data: jobTitles, isLoading, isError, error } = useQuery({ queryKey: ['job-titles'], queryFn: getJobTitles });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (!jobTitles) {
    toast.error('Could not find job titles')
    return <p>
      Could not find job titles
    </p>
  }

  const handleSelectTitle = (titleId: string) => {
    onSelectTitleId(titleId);
  }

  return (
    <Select onValueChange={handleSelectTitle}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select job title" />
      </SelectTrigger>
      <SelectContent>
        {
          jobTitles.map((jt) => (
            <SelectItem
              key={jt.id}
              value={jt.id}
            >
              {jt.title}
            </SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  )
}

export default JobTitleSelector;
