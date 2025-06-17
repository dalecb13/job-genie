import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteJobDescriptionById, getJobDescriptions } from "@/apis/job-descriptions.api";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { queryClient } from "@/apis/query-client";
import { createApplication } from "@/apis/applications.api";

const JobDescriptionsList = () => {
  const navigate = useNavigate();
  const { data: jobDescriptions, isLoading, isError, error } = useQuery({ queryKey: ['jobDescriptions'], queryFn: getJobDescriptions });
  const deleteJobDescriptionMutation = useMutation({
    mutationFn: (jobDescriptionId: string) => {
      return deleteJobDescriptionById(jobDescriptionId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobDescriptions'] })
    }
  });
  const createApplicationMutation = useMutation({
    mutationFn: (jobDescriptionId: string) => {
      return createApplication(jobDescriptionId)
    },
    onSuccess: (data) => {
      toast.success('Application started');
      navigate(`/applications/${data.id}`);
    },
    onError: () => {
      toast.error('Could not create application')
    }
  });

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
          <TableHead>Actions</TableHead>
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
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">...</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="" align="start">
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="flex flex-col items-center">
                        <Button
                          variant={"outline"}
                          onClick={() => deleteJobDescriptionMutation.mutate(jobDescription.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant={"outline"}
                          onClick={() => createApplicationMutation.mutate(jobDescription.id)}
                        >
                          Start Application
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}

export default JobDescriptionsList;
