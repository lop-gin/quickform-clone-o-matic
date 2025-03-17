
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DocumentItem, OtherFees } from "@/types/invoice";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/invoice-utils";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface ItemsTableProps {
  items: DocumentItem[];
  addItem: () => void;
  updateItem: (itemId: string, updates: Partial<DocumentItem>) => void;
  removeItem: (itemId: string) => void;
  clearAllItems: () => void;
  otherFees: OtherFees;
  updateOtherFees: (updates: Partial<OtherFees>) => void;
}

export const ItemsTable: React.FC<ItemsTableProps> = ({
  items,
  addItem,
  updateItem,
  removeItem,
  clearAllItems,
  otherFees,
  updateOtherFees
}) => {
  const handleInputChange = (
    itemId: string,
    field: keyof DocumentItem,
    value: string | number
  ) => {
    // For number fields, convert the string value to a number
    if (field === "quantity" || field === "rate" || field === "taxPercent" || field === "unitPrice") {
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
    <div className="mt-4 pb-4">
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 bg-white">
          <thead>
            <tr className="text-xs text-gray-600 border-b bg-gray-50">
              <th className="text-center w-8 py-1.5 border-r">
                <span className="text-[11px]">#</span>
              </th>
              <th className="text-left py-1.5 w-[10%] border-r">
                <span className="text-[11px]">CATEGORY</span>
              </th>
              <th className="text-left py-1.5 w-[15%] border-r">
                <span className="text-[11px]">PRODUCT/SERVICE</span>
              </th>
              <th className="text-left py-1.5 w-[25%] border-r">
                <span className="text-[11px]">DESCRIPTION</span>
              </th>
              <th className="text-right py-1.5 w-[8%] border-r">
                <span className="text-[11px]">QTY</span>
              </th>
              <th className="text-left py-1.5 w-[10%] border-r">
                <span className="text-[11px]">UNIT</span>
              </th>
              <th className="text-right py-1.5 w-[10%] border-r">
                <span className="text-[11px]">UNIT PRICE</span>
              </th>
              <th className="text-right py-1.5 w-[8%] border-r">
                <span className="text-[11px]">TAX %</span>
              </th>
              <th className="text-right py-1.5 w-[10%] border-r">
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
                <td className="text-center py-1 text-gray-500 w-8 border-r">{index + 1}</td>
                <td className="py-1 border-r">
                  {selectedRow === item.id ? (
                    <Select
                      onValueChange={(value) => handleInputChange(item.id, "category", value)}
                      value={item.category}
                    >
                      <SelectTrigger 
                        className="w-full h-8 font-normal text-gray-700 focus:ring-0 focus:border-gray-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRow(item.id);
                        }}
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="category1">Category 1</SelectItem>
                        <SelectItem value="category2">Category 2</SelectItem>
                        <SelectItem value="category3">Category 3</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="py-1 px-1 text-left">{item.category || '-'}</div>
                  )}
                </td>
                <td className="py-1 border-r">
                  {selectedRow === item.id ? (
                    <Select
                      onValueChange={(value) => handleInputChange(item.id, "product", value)}
                      value={item.product}
                    >
                      <SelectTrigger 
                        className="w-full h-8 font-normal text-gray-700 focus:ring-0 focus:border-gray-300"
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
                  ) : (
                    <div className="py-1 px-1 text-left">{item.product || '-'}</div>
                  )}
                </td>
                <td className="py-1 border-r">
                  {selectedRow === item.id ? (
                    <Input
                      className="border-gray-200 h-8 focus:ring-0 focus:ring-offset-0 focus:border-gray-300"
                      value={item.description}
                      onChange={(e) =>
                        handleInputChange(item.id, "description", e.target.value)
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRow(item.id);
                      }}
                    />
                  ) : (
                    <div className="py-1 px-1 text-left">{item.description || '-'}</div>
                  )}
                </td>
                <td className="py-1 border-r">
                  {selectedRow === item.id ? (
                    <Input
                      className="border-gray-200 text-right h-8 focus:ring-0 focus:ring-offset-0 focus:border-gray-300"
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
                  ) : (
                    <div className="text-right py-1 px-1">{item.quantity}</div>
                  )}
                </td>
                <td className="py-1 border-r">
                  {selectedRow === item.id ? (
                    <Select
                      onValueChange={(value) => handleInputChange(item.id, "unit", value)}
                      value={item.unit}
                    >
                      <SelectTrigger 
                        className="w-full h-8 font-normal text-gray-700 focus:ring-0 focus:border-gray-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRow(item.id);
                        }}
                      >
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ea">Each</SelectItem>
                        <SelectItem value="hr">Hour</SelectItem>
                        <SelectItem value="kg">Kilogram</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="py-1 px-1">{item.unit || '-'}</div>
                  )}
                </td>
                <td className="py-1 border-r">
                  {selectedRow === item.id ? (
                    <Input
                      className="border-gray-200 text-right h-8 focus:ring-0 focus:ring-offset-0 focus:border-gray-300"
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) =>
                        handleInputChange(item.id, "unitPrice", e.target.value)
                      }
                      min="0"
                      step="0.01"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRow(item.id);
                      }}
                    />
                  ) : (
                    <div className="text-right py-1 px-1">{formatCurrency(item.unitPrice || 0)}</div>
                  )}
                </td>
                <td className="py-1 border-r">
                  {selectedRow === item.id ? (
                    <Input
                      className="border-gray-200 text-right h-8 focus:ring-0 focus:ring-offset-0 focus:border-gray-300"
                      type="number"
                      value={item.taxPercent}
                      onChange={(e) =>
                        handleInputChange(item.id, "taxPercent", e.target.value)
                      }
                      min="0"
                      max="100"
                      step="0.1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRow(item.id);
                      }}
                    />
                  ) : (
                    <div className="text-right py-1 px-1">{item.taxPercent || 0}%</div>
                  )}
                </td>
                <td className="py-1 text-right px-1 border-r">
                  {formatCurrency(
                    (item.quantity || 0) * (item.unitPrice || 0) * (1 + ((item.taxPercent || 0) / 100))
                  )}
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
      
      <Separator className="mt-4 mb-4 w-full bg-gray-300" />
      
      <div className="flex justify-between mb-8">
        <div className="w-1/2 flex items-start space-x-3">
          <div className="w-2/3">
            <Label className="text-xs font-medium text-gray-600 mb-1">Other Fees Description</Label>
            <Input
              className="text-xs"
              value={otherFees.description}
              onChange={(e) => updateOtherFees({ description: e.target.value })}
              placeholder="Describe additional fees"
            />
          </div>
          <div className="w-1/3">
            <Label className="text-xs font-medium text-gray-600 mb-1">Fee Amount</Label>
            <Input
              className="text-xs text-right"
              type="number"
              min="0"
              step="0.01"
              value={otherFees.amount}
              onChange={(e) => updateOtherFees({ amount: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>
        
        <div className="w-64 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">
              {formatCurrency(items.reduce((sum, item) => sum + (item.quantity || 0) * (item.unitPrice || 0), 0))}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">
              {formatCurrency(items.reduce((sum, item) => {
                const itemAmount = (item.quantity || 0) * (item.unitPrice || 0);
                const taxAmount = itemAmount * ((item.taxPercent || 0) / 100);
                return sum + taxAmount;
              }, 0))}
            </span>
          </div>
          {otherFees.amount > 0 && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">Other Fees</span>
              <span className="font-medium">{formatCurrency(otherFees.amount)}</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="text-gray-700 font-medium text-xs">Total</span>
            <span className="font-semibold text-sm">
              {formatCurrency(
                items.reduce((sum, item) => {
                  const itemAmount = (item.quantity || 0) * (item.unitPrice || 0);
                  const taxAmount = itemAmount * ((item.taxPercent || 0) / 100);
                  return sum + itemAmount + taxAmount;
                }, 0) + otherFees.amount
              )}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="text-gray-700 font-medium text-xs">Balance due</span>
            <span className="font-bold text-sm">
              {formatCurrency(
                items.reduce((sum, item) => {
                  const itemAmount = (item.quantity || 0) * (item.unitPrice || 0);
                  const taxAmount = itemAmount * ((item.taxPercent || 0) / 100);
                  return sum + itemAmount + taxAmount;
                }, 0) + otherFees.amount
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
