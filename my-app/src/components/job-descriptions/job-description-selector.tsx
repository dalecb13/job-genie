import { useEffect, useState } from "react";
import type { JobDescription } from "../../models/job-description.model";
import { getJobDescriptions } from "../../apis/job-descriptions.api";

type Props = {
  onSelectJobDescription: (jobDescription: JobDescription | undefined) => void
}

const JobDescriptionSelector: React.FC<Props> = ({ onSelectJobDescription }) => {
  const [ jobDescriptions, setJobDescriptions ] = useState<JobDescription[]>([]);
  const [ selectedJobDescriptionId, setSelectedJobDescriptionId ] = useState<string>();

  useEffect(() => {
    const fetchJobDescriptions = async () => {
      const jds = await getJobDescriptions();
      setJobDescriptions(jds);
    }
    fetchJobDescriptions();
  }, []);

  const handleSelectJobDescription = (jobDescriptionId: string) => {
    setSelectedJobDescriptionId(jobDescriptionId);
    const jobDescription = jobDescriptions.find((jobDescription) => jobDescription.id === jobDescriptionId);
    onSelectJobDescription(jobDescription);
  }

  return (
    <select
      onChange={(event) => handleSelectJobDescription(event.target.value)}
      value={selectedJobDescriptionId}
    >
      <option value="">Select a job description</option>
      {
        jobDescriptions.length === 0
          ? (
              <option value="">No job descriptions found</option>
            )
          : <>
              {
                jobDescriptions?.map((jobDescription) => (
                  <option key={jobDescription.id} value={jobDescription.id}>
                    {jobDescription.company.companyName} - {jobDescription.jobTitle.jobTitle}
                  </option>
                  ))
              }
            </>
      }
    </select>
  )
}

export default JobDescriptionSelector;
