
const getAllKeywords = async () => {
  const response = await fetch('http://localhost:3000/keywords');
  const data = await response.json();
  return data;
};

const getKeywordById = async (id: string) => {
  const response = await fetch(`http://localhost:3000/keywords/${id}`);
  const data = await response.json();
  return data;
};

const createKeywords = async (
  technologies: string[],
  competencies: string[],
  applicationId: string,
) => {
  const response = await fetch('http://localhost:3000/keywords', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ technologies, competencies, applicationId }),
  });
  const data = await response.json();
  return data;
};

const updateKeywords = async (
  technologies: string[],
  competencies: string[],
  id: string,
) => {
  const response = await fetch(`http://localhost:3000/keywords/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ technologies, competencies }),
  });
  const data = await response.json();
  return data;
};

export {
  getAllKeywords,
  getKeywordById,
  createKeywords,
  updateKeywords,
};