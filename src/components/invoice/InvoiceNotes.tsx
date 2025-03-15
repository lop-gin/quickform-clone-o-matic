
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
    <div className="space-y-4">
      <div>
        <Label htmlFor="notes" className="qb-input-label">Notes</Label>
        <Textarea
          id="notes"
          className="min-h-[100px] text-sm"
          placeholder="Add notes to display on the invoice (optional)"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="terms" className="qb-input-label">Terms</Label>
        <Select value={terms} onValueChange={onTermsChange}>
          <SelectTrigger id="terms" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Due on receipt">Due on receipt</SelectItem>
            <SelectItem value="Net 15">Net 15</SelectItem>
            <SelectItem value="Net 30">Net 30</SelectItem>
            <SelectItem value="Net 45">Net 45</SelectItem>
            <SelectItem value="Net 60">Net 60</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
