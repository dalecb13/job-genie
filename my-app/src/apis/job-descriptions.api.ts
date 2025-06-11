import { toast } from "sonner";
import type { CreateJobDescriptionDto, JobDescription } from "../models/job-description.model";

const getJobDescriptions = async (): Promise<JobDescription[]> => {
  const response = await fetch('http://localhost:3000/job-descriptions');
  const jobDescriptions = await response.json();
  return jobDescriptions;
}
//   const { data: jds } = await supabase
//     .from(JOB_DESCRIPTIONS_TABLE)
//     .select(`
//       id,
//       created_at,
//       updated_at,
//       link,
//       raw_text,
//       company_id,
//       companies!company_id (
//         id,
//         created_at,
//         updated_at,
//         company_name,
//         link
//       ),
//       job_title_id,
//       job_titles!job_title_id (
//         id,
//         created_at,
//         updated_at,
//         job_title
//       ),
//       work_type
//     `);

//   if (!jds || jds.length === 0) {
//     return [];
//   }

//   const jobDescriptions: JobDescription[] = jds?.map((jd) => {
//       if (!Array.isArray(jd.companies) && !Array.isArray(jd.job_titles)) {
//         const c = jd.companies as CompanyModel;
//         const company = {
//           id: c.id,
//           createdAt: c.created_at,
//           updatedAt: c.updated_at,
//           companyName: c.company_name,
//           website: c.link,
//         };
//         const jt = jd.job_titles as JobTitleModel;
//         const jobTitle = {
//           id: jt.id,
//           createdAt: jt.created_at,
//           updatedAt: jt.updated_at,
//           jobTitle: jt.job_title,
//         };
    
//         return {
//           id: jd.id,
//           createdAt: jd.created_at,
//           updatedAt: jd.updated_at,
//           link: jd.link,
//           rawText: jd.raw_text,
//           companyId: jd.company_id,
//           company,
//           jobTitleId: jd.job_title_id,
//           jobTitle,
//           workType: jd.work_type
//         };
//       }
//     })
//     .filter((jd: undefined | JobDescription) => jd !== undefined) as JobDescription[];

//   return jobDescriptions;
// }

const createJobDescription = async (createJobDescriptionDto: CreateJobDescriptionDto) => {
  const createResponse = await fetch('http://localhost:3000/job-descriptions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createJobDescriptionDto),
  });

  const data = await createResponse.json();

  // const { data, error } = await supabase
  //   .from(JOB_DESCRIPTIONS_TABLE)
  //   .insert({
  //     link: createJobDescriptionDto.link,
  //     raw_text: createJobDescriptionDto.rawText,
  //     company_id: createJobDescriptionDto.companyId,
  //     job_title_id: createJobDescriptionDto.jobTitleId,
  //     work_type: createJobDescriptionDto.workType,
  //   });

  // if (error) {
  //   throw new Error(error.message);
  // }

  return data;
}

const getJobDescriptionById = async (id: string | undefined): Promise<JobDescription> => {
  const response = await fetch(`http://localhost:3000/job-descriptions/${id}`);
  const jobDescription = await response.json();
  return jobDescription;
}

const updateJobDescription = async (id: string, rawText: string) => {
  const updateResponse = await fetch(`http://localhost:3000/job-descriptions/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      rawText
    }),
  });
  const data = await updateResponse.json();
  toast('Updated job description')
  return data;
}

export { createJobDescription, getJobDescriptions, getJobDescriptionById, updateJobDescription };
