import type { Competency } from "@/models/competency.model";

const createCompetency = async (name: string): Promise<Competency> => {
  const createCompetencyResponse = await fetch("http://localhost:3000/competencies", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  return await createCompetencyResponse.json();
};

export default createCompetency;
