
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

interface InvoiceTagsProps {
  tags: string[];
  onTagsUpdate: (tags: string[]) => void;
}

export const InvoiceTags: React.FC<InvoiceTagsProps> = ({
  tags,
  onTagsUpdate,
}) => {
  const [tagInput, setTagInput] = useState("");

  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      onTagsUpdate([...tags, tag.trim()]);
    }
    setTagInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput) {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsUpdate(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="mb-3">
      <div className="flex items-center mb-1">
        <Label htmlFor="tags" className="text-xs font-medium text-gray-600 mr-1">Tags</Label>
        <HelpCircle className="h-3 w-3 text-gray-400" />
        <div className="ml-auto">
          <Button variant="link" className="text-blue-500 text-xs p-0 h-auto">Manage tags</Button>
        </div>
      </div>
      
      <div className="relative">
        <Input
          id="tags"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Start typing to add a tag"
          className="w-full text-xs"
        />
      </div>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap mt-2">
          {tags.map((tag) => (
            <div key={tag} className="bg-blue-50 text-blue-600 text-[10px] px-1.5 py-0.5 rounded mr-1.5 mb-1.5 flex items-center">
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="ml-1 text-blue-400 hover:text-blue-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
