import { NextRequest, NextResponse } from "next/server";

// API 요청 조건 타입
interface PriceCondition {
    p_product_cls_code: string;
    p_country_code: string[];
    p_regday: string;
    p_convert_kg_yn: "Y" | "N";
    p_category_code: string;
    p_cert_key: string;
    p_cert_id: string;
    p_returntype: "json" | "xml";
}

// 날짜별 가격 정보
interface PriceWithDate {
    date: string;
    price: string;
}

// 개별 품목 가격 정보
interface PriceItem {
    item_name: string;
    item_code: string;
    kind_name: string;
    kind_code: string;
    rank: string;
    rank_code: string;
    unit: string;
    day1: string;   // 오늘
    dpr1: string;   // 오늘 가격
    day2: string;   // 어제
    dpr2: string;   // 어제 가격
    day3: string;   // 1주일전
    dpr3: string;   // 1주일전 가격
    day4: string;   // 2주일전
    dpr4: string;   // 2주일전 가격
    day5: string;   // 1개월전
    dpr5: string;   // 1개월전 가격
    day6: string;   // 1년전
    dpr6: string;   // 1년전 가격
    day7: string;   // 일평년
    dpr7: string;   // 일평년 가격
    priceHistory: PriceWithDate[]; // 4일치 가격 이력 (최신순)
}

// API 응답 데이터
interface PriceData {
    error_code: string;
    item: PriceItem[];
}

interface KamisApiResponse {
    condition: PriceCondition[];
    data: PriceData;
}

// 한국 시간 기준 날짜 계산
const getKoreanDate = (daysOffset: number = 0): Date => {
    const now = new Date();
    const koreanTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
    koreanTime.setDate(koreanTime.getDate() + daysOffset);
    return koreanTime;
};

// 요청할 날짜들 결정 (일요일 제외)
const getRequestDates = (): string[] => {
    const today = getKoreanDate(0);
    const twoDaysAgo = getKoreanDate(-2);

    const dates: string[] = [];

    // 오늘이 일요일이 아니면 추가
    if (today.getDay() !== 0) {
        dates.push(today.toISOString().split("T")[0]);
    }

    // 2일 전이 일요일이 아니면 추가
    if (twoDaysAgo.getDay() !== 0) {
        dates.push(twoDaysAgo.toISOString().split("T")[0]);
    }

    return dates;
};

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const p_country_code = searchParams.get("p_country_code") || "";

        // 환경변수에서 인증 정보 가져오기
        const cert_key = process.env.KAMIS_API_KEY;
        const cert_id = process.env.KAMIS_ID;

        if (!cert_key || !cert_id) {
            return NextResponse.json(
                { error: "API 인증 정보가 설정되지 않았습니다." },
                { status: 500 }
            );
        }

        // 요청할 날짜들 가져오기 (일요일 제외)
        const requestDates = getRequestDates();

        // 부류 코드
        const categoryCodes = ["200", "400"];

        // 각 날짜, 각 부류별 API URL 생성 함수
        const createApiUrl = (date: string, categoryCode: string) => {
            const apiUrl = new URL("https://www.kamis.or.kr/service/price/xml.do");
            apiUrl.searchParams.set("action", "dailyPriceByCategoryList");
            apiUrl.searchParams.set("p_product_cls_code", "01");
            apiUrl.searchParams.set("p_regday", date);
            apiUrl.searchParams.set("p_convert_kg_yn", "N");
            apiUrl.searchParams.set("p_item_category_code", categoryCode);
            apiUrl.searchParams.set("p_cert_key", cert_key);
            apiUrl.searchParams.set("p_cert_id", cert_id);
            apiUrl.searchParams.set("p_returntype", "json");

            if (p_country_code) {
                apiUrl.searchParams.set("p_country_code", p_country_code);
            }

            return apiUrl.toString();
        };

        console.log(`[KAMIS API 요청] 날짜: ${requestDates.join(', ')}, 지역: ${p_country_code || '전체'}`);

        // 모든 날짜와 부류 조합으로 병렬 요청
        const fetchPromises = requestDates.flatMap((date) =>
            categoryCodes.map(async (categoryCode) => {
                const response = await fetch(createApiUrl(date, categoryCode), {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    next: { revalidate: 3600 }, // 1시간 캐시
                });

                if (!response.ok) {
                    throw new Error(`KAMIS API 호출 실패 (날짜: ${date}, 부류: ${categoryCode}): ${response.status}`);
                }

                const data: KamisApiResponse = await response.json();

                // 에러 체크
                if (data.data.error_code !== "000") {
                    console.warn(`[KAMIS API 경고] 날짜: ${date}, 부류 ${categoryCode} 오류 코드: ${data.data.error_code}`);
                    return { date, items: [] };
                }

                console.log(`[KAMIS API 응답] 날짜: ${date}, 부류 ${categoryCode}: ${data.data.item.length}개 품목`);
                return { date, items: data.data.item };
            })
        );

        // 모든 요청이 완료될 때까지 대기
        const results = await Promise.all(fetchPromises);

        // 품목별로 데이터 병합 (item_code + kind_code + rank_code 기준)
        const mergedItemsMap = new Map<string, PriceItem>();

        results.forEach(({ date, items }) => {
            items.forEach((item) => {
                const key = `${item.item_code}|${item.kind_code}|${item.rank_code}`;

                if (!mergedItemsMap.has(key)) {
                    // 새 항목 생성
                    mergedItemsMap.set(key, {
                        ...item,
                        priceHistory: []
                    });
                }

                const mergedItem = mergedItemsMap.get(key)!;

                // date는 요청한 날짜 (예: "2026-01-12")
                // dpr1은 해당 날짜(date)의 가격
                // dpr2는 1일 전 가격

                // dpr1 (요청한 날짜의 가격) 추가
                if (item.dpr1 && item.dpr1 !== "-") {
                    mergedItem.priceHistory.push({
                        date: date, // item.day1 대신 실제 요청한 날짜 사용
                        price: item.dpr1
                    });
                }

                // dpr2 (1일 전 가격) 추가
                if (item.dpr2 && item.dpr2 !== "-") {
                    // 1일 전 날짜 계산
                    const prevDate = new Date(date);
                    prevDate.setDate(prevDate.getDate() - 1);
                    const prevDateString = prevDate.toISOString().split("T")[0];

                    mergedItem.priceHistory.push({
                        date: prevDateString, // item.day2 대신 계산된 날짜 사용
                        price: item.dpr2
                    });
                }
            });
        });

        // 각 품목의 priceHistory를 날짜 내림차순으로 정렬 (최신순)
        const allItems = Array.from(mergedItemsMap.values()).map(item => ({
            ...item,
            priceHistory: item.priceHistory
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                // 중복 날짜 제거 (날짜별로 첫 번째 가격만 유지)
                .filter((price, index, self) =>
                    index === self.findIndex(p => p.date === price.date)
                )
        }));

        console.log(`[KAMIS API 통합] 총 ${allItems.length}개 품목, 날짜: ${requestDates.join(', ')}`);

        // 응답 형식 유지
        const response: KamisApiResponse = {
            condition: [],
            data: {
                error_code: "000",
                item: allItems,
            },
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("농산물 가격 정보 조회 중 오류:", error);
        return NextResponse.json(
            { error: "농산물 가격 정보를 가져오는데 실패했습니다." },
            { status: 500 }
        );
    }
}

