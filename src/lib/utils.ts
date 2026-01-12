import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 코드를 정규화합니다 (앞의 0 제거)
 * @param code - 정규화할 코드 문자열
 * @returns 정규화된 코드 문자열
 */
export function normalizeCode(code: string): string {
  const num = parseInt(code, 10);
  return isNaN(num) ? code : String(num);
}

/**
 * 품목 코드로부터 카테고리 코드를 추출합니다
 * @param itemCode - 품목 코드
 * @returns 카테고리 코드 (예: "111" -> "100")
 * @remarks 방울토마토(422)는 특수 케이스로 "200"을 반환합니다
 */
export function getCategoryCode(itemCode: string): string {
  // 예외: 422번(방울토마토)만 400이 아니라 200으로 변환
  if (itemCode === "422") {
    return "200";
  }
  return itemCode.charAt(0) + "00";
}

/**
 * 날짜 문자열을 한국어 형식으로 변환합니다
 * @param dateString - YYYY-MM-DD 형식의 날짜 문자열
 * @returns YYYY년 MM월 DD일 형식의 문자열
 */
export function formatDateToKorean(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

/**
 * 가격 이력에서 가장 최신 유효한 가격의 날짜를 찾습니다
 * @param priceHistory - 가격 이력 배열
 * @returns 최신 날짜 문자열 (YYYY년 MM월 DD일 형식) 또는 null
 */
export function getLatestPriceDate(
  priceHistory: Array<{ date: string; price: string }> | undefined
): string | null {
  if (!priceHistory || priceHistory.length === 0) return null;

  const latestPrice = priceHistory.find((p) => p.price && p.price !== "-");
  if (!latestPrice) return null;

  return formatDateToKorean(latestPrice.date);
}
