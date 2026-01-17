'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BasketData } from '@/lib/actions/market-data';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface SeasonalBasketProps {
  initialData: BasketData;
}

export function SeasonalBasket({ initialData }: SeasonalBasketProps) {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(initialData.seasonalKeywords);
  const [expandedStore, setExpandedStore] = useState<string | null>(null);

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords(prev =>
      prev.includes(keyword)
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const rankings = useMemo(() => {
    if (selectedKeywords.length === 0) return [];

    const storeNames = Object.keys(initialData.storeData);

    return storeNames.map(storeName => {
      const products = selectedKeywords
        .map(keyword => initialData.storeData[storeName][keyword])
        .filter(Boolean);

      const missingKeywords = selectedKeywords.filter(k => !initialData.storeData[storeName][k]);

      const totalPrice = products.reduce((sum, p) => sum + p.price, 0);

      return {
        storeName,
        totalPrice,
        products,
        missingKeywords,
        isComplete: missingKeywords.length === 0
      };
    })
      .filter(store => store.isComplete)
      .sort((a, b) => a.totalPrice - b.totalPrice);

  }, [initialData, selectedKeywords]);

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
          <span>제철 과일 선택</span>
          <span className="text-xs font-normal text-gray-500">(체크하여 장바구니 구성)</span>
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {initialData.seasonalKeywords.map(keyword => (
            <div key={keyword} className="flex items-center space-x-2">
              <Checkbox
                id={`keyword-${keyword}`}
                checked={selectedKeywords.includes(keyword)}
                onCheckedChange={() => toggleKeyword(keyword)}
                className="w-4 h-4"
              />
              <label
                htmlFor={`keyword-${keyword}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none py-1"
              >
                {keyword}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-lg flex items-center gap-2">
          마트별 총합 비교
        </h3>

        {selectedKeywords.length === 0 ? (
          <div className="text-center py-6 text-gray-400 bg-gray-50 rounded-lg text-sm">
            선택된 과일이 없습니다.
          </div>
        ) : rankings.length === 0 ? (
          <div className="text-center py-6 text-gray-400 bg-gray-50 rounded-lg text-sm">
            선택한 모든 과일을 판매하는 마트가 없습니다.
          </div>
        ) : (
          rankings.map((store, index) => (
            <Card key={store.storeName} className={cn(
              "overflow-hidden transition-all border",
              index === 0 ? "border-green-500/30 shadow-md ring-1 ring-green-500/10" : "border-gray-200 shadow-sm"
            )}>
              <div
                className="p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50/50 transition-colors"
                onClick={() => setExpandedStore(expandedStore === store.storeName ? null : store.storeName)}
              >
                <span className="text-xl min-w-[24px] text-center shrink-0">
                  {index < 3 ? medals[index] : <span className="text-sm text-gray-500 font-bold">{index + 1}</span>}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="relative w-6 h-6 rounded-full border bg-white overflow-hidden shrink-0">
                      <Image
                        src={`/images/store/${store.storeName}.png`}
                        alt={store.storeName}
                        fill
                        sizes="24px"
                        className="object-contain p-0.5"
                      />
                    </div>
                    <span className="font-bold text-base">{store.storeName}</span>
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {store.products.map(p => p.keyword).join(' + ')}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-bold text-lg text-green-600 leading-tight">
                    {store.totalPrice.toLocaleString()}원
                  </div>
                  <div className="flex justify-end mt-1">
                    {expandedStore === store.storeName ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </div>
              </div>

              {expandedStore === store.storeName && (
                <div className="border-t bg-gray-50/50 p-3 space-y-2 animate-in slide-in-from-top-2">
                  {store.products.map(product => (
                    <div key={product.id} className="flex flex-col bg-white p-2.5 rounded-lg border shadow-sm">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <Badge variant="outline" className="bg-gray-50 shrink-0 text-[10px] px-1.5 h-5">{product.keyword}</Badge>
                          <p className="font-medium text-xs line-clamp-1">{product.productName}</p>
                        </div>
                        {product.discountRate && (
                          <Badge className="shrink-0 text-[10px] h-5 px-1.5 bg-white text-red-600 border border-red-200 hover:bg-red-50 shadow-none">
                            {Math.round(product.discountRate)}%
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          {product.weight ? `${product.weight}g` : product.quantity ? `${product.quantity}개` : ''}
                          {product.unitPrice && ` · ${Math.round(product.unitPrice).toLocaleString()}원/개`}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-black">{product.price.toLocaleString()}원</span>
                          {product.url && (
                            <Link href={product.url} target="_blank" className="text-gray-400 hover:text-primary">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
