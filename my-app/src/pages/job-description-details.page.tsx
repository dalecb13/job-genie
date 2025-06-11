import { getJobDescriptionById } from "@/apis/job-descriptions.api";
import JobDescriptionDetails from "@/components/job-descriptions/job-description-details";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

const JobDescriptionDetailsPage = () => {
  const { id } = useParams();
  const { data: jobDescription, isLoading, isError, error } = useQuery({ queryKey: ['jobDescriptions', id], queryFn: () => getJobDescriptionById(id) });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (!jobDescription) {
    toast.error('Could not find job description')
    return <p>
      Could not find job description
    </p>
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <JobDescriptionDetails jobDescription={jobDescription} />
    </Suspense>
  )
}

export default JobDescriptionDetailsPage;
