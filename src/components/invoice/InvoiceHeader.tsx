
import React from "react";
import { format } from "date-fns";
import { CalendarIcon, Settings, HelpCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { InvoiceType } from "@/types/invoice";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InvoiceHeaderProps {
  invoice: InvoiceType;
  updateInvoice: (updates: Partial<InvoiceType>) => void;
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ invoice, updateInvoice }) => {
  return (
    <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-semibold text-gray-900">Invoice no.{invoice.invoiceNumber}</h1>
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
