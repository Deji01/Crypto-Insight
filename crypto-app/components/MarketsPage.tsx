"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import CryptoTable from "../components/CryptoTable";
import Pagination from "../components/Pagination";
import ErrorComponent from "./ErrorComponent";

interface OldData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  [key: string]: string | number; // This allows for any additional string or number properties
}

const fetchCryptos = async (page = 1, perPage = 50) => {
  const response = await axios.get("/api/crypto", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: perPage,
      page: page,
      sparkline: false,
    },
  });
  return response.data;
};

export default function MarketsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState({ key: "market_cap", direction: "descending" });
  const queryClient = useQueryClient();

  const { data: cryptos, isLoading, isError, refetch } = useQuery({
    queryKey: ["cryptos", currentPage],
    queryFn: () => fetchCryptos(currentPage),
  });

  const handleSort = (key: string) => {
    const newDirection = sortConfig.key === key && sortConfig.direction === "ascending" ? "descending" : "ascending";
    setSortConfig({ key, direction: newDirection });

    queryClient.setQueryData(["cryptos", currentPage], (oldData: OldData[] | undefined) => {
      if (!oldData) return oldData;
      return [...oldData].sort((a, b) => {
        if (a[key] < b[key]) return newDirection === "ascending" ? -1 : 1;
        if (a[key] > b[key]) return newDirection === "ascending" ? 1 : -1;
        return 0;
      });
    });
  };

  // const handleAssetClick = (id: string) => {
  //   setSelectedAsset(id);
  // };

  // const handleBackClick = () => {
  //   setSelectedAsset(null);
  // };

  // if (selectedAsset) {
  //   return <AssetDetailsPage assetId={selectedAsset} onBackClick={handleBackClick} />;
  // }

  if (isError) {
    return (
      <ErrorComponent
        message="Error loading trending assets. Please try again later."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardContent>
        <div className="overflow-auto">
          <CryptoTable
            cryptos={cryptos || []}
            isLoading={isLoading}
            currentPage={currentPage}
            onSort={handleSort}
            sortConfig={sortConfig}
          />
        </div>
        <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
      </CardContent>
    </Card>
  );
}
