"use client";

import React, { useState, useEffect } from "react";
import { Star, Award, Users, Clock, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { whyChooseUsApi, WhyChooseUsData, ApiResponse } from "@/lib/api";

const WhyChooseUs = () => {
  const { t, isRTL, language } = useLanguage();
  const [features, setFeatures] = useState<WhyChooseUsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to get icon component based on icon name
  const getIconComponent = (iconName: string) => {
    const iconMap: {
      [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    } = {
      star: Star,
      award: Award,
      users: Users,
      clock: Clock,
    };
    return iconMap[iconName.toLowerCase()] || Star;
  };

  // Function to get color class based on icon
  const getColorClass = (iconName: string): string => {
    const colorMap: { [key: string]: string } = {
      star: "text-primary",
      award: "text-primary-glow",
      users: "text-accent-foreground",
      clock: "text-primary",
    };
    return colorMap[iconName.toLowerCase()] || "text-primary";
  };

  // Fetch why choose us features from API
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await whyChooseUsApi.getAll();
        setFeatures(result.data);
      } catch (err) {
        console.error("Error fetching why choose us features:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch features"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section
        id="why-choose-us"
        className="py-20 lg:py-32 bg-pattern-slanted-lines"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
              {t("whyChoose.title")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("whyChoose.subtitle")}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading features...</span>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section
        id="why-choose-us"
        className="py-20 lg:py-32 bg-pattern-slanted-lines"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
              {t("whyChoose.title")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("whyChoose.subtitle")}
            </p>
          </div>

          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto text-center">
            <p className="text-destructive font-medium">
              Error loading features
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

  return (
    <section
      id="why-choose-us"
      className="py-20 lg:py-32 bg-pattern-slanted-lines"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6 fade-in-up">
            {t("whyChoose.title")}
          </h2>
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t("whyChoose.subtitle")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = getIconComponent(feature.icon);
            const colorClass = getColorClass(feature.icon);
            const featureName =
              language === "ar" ? feature.name_ar : feature.name_en;
            const featureDesc =
              language === "ar" ? feature.desc_ar : feature.desc_en;

            return (
              <div
                key={feature.id}
                className="text-center group fade-in-up"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-card to-secondary rounded-full flex items-center justify-center shadow-soft group-hover:shadow-elegant transition-all duration-300 group-hover:scale-110">
                    <Icon
                      className={`h-10 w-10 ${colorClass} transition-colors duration-300`}
                    />
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 w-20 h-20 mx-auto bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-playfair font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {featureName}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {featureDesc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
