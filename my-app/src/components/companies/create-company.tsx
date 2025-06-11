import { useState } from "react";
import { createCompany } from "../../apis/companies.api";

const CreateCompany = () => {
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');

  const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(event.target.value);
  }

  const handleWebsiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWebsite(event.target.value);
  }

  const handleCompanyCreate = async () => {
    await createCompany(companyName, website);
  }
  
  return (
    <div>
      <h1>Create Company</h1>

      <label htmlFor="companyName">Company</label>
      <input id="companyName" type="text" value={companyName} onChange={handleCompanyNameChange} placeholder="ABC Company"></input>

      <label htmlFor="website">Website</label>
      <input id="website" type="text" value={website} onChange={handleWebsiteChange} placeholder="www.example.com"></input>

      <button onClick={handleCompanyCreate}>Create</button>
    </div>
  );
};

export default CreateCompany;
