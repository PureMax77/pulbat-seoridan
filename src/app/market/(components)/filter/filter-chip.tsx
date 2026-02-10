"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * FilterChip Props 인터페이스
 */
interface FilterChipProps {
    /** 표시할 텍스트 라벨 */
    label: string;
    /** 필터 값 */
    value: string;
    /** 제거(X) 버튼 클릭 시 호출되는 핸들러 */
    onRemove: () => void;
    /** 추가 클래스명 */
    className?: string;
}

/**
 * FilterChip 컴포넌트
 * 
 * - 선택된 필터 항목을 태그 형태로 보여주는 작은 컴포넌트입니다.
 * - 우측에 삭제 버튼(X)을 포함하고 있습니다.
 * - Badge 컴포넌트를 기반으로 스타일링되었습니다.
 */
export function FilterChip({ label, onRemove, className }: FilterChipProps) {
    return (
        <Badge
            variant="secondary"
            className={cn(
                "inline-flex items-center gap-1 px-3 py-1.5 rounded-full",
                className
            )}
        >
            <span>{label}</span>
            <Button
                onClick={onRemove}
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0 hover:bg-secondary/80"
                aria-label={`${label} 필터 제거`}
            >
                <X className="w-3 h-3" />
            </Button>
        </Badge>
    );
}
