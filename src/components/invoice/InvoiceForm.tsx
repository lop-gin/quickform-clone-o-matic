
import React from "react";
import { InvoiceHeader } from "./InvoiceHeader";
import { CustomerSection } from "./CustomerSection";
import { InvoiceItems } from "./InvoiceItems";
import { InvoiceSummary } from "./InvoiceSummary";
import { InvoiceActions } from "./InvoiceActions";
import { InvoiceDateFields } from "./InvoiceDateFields";
import { InvoiceMessage } from "./InvoiceMessage";
import { useInvoiceForm } from "@/hooks/useInvoiceForm";

export const InvoiceForm: React.FC = () => {
  const {
    invoice,
    updateInvoice,
    updateCustomer,
    addInvoiceItem,
    updateInvoiceItem,
    removeInvoiceItem,
    clearAllItems,
    updateTerms,
    saveInvoice
  } = useInvoiceForm();

  return (
    <div className="bg-transparent pb-20">
      <InvoiceHeader />
      
      <div className="p-4">
        <CustomerSection 
          customer={invoice.customer}
          invoice={invoice}
          updateCustomer={updateCustomer} 
          updateInvoice={updateInvoice}
        />
        
        <InvoiceDateFields 
          invoiceDate={invoice.invoiceDate}
          dueDate={invoice.dueDate}
          terms={invoice.terms}
          onInvoiceDateChange={(date) => updateInvoice({ invoiceDate: date })}
          onTermsChange={updateTerms}
        />
        
        <InvoiceItems 
          items={invoice.items} 
          addItem={addInvoiceItem} 
          updateItem={updateInvoiceItem} 
          removeItem={removeInvoiceItem}
          clearAllItems={clearAllItems}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <InvoiceMessage 
            message={invoice.messageOnInvoice}
            onChange={(message) => updateInvoice({ messageOnInvoice: message })}
          />
          
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
