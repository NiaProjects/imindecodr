import ServiceDetail from "@/components/ServiceDetail";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ServicePageProps {
  params: {
    serviceId: string;
  };
}



export default function ServicePage({ params }: ServicePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ServiceDetail serviceId={params.serviceId} />
      </main>
      <Footer />
    </div>
  );
}
