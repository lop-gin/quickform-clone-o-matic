
import { useState } from "react";
import { Document, DocumentItem, Customer, OtherFees } from "@/types/invoice";

export function useDocumentForm<T extends Document>(initialState: T) {
  const [document, setDocument] = useState<T>(initialState);

  // Function to update document state
  const updateDocument = (updates: Partial<T>) => {
    setDocument((prev) => {
      const newDocument = { ...prev, ...updates };
      
      // Recalculate totals
      const subTotal = newDocument.items.reduce(
        (sum, item) => sum + (item.quantity * (item.unitPrice || item.rate)),
        0
      );
      
      const tax = newDocument.items.reduce((sum, item) => {
        const itemAmount = item.quantity * (item.unitPrice || item.rate);
        return sum + (itemAmount * ((item.taxPercent || 0) / 100));
      }, 0);
      
      const total = subTotal + tax;
      const balanceDue = total;
      
      return {
        ...newDocument,
        subTotal,
        total,
        balanceDue
      } as T;
    });
  };

  // Function to update customer
  const updateCustomer = (customer: Customer) => {
    updateDocument({ customer } as Partial<T>);
  };

  // Function to update other fees
  const updateOtherFees = (updates: Partial<OtherFees>) => {
    setDocument((prev) => {
      const newOtherFees = { ...(prev.otherFees || { description: "", amount: 0 }), ...updates };
      return {
        ...prev,
        otherFees: newOtherFees
      } as T;
    });
  };

  // Function to add a new item
  const addDocumentItem = () => {
    updateDocument({
      items: [
        ...document.items,
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
    } as Partial<T>);
  };

  // Function to update an item
  const updateDocumentItem = (itemId: string, updates: Partial<DocumentItem>) => {
    const updatedItems = document.items.map((item) => {
      if (item.id === itemId) {
        const updatedItem = { ...item, ...updates };
        // Calculate the amount
        updatedItem.amount = updatedItem.quantity * (updatedItem.unitPrice || updatedItem.rate);
        return updatedItem;
      }
      return item;
    });
    
    updateDocument({ items: updatedItems } as Partial<T>);
  };

  // Function to remove an item
  const removeDocumentItem = (itemId: string) => {
    // Only remove if there's more than one item
    if (document.items.length > 1) {
      updateDocument({
        items: document.items.filter((item) => item.id !== itemId),
      } as Partial<T>);
    }
  };

  // Function to clear all items but leave one empty item
  const clearAllItems = () => {
    updateDocument({
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
    } as Partial<T>);
  };

  // Function to save document
  const saveDocument = () => {
    console.log("Saving document:", document);
    // In a real application, you would send this to your backend
  };

  return {
    document,
    updateDocument,
    updateCustomer,
    addDocumentItem,
    updateDocumentItem,
    removeDocumentItem,
    clearAllItems,
    updateOtherFees,
    saveDocument
  };
}
