"use client";

import { useState, useEffect } from "react";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
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
                <Button
                    onClick={toggleExpanded}
                    variant="ghost"
                    className="flex items-center gap-2 text-lg font-semibold px-0"
                >
                    {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                    ) : (
                        <ChevronDown className="w-5 h-5" />
                    )}
                    <span>필터</span>
                </Button>
                <Button
                    onClick={onOpenBottomSheet}
                    className="flex items-center gap-2 bg-linear-to-br from-blue-500 to-blue-600"
                >
                    <Filter className="w-4 h-4 text-white" />
                </Button>
            </div>

            {isExpanded && (
                <>
                    {hasVisibleFilters ? (
                        <div className="space-y-2 mt-3">
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
        </div>
    );
}
