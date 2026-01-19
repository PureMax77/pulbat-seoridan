import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function BestDealsSkeleton() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="w-full h-[200px] flex items-center justify-center gap-4 overflow-hidden">
        <Skeleton className="w-[200px] h-[180px] rounded-xl shrink-0 opacity-50 scale-90" />
        <Skeleton className="w-[240px] h-[200px] rounded-xl shrink-0 z-10" />
        <Skeleton className="w-[200px] h-[180px] rounded-xl shrink-0 opacity-50 scale-90" />
      </div>
      <div className="flex justify-center gap-12">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-10 h-10 rounded-full" />
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
