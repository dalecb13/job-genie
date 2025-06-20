import { extensions } from "@/lib/editor.utils";
import type { JobDescription } from "@/models/job-description.model";
import { EditorContent, useEditor } from "@tiptap/react";
import { Button } from "./ui/button";
import { extractTechnologies } from "@/apis/keywords.api";
import { useMutation } from "@tanstack/react-query";

type Props = {
  jobDescription: JobDescription
}

const ExtractKeywords: React.FC<Props> = ({ jobDescription }) => {
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    content: jobDescription?.rawText,
    extensions,
  });
  const handleExtractTechnologiesMutation = useMutation({
    mutationFn: (description: string) => {
      return extractTechnologies(description)
    },
  })
  const handleExtractCompetenciesMutation = useMutation({
    mutationFn: (description: string) => {
      return extractTechnologies(description)
    },
  })

  return (
    <div className="flex flex-col gap-2">
      <h1>Job Description Extract</h1>

      <div className="flex flex-row gap-4">
        <div className="border border-gray-300 p-2 rounded w-1/2 h-1/2 overflow-scroll">
          <EditorContent editor={editor} />
        </div>

        <div className="flex flex-col border border-gray-300 p-2 rounded w-1/2 h-1/2 overflow-scroll">
          <Button
            variant="outline"
            onClick={() => handleExtractTechnologiesMutation.mutate(jobDescription.rawText)}
            disabled={handleExtractTechnologiesMutation.status === 'pending'}
          >
            Extract Technologies
          </Button>

          <Button
            variant="outline"
            onClick={() => handleExtractCompetenciesMutation.mutate(jobDescription.rawText)}
            disabled={handleExtractCompetenciesMutation.status === 'pending'}
          >
            Extract Competencies
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExtractKeywords;
