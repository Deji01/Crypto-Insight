"use client";

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CandlestickChart, CandlestickData } from "@/components/CandlestickChart";
import { LineChart, LineChartData } from "@/components/LineChart";

interface AssetDetailsPageProps {
    assetId: string;
    onBackClick: () => void;
}

// Define the type for OHLC data returned from the API
interface OHLCData {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
}

const fetchAssetDetails = async (id: string) => {
    const response = await axios.get(`${process.env.COIN_URL!}/${id}`);
    return response.data;
};

const fetchAssetChartData = async (id: string): Promise<CandlestickData[]> => {
    const response = await axios.get(`${process.env.COIN_URL!}/${id}/ohlc?vs_currency=usd&days=7`);
    return response.data.map(([timestamp, open, high, low, close]: [number, number, number, number, number]) => ({
        time: new Date(timestamp).toISOString().split('T')[0], // Use timestamp correctly
        open,
        high,
        low,
        close
    }));;
};

export default function AssetDetailsPage({ assetId, onBackClick }: AssetDetailsPageProps) {
    const { data: assetDetails, isLoading: isLoadingAssetDetails } = useQuery({
        queryKey: ['assetDetails', assetId],
        queryFn: () => fetchAssetDetails(assetId),
    });

    const { data: assetChartData, isLoading: isLoadingAssetChartData } = useQuery({
        queryKey: ['assetChartData', assetId],
        queryFn: () => fetchAssetChartData(assetId),
    });

    return (
        <div>
            <Button onClick={onBackClick} className="mb-4">
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
            <Card>
                <CardHeader>
                    <CardTitle>{assetDetails?.name} ({assetDetails?.symbol.toUpperCase()})</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoadingAssetDetails || isLoadingAssetChartData ? (
                        <p>Loading asset details...</p>
                    ) : (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="font-bold">Price:</p>
                                    <p>${assetDetails.market_data.current_price.usd.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="font-bold">Market Cap:</p>
                                    <p>${assetDetails.market_data.market_cap.usd.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="font-bold">24h Change:</p>
                                    <p className={assetDetails.market_data.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}>
                                        {assetDetails.market_data.price_change_percentage_24h.toFixed(2)}%
                                    </p>
                                </div>
                                <div>
                                    <p className="font-bold">24h Volume:</p>
                                    <p>${assetDetails.market_data.total_volume.usd.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="h-[400px]">
                                <CandlestickChart data={assetChartData as CandlestickData[]} />
                            </div>
                            <div className="h-[400px]">
                                {assetChartData && (
                                    <LineChart data={assetChartData.map(({ time, close }) => ({
                                        date: new Date(time),
                                        value: close
                                    })) as LineChartData[]} />
                                )}
                            </div>

                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
