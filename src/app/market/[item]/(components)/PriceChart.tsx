"use client";

import { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Chart.js 등록
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface PriceChartProps {
    categoryCode: string;
    itemCode: string;
    kindCode: string;
    rankCode: string;
    countryCode: string | null;
}

interface PeriodPriceItem {
    itemname: string | null;
    kindname: string | null;
    countyname: string;
    marketname: string | null;
    yyyy: string;
    regday: string;
    price: string;
}

type PeriodType = "1month" | "3months" | "6months" | "1year";

const PERIOD_CONFIG = {
    "1month": { label: "1개월", days: 30 },
    "3months": { label: "3개월", days: 90 },
    "6months": { label: "6개월", days: 180 },
    "1year": { label: "1년", days: 365 },
};

export function PriceChart({ categoryCode, itemCode, kindCode, rankCode, countryCode }: PriceChartProps) {
    const [period, setPeriod] = useState<PeriodType>("1month");
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // 날짜 계산 함수
    const calculateDates = (days: number) => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days);

        const formatDate = (date: Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        return {
            startday: formatDate(startDate),
            endday: formatDate(endDate),
        };
    };

    // 차트 데이터 가져오기
    const fetchChartData = async (selectedPeriod: PeriodType) => {
        setLoading(true);
        setError(null);

        try {
            const { startday, endday } = calculateDates(PERIOD_CONFIG[selectedPeriod].days);

            // API URL 생성
            const params = new URLSearchParams({
                p_startday: startday,
                p_endday: endday,
                p_itemcategorycode: categoryCode,
                p_itemcode: itemCode,
                p_kindcode: kindCode,
                p_productrankcode: rankCode,
            });

            if (countryCode) {
                params.append("p_countrycode", countryCode);
            }

            const response = await fetch(`/api/market/period-price?${params.toString()}`);

            if (!response.ok) {
                throw new Error("데이터를 가져오는데 실패했습니다.");
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // 데이터 처리
            const items: PeriodPriceItem[] = data.data.item;

            // "평균" 데이터만 필터링 (전체 지역 평균)
            const averageItems = countryCode
                ? items.filter(item => item.countyname !== "평년")
                : items.filter(item => item.countyname === "평균");

            // 날짜별로 그룹핑
            const dateMap = new Map<string, number>();

            averageItems.forEach(item => {
                const dateKey = `${item.regday}`;
                const priceValue = parseInt(item.price.replace(/,/g, ""), 10);

                if (!isNaN(priceValue)) {
                    if (!dateMap.has(dateKey)) {
                        dateMap.set(dateKey, priceValue);
                    }
                }
            });

            // 날짜 순서로 정렬
            const sortedDates = Array.from(dateMap.keys()).sort((a, b) => {
                const [monthA, dayA] = a.split("/").map(Number);
                const [monthB, dayB] = b.split("/").map(Number);
                if (monthA !== monthB) return monthA - monthB;
                return dayA - dayB;
            });

            const labels = sortedDates;
            const prices = sortedDates.map(date => dateMap.get(date)!);

            // Chart.js 데이터 형식으로 변환
            setChartData({
                labels,
                datasets: [
                    {
                        label: "평균 가격 (원)",
                        data: prices,
                        borderColor: "rgb(59, 130, 246)",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        tension: 0.4,
                        fill: true,
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        pointBackgroundColor: "rgb(59, 130, 246)",
                        pointBorderColor: "#fff",
                        pointBorderWidth: 2,
                    },
                ],
            });
        } catch (err) {
            console.error("차트 데이터 조회 오류:", err);
            setError(err instanceof Error ? err.message : "데이터를 가져오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // 기간 변경 시 데이터 다시 가져오기
    useEffect(() => {
        fetchChartData(period);
    }, [period, categoryCode, itemCode, kindCode, rankCode, countryCode]);

    // Chart.js 옵션
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `가격: ${context.parsed.y.toLocaleString()}원`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    callback: function (value: any) {
                        return value.toLocaleString() + "원";
                    },
                },
                grid: {
                    color: "rgba(0, 0, 0, 0.05)",
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
        interaction: {
            mode: "index" as const,
            intersect: false,
        },
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle>가격 추이</CardTitle>
                    <Tabs value={period} onValueChange={(value) => setPeriod(value as PeriodType)}>
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="1month">1개월</TabsTrigger>
                            <TabsTrigger value="3months">3개월</TabsTrigger>
                            <TabsTrigger value="6months">6개월</TabsTrigger>
                            <TabsTrigger value="1year">1년</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </CardHeader>
            <CardContent>
                {loading && (
                    <div className="flex items-center justify-center h-[300px]">
                        <p className="text-gray-500">데이터를 불러오는 중...</p>
                    </div>
                )}

                {error && (
                    <div className="flex items-center justify-center h-[300px]">
                        <p className="text-red-500">{error}</p>
                    </div>
                )}

                {!loading && !error && chartData && (
                    <div className="h-[300px]">
                        <Line data={chartData} options={options} />
                    </div>
                )}

                {!loading && !error && !chartData && (
                    <div className="flex items-center justify-center h-[300px]">
                        <p className="text-gray-500">데이터가 없습니다.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

