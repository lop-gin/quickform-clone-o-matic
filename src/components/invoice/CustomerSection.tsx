
import React from "react";
import { Customer } from "@/types/invoice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface CustomerSectionProps {
  customer: Customer;
  updateCustomer: (customer: Customer) => void;
}

export const CustomerSection: React.FC<CustomerSectionProps> = ({
  customer,
  updateCustomer,
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 border-b border-gray-200 pb-6">
      <div>
        <div className="flex items-center mb-1">
          <Label htmlFor="customer" className="text-sm font-medium text-gray-600 mr-1">Customer</Label>
          <HelpCircle className="h-4 w-4 text-gray-400" />
        </div>
        <div className="relative">
          <Button variant="outline" className="w-full justify-between font-normal text-gray-700">
            <span>Select a customer</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </div>
        <div className="mt-4">
          <div className="flex items-center mb-1">
            <Label htmlFor="billingAddress" className="text-sm font-medium text-gray-600 mr-1">Billing address</Label>
          </div>
          <Textarea 
            id="billingAddress"
            name="billing.street"
            className="min-h-[100px] resize-none text-sm"
            value={customer.billingAddress.street}
            onChange={handleCustomerChange}
          />
        </div>
      </div>
      
      <div>
        <div className="flex items-center mb-1">
          <Label htmlFor="email" className="text-sm font-medium text-gray-600 mr-1">Customer email</Label>
          <HelpCircle className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          id="email"
          name="email"
          type="email"
          className="w-full"
          value={customer.email}
          onChange={handleCustomerChange}
          placeholder="Separate emails with a comma"
        />
        <div className="flex items-center space-x-2 mt-2">
          <Checkbox id="sendLater" />
          <Label htmlFor="sendLater" className="text-sm text-gray-600">
            Send later
          </Label>
          <HelpCircle className="h-4 w-4 text-gray-400" />
        </div>
      </div>
      
      <div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center mb-1">
              <Label className="text-sm font-medium text-gray-600 mr-1">Invoice date</Label>
            </div>
            <Input
              type="text"
              className="w-full"
              value={format(new Date(), "dd/MM/yyyy")}
              placeholder="DD/MM/YYYY"
            />
          </div>
          <div>
            <div className="flex items-center mb-1">
              <Label className="text-sm font-medium text-gray-600 mr-1">Due date</Label>
            </div>
            <Input
              type="text"
              className="w-full"
              value={format(new Date(new Date().setDate(new Date().getDate() + 30)), "dd/MM/yyyy")}
              placeholder="DD/MM/YYYY"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center mb-1">
            <Label className="text-sm font-medium text-gray-600 mr-1">Terms</Label>
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </div>
          <div className="relative">
            <Button variant="outline" className="w-full justify-between font-normal text-gray-700">
              <span>Net 30</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <div className="flex items-center mb-1">
              <Label className="text-sm font-medium text-gray-600 mr-1">Sales Rep</Label>
            </div>
            <Input
              type="text"
              className="w-full"
              placeholder=""
            />
          </div>
          <div>
            <div className="flex items-center mb-1">
              <Label className="text-sm font-medium text-gray-600 mr-1">Invoice no.</Label>
            </div>
            <Input
              type="text"
              className="w-full"
              value={invoice.invoiceNumber}
              onChange={(e) => updateCustomer({...customer})}
              placeholder=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
