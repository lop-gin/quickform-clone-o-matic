
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
        <Textarea 
          className="min-h-[120px] resize-none text-xs"
          value={message}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter a message to be displayed on the invoice"
        />
      </div>
    </div>
  );
};
