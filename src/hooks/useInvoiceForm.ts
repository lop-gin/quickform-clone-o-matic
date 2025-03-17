
import { InvoiceType } from "@/types/document";
import { useDocumentForm } from "./useDocumentForm";
import { generateInvoiceNumber, calculateDueDate } from "@/lib/document-utils";

export function useInvoiceForm() {
  const initialInvoice: InvoiceType = {
    invoiceNumber: generateInvoiceNumber(),
    invoiceDate: new Date(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    terms: "Net 30",
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
    document: invoice,
    updateDocument: updateInvoice,
    updateCustomer,
    addDocumentItem: addInvoiceItem,
    updateDocumentItem: updateInvoiceItem,
    removeDocumentItem: removeInvoiceItem,
    clearAllItems,
    updateOtherFees,
    saveDocument: saveInvoice
  } = useDocumentForm<InvoiceType>(initialInvoice);

  // Function to update terms and recalculate due date
  const updateTerms = (terms: string) => {
    const newDueDate = calculateDueDate(invoice.invoiceDate, terms);
    updateInvoice({ 
      terms,
      dueDate: newDueDate
    });
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
    updateOtherFees,
    saveInvoice
  };
}

