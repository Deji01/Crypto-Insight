import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent} from "@/components/ui/card";
import CryptoTable from '../components/CryptoTable';
import Pagination from '../components/Pagination';
import AssetDetailsPage from './AssetDetailsPage';


interface Data {
  price_change_percentage_24h: PriceChange
}

interface PriceChange {
  usd: number
}

interface Crypto {
  item: {
    id: string
    symbol: string
    name: string
    small: string
    market_cap_rank: number
    price_btc: number
    score: number
    data: Data
  }
}

const fetchCryptos = async (page = 1, perPage = 50) => {
  const response = await axios.get(process.env.MARKET_URL!, {
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
  const [sortConfig, setSortConfig] = useState({ key: 'market_cap', direction: 'descending' })
  const queryClient = useQueryClient()

  const { data: cryptos, isLoading, isError } = useQuery({
    queryKey: ['cryptos', currentPage],
    queryFn: () => fetchCryptos(currentPage)
  })

  const handleAssetClick = (id: string) => {
    setSelectedAsset(id)
  }

  const handleBackClick = () => {
    setSelectedAsset(null)
  }

  const handleSort = (key: string) => {
    const newDirection = sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    setSortConfig({ key, direction: newDirection });

    // Optimistic update
    queryClient.setQueryData(['cryptos', currentPage], (oldData: Crypto[] | undefined) => {
      if (!oldData) return oldData;
      return [...oldData].sort((a, b) => {
        const valueA = a.item[key as keyof typeof a.item] as any;
        const valueB = b.item[key as keyof typeof b.item] as any;

        if (valueA < valueB) return newDirection === 'ascending' ? -1 : 1;
        if (valueA > valueB) return newDirection === 'ascending' ? 1 : -1;
        return 0;
      });
    });
  };



  if (selectedAsset) {
    return <AssetDetailsPage assetId={selectedAsset} onBackClick={handleBackClick} />
  }

  return (
    <Card className="w-full overflow-hidden">
      {/* <CardHeader>
        <CardTitle>Cryptocurrency Markets</CardTitle>
      </CardHeader> */}
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
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={setCurrentPage}
        />
      </CardContent>
    </Card>
  )
}