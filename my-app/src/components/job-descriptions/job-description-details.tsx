import type { JobDescription } from "@/models/job-description.model";
import { EditorProvider } from "@tiptap/react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { updateJobDescription } from "@/apis/job-descriptions.api";
import React from "react";
import { useNavigate } from "react-router";
import { extensions } from "@/lib/editor.utils";

const JobDescriptionDetails = ({ jobDescription }: { jobDescription: JobDescription }) => {
  const [ rawText, setRawText ] = React.useState(jobDescription.rawText)
  const updateJobDescriptionMutation = useMutation({
    mutationFn: (updateJobDescriptionDto: { id: string }) => {
      return updateJobDescription(updateJobDescriptionDto.id, rawText)
    },
  });
  const navigate = useNavigate();

  const handleStartApplication = () => {
    navigate('/job-descriptions/' + jobDescription!.id + '/extract');
  }

  return (
    <>
      <p className="text-2xl">{jobDescription!.jobTitle.title} - {jobDescription!.company.companyName}</p>
      <p>{jobDescription!.workType} in {jobDescription!.location}</p>
      <div className="border border-gray-300 p-2 rounded max-h-1/2 overflow-scroll">
        <EditorProvider
          extensions={extensions}
          content={jobDescription!.rawText}
          onUpdate={(editor) => setRawText(editor.editor.getHTML())}
        ></EditorProvider>
      </div>
      <div className="flex flex-row gap-2 mt-2">
        <Button
          variant='outline'
          onClick={() => {
            updateJobDescriptionMutation.mutate({
              id: jobDescription!.id,
            })
          }}
          disabled={updateJobDescriptionMutation.status === 'pending' || updateJobDescriptionMutation.status === 'error'}
        >
          {
            updateJobDescriptionMutation.status === 'pending'
            ? 'Saving...'
            : updateJobDescriptionMutation.status === 'error'
            ? 'Error'
            : 'Save'
          }
        </Button>
        <Button
          variant={'outline'}
          onClick={handleStartApplication}
        >
          Extract Keywords
        </Button>
      </div>
    </>
  )
}

export default JobDescriptionDetails;
