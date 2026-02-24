"use client";

import { useState, useEffect, useMemo } from "react";
import { AppLayout } from "@/components/app-layout";
import { FilterBar, FilterState } from "./(components)/filter/filter-bar";
import { FilterBottomSheet } from "./(components)/filter/filter-bottom-sheet";
import { RetailContents } from "./(components)/RetailContents";
import { WholeSaleContents } from "./(components)/WholeSaleContents";
import { getCategoryCode } from "@/lib/utils";

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
  const [activeTab, setActiveTab] = useState("retail");
  const [filters, setFilters] = useState<FilterState>({
    category: { code: "all", name: "전체 부류" }
  });
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [allPriceData, setAllPriceData] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);

  // 소매/도매 검색어 상태를 분리하여 관리
  const [retailSearchQuery, setRetailSearchQuery] = useState("");
  const [wholesaleSearchQuery, setWholesaleSearchQuery] = useState("");

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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // 탭 변경시 필터 초기화
    setFilters({ category: { code: "all", name: "전체 부류" } });
  };

  // 탭에 따라 검색어를 분리하여 저장
  const handleSearchChange = (query: string) => {
    if (activeTab === "retail") {
      setRetailSearchQuery(query);
    } else {
      setWholesaleSearchQuery(query);
    }
  };

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
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onSearchChange={handleSearchChange}
            />
          </div>
        </div>

        {/* 필터 영역 높이만큼 여백 추가 */}
        <div className={`shrink-0 ${isFilterExpanded && hasVisibleFilters ? "h-34" : "h-12"}`}></div>

        {/* 메인 콘텐츠 */}
        <div className="max-w-4xl mx-auto p-4 flex-1 flex flex-col overflow-hidden w-full">
          {activeTab === "retail" ? (
            <RetailContents
              filters={filters}
              allPriceData={allPriceData}
              loading={loading}
              error={error}
              onRetry={fetchPriceData}
              searchQuery={retailSearchQuery}
            />
          ) : (
            <WholeSaleContents searchQuery={wholesaleSearchQuery} />
          )}
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
