import { Stagehand } from "@browserbasehq/stagehand";
import { z } from "zod";

// 추출할 데이터의 스키마 정의
const ProductPriceSchema = z.object({
    items: z.array(z.object({
        name: z.string().describe("상품의 전체 이름"),
        price: z.string().describe("상품의 가격 (원 단위 포함, 예: '10,000원')"),
        discountRate: z.number().nullish().describe("할인율 (%, 예: 20% 할인이면 20)"),
        weight: z.string().nullish().describe("상품의 무게 정보 (예: '1.5kg', '800g', '2.5kg')"),
        quantity: z.string().nullish().describe("상품의 개수 정보 (예: '5개', '5~6입', '10과')"),
        url: z.url().nullish().describe("상품 상세 페이지로 이동하는 LINK(URL)"),
    })).describe("추출된 상품 목록"),
});

export async function scrapeProductPrices(
    storeName: string,
    searchUrl: string,
    keyword: string,
    storeSpecificPrompt?: string
) {
    console.log(`Starting scrape for ${storeName} - ${keyword}...`);

    const stagehand = new Stagehand({
        // env: "BROWSERBASE",
        env: "LOCAL",
        model: "openai/gpt-5-mini",
        verbose: 2,
        logInferenceToFile: true,  // ./inference_summary/ 폴더에 저장
        // 쿠팡에서 상품 Link ID를 잘못 추출하는 경우 개선 시도 했던 임시 추가 시스템 프롬프트
        //         systemPrompt: `You are a precise data extractor.
        // IMPORTANT RULE FOR LINK (URL) EXTRACTION:
        // 1.  Look at the DOM tree carefully.
        // 2.  Find the 'listitem' that contains the product.
        // 3.  Inside that 'listitem', find the 'link' element (e.g., [123] link: ...).
        // 4.  The 'link' ID is usually the child of the 'listitem' ID (e.g., if listitem is [2-1646], the link might be [2-1647]).
        // 5.  YOU MUST RETURN THE ID OF THE 'link' ELEMENT, NOT THE 'listitem' ELEMENT.
        // 6.  If you return the 'listitem' ID (the parent), the URL extraction will FAIL.
        // 7.  Verify: Does the element description start with "link:"? If yes, it's correct. If it starts with "listitem", it's WRONG.`
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
        await page.goto(searchUrl, { waitUntil: 'load' });
        console.log(`Page loaded successfully`);

        // stagehand.extract() 메서드 사용 (page.extract가 아님)
        console.log(`Starting extraction for ${keyword}...`);

        // extract 메서드는 instruction을 첫 번째 인자, schema를 두 번째 인자로 받습니다
        const basePrompt = `상품 리스트에서 '${keyword}' 관련 상품들의 정보를 자세히 추출해줘:
            1. 상품명 (name): 전체 이름 [필수]
            2. 가격 (price): 최종 판매가 (할인 적용된 가격, 원 단위 포함) [필수]
            3. 할인율 (discountRate): 할인율이 표시되어 있으면 퍼센트 숫자만 (예: "20% 할인" → 20, 없으면 null)
            4. 무게 (weight): 상품명이나 설명에 있는 무게 정보 (예: "1.5kg", "800g", "2kg", 없으면 null)
            5. 개수 (quantity): 상품명이나 설명에 있는 개수 정보 (예: "5개", "5~6입", "10과", "12과내외", 없으면 null)
            6. 상품 Link (url): 해당 상품의 Link (없으면 null)
            
            주의사항:
            - 품절된 상품은 제외
            - 식품인 ${keyword} 과일만 포함 (즙, 주스, 케이스, 액세서리 등은 제외)
            - 무게와 개수는 상품명에서 추출 (예: "사과 1.5kg (5~6입)" → weight: "1.5kg", quantity: "5~6입")
            - 정보가 없는 필드는 null로 설정`;
        // - 상품 Link (url) 추출 시 결정적 주의사항:
        //   1. 절대 'listitem', 'div' 등 컨테이너 요소의 ID를 선택하지 마십시오.
        //   2. 반드시 트리 구조상 'listitem'의 자식(child)으로 존재하는 'link' (예: '[1-123] link: ...') 요소의 ID를 선택해야 합니다.
        //   3. 상품 전체 박스가 아니라, 클릭했을 때 이동하는 실제 '링크' 요소를 찾으세요.`;

        // 스토어별 추가 프롬프트가 있으면 결합
        const finalPrompt = storeSpecificPrompt
            ? `${basePrompt}\n\n[${storeName} 특화 지침]\n${storeSpecificPrompt}`
            : basePrompt;

        // 페이지 로드 대기
        await page.waitForLoadState('domcontentloaded');

        const data = await stagehand.extract(
            finalPrompt,
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

        return data.items.map(item => {
            // 가격 파싱
            const price = parseInt(item.price.replace(/[^0-9]/g, ''), 10);

            // 무게 파싱 (그램으로 통일)
            let weightInGrams: number | undefined;
            if (item.weight && item.weight !== null) {
                const weightMatch = item.weight.match(/(\d+\.?\d*)\s*(kg|g|KG|G)/i);
                if (weightMatch) {
                    const value = parseFloat(weightMatch[1]);
                    const unit = weightMatch[2].toLowerCase();
                    weightInGrams = unit === 'kg' ? value * 1000 : value;
                }
            }

            // 개수 파싱 (숫자만 추출, 범위가 있으면 평균값)
            let quantityCount: number | undefined;
            if (item.quantity && item.quantity !== null) {
                // "5~6입", "10과", "12과내외", "5개" 등을 파싱
                const rangeMatch = item.quantity.match(/(\d+)\s*[~-]\s*(\d+)/);
                if (rangeMatch) {
                    // 범위인 경우 평균값
                    quantityCount = Math.round((parseInt(rangeMatch[1]) + parseInt(rangeMatch[2])) / 2);
                } else {
                    // 단일 숫자인 경우
                    const singleMatch = item.quantity.match(/(\d+)/);
                    if (singleMatch) {
                        quantityCount = parseInt(singleMatch[1]);
                    }
                }
            }

            // 단위당 가격 계산
            let unitPrice: number | undefined;
            if (weightInGrams && weightInGrams > 0) {
                // 그램당 가격 (원/g)
                unitPrice = price / weightInGrams;
            } else if (quantityCount && quantityCount > 0) {
                // 개당 가격 (원/개)
                unitPrice = price / quantityCount;
            }

            return {
                storeName,
                productName: item.name,
                price,
                discountRate: item.discountRate ?? undefined,
                weight: weightInGrams,
                quantity: quantityCount,
                unitPrice: unitPrice ? parseFloat(unitPrice.toFixed(2)) : undefined,
                url: item.url ?? undefined,
                keyword
            };
        });

    } catch (error) {
        console.error(`Error scraping ${storeName} for ${keyword}:`, error);
        return [];
    } finally {
        console.log(`Closing Stagehand session for ${storeName} - ${keyword}`);
        await stagehand.close();
    }
}
