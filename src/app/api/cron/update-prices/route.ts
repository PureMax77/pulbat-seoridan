import { NextResponse } from 'next/server';
import { scrapeProductPrices } from '@/lib/scraper';
import prisma from '@/lib/prisma';

// 크롤링 대상 설정
const FRUITS = ['사과', '배'];

const STORES = [
    {
        name: 'Homeplus',
        urlTemplate: (keyword: string) => `https://front.homeplus.co.kr/search?entry=direct&keyword=${encodeURIComponent(keyword)}`
    },
    {
        name: 'Emart',
        urlTemplate: (keyword: string) => `https://emart.ssg.com/search.ssg?query=${encodeURIComponent(keyword)}`
    },
];

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // Vercel Pro 최대 5분, 필요에 따라 조정

export async function GET(request: Request) {
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
                const url = store.urlTemplate(fruit);

                // 데이터 크롤링
                const items = await scrapeProductPrices(store.name, url, fruit);

                if (items.length > 0) {
                    // 데이터베이스에 저장
                    await prisma.productPrice.createMany({
                        data: items,
                    });
                    results.push({ store: store.name, fruit, count: items.length });
                } else {
                    results.push({ store: store.name, fruit, count: 0, message: 'No items found' });
                }

                // 요청 제한을 피하기 위해 짧은 지연 시간 추가
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        return NextResponse.json({
            success: true,
            results,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Cron job failed:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
