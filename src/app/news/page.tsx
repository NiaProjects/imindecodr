"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Calendar, User, Loader2, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { newsApi, NewsData } from "@/lib/api";
import NewsBar from "@/components/NewsBar";

const NewsPage = () => {
  const { t, isRTL, language } = useLanguage();
  const [newsItems, setNewsItems] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllNews = async () => {
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

    fetchAllNews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isRTL ? "ar-AE" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-primary" />
            <p className="text-xl text-muted-foreground">Loading all news...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <p className="text-xl text-red-600 mb-6">{error}</p>
            <div className="space-x-4">
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NewsBar />
      <div className="pt-24">
        {/* Header */}
        <section className="py-4 lg:py-10 bg-pattern-subtle-lines">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
              <Link href="/" className="hover:text-primary transition-colors">
                {t("nav.home")}
              </Link>
              <span>/</span>
              <span className="text-foreground">{t("nav.news")}</span>
            </nav>

            {/* Page Header */}
            <div className="text-center mb-16 lg:mb-20">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground mb-6 fade-in-up">
                {t("news.title")}
              </h1>
              <p
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                {t("news.subtitle")}
              </p>
            </div>

            {/* News Count */}
            <div
              className="text-center mb-12 fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <p className="text-muted-foreground">
                {newsItems.length}{" "}
                {newsItems.length === 1 ? "article" : "articles"} found
              </p>
            </div>

            {/* News Grid */}
            {newsItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {newsItems.map((news, index) => (
                  <Link
                    key={news.id}
                    href={`/news/${news.id}`}
                    className="card-elegant group cursor-pointer block fade-in-up"
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
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                      <h3 className="text-xl md:text-2xl font-playfair font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {language === "ar" ? news.title_ar : news.title_en}
                      </h3>

                      {/* Summary - Extract first paragraph from body */}
                      <p className="text-muted-foreground leading-relaxed line-clamp-3">
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
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground mb-6">
                  No news articles found
                </p>
                <Button asChild>
                  <Link href="/">
                    <ArrowLeft
                      className={`h-4 w-4 ${
                        isRTL ? "ml-2 rotate-180" : "mr-2"
                      }`}
                    />
                    Back to Home
                  </Link>
                </Button>
              </div>
            )}

            {/* Back to Home */}
            <div
              className="text-center mt-16 fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <Button variant="outline" asChild>
                <Link href="/">
                  <ArrowLeft
                    className={`h-4 w-4 ${isRTL ? "ml-2 rotate-180" : "mr-2"}`}
                  />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewsPage;
