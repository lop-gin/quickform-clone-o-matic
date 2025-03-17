
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Customer {
  id?: string;
  name: string;
  email: string;
  company?: string;
  billingAddress: Address;
}

export interface InvoiceItem {
  id: string;
  serviceDate?: string;
  category?: string;
  product: string;
  description: string;
  quantity: number;
  unit?: string;
  unitPrice?: number;
  rate: number;
  taxPercent?: number;
  amount: number;
}

export interface OtherFees {
  description: string;
  amount: number;
}

export interface InvoiceType {
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate: Date;
  customer: Customer;
  items: InvoiceItem[];
  messageOnInvoice: string;
  messageOnStatement: string;
  terms: string;
  salesRep?: string;
  tags?: string[];
  subTotal: number;
  total: number;
  balanceDue: number;
  otherFees?: OtherFees;
}
