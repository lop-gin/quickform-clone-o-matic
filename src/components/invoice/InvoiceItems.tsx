
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InvoiceItem } from "@/types/invoice";
import { FilePlus, Trash2 } from "lucide-react";

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
    if (field === "quantity" || field === "unitPrice") {
      updateItem(itemId, { [field]: parseFloat(value as string) || 0 });
    } else {
      updateItem(itemId, { [field]: value });
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Items</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="qb-table-header text-left w-2/5">ITEM DESCRIPTION</th>
              <th className="qb-table-header text-right">QTY</th>
              <th className="qb-table-header text-right">PRICE</th>
              <th className="qb-table-header text-right">AMOUNT</th>
              <th className="qb-table-header text-center w-12"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="qb-table-cell">
                  <Input
                    className="border-none focus:ring-0 p-1"
                    value={item.description}
                    onChange={(e) =>
                      handleInputChange(item.id, "description", e.target.value)
                    }
                    placeholder="Enter item description"
                  />
                </td>
                <td className="qb-table-cell">
                  <Input
                    className="border-none focus:ring-0 p-1 text-right"
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleInputChange(item.id, "quantity", e.target.value)
                    }
                    min="1"
                    step="1"
                  />
                </td>
                <td className="qb-table-cell">
                  <div className="relative">
                    <span className="absolute left-2 top-1 text-gray-500">$</span>
                    <Input
                      className="border-none focus:ring-0 p-1 pl-5 text-right"
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) =>
                        handleInputChange(item.id, "unitPrice", e.target.value)
                      }
                      min="0"
                      step="0.01"
                    />
                  </div>
                </td>
                <td className="qb-table-cell text-right">
                  ${(item.quantity * item.unitPrice).toFixed(2)}
                </td>
                <td className="qb-table-cell">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-0 text-gray-500"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4">
        <Button
          variant="outline"
          className="text-qb-blue border-dashed border-qb-blue hover:bg-qb-blue-light"
          onClick={addItem}
        >
          <FilePlus className="mr-2 h-4 w-4" />
          Add Line
        </Button>
      </div>
    </div>
  );
};
