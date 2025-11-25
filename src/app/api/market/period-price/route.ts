import { NextRequest, NextResponse } from "next/server";

// API 응답 타입 정의
interface PeriodPriceItem {
    itemname: string | null;
    kindname: string | null;
    countyname: string;
    marketname: string | null;
    yyyy: string;
    regday: string;
    price: string;
}

interface PeriodPriceData {
    error_code: string;
    item: PeriodPriceItem[];
}

interface PeriodPriceResponse {
    condition: {
        item: {
            p_startday: string;
            p_endday: string;
            p_itemcategorycode: string;
            p_itemcode: string;
            p_kindcode: string;
            p_productrankcode: string;
            p_countycode: string;
            p_convert_kg_yn: string;
            p_key: string;
            p_id: string;
            p_returntype: string;
        };
    };
    data: PeriodPriceData;
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        // 쿼리 파라미터에서 값 가져오기
        const p_startday = searchParams.get("p_startday");
        const p_endday = searchParams.get("p_endday");
        const p_itemcategorycode = searchParams.get("p_itemcategorycode");
        const p_itemcode = searchParams.get("p_itemcode");
        const p_kindcode = searchParams.get("p_kindcode");
        const p_productrankcode = searchParams.get("p_productrankcode");
        const p_countrycode = searchParams.get("p_countrycode");

        // 필수 파라미터 체크
        if (!p_startday || !p_endday || !p_itemcategorycode || !p_itemcode || !p_kindcode || !p_productrankcode) {
            return NextResponse.json(
                { error: "필수 파라미터가 누락되었습니다." },
                { status: 400 }
            );
        }

        // 환경변수에서 인증 정보 가져오기
        const cert_key = process.env.KAMIS_API_KEY;
        const cert_id = process.env.KAMIS_ID;

        if (!cert_key || !cert_id) {
            return NextResponse.json(
                { error: "API 인증 정보가 설정되지 않았습니다." },
                { status: 500 }
            );
        }

        // 등급 코드 포맷팅 (1자리면 앞에 0 추가)
        const formattedRankCode = p_productrankcode.length === 1
            ? `0${p_productrankcode}`
            : p_productrankcode;
        console.log(formattedRankCode);
        console.log(p_productrankcode);
        // KAMIS API URL 생성
        const apiUrl = new URL("https://www.kamis.or.kr/service/price/xml.do");
        apiUrl.searchParams.set("action", "periodRetailProductList");
        apiUrl.searchParams.set("p_startday", p_startday);
        apiUrl.searchParams.set("p_endday", p_endday);
        apiUrl.searchParams.set("p_itemcategorycode", p_itemcategorycode);
        apiUrl.searchParams.set("p_itemcode", p_itemcode);
        apiUrl.searchParams.set("p_kindcode", p_kindcode);
        apiUrl.searchParams.set("p_productrankcode", formattedRankCode);
        apiUrl.searchParams.set("p_convert_kg_yn", "N");
        apiUrl.searchParams.set("p_cert_key", cert_key);
        apiUrl.searchParams.set("p_cert_id", cert_id);
        apiUrl.searchParams.set("p_returntype", "json");
        console.log(apiUrl.toString());
        // p_countrycode가 있으면 추가 (없으면 전체 조회)
        if (p_countrycode) {
            apiUrl.searchParams.set("p_countrycode", p_countrycode);
        }

        // console.log(`[KAMIS Period API 요청] ${p_startday} ~ ${p_endday}`);

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

        const data: PeriodPriceResponse = await response.json();

        // 에러 체크
        if (data.data.error_code !== "000") {
            console.warn(`[KAMIS Period API 경고] 오류 코드: ${data.data.error_code}`);
            return NextResponse.json(
                { error: "데이터를 가져오는데 실패했습니다.", error_code: data.data.error_code },
                { status: 400 }
            );
        }

        // console.log(`[KAMIS Period API 응답] ${data.data.item.length}개 데이터`);

        return NextResponse.json(data);
    } catch (error) {
        console.error("기간별 가격 정보 조회 중 오류:", error);
        return NextResponse.json(
            { error: "기간별 가격 정보를 가져오는데 실패했습니다." },
            { status: 500 }
        );
    }
}

