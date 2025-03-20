
import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { CustomerSection } from "@/components/forms/CustomerSection";
import { FormMessage } from "@/components/forms/FormMessage";
import { FormActions } from "@/components/forms/FormActions";
import { OutstandingInvoicesTable } from "@/components/payment/OutstandingInvoicesTable";
import { PaymentSummary } from "@/components/payment/PaymentSummary";
import { AmountReceivedInput } from "@/components/payment/AmountReceivedInput";
import { usePaymentForm } from "@/hooks/usePaymentForm";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

export const PaymentForm: React.FC = () => {
  const {
    payment,
    updateCustomer,
    updatePaymentDate,
    updateAmountReceived,
    toggleInvoiceSelection,
    updateInvoicePayment,
    clearPayment,
    savePayment,
    totalOpenBalance
  } = usePaymentForm();

  const [isCustomerSelected, setIsCustomerSelected] = useState(false);

  const handleCustomerSelect = (customerName: string) => {
    setIsCustomerSelected(!!customerName);
  };

  const handleSave = () => {
    savePayment();
    toast.success("Payment saved successfully");
  };

  const handleSaveAndNew = () => {
    savePayment();
    clearPayment();
    toast.success("Payment saved successfully. New payment form ready.");
  };

  // Create a document object that meets the Document interface requirements
  // to pass to CustomerSection
  const documentForCustomer = {
    customer: payment.customer,
    // Add required Document properties
    items: [],
    messageOnInvoice: "",
    messageOnStatement: "",
    subTotal: 0,
    total: 0,
    balanceDue: 0
  };

  return (
    <div className="relative pb-20">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Receive Payment</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
        {/* Left Column - Customer Information */}
        <div className="md:col-span-5">
          <CustomerSection
            customer={payment.customer}
            document={documentForCustomer}
            updateCustomer={updateCustomer}
            updateDocument={() => {}}
            onCustomerSelect={handleCustomerSelect}
          />
        </div>

        {/* Middle Column - Payment Date */}
        <div className="md:col-span-3">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-600">
                Payment Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal h-9 text-xs",
                      !payment.paymentDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {payment.paymentDate ? (
                      format(payment.paymentDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={payment.paymentDate}
                    onSelect={(date) => date && updatePaymentDate(date)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Right Column - Amount Received */}
        <div className="md:col-span-4">
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 h-full flex flex-col">
            <div className="text-center mb-4">
              <div className="text-xs text-gray-500">Amount Received</div>
              <div className="text-2xl font-bold text-gray-800">
                Ksh{payment.amountReceived.toFixed(2)}
              </div>
            </div>
            
            <AmountReceivedInput 
              amount={payment.amountReceived} 
              onChange={updateAmountReceived} 
            />
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Only show outstanding invoices when a customer is selected */}
      {isCustomerSelected && (
        <>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Outstanding Invoices</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
            <div className="md:col-span-9">
              <OutstandingInvoicesTable
                invoices={payment.outstandingInvoices}
                onToggleSelection={toggleInvoiceSelection}
                onUpdatePayment={updateInvoicePayment}
              />
            </div>
            <div className="md:col-span-3">
              <PaymentSummary
                amountToApply={payment.amountToApply}
                amountToCredit={payment.amountToCredit}
                onClearPayment={clearPayment}
              />
            </div>
          </div>

          <Separator className="my-6" />
        </>
      )}

      {/* Message Section */}
      <div className="mt-6">
        <FormMessage
          message={payment.message}
          onChange={(message) => {
            // Update the message
            const updatedPayment = { ...payment, message };
            savePayment();
          }}
          label="MESSAGE ON PAYMENT"
          placeholder="Add a note to this payment"
        />
      </div>

      {/* Action Buttons */}
      <FormActions
        onSave={handleSave}
        onClear={clearPayment}
        onSaveAndNew={handleSaveAndNew}
        formType="payment"
      />
    </div>
  );
};

export default PaymentForm;
