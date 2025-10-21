"use client";

import { useState, useEffect, useMemo } from "react";
import { AppLayout } from "@/components/app-layout";
import { FilterBar, FilterState } from "@/components/filter-bar";
import { FilterBottomSheet } from "@/components/filter-bottom-sheet";
import { TrendingUp, BarChart3, Loader2 } from "lucide-react";

// 개별 품목 가격 정보
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
  day2: string;
  dpr2: string;
  day3: string;
  dpr3: string;
  day4: string;
  dpr4: string;
  day5: string;
  dpr5: string;
  day6: string;
  dpr6: string;
  day7: string;
  dpr7: string;
}

// API 응답 데이터
interface PriceData {
  error_code: string;
  item: PriceItem[];
}

interface KamisApiResponse {
  condition: any[];
  data: PriceData;
}

export default function MarketPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: { code: "400", name: "과일류" }
  });
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [allPriceData, setAllPriceData] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API 재요청이 필요한 필터 (지역, 부류)
  const apiFilters = useMemo(() => ({
    countryCode: filters.countryCode?.code,
    categoryCode: filters.category?.code,
  }), [filters.countryCode, filters.category]);

  // API 재요청이 필요한 필터가 변경되면 데이터 다시 가져오기
  useEffect(() => {
    fetchPriceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiFilters.countryCode, apiFilters.categoryCode]);

  const fetchPriceData = async () => {
    try {
      setLoading(true);
      setError(null);

      // API URL에 필터 파라미터 추가
      const params = new URLSearchParams();
      if (apiFilters.categoryCode) {
        params.set("p_category_code", apiFilters.categoryCode);
      }
      if (apiFilters.countryCode) {
        params.set("p_country_code", apiFilters.countryCode);
      }

      const url = `/api/market/day-price${params.toString() ? `?${params.toString()}` : ''}`;
      console.log('API 요청 URL:', url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("가격 정보를 불러오는데 실패했습니다.");
      }

      const data: KamisApiResponse = await response.json();
      console.log(123, data)
      setAllPriceData(data.data.item);
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
      console.error("가격 데이터 로딩 중 오류:", err);
    } finally {
      setLoading(false);
    }
  };

  // 클라이언트 측 필터링 (품목, 품종, 등급)
  const filteredPriceData = useMemo(() => {
    let filtered = [...allPriceData];

    // 품목 필터링
    if (filters.item) {
      filtered = filtered.filter(item => item.item_code === filters.item!.code);
    }

    // 품종 필터링
    if (filters.kind) {
      filtered = filtered.filter(item => item.kind_code === filters.kind!.code);
    }

    // 등급 필터링
    if (filters.rank) {
      filtered = filtered.filter(item => item.rank_code === filters.rank!.code);
    }

    return filtered;
  }, [allPriceData, filters.item, filters.kind, filters.rank]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  // 가격 포맷팅 함수
  const formatPrice = (price: string) => {
    if (!price || price === "-") return "가격 정보 없음";
    // 쉼표가 포함된 문자열에서 쉼표를 제거한 후 파싱
    const cleanPrice = price.replace(/,/g, "");
    const numericPrice = parseFloat(cleanPrice);
    return `${numericPrice.toLocaleString()}원`;
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50">
        {/* 필터 영역 */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-4xl mx-auto p-4">
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onOpenBottomSheet={handleOpenBottomSheet}
            />
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="max-w-4xl mx-auto p-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] p-6">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <p className="text-gray-500">농산물 가격 정보를 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <BarChart3 className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">오류가 발생했습니다</h3>
                <p className="text-gray-500">{error}</p>
                <button
                  onClick={fetchPriceData}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  다시 시도
                </button>
              </div>
            </div>
          ) : filteredPriceData.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <BarChart3 className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">검색 결과가 없습니다</h3>
                <p className="text-gray-500">다른 필터 조건을 선택해보세요</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 pb-6">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-800">오늘의 농산물 가격</h1>
                <p className="text-sm text-gray-500 mt-1">
                  총 {filteredPriceData.length}개 품목
                  {allPriceData.length !== filteredPriceData.length && (
                    <span className="text-blue-500"> (전체 {allPriceData.length}개 중)</span>
                  )}
                </p>
              </div>

              {filteredPriceData.map((item, index) => (
                <div
                  key={`${item.item_code}-${item.kind_code}-${item.rank_code}-${index}`}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {item.item_name}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {item.kind_name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                          {item.rank}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span>{item.unit}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatPrice(item.dpr1)}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {item.day1}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Sheet */}
        <FilterBottomSheet
          isOpen={isBottomSheetOpen}
          onClose={handleCloseBottomSheet}
          filters={filters}
          onApplyFilters={handleApplyFilters}
        />
      </div>
    </AppLayout>
  );
}
