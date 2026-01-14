import { AppLayout } from "@/components/app-layout";
import { Sparkles, Rocket, TrendingUp, Percent, ArrowRight, RefreshCw, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

// 최신 가격 데이터 가져오기 (서버 사이드)
async function getLatestPrices() {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // 테이블 존재 여부 확인 (마이그레이션 실패 시 안전을 위해)
    // 실제 앱에서는 DB가 동기화되어 있다고 가정합니다
    return await prisma.productPrice.findMany({
      where: {
        scrapedAt: {
          gte: twentyFourHoursAgo
        }
      },
      orderBy: {
        price: 'asc'
      },
      take: 10
    });
  } catch (e) {
    console.error("Failed to fetch prices:", e);
    return [];
  }
}

export default async function Home() {
  const prices = await getLatestPrices();

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-8rem)] p-6">
        <div className="w-full max-w-md space-y-6">
          {/* 메인 카드 - 가격 정보 표시 */}
          <Card className="overflow-hidden border-2 border-green-100">
            <CardHeader className="text-center bg-green-50/50 pb-6">
              <div className="flex justify-center mb-4">
                <Avatar className="w-24 h-24 ring-4 ring-white shadow-lg">
                  <AvatarFallback className="bg-linear-to-br from-green-500 to-blue-600">
                    <ShoppingCart className="w-12 h-12 text-white" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent font-bold">
                오늘의 과일 시세
              </CardTitle>
              <CardDescription className="text-base mt-2">
                대형마트 최저가 정보를 모아봤어요! 🍎
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {prices.length > 0 ? (
                <div className="space-y-3">
                  {prices.map((price) => (
                    <div key={price.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col overflow-hidden">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-[10px] h-5 px-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100">
                            {price.storeName}
                          </Badge>
                          <span className="text-xs text-gray-400">
                            {formatDistanceToNow(new Date(price.scrapedAt), { addSuffix: true, locale: ko })}
                          </span>
                        </div>
                        <span className="text-sm font-medium truncate w-48 text-gray-700">{price.productName}</span>
                      </div>
                      <div className="text-right whitespace-nowrap">
                        <span className="text-lg font-bold text-red-500">{price.price.toLocaleString()}</span>
                        <span className="text-xs text-gray-500 ml-1">원</span>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2 text-center text-xs text-gray-400">
                    * 최근 24시간 기준 수집된 데이터입니다.
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 space-y-3">
                  <RefreshCw className="w-10 h-10 mx-auto text-gray-300 animate-pulse" />
                  <p className="text-gray-500 font-medium">아직 수집된 데이터가 없어요</p>
                  <p className="text-xs text-gray-400">잠시 후 다시 확인해주세요</p>
                </div>
              )}

              <Link href="/market" className="block mt-4">
                <Button
                  className="w-full h-12 text-base font-semibold bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                  size="lg"
                >
                  더 많은 시세 보기
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 예정 기능 카드 */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer border-dashed">
              <CardContent className="flex flex-col items-center p-4 space-y-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">추천 농산물</p>
                  <p className="text-xs text-muted-foreground">오늘의 베스트</p>
                </div>
              </CardContent>
            </Card>

            <Card className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer border-dashed">
              <CardContent className="flex flex-col items-center p-4 space-y-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Percent className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">특가 정보</p>
                  <p className="text-xs text-muted-foreground">할인 상품</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
