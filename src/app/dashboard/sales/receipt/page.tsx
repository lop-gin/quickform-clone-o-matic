
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerSection } from "@/components/forms/CustomerSection";
import { ItemsTable } from "@/components/forms/ItemsTable";
import { FormMessage } from "@/components/forms/FormMessage";
import { DateField } from "@/components/forms/DateFields";
import { DocumentTotal } from "@/components/forms/DocumentTotal";
import { useSalesReceiptForm } from "@/hooks/useSalesReceiptForm";
import { PageLoader } from "@/components/ui/page-loader";
import { SalesRepresentative } from "@/components/forms/SalesRepresentative";
import { motion, AnimatePresence } from "framer-motion";

export default function SalesReceiptPage() {
  const [loading, setLoading] = useState(true);
  
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
        {loading && <PageLoader message="Preparing sales receipt form..." />}
      </AnimatePresence>
    
      <div className="bg-gray-50 min-h-screen w-full">
        <div className="bg-transparent pb-20">
          <div className="bg-white shadow-sm border-b border-gray-200 p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Sales Receipt</h1>
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
                      
                      <SalesRepresentative 
                        value={salesReceipt.salesRep || ""}
                        onChange={(rep) => updateSalesReceipt({ salesRep: rep })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <DocumentTotal 
                  total={salesReceipt.total}
                  balanceDue={salesReceipt.balanceDue}
                  otherFeesAmount={salesReceipt.otherFees?.amount}
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
                otherFees={salesReceipt.otherFees || { description: "", amount: undefined }}
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
          
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center">
            <Button variant="outline" onClick={clearAllItems}>
              Cancel
            </Button>
            <div className="flex gap-3">
              <Button variant="outline">Save as Draft</Button>
              <Button onClick={saveSalesReceipt}>Save Receipt</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
