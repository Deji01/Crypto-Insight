import { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CryptoTableProps {
  cryptos: any[]
  isLoading: boolean
  onAssetClick: (id: string) => void
  currentPage: number
}

export default function CryptoTable({ cryptos, isLoading, onAssetClick, currentPage }: CryptoTableProps) {
  const [sortConfig, setSortConfig] = useState({ key: 'market_cap', direction: 'descending' })

  const sortData = (key: string) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const sortedCryptos = cryptos ? [...cryptos].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1
    }
    return 0
  }) : []

  return (
    <div className="overflow-auto max-w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">Rank</TableHead>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[100px]">Ticker</TableHead>
            <TableHead className="text-right w-[120px]">
              <Button variant="ghost" onClick={() => sortData('current_price')}>
                Price <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right w-[120px]">
              <Button variant="ghost" onClick={() => sortData('price_change_percentage_24h')}>
                24h % <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right w-[200px]">
              <Button variant="ghost" onClick={() => sortData('market_cap')}>
                Market Cap <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right w-[200px]">
              <Button variant="ghost" onClick={() => sortData('total_volume')}>
                Volume (24h) <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right w-[200px]">Circulating Supply</TableHead>
            <TableHead className="text-right w-[200px]">Max Supply</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center">Loading...</TableCell>
            </TableRow>
          ) : (
            sortedCryptos.map((crypto, index) => (
              <TableRow key={crypto.id} onClick={() => onAssetClick(crypto.id)} className="cursor-pointer">
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
                <TableCell className="text-right">{crypto.max_supply ? crypto.max_supply.toLocaleString() : 'N/A'} {crypto.symbol.toUpperCase()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}