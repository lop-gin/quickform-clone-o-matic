
# Project Structure

This project follows a modular and organized structure to create a scalable and maintainable application for managing invoices and sales receipts. Here's a breakdown of the key directories and files:

## Directory Structure

```
src/
├── app/
│   └── dashboard/
│       ├── layout.tsx              # Dashboard layout with header and main content
│       ├── page.tsx                # Main dashboard page with links to forms
│       └── sales/
│           ├── invoice/
│           │   └── page.tsx        # Invoice form page
│           └── receipt/
│               └── page.tsx        # Sales receipt form page
├── components/
│   ├── forms/
│   │   ├── ItemsTable/             # Modular components for items table
│   │   │   ├── index.tsx           # Main table component
│   │   │   ├── ItemRow.tsx         # Individual row component
│   │   │   ├── TableHeader.tsx     # Table header component
│   │   │   ├── TableActions.tsx    # Actions for table (add/clear items)
│   │   │   ├── OtherFees.tsx       # Other fees input section
│   │   │   └── DocumentSummary.tsx # Summary with totals
│   │   ├── InvoiceForm.tsx         # Invoice form component
│   │   ├── SalesReceiptForm.tsx    # Sales receipt form component
│   │   ├── CustomerSection.tsx     # Customer information section
│   │   ├── DateFields.tsx          # Date field components
│   │   ├── DocumentTotal.tsx       # Document total display
│   │   ├── FormHeader.tsx          # Header for forms
│   │   ├── FormActions.tsx         # Form action buttons
│   │   └── FormMessage.tsx         # Message field for documents
│   └── ui/                         # UI components (shadcn)
├── hooks/
│   ├── useDocumentForm.ts          # Generic hook for document forms
│   ├── useInvoiceForm.ts           # Invoice-specific form hook
│   └── useSalesReceiptForm.ts      # Sales receipt-specific form hook
├── lib/
│   ├── document-utils.ts           # Utility functions for documents
│   └── utils.ts                    # Generic utility functions
└── types/
    └── document.ts                 # TypeScript type definitions
```

## Key Features

1. **Modular Components**: Each component has a single responsibility, making the code easy to understand and maintain.
2. **Reusable Form Logic**: Generic form handling through `useDocumentForm` hook.
3. **Type Safety**: Comprehensive TypeScript types for all data structures.
4. **Consistent UI**: Consistent styling and user experience across different forms.
5. **Responsive Design**: Works well on desktop and mobile devices.
