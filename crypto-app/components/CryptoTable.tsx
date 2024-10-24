"use client";

import { useState, useMemo, memo } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Skeleton from "./Skeleton";

interface SortConfig {
  key: string;
  direction: string;
}

interface CryptoTableProps {
  cryptos: any[];
  isLoading: boolean;
  currentPage: number;
}

const CryptoTable = memo(({ cryptos, isLoading, currentPage }: CryptoTableProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'market_cap', direction: 'descending' });

  const sortData = (key: string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedCryptos = useMemo(() => {
    if (!cryptos) return [];
    return [...cryptos].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
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

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">Rank</TableHead>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[100px]">Ticker</TableHead>
            <TableHead className="text-right w-[120px]">
              <Button variant="ghost" onClick={() => sortData('current_price')} aria-label="Sort by Price">
                Price <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right w-[120px]">
              <Button variant="ghost" onClick={() => sortData('price_change_percentage_24h')} aria-label="Sort by 24h %">
                24h % <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right w-[200px]">
              <Button variant="ghost" onClick={() => sortData('market_cap')} aria-label="Sort by Market Cap">
                Market Cap <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right w-[200px]">
              <Button variant="ghost" onClick={() => sortData('total_volume')} aria-label="Sort by Volume (24h)">
                Volume (24h) <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right w-[200px]">Circulating Supply</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? renderSkeletonRows() : (
            sortedCryptos.map((crypto, index) => (
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
                <TableCell className={`text-right ${crypto.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </TableCell>
                <TableCell className="text-right">${crypto.market_cap.toLocaleString()}</TableCell>
                <TableCell className="text-right">${crypto.total_volume.toLocaleString()}</TableCell>
                <TableCell className="text-right">{crypto.circulating_supply.toLocaleString()} {crypto.symbol.toUpperCase()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
});

export default CryptoTable;