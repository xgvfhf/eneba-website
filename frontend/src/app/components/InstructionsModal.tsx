import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { FileText, Briefcase, GraduationCap, Languages, Mail, FolderGit2, Sparkles } from "lucide-react";

interface InstructionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InstructionsModal({ open, onOpenChange }: InstructionsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">How to Use AI CV Generator</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Introduction */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Welcome!</h3>
              <p className="text-gray-700">
                AI CV Generator helps you create the perfect resume tailored to any job description. 
                Our AI analyzes the job requirements and matches them with your experience to generate 
                an optimal CV.
              </p>
            </div>

            <Separator />

            {/* Step 1 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="size-5 text-blue-600" />
                <h3 className="text-lg font-semibold">1. Job Description</h3>
              </div>
              <p className="text-gray-700 mb-2">
                Start by providing the job description in one of two ways:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li><strong>Text:</strong> Copy and paste the full job description</li>
                <li><strong>Link:</strong> Paste a URL to the job posting (AI will extract the content)</li>
              </ul>
            </div>

            <Separator />

            {/* Step 2 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="size-5 text-blue-600" />
                <h3 className="text-lg font-semibold">2. Add Your Information (Optional)</h3>
              </div>
              <p className="text-gray-700 mb-3">
                Fill in the optional sections to provide more context for the AI:
              </p>
              
              <div className="space-y-3 ml-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="size-4 text-green-600" />
                    <strong>Work Experience</strong>
                  </div>
                  <p className="text-sm text-gray-600">
                    Add your previous positions, companies, dates, and responsibilities
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <GraduationCap className="size-4 text-green-600" />
                    <strong>Education</strong>
                  </div>
                  <p className="text-sm text-gray-600">
                    Include your degrees, institutions, and fields of study
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FolderGit2 className="size-4 text-green-600" />
                    <strong>Pet Projects</strong>
                  </div>
                  <p className="text-sm text-gray-600">
                    Showcase your personal projects with technologies used and links
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Languages className="size-4 text-green-600" />
                    <strong>Languages</strong>
                  </div>
                  <p className="text-sm text-gray-600">
                    List languages you speak and your proficiency level
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="size-4 text-green-600" />
                    <strong>Contact Information</strong>
                  </div>
                  <p className="text-sm text-gray-600">
                    Add your email, phone, location, and social profiles
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Step 3 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="size-5 text-purple-600" />
                <h3 className="text-lg font-semibold">3. Save & Reuse</h3>
              </div>
              <p className="text-gray-700 mb-2">
                Each section has two buttons:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li><strong>Add:</strong> Adds the item to your current CV</li>
                <li><strong>Save:</strong> Saves the item for future use</li>
              </ul>
              <p className="text-gray-700 mt-3">
                Access your saved items by clicking the <strong>menu icon (☰)</strong> in the top left corner. 
                Click on any saved item to quickly add it to your current CV.
              </p>
            </div>

            <Separator />

            {/* Step 4 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="size-5 text-blue-600" />
                <h3 className="text-lg font-semibold">4. Generate Your CV</h3>
              </div>
              <p className="text-gray-700">
                Click the <strong>"Generate CV"</strong> button at the bottom. Our AI will:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mt-2">
                <li>Analyze the job requirements</li>
                <li>Match them with your experience and skills</li>
                <li>Generate a professional CV optimized for the position</li>
                <li>Highlight the most relevant information</li>
              </ul>
            </div>

            <Separator />

            {/* Step 5 */}
            <div>
              <h3 className="text-lg font-semibold mb-2">5. Download & Apply</h3>
              <p className="text-gray-700">
                Review your generated CV and download it as a PDF. You can regenerate it 
                anytime with different information or for different job positions.
              </p>
            </div>

            <Separator />

            {/* Tips */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">💡 Pro Tips</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                <li>The more detailed your information, the better the AI can tailor your CV</li>
                <li>Save frequently used experiences and education for quick access</li>
                <li>Create different CVs for different types of positions</li>
                <li>Update your saved items regularly as you gain new experience</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
