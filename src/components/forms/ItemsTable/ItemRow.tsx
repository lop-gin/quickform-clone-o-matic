
import React from "react";
import { DocumentItem } from "@/types/document";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/document-utils";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface ItemRowProps {
  item: DocumentItem;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<DocumentItem>) => void;
  onRemove: () => void;
}

export const ItemRow: React.FC<ItemRowProps> = ({
  item,
  index,
  isSelected,
  onSelect,
  onUpdate,
  onRemove,
}) => {
  const handleInputChange = (field: keyof DocumentItem, value: string | number) => {
    // For number fields, convert the string value to a number
    if (field === "quantity" || field === "rate" || field === "taxPercent" || field === "unitPrice") {
      onUpdate({ [field]: value === "" ? undefined : parseFloat(value as string) || 0 });
    } else {
      onUpdate({ [field]: value });
    }
  };

  // Custom input handler to restrict input to numbers and decimals only
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>, field: keyof DocumentItem) => {
    const value = e.target.value;
    
    // Allow empty values, numbers, and only one decimal point
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      handleInputChange(field, value);
    }
  };

  return (
    <tr 
      className={cn(
        "border-b hover:bg-gray-50 transition-colors",
        isSelected ? "bg-blue-50" : ""
      )}
      onClick={onSelect}
    >
      <td className="text-center py-1 text-gray-500 w-8 border-r">{index + 1}</td>
      <td className="py-1 border-r">
        {isSelected ? (
          <Select
            onValueChange={(value) => handleInputChange("category", value)}
            value={item.category || ""}
          >
            <SelectTrigger 
              className="w-full h-8 font-normal text-gray-700 focus:ring-0 focus:border-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
            >
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="category1">Category 1</SelectItem>
              <SelectItem value="category2">Category 2</SelectItem>
              <SelectItem value="category3">Category 3</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <div className="py-1 px-1 text-left">{item.category || ''}</div>
        )}
      </td>
      <td className="py-1 border-r">
        {isSelected ? (
          <Select
            onValueChange={(value) => handleInputChange("product", value)}
            value={item.product || ""}
          >
            <SelectTrigger 
              className="w-full h-8 font-normal text-gray-700 focus:ring-0 focus:border-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
            >
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="product1">Product 1</SelectItem>
              <SelectItem value="product2">Product 2</SelectItem>
              <SelectItem value="service1">Service 1</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <div className="py-1 px-1 text-left">{item.product || ''}</div>
        )}
      </td>
      <td className="py-1 border-r">
        {isSelected ? (
          <Input
            className="border-gray-200 h-8 focus:ring-0 focus:ring-offset-0 focus:border-gray-300"
            value={item.description || ""}
            onChange={(e) => handleInputChange("description", e.target.value)}
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          />
        ) : (
          <div className="py-1 px-1 text-left">{item.description || ''}</div>
        )}
      </td>
      <td className="py-1 border-r">
        {isSelected ? (
          <Input
            className="border-gray-200 text-right h-8 focus:ring-0 focus:ring-offset-0 focus:border-gray-300"
            value={item.quantity === undefined ? "" : item.quantity}
            onChange={(e) => handleNumberInput(e, "quantity")}
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            type="text"
            inputMode="decimal"
          />
        ) : (
          <div className="text-right py-1 px-1">{item.quantity || ''}</div>
        )}
      </td>
      <td className="py-1 border-r text-right">
        {isSelected ? (
          <Select
            onValueChange={(value) => handleInputChange("unit", value)}
            value={item.unit || ""}
          >
            <SelectTrigger 
              className="w-full h-8 font-normal text-gray-700 focus:ring-0 focus:border-gray-300 text-right"
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
            >
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ea">Each</SelectItem>
              <SelectItem value="hr">Hour</SelectItem>
              <SelectItem value="kg">Kilogram</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <div className="py-1 px-1 text-right">{item.unit || ''}</div>
        )}
      </td>
      <td className="py-1 border-r">
        {isSelected ? (
          <Input
            className="border-gray-200 text-right h-8 focus:ring-0 focus:ring-offset-0 focus:border-gray-300"
            value={item.unitPrice === undefined ? "" : item.unitPrice}
            onChange={(e) => handleNumberInput(e, "unitPrice")}
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            type="text"
            inputMode="decimal"
          />
        ) : (
          <div className="text-right py-1 px-1">{item.unitPrice ? formatCurrency(item.unitPrice) : ''}</div>
        )}
      </td>
      <td className="py-1 border-r">
        {isSelected ? (
          <Input
            className="border-gray-200 text-right h-8 focus:ring-0 focus:ring-offset-0 focus:border-gray-300"
            value={item.taxPercent === undefined ? "" : item.taxPercent}
            onChange={(e) => handleNumberInput(e, "taxPercent")}
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            type="text"
            inputMode="decimal"
          />
        ) : (
          <div className="text-right py-1 px-1">{item.taxPercent ? `${item.taxPercent}%` : ''}</div>
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
            onRemove();
          }}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </td>
    </tr>
  );
};
