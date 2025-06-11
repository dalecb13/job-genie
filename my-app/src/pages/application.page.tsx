import { getApplicationbyId } from "@/apis/applications.api";
import ApplicationDetails from "@/components/application/application-details";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { toast } from "sonner";
import { useParams } from "react-router";

const ApplicationPage = () => {
  const { id } = useParams();
  const { data: application, isLoading, isError, error } = useQuery({ queryKey: ['applications', id], queryFn: () => getApplicationbyId(id) });
  
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (!application) {
    toast.error('Could not find application')
    return <p>
      Could not find application
    </p>
  }

  return (
    <div>
      <h1>Application</h1>

      <Suspense fallback={<p>Loading...</p>}>
        <ApplicationDetails application={application} />
      </Suspense>
    </div>
  )
}

export default ApplicationPage;
