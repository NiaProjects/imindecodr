"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Building2,
  Loader2,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { clientsApi, ClientData } from "@/lib/api";

const OurClients = () => {
  const { t, language } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    dragFree: false,
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch clients from API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await clientsApi.getAll();
        setClients(result.data);
      } catch (err) {
        console.error("Error fetching clients:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch clients"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Autoplay functionality
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      if (isPlaying) {
        emblaApi.scrollNext();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [emblaApi, isPlaying]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Loading state
  if (loading) {
    return (
      <section id="clients" className="py-4 lg:py-10 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
              {t("clients.title")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("clients.subtitle")}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading clients...</span>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="clients" className="py-4 lg:py-10 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
              {t("clients.title")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("clients.subtitle")}
            </p>
          </div>

          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto text-center">
            <p className="text-destructive font-medium">
              Error loading clients
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
      id="clients"
      className="py-4 lg:py-10 bg-pattern-crossed-lines relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6 fade-in-up">
            {t("clients.title")}
          </h2>
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t("clients.subtitle")}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-card/80 backdrop-blur-sm border border-border/20 rounded-full flex items-center justify-center text-foreground hover:text-primary hover:bg-card transition-all duration-300 hover:scale-110 shadow-soft"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-card/80 backdrop-blur-sm border border-border/20 rounded-full flex items-center justify-center text-foreground hover:text-primary hover:bg-card transition-all duration-300 hover:scale-110 shadow-soft"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Autoplay Toggle */}
          <button
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-card/80 backdrop-blur-sm border border-border/20 rounded-full flex items-center justify-center text-foreground hover:text-primary transition-all duration-300"
            onClick={toggleAutoplay}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </button>

          {/* Embla Carousel */}
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {clients.map((client) => {
                const clientName =
                  language === "ar" ? client.name_ar : client.name_en;

                return (
                  <div
                    key={client.id}
                    className="embla__slide flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] px-4"
                  >
                    <div className="group text-center transform transition-all duration-500 hover:scale-105">
                      {/* Client Logo Container */}
                      <div className="relative mb-6 overflow-hidden rounded-xl">
                        <div className="aspect-[2/1] bg-gradient-to-br from-card to-secondary rounded-xl p-6 flex items-center justify-center border border-border/20 group-hover:border-primary/30 transition-all duration-500 group-hover:shadow-elegant relative overflow-hidden">
                          {/* Background gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          {/* Logo */}
                          <img
                            src={client.img}
                            alt={clientName}
                            className="w-full h-full object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0 relative z-10"
                            onError={(e) => {
                              // Fallback to a placeholder if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder.svg";
                            }}
                          />
                        </div>

                        {/* Floating icon */}
                        <div className="absolute top-4 right-4 w-8 h-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                      </div>

                      {/* Client Info */}
                      <div className="space-y-2">
                        <h3 className="text-sm md:text-base font-semibold text-muted-foreground group-hover:text-primary transition-colors duration-300">
                          {clientName}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-primary scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Happy Clients", value: "150+" },
            { label: "Projects Completed", value: "200+" },
            { label: "Years Experience", value: "8+" },
            { label: "Team Members", value: "25+" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center fade-in-up"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2 animate-pulse">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurClients;
