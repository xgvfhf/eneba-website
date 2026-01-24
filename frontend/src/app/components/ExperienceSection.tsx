import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Trash2, Save } from "lucide-react";

export interface Experience {
  id: string;
  name: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceSectionProps {
  onExperienceChange: (experiences: Experience[]) => void;
}

export function ExperienceSection({ onExperienceChange }: ExperienceSectionProps) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [savedExperiences, setSavedExperiences] = useState<Experience[]>([]);
  const [currentExperience, setCurrentExperience] = useState<Partial<Experience>>({});

  useEffect(() => {
    // Загрузка сохраненных опытов из localStorage
    const saved = localStorage.getItem("savedExperiences");
    if (saved) {
      setSavedExperiences(JSON.parse(saved));
    }
  }, []);

  const handleAddExperience = () => {
    if (currentExperience.company && currentExperience.position) {
      const newExperience: Experience = {
        id: Date.now().toString(),
        name: `${currentExperience.position} в ${currentExperience.company}`,
        company: currentExperience.company,
        position: currentExperience.position,
        startDate: currentExperience.startDate || "",
        endDate: currentExperience.endDate || "",
        description: currentExperience.description || "",
      };
      const updated = [...experiences, newExperience];
      setExperiences(updated);
      onExperienceChange(updated);
      setCurrentExperience({});
    }
  };

  const handleSaveExperience = () => {
    if (currentExperience.company && currentExperience.position) {
      const newExperience: Experience = {
        id: Date.now().toString(),
        name: `${currentExperience.position} в ${currentExperience.company}`,
        company: currentExperience.company,
        position: currentExperience.position,
        startDate: currentExperience.startDate || "",
        endDate: currentExperience.endDate || "",
        description: currentExperience.description || "",
      };
      const updated = [...savedExperiences, newExperience];
      setSavedExperiences(updated);
      localStorage.setItem("savedExperiences", JSON.stringify(updated));
      
      // Также добавляем в текущий список
      const updatedExperiences = [...experiences, newExperience];
      setExperiences(updatedExperiences);
      onExperienceChange(updatedExperiences);
      setCurrentExperience({});
    }
  };

  const handleLoadExperience = (id: string) => {
    const saved = savedExperiences.find((exp) => exp.id === id);
    if (saved) {
      const updated = [...experiences, saved];
      setExperiences(updated);
      onExperienceChange(updated);
    }
  };

  const handleRemoveExperience = (id: string) => {
    const updated = experiences.filter((exp) => exp.id !== id);
    setExperiences(updated);
    onExperienceChange(updated);
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedExperiences.filter((exp) => exp.id !== id);
    setSavedExperiences(updated);
    localStorage.setItem("savedExperiences", JSON.stringify(updated));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Текущие добавленные опыты */}
        {experiences.map((exp) => (
          <div key={exp.id} className="p-4 border rounded-lg space-y-2 bg-gray-50">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold">{exp.position}</h4>
                <p className="text-sm text-gray-600">{exp.company}</p>
                <p className="text-sm text-gray-500">
                  {exp.startDate} - {exp.endDate || "Present"}
                </p>
                <p className="text-sm mt-2">{exp.description}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveExperience(exp.id)}
              >
                <Trash2 className="size-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}

        {/* Форма добавления нового опыта */}
        <div className="space-y-4 p-4 border-2 border-dashed rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Position</Label>
              <Input
                placeholder="Frontend Developer"
                value={currentExperience.position || ""}
                onChange={(e) =>
                  setCurrentExperience({ ...currentExperience, position: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <Input
                placeholder="Google"
                value={currentExperience.company || ""}
                onChange={(e) =>
                  setCurrentExperience({ ...currentExperience, company: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="month"
                value={currentExperience.startDate || ""}
                onChange={(e) =>
                  setCurrentExperience({ ...currentExperience, startDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="month"
                value={currentExperience.endDate || ""}
                onChange={(e) =>
                  setCurrentExperience({ ...currentExperience, endDate: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Describe your responsibilities and achievements..."
              value={currentExperience.description || ""}
              onChange={(e) =>
                setCurrentExperience({ ...currentExperience, description: e.target.value })
              }
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddExperience} className="flex-1">
              <Plus className="size-4 mr-2" />
              Add
            </Button>
            <Button onClick={handleSaveExperience} variant="outline" className="flex-1">
              <Save className="size-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}