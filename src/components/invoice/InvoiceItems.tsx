
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InvoiceItem } from "@/types/invoice";
import { Plus, Trash2, Calendar, ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface InvoiceItemsProps {
  items: InvoiceItem[];
  addItem: () => void;
  updateItem: (itemId: string, updates: Partial<InvoiceItem>) => void;
  removeItem: (itemId: string) => void;
  clearAllItems: () => void;
}

export const InvoiceItems: React.FC<InvoiceItemsProps> = ({
  items,
  addItem,
  updateItem,
  removeItem,
  clearAllItems
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

  // Track the currently selected row
  const [selectedRow, setSelectedRow] = React.useState<string | null>(
    items.length > 0 ? items[0].id : null
  );

  return (
    <div className="mt-4 pb-20">
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
            {items.map((item, index) => (
              <tr 
                key={item.id} 
                className={cn(
                  "border-b hover:bg-gray-50 transition-colors",
                  selectedRow === item.id ? "bg-blue-50" : ""
                )}
                onClick={() => setSelectedRow(item.id)}
              >
                <td className="text-center py-1 text-gray-500 w-8">{index + 1}</td>
                <td className="py-1 w-32">
                  <div className="relative">
                    <Input
                      className={cn(
                        "w-full border-gray-200 h-8 focus:ring-0 focus:ring-offset-0 focus:border-gray-300",
                        selectedRow === item.id ? "ring-0 border-gray-300" : ""
                      )}
                      value={item.serviceDate || ""}
                      onChange={(e) =>
                        handleInputChange(item.id, "serviceDate", e.target.value)
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRow(item.id);
                      }}
                    />
                    <Button 
                      variant="ghost" 
                      className="absolute right-1 top-1 h-6 w-6 p-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Calendar className="h-3.5 w-3.5 text-gray-500" />
                    </Button>
                  </div>
                </td>
                <td className="py-1">
                  <div className="relative">
                    <Select
                      onValueChange={(value) => handleInputChange(item.id, "product", value)}
                      value={item.product}
                    >
                      <SelectTrigger 
                        className={cn(
                          "w-full h-8 font-normal text-gray-700 focus:ring-0 focus:border-gray-300",
                          selectedRow === item.id ? "ring-0 border-gray-300" : ""
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRow(item.id);
                        }}
                      >
                        <SelectValue placeholder="Select a product/service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product1">Product 1</SelectItem>
                        <SelectItem value="product2">Product 2</SelectItem>
                        <SelectItem value="service1">Service 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </td>
                <td className="py-1">
                  <Input
                    className={cn(
                      "border-gray-200 h-8 focus:ring-0 focus:ring-offset-0 focus:border-gray-300",
                      selectedRow === item.id ? "ring-0 border-gray-300" : ""
                    )}
                    value={item.description}
                    onChange={(e) =>
                      handleInputChange(item.id, "description", e.target.value)
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRow(item.id);
                    }}
                  />
                </td>
                <td className="py-1">
                  <Input
                    className={cn(
                      "border-gray-200 text-right h-8 focus:ring-0 focus:ring-offset-0 focus:border-gray-300",
                      selectedRow === item.id ? "ring-0 border-gray-300" : ""
                    )}
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleInputChange(item.id, "quantity", e.target.value)
                    }
                    min="1"
                    step="1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRow(item.id);
                    }}
                  />
                </td>
                <td className="py-1">
                  <Input
                    className={cn(
                      "border-gray-200 text-right h-8 focus:ring-0 focus:ring-offset-0 focus:border-gray-300",
                      selectedRow === item.id ? "ring-0 border-gray-300" : ""
                    )}
                    type="number"
                    value={item.rate}
                    onChange={(e) =>
                      handleInputChange(item.id, "rate", e.target.value)
                    }
                    min="0"
                    step="0.01"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRow(item.id);
                    }}
                  />
                </td>
                <td className="py-1 text-right">
                  {(item.quantity * item.rate).toFixed(2)}
                </td>
                <td className="py-1 text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0 text-gray-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item.id);
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </td>
              </tr>
            ))}
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
          onClick={clearAllItems}
        >
          Clear all lines
        </Button>
      </div>
    </div>
  );
};
