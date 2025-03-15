
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface InvoiceNotesProps {
  notes: string;
  terms: string;
  onNotesChange: (notes: string) => void;
  onTermsChange: (terms: string) => void;
}

export const InvoiceNotes: React.FC<InvoiceNotesProps> = ({
  notes,
  terms,
  onNotesChange,
  onTermsChange,
}) => {
  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="notes" className="text-xs font-medium text-gray-600">Notes</Label>
        <Textarea
          id="notes"
          className="min-h-[70px] text-xs"
          placeholder="Add notes to display on the invoice (optional)"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="terms" className="text-xs font-medium text-gray-600">Terms</Label>
        <Select value={terms} onValueChange={onTermsChange}>
          <SelectTrigger id="terms" className="w-full text-xs h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Due on receipt" className="text-xs">Due on receipt</SelectItem>
            <SelectItem value="Net 15" className="text-xs">Net 15</SelectItem>
            <SelectItem value="Net 30" className="text-xs">Net 30</SelectItem>
            <SelectItem value="Net 45" className="text-xs">Net 45</SelectItem>
            <SelectItem value="Net 60" className="text-xs">Net 60</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
