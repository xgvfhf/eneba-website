import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Trash2, Save } from "lucide-react";

export interface Education {
  id: string;
  name: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EducationSectionProps {
  onEducationChange: (education: Education[]) => void;
}

export function EducationSection({ onEducationChange }: EducationSectionProps) {
  const [educations, setEducations] = useState<Education[]>([]);
  const [savedEducations, setSavedEducations] = useState<Education[]>([]);
  const [currentEducation, setCurrentEducation] = useState<Partial<Education>>({});

  useEffect(() => {
    const saved = localStorage.getItem("savedEducations");
    if (saved) {
      setSavedEducations(JSON.parse(saved));
    }
  }, []);

  const handleAddEducation = () => {
    if (currentEducation.institution && currentEducation.degree) {
      const newEducation: Education = {
        id: Date.now().toString(),
        name: `${currentEducation.degree} - ${currentEducation.institution}`,
        institution: currentEducation.institution,
        degree: currentEducation.degree,
        field: currentEducation.field || "",
        startDate: currentEducation.startDate || "",
        endDate: currentEducation.endDate || "",
        description: currentEducation.description || "",
      };
      const updated = [...educations, newEducation];
      setEducations(updated);
      onEducationChange(updated);
      setCurrentEducation({});
    }
  };

  const handleSaveEducation = () => {
    if (currentEducation.institution && currentEducation.degree) {
      const newEducation: Education = {
        id: Date.now().toString(),
        name: `${currentEducation.degree} - ${currentEducation.institution}`,
        institution: currentEducation.institution,
        degree: currentEducation.degree,
        field: currentEducation.field || "",
        startDate: currentEducation.startDate || "",
        endDate: currentEducation.endDate || "",
        description: currentEducation.description || "",
      };
      const updated = [...savedEducations, newEducation];
      setSavedEducations(updated);
      localStorage.setItem("savedEducations", JSON.stringify(updated));
      
      const updatedEducations = [...educations, newEducation];
      setEducations(updatedEducations);
      onEducationChange(updatedEducations);
      setCurrentEducation({});
    }
  };

  const handleLoadEducation = (id: string) => {
    const saved = savedEducations.find((edu) => edu.id === id);
    if (saved) {
      const updated = [...educations, saved];
      setEducations(updated);
      onEducationChange(updated);
    }
  };

  const handleRemoveEducation = (id: string) => {
    const updated = educations.filter((edu) => edu.id !== id);
    setEducations(updated);
    onEducationChange(updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Education (optional)</span>
          {savedEducations.length > 0 && (
            <Select onValueChange={handleLoadEducation}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select saved..." />
              </SelectTrigger>
              <SelectContent>
                {savedEducations.map((edu) => (
                  <SelectItem key={edu.id} value={edu.id}>
                    {edu.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {educations.map((edu) => (
          <div key={edu.id} className="p-4 border rounded-lg space-y-2 bg-gray-50">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold">{edu.degree}</h4>
                <p className="text-sm text-gray-600">{edu.institution}</p>
                {edu.field && <p className="text-sm text-gray-600">{edu.field}</p>}
                <p className="text-sm text-gray-500">
                  {edu.startDate} - {edu.endDate}
                </p>
                {edu.description && <p className="text-sm mt-2">{edu.description}</p>}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveEducation(edu.id)}
              >
                <Trash2 className="size-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}

        <div className="space-y-4 p-4 border-2 border-dashed rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Degree</Label>
              <Input
                placeholder="Bachelor's"
                value={currentEducation.degree || ""}
                onChange={(e) =>
                  setCurrentEducation({ ...currentEducation, degree: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Institution</Label>
              <Input
                placeholder="MIT"
                value={currentEducation.institution || ""}
                onChange={(e) =>
                  setCurrentEducation({ ...currentEducation, institution: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Field of Study</Label>
            <Input
              placeholder="Computer Science"
              value={currentEducation.field || ""}
              onChange={(e) =>
                setCurrentEducation({ ...currentEducation, field: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="month"
                value={currentEducation.startDate || ""}
                onChange={(e) =>
                  setCurrentEducation({ ...currentEducation, startDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="month"
                value={currentEducation.endDate || ""}
                onChange={(e) =>
                  setCurrentEducation({ ...currentEducation, endDate: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Additional information..."
              value={currentEducation.description || ""}
              onChange={(e) =>
                setCurrentEducation({ ...currentEducation, description: e.target.value })
              }
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddEducation} className="flex-1">
              <Plus className="size-4 mr-2" />
              Add
            </Button>
            <Button onClick={handleSaveEducation} variant="outline" className="flex-1">
              <Save className="size-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}