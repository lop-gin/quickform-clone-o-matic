
import { InvoiceForm } from "@/components/invoice/InvoiceForm";
import { AppLayout } from "@/components/layout/AppLayout";

const Index = () => {
  return (
    <AppLayout>
      <div className="max-w-[1000px] mx-auto">
        <InvoiceForm />
      </div>
    </AppLayout>
  );
};

export default Index;
