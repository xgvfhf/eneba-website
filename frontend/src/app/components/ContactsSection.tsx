import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Save } from "lucide-react";

export interface Contact {
  id: string;
  name: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

interface ContactsSectionProps {
  onContactsChange: (contact: Contact | null) => void;
}

export function ContactsSection({ onContactsChange }: ContactsSectionProps) {
  const [savedContacts, setSavedContacts] = useState<Contact[]>([]);
  const [currentContact, setCurrentContact] = useState<Partial<Contact>>({});

  useEffect(() => {
    const saved = localStorage.getItem("savedContacts");
    if (saved) {
      setSavedContacts(JSON.parse(saved));
    }
  }, []);

  const handleSaveContact = () => {
    if (currentContact.fullName && currentContact.email) {
      const newContact: Contact = {
        id: Date.now().toString(),
        name: currentContact.fullName,
        fullName: currentContact.fullName,
        email: currentContact.email,
        phone: currentContact.phone || "",
        location: currentContact.location || "",
        linkedin: currentContact.linkedin || "",
        github: currentContact.github || "",
      };
      const updated = [...savedContacts, newContact];
      setSavedContacts(updated);
      localStorage.setItem("savedContacts", JSON.stringify(updated));
      onContactsChange(newContact);
    }
  };

  const handleLoadContact = (id: string) => {
    const saved = savedContacts.find((contact) => contact.id === id);
    if (saved) {
      setCurrentContact(saved);
      onContactsChange(saved);
    }
  };

  const handleInputChange = (field: keyof Contact, value: string) => {
    const updated = { ...currentContact, [field]: value };
    setCurrentContact(updated);
    
    if (updated.fullName && updated.email) {
      onContactsChange(updated as Contact);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Contact Information</span>
          {savedContacts.length > 0 && (
            <Select onValueChange={handleLoadContact}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select saved..." />
              </SelectTrigger>
              <SelectContent>
                {savedContacts.map((contact) => (
                  <SelectItem key={contact.id} value={contact.id}>
                    {contact.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              placeholder="John Doe"
              value={currentContact.fullName || ""}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="email@example.com"
              value={currentContact.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={currentContact.phone || ""}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Location</Label>
            <Input
              placeholder="New York, USA"
              value={currentContact.location || ""}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>LinkedIn</Label>
            <Input
              placeholder="linkedin.com/in/username"
              value={currentContact.linkedin || ""}
              onChange={(e) => handleInputChange("linkedin", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>GitHub</Label>
            <Input
              placeholder="github.com/username"
              value={currentContact.github || ""}
              onChange={(e) => handleInputChange("github", e.target.value)}
            />
          </div>
        </div>
        <Button onClick={handleSaveContact} variant="outline" className="w-full">
          <Save className="size-4 mr-2" />
          Save Contact Information
        </Button>
      </CardContent>
    </Card>
  );
}