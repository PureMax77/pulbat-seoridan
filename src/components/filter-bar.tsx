"use client";

import { useState, useEffect } from "react";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterChip } from "./filter-chip";

export interface FilterState {
    countryCode?: { code: string; name: string };
    category?: { code: string; name: string };
    item?: { code: string; name: string };
    kind?: { code: string; name: string };
    rank?: { code: string; name: string };
}

interface FilterBarProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    onOpenBottomSheet: () => void;
    className?: string;
    onExpandedChange?: (isExpanded: boolean) => void;
}

export function FilterBar({ filters, onFilterChange, onOpenBottomSheet, className, onExpandedChange }: FilterBarProps) {
    const [isExpanded, setIsExpanded] = useState(true);

    // 초기 상태를 부모에게 알림
    useEffect(() => {
        onExpandedChange?.(isExpanded);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // 실제로 표시되는 필터만 체크 (전체 부류는 제외)
    const hasVisibleFilters =
        filters.countryCode !== undefined ||
        (filters.category !== undefined && filters.category.code !== "all") ||
        filters.item !== undefined ||
        filters.kind !== undefined ||
        filters.rank !== undefined;

    const removeFilter = (filterType: keyof FilterState) => {
        const newFilters = { ...filters };
        delete newFilters[filterType];
        onFilterChange(newFilters);
    };

    const clearAllFilters = () => {
        onFilterChange({});
    };

    const toggleExpanded = () => {
        const newExpanded = !isExpanded;
        setIsExpanded(newExpanded);
        onExpandedChange?.(newExpanded);
    };

    return (
        <div className={cn("w-full", className)}>
            <div className="flex items-center justify-between">
                <button
                    onClick={toggleExpanded}
                    className="flex items-center gap-2 text-lg font-semibold text-gray-900 hover:text-gray-700 transition-colors"
                >
                    {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                    ) : (
                        <ChevronDown className="w-5 h-5" />
                    )}
                    <span>필터</span>
                </button>
                <button
                    onClick={onOpenBottomSheet}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Filter className="w-4 h-4" />
                    {/* <span className="text-sm font-medium">필터</span> */}
                </button>
            </div>

            {isExpanded && (
                <>
                    {hasVisibleFilters ? (
                        <div className="space-y-3 mt-3">
                            <div className="flex flex-wrap gap-2">
                                {filters.countryCode && (
                                    <FilterChip
                                        label={`${filters.countryCode.name}`}
                                        value={filters.countryCode.code}
                                        onRemove={() => removeFilter('countryCode')}
                                    />
                                )}
                                {filters.category && filters.category.code !== "all" && (
                                    <FilterChip
                                        label={`${filters.category.name}`}
                                        value={filters.category.code}
                                        onRemove={() => removeFilter('category')}
                                    />
                                )}
                                {filters.item && (
                                    <FilterChip
                                        label={`${filters.item.name}`}
                                        value={filters.item.code}
                                        onRemove={() => removeFilter('item')}
                                    />
                                )}
                                {filters.kind && (
                                    <FilterChip
                                        label={`${filters.kind.name}`}
                                        value={filters.kind.code}
                                        onRemove={() => removeFilter('kind')}
                                    />
                                )}
                                {filters.rank && (
                                    <FilterChip
                                        label={`${filters.rank.name}`}
                                        value={filters.rank.code}
                                        onRemove={() => removeFilter('rank')}
                                    />
                                )}
                            </div>

                            <button
                                onClick={clearAllFilters}
                                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <X className="w-4 h-4" />
                                <span>모든 필터 제거</span>
                            </button>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </>
            )}
        </div>
    );
}
