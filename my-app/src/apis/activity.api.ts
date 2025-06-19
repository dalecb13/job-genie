import type { CreateActivityDto } from "@/models/activity.model";

const addActivity = async (dto: CreateActivityDto) => {
  const createResponse = await fetch('http://localhost:3000/application-activity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...dto }),
  });
  const data = await createResponse.json();
  return data;
};

export { addActivity };
