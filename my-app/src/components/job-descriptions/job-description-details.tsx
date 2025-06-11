import type { JobDescription } from "@/models/job-description.model";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { updateJobDescription } from "@/apis/job-descriptions.api";
import React from "react";

const extensions = [
  // Color.configure({ types: [TextStyle.name, ListItem.name] }),
  // TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]

const JobDescriptionDetails = ({ jobDescription }: { jobDescription: JobDescription }) => {
  const [ rawText, setRawText ] = React.useState(jobDescription.rawText)
  const updateJobDescriptionMutation = useMutation({
    mutationFn: (updateJobDescriptionDto: { id: string }) => {
      return updateJobDescription(updateJobDescriptionDto.id, rawText)
    },
  })

  return (
    <>
      <p className="text-2xl">{jobDescription!.jobTitle.title} - {jobDescription!.company.companyName}</p>
      <p>{jobDescription!.workType}</p>
      <div className="border border-gray-300 p-2 rounded max-h-1/2 overflow-scroll">
        <EditorProvider
          extensions={extensions}
          content={jobDescription!.rawText}
          onUpdate={(editor) => setRawText(editor.editor.getHTML())}
        ></EditorProvider>
      </div>
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
    </>
  )
}

export default JobDescriptionDetails;
