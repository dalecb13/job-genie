import { Button } from "@/components/ui/button";
import ApplicationsTable from "../components/application/applications-table";
import { useNavigate } from "react-router";

const ApplicationsPage = () => {
  const navigate = useNavigate();

  const handleCreateApplication = () => {
    navigate('/applications/start');
  }

  return (
    <>
      <div className="flex justify-end">
        <Button
          className="mb-4"
          variant={"outline"}
          onClick={handleCreateApplication}
        >
          Create Application
        </Button>
      </div>
      <div className="flex flex-col p-4 border border-gray-300 rounded-md">
        <ApplicationsTable />
      </div>
    </>
  )
}

export default ApplicationsPage;
