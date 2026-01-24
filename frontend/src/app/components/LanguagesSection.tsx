import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Trash2, Save } from "lucide-react";

export interface Language {
  id: string;
  name: string;
  language: string;
  level: string;
}

interface LanguagesSectionProps {
  onLanguagesChange: (languages: Language[]) => void;
}

export function LanguagesSection({ onLanguagesChange }: LanguagesSectionProps) {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [savedLanguages, setSavedLanguages] = useState<Language[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<Partial<Language>>({});

  const levels = ["A1", "A2", "B1", "B2", "C1", "C2", "Native"];

  useEffect(() => {
    const saved = localStorage.getItem("savedLanguages");
    if (saved) {
      setSavedLanguages(JSON.parse(saved));
    }
  }, []);

  const handleAddLanguage = () => {
    if (currentLanguage.language && currentLanguage.level) {
      const newLanguage: Language = {
        id: Date.now().toString(),
        name: `${currentLanguage.language} - ${currentLanguage.level}`,
        language: currentLanguage.language,
        level: currentLanguage.level,
      };
      const updated = [...languages, newLanguage];
      setLanguages(updated);
      onLanguagesChange(updated);
      setCurrentLanguage({});
    }
  };

  const handleSaveLanguage = () => {
    if (currentLanguage.language && currentLanguage.level) {
      const newLanguage: Language = {
        id: Date.now().toString(),
        name: `${currentLanguage.language} - ${currentLanguage.level}`,
        language: currentLanguage.language,
        level: currentLanguage.level,
      };
      const updated = [...savedLanguages, newLanguage];
      setSavedLanguages(updated);
      localStorage.setItem("savedLanguages", JSON.stringify(updated));
      
      const updatedLanguages = [...languages, newLanguage];
      setLanguages(updatedLanguages);
      onLanguagesChange(updatedLanguages);
      setCurrentLanguage({});
    }
  };

  const handleLoadLanguage = (id: string) => {
    const saved = savedLanguages.find((lang) => lang.id === id);
    if (saved) {
      const updated = [...languages, saved];
      setLanguages(updated);
      onLanguagesChange(updated);
    }
  };

  const handleRemoveLanguage = (id: string) => {
    const updated = languages.filter((lang) => lang.id !== id);
    setLanguages(updated);
    onLanguagesChange(updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Languages</span>
          {savedLanguages.length > 0 && (
            <Select onValueChange={handleLoadLanguage}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select saved..." />
              </SelectTrigger>
              <SelectContent>
                {savedLanguages.map((lang) => (
                  <SelectItem key={lang.id} value={lang.id}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {languages.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <div
                key={lang.id}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200"
              >
                <span className="font-medium">{lang.language}</span>
                <span className="text-sm text-gray-600">({lang.level})</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-blue-100"
                  onClick={() => handleRemoveLanguage(lang.id)}
                >
                  <Trash2 className="size-3 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-4 p-4 border-2 border-dashed rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Input
                placeholder="English"
                value={currentLanguage.language || ""}
                onChange={(e) =>
                  setCurrentLanguage({ ...currentLanguage, language: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Level</Label>
              <Select
                value={currentLanguage.level || ""}
                onValueChange={(value) =>
                  setCurrentLanguage({ ...currentLanguage, level: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddLanguage} className="flex-1">
              <Plus className="size-4 mr-2" />
              Add
            </Button>
            <Button onClick={handleSaveLanguage} variant="outline" className="flex-1">
              <Save className="size-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}