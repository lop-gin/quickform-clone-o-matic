
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InvoiceType } from "@/types/invoice";

interface InvoiceSummaryProps {
  invoice: InvoiceType;
  updateInvoice: (updates: Partial<InvoiceType>) => void;
}

export const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({
  invoice,
  updateInvoice,
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="font-medium text-gray-700 mb-4">Summary</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${invoice.subTotal.toFixed(2)}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="discount" className="text-sm text-gray-600">Discount</Label>
            <div className="flex items-center space-x-2">
              <Select
                value={invoice.discountType}
                onValueChange={(value) => updateInvoice({ discountType: value as "percentage" | "amount" })}
              >
                <SelectTrigger className="w-28 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="relative w-20">
                {invoice.discountType === "percentage" && (
                  <span className="absolute right-2 top-1 text-gray-500">%</span>
                )}
                {invoice.discountType === "amount" && (
                  <span className="absolute left-2 top-1 text-gray-500">$</span>
                )}
                <Input
                  id="discount"
                  className="h-8 text-xs text-right pr-7"
                  type="number"
                  value={invoice.discountValue}
                  onChange={(e) => 
                    updateInvoice({ 
                      discountValue: parseFloat(e.target.value) || 0 
                    })
                  }
                  min="0"
                  step={invoice.discountType === "percentage" ? "1" : "0.01"}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span></span>
            <span className="text-gray-600">-${invoice.discount.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="border-t border-b border-gray-200 py-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="taxRate" className="text-sm text-gray-600">Tax</Label>
            <div className="relative w-20">
              <span className="absolute right-2 top-1 text-gray-500">%</span>
              <Input
                id="taxRate"
                className="h-8 text-xs text-right pr-7"
                type="number"
                value={invoice.taxRate}
                onChange={(e) => 
                  updateInvoice({ 
                    taxRate: parseFloat(e.target.value) || 0 
                  })
                }
                min="0"
                step="0.1"
              />
            </div>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <span></span>
            <span className="text-gray-600">${invoice.tax.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center font-semibold">
          <span>Total</span>
          <span className="text-lg">${invoice.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
