import ServiceDetail from "@/components/ServiceDetail";
import Header from "@/components/Header";
import NewsBar from "@/components/NewsBar";
import Footer from "@/components/Footer";

interface ServicePageProps {
  params: {
    serviceId: string;
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <NewsBar />
      <Header />
      <main>
        <ServiceDetail serviceId={params.serviceId} />
      </main>
      <Footer />
    </div>
  );
}
