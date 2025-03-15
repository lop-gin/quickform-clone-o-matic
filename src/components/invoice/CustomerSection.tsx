
import React, { useState } from "react";
import { Customer } from "@/types/invoice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, User } from "lucide-react";

interface CustomerSectionProps {
  customer: Customer;
  updateCustomer: (customer: Customer) => void;
}

export const CustomerSection: React.FC<CustomerSectionProps> = ({
  customer,
  updateCustomer,
}) => {
  const [sameAddress, setSameAddress] = useState(true);
  
  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith("billing.")) {
      const billingField = name.replace("billing.", "");
      const updatedBillingAddress = {
        ...customer.billingAddress,
        [billingField]: value,
      };
      
      // If same address is checked, update shipping address too
      const updatedShippingAddress = sameAddress
        ? { ...updatedBillingAddress }
        : customer.shippingAddress;
      
      updateCustomer({
        ...customer,
        billingAddress: updatedBillingAddress,
        shippingAddress: updatedShippingAddress,
      });
    } else if (name.startsWith("shipping.")) {
      const shippingField = name.replace("shipping.", "");
      updateCustomer({
        ...customer,
        shippingAddress: {
          ...customer.shippingAddress,
          [shippingField]: value,
        },
      });
    } else {
      updateCustomer({
        ...customer,
        [name]: value,
      });
    }
  };

  const handleSameAddressChange = (checked: boolean) => {
    setSameAddress(checked);
    if (checked) {
      updateCustomer({
        ...customer,
        shippingAddress: { ...customer.billingAddress },
      });
    }
  };
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Customer Information</h2>
        <Button variant="outline" size="sm" className="flex items-center">
          <Search className="mr-1 h-4 w-4" />
          <span>Find Customer</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Details */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="qb-input-label">Customer Name</Label>
            <div className="relative">
              <Input
                id="name"
                name="name"
                className="qb-input pl-9"
                value={customer.name}
                onChange={handleCustomerChange}
                placeholder="Customer or Company Name"
              />
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email" className="qb-input-label">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              className="qb-input"
              value={customer.email}
              onChange={handleCustomerChange}
              placeholder="customer@example.com"
            />
          </div>
        </div>
        
        {/* Billing Address */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Billing Address</h3>
          
          <div>
            <Input
              name="billing.street"
              className="qb-input"
              value={customer.billingAddress.street}
              onChange={handleCustomerChange}
              placeholder="Street Address"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Input
              name="billing.city"
              className="qb-input"
              value={customer.billingAddress.city}
              onChange={handleCustomerChange}
              placeholder="City"
            />
            <Input
              name="billing.state"
              className="qb-input"
              value={customer.billingAddress.state}
              onChange={handleCustomerChange}
              placeholder="State / Province"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Input
              name="billing.zipCode"
              className="qb-input"
              value={customer.billingAddress.zipCode}
              onChange={handleCustomerChange}
              placeholder="Zip / Postal Code"
            />
            <Input
              name="billing.country"
              className="qb-input"
              value={customer.billingAddress.country}
              onChange={handleCustomerChange}
              placeholder="Country"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="sameAddress" 
              checked={sameAddress} 
              onCheckedChange={handleSameAddressChange} 
            />
            <Label htmlFor="sameAddress" className="text-sm text-gray-600">
              Shipping address same as billing
            </Label>
          </div>
        </div>
        
        {/* Shipping Address (conditionally displayed) */}
        {!sameAddress && (
          <div className="space-y-4 lg:col-start-2">
            <h3 className="font-medium text-gray-700">Shipping Address</h3>
            
            <div>
              <Input
                name="shipping.street"
                className="qb-input"
                value={customer.shippingAddress.street}
                onChange={handleCustomerChange}
                placeholder="Street Address"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Input
                name="shipping.city"
                className="qb-input"
                value={customer.shippingAddress.city}
                onChange={handleCustomerChange}
                placeholder="City"
              />
              <Input
                name="shipping.state"
                className="qb-input"
                value={customer.shippingAddress.state}
                onChange={handleCustomerChange}
                placeholder="State / Province"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Input
                name="shipping.zipCode"
                className="qb-input"
                value={customer.shippingAddress.zipCode}
                onChange={handleCustomerChange}
                placeholder="Zip / Postal Code"
              />
              <Input
                name="shipping.country"
                className="qb-input"
                value={customer.shippingAddress.country}
                onChange={handleCustomerChange}
                placeholder="Country"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
