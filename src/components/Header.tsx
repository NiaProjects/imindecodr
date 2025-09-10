"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Globe, Sparkles, Phone, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { servicesApi, ServiceData } from "@/lib/api";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const { language, setLanguage, t, isRTL } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      setIsLoadingServices(true);
      try {
        const response = await servicesApi.getAll();
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  const navigation = [
    { key: "nav.home", href: "/" },
    { key: "nav.about", href: "/about" },
    { key: "nav.projects", href: "/projects" },
    { key: "nav.contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50  transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-md border-b border-border/20 shadow-soft"
          : "bg-transparent mt-10"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center group">
            <div className="relative">
              <img
                src="/imic l-01.png"
                alt="IMIC Decor Logo"
                className={`h-10 lg:h-20 w-auto transition-all duration-300 group-hover:scale-110 ${
                  isScrolled ? "filter brightness-110" : ""
                }`}
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center ">
            {navigation.map((item, index) => {
              const isExternalLink = item.href.startsWith("#");
              const LinkComponent = isExternalLink ? "a" : Link;
              const linkProps = isExternalLink
                ? { href: item.href }
                : { href: item.href };

              return (
                <LinkComponent
                  key={item.key}
                  {...linkProps}
                  className="relative text-foreground hover:text-primary transition-all duration-300 font-medium group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative mx-4 z-10">{t(item.key)}</span>
                  <div className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
                </LinkComponent>
              );
            })}

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className="relative text-foreground hover:text-primary transition-all duration-300 font-medium flex items-center gap-1 mx-4"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <span>{t("nav.services")}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
                />
                <div className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
              </button>

              {/* Services Dropdown Menu */}
              {isServicesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 bg-background/95 backdrop-blur-md border border-border/20 rounded-lg shadow-lg z-50"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <div className="py-2">
                    {isLoadingServices ? (
                      <div className="px-4 py-3 text-center text-muted-foreground">
                        Loading services...
                      </div>
                    ) : services.length > 0 ? (
                      services.map((service) => (
                        <Link
                          key={service.id}
                          href={`/services/${service.id}`}
                          className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg overflow-hidden bg-primary/10 flex-shrink-0">
                              <img
                                src={service.img}
                                alt={
                                  language === "en"
                                    ? service.name_en
                                    : service.name_ar
                                }
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">
                                {language === "en"
                                  ? service.name_en
                                  : service.name_ar}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {language === "en"
                                  ? service.desc_en
                                  : service.desc_ar}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-center text-muted-foreground">
                        No services available
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Contact Button */}
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2 hover-lift hover-glow"
              asChild
            >
              <Link href="/contact">
                <Phone className="h-4 w-4" />
                <span>Contact Us</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-2 text-foreground hover:text-primary hover-lift relative overflow-hidden group"
            >
              <Globe className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
              <span className="hidden sm:inline">
                {language === "en" ? "العربية" : "English"}
              </span>
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden hover-lift relative overflow-hidden group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative z-10">
                {isMenuOpen ? (
                  <X className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
                ) : (
                  <Menu className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                )}
              </div>
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden bg-background bg-opacity-50 backdrop-blur-sm transition-all duration-500 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 border-t border-border/20">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item, index) => {
                const isExternalLink = item.href.startsWith("#");
                const LinkComponent = isExternalLink ? "a" : Link;
                const linkProps = isExternalLink
                  ? { href: item.href }
                  : { href: item.href };

                return (
                  <LinkComponent
                    key={item.key}
                    {...linkProps}
                    className="text-foreground hover:text-primary transition-all duration-300 font-medium py-2 px-4 rounded-lg hover:bg-primary/10 relative overflow-hidden group"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Sparkles className="h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {t(item.key)}
                    </span>
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </LinkComponent>
                );
              })}

              {/* Mobile Services Section */}
              <div className="px-4">
                <button
                  className="text-foreground hover:text-primary transition-all duration-300 font-medium py-2 flex items-center gap-2 w-full text-left"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  <Sparkles className="h-3 w-3 text-primary" />
                  {t("nav.services")}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mobile Services Dropdown */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isServicesOpen
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pl-6 pt-2 space-y-2">
                    {isLoadingServices ? (
                      <div className="text-sm text-muted-foreground py-2">
                        Loading services...
                      </div>
                    ) : services.length > 0 ? (
                      services.map((service) => (
                        <Link
                          key={service.id}
                          href={`/services/${service.id}`}
                          className="block text-sm text-foreground hover:text-primary transition-all duration-200 py-2 px-3 rounded-lg hover:bg-primary/10"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsServicesOpen(false);
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded overflow-hidden bg-primary/10 flex-shrink-0">
                              <img
                                src={service.img}
                                alt={
                                  language === "en"
                                    ? service.name_en
                                    : service.name_ar
                                }
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="truncate">
                              {language === "en"
                                ? service.name_en
                                : service.name_ar}
                            </span>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground py-2">
                        No services available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      {!isScrolled && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-pulse"></div>
          <div
            className="absolute top-8 right-1/3 w-1 h-1 bg-primary/40 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-2 right-1/4 w-1.5 h-1.5 bg-primary/20 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      )}
    </header>
  );
};

export default Header;
