"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterChipProps {
    label: string;
    value: string;
    onRemove: () => void;
    className?: string;
}

export function FilterChip({ label, value, onRemove, className }: FilterChipProps) {
    return (
        <div
            className={cn(
                "inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium",
                className
            )}
        >
            <span>{label}</span>
            <button
                onClick={onRemove}
                className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                aria-label={`${label} 필터 제거`}
            >
                <X className="w-3 h-3" />
            </button>
        </div>
    );
}
