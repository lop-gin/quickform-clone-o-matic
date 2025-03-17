
import React from "react";
import { InvoiceHeader } from "./InvoiceHeader";
import { CustomerSection } from "./CustomerSection";
import { InvoiceItems } from "./InvoiceItems";
import { InvoiceMessage } from "./InvoiceMessage";
import { InvoiceActions } from "./InvoiceActions";
import { InvoiceDateFields } from "./InvoiceDateFields";
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <CustomerSection 
                  customer={invoice.customer}
                  invoice={invoice}
                  updateCustomer={updateCustomer} 
                  updateInvoice={updateInvoice}
                />
              </div>
              <div>
                <InvoiceDateFields 
                  invoiceDate={invoice.invoiceDate}
                  dueDate={invoice.dueDate}
                  terms={invoice.terms}
                  onInvoiceDateChange={(date) => updateInvoice({ invoiceDate: date })}
                  onTermsChange={updateTerms}
                  onDueDateChange={(date) => updateInvoice({ dueDate: date })}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 h-full flex flex-col justify-center">
              <div className="text-center space-y-4">
                <div>
                  <div className="text-xs text-gray-500">Total Amount</div>
                  <div className="text-2xl font-bold text-gray-800">
                    Ksh{invoice.items.reduce((sum, item) => {
                      const itemAmount = (item.quantity || 0) * (item.unitPrice || 0);
                      const taxAmount = itemAmount * ((item.taxPercent || 0) / 100);
                      return sum + itemAmount + taxAmount;
                    }, 0).toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Balance Due</div>
                  <div className="text-xl font-bold text-gray-800">
                    Ksh{invoice.items.reduce((sum, item) => {
                      const itemAmount = (item.quantity || 0) * (item.unitPrice || 0);
                      const taxAmount = itemAmount * ((item.taxPercent || 0) / 100);
                      return sum + itemAmount + taxAmount;
                    }, 0).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <InvoiceItems 
          items={invoice.items} 
          addItem={addInvoiceItem} 
          updateItem={updateInvoiceItem} 
          removeItem={removeInvoiceItem}
          clearAllItems={clearAllItems}
        />
        
        <div className="mt-8">
          <InvoiceMessage 
            message={invoice.messageOnInvoice}
            onChange={(message) => updateInvoice({ messageOnInvoice: message })}
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
