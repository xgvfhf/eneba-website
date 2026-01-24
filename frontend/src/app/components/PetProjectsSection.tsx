import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Trash2, Save } from "lucide-react";

export interface PetProject {
  id: string;
  name: string;
  technologies: string;
  description: string;
  url: string;
  github: string;
}

interface PetProjectsSectionProps {
  onPetProjectsChange: (projects: PetProject[]) => void;
}

export function PetProjectsSection({ onPetProjectsChange }: PetProjectsSectionProps) {
  const [projects, setProjects] = useState<PetProject[]>([]);
  const [savedProjects, setSavedProjects] = useState<PetProject[]>([]);
  const [currentProject, setCurrentProject] = useState<Partial<PetProject>>({});

  useEffect(() => {
    const saved = localStorage.getItem("savedPetProjects");
    if (saved) {
      setSavedProjects(JSON.parse(saved));
    }
  }, []);

  const handleAddProject = () => {
    if (currentProject.name && currentProject.technologies) {
      const newProject: PetProject = {
        id: Date.now().toString(),
        name: currentProject.name,
        technologies: currentProject.technologies,
        description: currentProject.description || "",
        url: currentProject.url || "",
        github: currentProject.github || "",
      };
      const updated = [...projects, newProject];
      setProjects(updated);
      onPetProjectsChange(updated);
      setCurrentProject({});
    }
  };

  const handleSaveProject = () => {
    if (currentProject.name && currentProject.technologies) {
      const newProject: PetProject = {
        id: Date.now().toString(),
        name: currentProject.name,
        technologies: currentProject.technologies,
        description: currentProject.description || "",
        url: currentProject.url || "",
        github: currentProject.github || "",
      };
      const updated = [...savedProjects, newProject];
      setSavedProjects(updated);
      localStorage.setItem("savedPetProjects", JSON.stringify(updated));
      
      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      onPetProjectsChange(updatedProjects);
      setCurrentProject({});
    }
  };

  const handleLoadProject = (id: string) => {
    const saved = savedProjects.find((proj) => proj.id === id);
    if (saved) {
      const updated = [...projects, saved];
      setProjects(updated);
      onPetProjectsChange(updated);
    }
  };

  const handleRemoveProject = (id: string) => {
    const updated = projects.filter((proj) => proj.id !== id);
    setProjects(updated);
    onPetProjectsChange(updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Pet Projects (optional)</span>
          {savedProjects.length > 0 && (
            <Select onValueChange={handleLoadProject}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select saved..." />
              </SelectTrigger>
              <SelectContent>
                {savedProjects.map((proj) => (
                  <SelectItem key={proj.id} value={proj.id}>
                    {proj.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((proj) => (
          <div key={proj.id} className="p-4 border rounded-lg space-y-2 bg-gray-50">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold">{proj.name}</h4>
                <p className="text-sm text-gray-600">{proj.technologies}</p>
                <p className="text-sm mt-2">{proj.description}</p>
                {proj.url && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View Project
                  </a>
                )}
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline ml-4"
                  >
                    GitHub
                  </a>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveProject(proj.id)}
              >
                <Trash2 className="size-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}

        <div className="space-y-4 p-4 border-2 border-dashed rounded-lg">
          <div className="space-y-2">
            <Label>Project Name</Label>
            <Input
              placeholder="E-commerce Platform"
              value={currentProject.name || ""}
              onChange={(e) =>
                setCurrentProject({ ...currentProject, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Technologies Used</Label>
            <Input
              placeholder="React, Node.js, MongoDB"
              value={currentProject.technologies || ""}
              onChange={(e) =>
                setCurrentProject({ ...currentProject, technologies: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Brief description of your project..."
              value={currentProject.description || ""}
              onChange={(e) =>
                setCurrentProject({ ...currentProject, description: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project URL</Label>
              <Input
                type="url"
                placeholder="https://project.com"
                value={currentProject.url || ""}
                onChange={(e) =>
                  setCurrentProject({ ...currentProject, url: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>GitHub URL</Label>
              <Input
                type="url"
                placeholder="https://github.com/..."
                value={currentProject.github || ""}
                onChange={(e) =>
                  setCurrentProject({ ...currentProject, github: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddProject} className="flex-1">
              <Plus className="size-4 mr-2" />
              Add
            </Button>
            <Button onClick={handleSaveProject} variant="outline" className="flex-1">
              <Save className="size-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
