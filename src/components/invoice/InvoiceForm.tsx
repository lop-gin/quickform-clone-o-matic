
import React, { useState, useEffect } from "react";
import { InvoiceHeader } from "./InvoiceHeader";
import { CustomerSection } from "./CustomerSection";
import { InvoiceItems } from "./InvoiceItems";
import { InvoiceSummary } from "./InvoiceSummary";
import { InvoiceActions } from "./InvoiceActions";
import { InvoiceMessages } from "./InvoiceMessages";
import { InvoiceType, InvoiceItem } from "@/types/invoice";
import { generateInvoiceNumber } from "@/lib/invoice-utils";
import { calculateDueDate } from "@/lib/invoice-utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const InvoiceForm: React.FC = () => {
  const [invoice, setInvoice] = useState<InvoiceType>({
    invoiceNumber: generateInvoiceNumber(),
    invoiceDate: new Date(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    customer: {
      name: "",
      email: "",
      billingAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    },
    items: [
      {
        id: Date.now().toString(),
        serviceDate: "",
        product: "",
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
      }
    ],
    messageOnInvoice: "",
    messageOnStatement: "",
    terms: "Net 30",
    salesRep: "",
    tags: [],
    subTotal: 0,
    total: 0,
    balanceDue: 0,
  });

  // Function to update invoice state
  const updateInvoice = (updates: Partial<InvoiceType>) => {
    setInvoice((prev) => {
      const newInvoice = { ...prev, ...updates };
      
      // Recalculate totals
      const subTotal = newInvoice.items.reduce(
        (sum, item) => sum + item.quantity * item.rate,
        0
      );
      
      const total = subTotal;
      const balanceDue = total;
      
      return {
        ...newInvoice,
        subTotal,
        total,
        balanceDue
      };
    });
  };

  // Function to add a new item
  const addInvoiceItem = () => {
    updateInvoice({
      items: [
        ...invoice.items,
        {
          id: Date.now().toString(),
          serviceDate: "",
          product: "",
          description: "",
          quantity: 1,
          rate: 0,
          amount: 0,
        },
      ],
    });
  };

  // Function to update an item
  const updateInvoiceItem = (itemId: string, updates: Partial<InvoiceItem>) => {
    const updatedItems = invoice.items.map((item) => {
      if (item.id === itemId) {
        const updatedItem = { ...item, ...updates };
        // Calculate the amount
        updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        return updatedItem;
      }
      return item;
    });
    
    updateInvoice({ items: updatedItems });
  };

  // Function to remove an item
  const removeInvoiceItem = (itemId: string) => {
    // Only remove if there's more than one item
    if (invoice.items.length > 1) {
      updateInvoice({
        items: invoice.items.filter((item) => item.id !== itemId),
      });
    }
  };

  // Function to clear all items but leave one empty item
  const clearAllItems = () => {
    updateInvoice({
      items: [
        {
          id: Date.now().toString(),
          serviceDate: "",
          product: "",
          description: "",
          quantity: 1,
          rate: 0,
          amount: 0,
        }
      ]
    });
  };

  // Function to update terms and recalculate due date
  const updateTerms = (terms: string) => {
    updateInvoice({ 
      terms,
      dueDate: calculateDueDate(invoice.invoiceDate, terms)
    });
  };

  // Function to save invoice
  const saveInvoice = () => {
    console.log("Saving invoice:", invoice);
    // In a real application, you would send this to your backend
  };

  return (
    <div className="bg-transparent pb-20">
      <InvoiceHeader />
      
      <div className="p-4">
        <CustomerSection 
          customer={invoice.customer}
          invoice={invoice}
          updateCustomer={(customer) => updateInvoice({ customer })} 
          updateInvoice={updateInvoice}
        />
        
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div>
            <Label className="text-xs font-medium text-gray-700">INVOICE DATE</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-9 text-xs",
                    !invoice.invoiceDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                  {invoice.invoiceDate ? (
                    format(invoice.invoiceDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={invoice.invoiceDate}
                  onSelect={(date) => date && updateInvoice({ invoiceDate: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <Label className="text-xs font-medium text-gray-700">TERMS</Label>
            <Select value={invoice.terms} onValueChange={updateTerms}>
              <SelectTrigger className="h-9 text-xs">
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
          
          <div>
            <Label className="text-xs font-medium text-gray-700">DUE DATE</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-9 text-xs",
                    !invoice.dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                  {invoice.dueDate ? (
                    format(invoice.dueDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={invoice.dueDate}
                  onSelect={(date) => date && updateInvoice({ dueDate: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <InvoiceItems 
          items={invoice.items} 
          addItem={addInvoiceItem} 
          updateItem={updateInvoiceItem} 
          removeItem={removeInvoiceItem}
          clearAllItems={clearAllItems}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div>
            <Label className="text-xs font-medium text-gray-700">MESSAGE ON INVOICE</Label>
            <div className="mt-1">
              <Input 
                className="h-9 text-xs"
                value={invoice.messageOnInvoice}
                onChange={(e) => updateInvoice({ messageOnInvoice: e.target.value })}
                placeholder="Enter a message to be displayed on the invoice"
              />
            </div>
          </div>
          
          <InvoiceSummary 
            invoice={invoice} 
          />
        </div>
      </div>
      
      <InvoiceActions 
        onSave={saveInvoice}
        onClear={clearAllItems}
      />
    </div>
  );
};
