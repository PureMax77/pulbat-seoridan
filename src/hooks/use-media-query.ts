"use client";

import { useState, useEffect } from "react";

/**
 * useMediaQuery Hook
 * 
 * 미디어 쿼리 매칭 상태를 추적하는 커스텀 훅입니다.
 * 
 * @param query - CSS 미디어 쿼리 문자열
 *   - 예: "(hover: none)" - 터치 기기 감지
 *   - 예: "(min-width: 768px)" - 화면 크기 감지
 * @returns 객체 { matches: 미디어 쿼리 매칭 여부, mounted: 마운트 완료 여부 }
 * 
 * 주의사항:
 * - SSR/SSG 환경에서 hydration mismatch를 방지하기 위해 mounted 상태 사용
 * - 구형 브라우저 호환성을 위한 fallback 포함
 */
export const useMediaQuery = (query: string): { matches: boolean; mounted: boolean } => {
    const [matches, setMatches] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const media = window.matchMedia(query);
        setMatches(media.matches);

        const listener = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        // Modern browsers - addEventListener 사용
        if (media.addEventListener) {
            media.addEventListener("change", listener);
            return () => media.removeEventListener("change", listener);
        }
        // Fallback for older browsers - addListener 사용 (deprecated)
        else {
            media.addListener(listener);
            return () => media.removeListener(listener);
        }
    }, [query]);

    return { matches, mounted };
};
