import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import OurClients from "@/components/OurClients";
import OurProjects from "@/components/OurProjects";
import About from "@/components/About";
import News from "@/components/News";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-pattern-diagonal-lines">
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <OurClients />
        <OurProjects />
        <About />
        <News />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
