'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MarketsPage from '@/components/MarketsPage'
import TrendingPage from '@/components/TrendingPage'
import NewsPage from '@/components/NewsPage'
import PortfolioPage from '@/components/PortfolioPage'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const queryClient = new QueryClient()

export default function CryptoDashboard() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-white text-black min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto p-4 flex-grow">
          <Tabs defaultValue="markets" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="markets">Markets</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>
            <TabsContent value="markets">
              <MarketsPage />
            </TabsContent>
            <TabsContent value="trending">
              <TrendingPage />
            </TabsContent>
            <TabsContent value="news">
              <NewsPage />
            </TabsContent>
            <TabsContent value="portfolio">
              <PortfolioPage />
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  )
}