import { deleteApplicationById, getAllApplications } from "../../apis/applications.api";
import { Link, useNavigate } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Application } from "@/models/application.model";
import { queryClient } from "@/apis/query-client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const ApplicationsTable = () => {
  const navigate = useNavigate();
  const { isPending, isError, data: applications, error } = useQuery({ queryKey: ['applications'], queryFn: getAllApplications });
  const deleteApplicationMutation = useMutation({
    mutationFn: (applicationId: string) => {
      return deleteApplicationById(applicationId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    }
  })

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const handleChooseApplication = (applicationId: string) => {
    navigate(`/applications/${applicationId}`);
  }

  return (
    <div className="w-full">
      {
        !applications || applications.length === 0
        ? <div className="flex flex-col justify-center items-center gap-2 h-64">
            <p>No applications found.</p>
            <Link to="/applications/start">Start one?</Link>
          </div>
        : <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Company Name</TableHead>
                <TableHead className="font-bold">Job Title</TableHead>
                <TableHead className="font-bold">Work Type</TableHead>
                <TableHead className="font-bold">Location</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Date</TableHead>
                <TableHead className="font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                applications.map((application: Application) => (
                  <TableRow
                    key={application.id}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleChooseApplication(application.id)}
                  >
                    <TableCell>{application.jobDescription.company.companyName}</TableCell>
                    <TableCell>{application.jobDescription.jobTitle.title}</TableCell>
                    <TableCell>{application.jobDescription.workType}</TableCell>
                    <TableCell>{application.jobDescription.location || 'Madrid, Spain'}</TableCell>
                    <TableCell>{application.status || 'Started'}</TableCell>
                    <TableCell>{application.latestActivityDate || '2025-06-11'}</TableCell>
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
                                onClick={() => deleteApplicationMutation.mutate(application.id)}
                              >
                                Delete
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
      }
    </div>
  );
};

export default ApplicationsTable;
