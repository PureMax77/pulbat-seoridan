import { Stagehand } from "@browserbasehq/stagehand";
import { z } from "zod";

// 추출할 데이터의 스키마 정의
const ProductPriceSchema = z.object({
    items: z.array(z.object({
        name: z.string().describe("상품의 전체 이름"),
        price: z.string().describe("상품의 가격 (원 단위 포함, 예: '10,000원')"),
        url: z.string().optional().describe("상품 상세 페이지 URL"),
    })).describe("추출된 상품 목록"),
});

export async function scrapeProductPrices(storeName: string, searchUrl: string, keyword: string) {
    console.log(`Starting scrape for ${storeName} - ${keyword}...`);

    const stagehand = new Stagehand({
        // env: "BROWSERBASE",
        env: "LOCAL",
        model: "openai/gpt-5-mini",
    });

    await stagehand.init();

    console.log(`Stagehand Session Started`);
    if (stagehand.browserbaseSessionID) {
        console.log(`Watch live: https://browserbase.com/sessions/${stagehand.browserbaseSessionID}`);
    }

    // context.pages()[0]를 사용하여 페이지 가져오기
    const page = stagehand.context.pages()[0];

    try {
        console.log(`Navigating to: ${searchUrl}`);
        await page.goto(searchUrl);
        console.log(`Page loaded successfully`);

        // stagehand.extract() 메서드 사용 (page.extract가 아님)
        console.log(`Starting extraction for ${keyword}...`);

        // extract 메서드는 instruction을 첫 번째 인자, schema를 두 번째 인자로 받습니다
        const data = await stagehand.extract(
            `상품 리스트에서 '${keyword}' 관련 상품들의 이름과 가격을 추출해줘. 품절된 상품은 제외해줘. 식품인 ${keyword} 과일만 포함하고, 즙, 케이스, 액세서리 등은 제외해줘.`,
            ProductPriceSchema
        );

        console.log(`Extraction completed. Raw data:`, JSON.stringify(data, null, 2));

        // data가 null이거나 items가 없는 경우 처리 (폴백)
        if (!data || !data.items || !Array.isArray(data.items)) {
            console.warn(`No valid items found in extraction result for ${storeName} - ${keyword}`);

            // 만약 extraction 필드에 텍스트가 있다면 파싱 시도 (간단한 정규식 예시)
            // 실제로는 LLM이 JSON을 문자열로 반환했을 수도 있음
            if (data && 'extraction' in data && typeof data.extraction === 'string') {
                console.log("Attempting to parse extraction string...");
                // 여기서는 복잡한 파싱보다는 경고만 남기고 종료
            }

            return [];
        }

        console.log(`Found ${data.items.length} items`);

        return data.items.map(item => ({
            storeName,
            productName: item.name,
            price: parseInt(item.price.replace(/[^0-9]/g, ''), 10), // 숫자가 아닌 문자 제거
            url: item.url,
            keyword
        }));

    } catch (error) {
        console.error(`Error scraping ${storeName} for ${keyword}:`, error);
        return [];
    } finally {
        console.log(`Closing Stagehand session for ${storeName} - ${keyword}`);
        await stagehand.close();
    }
}
