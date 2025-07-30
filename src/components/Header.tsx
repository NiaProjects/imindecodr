"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Globe, Sparkles, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  const navigation = [
    { key: "nav.home", href: "#home" },
    { key: "nav.services", href: "#services" },
    { key: "nav.about", href: "#about" },
    { key: "nav.projects", href: "#projects" },
    { key: "nav.contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-pattern-minimal-lines-reverse/95 backdrop-blur-md border-b border-border/20 shadow-soft"
          : "bg-transparent"
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
            {navigation.map((item, index) => (
              <a
                key={item.key}
                href={item.href}
                className="relative text-foreground hover:text-primary transition-all duration-300 font-medium group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative mx-4 z-10">{t(item.key)}</span>
                <div className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Contact Button */}
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2 hover-lift hover-glow"
            >
              <Phone className="h-4 w-4" />
              <span>Contact Us</span>
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
              {navigation.map((item, index) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-all duration-300 font-medium py-2 px-4 rounded-lg hover:bg-primary/10 relative overflow-hidden group"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {t(item.key)}
                  </span>
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </a>
              ))}
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
