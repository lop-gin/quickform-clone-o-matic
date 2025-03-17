
import React from "react";
import { FormHeader } from "../shared/FormHeader";
import { CustomerSection } from "../shared/CustomerSection";
import { ItemsTable } from "../shared/ItemsTable";
import { FormMessage } from "../shared/FormMessage";
import { FormActions } from "../shared/FormActions";
import { DocumentTotal } from "../shared/DocumentTotal";
import { useSalesReceiptForm } from "@/hooks/useSalesReceiptForm";
import { DateField, SalesRepField } from "../shared/DateFields";

export const SalesReceiptForm: React.FC = () => {
  const {
    salesReceipt,
    updateSalesReceipt,
    updateCustomer,
    addSalesReceiptItem,
    updateSalesReceiptItem,
    removeSalesReceiptItem,
    clearAllItems,
    saveSalesReceipt,
    updateOtherFees
  } = useSalesReceiptForm();

  return (
    <div className="bg-transparent pb-20">
      <FormHeader title="Sales Receipt" />
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <CustomerSection 
                  customer={salesReceipt.customer}
                  document={salesReceipt}
                  updateCustomer={updateCustomer} 
                  updateDocument={updateSalesReceipt}
                />
              </div>
              <div>
                <div className="space-y-3 pb-5">
                  <DateField 
                    label="Sale date"
                    date={salesReceipt.saleDate}
                    onDateChange={(date) => updateSalesReceipt({ saleDate: date })}
                  />
                  
                  <SalesRepField 
                    salesRep={salesReceipt.salesRep || ""}
                    onSalesRepChange={(rep) => updateSalesReceipt({ salesRep: rep })}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <DocumentTotal 
              total={salesReceipt.total}
              balanceDue={salesReceipt.balanceDue}
              otherFeesAmount={salesReceipt.otherFees?.amount || 0}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-md shadow-sm p-4 mb-6">
          <ItemsTable 
            items={salesReceipt.items} 
            addItem={addSalesReceiptItem} 
            updateItem={updateSalesReceiptItem} 
            removeItem={removeSalesReceiptItem}
            clearAllItems={clearAllItems}
            otherFees={salesReceipt.otherFees || { description: "", amount: 0 }}
            updateOtherFees={updateOtherFees}
          />
        </div>
        
        <div className="mt-8">
          <FormMessage 
            message={salesReceipt.messageOnInvoice}
            label="MESSAGE ON RECEIPT" 
            onChange={(message) => updateSalesReceipt({ messageOnInvoice: message })}
            placeholder="Enter a message to be displayed on the sales receipt"
          />
        </div>
      </div>
      
      <FormActions 
        onSave={saveSalesReceipt}
        onClear={clearAllItems}
        primaryButtonText="Save receipt"
      />
    </div>
  );
};
