
import React from "react";
import { AppHeader } from "./AppHeader";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-4 mt-8">
        <div className="container mx-auto px-4 max-w-6xl text-sm text-gray-500">
          <p>© 2023 QuickBooks Clone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
