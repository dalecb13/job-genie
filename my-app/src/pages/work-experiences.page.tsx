import { getAllWorkExperiences } from "@/apis/work-experience.api";
import { useQuery } from "@tanstack/react-query";

const WorkExperiencesPage = () => {
  const { data: workExperiences, isLoading, isError, error } = useQuery({ queryKey: ['workExperiences'], queryFn: getAllWorkExperiences })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error: {error.message}</p>

  if (!workExperiences || workExperiences.length < 1) {
    return <p>No work experiences found</p>;
  }
  
  return (
    <>
      <h1 className="text-center text-4xl font-bold">Work Experiences</h1>

      <div className="flex flex-col gap-8">
        {workExperiences.map((workExperience) => (
          <div key={workExperience.id} className="flex flex-col gap-2">
            <p>{workExperience.jobTitle.title} - {workExperience.company.companyName}</p>
            <p>{workExperience.startDate.toISOString()} - {workExperience.endDate.toISOString()}</p>
            <p>{workExperience.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default WorkExperiencesPage;
