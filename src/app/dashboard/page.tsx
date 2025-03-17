
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Receipt } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Sales Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-medium mb-4">Create New Document</h2>
          <div className="flex flex-col space-y-3">
            <Link href="/dashboard/sales/invoice">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Create Invoice
              </Button>
            </Link>
            <Link href="/dashboard/sales/receipt">
              <Button className="w-full justify-start" variant="outline">
                <Receipt className="h-4 w-4 mr-2" />
                Create Sales Receipt
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
