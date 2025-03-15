
import { InvoiceForm } from "@/components/invoice/InvoiceForm";
import { AppLayout } from "@/components/layout/AppLayout";

const Index = () => {
  return (
    <AppLayout>
      <div className="w-full mx-auto">
        <InvoiceForm />
      </div>
    </AppLayout>
  );
};

export default Index;
