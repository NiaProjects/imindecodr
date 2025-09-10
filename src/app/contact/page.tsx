import Header from "@/components/Header";
import NewsBar from "@/components/NewsBar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Us - IMIC Decor",
  description:
    "Get in touch with IMIC Decor for premium interior design services. Contact us for consultation and project inquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-pattern-diagonal-lines">
      <NewsBar />
      <Header />
      <main className="pt-20">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
