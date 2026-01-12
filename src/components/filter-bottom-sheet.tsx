"use client";

import { useState, useEffect, useMemo } from "react";
import { X, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterState } from "./filter-bar";
import {
  categories,
  retailCountryCodes,
  type FilterOption,
} from "@/constants/kamis-codemap";

interface AvailableItem {
  code: string;
  name: string;
  categoryCode: string;
}

interface AvailableKind {
  code: string;
  name: string;
  itemCode: string;
}

interface AvailableRank {
  code: string;
  name: string;
  itemCode: string;
  kindCode: string;
}

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  availableItems: AvailableItem[];
  availableKinds: AvailableKind[];
  availableRanks: AvailableRank[];
}

export function FilterBottomSheet({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  availableItems,
  availableKinds,
  availableRanks,
}: FilterBottomSheetProps) {
  // 과일류를 초기값으로 설정
  const defaultFilters: FilterState = {
    category: { code: "400", name: "과일류" }
  };
  const [localFilters, setLocalFilters] = useState<FilterState>(filters.category ? filters : defaultFilters);
  const [activeTab, setActiveTab] = useState<"region" | "product">("region");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["region", "category"])
  );

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // 바텀시트가 열릴 때 body 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // cleanup: 컴포넌트 언마운트 시 원래대로 복구
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // 선택된 부류에 따라 품목 필터링
  const filteredItems = useMemo(() => {
    if (!localFilters.category || localFilters.category.code === "all") {
      return availableItems;
    }
    return availableItems.filter(item => item.categoryCode === localFilters.category!.code);
  }, [availableItems, localFilters.category]);

  // 선택된 품목에 따라 품종 필터링
  const filteredKinds = useMemo(() => {
    if (!localFilters.item) {
      return [];
    }
    return availableKinds.filter(kind => kind.itemCode === localFilters.item!.code);
  }, [availableKinds, localFilters.item]);

  // 선택된 품목+품종에 따라 등급 필터링 (품목과 품종이 모두 선택되어야 함)
  const filteredRanks = useMemo(() => {
    if (!localFilters.item || !localFilters.kind) {
      return [];
    }
    return availableRanks.filter(
      rank => rank.itemCode === localFilters.item!.code && rank.kindCode === localFilters.kind!.code
    );
  }, [availableRanks, localFilters.item, localFilters.kind]);

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const updateFilter = (
    type: keyof FilterState,
    value: FilterOption | undefined
  ) => {
    const newFilters = { ...localFilters };

    if (value) {
      newFilters[type] = value;

      // 연관 필터 초기화 및 다음 단계 섹션 펼치기
      if (type === "category") {
        delete newFilters.item;
        delete newFilters.kind;
        delete newFilters.rank;
        // 부류 선택 시 부류 섹션 접기, 품목 섹션 펼치기
        setExpandedSections((prev) => {
          const newSet = new Set(prev);
          newSet.delete("category");
          newSet.add("item");
          return newSet;
        });
      } else if (type === "item") {
        delete newFilters.kind;
        delete newFilters.rank;
        // 품목 선택 시 품목 섹션 접기, 품종 섹션 펼치기
        setExpandedSections((prev) => {
          const newSet = new Set(prev);
          newSet.delete("item");
          newSet.add("kind");
          return newSet;
        });
      } else if (type === "kind") {
        delete newFilters.rank;
        // 품종 선택 시 품종 섹션 접기, 등급 섹션 펼치기
        setExpandedSections((prev) => {
          const newSet = new Set(prev);
          newSet.delete("kind");
          newSet.add("rank");
          return newSet;
        });
      } else if (type === "rank") {
        // 등급 선택 시 등급 섹션 접기
        setExpandedSections((prev) => {
          const newSet = new Set(prev);
          newSet.delete("rank");
          return newSet;
        });
      }
    } else {
      delete newFilters[type];
    }

    setLocalFilters(newFilters);
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters(defaultFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 lg:left-1/2 lg:right-auto lg:w-[420px] lg:-translate-x-1/2 bg-white rounded-t-2xl lg:rounded-2xl shadow-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">필터 선택</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="필터 선택 메뉴 닫기"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b" role="tablist">
          <button
            onClick={() => setActiveTab("region")}
            role="tab"
            aria-selected={activeTab === "region"}
            aria-controls="region-tabpanel"
            className={cn(
              "flex-1 px-4 py-3 text-sm font-medium transition-colors",
              activeTab === "region"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            지역
          </button>
          <button
            onClick={() => setActiveTab("product")}
            role="tab"
            aria-selected={activeTab === "product"}
            aria-controls="product-tabpanel"
            className={cn(
              "flex-1 px-4 py-3 text-sm font-medium transition-colors",
              activeTab === "product"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            농산물 분류
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          <div className="p-4">
            {/* 지역 탭 콘텐츠 */}
            {activeTab === "region" && (
              <div role="tabpanel" id="region-tabpanel">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => updateFilter("countryCode", undefined)}
                      className={cn(
                        "p-3 text-sm rounded-lg border text-left transition-colors",
                        !localFilters.countryCode
                          ? "bg-blue-50 border-blue-200 text-blue-800"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      전체 지역
                    </button>
                    {retailCountryCodes.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => updateFilter("countryCode", country)}
                        className={cn(
                          "p-3 text-sm rounded-lg border text-left transition-colors",
                          localFilters.countryCode?.code === country.code
                            ? "bg-blue-50 border-blue-200 text-blue-800"
                            : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                        )}
                      >
                        {country.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 농산물 분류 탭 콘텐츠 */}
            {activeTab === "product" && (
              <div role="tabpanel" id="product-tabpanel">
                <div className="space-y-4">
                  {/* 부류 선택 */}
                  <div className="space-y-3">
                    <button
                      onClick={() => toggleSection("category")}
                      className="flex items-center justify-between w-full text-left"
                      aria-label={expandedSections.has("category") ? "부류 섹션 접기" : "부류 섹션 펼치기"}
                    >
                      <h4 className="font-medium text-gray-800">부류</h4>
                      {expandedSections.has("category") ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                    </button>

                    {expandedSections.has("category") && (
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <button
                            key={category.code}
                            onClick={() => updateFilter("category", category)}
                            className={cn(
                              "p-3 text-sm rounded-lg border text-left transition-colors",
                              localFilters.category?.code === category.code
                                ? "bg-blue-50 border-blue-200 text-blue-800"
                                : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                            )}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 품목 선택 */}
                  {localFilters.category && (
                    <div className="space-y-3">
                      <button
                        onClick={() => toggleSection("item")}
                        className="flex items-center justify-between w-full text-left"
                        aria-label={expandedSections.has("item") ? "품목 섹션 접기" : "품목 섹션 펼치기"}
                      >
                        <h4 className="font-medium text-gray-800">품목</h4>
                        {expandedSections.has("item") ? (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        )}
                      </button>

                      {expandedSections.has("item") && (
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => updateFilter("item", undefined)}
                            className={cn(
                              "p-3 text-sm rounded-lg border text-left transition-colors",
                              !localFilters.item
                                ? "bg-blue-50 border-blue-200 text-blue-800"
                                : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                            )}
                          >
                            전체 품목
                          </button>
                          {filteredItems.map(
                            (item) => (
                              <button
                                key={item.code}
                                onClick={() => updateFilter("item", item)}
                                className={cn(
                                  "p-3 text-sm rounded-lg border text-left transition-colors",
                                  localFilters.item?.code === item.code
                                    ? "bg-blue-50 border-blue-200 text-blue-800"
                                    : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                                )}
                              >
                                {item.name}
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 품종 선택 */}
                  {localFilters.item && (
                    <div className="space-y-3">
                      <button
                        onClick={() => toggleSection("kind")}
                        className="flex items-center justify-between w-full text-left"
                        aria-label={expandedSections.has("kind") ? "품종 섹션 접기" : "품종 섹션 펼치기"}
                      >
                        <h4 className="font-medium text-gray-800">품종</h4>
                        {expandedSections.has("kind") ? (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        )}
                      </button>

                      {expandedSections.has("kind") && (
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => updateFilter("kind", undefined)}
                            className={cn(
                              "p-3 text-sm rounded-lg border text-left transition-colors",
                              !localFilters.kind
                                ? "bg-blue-50 border-blue-200 text-blue-800"
                                : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                            )}
                          >
                            전체 품종
                          </button>
                          {filteredKinds.map((kind) => (
                            <button
                              key={kind.code}
                              onClick={() => updateFilter("kind", kind)}
                              className={cn(
                                "p-3 text-sm rounded-lg border text-left transition-colors",
                                localFilters.kind?.code === kind.code
                                  ? "bg-blue-50 border-blue-200 text-blue-800"
                                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                              )}
                            >
                              {kind.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 등급 선택 */}
                  {localFilters.kind && (
                    <div className="space-y-3">
                      <button
                        onClick={() => toggleSection("rank")}
                        className="flex items-center justify-between w-full text-left"
                        aria-label={expandedSections.has("rank") ? "등급 섹션 접기" : "등급 섹션 펼치기"}
                      >
                        <h4 className="font-medium text-gray-800">등급</h4>
                        {expandedSections.has("rank") ? (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        )}
                      </button>

                      {expandedSections.has("rank") && (
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => updateFilter("rank", undefined)}
                            className={cn(
                              "p-3 text-sm rounded-lg border text-left transition-colors",
                              !localFilters.rank
                                ? "bg-blue-50 border-blue-200 text-blue-800"
                                : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                            )}
                          >
                            전체 등급
                          </button>
                          {filteredRanks.map((rank) => (
                            <button
                              key={rank.code}
                              onClick={() => updateFilter("rank", rank)}
                              className={cn(
                                "p-3 text-sm rounded-lg border text-left transition-colors",
                                localFilters.rank?.code === rank.code
                                  ? "bg-blue-50 border-blue-200 text-blue-800"
                                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                              )}
                            >
                              {rank.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 border-t bg-gray-50 mt-auto">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            초기화
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
}
