import NewsDetail from "@/components/NewsDetail";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { newsApi } from "@/lib/api";

interface NewsPageProps {
  params: {
    newsId: string;
  };
}



// Generate metadata for SEO
export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  try {
    const response = await newsApi.getById(parseInt(params.newsId));
    const news = response.data;

    const title = news.title_en || news.title_ar || "News Article";
    const description =
      news.content_en ||
      news.content_ar ||
      news.body_en ||
      news.body_ar ||
      "Read our latest news article";
    const keywords =
      news.keyword_en || news.keyword_ar || "interior design, news, IMIC";

    return {
      title: `${title} - IMIC Design`,
      description:
        description.length > 160
          ? description.substring(0, 160) + "..."
          : description,
      keywords: keywords,
      alternates: {
        canonical: `/news/${params.newsId}`,
      },
      openGraph: {
        title: title,
        description: description,
        type: "article",
        locale: news.title_ar ? "ar_SA" : "en_US",
        alternateLocale: news.title_ar ? "en_US" : "ar_SA",
        images: [
          {
            url: news.image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: [news.image],
      },
    };
  } catch (error) {
    return {
      title: "News Article - IMIC Design",
      description: "Read our latest news and updates about interior design",
    };
  }
}

export default function NewsPage({ params }: NewsPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <NewsDetail newsId={params.newsId} />
      </main>
      <Footer />
    </div>
  );
}
