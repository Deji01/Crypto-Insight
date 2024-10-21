import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CryptoTable from '../components/CryptoTable';
import Pagination from '../components/Pagination';
import AssetDetailsPage from './AssetDetailsPage';

const fetchCryptos = async (page = 1, perPage = 50) => {
  const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: perPage,
      page: page,
      sparkline: false
    }
  })
  return response.data
}

export default function MarketsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)
  const { data: cryptos, isLoading } = useQuery({
    queryKey: ['cryptos', currentPage],
    queryFn: () => fetchCryptos(currentPage)
  })

  const handleAssetClick = (id: string) => {
    setSelectedAsset(id)
  }

  const handleBackClick = () => {
    setSelectedAsset(null)
  }

  if (selectedAsset) {
    return <AssetDetailsPage assetId={selectedAsset} onBackClick={handleBackClick} />
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle>Cryptocurrency Markets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <CryptoTable
            cryptos={cryptos || []}
            isLoading={isLoading}
            onAssetClick={handleAssetClick}
            currentPage={currentPage}
          />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={setCurrentPage}
        />
      </CardContent>
    </Card>
  )
}