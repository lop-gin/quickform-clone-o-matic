
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface InvoiceMessagesProps {
  messageOnInvoice: string;
  messageOnStatement: string;
  onMessageOnInvoiceChange: (message: string) => void;
  onMessageOnStatementChange: (message: string) => void;
}

export const InvoiceMessages: React.FC<InvoiceMessagesProps> = ({
  messageOnInvoice,
  messageOnStatement,
  onMessageOnInvoiceChange,
  onMessageOnStatementChange,
}) => {
  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="messageOnInvoice" className="text-xs font-medium text-gray-600">Message on invoice</Label>
        <Textarea
          id="messageOnInvoice"
          className="min-h-[70px] resize-none text-xs"
          placeholder="This will show up on the invoice."
          value={messageOnInvoice}
          onChange={(e) => onMessageOnInvoiceChange(e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="messageOnStatement" className="text-xs font-medium text-gray-600">Message on statement</Label>
        <Textarea
          id="messageOnStatement"
          className="min-h-[70px] resize-none text-xs"
          placeholder="If you send statements to customers, this will show up as the description for this invoice."
          value={messageOnStatement}
          onChange={(e) => onMessageOnStatementChange(e.target.value)}
        />
      </div>
    </div>
  );
};
