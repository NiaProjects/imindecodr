"use client";

import React, { useState, useEffect } from "react";
import { barsApi } from "@/lib/api";

const NewsBar = () => {
  const [newsText, setNewsText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchNewsBar = async () => {
      try {
        setIsLoading(true);
        const response = await barsApi.get();

        // Only show the bar if it's active and has text
        if (
          response.status &&
          response.data.is_active === 1 &&
          response.data.text.trim()
        ) {
          setNewsText(response.data.text);
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } catch (error) {
        console.error("Error fetching news bar:", error);
        setIsVisible(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsBar();
  }, []);

  // Don't render if loading, not visible, or no text
  if (isLoading || !isVisible || !newsText) {
    return null;
  }

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          {/* News icon */}
          <div className="flex-shrink-0 mr-3">
            <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></div>
          </div>

          {/* Scrolling text */}
          <div className="flex-1 overflow-hidden">
            <div className="whitespace-nowrap animate-scroll">
              <span className="text-sm font-medium">{newsText}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlays for smooth scrolling effect */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-primary to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-primary to-transparent z-10"></div>
    </div>
  );
};

export default NewsBar;
