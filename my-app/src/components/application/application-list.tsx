import { useEffect, useState } from "react";
import { type Application } from "../../models/application.model";
import { getAllApplications } from "../../apis/applications.api";

const ApplicationsList = () => {
  const [ applications, setApplications ] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const as = await getAllApplications();
      setApplications(as);
    }
    fetchApplications();
  }, []);

  return (
    <div>
      <h1>Applications</h1>

      {
        !applications || applications.length === 0
        ? <p>No applications found</p>
        : (
          <div>
            {applications.map((application) => (
              <div key={application.id} className="flex flex-row gap-2">
                <p>{application.id}</p>
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}

export default ApplicationsList;
