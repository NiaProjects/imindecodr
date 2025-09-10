"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  Briefcase,
  Star,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { engineersApi, EngineerData, ApiResponse } from "@/lib/api";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import NewsBar from "@/components/NewsBar";

interface EngineerDetailProps {
  engineerId: string;
}

const EngineerDetail = ({ engineerId }: EngineerDetailProps) => {
  const { t, isRTL, language } = useLanguage();
  const router = useRouter();
  const [engineer, setEngineer] = useState<EngineerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carousel for project images
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });

  // Fetch engineer details
  useEffect(() => {
    const fetchEngineer = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await engineersApi.getById(parseInt(engineerId));
        setEngineer(result.data);
      } catch (err) {
        console.error("Error fetching engineer:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch engineer details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (engineerId) {
      fetchEngineer();
    }
  }, [engineerId]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span>Loading engineer details...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !engineer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto text-center">
            <p className="text-destructive font-medium">
              Error loading engineer
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <NewsBar />

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80"
            alt="Engineer Background"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80";
            }}
          />
          {/* Additional overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
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
              {t("nav.back") || "Back"}
            </Button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-4xl">
              {/* Engineer Avatar */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-background/20 shadow-2xl ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        engineer.name
                      )}&background=6366f1&color=ffffff&size=200&bold=true&format=png`}
                      alt={engineer.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80";
                      }}
                    />
                    {/* Avatar overlay for better visual effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>
                  {/* Status indicator */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  {/* Engineer Title */}
                  <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-primary/30">
                    <Briefcase className="h-4 w-4" />
                    Engineer
                  </div>

                  {/* Engineer Name */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-4 leading-tight">
                    {engineer.name}
                  </h1>
                </div>
              </div>

              {/* Engineer Meta */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6">
                <div className="flex items-center gap-2 bg-background/20 backdrop-blur-sm px-4 py-2 rounded-full border border-border/20 hover:bg-background/30 transition-colors group">
                  <Calendar className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-foreground">
                    Joined {new Date(engineer.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-background/20 backdrop-blur-sm px-4 py-2 rounded-full border border-border/20 hover:bg-background/30 transition-colors group">
                  <Star className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-foreground">
                    {engineer.projects?.length || 0} Projects
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-background/20 backdrop-blur-sm px-4 py-2 rounded-full border border-border/20 hover:bg-background/30 transition-colors group">
                  <Briefcase className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-foreground">
                    Available
                  </span>
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
            {/* Engineer Description */}
            <div className="bg-card rounded-2xl p-8 border border-border/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-3xl font-playfair font-semibold text-foreground">
                  About This Engineer
                </h2>
              </div>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                <p className="text-lg bg-muted/30 p-6 rounded-xl border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow duration-300">
                  {engineer.description}
                </p>
              </div>
            </div>

            {/* Engineer's Projects */}
            {engineer.projects && engineer.projects.length > 0 && (
              <div className="space-y-6 bg-card rounded-2xl p-8 border border-border/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-playfair font-semibold text-foreground">
                      Engineer's Projects
                    </h2>
                  </div>
                  <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary/20 transition-colors duration-300">
                    {engineer.projects.length} projects
                  </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-8">
                  {engineer.projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-card rounded-2xl overflow-hidden border border-border/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
                    >
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <img
                          src={project.cover}
                          alt={
                            language === "ar"
                              ? project.title_ar
                              : project.title_en
                          }
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder.svg";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background/90 transition-colors">
                            <ExternalLink className="h-4 w-4 text-foreground" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-playfair font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {language === "ar"
                            ? project.title_ar
                            : project.title_en}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {project.category
                            ? language === "ar"
                              ? project.category.name_ar
                              : project.category.name_en
                            : "Unknown Category"}
                        </p>
                        <Button
                          onClick={() => router.push(`/projects/${project.id}`)}
                          className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors group-hover:scale-105 hover:shadow-lg"
                          variant="outline"
                        >
                          View Project
                          <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Engineer Info Card */}
            <div className="bg-card rounded-2xl p-6 border border-border/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-foreground">
                  Engineer Information
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <span className="text-sm text-muted-foreground">Name</span>
                  <span className="font-semibold text-foreground">
                    {engineer.name}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <span className="text-sm text-muted-foreground">
                    Engineer ID
                  </span>
                  <span className="font-semibold text-foreground">
                    #{engineer.id}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <span className="text-sm text-muted-foreground">Joined</span>
                  <span className="font-semibold text-foreground">
                    {new Date(engineer.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <span className="text-sm text-muted-foreground">
                    Projects
                  </span>
                  <span className="font-semibold text-foreground">
                    {engineer.projects?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-card rounded-2xl p-6 border border-border/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Quick Contact
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors group">
                  <Phone className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-foreground">
                    +20 123 456 7890
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors group">
                  <Mail className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-foreground">
                    info@imic.com
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors group">
                  <MapPin className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-foreground">
                    Cairo, Egypt
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineerDetail;
