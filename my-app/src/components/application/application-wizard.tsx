import type { JobDescription } from "@/models/job-description.model";
import { useState } from "react";
import { Button } from "../ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getJobDescriptions } from "@/apis/job-descriptions.api";
import { createApplication } from "@/apis/applications.api";

const ApplicationWizard = () => {
  const { data: jobDescriptions, isLoading, isError, error } = useQuery({ queryKey: ['jobDescriptions'], queryFn: getJobDescriptions });
  const [ chosenJobDescription, setChosenJobDescription ] = useState<JobDescription | null>(null);

  const createApplicationMutation = useMutation({
    mutationFn: (jobDescriptionId: string) => {
      return createApplication(jobDescriptionId)
    },
  })

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const handleSelectJobDescription = (jobDescription: JobDescription) => {
    setChosenJobDescription(jobDescription);
  }

  return (
    <>
      <div>Application Wizard</div>

      {
        !jobDescriptions || jobDescriptions.length === 0
        ? <p>No job descriptions found</p>
        : (
          <div>
            {jobDescriptions.map((jobDescription) => (
              <div
                key={jobDescription.id}
                className="flex flex-row gap-2"
                onClick={() => handleSelectJobDescription(jobDescription)}
              >
                <p>{jobDescription.company.companyName}</p>
                <span> - </span>
                <p>{jobDescription.jobTitle.title}</p>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={() => createApplicationMutation.mutate(chosenJobDescription!.id)}
              disabled={!chosenJobDescription || isLoading}
            >
              Start Application
            </Button>
          </div>
        )
      }
    </>
  )
}

export default ApplicationWizard;
