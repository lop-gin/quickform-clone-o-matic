
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, X, ChevronDown } from "lucide-react";

interface InvoiceActionsProps {
  onSave: () => void;
}

export const InvoiceActions: React.FC<InvoiceActionsProps> = ({ onSave }) => {
  return (
    <div className="bg-white border-t border-gray-200 p-4 flex justify-between items-center">
      <div>
        <Button variant="ghost" className="text-gray-500">
          <X className="mr-1 h-4 w-4" />
          Cancel
        </Button>
      </div>
      
      <div className="flex space-x-2">
        <Button variant="outline" className="text-gray-700">
          Save as Draft
        </Button>
        
        <div className="relative inline-block">
          <Button onClick={onSave} className="bg-qb-blue hover:bg-qb-blue-dark">
            <Save className="mr-1 h-4 w-4" />
            Save and Send
          </Button>
          <Button className="bg-qb-blue hover:bg-qb-blue-dark p-0 px-1 -ml-1 rounded-l-none border-l border-l-qb-blue-dark">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
