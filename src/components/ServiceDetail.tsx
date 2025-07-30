"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import kitchenImage from "@/assets/service-kitchen.jpg";
import bedroomImage from "@/assets/service-bedroom.jpg";
import officeImage from "@/assets/service-office.jpg";

interface ServiceDetailProps {
  serviceId: string;
}

const ServiceDetail = ({ serviceId }: ServiceDetailProps) => {
  const { t, isRTL } = useLanguage();

  // Sample service data - would be managed from dashboard
  const services = {
    kitchen: {
      title: t("services.kitchen.title"),
      description: t("services.kitchen.desc"),
      image: kitchenImage,
      fullDescription:
        "Transform your kitchen into a culinary masterpiece with our expert design services. We combine functionality with elegance to create spaces that inspire creativity and bring families together. Our team specializes in modern layouts, premium appliances integration, and custom storage solutions.",
      features: [
        "Custom Cabinet Design",
        "Premium Appliance Integration",
        "Innovative Storage Solutions",
        "Lighting Design",
        "Material Selection",
        "Project Management",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
      ],
    },
    bedroom: {
      title: t("services.bedroom.title"),
      description: t("services.bedroom.desc"),
      image: bedroomImage,
      fullDescription:
        "Create your perfect sanctuary with our luxurious bedroom design services. We focus on creating peaceful, elegant spaces that promote rest and relaxation while reflecting your personal style and comfort preferences.",
      features: [
        "Custom Furniture Design",
        "Lighting & Ambiance",
        "Textile & Color Coordination",
        "Storage Optimization",
        "Smart Home Integration",
        "Luxury Finishing",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=600&h=400&fit=crop",
      ],
    },
    office: {
      title: t("services.office.title"),
      description: t("services.office.desc"),
      image: officeImage,
      fullDescription:
        "Design productive and inspiring work environments that enhance performance and creativity. Our office design solutions balance functionality with aesthetics to create spaces that motivate teams and impress clients.",
      features: [
        "Ergonomic Workspace Design",
        "Technology Integration",
        "Collaborative Spaces",
        "Brand Integration",
        "Acoustic Solutions",
        "Sustainable Materials",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop",
      ],
    },
  };

  const service = services[serviceId as keyof typeof services];

  if (!service) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
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
      <section className="relative py-20 lg:py-32 bg-gradient-dark overflow-hidden">
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
                <span className="text-foreground">{service.title}</span>
              </nav>

              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground fade-in-up">
                  {service.title}
                </h1>

                <p
                  className="text-xl text-muted-foreground leading-relaxed fade-in-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  {service.description}
                </p>

                <p
                  className="text-lg text-muted-foreground leading-relaxed fade-in-up"
                  style={{ animationDelay: "0.3s" }}
                >
                  {service.fullDescription}
                </p>

                <div
                  className="flex flex-wrap gap-4 fade-in-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  <Button size="lg" className="btn-primary" asChild>
                    <Link href="/#contact">
                      Get Consultation
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
                      Back to Home
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
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-2xl -z-10 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-6 fade-in-up">
              What&apos;s Included
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Our comprehensive service includes everything you need for a
              successful transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, index) => (
              <div
                key={feature}
                className="flex items-center space-x-3 p-4 rounded-lg border border-border/20 hover:border-primary/30 transition-colors duration-300 fade-in-up"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 lg:py-32 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-6 fade-in-up">
              Our Work Gallery
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Explore examples of our previous {service.title.toLowerCase()}{" "}
              projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.gallery.map((image, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-105 fade-in-up"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <img
                  src={image}
                  alt={`${service.title} project ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 fade-in-up">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Let&apos;s discuss your vision and create something extraordinary
              together
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="btn-primary" asChild>
                <Link href="/#contact">
                  Start Your Project
                  <ArrowRight
                    className={`h-5 w-5 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`}
                  />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/#services">View All Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
