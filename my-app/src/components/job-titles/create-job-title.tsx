import { useState } from "react";
import { createJobTitle } from "../../apis/job-titles.api";

const CreateJobTitle = () => {
  const [jobTitle, setJobTitle] = useState('');

  const handleJobTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(event.target.value);
  }

  const handleJobTitleCreate = async () => {
    await createJobTitle(jobTitle);
  }

  return (
    <div>
      <h1>Create Job Title</h1>

      <label htmlFor="jobTitle">Job Title</label>
      <input id="jobTitle" type="text" value={jobTitle} onChange={handleJobTitleChange} placeholder="Manager"></input>

      <button onClick={handleJobTitleCreate}>Create</button>
    </div>
  )
}

export default CreateJobTitle;
