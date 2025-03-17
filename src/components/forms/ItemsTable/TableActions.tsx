
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TableActionsProps {
  onAddItem: () => void;
  onClearItems: () => void;
}

export const TableActions: React.FC<TableActionsProps> = ({
  onAddItem,
  onClearItems,
}) => {
  return (
    <div className="mt-4 flex space-x-2">
      <Button
        variant="outline"
        className="text-gray-700 border-gray-300 h-7 text-xs"
        onClick={onAddItem}
      >
        <Plus className="mr-1 h-3 w-3" />
        Add lines
      </Button>
      <Button
        variant="outline"
        className="text-gray-700 border-gray-300 h-7 text-xs"
        onClick={onClearItems}
      >
        Clear all lines
      </Button>
    </div>
  );
};
