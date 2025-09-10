import Header from "@/components/Header";
import NewsBar from "@/components/NewsBar";
import About from "@/components/About";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us - IMIC Decor",
  description:
    "Learn about IMIC Decor's expertise in premium interior design. Discover our vision, mission, and commitment to creating exceptional spaces.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-pattern-diagonal-lines">
      <NewsBar />
      <Header />
      <main className="pt-20">
        <About />
      </main>
      <Footer />
    </div>
  );
}
