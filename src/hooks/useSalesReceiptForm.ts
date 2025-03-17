
import { SalesReceiptType } from "@/types/document";
import { useDocumentForm } from "./useDocumentForm";
import { generateReceiptNumber } from "@/lib/document-utils";

export function useSalesReceiptForm() {
  const initialSalesReceipt: SalesReceiptType = {
    receiptNumber: generateReceiptNumber(),
    saleDate: new Date(),
    customer: {
      name: "",
      email: "",
      company: "",
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
        quantity: undefined,
        unit: "",
        unitPrice: undefined,
        rate: undefined,
        taxPercent: undefined,
        amount: 0,
      }
    ],
    messageOnInvoice: "",
    messageOnStatement: "",
    salesRep: "",
    tags: [],
    subTotal: 0,
    total: 0,
    balanceDue: 0,
    otherFees: {
      description: "",
      amount: undefined
    }
  };

  const {
    document: salesReceipt,
    updateDocument: updateSalesReceipt,
    updateCustomer,
    addDocumentItem: addSalesReceiptItem,
    updateDocumentItem: updateSalesReceiptItem,
    removeDocumentItem: removeSalesReceiptItem,
    clearAllItems,
    updateOtherFees,
    saveDocument: saveSalesReceipt
  } = useDocumentForm<SalesReceiptType>(initialSalesReceipt);

  return {
    salesReceipt,
    updateSalesReceipt,
    updateCustomer,
    addSalesReceiptItem,
    updateSalesReceiptItem,
    removeSalesReceiptItem,
    clearAllItems,
    updateOtherFees,
    saveSalesReceipt
  };
}

