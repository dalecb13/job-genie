import { z } from "zod/v4"; 
import CompanyBuilder from "./application-builder-parts/company-builder";
import { useState } from "react";
import JobDescriptionBuilder from "./application-builder-parts/job-description-builder";

// type ApplicationBuilderState = {
//   companyName: string,
//   website: string,
//   careerWebsite: string,

//   jobTitle: string,
//   workType: WorkType,
//   jobDescriptionLink: string,
//   rawText: string,

//   technologies: string[],
//   competencies: string[],
// }

const applicationSchema = z.object({ 
  companyId: z.string(),
  website: z.string(),
  careerWebsite: z.string(),

  jobTitle: z.string(),
  workType: z.enum(["Office", "Remote", "Hybrid", "Hybrid (4 in, 1 out)", "Hybrid (3 in, 2 out)", "Hybrid (2 in, 3 out)", "Hybrid (1 in, 4 out)"]),
  location: z.string(),
  jobDescriptionLink: z.string(),
  rawText: z.string(),

  technologies: z.array(z.string()),
  competencies: z.array(z.string()),
});

const ApplicationWorkflow = () => {
  const [tab, setTab] = useState(0);
  
  const [companyId, setCompanyId] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [careerWebsite, setCareerWebsite] = useState("");

  const [jobTitle, setJobTitle] = useState("");
  const [workType, setWorkType] = useState("");
  const [location, setLocation] = useState("");
  const [jobDescriptionLink, setJobDescriptionLink] = useState("");
  const [rawText, setRawText] = useState(`<p>Paste job description here...</p>`);

  // function onSubmit(values: z.infer<typeof applicationSchema>) {
  //   console.log(values)
  // }

  const handleNext = () => {
    setTab(tab + 1);
  }

  return (
    <>
      {
        tab === 0
          ? <CompanyBuilder
              companyId={companyId}
              website={companyWebsite}
              careerWebsite={careerWebsite}
              handleCompanyIdChange={setCompanyId}
              handleNext={handleNext}
            />
          : <JobDescriptionBuilder
              jobTitle={jobTitle}
              workType={workType}
              location={location}
              jobDescriptionLink={jobDescriptionLink}
              rawText={rawText}
              handleJobTitleChange={setJobTitle}
              handleWorkTypeChange={setWorkType}
              handleLocationChange={setLocation}
              handleJobDescriptionLinkChange={setJobDescriptionLink}
              handleRawTextChange={setRawText}
              handleNext={handleNext}
            />
      }
    </>
  )
};

export default ApplicationWorkflow;
