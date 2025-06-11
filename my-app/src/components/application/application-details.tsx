import type { Application } from "@/models/application.model";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { XIcon } from "lucide-react"
import type { Technology } from "@/models/technology.model";
import type { Competency } from "@/models/competency.model";
import { createTechnology } from "@/apis/technology.api";
import createCompetency from "@/apis/competency.api";
import { updateApplication } from "@/apis/applications.api";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Props = {
  application: Application
}

const ApplicationDetails: React.FC<Props> = ({ application }) => {
  const createTechnologyMutation = useMutation({
    mutationFn: createTechnology,
  });
  const createCompetencyMutation = useMutation({
    mutationFn: createCompetency,
  })
  const updateApplicationMutation = useMutation({
    mutationFn: (updateApplicationDto: { id: string, technologies: Technology[], competencies: Competency[] }) => {
      return updateApplication(updateApplicationDto.id, updateApplicationDto.technologies, updateApplicationDto.competencies)
    }
  })
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: application.jobDescription.rawText,
  })
  const [ technologyName, setTechnologyName ] = useState<string>('');
  const [ competencyName, setCompetencyName ] = useState<string>('');
  const [ technologies, setTechnologies ] = useState<Technology[]>(application.technologies);
  const [ competencies, setCompetencies ] = useState<Competency[]>(application.competencies);

  const handleAddTechnology = () => {
    createTechnologyMutation.mutate(technologyName, {
      onSuccess: (createdTechnology) => {
        const hasTechnology = technologies.find((t) => t.name === createdTechnology.name);
        if (!hasTechnology) {
          setTechnologies([...technologies, createdTechnology]);
          setTechnologyName('');
        }
      }
    })
  }

  const handleRemoveTechnology = (technology: Technology) => {
    const newTechnologies = technologies.filter((t) => t.id !== technology.id);
    setTechnologies(newTechnologies);
  }

  const handleAddTechnologyKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (technologyName) {
        handleAddTechnology();
      }
    }
  }

  const handleAddCompetency = () => {
    createCompetencyMutation.mutate(competencyName, {
      onSuccess: (createdCompetency) => {
        const hasCompetency = competencies.find((c) => c.name === createdCompetency.name);
        if (!hasCompetency) {
          setCompetencies([...competencies, createdCompetency]);
          setCompetencyName('');
        }
      }
    })
  }

  const handleRemoveCompetency = (competency: Competency) => {
    const newCompetencies = competencies.filter((c) => c.id !== competency.id);
    setCompetencies(newCompetencies);
  }

  const handleAddCompetencyKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (competencyName) {
        handleAddCompetency();
      }
    }
  }

  const handleBubbleTechnology = (name: string) => {
    createTechnologyMutation.mutate(name, {
      onSuccess: (createdTechnology) => {
        const hasTechnology = technologies.find((t) => t.name === createdTechnology.name);
        if (!hasTechnology) {
          setTechnologies([...technologies, createdTechnology]);
        }
      }
    })
  }

  const handleBubbleCompetency = (name: string) => {
    createCompetencyMutation.mutate(name, {
      onSuccess: (createdCompetency) => {
        const hasCompetency = competencies.find((c) => c.name === createdCompetency.name);
        if (!hasCompetency) {
          setCompetencies([...competencies, createdCompetency]);
        }
      }
    })
  }

  const handleUpdateApplication = () => {
    updateApplicationMutation.mutate({
      id: application.id,
      technologies,
      competencies
    });
    toast.success('Application updated');
  }

  if (!application) {
    toast.error('Application not found')
    return <p>
      Application not found
    </p>
  }

  return (
    <div>
      <p>{application!.jobDescription.jobTitle.title} @ {application!.jobDescription.company.companyName}</p>

      <div className="flex flex-row gap-4">
        <div className="border border-gray-300 p-2 rounded max-h-500 w-1/2 overflow-scroll">
          <>
            {
              editor &&
                <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
                  <button
                    onClick={() => handleBubbleTechnology(editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to))}
                  >
                    Add Technology
                  </button>
                  <button
                    onClick={() => handleBubbleCompetency(editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to))}
                  >
                    Add Competency
                  </button>
                </BubbleMenu>
            }
            <EditorContent editor={editor} />
          </>
        </div>

        <div className="border border-gray-300 p-2 rounded max-h-500 w-1/2 overflow-scroll flex flex-col gap-4">
          <div>
            <p>Technologies</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {technologies.map((technology) => (
                <div
                  key={technology.id}
                  className="flex flex-none flex-row grow-0 justify-center items-center gap-2 w-auto bg-slate-200 py-1 px-3 rounded-2xl"
                >
                  <span>{technology.name}</span>
                  <XIcon
                    className="flex-none size-4 cursor-pointer"
                    onClick={() => handleRemoveTechnology(technology)}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-row gap-2">
              <Input
                type="text"
                placeholder="Enter a technology"
                onChange={(e) => setTechnologyName(e.target.value)}
                onKeyUp={handleAddTechnologyKeyPress}
                value={technologyName}
              />
              <Button
                variant="outline"
                onClick={handleAddTechnology}
              >
                Add
              </Button>
            </div>
          </div>

          <div>
            <p>Competencies</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {competencies.map((competency) => (
                <li
                  className="flex flex-none flex-row grow-0 justify-center items-center gap-2 w-auto bg-slate-200 py-1 px-3 rounded-2xl"
                  key={competency.id}
                >
                  <span>{competency.name}</span>
                  <XIcon className="flex-none size-4 cursor-pointer" onClick={() => handleRemoveCompetency(competency)} />
                </li>
              ))}
            </div>

            <div className="flex flex-row gap-2">
              <Input
                type="text"
                placeholder="Enter a competency"
                onChange={(e) => setCompetencyName(e.target.value)}
                onKeyUp={handleAddCompetencyKeyPress}
                value={competencyName}
              />
              <Button
                variant="outline"
                onClick={handleAddCompetency}
              >
                Add
              </Button>
            </div>
          </div>

          <Button
            variant="secondary"
            onClick={handleUpdateApplication}
            disabled={updateApplicationMutation.status === 'pending'}
          >
            {
              updateApplicationMutation.status === 'pending'
              ? 'Saving...'
              : 'Save'
            }
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ApplicationDetails;
