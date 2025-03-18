
import { CreditNoteType, DocumentItem } from "@/types/document";
import { useDocumentForm } from "./useDocumentForm";
import { generateCreditNoteNumber } from "@/lib/document-utils";

export function useCreditNoteForm() {
  const initialCreditNote: CreditNoteType = {
    creditNoteNumber: generateCreditNoteNumber(),
    creditNoteDate: new Date(),
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
    document: creditNote,
    updateDocument: updateCreditNote,
    updateCustomer,
    addDocumentItem: addCreditNoteItem,
    updateDocumentItem: updateCreditNoteItem,
    removeDocumentItem: removeCreditNoteItem,
    clearAllItems,
    updateOtherFees,
    saveDocument: saveCreditNote
  } = useDocumentForm<CreditNoteType>(initialCreditNote);

  // Function to set multiple items at once (for populating from selected invoices/receipts)
  const setItems = (items: DocumentItem[]) => {
    updateCreditNote({ items } as Partial<CreditNoteType>);
  };

  return {
    creditNote,
    updateCreditNote,
    updateCustomer,
    addCreditNoteItem,
    updateCreditNoteItem,
    removeCreditNoteItem,
    clearAllItems,
    updateOtherFees,
    saveCreditNote,
    setItems
  };
}
