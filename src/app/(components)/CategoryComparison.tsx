'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CategoryBestItem } from '@/lib/actions/market-data';
import { cn } from '@/lib/utils';

interface CategoryComparisonProps {
  data: CategoryBestItem[];
}

export function CategoryComparison({ data }: CategoryComparisonProps) {
  const [selectedKeyword, setSelectedKeyword] = useState(data[0]?.keyword || '');

  if (data.length === 0) {
    return <div className="text-center py-10 text-gray-500 text-sm">데이터가 없습니다.</div>;
  }

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="w-full">
      <Tabs value={selectedKeyword} onValueChange={setSelectedKeyword} className="w-full">
        <div className="overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
          <TabsList className="w-max h-auto p-1 bg-transparent gap-2">
            {data.map((item) => (
              <TabsTrigger
                key={item.keyword}
                value={item.keyword}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-1.5 rounded-full border bg-white text-sm"
              >
                {item.keyword}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {data.map((category) => (
          <TabsContent key={category.keyword} value={category.keyword} className="mt-2">
            <div className="space-y-2">
              {category.items.map((item, index) => (
                <Card key={item.id} className={cn(
                  "overflow-hidden transition-all border shadow-sm",
                  index === 0 ? "border-green-500/50 bg-green-50/50" : "border-gray-100"
                )}>
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="text-xl font-bold w-6 text-center shrink-0">
                      {index < 3 ? medals[index] : <span className="text-sm text-gray-500">{index + 1}</span>}
                    </div>

                    <div className="relative w-10 h-10 shrink-0 rounded-full border bg-white overflow-hidden">
                      <Image
                        src={`/images/store/${item.storeName}.png`}
                        alt={item.storeName}
                        fill
                        sizes="40px"
                        className="object-contain p-1.5"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="font-bold text-gray-900 text-sm">{item.storeName}</span>
                        {index === 0 && <Badge variant="secondary" className="h-4 px-1 text-[10px] bg-green-100 text-green-700 hover:bg-green-200">최저가</Badge>}
                      </div>
                      <p className="text-xs text-gray-600 truncate">{item.productName}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-bold text-base">{item.price.toLocaleString()}원</div>
                      <div className={cn(
                        "text-[11px]",
                        index === 0 ? "text-green-600 font-medium" : "text-gray-500"
                      )}>
                        {item.unitPrice
                          ? (item.weight
                            ? `100g당 ${Math.round(item.unitPrice * 100).toLocaleString()}원`
                            : `개당 ${Math.round(item.unitPrice).toLocaleString()}원`)
                          : ''}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
