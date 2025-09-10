"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Loader2,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { reviewsApi, ReviewData } from "@/lib/api";

const Testimonials = () => {
  const { t } = useLanguage();
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
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await reviewsApi.getAll();
        setReviews(result.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch reviews"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
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
    }, 5000);

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? "text-yellow-400 fill-current"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  // Loading state
  if (loading) {
    return (
      <section
        id="testimonials"
        className="py-4 lg:py-10 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
              {t("testimonials.title")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("testimonials.subtitle")}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading testimonials...</span>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section
        id="testimonials"
        className="py-4 lg:py-10 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
              {t("testimonials.title")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("testimonials.subtitle")}
            </p>
          </div>

          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto text-center">
            <p className="text-destructive font-medium">
              Error loading testimonials
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
      id="testimonials"
      className="py-4 lg:py-10 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6 fade-in-up">
            {t("testimonials.title")}
          </h2>
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t("testimonials.subtitle")}
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
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="embla__slide flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4"
                >
                  <div className="card-elegant p-8 group h-full transform transition-all duration-500 hover:scale-105 hover:shadow-glow">
                    {/* Quote Icon */}
                    <div className="relative mb-6">
                      <Quote className="h-8 w-8 text-primary/40 absolute -top-2 -left-2 animate-pulse" />
                      <div className="pl-6">
                        {/* Stars */}
                        <div className="flex items-center gap-1 mb-4">
                          {renderStars(review.num_star)}
                        </div>

                        {/* Review Text */}
                        <p className="text-muted-foreground leading-relaxed italic text-lg">
                          &ldquo;{review.text}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Client Info */}
                    <div className="flex items-center gap-4 mt-auto">
                      {/* Avatar Placeholder */}
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center border-2 border-primary/20 transition-all duration-300 group-hover:border-primary group-hover:scale-110">
                          <span className="text-primary font-semibold text-lg">
                            {review.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      <div className="flex-1">
                        {/* Name */}
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                          {review.name}
                        </h4>

                        {/* Date */}
                        <div className="text-sm text-muted-foreground">
                          {new Date(review.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
      </div>
    </section>
  );
};

export default Testimonials;
