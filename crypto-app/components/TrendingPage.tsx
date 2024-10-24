"use client";

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Crypto from "@/lib/crypto";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import Skeleton from './Skeleton';
import ErrorComponent from './ErrorComponent';
import Image from 'next/image';

const fetchTrendingCryptos = async () => {
  const response = await axios.get('/api/trending');
  return response.data.coins;
};

export default function TrendingPage() {
  const { data: trendingCryptos, isLoading, isError, refetch } = useQuery({
    queryKey: ['trendingCryptos'],
    queryFn: fetchTrendingCryptos
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Trending Assets</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="w-24 h-6" />
                  </div>
                  <Skeleton className="w-10 h-6" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-12 h-4" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-12 h-4" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-12 h-4" />
                  </div>
                  <Skeleton className="w-24 h-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorComponent
        message="Error loading trending assets. Please try again later."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <TrendingUp className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Trending Assets</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingCryptos.map((crypto: Crypto) => (
          <Card key={crypto.item.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {/* <img src={crypto.item.small} alt={crypto.item.name} className="w-8 h-8" /> */}
                  <Image
                    src={crypto.item.small}
                    alt={crypto.item.name}
                    width={8}
                    height={8}
                  />
                  <CardTitle>{crypto.item.name}</CardTitle>
                </div>
                <Badge variant="outline">{crypto.item.symbol}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Market Cap Rank</span>
                  <span className="font-semibold">{crypto.item.market_cap_rank || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Price (BTC)</span>
                  <span className="font-semibold">{crypto.item.price_btc.toFixed(8)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Score</span>
                  <span className="font-semibold">{crypto.item.score + 1}</span>
                </div>
                {crypto.item.data.price_change_percentage_24h && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">24h Change</span>
                    <div className={`flex items-center ${crypto.item.data.price_change_percentage_24h.usd >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {crypto.item.data.price_change_percentage_24h.usd >= 0 ? (
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 mr-1" />
                      )}
                      {Math.abs(crypto.item.data.price_change_percentage_24h.usd).toFixed(2)}%
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};