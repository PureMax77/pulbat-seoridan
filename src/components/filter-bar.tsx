"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";
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
}

export function FilterBar({ filters, onFilterChange, onOpenBottomSheet, className }: FilterBarProps) {
    const hasActiveFilters = Object.values(filters).some(filter => filter !== undefined);

    const removeFilter = (filterType: keyof FilterState) => {
        const newFilters = { ...filters };
        delete newFilters[filterType];
        onFilterChange(newFilters);
    };

    const clearAllFilters = () => {
        onFilterChange({});
    };

    return (
        <div className={cn("w-full", className)}>
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">필터</h3>
                <button
                    onClick={onOpenBottomSheet}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Filter className="w-4 h-4" />
                    <span className="text-sm font-medium">필터</span>
                </button>
            </div>

            {hasActiveFilters ? (
                <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                        {filters.countryCode && (
                            <FilterChip
                                label={`지역: ${filters.countryCode.name}`}
                                value={filters.countryCode.code}
                                onRemove={() => removeFilter('countryCode')}
                            />
                        )}
                        {filters.category && (
                            <FilterChip
                                label={`부류: ${filters.category.name}`}
                                value={filters.category.code}
                                onRemove={() => removeFilter('category')}
                            />
                        )}
                        {filters.item && (
                            <FilterChip
                                label={`품목: ${filters.item.name}`}
                                value={filters.item.code}
                                onRemove={() => removeFilter('item')}
                            />
                        )}
                        {filters.kind && (
                            <FilterChip
                                label={`품종: ${filters.kind.name}`}
                                value={filters.kind.code}
                                onRemove={() => removeFilter('kind')}
                            />
                        )}
                        {filters.rank && (
                            <FilterChip
                                label={`등급: ${filters.rank.name}`}
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
                <div className="text-sm text-gray-500 py-2">
                    필터를 선택하여 농산물을 검색해보세요
                </div>
            )}
        </div>
    );
}
