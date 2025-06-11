import type { Technology } from "@/models/technology.model";

const createTechnology = async (name: string): Promise<Technology> => {
  const createTechnologyResponse = await fetch('http://localhost:3000/technologies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  return await createTechnologyResponse.json();
}

export { createTechnology };
