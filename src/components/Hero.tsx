"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Phone, Star, Sparkles, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-interior.jpg";

const Hero = () => {
  const { t, isRTL } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage.src}
          alt="Luxury Interior Design"
          className="w-full h-full object-cover scale-110 transition-transform duration-10000 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/30"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-2xl float"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-primary/15 rounded-full blur-xl float-delayed"></div>
          <div
            className="absolute bottom-32 left-32 w-20 h-20 bg-primary/20 rounded-full blur-lg float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-20 right-20 w-28 h-28 bg-primary/10 rounded-full blur-2xl float-delayed"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Floating badges */}
          <div
            className="absolute top-10 left-10 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 hover-lift">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                Award Winning
              </span>
            </div>
          </div>

          <div
            className="absolute top-20 right-10 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 hover-lift">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                Premium Quality
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-foreground mb-6 leading-tight transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-gradient relative">
              {t("hero.title")}
              <Sparkles className="absolute -top-4 -right-4 h-6 w-6 text-primary animate-pulse" />
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <a href="#services">
              <Button
                size="lg"
                className="btn-primary group min-w-[200px] hover-lift hover-glow relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  {t("hero.cta")}
                  <ArrowRight
                    className={`ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform ${
                      isRTL
                        ? "rotate-180 mr-2 ml-0 group-hover:-translate-x-1"
                        : ""
                    }`}
                  />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </a>
            <a href="#contact">
              <Button
                variant="outline"
                size="lg"
                className="btn-outline min-w-[200px] hover-lift hover-scale relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <Phone className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {t("hero.contact")}
                </span>
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div
            className={`mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {[
              { number: "150+", label: "Happy Clients" },
              { number: "200+", label: "Projects" },
              { number: "8+", label: "Years" },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center relative group cursor-pointer">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      {/* Floating particles */}
    </section>
  );
};

export default Hero;
