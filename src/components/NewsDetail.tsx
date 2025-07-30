"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Share2, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { newsApi, NewsData } from "@/lib/api";

interface NewsDetailProps {
  newsId: string;
}

const NewsDetail = ({ newsId }: NewsDetailProps) => {
  const { t, isRTL, language } = useLanguage();
  const [news, setNews] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await newsApi.getById(parseInt(newsId));
        setNews(response.data);
      } catch (err) {
        console.error("Error fetching news detail:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load news article"
        );
      } finally {
        setLoading(false);
      }
    };

    if (newsId) {
      fetchNewsDetail();
    }
  }, [newsId]);

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
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-primary" />
          <p className="text-xl text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-red-600 mb-6">
            {error || "Failed to load article"}
          </p>
          <div className="space-x-4">
            <Button onClick={() => window.location.reload()}>Try Again</Button>
            <Button variant="outline" asChild>
              <Link href="/#news">Return to News</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Process the body content for display
  const processBodyContent = (body: string) => {
    // Split by double line breaks and wrap each paragraph in <p> tags
    const paragraphs = body
      .split("\r\n\r\n")
      .map((paragraph) => paragraph.trim())
      .filter((paragraph) => paragraph.length > 0);

    return paragraphs
      .map((paragraph) => {
        // Check if it's a numbered list item (starts with number and dot)
        if (/^\d+\./.test(paragraph)) {
          return `<h3 class="text-xl font-semibold text-foreground mt-8 mb-4">${paragraph}</h3>`;
        }
        // Check if it's a heading (starts with number and space)
        else if (/^\d+\s/.test(paragraph)) {
          const parts = paragraph.split(" ");
          const number = parts[0];
          const title = parts.slice(1).join(" ");
          return `<h3 class="text-xl font-semibold text-foreground mt-8 mb-4">${number} ${title}</h3>`;
        }
        // Regular paragraph
        else {
          return `<p class="mb-6 leading-relaxed">${paragraph}</p>`;
        }
      })
      .join("");
  };

  const articleTitle = language === "ar" ? news.title_ar : news.title_en;
  const articleBody = language === "ar" ? news.body_ar : news.body_en;
  const articleContent = language === "ar" ? news.content_ar : news.content_en;
  const articleKeywords = language === "ar" ? news.keyword_ar : news.keyword_en;

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: articleTitle,
    description: articleContent || articleBody,
    image: news.image,
    author: {
      "@type": "Organization",
      name: "IMIC Design Team",
    },
    publisher: {
      "@type": "Organization",
      name: "IMIC Design",
      logo: {
        "@type": "ImageObject",
        url: "/imic l-01.png",
      },
    },
    datePublished: news.created_at,
    dateModified: news.updated_at,
    keywords: articleKeywords,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": typeof window !== "undefined" ? window.location.href : "",
    },
  };

  return (
    <div className="pt-24">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-dark overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8 fade-in-up">
              <Link href="/" className="hover:text-primary transition-colors">
                {t("nav.home")}
              </Link>
              <span>/</span>
              <Link
                href="/#news"
                className="hover:text-primary transition-colors"
              >
                {t("nav.news")}
              </Link>
              <span>/</span>
              <span className="text-foreground">{articleTitle}</span>
            </nav>

            {/* Article Header */}
            <div className="space-y-6 mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground fade-in-up">
                {articleTitle}
              </h1>

              {/* Meta Info */}
              <div
                className="flex flex-wrap items-center gap-6 text-muted-foreground fade-in-up"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(news.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>IMIC Design Team</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Navigation */}
              <div
                className="flex flex-wrap gap-4 fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <Button variant="outline" asChild>
                  <Link href="/">
                    <ArrowLeft
                      className={`h-4 w-4 ${
                        isRTL ? "ml-2 rotate-180" : "mr-2"
                      }`}
                    />
                    Back to Home
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/#news">View All News</Link>
                </Button>
              </div>
            </div>

            {/* Featured Image */}
            <div
              className="aspect-[16/9] overflow-hidden rounded-2xl shadow-elegant mb-12 fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <img
                src={news.image}
                alt={articleTitle}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg max-w-none fade-in-up"
              style={{
                animationDelay: "0.2s",
                color: "hsl(var(--muted-foreground))",
              }}
              dangerouslySetInnerHTML={{
                __html: processBodyContent(articleBody),
              }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 fade-in-up">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground">
              Ready to Apply These Ideas?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Let our expert team help you incorporate the latest design trends
              into your space
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="btn-primary" asChild>
                <Link href="/#contact">Get Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/#services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetail;
