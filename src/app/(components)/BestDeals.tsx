'use client';

import { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/actions/market-data';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import CircularCard, { CircularCardRef } from '@/components/CircularCard';
import { cn } from '@/lib/utils';

interface BestDealsProps {
  products: Product[];
}

export function BestDeals({ products }: BestDealsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const circularCardRef = useRef<CircularCardRef>(null);

  // CircularCard에서 중앙 아이템이 변경될 때 호출되는 콜백
  const handleCenterIndexChange = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  if (products.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500 text-sm">
        현재 할인 중인 상품이 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="w-full h-[200px] relative overflow-hidden pt-4">
        <CircularCard
          ref={circularCardRef}
          items={products}
          itemWidth={240}
          gap={20}
          scale={0.6}
          onCenterIndexChange={handleCenterIndexChange}
          renderItem={(product, index, isActive) => {
            const originalPrice = product.discountRate
              ? Math.round(product.price / (1 - product.discountRate / 100))
              : product.price;

            return (
              <Card
                className={cn(
                  "w-full h-[190px] flex flex-col overflow-hidden transition-all duration-300 bg-white select-none",
                  isActive ? "border-primary/50 ring-0 ring-primary/20 z-10" : "opacity-60 scale-90 grayscale-[0.5] z-0"
                )}
              >
                <CardContent className="p-3 flex-1 flex flex-col min-h-0 justify-between">
                  <div className="flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-1.5">
                      <div className="relative w-5 h-5 rounded-full overflow-hidden border bg-white shrink-0">
                        <Image
                          src={`/images/store/${product.storeName}.png`}
                          alt={product.storeName}
                          fill
                          priority
                          sizes="20px"
                          className="object-contain p-0.5"
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-700 truncate max-w-[80px]">
                        {product.storeName}
                      </span>
                    </div>
                    {product.discountRate && (
                      <Badge className="h-4 px-1 text-[10px] font-bold bg-red-600 text-white hover:bg-red-700 shadow-none">
                        {Math.round(product.discountRate)}%
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-center py-1">
                    <h3 className="font-bold text-sm leading-tight line-clamp-2 text-center break-keep">
                      {product.productName}
                    </h3>
                  </div>

                  <div className="flex flex-col items-center gap-0 shrink-0">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-bold text-green-600">
                        {product.price.toLocaleString()}
                        <span className="text-xs font-normal text-gray-600 ml-0.5">원</span>
                      </span>
                      {product.discountRate && (
                        <span className="text-xs text-gray-400 line-through">
                          {originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {(product.unitPrice && (product.weight || product.quantity)) && (
                      <p className="text-[10px] text-gray-400 text-center truncate w-full">
                        {product.weight
                          ? `100g당 ${Math.round(product.unitPrice * 100).toLocaleString()}원`
                          : `개당 ${Math.round(product.unitPrice).toLocaleString()}원`}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-2 pt-0 shrink-0">
                  {product.url ? (
                    <Button asChild className="w-full h-8 text-sm bg-gray-200 hover:bg-gray-300 border-0 shadow-sm" size="sm">
                      <Link
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1"
                        onPointerDown={(e) => e.stopPropagation()}
                      >
                        구 매 <ExternalLink className="w-3 h-3" />
                      </Link>
                    </Button>
                  ) : (
                    <Button disabled className="w-full h-7 text-xs bg-gray-200 text-gray-500 border-0" size="sm">
                      링크 없음
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          }}
        />
      </div>

      <div className="flex justify-center gap-12 mt-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-white rounded-full w-10 h-10 shadow-sm border-gray-200 hover:bg-gray-50 hover:text-primary transition-colors cursor-pointer"
          onClick={() => circularCardRef.current?.prev()}
          aria-label="이전 상품"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white rounded-full w-10 h-10 shadow-sm border-gray-200 hover:bg-gray-50 hover:text-primary transition-colors cursor-pointer"
          onClick={() => circularCardRef.current?.next()}
          aria-label="다음 상품"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
