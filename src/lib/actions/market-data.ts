import { prisma } from '@/lib/prisma';
import { SEASONAL_FRUITS } from '@/constants/common';

export type Product = Awaited<ReturnType<typeof getBestDeals>>[0];

/**
 * 가장 최근 크롤링된 날짜 범위를 반환합니다.
 * (해당 날짜의 00:00:00 ~ 23:59:59)
 */
async function getLatestScrapeDateRange() {
  const latest = await prisma.productPrice.findFirst({
    orderBy: { scrapedAt: 'desc' },
    select: { scrapedAt: true },
  });

  if (!latest) return null;

  const date = new Date(latest.scrapedAt);
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

export async function getBestDeals() {
  const dateRange = await getLatestScrapeDateRange();

  const where: any = {
    discountRate: {
      not: null,
    },
  };

  if (dateRange) {
    where.scrapedAt = {
      gte: dateRange.start,
      lte: dateRange.end,
    };
  }

  const products = await prisma.productPrice.findMany({
    where,
    orderBy: {
      discountRate: 'desc',
    },
    take: 8,
  });
  return products;
}

export type CategoryBestItem = {
  keyword: string;
  items: (Product & { rank: number })[];
};

export async function getCategoryComparison(): Promise<CategoryBestItem[]> {
  const dateRange = await getLatestScrapeDateRange();
  const dateFilter = dateRange ? {
    scrapedAt: {
      gte: dateRange.start,
      lte: dateRange.end,
    }
  } : {};

  // 1. Get distinct keywords that have data in the latest range
  const distinctKeywords = await prisma.productPrice.findMany({
    where: dateFilter,
    select: { keyword: true },
    distinct: ['keyword'],
  });

  const keywords = distinctKeywords.map((k) => k.keyword);
  const results: CategoryBestItem[] = [];

  for (const keyword of keywords) {
    // 2. For each keyword, fetch products (filtered by date)
    const products = await prisma.productPrice.findMany({
      where: {
        keyword,
        ...dateFilter
      },
    });

    // 3. Group by store and find lowest unitPrice
    const bestByStore = new Map<string, Product>();

    for (const product of products) {
      if (!product.unitPrice) continue;

      const existing = bestByStore.get(product.storeName);
      if (!existing || (product.unitPrice < (existing.unitPrice || Infinity))) {
        bestByStore.set(product.storeName, product);
      }
    }

    // 4. Sort by unitPrice asc
    const sortedItems = Array.from(bestByStore.values())
      .sort((a, b) => (a.unitPrice || 0) - (b.unitPrice || 0))
      .map((item, index) => ({ ...item, rank: index + 1 }));

    if (sortedItems.length > 0) {
      results.push({
        keyword,
        items: sortedItems,
      });
    }
  }

  return results;
}

export type BasketData = {
  seasonalKeywords: string[];
  // Map storeName -> { keyword -> BestProduct }
  storeData: Record<string, Record<string, Product>>;
};

export async function getSeasonalBasketData(month: number): Promise<BasketData> {
  const dateRange = await getLatestScrapeDateRange();
  const dateFilter = dateRange ? {
    scrapedAt: {
      gte: dateRange.start,
      lte: dateRange.end,
    }
  } : {};

  const seasonalKeywords = SEASONAL_FRUITS[month] || [];

  const products = await prisma.productPrice.findMany({
    where: {
      keyword: { in: seasonalKeywords },
      ...dateFilter,
    },
  });

  const storeData: Record<string, Record<string, Product>> = {};

  for (const product of products) {
    // 사용자의 요청에 따라 unitPrice가 있는 상품만 대상으로 하며,
    // unitPrice(단가)가 가장 낮은 상품을 최저가 상품으로 선정합니다.
    if (!product.unitPrice) continue;

    const { storeName, keyword } = product;

    if (!storeData[storeName]) {
      storeData[storeName] = {};
    }

    const currentBest = storeData[storeName][keyword];

    // Find lowest unitPrice for this store + keyword
    if (!currentBest || (product.unitPrice || Infinity) < (currentBest.unitPrice || Infinity)) {
      storeData[storeName][keyword] = product;
    }
  }

  return {
    seasonalKeywords,
    storeData,
  };
}
