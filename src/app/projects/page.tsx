import Header from "@/components/Header";
import NewsBar from "@/components/NewsBar";
import AllProjects from "@/components/AllProjects";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Our Projects - IMIC Decor",
  description:
    "Explore our portfolio of stunning interior design projects. From residential to commercial spaces, discover our expertise in creating exceptional environments.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-pattern-diagonal-lines">
      <NewsBar />
      <Header />
      <main className="pt-20">
        <AllProjects />
      </main>
      <Footer />
    </div>
  );
}
