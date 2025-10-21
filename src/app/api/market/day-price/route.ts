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
        const p_category_code = searchParams.get("p_category_code") || "400";
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

        // KAMIS API URL 생성
        const apiUrl = new URL("https://www.kamis.or.kr/service/price/xml.do");
        apiUrl.searchParams.set("action", "dailyPriceByCategoryList");
        apiUrl.searchParams.set("p_product_cls_code", "01");
        apiUrl.searchParams.set("p_regday", p_regday);
        apiUrl.searchParams.set("p_convert_kg_yn", "Y");
        apiUrl.searchParams.set("p_item_category_code", p_category_code);
        apiUrl.searchParams.set("p_cert_key", cert_key);
        apiUrl.searchParams.set("p_cert_id", cert_id);
        apiUrl.searchParams.set("p_returntype", "json");

        if (p_country_code) {
            apiUrl.searchParams.set("p_country_code", p_country_code);
        }

        console.log(`[KAMIS API 요청] 부류: ${p_category_code}, 지역: ${p_country_code || '전체'}, 날짜: ${p_regday}`);

        // KAMIS API 호출
        const response = await fetch(apiUrl.toString(), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: { revalidate: 3600 }, // 1시간 캐시
        });

        if (!response.ok) {
            throw new Error(`KAMIS API 호출 실패: ${response.status}`);
        }

        const data: KamisApiResponse = await response.json();

        // 에러 체크
        if (data.data.error_code !== "000") {
            return NextResponse.json(
                { error: `KAMIS API 오류 코드: ${data.data.error_code}` },
                { status: 400 }
            );
        }

        console.log(`[KAMIS API 응답] ${data.data.item.length}개 품목 조회됨`);

        return NextResponse.json(data);
    } catch (error) {
        console.error("농산물 가격 정보 조회 중 오류:", error);
        return NextResponse.json(
            { error: "농산물 가격 정보를 가져오는데 실패했습니다." },
            { status: 500 }
        );
    }
}

