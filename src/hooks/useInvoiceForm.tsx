
import { useState } from "react";
import { InvoiceType, InvoiceItem, Customer } from "@/types/invoice";
import { generateInvoiceNumber, calculateDueDate } from "@/lib/invoice-utils";

export function useInvoiceForm() {
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
        category: "",
        product: "",
        description: "",
        quantity: 1,
        unit: "ea",
        unitPrice: 0,
        rate: 0,
        taxPercent: 0,
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
        (sum, item) => sum + (item.quantity * (item.unitPrice || item.rate)),
        0
      );
      
      const tax = newInvoice.items.reduce((sum, item) => {
        const itemAmount = item.quantity * (item.unitPrice || item.rate);
        return sum + (itemAmount * ((item.taxPercent || 0) / 100));
      }, 0);
      
      const total = subTotal + tax;
      const balanceDue = total;
      
      return {
        ...newInvoice,
        subTotal,
        total,
        balanceDue
      };
    });
  };

  // Function to update customer
  const updateCustomer = (customer: Customer) => {
    updateInvoice({ customer });
  };

  // Function to add a new item
  const addInvoiceItem = () => {
    updateInvoice({
      items: [
        ...invoice.items,
        {
          id: Date.now().toString(),
          serviceDate: "",
          category: "",
          product: "",
          description: "",
          quantity: 1,
          unit: "ea",
          unitPrice: 0,
          rate: 0,
          taxPercent: 0,
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
        updatedItem.amount = updatedItem.quantity * (updatedItem.unitPrice || updatedItem.rate);
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
          category: "",
          product: "",
          description: "",
          quantity: 1,
          unit: "ea",
          unitPrice: 0,
          rate: 0,
          taxPercent: 0,
          amount: 0,
        }
      ]
    });
  };

  // Function to update terms and recalculate due date
  const updateTerms = (terms: string) => {
    const newDueDate = calculateDueDate(invoice.invoiceDate, terms);
    updateInvoice({ 
      terms,
      dueDate: newDueDate
    });
  };

  // Function to save invoice
  const saveInvoice = () => {
    console.log("Saving invoice:", invoice);
    // In a real application, you would send this to your backend
  };

  return {
    invoice,
    updateInvoice,
    updateCustomer,
    addInvoiceItem,
    updateInvoiceItem,
    removeInvoiceItem,
    clearAllItems,
    updateTerms,
    saveInvoice
  };
}
