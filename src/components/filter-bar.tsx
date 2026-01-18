"use client";

import { useState, useEffect } from "react";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FilterChip } from "./filter-chip";

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
}

/**
 * FilterBar 컴포넌트
 * 
 * - 현재 적용된 필터 목록을 보여주고 관리하는 컴포넌트입니다.
 * - 필터 태그(Chip) 형태로 현재 상태를 시각화합니다.
 * - 필터 확장/축소 기능 및 초기화 기능을 제공합니다.
 */
export function FilterBar({ filters, onFilterChange, onOpenBottomSheet, className, onExpandedChange }: FilterBarProps) {
    const [isExpanded, setIsExpanded] = useState(true);

    // 초기 확장 상태를 부모에게 알림
    useEffect(() => {
        onExpandedChange?.(isExpanded);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

    return (
        <div className={cn("w-full", className)}>
            {/* 상단 헤더 영역: 필터 타이틀 및 펼치기/접기 버튼, 설정 버튼 */}
            <div className="flex items-center justify-between">
                <Button
                    onClick={toggleExpanded}
                    variant="ghost"
                    className="flex items-center gap-2 text-lg font-semibold px-0"
                    aria-label={isExpanded ? "필터 접기" : "필터 펼치기"}
                >
                    {hasVisibleFilters && (
                        <>
                            {isExpanded ? (
                                <ChevronUp className="w-5 h-5" />
                            ) : (
                                <ChevronDown className="w-5 h-5" />
                            )}
                        </>
                    )}
                    <span>필터</span>
                </Button>
                <Button
                    onClick={onOpenBottomSheet}
                    className="flex items-center gap-2 bg-linear-to-br from-blue-500 to-blue-600"
                    aria-label="필터 선택 메뉴 열기"
                >
                    <Filter className="w-4 h-4 text-white" />
                </Button>
            </div>

            {/* 확장된 상태일 때 필터 칩 목록 표시 */}
            {isExpanded && (
                <>
                    {hasVisibleFilters ? (
                        <div className="space-y-2 mt-3">
                            <div className="flex flex-wrap gap-2">
                                {/* 지역 필터 칩 */}
                                {filters.countryCode && (
                                    <FilterChip
                                        label={`${filters.countryCode.name}`}
                                        value={filters.countryCode.code}
                                        onRemove={() => removeFilter('countryCode')}
                                    />
                                )}
                                {/* 부류 필터 칩 */}
                                {filters.category && filters.category.code !== "all" && (
                                    <FilterChip
                                        label={`${filters.category.name}`}
                                        value={filters.category.code}
                                        onRemove={() => removeFilter('category')}
                                    />
                                )}
                                {/* 품목 필터 칩 */}
                                {filters.item && (
                                    <FilterChip
                                        label={`${filters.item.name}`}
                                        value={filters.item.code}
                                        onRemove={() => removeFilter('item')}
                                    />
                                )}
                                {/* 품종 필터 칩 */}
                                {filters.kind && (
                                    <FilterChip
                                        label={`${filters.kind.name}`}
                                        value={filters.kind.code}
                                        onRemove={() => removeFilter('kind')}
                                    />
                                )}
                                {/* 등급 필터 칩 */}
                                {filters.rank && (
                                    <FilterChip
                                        label={`${filters.rank.name}`}
                                        value={filters.rank.code}
                                        onRemove={() => removeFilter('rank')}
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
                        // 필터가 없을 때 빈 공간 유지
                        <div></div>
                    )}
                </>
            )}
        </div>
    );
}
