import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { scrapeProductPrices } from '@/lib/scraper';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // Vercel Pro 최대 5분

// 크롤링 대상 스토어 설정 (cron job과 동일하게 유지)
const STORES = [
    {
        name: 'Lottemart',
        urlTemplate: (keyword: string) => `https://lottemartzetta.com/products/search?q=${encodeURIComponent(keyword)}`,
        extractPrompt: ''
    },
    {
        name: 'Emart',
        urlTemplate: (keyword: string) => `https://emart.ssg.com/search.ssg?query=${encodeURIComponent(keyword)}`,
        extractPrompt: ''
    },
    {
        name: 'Kurly',
        urlTemplate: (keyword: string) => `https://www.kurly.com/search?sword=${encodeURIComponent(keyword)}`,
        extractPrompt: ''
    },
];

export async function GET(request: NextRequest) {
    // 환경 변수의 시크릿을 사용한 간단한 인증 확인
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const fruitName = searchParams.get('name');

    if (!fruitName) {
        return NextResponse.json(
            { success: false, error: '과일 이름(name) 파라미터가 필요합니다. (예: ?name=사과)' },
            { status: 400 }
        );
    }

    // 실행 시간 측정 시작
    const startTime = Date.now();
    console.log(`[Manual Update] 시작: ${fruitName} - ${new Date().toISOString()}`);

    const results = [];

    try {
        for (const store of STORES) {
            const itemStartTime = Date.now();
            const url = store.urlTemplate(fruitName);

            console.log(`[Manual Update] 크롤링 시작: ${store.name} - ${fruitName}`);

            // 데이터 크롤링
            const items = await scrapeProductPrices(store.name, url, fruitName, store.extractPrompt);

            if (items.length > 0) {
                // 데이터베이스에 저장
                await prisma.productPrice.createMany({
                    data: items,
                });
                results.push({ store: store.name, fruit: fruitName, count: items.length });
                const itemDuration = ((Date.now() - itemStartTime) / 1000).toFixed(2);
                console.log(`[Manual Update] 완료: ${store.name} - ${fruitName} (${items.length}개 항목, ${itemDuration}초)`);
            } else {
                results.push({ store: store.name, fruit: fruitName, count: 0, message: 'No items found' });
                const itemDuration = ((Date.now() - itemStartTime) / 1000).toFixed(2);
                console.log(`[Manual Update] 완료: ${store.name} - ${fruitName} (항목 없음, ${itemDuration}초)`);
            }

            // 요청 제한을 피하기 위해 짧은 지연 시간 추가 (마지막 항목이 아니면)
            if (store !== STORES[STORES.length - 1]) {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`[Manual Update] 전체 완료: 총 ${totalDuration}초 소요`);

        // 크롤링 완료 후 홈 페이지 캐시 갱신
        revalidatePath('/');
        console.log(`[Manual Update] 홈 페이지 캐시 갱신 완료`);

        return NextResponse.json({
            success: true,
            results,
            timestamp: new Date().toISOString(),
            duration: `${totalDuration}초`,
            revalidated: true
        });

    } catch (error) {
        const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.error(`[Manual Update] 실패 (${totalDuration}초 소요):`, error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error', details: String(error) },
            { status: 500 }
        );
    }
}
