
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InvoiceMessageProps {
  message: string;
  onChange: (message: string) => void;
}

export const InvoiceMessage: React.FC<InvoiceMessageProps> = ({
  message,
  onChange,
}) => {
  return (
    <div>
      <Label className="text-xs font-medium text-gray-700">MESSAGE ON INVOICE</Label>
      <div className="mt-1">
        <Input 
          className="h-9 text-xs"
          value={message}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter a message to be displayed on the invoice"
        />
      </div>
    </div>
  );
};
