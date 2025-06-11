import { useState } from "react";
import JobDescriptionSelector from "../job-descriptions/job-description-selector";
import type { JobDescription } from "../../models/job-description.model";

const StartApplication = () => {
  const [ selectedJobDescription, setSelectedJobDescription ] = useState<JobDescription>();
  const handleSelectJobDescription = (jobDescription: JobDescription | undefined) => {
    setSelectedJobDescription(jobDescription);
  }

  const handleStartApplication = async () => {
    // await createApplication(selectedCompany);
    
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="mb-4 text-2xl">Start Application</h3>

      <JobDescriptionSelector onSelectJobDescription={handleSelectJobDescription} />

      <button onClick={handleStartApplication}>Start</button>

      {
        !selectedJobDescription
          ? null
          : <pre>{JSON.stringify(selectedJobDescription, null, 2)}</pre>
      }
    </div>
  );
};

export default StartApplication;
