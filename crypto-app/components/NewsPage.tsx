import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CryptoTicker from './CryptoTicker';
import LoadingSpinner from './LoadingSpinner';
import Skeleton from './Skeleton'; 

// NewsArticle Interface
interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

// Fetch Crypto News Function
const fetchCryptoNews = async (page: number): Promise<NewsArticle[]> => {
  try {
    const response = await axios.get('/api/news', {
      params: { page, pageSize: 10 },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

// NewsPage Component
export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Manage 'Load More' spinner

  // Fetch news on page load or page change
  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true);
      try {
        const articles = await fetchCryptoNews(page);
        setNews((prevNews) => [...prevNews, ...articles]);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadNews();
  }, [page]);

  // Load More Button Handler
  const loadMore = () => {
    setIsLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
    setIsLoadingMore(false);
  };

  return (
    <div className="space-y-6">
      <CryptoTicker />
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Crypto News</CardTitle>
          <CardDescription>Stay updated with the latest cryptocurrency news</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && news.length === 0 ? (
            // Skeleton Loading State
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="overflow-hidden flex flex-col">
                  <Skeleton className="w-full h-48" />
                  <CardContent className="flex-grow flex flex-col p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-10 w-full mt-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((article, index) => (
                  <Card key={index} className="overflow-hidden flex flex-col">
                    {article.urlToImage ? (
                      <img
                        src={article.urlToImage}
                        alt={`Image for ${article.title}`}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="bg-gray-200 w-full h-48 flex justify-center items-center text-gray-500">
                        No Image
                      </div>
                    )}
                    <CardContent className="flex-grow flex flex-col p-4">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                          aria-label={`Read more about ${article.title}`}
                        >
                          {article.title}
                        </a>
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {article.source.name} - {new Date(article.publishedAt).toLocaleString()}
                      </p>
                      <p className="text-sm line-clamp-3 mb-4 flex-grow">
                        {article.description ? article.description : 'No description available'}
                      </p>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full mt-auto"
                        aria-label="Read more about this article"
                      >
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                          Read More
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button
                  onClick={loadMore}
                  disabled={isLoadingMore}
                  size="lg"
                  aria-live="polite"
                >
                  {isLoadingMore ? <LoadingSpinner /> : 'Load More News'}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
