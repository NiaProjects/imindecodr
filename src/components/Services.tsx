"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Award, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { servicesApi, ServiceData } from "@/lib/api";

const Services = () => {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to get service icon based on service name
  const getServiceIcon = (serviceName: string): string => {
    const name = serviceName.toLowerCase();
    if (name.includes("kitchen") || name.includes("مطبخ")) return "🍽️";
    if (name.includes("bedroom") || name.includes("نوم")) return "🛏️";
    if (name.includes("office") || name.includes("مكتب")) return "💼";
    return "🏠";
  };

  // Function to get service category based on service name
  const getServiceCategory = (serviceName: string): string => {
    const name = serviceName.toLowerCase();
    if (name.includes("kitchen") || name.includes("مطبخ")) return "Kitchen";
    if (name.includes("bedroom") || name.includes("نوم")) return "Bedroom";
    if (name.includes("office") || name.includes("مكتب")) return "Office";
    return "Interior";
  };

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await servicesApi.getAll();
        setServices(result.data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch services"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section
        id="services"
        className="py-20 lg:py-32 bg-pattern-diagonal-lines-reverse relative overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                Our Premium Services
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
              {t("services.title")}
            </h2>

            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading services...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section
        id="services"
        className="py-20 lg:py-32 bg-pattern-diagonal-lines-reverse relative overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                Our Premium Services
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
              {t("services.title")}
            </h2>

            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-destructive font-medium">
                Error loading services
              </p>
              <p className="text-sm text-muted-foreground mt-2">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-4"
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="services"
      className="py-20 lg:py-32 bg-pattern-diagonal-lines-reverse relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl float"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl float-delayed"></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-2 mb-6 fade-in-up">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Our Premium Services
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6 fade-in-up">
            {t("services.title")}
          </h2>
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t("services.subtitle")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const serviceName =
              language === "ar" ? service.name_ar : service.name_en;
            const serviceDesc =
              language === "ar" ? service.desc_ar : service.desc_en;
            const serviceIcon = getServiceIcon(serviceName);
            const serviceCategory = getServiceCategory(serviceName);

            return (
              <div
                key={service.id}
                className="card-elegant p-8 group cursor-pointer fade-in-up hover-lift relative overflow-hidden"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Floating icon */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  {serviceIcon}
                </div>

                {/* Service Image */}
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <img
                    src={service.img}
                    alt={serviceName}
                    className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                    onError={(e) => {
                      // Fallback to a placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold transform -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {serviceCategory}
                  </div>
                </div>

                {/* Service Content */}
                <div className="space-y-4 relative z-10">
                  <h3 className="text-xl md:text-2xl font-playfair font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {serviceName}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {serviceDesc}
                  </p>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              </div>
            );
          })}
        </div>

        {/* Enhanced CTA */}
        <div
          className="text-center mt-16 fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="inline-flex items-center gap-4 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-full px-8 py-4 mb-8">
            <Award className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Trusted by 150+ Clients
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
