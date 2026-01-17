"use client";

import { useState, useEffect, useMemo } from "react";
import { AppLayout } from "@/components/app-layout";
import { FilterBar, FilterState } from "@/components/filter-bar";
import { FilterBottomSheet } from "@/components/filter-bottom-sheet";
import { PriceCard } from "./(components)/PriceCard";
import { BarChart3, Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdaptiveTooltip } from "@/components/adaptive-tooltip";
import { normalizeCode, getCategoryCode, getLatestPriceDate } from "@/lib/utils";
import AnimatedList from "@/components/AnimatedList";

// 날짜별 가격 정보
interface PriceWithDate {
  date: string;
  price: string;
}

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
  priceHistory: PriceWithDate[]; // 4일치 가격 이력 (최신순)
}

// API 응답 데이터
interface PriceData {
  error_code: string;
  item: PriceItem[];
}

interface KamisApiResponse {
  condition: unknown[];
  data: PriceData;
}

export default function MarketPage() {
  // 우선순위 품목 배열 (앞쪽에 표시될 품목들)
  const priorityItems = ['배', '단감', '딸기', '레몬', '망고', '멜론', '바나나', '호박'];

  const [filters, setFilters] = useState<FilterState>({
    category: { code: "all", name: "전체 부류" }
  });
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [allPriceData, setAllPriceData] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);

  // 가격 기준 날짜 계산 (첫 번째 품목의 최신 가격 날짜)
  const priceBaseDate = useMemo(() => {
    if (allPriceData.length === 0) return null;
    return getLatestPriceDate(allPriceData[0].priceHistory);
  }, [allPriceData]);

  // API 재요청이 필요한 필터 (지역만)
  const apiFilters = useMemo(() => ({
    countryCode: filters.countryCode?.code,
  }), [filters.countryCode]);

  // API 재요청이 필요한 필터가 변경되면 데이터 다시 가져오기
  useEffect(() => {
    fetchPriceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiFilters.countryCode]);

  const fetchPriceData = async () => {
    try {
      setLoading(true);
      setError(null);

      // API URL에 필터 파라미터 추가 (지역만)
      const params = new URLSearchParams();
      if (apiFilters.countryCode) {
        params.set("p_country_code", apiFilters.countryCode);
      }

      const url = `/api/market/day-price${params.toString() ? `?${params.toString()}` : ''}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("가격 정보를 불러오는데 실패했습니다.");
      }

      const data: KamisApiResponse = await response.json();
      setAllPriceData(data.data.item);
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
      console.error("가격 데이터 로딩 중 오류:", err);
    } finally {
      setLoading(false);
    }
  };

  // API 데이터에서 실제로 존재하는 필터 옵션 추출
  const availableFilterOptions = useMemo(() => {
    const items = new Map<string, { code: string; name: string; categoryCode: string }>();
    const kinds = new Map<string, { code: string; name: string; itemCode: string }>();
    const ranks = new Map<string, { code: string; name: string; itemCode: string; kindCode: string }>();

    allPriceData.forEach(item => {
      // 품목 추출
      const itemKey = `${item.item_code}`;
      if (!items.has(itemKey)) {
        const categoryCode = getCategoryCode(item.item_code);
        items.set(itemKey, {
          code: item.item_code,
          name: item.item_name,
          categoryCode: categoryCode
        });
      }

      // 품종 추출
      const kindKey = `${item.item_code}|${item.kind_code}`;
      if (!kinds.has(kindKey)) {
        kinds.set(kindKey, {
          code: item.kind_code,
          name: item.kind_name,
          itemCode: item.item_code
        });
      }

      // 등급 추출 (품목, 품종 정보 포함)
      const rankKey = `${item.item_code}|${item.kind_code}|${item.rank_code}|${item.rank}`;
      if (!ranks.has(rankKey)) {
        ranks.set(rankKey, {
          code: item.rank_code,
          name: item.rank,
          itemCode: item.item_code,
          kindCode: item.kind_code
        });
      }
    });

    return {
      items: Array.from(items.values()),
      kinds: Array.from(kinds.values()),
      ranks: Array.from(ranks.values())
    };
  }, [allPriceData]);

  // 클라이언트 측 필터링 (부류, 품목, 품종, 등급)
  const filteredPriceData = useMemo(() => {
    let filtered = [...allPriceData];

    // 부류 필터링 (전체 부류가 아닌 경우에만)
    if (filters.category && filters.category.code !== "all") {
      filtered = filtered.filter(item => {
        const categoryCode = getCategoryCode(item.item_code);
        return categoryCode === filters.category!.code;
      });
    }

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
      const selectedCode = normalizeCode(filters.rank.code);
      const selectedName = filters.rank.name;

      filtered = filtered.filter(item => {
        const itemCode = normalizeCode(item.rank_code);
        // 코드로 비교하거나, 이름으로 비교
        const matchByCode = itemCode === selectedCode;
        const matchByName = item.rank === selectedName;
        return matchByCode || matchByName;
      });
    }

    // 우선순위 품목을 앞쪽으로, 나머지는 한글 순서로 정렬
    filtered.sort((a, b) => {
      const aIndex = priorityItems.indexOf(a.item_name);
      const bIndex = priorityItems.indexOf(b.item_name);

      // 둘 다 우선순위 품목인 경우 우선순위 배열의 순서대로
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }
      // a만 우선순위 품목인 경우
      if (aIndex !== -1) {
        return -1;
      }
      // b만 우선순위 품목인 경우
      if (bIndex !== -1) {
        return 1;
      }
      // 둘 다 우선순위 품목이 아닌 경우 한글 순서로 정렬
      return a.item_name.localeCompare(b.item_name, 'ko');
    });

    return filtered;
  }, [allPriceData, filters.category, filters.item, filters.kind, filters.rank, priorityItems]);

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

  // 실제로 표시되는 필터 칩이 있는지 확인
  const hasVisibleFilters =
    filters.countryCode !== undefined ||
    (filters.category !== undefined && filters.category.code !== "all") ||
    filters.item !== undefined ||
    filters.kind !== undefined ||
    filters.rank !== undefined;

  return (
    <AppLayout>
      <div className="h-[calc(100vh-70px)] bg-gray-50 flex flex-col overflow-hidden">
        {/* 필터 영역 - 고정 (헤더 아래) */}
        <div className="fixed top-[69px] left-0 right-0 bg-white border-b z-30 lg:left-1/2 lg:-translate-x-1/2 lg:w-[420px]">
          <div className="px-4 py-2">
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onOpenBottomSheet={handleOpenBottomSheet}
              onExpandedChange={setIsFilterExpanded}
            />
          </div>
        </div>

        {/* 필터 영역 높이만큼 여백 추가 */}
        <div className={`shrink-0 ${isFilterExpanded && hasVisibleFilters ? "h-30" : "h-12"}`}></div>

        {/* 메인 콘텐츠 */}
        <div className="max-w-4xl mx-auto p-4 flex-1 flex flex-col overflow-hidden w-full">
          {/* 제목 영역 - 항상 표시 */}
          <div className="mb-4 flex items-center gap-2 shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">오늘의 농산물 소매가</h1>
            <AdaptiveTooltip
              trigger={
                <button
                  type="button"
                  aria-label="가격 정보 안내"
                  className="focus:outline-none focus-visible:outline-none rounded-full"
                >
                  <AlertCircle className="w-5 h-5 text-gray-400 cursor-pointer" />
                </button>
              }
              content={
                <>
                  <p className="leading-relaxed">
                    가격 집계가 진행 중이거나 불가능한 경우(주말) 최근 집계 날짜의 가격이 표시됩니다.
                  </p>
                  {priceBaseDate && (
                    <p className="mt-2 text-xs text-green-400">
                      기준 일자: {priceBaseDate}
                    </p>
                  )}
                </>
              }
              side="bottom"
              contentClassName="max-w-[250px]"
            />
          </div>

          {/* 콘텐츠 영역 */}
          <div className="flex-1 overflow-hidden relative">
            {loading ? (
              <Card className="flex flex-col items-center justify-center h-full border-0 shadow-none">
                <CardContent className="flex flex-col items-center p-6">
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                  <p className="text-muted-foreground">농산물 가격 정보를 불러오는 중...</p>
                </CardContent>
              </Card>
            ) : error ? (
              <Card className="flex flex-col items-center justify-center h-full">
                <CardContent className="text-center space-y-4 p-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <BarChart3 className="w-8 h-8 text-red-500" />
                  </div>
                  <CardTitle className="text-xl">오류가 발생했습니다</CardTitle>
                  <p className="text-muted-foreground">{error}</p>
                  <Button onClick={fetchPriceData} variant="default">
                    다시 시도
                  </Button>
                </CardContent>
              </Card>
            ) : filteredPriceData.length === 0 ? (
              <Card className="flex flex-col items-center justify-center h-full">
                <CardContent className="text-center space-y-4 p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <BarChart3 className="w-8 h-8 text-gray-400" />
                  </div>
                  <CardTitle className="text-xl">검색 결과가 없습니다</CardTitle>
                  <p className="text-muted-foreground">다른 필터 조건을 선택해보세요</p>
                </CardContent>
              </Card>
            ) : (
              <AnimatedList
                items={filteredPriceData}
                renderItem={(item) => (
                  <PriceCard
                    item={item}
                    countryCode={filters.countryCode?.code}
                  />
                )}
                showGradients={false}
                enableArrowNavigation={false}
                displayScrollbar={false}
                className="w-full h-full"
                maxHeight="h-full"
                containerClassName="space-y-3 pb-24"
              />
            )}
          </div>
        </div>

        {/* Bottom Sheet */}
        <FilterBottomSheet
          isOpen={isBottomSheetOpen}
          onClose={handleCloseBottomSheet}
          filters={filters}
          onApplyFilters={handleApplyFilters}
          availableItems={availableFilterOptions.items}
          availableKinds={availableFilterOptions.kinds}
          availableRanks={availableFilterOptions.ranks}
        />
      </div>
    </AppLayout>
  );
}
