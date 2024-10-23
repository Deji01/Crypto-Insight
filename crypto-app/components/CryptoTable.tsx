"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Skeleton from "./Skeleton";

interface SortConfig {
  key: string;
  direction: string;
}

interface CryptoTableProps {
  cryptos: any[];
  isLoading: boolean;
  currentPage: number;
  onSort: (key: string) => void;
  sortConfig: SortConfig;
}

export default function CryptoTable({ cryptos, isLoading, currentPage, onSort, sortConfig }: CryptoTableProps) {
  const sortedCryptos = useMemo(() => {
    if (!cryptos) return [];
    return [...cryptos].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [cryptos, sortConfig]);

  const renderSkeletonRows = () => (
    [...Array(10)].map((_, index) => (
      <TableRow key={index}>
        <TableCell><Skeleton className="h-6 w-8" /></TableCell>
        <TableCell><Skeleton className="h-6 w-24" /></TableCell>
        <TableCell><Skeleton className="h-6 w-10" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-6 w-12" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-6 w-12" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-6 w-20" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-6 w-20" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-6 w-24" /></TableCell>
      </TableRow>
    ))
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center overflow-auto max-w-full">
        <Table>
          <ScrollArea>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Rank</TableHead>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead className="w-[100px]">Ticker</TableHead>
                <TableHead className="text-right w-[120px]">Price</TableHead>
                <TableHead className="text-right w-[120px]">24h %</TableHead>
                <TableHead className="text-right w-[200px]">Market Cap</TableHead>
                <TableHead className="text-right w-[200px]">Volume (24h)</TableHead>
                <TableHead className="text-right w-[200px]">Circulating Supply</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renderSkeletonRows()}
            </TableBody>
          </ScrollArea>
        </Table>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center overflow-auto max-w-full">
      <Table>
        <ScrollArea>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Rank</TableHead>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[100px]">Ticker</TableHead>
              <TableHead className="text-right w-[120px]">
                <Button variant="ghost" onClick={() => onSort("current_price")}>
                  Price <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right w-[120px]">
                <Button variant="ghost" onClick={() => onSort("price_change_percentage_24h")}>
                  24h % <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right w-[200px]">
                <Button variant="ghost" onClick={() => onSort("market_cap")}>
                  Market Cap <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right w-[200px]">
                <Button variant="ghost" onClick={() => onSort("total_volume")}>
                  Volume (24h) <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right w-[200px]">Circulating Supply</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCryptos.map((crypto, index) => (
              <TableRow key={crypto.id}>
                <TableCell className="font-medium">{(currentPage - 1) * 50 + index + 1}</TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <img src={crypto.image} alt={crypto.name} className="w-6 h-6 mr-2" />
                    <span>{crypto.name}</span>
                  </div>
                </TableCell>
                <TableCell>{crypto.symbol.toUpperCase()}</TableCell>
                <TableCell className="text-right">${crypto.current_price.toLocaleString()}</TableCell>
                <TableCell className={`text-right ${crypto.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}`}>
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </TableCell>
                <TableCell className="text-right">${crypto.market_cap.toLocaleString()}</TableCell>
                <TableCell className="text-right">${crypto.total_volume.toLocaleString()}</TableCell>
                <TableCell className="text-right">{crypto.circulating_supply.toLocaleString()} {crypto.symbol.toUpperCase()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Table>
    </div>
  );
}
