
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerSection } from "@/components/forms/CustomerSection";
import { ItemsTable } from "@/components/forms/ItemsTable";
import { FormMessage } from "@/components/forms/FormMessage";
import { DateField, TermsSelect } from "@/components/forms/DateFields";
import { DocumentTotal } from "@/components/forms/DocumentTotal";
import { useInvoiceForm } from "@/hooks/useInvoiceForm";
import { PageLoader } from "@/components/ui/page-loader";
import { SalesRepresentative } from "@/components/forms/SalesRepresentative";
import { AnimatePresence } from "framer-motion";

export default function InvoicePage() {
  const [loading, setLoading] = useState(true);
  
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

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <PageLoader message="Preparing invoice form..." />}
      </AnimatePresence>
    
      <div className="bg-gray-50 min-h-screen w-full">
        <div className="bg-transparent pb-20">
          <div className="bg-white shadow-sm border-b border-gray-200 p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Invoice</h1>
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          
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
                      
                      <SalesRepresentative 
                        value={invoice.salesRep || ""}
                        onChange={(rep) => updateInvoice({ salesRep: rep })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <DocumentTotal 
                  total={invoice.total}
                  balanceDue={invoice.balanceDue}
                  otherFeesAmount={invoice.otherFees?.amount}
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
                otherFees={invoice.otherFees || { description: "", amount: undefined }}
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
          
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center">
            <Button variant="outline" onClick={clearAllItems}>
              Cancel
            </Button>
            <div className="flex gap-3">
              <Button variant="outline">Save as Draft</Button>
              <Button onClick={saveInvoice}>Save Invoice</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
