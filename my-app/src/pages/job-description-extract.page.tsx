import { getJobDescriptionById } from "@/apis/job-descriptions.api";
import ExtractKeywords from "@/components/extract-keywords";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const JobDescriptionExtractPage = () => {
  const { id } = useParams();
  const { data: jobDescription, isLoading, isError, error } = useQuery({ queryKey: ['jobDescription', id], queryFn: () => getJobDescriptionById(id) });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!jobDescription) return <p>Could not find job description</p>;

  return (
    <ExtractKeywords jobDescription={jobDescription} />
  );
};

export default JobDescriptionExtractPage;
