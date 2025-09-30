"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Calendar, User, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { newsApi, NewsData } from "@/lib/api";

const News = () => {
  const { t, isRTL, language } = useLanguage();
  const [newsItems, setNewsItems] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await newsApi.getAll();
        setNewsItems(response.data);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err instanceof Error ? err.message : "Failed to load news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isRTL ? "ar-AE" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Display only first 3 news items
  const displayedNews = newsItems.slice(0, 3);

  if (loading) {
    return (
      <section id="news" className="py-4 lg:py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading news...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="news" className="py-4 lg:py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="py-4 lg:py-10 bg-pattern-subtle-lines">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6 fade-in-up">
            {t("news.title")}
          </h2>
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t("news.subtitle")}
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {displayedNews.map((news, index) => (
            <Link
              key={news.id}
              href={`/news/${news.id}`}
              className="bg-gradient-to-t from-[#94763e] to-[#c0a460] rounded-xl group cursor-pointer block fade-in-up"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              {/* News Image */}
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={news.image}
                  alt={language === "ar" ? news.title_ar : news.title_en}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* News Content */}
              <div className="p-6 space-y-4">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm ">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(news.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>IMIC Design Team</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-playfair font-semibold  group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {language === "ar" ? news.title_ar : news.title_en}
                </h3>

                {/* Summary - Extract first paragraph from body */}
                <p className=" leading-relaxed line-clamp-3">
                  {(() => {
                    const body =
                      language === "ar" ? news.body_ar : news.body_en;
                    const firstParagraph =
                      body.split("\r\n\r\n")[0] ||
                      body.split("\n\n")[0] ||
                      body;
                    return firstParagraph.length > 150
                      ? firstParagraph.substring(0, 150) + "..."
                      : firstParagraph;
                  })()}
                </p>

                {/* Read More Button */}
                <Button
                  variant="ghost"
                  className="p-0 h-auto text-primary hover:text-primary-glow font-semibold group/btn"
                >
                  {t("news.readMore")}
                  <ArrowRight
                    className={`h-4 w-4 ${
                      isRTL
                        ? "mr-2 rotate-180 group-hover/btn:-translate-x-1"
                        : "ml-2 group-hover/btn:translate-x-1"
                    } transition-transform duration-300`}
                  />
                </Button>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA - Only show if there are more than 3 news items */}
        {newsItems.length > 3 && (
          <div
            className="text-center mt-16 fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <Button size="lg" className="btn-primary" asChild>
              <Link href="/news">
                {t("news.viewAll")}
                <ArrowRight
                  className={`h-5 w-5 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`}
                />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
