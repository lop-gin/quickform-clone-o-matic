
import React, { useState } from "react";
import { InvoiceHeader } from "./InvoiceHeader";
import { CustomerSection } from "./CustomerSection";
import { InvoiceItems } from "./InvoiceItems";
import { InvoiceSummary } from "./InvoiceSummary";
import { InvoiceActions } from "./InvoiceActions";
import { InvoiceMessages } from "./InvoiceMessages";
import { InvoiceType, InvoiceItem } from "@/types/invoice";
import { generateInvoiceNumber } from "@/lib/invoice-utils";
import { InvoiceTags } from "./InvoiceTags";

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
    items: [],
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
    updateInvoice({
      items: invoice.items.filter((item) => item.id !== itemId),
    });
  };

  // Function to save invoice
  const saveInvoice = () => {
    console.log("Saving invoice:", invoice);
    // In a real application, you would send this to your backend
  };

  return (
    <div className="bg-white shadow-sm rounded-sm overflow-hidden border border-gray-200">
      <InvoiceHeader 
        invoice={invoice} 
        updateInvoice={updateInvoice} 
      />
      
      <div className="p-4">
        <CustomerSection 
          customer={invoice.customer}
          invoice={invoice}
          updateCustomer={(customer) => updateInvoice({ customer })} 
          updateInvoice={updateInvoice}
        />
        
        <div className="mb-4">
          <InvoiceTags 
            tags={invoice.tags || []} 
            onTagsUpdate={(tags) => updateInvoice({ tags })} 
          />
        </div>
        
        <InvoiceItems 
          items={invoice.items} 
          addItem={addInvoiceItem} 
          updateItem={updateInvoiceItem} 
          removeItem={removeInvoiceItem} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <InvoiceMessages 
            messageOnInvoice={invoice.messageOnInvoice} 
            messageOnStatement={invoice.messageOnStatement}
            onMessageOnInvoiceChange={(messageOnInvoice) => updateInvoice({ messageOnInvoice })}
            onMessageOnStatementChange={(messageOnStatement) => updateInvoice({ messageOnStatement })} 
          />
          
          <InvoiceSummary 
            invoice={invoice} 
          />
        </div>
      </div>
      
      <InvoiceActions 
        onSave={saveInvoice} 
      />
    </div>
  );
};
