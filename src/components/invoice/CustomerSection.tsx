
import React from "react";
import { Customer, InvoiceType } from "@/types/invoice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

interface CustomerSectionProps {
  customer: Customer;
  invoice: InvoiceType;
  updateCustomer: (customer: Customer) => void;
  updateInvoice: (updates: Partial<InvoiceType>) => void;
}

export const CustomerSection: React.FC<CustomerSectionProps> = ({
  customer,
  invoice,
  updateCustomer,
  updateInvoice,
}) => {
  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith("billing.")) {
      const billingField = name.replace("billing.", "");
      updateCustomer({
        ...customer,
        billingAddress: {
          ...customer.billingAddress,
          [billingField]: value,
        },
      });
    } else {
      updateCustomer({
        ...customer,
        [name]: value,
      });
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5 border-b border-gray-200 pb-5">
      <div>
        <div className="flex items-center mb-1">
          <Label htmlFor="customer" className="text-xs font-medium text-gray-600 mr-1">Customer</Label>
          <HelpCircle className="h-3 w-3 text-gray-400" />
        </div>
        <div className="relative">
          <Button variant="outline" className="w-full justify-between font-normal text-gray-700 text-xs h-8">
            <span>Select a customer</span>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </div>
        <div className="mt-3">
          <div className="flex items-center mb-1">
            <Label htmlFor="billingAddress" className="text-xs font-medium text-gray-600 mr-1">Billing address</Label>
          </div>
          <Textarea 
            id="billingAddress"
            name="billing.street"
            className="min-h-[80px] resize-none text-xs"
            value={customer.billingAddress.street}
            onChange={handleCustomerChange}
          />
        </div>
      </div>
      
      <div>
        <div className="flex items-center mb-1">
          <Label htmlFor="email" className="text-xs font-medium text-gray-600 mr-1">Customer email</Label>
          <HelpCircle className="h-3 w-3 text-gray-400" />
        </div>
        <Input
          id="email"
          name="email"
          type="email"
          className="w-full text-xs"
          value={customer.email}
          onChange={handleCustomerChange}
          placeholder="Separate emails with a comma"
        />
      </div>
      
      <div>
        <div className="flex items-center mb-1">
          <Label className="text-xs font-medium text-gray-600 mr-1">Sales Rep</Label>
        </div>
        <Input
          type="text"
          className="w-full text-xs"
          placeholder=""
          value={invoice.salesRep || ""}
          onChange={(e) => updateInvoice({ salesRep: e.target.value })}
        />
      </div>
    </div>
  );
};
