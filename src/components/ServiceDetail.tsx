"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { servicesApi, ServiceData } from "@/lib/api";

interface ServiceDetailProps {
  serviceId: string;
}

const ServiceDetail = ({ serviceId }: ServiceDetailProps) => {
  const { t, isRTL, language } = useLanguage();
  const [service, setService] = useState<ServiceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setIsLoading(true);
        const response = await servicesApi.getById(parseInt(serviceId));
        setService(response.data);
      } catch (err) {
        console.error("Error fetching service:", err);
        setError("Failed to load service details");
      } finally {
        setIsLoading(false);
      }
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-lg">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-4">
            {error || "The requested service could not be found."}
          </p>
          <Link href="/" className="text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative py-4 lg:py-10 bg-gradient-dark overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors">
                  {t("nav.home")}
                </Link>
                <span>/</span>
                <Link
                  href="/#services"
                  className="hover:text-primary transition-colors"
                >
                  {t("nav.services")}
                </Link>
                <span>/</span>
                <span className="text-foreground">
                  {language === "en" ? service.name_en : service.name_ar}
                </span>
              </nav>

              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground fade-in-up">
                  {language === "en" ? service.name_en : service.name_ar}
                </h1>

                <p
                  className="text-xl text-muted-foreground leading-relaxed fade-in-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  {language === "en" ? service.desc_en : service.desc_ar}
                </p>

                <div
                  className="flex flex-wrap gap-4 fade-in-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  <Button size="lg" className="btn-primary" asChild>
                    <Link href="/#contact">
                      {t("button.getConsultation")}
                      <ArrowRight
                        className={`h-5 w-5 ${
                          isRTL ? "mr-2 rotate-180" : "ml-2"
                        }`}
                      />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/">
                      <ArrowLeft
                        className={`h-5 w-5 ${
                          isRTL ? "ml-2 rotate-180" : "mr-2"
                        }`}
                      />
                      {t("button.backToHome")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Image */}
            <div
              className="relative fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-elegant">
                <img
                  src={service.img}
                  alt={language === "en" ? service.name_en : service.name_ar}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-2xl -z-10 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
