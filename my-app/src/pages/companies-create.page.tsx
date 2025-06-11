import { useState } from "react";
import { createCompany } from "../apis/companies.api";
import { useNavigate } from "react-router";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateCompanyPage = () => {
  const navigate = useNavigate();
  const [ companyName, setCompanyName ] = useState('');
  const [ link, setLink ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(event.target.value);
  }

  const handleWebsiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  }

  const handleCompanyCreate = async () => {
    setIsLoading(true);
    try {
      await createCompany({companyName, link});
      navigate('/companies');
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          type="text"
          value={companyName}
          onChange={handleCompanyNameChange}
          placeholder="ABC Company"
        ></Input>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          type="text"
          value={link}
          onChange={handleWebsiteChange}
          placeholder="www.example.com"
        ></Input>
      </div>

      <Button
        variant="outline"
        onClick={() => handleCompanyCreate()}
        disabled={isLoading}
      >
        {
          isLoading ? (
            "Loading..."
          ) : (
            "Create"
          )
        }
      </Button>
    </div>
  )
}

export default CreateCompanyPage;
