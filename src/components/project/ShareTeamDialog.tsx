import React, { useState } from "react";
import { Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

interface TeamMember {
  name: string;
  role: string;
  email: string;
  access: "viewer" | "editor";
}

interface ShareTeamDialogProps {
  projectName: string;
  projectId: string;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

export const ShareTeamDialog = ({
  projectName,
  projectId,
  className,
  variant = "outline",
  size = "sm",
}: ShareTeamDialogProps) => {
  const [newMember, setNewMember] = useState<TeamMember>({
    name: "",
    role: "",
    email: "",
    access: "viewer",
  });
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleAccessChange = (value: string) => {
    setNewMember({ ...newMember, access: value as "viewer" | "editor" });
  };

  const validateEmail = (email: string): boolean => {
    // Basic email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleAddMember = () => {
    // Validate fields
    if (!newMember.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!newMember.email.trim()) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(newMember.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Add new member and reset form
    setMembers([...members, newMember]);
    setNewMember({
      name: "",
      role: "",
      email: "",
      access: "viewer",
    });
    setError(null);
  };

  const handleRemoveMember = (index: number) => {
    const updatedMembers = [...members];
    updatedMembers.splice(index, 1);
    setMembers(updatedMembers);
  };

  const handleSaveAndShare = () => {
    // Here you would implement the actual sharing functionality
    // For example, sending an API request to invite the members
    console.log(`Sharing project ${projectId} with:`, members);

    // In a real implementation, you'd show a loading state and handle success/error
    alert(`Project "${projectName}" has been shared with ${members.length} team members.`);

    // Reset state after sharing
    setMembers([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Share2 className="h-4 w-4 mr-1" />
          Share with Team
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Share Project with Team</DialogTitle>
          <DialogDescription>
            Invite team members to collaborate on &ldquo;{projectName}&rdquo;
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Input form for adding new members */}
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-4">
              <Input
                label="Name"
                name="name"
                value={newMember.name}
                onChange={handleInputChange}
                placeholder=""
                error={error === "Name is required"}
              />
            </div>
            <div className="col-span-3">
              <Input
                label="Role"
                name="role"
                value={newMember.role}
                onChange={handleInputChange}
                placeholder=""
              />
            </div>
            <div className="col-span-3">
              <Input
                label="Email"
                name="email"
                type="email"
                value={newMember.email}
                onChange={handleInputChange}
                placeholder=""
                error={error === "Email is required" || error === "Please enter a valid email address"}
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">Access</label>
              <Select
                value={newMember.access}
                onValueChange={handleAccessChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <div className="flex justify-end">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleAddMember}
            >
              Add Member
            </Button>
          </div>

          {/* Display added members */}
          {members.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Team members to invite:</h4>
              <div className="border rounded-md divide-y">
                {members.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3">
                    <div className="flex-1">
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-500 flex items-center space-x-2">
                        <span>{member.email}</span>
                        {member.role && (
                          <>
                            <span>•</span>
                            <span>{member.role}</span>
                          </>
                        )}
                        <span>•</span>
                        <span className="capitalize">{member.access}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveMember(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-6">
          <Button variant="ghost" type="button">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSaveAndShare}
            disabled={members.length === 0}
          >
            Share Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareTeamDialog;
