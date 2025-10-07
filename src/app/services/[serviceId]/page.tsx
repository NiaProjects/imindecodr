import ServiceDetail from "@/components/ServiceDetail";
import Header from "@/components/Header";
import NewsBar from "@/components/NewsBar";
import Footer from "@/components/Footer";

interface ServicePageProps {
  params: Promise<{
    serviceId: string;
  }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { serviceId } = await params;

  return (
    <div className="min-h-screen bg-background">
      <NewsBar />
      <Header />
      <main>
        <ServiceDetail serviceId={serviceId} />
      </main>
      <Footer />
    </div>
  );
}
