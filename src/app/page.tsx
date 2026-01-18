import { AppLayout } from '@/components/app-layout';
import { BestDeals } from '@/app/(components)/BestDeals';
import { CategoryComparison } from '@/app/(components)/CategoryComparison';
import { SeasonalBasket } from '@/app/(components)/SeasonalBasket';
import { getBestDeals, getCategoryComparison, getSeasonalBasketData } from '@/lib/actions/market-data';

// Ensure fresh data on every request (or use revalidate if caching is preferred)
export const dynamic = 'force-dynamic';

export default async function Home() {
  const currentMonth = new Date().getMonth() + 1;

  // Parallel data fetching
  const [bestDeals, categoryData, basketData] = await Promise.all([
    getBestDeals(),
    getCategoryComparison(),
    getSeasonalBasketData(currentMonth)
  ]);

  return (
    <AppLayout>
      <div className="w-full bg-gray-50/30 min-h-full pb-8">
        <div className="w-full px-5 py-6 space-y-10">

          <section className="space-y-3">
            <div className="flex flex-col gap-1 mb-1">
              <h2 className="text-xl font-bold">오늘의 베스트 딜</h2>
              <p className="text-xs text-gray-500">오늘 가장 할인율이 높은 알뜰 상품을 모았어요</p>
            </div>
            <BestDeals products={bestDeals} />
          </section>

          <section className="space-y-3">
            <div className="flex flex-col gap-1 mb-1">
              <h2 className="text-xl font-bold">카테고리별 마트 가격 비교</h2>
              <p className="text-xs text-gray-500">같은 과일, 어디서 사는 게 가장 저렴할까요?</p>
            </div>
            <CategoryComparison data={categoryData} />
          </section>

          <section className="space-y-3">
            <div className="flex flex-col gap-1 mb-1">
              <h2 className="text-xl font-bold">{currentMonth}월 제철 과일 장바구니</h2>
              <p className="text-xs text-gray-500">지금 가장 맛있는 과일들을 한 번에 비교해보세요</p>
            </div>
            <SeasonalBasket initialData={basketData} />
          </section>

        </div>
      </div >
    </AppLayout >
  );
}
