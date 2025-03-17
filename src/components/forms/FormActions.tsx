
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface FormActionsProps {
  onSave: () => void;
  onClear: () => void;
  primaryButtonText?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({ 
  onSave, 
  onClear,
  primaryButtonText = "Save and close" 
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white border-t border-gray-700 p-2.5 flex justify-between items-center z-10">
      <div>
        <Button variant="ghost" className="text-gray-300 text-xs h-7 hover:bg-gray-700 hover:text-white">
          Cancel
        </Button>
        <Button 
          variant="ghost" 
          className="text-gray-300 text-xs h-7 hover:bg-gray-700 hover:text-white" 
          onClick={onClear}
        >
          Clear
        </Button>
      </div>
      
      <div className="flex space-x-2">
        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex">
                <Button onClick={onSave} className="bg-green-600 hover:bg-green-700 rounded-r-none h-7 text-xs">
                  {primaryButtonText}
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 px-1.5 rounded-l-none border-l border-green-700 h-7">
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onSave}>
                Save and new
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
