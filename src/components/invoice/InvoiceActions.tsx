
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface InvoiceActionsProps {
  onSave: () => void;
}

export const InvoiceActions: React.FC<InvoiceActionsProps> = ({ onSave }) => {
  return (
    <div className="bg-gray-100 border-t border-gray-200 p-3 flex justify-between items-center">
      <div>
        <Button variant="ghost" className="text-gray-600">
          Cancel
        </Button>
        <Button variant="ghost" className="text-gray-600">
          Clear
        </Button>
      </div>
      
      <div className="flex space-x-2">
        <Button variant="outline" className="text-gray-700 border-gray-300">
          Print or Preview
        </Button>
        
        <Button variant="outline" className="text-gray-700 border-gray-300">
          Make recurring
        </Button>
        
        <Button variant="outline" className="text-gray-700 border-gray-300">
          Customise
        </Button>
        
        <div className="flex">
          <Button onClick={onSave} className="bg-green-600 hover:bg-green-700 rounded-r-none">
            Save
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 px-2 rounded-l-none border-l border-green-700">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
