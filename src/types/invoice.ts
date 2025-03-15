
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Customer {
  name: string;
  email: string;
  billingAddress: Address;
  shippingAddress: Address;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface InvoiceType {
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate: Date;
  customer: Customer;
  items: InvoiceItem[];
  notes: string;
  terms: string;
  discountType: "percentage" | "amount";
  discountValue: number;
  taxRate: number;
  subTotal: number;
  discount: number;
  tax: number;
  total: number;
}
