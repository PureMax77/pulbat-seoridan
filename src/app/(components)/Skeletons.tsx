import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function BestDealsSkeleton() {
  return (
    <div className="flex flex-col relative -mx-5">
      {/* 상단 구분선 */}
      <div className="w-full h-2 bg-gray-100" />
      
      {/* 카드 영역 */}
      <div className="w-full h-[120px] flex overflow-hidden">
        <Card className="relative w-full h-full flex border-0 rounded-none shadow-none bg-white">
          <CardContent className="py-2.5 px-7 flex gap-5 items-center w-full min-h-0">
            {/* 좌측: 스토어 아이콘 */}
            <div className="flex flex-col items-center justify-center gap-1.5 shrink-0">
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="h-3 w-[50px]" />
            </div>

            {/* 우측: 상품 정보 */}
            <div className="flex-1 flex flex-col justify-between min-w-0 py-1">
              {/* 상품명 */}
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-[70%]" />
                <Skeleton className="h-4 w-[50%]" />
              </div>

              {/* 가격 정보 */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-5 w-[40px] rounded-md" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 하단 구분선 */}
      <div className="w-full h-2 bg-gray-100" />

      {/* 페이지 번호 표시 */}
      <div className="absolute bottom-4 right-7 z-10">
        <Skeleton className="h-5 w-[40px] rounded-md" />
      </div>
    </div>
  )
}

export function CategoryComparisonSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="w-full">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-3 w-[60px]" />
              </div>
            </div>
            <Skeleton className="h-6 w-[80px]" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function SeasonalBasketSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl border shadow-sm space-y-3">
        <Skeleton className="h-5 w-[120px]" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-6 w-[70px] rounded-md" />
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-6 w-[140px]" />
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-gray-200">
            <div className="p-3 flex items-center gap-3">
              <Skeleton className="w-6 h-6 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-3 w-[150px]" />
              </div>
              <Skeleton className="h-6 w-[80px]" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
