import { NextResponse } from 'next/server';
import { scrapeProductPrices } from '@/lib/scraper';
import prisma from '@/lib/prisma';

// 크롤링 대상 설정
const FRUITS = ['사과', '배', '딸기'];

const STORES = [
    // },
    // {
    //     name: 'Coupang',
    //     urlTemplate: (keyword: string) => `https://www.coupang.com/np/search?component=&q=${encodeURIComponent(keyword)}`,
    //     extractPrompt: ''
    // },
    // {
    //     name: 'Lottemart',
    //     urlTemplate: (keyword: string) => `https://lottemartzetta.com/products/search?q=${encodeURIComponent(keyword)}`,
    //     extractPrompt: ''
    // }
    {
        name: 'Homeplus',
        urlTemplate: (keyword: string) => `https://front.homeplus.co.kr/search?entry=direct&keyword=${encodeURIComponent(keyword)}`,
        extractPrompt: '홈플러스 특화 프롬프트를 여기에 추가하세요'
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

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // Vercel Pro 최대 5분, 필요에 따라 조정

export async function GET(request: Request) {
    // 실행 시간 측정 시작
    const startTime = Date.now();
    console.log(`[Cron Job] 시작: ${new Date().toISOString()}`);

    // 환경 변수의 시크릿을 사용한 간단한 인증 확인
    // 프로덕션에서는 Vercel 프로젝트 설정에 CRON_SECRET이 설정되어 있는지 확인하세요
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const results = [];

    try {
        for (const store of STORES) {
            for (const fruit of FRUITS) {
                const itemStartTime = Date.now();
                const url = store.urlTemplate(fruit);

                console.log(`[Cron Job] 크롤링 시작: ${store.name} - ${fruit}`);

                // 데이터 크롤링
                const items = await scrapeProductPrices(store.name, url, fruit, store.extractPrompt);

                if (items.length > 0) {
                    // 데이터베이스에 저장
                    await prisma.productPrice.createMany({
                        data: items,
                    });
                    results.push({ store: store.name, fruit, count: items.length });
                    const itemDuration = ((Date.now() - itemStartTime) / 1000).toFixed(2);
                    console.log(`[Cron Job] 완료: ${store.name} - ${fruit} (${items.length}개 항목, ${itemDuration}초)`);
                } else {
                    results.push({ store: store.name, fruit, count: 0, message: 'No items found' });
                    const itemDuration = ((Date.now() - itemStartTime) / 1000).toFixed(2);
                    console.log(`[Cron Job] 완료: ${store.name} - ${fruit} (항목 없음, ${itemDuration}초)`);
                }

                // 요청 제한을 피하기 위해 짧은 지연 시간 추가
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`[Cron Job] 전체 완료: 총 ${totalDuration}초 소요`);

        return NextResponse.json({
            success: true,
            results,
            timestamp: new Date().toISOString(),
            duration: `${totalDuration}초`
        });
    } catch (error) {
        const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.error(`[Cron Job] 실패 (${totalDuration}초 소요):`, error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
