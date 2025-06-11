import type { JobTitle } from "./job-title.model"
import type { WorkExperience } from "./work-experience.model"

export type Resume = {
  id: string
  createdAt: Date
  updatedAt: Date

  jobTitle: JobTitle
  summary: string

  workExperiences: WorkExperience[]
}
