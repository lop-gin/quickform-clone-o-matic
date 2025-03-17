
import React from "react";
import { InvoiceType } from "@/types/document";
import { formatCurrency } from "@/lib/document-utils";

interface InvoiceSummaryProps {
  invoice: InvoiceType;
}

export const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({
  invoice,
}) => {
  return (
    <div className="ml-auto text-right space-y-2 w-full max-w-xs">
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-600">Total</span>
        <span className="font-medium">Ksh{formatCurrency(invoice.total || 0)}</span>
      </div>
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
        <span className="text-gray-600 text-xs">Balance due</span>
        <span className="font-semibold text-sm">Ksh{formatCurrency(invoice.balanceDue || 0)}</span>
      </div>
    </div>
  );
};

