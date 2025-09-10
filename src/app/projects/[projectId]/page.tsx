"use client";

import React, { useState, useEffect, use } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Tag,
  Eye,
  Heart,
  Share2,
  Phone,
  Mail,
  MapPin,
  Star,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { projectsApi, ProjectData, ApiResponse, EngineerData } from "@/lib/api";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import NewsBar from "@/components/NewsBar";

interface ProjectDetailPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

const ProjectDetailPage = ({ params }: ProjectDetailPageProps) => {
  const { t, isRTL, language } = useLanguage();
  const router = useRouter();
  const resolvedParams = use(params);
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Carousel for project images
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });

  // Fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await projectsApi.getById(
          parseInt(resolvedParams.projectId)
        );
        setProject(result.data);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch project details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (resolvedParams.projectId) {
      fetchProject();
    }
  }, [resolvedParams.projectId]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span>Loading project details...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto text-center">
            <p className="text-destructive font-medium">
              Error loading project
            </p>
            <p className="text-sm text-muted-foreground mt-2">{error}</p>
            <Button
              onClick={() => router.back()}
              className="mt-4"
              variant="outline"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const projectTitle = language === "ar" ? project.title_ar : project.title_en;
  const categoryName = project.category
    ? language === "ar"
      ? project.category.name_ar
      : project.category.name_en
    : "Unknown Category";
  const categoryDesc = project.category
    ? language === "ar"
      ? project.category.desc_ar
      : project.category.desc_en
    : "No description available";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <NewsBar />
      {/* Hero Section with Cover Image */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={project.cover}
            alt={projectTitle}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>

        {/* Header with back button */}
        <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="gap-2 bg-background/20 backdrop-blur-sm hover:bg-background/30 text-foreground border border-border/20"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("nav.back") || "Back to Projects"}
            </Button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-4xl">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-primary/30">
                <Tag className="h-4 w-4" />
                {categoryName}
              </div>

              {/* Project Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground mb-6 leading-tight">
                {projectTitle}
              </h1>

              {/* Project Meta */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>Project #{project.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Images Gallery */}
            {project.images && project.images.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-playfair font-semibold text-foreground">
                    Project Gallery
                  </h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsLiked(!isLiked)}
                      className={`gap-2 ${
                        isLiked ? "text-red-500 border-red-500" : ""
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                      />
                      {isLiked ? "Liked" : "Like"}
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Main Carousel */}
                <div className="relative">
                  <div
                    className="embla overflow-hidden rounded-2xl shadow-2xl"
                    ref={emblaRef}
                  >
                    <div className="embla__container flex">
                      {project.images.map((image, index) => (
                        <div
                          key={index}
                          className="embla__slide flex-[0_0_100%] min-w-0"
                        >
                          <div className="relative aspect-[16/9] overflow-hidden">
                            <img
                              src={image}
                              alt={`${projectTitle} - Image ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/placeholder.svg";
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border/20 rounded-full flex items-center justify-center text-foreground hover:text-primary hover:bg-background transition-all duration-300 hover:scale-110 shadow-lg"
                    onClick={scrollPrev}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border/20 rounded-full flex items-center justify-center text-foreground hover:text-primary hover:bg-background transition-all duration-300 hover:scale-110 shadow-lg"
                    onClick={scrollNext}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>

                {/* Image Thumbnails */}
                <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => emblaApi?.scrollTo(index)}
                      className="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 hover:scale-105 shadow-md"
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Project Description */}
            <div className="bg-card rounded-2xl p-8 border border-border/20 shadow-lg">
              <h2 className="text-3xl font-playfair font-semibold text-foreground mb-6">
                About This Project
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                <p className="text-lg mb-6">{categoryDesc}</p>
                <p>
                  This exceptional project showcases our commitment to creating
                  stunning interior spaces that blend functionality with
                  elegance. Every detail has been carefully considered to ensure
                  the perfect balance of style and practicality.
                </p>
              </div>
            </div>

            {/* Project Features */}
            <div className="bg-card rounded-2xl p-8 border border-border/20 shadow-lg">
              <h2 className="text-3xl font-playfair font-semibold text-foreground mb-8">
                Project Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Star,
                    title: "Custom Design",
                    desc: "Tailored to your unique style and requirements",
                  },
                  {
                    icon: Tag,
                    title: "Premium Materials",
                    desc: "Only the finest materials and finishes",
                  },
                  {
                    icon: Calendar,
                    title: "Professional Installation",
                    desc: "Expert craftsmanship and attention to detail",
                  },
                  {
                    icon: Eye,
                    title: "Quality Assurance",
                    desc: "Rigorous quality control throughout the process",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info Card */}
            <div className="bg-card rounded-2xl p-6 border border-border/20 shadow-lg  ">
              <h3 className="text-xl font-playfair font-semibold text-foreground mb-6">
                Project Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">
                    Category
                  </span>
                  <span className="font-semibold text-foreground">
                    {categoryName}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">
                    Project ID
                  </span>
                  <span className="font-semibold text-foreground">
                    #{project.id}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="font-semibold text-foreground">
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">Images</span>
                  <span className="font-semibold text-foreground">
                    {project.images?.length || 0}
                  </span>
                </div>
                {project.engineer && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <span className="text-sm text-muted-foreground">
                      Engineer
                    </span>
                    <button
                      onClick={() =>
                        project.engineer &&
                        router.push(`/engineers/${project.engineer.id}`)
                      }
                      className="font-semibold text-primary hover:text-primary/80 transition-colors duration-200 hover:underline"
                    >
                      {project.engineer.name}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Video Section */}
            {project.video && project.video !== "https://www.youtube.com/" && (
              <div className="bg-card rounded-2xl p-6 border border-border/20 shadow-lg">
                <h3 className="text-xl font-playfair font-semibold text-foreground mb-4">
                  Project Video
                </h3>
                <div className="aspect-video bg-muted rounded-xl flex items-center justify-center overflow-hidden">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="gap-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                    onClick={() => window.open(project.video, "_blank")}
                  >
                    <Play className="h-6 w-6" />
                    Watch Video
                  </Button>
                </div>
              </div>
            )}

            {/* Quick Contact */}
            <div className="bg-card rounded-2xl p-6 border border-border/20 shadow-lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Quick Contact
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+20 123 456 7890</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>info@imic.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Cairo, Egypt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
