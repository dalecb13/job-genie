import type { Resume } from "@/models/resume.model"

type Props = {
  resume: Resume
}

const Resume: React.FC<Props> = ({ resume }) => {
  const { jobTitle, summary, workExperiences } = resume;
  return (
    <div>
      <h1>Resume</h1>

      <p>Job title: {jobTitle.title}</p>
      <p>Summary: {summary}</p>

      <div>
        {
          workExperiences.map(we => {
            return (
              <div key={we.id}>
                <p>Start Date: {we.startDate}</p>
                <p>End Date: {we.endDate}</p>
                <p>Company Name: {we.companyName}</p>
                <p>Job Title: {we.jobTitle}</p>
                <p>Location: {we.location}</p>
                <p>Description: {we.description}</p>

                <ul>
                  {
                    we.achievements.map(a => {
                      return (
                        <li key={a.id}>{a.description}</li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Resume;
