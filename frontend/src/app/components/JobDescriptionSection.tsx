import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

interface JobDescriptionSectionProps {
  onJobDescriptionChange: (description: string, isUrl: boolean) => void;
}

export function JobDescriptionSection({ onJobDescriptionChange }: JobDescriptionSectionProps) {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [activeTab, setActiveTab] = useState("text");

  const handleTextChange = (value: string) => {
    setText(value);
    onJobDescriptionChange(value, false);
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    onJobDescriptionChange(value, true);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl">Job Description</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="link">Link</TabsTrigger>
        </TabsList>
        <TabsContent value="text" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="job-text">Job description</Label>
            <Textarea
              id="job-text"
              placeholder="Paste the job description here..."
              className="min-h-[200px]"
              value={text}
              onChange={(e) => handleTextChange(e.target.value)}
            />
          </div>
        </TabsContent>
        <TabsContent value="link" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="job-url">Job posting URL</Label>
            <Input
              id="job-url"
              type="url"
              placeholder="https://example.com/job"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}