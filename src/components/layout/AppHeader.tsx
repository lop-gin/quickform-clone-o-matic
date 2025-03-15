
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, Search, User } from "lucide-react";

export const AppHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center h-16 max-w-6xl">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="text-2xl font-semibold text-qb-green">QBClone</div>
          <nav className="hidden lg:flex space-x-6 ml-10">
            <a href="#" className="text-gray-700 hover:text-qb-green text-sm font-medium">Dashboard</a>
            <a href="#" className="text-gray-700 hover:text-qb-green text-sm font-medium">Customers</a>
            <a href="#" className="text-qb-green border-b-2 border-qb-green pb-5 text-sm font-medium">Invoices</a>
            <a href="#" className="text-gray-700 hover:text-qb-green text-sm font-medium">Expenses</a>
            <a href="#" className="text-gray-700 hover:text-qb-green text-sm font-medium">Reports</a>
          </nav>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
