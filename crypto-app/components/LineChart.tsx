"use client";

import { useEffect, useRef } from 'react';
import { createChart, IChartApi, LineData } from 'lightweight-charts';

export interface LineChartData {
    date: Date;
    value: number;
}

interface LineChartProps {
    data: LineChartData[];
}

export function LineChart({ data }: LineChartProps) {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);

    // Convert data to the format required by the chart library
    const chartData: LineData[] = data.map(item => ({
        time: item.date.toISOString().split('T')[0], // Convert Date to ISO date string (YYYY-MM-DD)
        value: item.value,
    }));

    useEffect(() => {
        if (chartContainerRef.current) {
            chartRef.current = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: 400,
                layout: {
                    background: { color: 'white' },
                    textColor: 'black',
                },
                grid: {
                    vertLines: { color: '#e0e0e0' },
                    horzLines: { color: '#e0e0e0' },
                },
            });

            const lineSeries = chartRef.current.addLineSeries({ color: '#2962FF' });
            lineSeries.setData(chartData); // Use the converted data

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
    }, [chartData]);

    return <div ref={chartContainerRef} />;
}
