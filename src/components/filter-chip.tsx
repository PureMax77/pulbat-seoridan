"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterChipProps {
    label: string;
    value: string;
    onRemove: () => void;
    className?: string;
}

export function FilterChip({ label, value, onRemove, className }: FilterChipProps) {
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
