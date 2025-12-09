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

// 개별 품목 가격 정보
interface PriceItem {
    item_name: string;
    item_code: string;
    kind_name: string;
    kind_code: string;
    rank: string;
    rank_code: string;
    unit: string;
    day1: string;
    dpr1: string;
    day2: string;
    dpr2: string;
    day3: string;
    dpr3: string;
    day4: string;
    dpr4: string;
    day5: string;
    dpr5: string;
    day6: string;
    dpr6: string;
    day7: string;
    dpr7: string;
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

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        // 쿼리 파라미터에서 값 가져오기 (기본값 설정)
        const p_regday = searchParams.get("p_regday") || new Date().toISOString().split("T")[0];
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

        // 2가지 부류 코드
        const categoryCodes = ["200", "400"];

        // 각 부류별 API URL 생성 함수
        const createApiUrl = (categoryCode: string) => {
            const apiUrl = new URL("https://www.kamis.or.kr/service/price/xml.do");
            apiUrl.searchParams.set("action", "dailyPriceByCategoryList");
            apiUrl.searchParams.set("p_product_cls_code", "01");
            apiUrl.searchParams.set("p_regday", p_regday);
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

        console.log(`[KAMIS API 요청] 전체 부류 병렬 조회, 지역: ${p_country_code || '전체'}, 날짜: ${p_regday}`);

        // 4가지 부류를 병렬로 조회
        const fetchPromises = categoryCodes.map(async (categoryCode) => {
            const response = await fetch(createApiUrl(categoryCode), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                next: { revalidate: 3600 }, // 1시간 캐시
            });

            if (!response.ok) {
                throw new Error(`KAMIS API 호출 실패 (부류: ${categoryCode}): ${response.status}`);
            }

            const data: KamisApiResponse = await response.json();

            // 에러 체크
            if (data.data.error_code !== "000") {
                console.warn(`[KAMIS API 경고] 부류 ${categoryCode} 오류 코드: ${data.data.error_code}`);
                return [];
            }

            console.log(`[KAMIS API 응답] 부류 ${categoryCode}: ${data.data.item.length}개 품목`);
            return data.data.item;
        });

        // 모든 요청이 완료될 때까지 대기
        const results = await Promise.all(fetchPromises);

        // 모든 부류의 데이터를 하나로 합침
        const allItems = results.flat();

        console.log(`[KAMIS API 통합] 총 ${allItems.length}개 품목 조회됨`);

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

