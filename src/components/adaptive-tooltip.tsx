"use client";

import { useState, ReactNode } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * AdaptiveTooltip 컴포넌트
 * 
 * hover 가능 여부에 따라 자동으로 Tooltip 또는 Popover를 렌더링하는 적응형 컴포넌트입니다.
 * 
 * 동작 방식:
 * - Hover 가능 (마우스/트랙패드): Tooltip 사용 - 호버 시 정보 표시
 * - Hover 불가능 (터치 기기): Popover 사용 - 클릭 시 정보 표시
 * 
 * 감지 방식:
 * - (hover: none) 미디어 쿼리 사용
 * - 화면 크기가 아닌 실제 hover 기능 유무로 판단
 * - 터치 기반 모바일/태블릿, 마우스 기반 PC를 정확히 구분
 * 
 * 사용 이유:
 * - 터치 기기에서는 hover 이벤트가 작동하지 않아 클릭 기반 Popover 필요
 * - 마우스 기기에서는 hover 기반 Tooltip이 더 나은 UX 제공
 * - 화면 크기와 무관하게 입력 방식에 따라 적절한 UI 제공
 * 
 * @example
 * ```tsx
 * <AdaptiveTooltip
 *   trigger={<InfoIcon className="w-5 h-5" />}
 *   content={<p>도움말 텍스트</p>}
 *   side="bottom"
 * />
 * ```
 */

/**
 * AdaptiveTooltip Props 인터페이스
 */
interface AdaptiveTooltipProps {
    /**
     * 트리거 요소 - 클릭하거나 호버할 요소
     * @example <InfoIcon />, <Button>도움말</Button>
     */
    trigger: ReactNode;

    /**
     * 표시될 내용 - Tooltip/Popover 내부에 렌더링될 콘텐츠
     * @example <p>설명 텍스트</p>, <div>복잡한 콘텐츠</div>
     */
    content: ReactNode;

    /**
     * 표시될 위치 (트리거 기준)
     * @default "bottom"
     */
    side?: "top" | "right" | "bottom" | "left";

    /**
     * 정렬 방식
     * @default "center"
     */
    align?: "start" | "center" | "end";

    /**
     * 트리거 요소에 적용할 추가 className
     * @example "ml-2 hover:opacity-80"
     */
    className?: string;

    /**
     * 콘텐츠 컨테이너에 적용할 추가 className
     * @example "max-w-[300px] text-sm"
     */
    contentClassName?: string;
}

/**
 * AdaptiveTooltip 컴포넌트 구현
 */
export const AdaptiveTooltip = ({
    trigger,
    content,
    side = "bottom",
    align = "center",
    className = "",
    contentClassName = "",
}: AdaptiveTooltipProps) => {
    // Popover 상태 관리 (터치 기기용)
    const [isOpen, setIsOpen] = useState(false);

    // 호버가 불가능한 모든 환경(대부분의 모바일/태블릿)을 잡아냄
    const { matches: isTouchDevice, mounted } = useMediaQuery("(hover: none)");

    // 마운트되기 전에는 트리거만 렌더링하여 불필요한 리렌더링 방지
    if (!mounted) {
        return <div className={className}>{trigger}</div>;
    }

    // 터치 기기: Popover 사용 (클릭 기반)
    if (isTouchDevice) {
        return (
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild className={className}>
                    {trigger}
                </PopoverTrigger>
                <PopoverContent
                    side={side}
                    align={align}
                    className={`bg-gray-900 text-white border-gray-800 ${contentClassName}`}
                >
                    {content}
                </PopoverContent>
            </Popover>
        );
    }

    // 마우스 기기: Tooltip 사용 (호버 기반)
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild className={className}>
                    {trigger}
                </TooltipTrigger>
                <TooltipContent
                    side={side}
                    align={align}
                    className={`bg-gray-900 text-white ${contentClassName}`}
                >
                    {content}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
