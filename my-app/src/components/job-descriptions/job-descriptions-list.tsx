import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query";
import { getJobDescriptions } from "@/apis/job-descriptions.api";
import { toast } from "sonner";

const JobDescriptionsList = () => {
  const navigate = useNavigate();
  const { data: jobDescriptions, isLoading, isError, error } = useQuery({ queryKey: ['jobDescriptions'], queryFn: getJobDescriptions });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!jobDescriptions || jobDescriptions.length === 0) {
    toast.error('Could not find job descriptions')
    return <p>
      Could not find job descriptions
    </p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job Title</TableHead>
          <TableHead>Company Name</TableHead>
          <TableHead>Work Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          jobDescriptions.map((jobDescription) => (
            <TableRow
              key={jobDescription.id}
              className="cursor-pointer"
              onClick={() => navigate(`/job-descriptions/${jobDescription.id}`)}
            >
              <TableCell>{jobDescription.jobTitle.title}</TableCell>
              <TableCell>{jobDescription.company.companyName}</TableCell>
              <TableCell>{jobDescription.workType}</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}

export default JobDescriptionsList;
