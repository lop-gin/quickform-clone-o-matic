
import React from "react";
import { Customer, Document } from "@/types/invoice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface CustomerSectionProps {
  customer: Customer;
  document: Document;
  updateCustomer: (customer: Customer) => void;
  updateDocument: (updates: Partial<Document>) => void;
}

export const CustomerSection: React.FC<CustomerSectionProps> = ({
  customer,
  document,
  updateCustomer,
  updateDocument,
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
    <div className="pb-5">
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="flex items-center mb-1">
              <Label htmlFor="customer" className="text-xs font-medium text-gray-600 mr-1">Customer</Label>
              <HelpCircle className="h-3 w-3 text-gray-400" />
            </div>
            <div className="relative">
              <Button variant="outline" className="w-full justify-between font-normal text-gray-700 text-xs h-9">
                <span>Select a customer</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-1">
              <Label htmlFor="company" className="text-xs font-medium text-gray-600 mr-1">Company</Label>
              <HelpCircle className="h-3 w-3 text-gray-400" />
            </div>
            <Input
              id="company"
              name="company"
              type="text"
              className="w-full text-xs h-9"
              value={customer.company || ""}
              onChange={handleCustomerChange}
              placeholder="Company name"
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
            className="w-full text-xs h-9"
            value={customer.email}
            onChange={handleCustomerChange}
            placeholder="Separate emails with a comma"
          />
        </div>

        <div>
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
      <Separator className="mt-5 mb-0 w-full bg-gray-200" />
    </div>
  );
};
