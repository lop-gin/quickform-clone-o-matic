
import { SalesReceiptType } from "@/types/invoice";
import { useDocumentForm } from "./useDocumentForm";
import { generateInvoiceNumber } from "@/lib/invoice-utils";

export function useSalesReceiptForm() {
  const initialSalesReceipt: SalesReceiptType = {
    receiptNumber: generateInvoiceNumber().replace("INV", "REC"),
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
    salesRep: "",
    tags: [],
    subTotal: 0,
    total: 0,
    balanceDue: 0,
    otherFees: {
      description: "",
      amount: 0
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
