import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CryptoTicker from "@/components/CryptoTicker";

const fetchCryptoNews = async () => {
  const response = await axios.get('https://cointelegraph.com/rss')
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(response.data, "text/xml")
  const items = xmlDoc.getElementsByTagName("item")
  const news = []
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    news.push({
      title: item.getElementsByTagName("title")[0]?.textContent || '',
      link: item.getElementsByTagName("link")[0]?.textContent || '',
      pubDate: item.getElementsByTagName("pubDate")[0]?.textContent || '',
      description: item.getElementsByTagName("description")[0]?.textContent || '',
    })
  }
  return news
}

export default function NewsPage() {
  const { data: cryptoNews, isLoading, isError } = useQuery({
    queryKey: ['cryptoNews'],
    queryFn: fetchCryptoNews
  })

  return (
    <div className="space-y-4">
      <CryptoTicker />
      <Card>
        <CardHeader>
          <CardTitle>Crypto News</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading news...</p>
          ) : isError ? (
            <p>Error fetching news. Please try again later.</p>
          ) : cryptoNews && cryptoNews.length > 0 ? (
            <ul className="space-y-4">
              {cryptoNews.map((news, index) => (
                <li key={index} className="border-b last:border-b-0 pb-4">
                  <h3 className="font-medium text-lg">
                    <a href={news.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {news.title}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{new Date(news.pubDate).toLocaleString()}</p>
                  <p className="mt-2">{news.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No news available at the moment.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}