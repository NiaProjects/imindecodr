"use client";

import React, { useState, useEffect } from "react";
import { Award, Users, Building, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { aboutApi, AboutData, ApiResponse } from "@/lib/api";

const About = () => {
  const { t, language } = useLanguage();
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch about data from API
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await aboutApi.getAbout();
        // Since the API returns an array, we take the first item
        setAboutData(result.data[0]);
      } catch (err) {
        console.error("Error fetching about data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch about data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const stats = [
    {
      icon: Award,
      number: "15+",
      label: t("about.experience"),
    },
    {
      icon: Building,
      number: "500+",
      label: t("about.projects"),
    },
    {
      icon: Users,
      number: "1000+",
      label: t("about.clients"),
    },
  ];

  // Loading state
  if (loading) {
    return (
      <section id="about" className="py-4 lg:py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading about information...</span>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error || !aboutData) {
    return (
      <section id="about" className="py-4 lg:py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto text-center">
            <p className="text-destructive font-medium">
              Error loading about information
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
      </section>
    );
  }

  const description = language === "ar" ? aboutData.desc_ar : aboutData.desc_en;
  const vision = language === "ar" ? aboutData.vision_ar : aboutData.vision_en;
  const mission =
    language === "ar" ? aboutData.mission_ar : aboutData.mission_en;

  return (
    <section id="about" className="py-4 lg:py-10 bg-pattern-minimal-lines">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 fade-in-up">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-4">
                {t("about.title")}
              </h2>
              <p className="text-xl text-primary font-medium mb-6">{vision}</p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center space-y-2 fade-in-up"
                  style={{ animationDelay: `${0.2 * (index + 1)}s` }}
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div
            className="relative fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={aboutData.img}
                alt="IMIC Decor Company"
                className="w-full h-[400px] lg:h-[500px] object-cover bg-gradient-card"
                onError={(e) => {
                  // Fallback to a placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "/lovable-uploads/6390deb8-e936-4409-a5d3-6c5b8a4fadc4.png";
                }}
              />

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-glow/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
