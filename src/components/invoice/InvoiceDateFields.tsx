
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface InvoiceDateFieldsProps {
  invoiceDate: Date;
  dueDate: Date;
  terms: string;
  onInvoiceDateChange: (date: Date) => void;
  onTermsChange: (terms: string) => void;
  onDueDateChange: (date: Date) => void;
}

export const InvoiceDateFields: React.FC<InvoiceDateFieldsProps> = ({
  invoiceDate,
  dueDate,
  terms,
  onInvoiceDateChange,
  onTermsChange,
  onDueDateChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <div className="flex items-center mb-1">
          <Label className="text-xs font-medium text-gray-600 mr-1">Invoice date</Label>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal h-8 text-xs",
                !invoiceDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-3.5 w-3.5" />
              {invoiceDate ? (
                format(invoiceDate, "dd/MM/yyyy")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={invoiceDate}
              onSelect={(date) => date && onInvoiceDateChange(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div>
        <div className="flex items-center mb-1">
          <Label className="text-xs font-medium text-gray-600 mr-1">Due date</Label>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal h-8 text-xs",
                !dueDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-3.5 w-3.5" />
              {dueDate ? (
                format(dueDate, "dd/MM/yyyy")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dueDate}
              onSelect={(date) => date && onDueDateChange(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="col-span-2">
        <div className="flex items-center mb-1">
          <Label className="text-xs font-medium text-gray-600 mr-1">Terms</Label>
        </div>
        <Select value={terms} onValueChange={onTermsChange}>
          <SelectTrigger className="h-8 text-xs w-full">
            <SelectValue placeholder="Select terms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Due on receipt">Due on receipt</SelectItem>
            <SelectItem value="Net 15">Net 15</SelectItem>
            <SelectItem value="Net 30">Net 30</SelectItem>
            <SelectItem value="Net 60">Net 60</SelectItem>
            <SelectItem value="Custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
