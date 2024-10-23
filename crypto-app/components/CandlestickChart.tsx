"use client";

import { useEffect, useRef } from 'react';
import { createChart, IChartApi } from 'lightweight-charts';

export interface CandlestickData {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
}

interface CandlestickChartProps {
    data: CandlestickData[];
}

export function CandlestickChart({ data }: CandlestickChartProps) {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);

    useEffect(() => {
        if (chartContainerRef.current && data && data.length > 0) {
            chartRef.current = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: 400,
                layout: {
                    // background: { type: 'solid', color: 'white' },
                    background: { color: 'white' },
                    textColor: 'black',
                },
                grid: {
                    vertLines: { color: '#e0e0e0' },
                    horzLines: { color: '#e0e0e0' },
                },
            });

            const candlestickSeries = chartRef.current.addCandlestickSeries();
            candlestickSeries.setData(data);

            const handleResize = () => {
                if (chartRef.current && chartContainerRef.current) {
                    chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
                }
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                if (chartRef.current) {
                    chartRef.current.remove();
                }
            };
        }
    }, [data]);

    return <div ref={chartContainerRef} />;
}