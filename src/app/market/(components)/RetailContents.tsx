"use client";

import { useMemo } from "react";
import { FilterState } from "./filter/filter-bar";
import { PriceCard } from "./PriceCard";
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

interface RetailContentsProps {
  filters: FilterState;
  allPriceData: PriceItem[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  /** 검색어 (디바운스 적용된 값) */
  searchQuery?: string;
}

export const RetailContents = ({ filters, allPriceData, loading, error, onRetry, searchQuery = "" }: RetailContentsProps) => {
  // 우선순위 품목 배열 (앞쪽에 표시될 품목들)
  const priorityItems = useMemo(() => ['배', '단감', '딸기', '레몬', '망고', '멜론', '바나나', '호박'], []);

  // 가격 기준 날짜 계산 (첫 번째 품목의 최신 가격 날짜)
  const priceBaseDate = useMemo(() => {
    if (allPriceData.length === 0) return null;
    return getLatestPriceDate(allPriceData[0].priceHistory);
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

    // 검색어 필터링 (품목명, 품종명 기준)
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      filtered = filtered.filter(item =>
        item.item_name.includes(trimmedQuery) ||
        item.kind_name.includes(trimmedQuery)
      );
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
  }, [allPriceData, filters.category, filters.item, filters.kind, filters.rank, priorityItems, searchQuery]);

  return (
    <>
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
              <Button onClick={onRetry} variant="default">
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
    </>
  );
};
