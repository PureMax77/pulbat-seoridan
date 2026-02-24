"use client";

import { useState, useEffect } from "react";
import { Filter, X, ChevronDown, ChevronUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FilterChip } from "./filter-chip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDebounce } from "@/hooks/use-debounce";

/**
 * 필터 상태 인터페이스
 * 선택된 지역, 부류, 품목, 품종, 등급 정보를 담습니다.
 */
export interface FilterState {
    countryCode?: { code: string; name: string };
    category?: { code: string; name: string };
    item?: { code: string; name: string };
    kind?: { code: string; name: string };
    rank?: { code: string; name: string };
}

/**
 * FilterBar Props 인터페이스
 */
interface FilterBarProps {
    /** 현재 적용된 필터 상태 */
    filters: FilterState;
    /** 필터 변경 핸들러 */
    onFilterChange: (filters: FilterState) => void;
    /** 바텀시트 열기 핸들러 */
    onOpenBottomSheet: () => void;
    /** 추가 클래스명 */
    className?: string;
    /** 필터 바 확장/축소 상태 변경 핸들러 */
    onExpandedChange?: (isExpanded: boolean) => void;
    /** 현재 활성 탭 (소매/도매) */
    activeTab: string;
    /** 탭 변경 핸들러 */
    onTabChange: (tab: string) => void;
    /** 검색어 변경 핸들러 (디바운스 적용된 값 전달) */
    onSearchChange?: (query: string) => void;
}

/**
 * FilterBar 컴포넌트
 *
 * - 현재 적용된 필터 목록을 보여주고 관리하는 컴포넌트입니다.
 * - 필터 태그(Chip) 형태로 현재 상태를 시각화합니다.
 * - 필터 확장/축소 기능 및 초기화 기능을 제공합니다.
 * - 소매/도매 탭에 따라 검색 로직이 분리됩니다.
 */
export function FilterBar({
    filters,
    onFilterChange,
    onOpenBottomSheet,
    className,
    onExpandedChange,
    activeTab,
    onTabChange,
    onSearchChange,
}: FilterBarProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const debouncedSearch = useDebounce(searchValue, 300);

    // 초기 확장 상태를 부모에게 알림
    useEffect(() => {
        onExpandedChange?.(isExpanded);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // 디바운스된 검색어가 변경되면 부모에게 전달
    useEffect(() => {
        onSearchChange?.(debouncedSearch);
    }, [debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

    // 탭이 변경되면 검색 모드 종료 및 검색어 초기화
    useEffect(() => {
        setIsSearchMode(false);
        setSearchValue("");
    }, [activeTab]);

    // 실제로 표시되는 필터만 체크 (전체 부류 등 기본값은 제외)
    const hasVisibleFilters =
        filters.countryCode !== undefined ||
        (filters.category !== undefined && filters.category.code !== "all") ||
        filters.item !== undefined ||
        filters.kind !== undefined ||
        filters.rank !== undefined;

    // 특정 필터 항목 제거 핸들러
    const removeFilter = (filterType: keyof FilterState) => {
        const newFilters = { ...filters };
        delete newFilters[filterType];
        onFilterChange(newFilters);
    };

    // 모든 필터 초기화 핸들러
    const clearAllFilters = () => {
        onFilterChange({});
    };

    // 필터 바 확장/축소 토글
    const toggleExpanded = () => {
        const newExpanded = !isExpanded;
        setIsExpanded(newExpanded);
        onExpandedChange?.(newExpanded);
    };

    // 검색 모드 진입
    const handleSearchClick = () => {
        setIsSearchMode(true);
    };

    // 검색 모드 취소
    const handleSearchCancel = () => {
        setIsSearchMode(false);
        setSearchValue("");
    };

    return (
        <div className={cn("w-full", className)}>
            {isSearchMode ? (
                // 검색 모드: 검색 인풋과 취소 버튼
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        placeholder={activeTab === "retail" ? "소매 상품 검색..." : "도매 상품 검색..."}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="flex-1 border-2 border-green-500 focus-visible:ring-green-500 rounded-2xl"
                        autoFocus
                    />
                    <Button
                        onClick={handleSearchCancel}
                        variant="outline"
                        className="shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-600 cursor-pointer"
                    >
                        취소
                    </Button>
                </div>
            ) : (
                <>
                    {/* 상단 헤더 영역: 탭 전환 및 펼치기/접기 버튼, 설정 버튼 */}
                    <div className="flex items-center justify-between">
                        <Tabs value={activeTab} onValueChange={onTabChange} className="w-auto">
                            <TabsList className="h-9 bg-gray-100">
                                <TabsTrigger
                                    value="retail"
                                    className="text-sm data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=inactive]:text-gray-500"
                                >
                                    소매
                                </TabsTrigger>
                                <TabsTrigger
                                    value="wholesale"
                                    className="text-sm data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=inactive]:text-gray-500"
                                >
                                    도매
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={handleSearchClick}
                                size="icon"
                                className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer"
                                aria-label="검색"
                            >
                                <Search className="w-4 h-4 text-gray-500" />
                            </Button>
                            <Button
                                onClick={onOpenBottomSheet}
                                size="icon"
                                className="flex items-center justify-center bg-linear-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 cursor-pointer"
                                aria-label="필터 선택 메뉴 열기"
                            >
                                <Filter className="w-4 h-4 text-white" />
                            </Button>
                            {hasVisibleFilters && (
                                <Button
                                    onClick={toggleExpanded}
                                    size="icon"
                                    className="shrink-0 h-9 w-9 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-500 hover:text-gray-700 cursor-pointer"
                                    aria-label={isExpanded ? "필터 접기" : "필터 펼치기"}
                                >
                                    {isExpanded ? (
                                        <ChevronUp className="w-5 h-5" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5" />
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* 확장된 상태일 때 필터 칩 목록 표시 */}
                    {isExpanded && (
                        <>
                            {hasVisibleFilters ? (
                                <div className="space-y-2 mt-3">
                                    <div className="flex flex-wrap gap-2">
                                        {filters.countryCode && (
                                            <FilterChip
                                                label={`${filters.countryCode.name}`}
                                                value={filters.countryCode.code}
                                                onRemove={() => removeFilter("countryCode")}
                                            />
                                        )}
                                        {filters.category && filters.category.code !== "all" && (
                                            <FilterChip
                                                label={`${filters.category.name}`}
                                                value={filters.category.code}
                                                onRemove={() => removeFilter("category")}
                                            />
                                        )}
                                        {filters.item && (
                                            <FilterChip
                                                label={`${filters.item.name}`}
                                                value={filters.item.code}
                                                onRemove={() => removeFilter("item")}
                                            />
                                        )}
                                        {filters.kind && (
                                            <FilterChip
                                                label={`${filters.kind.name}`}
                                                value={filters.kind.code}
                                                onRemove={() => removeFilter("kind")}
                                            />
                                        )}
                                        {filters.rank && (
                                            <FilterChip
                                                label={`${filters.rank.name}`}
                                                value={filters.rank.code}
                                                onRemove={() => removeFilter("rank")}
                                            />
                                        )}
                                    </div>

                                    {/* 전체 초기화 버튼 */}
                                    <Button
                                        onClick={clearAllFilters}
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center gap-1 px-1"
                                    >
                                        <X className="w-4 h-4" />
                                        <span>모든 필터 제거</span>
                                    </Button>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}
