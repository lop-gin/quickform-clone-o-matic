
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InvoiceItem } from "@/types/invoice";
import { Plus, Trash2, Calendar, ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InvoiceItemsProps {
  items: InvoiceItem[];
  addItem: () => void;
  updateItem: (itemId: string, updates: Partial<InvoiceItem>) => void;
  removeItem: (itemId: string) => void;
}

export const InvoiceItems: React.FC<InvoiceItemsProps> = ({
  items,
  addItem,
  updateItem,
  removeItem,
}) => {
  const handleInputChange = (
    itemId: string,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    // For number fields, convert the string value to a number
    if (field === "quantity" || field === "rate") {
      updateItem(itemId, { [field]: parseFloat(value as string) || 0 });
    } else {
      updateItem(itemId, { [field]: value });
    }
  };

  return (
    <div className="mt-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-600 border-b">
              <th className="text-center w-8 py-1.5">
                <span className="text-[11px]">#</span>
              </th>
              <th className="text-left py-1.5">
                <span className="text-[11px]">SERVICE DATE</span>
              </th>
              <th className="text-left py-1.5">
                <div className="flex items-center">
                  <span className="text-[11px]">PRODUCT/SERVICE</span>
                  <HelpCircle className="h-3 w-3 text-gray-400 ml-1" />
                </div>
              </th>
              <th className="text-left py-1.5">
                <span className="text-[11px]">DESCRIPTION</span>
              </th>
              <th className="text-right py-1.5">
                <span className="text-[11px]">QTY</span>
              </th>
              <th className="text-right py-1.5">
                <span className="text-[11px]">RATE</span>
              </th>
              <th className="text-right py-1.5">
                <span className="text-[11px]">AMOUNT</span>
              </th>
              <th className="text-center w-8 py-1.5"></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No items yet. Click "Add lines" to add an item.
                </td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="text-center py-2 text-gray-500">{index + 1}</td>
                  <td className="py-2 w-32">
                    <div className="relative">
                      <Input
                        className="w-full border-gray-200 h-9"
                        value={item.serviceDate || ""}
                        onChange={(e) =>
                          handleInputChange(item.id, "serviceDate", e.target.value)
                        }
                      />
                      <Button 
                        variant="ghost" 
                        className="absolute right-1 top-1 h-7 w-7 p-0"
                      >
                        <Calendar className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  </td>
                  <td className="py-2">
                    <div className="relative">
                      <Button
                        variant="outline"
                        className="w-full justify-between h-9 font-normal text-gray-700"
                      >
                        <span>Select a product/service</span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </div>
                  </td>
                  <td className="py-2">
                    <Input
                      className="border-gray-200 h-9"
                      value={item.description}
                      onChange={(e) =>
                        handleInputChange(item.id, "description", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-2">
                    <Input
                      className="border-gray-200 text-right h-9"
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleInputChange(item.id, "quantity", e.target.value)
                      }
                      min="1"
                      step="1"
                    />
                  </td>
                  <td className="py-2">
                    <Input
                      className="border-gray-200 text-right h-9"
                      type="number"
                      value={item.rate}
                      onChange={(e) =>
                        handleInputChange(item.id, "rate", e.target.value)
                      }
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="py-2 text-right">
                    {(item.quantity * item.rate).toFixed(2)}
                  </td>
                  <td className="py-2 text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 p-0 text-gray-500"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex space-x-2">
        <Button
          variant="outline"
          className="text-gray-700 border-gray-300 h-7 text-xs"
          onClick={addItem}
        >
          <Plus className="mr-1 h-3 w-3" />
          Add lines
        </Button>
        <Button
          variant="outline"
          className="text-gray-700 border-gray-300 h-7 text-xs"
        >
          Clear all lines
        </Button>
        <Button
          variant="outline"
          className="text-gray-700 border-gray-300 h-7 text-xs"
        >
          Add subtotal
        </Button>
      </div>
    </div>
  );
};
