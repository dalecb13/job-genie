
type Props = {
  id: string
  created_at: string
  updated_at: string
  link: string
  raw_text: string
  company_id: string
  job_title_id: string
  work_type: string
}

const JobDescriptionListItem: React.FC<Props> = ({ company_name }) => {
  return (
    <div>{company_Name}</div>
  )
}

export default JobDescriptionListItem;
