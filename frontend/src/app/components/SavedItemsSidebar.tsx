import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Briefcase, GraduationCap, Trash2, FolderGit2 } from "lucide-react";
import type { Experience } from "./ExperienceSection";
import type { Education } from "./EducationSection";
import type { PetProject } from "./PetProjectsSection";

interface SavedItemsSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectExperience: (exp: Experience) => void;
  onSelectEducation: (edu: Education) => void;
  onSelectPetProject: (project: PetProject) => void;
}

export function SavedItemsSidebar({
  open,
  onOpenChange,
  onSelectExperience,
  onSelectEducation,
  onSelectPetProject,
}: SavedItemsSidebarProps) {
  const [savedExperiences, setSavedExperiences] = useState<Experience[]>([]);
  const [savedEducations, setSavedEducations] = useState<Education[]>([]);
  const [savedPetProjects, setSavedPetProjects] = useState<PetProject[]>([]);

  useEffect(() => {
    loadSavedData();
  }, [open]);

  const loadSavedData = () => {
    const exps = localStorage.getItem("savedExperiences");
    const edus = localStorage.getItem("savedEducations");
    const projects = localStorage.getItem("savedPetProjects");

    if (exps) setSavedExperiences(JSON.parse(exps));
    if (edus) setSavedEducations(JSON.parse(edus));
    if (projects) setSavedPetProjects(JSON.parse(projects));
  };

  const handleDeleteExperience = (id: string) => {
    const updated = savedExperiences.filter((exp) => exp.id !== id);
    setSavedExperiences(updated);
    localStorage.setItem("savedExperiences", JSON.stringify(updated));
  };

  const handleDeleteEducation = (id: string) => {
    const updated = savedEducations.filter((edu) => edu.id !== id);
    setSavedEducations(updated);
    localStorage.setItem("savedEducations", JSON.stringify(updated));
  };

  const handleDeletePetProject = (id: string) => {
    const updated = savedPetProjects.filter((project) => project.id !== id);
    setSavedPetProjects(updated);
    localStorage.setItem("savedPetProjects", JSON.stringify(updated));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80 sm:w-96">
        <SheetHeader>
          <SheetTitle>Saved Items</SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-100px)] mt-6">
          <div className="space-y-6">
            {/* Saved Experiences */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="size-5 text-blue-600" />
                <h3 className="font-semibold">Work Experience</h3>
              </div>
              {savedExperiences.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No saved experiences</p>
              ) : (
                <div className="space-y-2">
                  {savedExperiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer group"
                      onClick={() => {
                        onSelectExperience(exp);
                        onOpenChange(false);
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{exp.position}</p>
                          <p className="text-xs text-gray-600">{exp.company}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteExperience(exp.id);
                          }}
                        >
                          <Trash2 className="size-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            {/* Saved Education */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="size-5 text-green-600" />
                <h3 className="font-semibold">Education</h3>
              </div>
              {savedEducations.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No saved education</p>
              ) : (
                <div className="space-y-2">
                  {savedEducations.map((edu) => (
                    <div
                      key={edu.id}
                      className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer group"
                      onClick={() => {
                        onSelectEducation(edu);
                        onOpenChange(false);
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{edu.degree}</p>
                          <p className="text-xs text-gray-600">{edu.institution}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEducation(edu.id);
                          }}
                        >
                          <Trash2 className="size-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            {/* Saved Pet Projects */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FolderGit2 className="size-5 text-purple-600" />
                <h3 className="font-semibold">Pet Projects</h3>
              </div>
              {savedPetProjects.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No saved pet projects</p>
              ) : (
                <div className="space-y-2">
                  {savedPetProjects.map((project) => (
                    <div
                      key={project.id}
                      className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer group"
                      onClick={() => {
                        onSelectPetProject(project);
                        onOpenChange(false);
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{project.name}</p>
                          <p className="text-xs text-gray-600">{project.technologies}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePetProject(project.id);
                          }}
                        >
                          <Trash2 className="size-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
