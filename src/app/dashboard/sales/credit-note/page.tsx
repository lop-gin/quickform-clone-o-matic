
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerSection } from "@/components/forms/CustomerSection";
import { ItemsTable } from "@/components/forms/ItemsTable";
import { FormMessage } from "@/components/forms/FormMessage";
import { DateField } from "@/components/forms/DateFields";
import { DocumentTotal } from "@/components/forms/DocumentTotal";
import { useCreditNoteForm } from "@/hooks/useCreditNoteForm";
import { PageLoader } from "@/components/ui/page-loader";
import { SalesRepresentative } from "@/components/forms/SalesRepresentative";
import { AnimatePresence } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { DocumentItem } from "@/types/document";

// Dummy data for invoices and receipts mapped by customer
const customerTransactions = {
  "John Smith": [
    { id: "1", type: "invoice", date: "2023-10-15", number: "INV-307", total: 1250.00, status: "paid" },
    { id: "3", type: "receipt", date: "2023-11-12", number: "SR-45", total: 325.75, status: "paid" },
  ],
  "Jane Doe": [
    { id: "2", type: "invoice", date: "2023-11-03", number: "INV-315", total: 875.50, status: "overdue" },
    { id: "5", type: "receipt", date: "2023-12-18", number: "SR-52", total: 450.25, status: "paid" },
  ],
  "Robert Johnson": [
    { id: "4", type: "invoice", date: "2023-12-01", number: "INV-322", total: 1500.00, status: "due" },
  ]
};

// Dummy data for products in transactions - Updated with all required DocumentItem properties
const transactionItems: Record<string, DocumentItem[]> = {
  "1": [
    { id: "101", product: "Website Design", description: "Company website redesign", quantity: 1, unitPrice: 1000, taxPercent: 10, amount: 1000, serviceDate: "", category: "", unit: "", rate: undefined },
    { id: "102", product: "SEO Setup", description: "Initial SEO configuration", quantity: 5, unitPrice: 50, taxPercent: 0, amount: 250, serviceDate: "", category: "", unit: "", rate: undefined }
  ],
  "2": [
    { id: "201", product: "Content Writing", description: "Blog posts (5)", quantity: 5, unitPrice: 150, taxPercent: 8, amount: 750, serviceDate: "", category: "", unit: "", rate: undefined },
    { id: "202", product: "Image Licensing", description: "Stock photos", quantity: 25, unitPrice: 5.02, taxPercent: 0, amount: 125.50, serviceDate: "", category: "", unit: "", rate: undefined }
  ],
  "3": [
    { id: "301", product: "Hosting - Basic", description: "Monthly hosting fee", quantity: 1, unitPrice: 325.75, taxPercent: 0, amount: 325.75, serviceDate: "", category: "", unit: "", rate: undefined }
  ],
  "4": [
    { id: "401", product: "Social Media Campaign", description: "Facebook + Instagram", quantity: 1, unitPrice: 1200, taxPercent: 0, amount: 1200, serviceDate: "", category: "", unit: "", rate: undefined },
    { id: "402", product: "Analytics Setup", description: "Google Analytics", quantity: 2, unitPrice: 150, taxPercent: 0, amount: 300, serviceDate: "", category: "", unit: "", rate: undefined }
  ],
  "5": [
    { id: "501", product: "Email Marketing", description: "Newsletter campaign", quantity: 1, unitPrice: 450.25, taxPercent: 0, amount: 450.25, serviceDate: "", category: "", unit: "", rate: undefined }
  ]
};

export default function CreditNotePage() {
  const [loading, setLoading] = useState(true);
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState<string>("");
  
  const {
    creditNote,
    updateCreditNote,
    updateCustomer,
    addCreditNoteItem,
    updateCreditNoteItem,
    removeCreditNoteItem,
    clearAllItems,
    saveCreditNote,
    updateOtherFees,
    setItems
  } = useCreditNoteForm();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // When selected transactions change, update the items
  useEffect(() => {
    if (selectedTransactions.length === 0) {
      return;
    }
    
    // Get all items from selected transactions
    const allItems = selectedTransactions.flatMap(transId => 
      transactionItems[transId].map(item => ({
        ...item,
        id: `${Date.now()}-${item.id}`, // Create unique IDs
        // Make sure all properties exist and match the DocumentItem interface
        category: item.category || "",
        serviceDate: item.serviceDate || "",
        unit: item.unit || "",
        rate: item.rate,
        quantity: item.quantity || 0,
        unitPrice: item.unitPrice || 0,
        taxPercent: item.taxPercent || 0,
        // Calculate amount
        amount: (item.quantity || 0) * (item.unitPrice || 0)
      }))
    );
    
    // Update items in the form
    if (allItems.length > 0) {
      setItems(allItems);
      toast.success(`Added ${allItems.length} items from selected transactions`);
    }
  }, [selectedTransactions, setItems]);

  const handleTransactionSelect = (transactionId: string) => {
    setSelectedTransactions(prev => {
      if (prev.includes(transactionId)) {
        return prev.filter(id => id !== transactionId);
      } else {
        return [...prev, transactionId];
      }
    });
  };

  // Handler for customer selection
  const handleCustomerSelect = (name: string) => {
    setCustomerName(name);
    // Clear selected transactions when customer changes
    setSelectedTransactions([]);
    
    // Only clear items if we actually have a new customer
    if (name !== customerName) {
      clearAllItems();
    }
    
    updateCustomer({
      ...creditNote.customer,
      name
    });
  };

  // Get transactions for the selected customer
  const availableTransactions = customerName ? customerTransactions[customerName as keyof typeof customerTransactions] || [] : [];

  return (
    <>
      <AnimatePresence>
        {loading && <PageLoader message="Preparing credit note form..." />}
      </AnimatePresence>
    
      <div className="bg-gray-50 min-h-screen w-full">
        <div className="bg-transparent pb-20">
          <div className="bg-white shadow-sm border-b border-gray-200 p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Credit Note</h1>
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
                      customer={creditNote.customer}
                      document={creditNote}
                      updateCustomer={updateCustomer} 
                      updateDocument={updateCreditNote}
                      onCustomerSelect={handleCustomerSelect}
                    />
                  </div>
                  <div>
                    <div className="space-y-3 pb-5">
                      <DateField 
                        label="Credit note date"
                        date={creditNote.creditNoteDate}
                        onDateChange={(date) => updateCreditNote({ creditNoteDate: date })}
                      />
                      
                      <SalesRepresentative 
                        value={creditNote.salesRep || ""}
                        onChange={(rep) => updateCreditNote({ salesRep: rep })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <DocumentTotal 
                  total={creditNote.total}
                  balanceDue={creditNote.balanceDue}
                  otherFeesAmount={creditNote.otherFees?.amount}
                />
              </div>
            </div>
            
            {/* Transaction selection table - Only show when customer is selected */}
            {customerName && (
              <div className="bg-white rounded-md shadow-sm p-4 mb-6">
                <div className="mb-3">
                  <h2 className="text-sm font-medium text-gray-700">Select Invoices/Receipts to Credit</h2>
                  <p className="text-xs text-gray-500">Select one or more transactions to add their items to this credit note.</p>
                </div>
                
                {availableTransactions.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="w-10"></TableHead>
                        <TableHead className="w-10">#</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Transaction Number</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {availableTransactions.map((transaction, index) => (
                        <TableRow key={transaction.id} className="hover:bg-gray-50">
                          <TableCell className="p-2">
                            <Checkbox 
                              checked={selectedTransactions.includes(transaction.id)}
                              onCheckedChange={() => handleTransactionSelect(transaction.id)}
                            />
                          </TableCell>
                          <TableCell className="p-2">{index + 1}</TableCell>
                          <TableCell className="p-2">{transaction.date}</TableCell>
                          <TableCell className="p-2 font-medium">{transaction.number}</TableCell>
                          <TableCell className="p-2 text-right">{transaction.total.toFixed(2)}</TableCell>
                          <TableCell className="p-2">
                            <span 
                              className={`inline-block px-2 py-1 text-xs rounded-full ${
                                transaction.status === 'paid' 
                                  ? 'bg-green-100 text-green-800' 
                                  : transaction.status === 'overdue'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {transaction.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    No transactions available for this customer
                  </div>
                )}
              </div>
            )}
            
            <div className="bg-white rounded-md shadow-sm p-4 mb-6">
              <ItemsTable 
                items={creditNote.items} 
                addItem={addCreditNoteItem} 
                updateItem={updateCreditNoteItem} 
                removeItem={removeCreditNoteItem}
                clearAllItems={clearAllItems}
                otherFees={creditNote.otherFees || { description: "", amount: undefined }}
                updateOtherFees={updateOtherFees}
              />
            </div>
            
            <div className="mt-8">
              <FormMessage 
                message={creditNote.messageOnInvoice}
                label="MESSAGE ON CREDIT NOTE" 
                onChange={(message) => updateCreditNote({ messageOnInvoice: message })}
                placeholder="Enter a message to be displayed on the credit note"
              />
            </div>
          </div>
          
          <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-between items-center">
            <div className="flex space-x-3">
              <Link to="/dashboard">
                <Button variant="outline" className="bg-transparent text-white border-gray-600 hover:bg-gray-700 hover:text-white">
                  Cancel
                </Button>
              </Link>
              <Button 
                variant="outline"
                className="bg-transparent text-white border-gray-600 hover:bg-gray-700 hover:text-white"
                onClick={clearAllItems}
              >
                Clear
              </Button>
            </div>
            
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center">
                    Save and close
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {
                    saveCreditNote();
                    toast.success("Credit note saved successfully");
                  }}>
                    Save & Close
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    saveCreditNote();
                    clearAllItems();
                    setCustomerName("");
                    setSelectedTransactions([]);
                    toast.success("Credit note saved and new form created");
                  }}>
                    Save & New
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
