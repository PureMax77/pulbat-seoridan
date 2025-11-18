"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    categories,
    itemsByCategory,
    kindsByItem,
    ranks,
    countryCodes,
    comboRetailRanksFlat,
} from "@/constants/kamis-codemap";
import { MapPin, Leaf, Award } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function MarketDetailPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    // path parameter에서 품목 코드 가져오기
    const itemCode = params.item as string;

    // 부류 코드 계산 (품목 코드의 첫 번째 자리 + "00")
    const categoryCode = itemCode ? itemCode.charAt(0) + "00" : "";

    // 등급 코드 정규화하여 찾기 (앞의 0 제거)
    const normalizeCode = (code: string) => {
        const num = parseInt(code, 10);
        return isNaN(num) ? code : String(num);
    };

    // 쿼리 파라미터에서 값 가져오기
    const kindCodeFromQuery = searchParams.get("p_kindcode");
    const rankCodeFromQuery = searchParams.get("p_productrankcode");

    // 기본값 계산: query가 없으면 첫 번째 품종과 등급 사용
    const availableKinds = kindsByItem[itemCode] || [];
    const defaultKind = availableKinds.length > 0 ? availableKinds[0] : null;
    const selectedKindCode = kindCodeFromQuery || defaultKind?.code || "";
    const selectedKind = availableKinds.find(kind => kind.code === selectedKindCode) || defaultKind;

    // 등급 기본값 계산 (품종에 따라 다를 수 있음)
    const comboKey = selectedKindCode ? `${categoryCode}|${itemCode}|${selectedKindCode}` : "";
    const availableRanks = comboKey && comboRetailRanksFlat[comboKey]
        ? comboRetailRanksFlat[comboKey]
        : ranks;
    const defaultRank = availableRanks.length > 0 ? availableRanks[0] : null;
    const selectedRankCode = rankCodeFromQuery || defaultRank?.code || "";
    const selectedRank = rankCodeFromQuery
        ? (availableRanks.find(rank => normalizeCode(rank.code) === normalizeCode(rankCodeFromQuery)) || defaultRank)
        : defaultRank;

    // 초기값 계산 (렌더링 전에 계산)
    const initialItemName = itemsByCategory[categoryCode]?.find(item => item.code === itemCode)?.name || itemCode;
    const initialKindName = selectedKind?.name || "";
    const initialRankName = selectedRank?.name || "";

    // state로 관리
    const [countryCode, setCountryCode] = useState<string | null>(searchParams.get("p_countrycode"));
    const [itemName, setItemName] = useState<string>(initialItemName);
    const [kindName, setKindName] = useState<string>(initialKindName);
    const [rankName, setRankName] = useState<string>(initialRankName);

    // URL에서 query 제거 (한 번만 실행)
    useEffect(() => {
        // URL에서 query 제거 (history에 남지 않도록 replace 사용)
        const params = new URLSearchParams(searchParams.toString());
        let hasChanges = false;

        if (params.has("p_kindcode")) {
            params.delete("p_kindcode");
            hasChanges = true;
        }

        if (params.has("p_productrankcode")) {
            params.delete("p_productrankcode");
            hasChanges = true;
        }

        if (params.has("p_countrycode")) {
            params.delete("p_countrycode");
            hasChanges = true;
        }

        if (hasChanges) {
            const newUrl = params.toString()
                ? `/market/${itemCode}?${params.toString()}`
                : `/market/${itemCode}`;
            router.replace(newUrl);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // 마운트 시 한 번만 실행

    // 지역 선택 핸들러
    const handleCountryChange = (value: string) => {
        // state만 업데이트 (URL에는 반영하지 않음)
        const newCountryCode = value === "all" ? null : value;
        setCountryCode(newCountryCode);
    };

    return (
        <AppLayout>
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto p-4">
                    <div className="space-y-6">
                        {/* 제목 */}
                        <div className="mb-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="/fruit-images/apple.png" alt={itemName} />
                                    <AvatarFallback>{itemName?.[0] || "?"}</AvatarFallback>
                                </Avatar>
                                <div className="flex items-end gap-2">
                                    <h1 className="text-2xl font-bold text-gray-900">{itemName}</h1>
                                    <span className="text-xl text-gray-500">시세 정보</span>
                                </div>
                            </div>
                        </div>

                        {/* 정보 카드 */}
                        <Card className="pt-6">
                            {/* <CardHeader>
                                {/* <CardTitle>상품 정보</CardTitle> */}
                            {/* </CardHeader> */}
                            <CardContent className="space-y-4">
                                {/* 지역 선택 */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-blue-600" />
                                        <label className="text-sm font-medium text-gray-700">지역</label>
                                    </div>
                                    <Select
                                        value={countryCode || "all"}
                                        onValueChange={handleCountryChange}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="전체" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">전체</SelectItem>
                                            {countryCodes.map((country) => (
                                                <SelectItem key={country.code} value={country.code}>
                                                    {country.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* 품종, 등급 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* 품종 */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Leaf className="h-4 w-4 text-purple-600" />
                                            <label className="text-sm font-medium text-gray-700">품종</label>
                                        </div>
                                        <Badge variant="secondary" className="text-sm px-3 py-1">
                                            {kindName || "미선택"}
                                        </Badge>
                                    </div>

                                    {/* 등급 */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Award className="h-4 w-4 text-amber-600" />
                                            <label className="text-sm font-medium text-gray-700">등급</label>
                                        </div>
                                        <Badge variant="secondary" className="text-sm px-3 py-1">
                                            {rankName || "미선택"}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* 상세 정보 카드 */}
                        <Card>
                            <CardHeader>
                                <CardTitle>상세 정보</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">상세 정보를 불러오는 중...</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

