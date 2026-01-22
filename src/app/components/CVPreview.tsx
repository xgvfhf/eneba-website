import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import type { Experience } from "./ExperienceSection";
import type { Education } from "./EducationSection";
import type { Language } from "./LanguagesSection";
import type { Contact } from "./ContactsSection";
import type { PetProject } from "./PetProjectsSection";

interface CVPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cvData: {
    contact: Contact | null;
    experiences: Experience[];
    educations: Education[];
    languages: Language[];
    petProjects: PetProject[];
    generatedContent: string;
  };
}

export function CVPreview({ open, onOpenChange, cvData }: CVPreviewProps) {
  const handleDownload = () => {
    // В будущем можно добавить экспорт в PDF
    alert("PDF export functionality will be available in the next version!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Your Generated CV</span>
            <Button onClick={handleDownload} size="sm">
              <Download className="size-4 mr-2" />
              Download PDF
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-6 bg-white">
          {/* Contact Info */}
          {cvData.contact && (
            <div className="border-b pb-4">
              <h1 className="text-3xl mb-2">{cvData.contact.fullName}</h1>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{cvData.contact.email} • {cvData.contact.phone}</p>
                {cvData.contact.location && <p>{cvData.contact.location}</p>}
                {cvData.contact.linkedin && <p>LinkedIn: {cvData.contact.linkedin}</p>}
                {cvData.contact.github && <p>GitHub: {cvData.contact.github}</p>}
              </div>
            </div>
          )}

          {/* AI Generated Summary */}
          {cvData.generatedContent && (
            <div>
              <h2 className="text-xl mb-3 font-semibold">Professional Summary</h2>
              <p className="text-gray-700 leading-relaxed">{cvData.generatedContent}</p>
            </div>
          )}

          {/* Experience */}
          {cvData.experiences.length > 0 && (
            <div>
              <h2 className="text-xl mb-3 font-semibold">Work Experience</h2>
              <div className="space-y-4">
                {cvData.experiences.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="font-semibold">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </p>
                    <p className="mt-2 text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pet Projects */}
          {cvData.petProjects.length > 0 && (
            <div>
              <h2 className="text-xl mb-3 font-semibold">Projects</h2>
              <div className="space-y-4">
                {cvData.petProjects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.technologies}</p>
                    <p className="mt-2 text-gray-700">{project.description}</p>
                    <div className="flex gap-4 mt-2">
                      {project.url && (
                        <a href={project.url} className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          View Project
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {cvData.educations.length > 0 && (
            <div>
              <h2 className="text-xl mb-3 font-semibold">Education</h2>
              <div className="space-y-4">
                {cvData.educations.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    {edu.field && <p className="text-gray-600">{edu.field}</p>}
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </p>
                    {edu.description && <p className="mt-2 text-gray-700">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {cvData.languages.length > 0 && (
            <div>
              <h2 className="text-xl mb-3 font-semibold">Languages</h2>
              <div className="flex flex-wrap gap-3">
                {cvData.languages.map((lang) => (
                  <div key={lang.id} className="px-4 py-2 bg-gray-100 rounded-lg">
                    <span className="font-medium">{lang.language}</span>
                    <span className="text-sm text-gray-600 ml-2">({lang.level})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}