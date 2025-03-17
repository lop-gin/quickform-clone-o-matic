
import React from "react";
import { FormHeader } from "./FormHeader";
import { CustomerSection } from "./CustomerSection";
import { ItemsTable } from "./ItemsTable";
import { FormMessage } from "./FormMessage";
import { FormActions } from "./FormActions";
import { DocumentTotal } from "./DocumentTotal";
import { useInvoiceForm } from "@/hooks/useInvoiceForm";
import { DateField, TermsSelect, SalesRepField } from "./DateFields";

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
    saveInvoice,
    updateOtherFees
  } = useInvoiceForm();

  return (
    <div className="bg-transparent pb-20">
      <FormHeader title="Invoice" />
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <CustomerSection 
                  customer={invoice.customer}
                  document={invoice}
                  updateCustomer={updateCustomer} 
                  updateDocument={updateInvoice}
                />
              </div>
              <div>
                <div className="space-y-3 pb-5">
                  <div className="grid grid-cols-2 gap-3">
                    <DateField 
                      label="Invoice date"
                      date={invoice.invoiceDate}
                      onDateChange={(date) => updateInvoice({ invoiceDate: date })}
                    />
                    <DateField 
                      label="Due date"
                      date={invoice.dueDate}
                      onDateChange={(date) => updateInvoice({ dueDate: date })}
                    />
                  </div>
                  
                  <TermsSelect 
                    terms={invoice.terms}
                    onTermsChange={updateTerms}
                  />
                  
                  <SalesRepField 
                    salesRep={invoice.salesRep || ""}
                    onSalesRepChange={(rep) => updateInvoice({ salesRep: rep })}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <DocumentTotal 
              total={invoice.total}
              balanceDue={invoice.balanceDue}
              otherFeesAmount={invoice.otherFees?.amount || 0}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-md shadow-sm p-4 mb-6">
          <ItemsTable 
            items={invoice.items} 
            addItem={addInvoiceItem} 
            updateItem={updateInvoiceItem} 
            removeItem={removeInvoiceItem}
            clearAllItems={clearAllItems}
            otherFees={invoice.otherFees || { description: "", amount: 0 }}
            updateOtherFees={updateOtherFees}
          />
        </div>
        
        <div className="mt-8">
          <FormMessage 
            message={invoice.messageOnInvoice}
            label="MESSAGE ON INVOICE"
            onChange={(message) => updateInvoice({ messageOnInvoice: message })}
            placeholder="Enter a message to be displayed on the invoice"
          />
        </div>
      </div>
      
      <FormActions 
        onSave={saveInvoice}
        onClear={clearAllItems}
        primaryButtonText="Save invoice"
      />
    </div>
  );
};
