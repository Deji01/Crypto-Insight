import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CryptoTicker from './CryptoTicker';
import LoadingSpinner from './LoadingSpinner';

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

interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

const API_KEY = process.env.NEWS_API_KEY!

const fetchCryptoNews = async (page: number = 1, pageSize: number = 10): Promise<NewsArticle[]> => {
  const url = process.env.NEWS_URL!
  const params = {
    q: 'cryptocurrency',
    sortBy: 'publishedAt',
    apiKey: API_KEY,
    language: 'en',
    page,
    pageSize
  }

  try {
    const response = await axios.get<NewsAPIResponse>(url, { params })
    if (response.data.status === 'ok') {
      return response.data.articles
    } else {
      throw new Error('Error fetching news data')
    }
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true)
      const articles = await fetchCryptoNews(page)
      setNews(prevNews => [...prevNews, ...articles])
      setIsLoading(false)
    }

    loadNews()
  }, [page])

  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  return (
    <div className="space-y-4">
      <CryptoTicker />
      <Card>
        <CardHeader>
          <CardTitle>Crypto News</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && news.length === 0 ? (
            <LoadingSpinner />
          ) : (
            <>
              <ul className="space-y-4">
                {news.map((article, index) => (
                  <li key={index} className="border-b last:border-b-0 pb-4">
                    <h3 className="font-medium text-lg">
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {article.title}
                      </a>
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {article.source.name} - {new Date(article.publishedAt).toLocaleString()}
                    </p>
                    <p className="mt-2">{article.description}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-center">
                <Button onClick={loadMore} disabled={isLoading}>
                  {isLoading ? <LoadingSpinner /> : 'Load More'}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}