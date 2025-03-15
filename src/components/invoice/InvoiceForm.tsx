
import React, { useState } from "react";
import { InvoiceHeader } from "./InvoiceHeader";
import { CustomerSection } from "./CustomerSection";
import { InvoiceItems } from "./InvoiceItems";
import { InvoiceSummary } from "./InvoiceSummary";
import { InvoiceActions } from "./InvoiceActions";
import { InvoiceNotes } from "./InvoiceNotes";
import { InvoiceType } from "@/types/invoice";
import { generateInvoiceNumber } from "@/lib/invoice-utils";

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
      shippingAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    },
    items: [],
    notes: "",
    terms: "Net 30",
    discountType: "percentage",
    discountValue: 0,
    taxRate: 0,
    subTotal: 0,
    discount: 0,
    tax: 0,
    total: 0,
  });

  // Function to update invoice state
  const updateInvoice = (updates: Partial<InvoiceType>) => {
    setInvoice((prev) => {
      const newInvoice = { ...prev, ...updates };
      
      // Recalculate totals
      const subTotal = newInvoice.items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      );
      
      const discount = newInvoice.discountType === "percentage"
        ? (subTotal * newInvoice.discountValue) / 100
        : newInvoice.discountValue;
      
      const afterDiscount = subTotal - discount;
      const tax = (afterDiscount * newInvoice.taxRate) / 100;
      const total = afterDiscount + tax;
      
      return {
        ...newInvoice,
        subTotal,
        discount,
        tax,
        total
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
          description: "",
          quantity: 1,
          unitPrice: 0,
          amount: 0,
        },
      ],
    });
  };

  // Function to update an item
  const updateInvoiceItem = (itemId: string, updates: any) => {
    const updatedItems = invoice.items.map((item) => {
      if (item.id === itemId) {
        const updatedItem = { ...item, ...updates };
        // Calculate the amount
        updatedItem.amount = updatedItem.quantity * updatedItem.unitPrice;
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
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <InvoiceHeader 
        invoice={invoice} 
        updateInvoice={updateInvoice} 
      />
      
      <div className="p-6">
        <CustomerSection 
          customer={invoice.customer} 
          updateCustomer={(customer) => updateInvoice({ customer })} 
        />
        
        <InvoiceItems 
          items={invoice.items} 
          addItem={addInvoiceItem} 
          updateItem={updateInvoiceItem} 
          removeItem={removeInvoiceItem} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <InvoiceNotes 
            notes={invoice.notes} 
            terms={invoice.terms}
            onNotesChange={(notes) => updateInvoice({ notes })}
            onTermsChange={(terms) => updateInvoice({ terms })} 
          />
          
          <InvoiceSummary 
            invoice={invoice} 
            updateInvoice={updateInvoice} 
          />
        </div>
      </div>
      
      <InvoiceActions 
        onSave={saveInvoice} 
      />
    </div>
  );
};
