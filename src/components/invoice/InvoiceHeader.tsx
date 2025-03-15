
import React from "react";
import { Settings, HelpCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const InvoiceHeader: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-semibold text-gray-900">Invoice</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon">
          <X className="h-5 w-5 text-gray-500" />
        </Button>
      </div>
    </div>
  );
};
