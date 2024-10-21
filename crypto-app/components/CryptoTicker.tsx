import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';

interface Crypto {
    id: string
    symbol: string
    name: string
    image: string
    price_change_percentage_24h: number
}

const fetchTopCryptos = async (): Promise<Crypto[]> => {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 20,
            page: 1,
            sparkline: false
        }
    })
    return response.data
}

export default function CryptoTicker() {
    const { data: cryptos, isLoading, isError } = useQuery<Crypto[], Error>({
        queryKey: ['topCryptos'],
        queryFn: fetchTopCryptos
    })

    const [tickerWidth, setTickerWidth] = useState(0)

    useEffect(() => {
        if (cryptos) {
            setTickerWidth(cryptos.length * 200) // Adjust this value based on your item width
        }
    }, [cryptos])

    if (isLoading) return <div className="py-2 bg-gray-100">Loading ticker...</div>
    if (isError) return <div className="py-2 bg-gray-100">Error loading ticker</div>
    if (!cryptos || cryptos.length === 0) return null

    return (
        <div className="overflow-hidden bg-gray-100 py-2">
            <motion.div
                className="flex"
                animate={{ x: [-tickerWidth, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 30,
                    ease: "linear"
                }}
            >
                {cryptos.map((crypto: Crypto) => (
                    <div key={crypto.id} className="flex items-center space-x-2 mr-8">
                        <img src={crypto.image} alt={crypto.name} className="w-6 h-6" />
                        <span className="font-bold">{crypto.symbol.toUpperCase()}</span>
                        <span className={`${crypto.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {crypto.price_change_percentage_24h.toFixed(2)}%
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}