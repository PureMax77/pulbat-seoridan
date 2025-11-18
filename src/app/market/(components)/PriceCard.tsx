"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface PriceItem {
    item_name: string;
    item_code: string;
    kind_name: string;
    kind_code: string;
    rank: string;
    rank_code: string;
    unit: string;
    day1: string;
    dpr1: string;
}

interface PriceCardProps {
    item: PriceItem;
    countryCode?: string;
}

// 가격 포맷팅 함수
const formatPrice = (price: string) => {
    if (!price || price === "-") return "가격 정보 없음";
    // 쉼표가 포함된 문자열에서 쉼표를 제거한 후 파싱
    const cleanPrice = price.replace(/,/g, "");
    const numericPrice = parseFloat(cleanPrice);
    return `${numericPrice.toLocaleString()}원`;
};

export function PriceCard({ item, countryCode }: PriceCardProps) {
    const router = useRouter();

    const handleClick = () => {
        // 등급 코드 정규화 (앞의 0 제거)
        const normalizeCode = (code: string) => {
            const num = parseInt(code, 10);
            return isNaN(num) ? code : String(num);
        };
        const normalizedRankCode = normalizeCode(item.rank_code);

        // 쿼리 파라미터 구성 (품목 코드는 path parameter로, 부류 코드는 품목 코드로부터 계산 가능하므로 제외)
        const params = new URLSearchParams();
        if (countryCode) {
            params.set("p_countrycode", countryCode);
        }
        params.set("p_kindcode", item.kind_code);
        params.set("p_productrankcode", normalizedRankCode);

        // 품목 코드를 path parameter로 전달
        router.push(`/market/${item.item_code}?${params.toString()}`);
    };

    return (
        <Card
            className="hover:shadow-md transition-shadow hover:cursor-pointer"
            onClick={handleClick}
        >
            <CardContent className="p-4">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="/fruit-images/apple.png" alt={item.item_name} />
                                <AvatarFallback>{item.item_name[0]}</AvatarFallback>
                            </Avatar>
                            <h3 className="text-lg font-semibold">
                                {item.item_name}
                            </h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Badge variant="secondary" className="text-xs bg-gradient-to-br from-gray-200 to-gray-300">
                                {item.rank}
                            </Badge>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">{item.kind_name}</span>
                        </div>
                    </div>
                    <div className="text-right h-full">
                        <div className="text-2xl font-bold">
                            {formatPrice(item.dpr1)}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                            {item.unit}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

