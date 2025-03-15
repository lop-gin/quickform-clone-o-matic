
import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { InvoiceType } from "@/types/invoice";
import { cn } from "@/lib/utils";

interface InvoiceHeaderProps {
  invoice: InvoiceType;
  updateInvoice: (updates: Partial<InvoiceType>) => void;
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ invoice, updateInvoice }) => {
  return (
    <div className="bg-qb-gray-light border-b border-gray-200 p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Invoice</h1>
          <p className="text-gray-500 text-sm mb-4">
            Create a new invoice for your customer
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">Preview</Button>
          <Button variant="outline">Print</Button>
          <Button variant="outline">Email</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <Label htmlFor="invoiceNumber" className="qb-input-label">Invoice #</Label>
          <Input
            id="invoiceNumber"
            className="qb-input"
            value={invoice.invoiceNumber}
            onChange={(e) =>
              updateInvoice({ invoiceNumber: e.target.value })
            }
          />
        </div>
        
        <div>
          <Label className="qb-input-label">Invoice Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal h-10"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {invoice.invoiceDate
                  ? format(invoice.invoiceDate, "MMM dd, yyyy")
                  : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={invoice.invoiceDate}
                onSelect={(date) => updateInvoice({ invoiceDate: date })}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <Label className="qb-input-label">Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal h-10"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {invoice.dueDate
                  ? format(invoice.dueDate, "MMM dd, yyyy")
                  : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={invoice.dueDate}
                onSelect={(date) => updateInvoice({ dueDate: date })}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
