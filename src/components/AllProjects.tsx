"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ExternalLink, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { projectsApi, ProjectData } from "@/lib/api";
import { useRouter } from "next/navigation";

const AllProjects = () => {
  const { t, isRTL, language } = useLanguage();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [categories, setCategories] = useState<{ id: string; label: string }[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await projectsApi.getAll();
        setProjects(result.data);

        // Extract unique categories from projects
        const uniqueCategories = new Map<
          string,
          { id: string; label: string }
        >();

        // Add "All" category
        uniqueCategories.set("all", {
          id: "all",
          label: t("projects.all"),
        });

        // Add project categories
        result.data.forEach((project) => {
          const categoryId = project.category_id.toString();
          const categoryName = project.category
            ? language === "ar"
              ? project.category.name_ar
              : project.category.name_en
            : "Unknown Category";

          if (!uniqueCategories.has(categoryId)) {
            uniqueCategories.set(categoryId, {
              id: categoryId,
              label: categoryName,
            });
          }
        });

        setCategories(Array.from(uniqueCategories.values()));
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch projects"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [language, t]);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter(
          (project) => project.category_id.toString() === activeCategory
        );

  // Loading state
  if (loading) {
    return (
      <section className="py-4 lg:py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-20">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
              {t("projects.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("projects.subtitle")}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>{t("button.loadingProjects")}</span>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-4 lg:py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-20">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
              {t("projects.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("projects.subtitle")}
            </p>
          </div>

          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto text-center">
            <p className="text-destructive font-medium">
              {t("button.errorLoading")}
            </p>
            <p className="text-sm text-muted-foreground mt-2">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4"
              variant="outline"
            >
              {t("button.tryAgain")}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 lg:py-10 bg-pattern-random-lines">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6 fade-in-up">
            {t("projects.title")}
          </h1>
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t("projects.subtitle")}
          </p>
        </div>

        {/* Category Filter */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-12 fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-elegant"
                  : "bg-card text-card-foreground hover:bg-primary/10 hover:text-primary border border-border/20"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {filteredProjects.map((project) => {
            const projectTitle =
              language === "ar" ? project.title_ar : project.title_en;
            const categoryName = project.category
              ? language === "ar"
                ? project.category.name_ar
                : project.category.name_en
              : "Unknown Category";

            return (
              <div
                key={project.id}
                className="bg-gradient-to-t from-[#94763e] to-[#c0a460] rounded-xl group cursor-pointer fade-in-up"
                style={{ animationDelay: `${0.1 * Math.random()}s` }}
                onClick={() => router.push(`/projects/${project.id}`)}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={project.cover}
                    alt={projectTitle}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback to a placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* View Project Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      className="bg-yellow-200 hover:bg-yellow-300 text-black backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/projects/${project.id}`);
                      }}
                    >
                      <ExternalLink
                        className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`}
                      />
                      {t("button.viewProject")}
                    </Button>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-playfair font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                    {projectTitle}
                  </h3>

                  <p className=" mb-4">{categoryName}</p>

                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-yellow-200 hover:text-primary-glow font-semibold group/btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/projects/${project.id}`);
                    }}
                  >
                    {t("button.learnMore")}
                    <ArrowRight
                      className={`h-4 w-4 ${
                        isRTL
                          ? "mr-2 rotate-180 group-hover/btn:-translate-x-1"
                          : "ml-2 group-hover/btn:translate-x-1"
                      } transition-transform duration-300`}
                    />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show message if no projects found */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className=" text-lg">
              {t("button.noProjectsFound")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProjects;
