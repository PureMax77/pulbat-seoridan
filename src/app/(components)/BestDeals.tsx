'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/lib/actions/market-data';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';

interface BestDealsProps {
  products: Product[];
}

export function BestDeals({ products }: BestDealsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (products.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500 text-sm">
        현재 할인 중인 상품이 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col relative -mx-5">
      <div className="w-full h-2 bg-gray-100" />
      <Carousel
        opts={{
          align: 'center',
          loop: true,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {products.map((product, index) => {
            const originalPrice = product.discountRate
              ? Math.round(product.price / (1 - product.discountRate / 100))
              : product.price;

            return (
              <CarouselItem key={index} className="pl-0">
                <Link
                  href={product.url || '#'}
                  target={product.url ? "_blank" : undefined}
                  rel={product.url ? "noopener noreferrer" : undefined}
                  className={product.url ? "cursor-pointer" : "cursor-default"}
                  onClick={(e) => {
                    if (!product.url) {
                      e.preventDefault();
                    }
                  }}
                >
                  <Card className={`relative w-full h-[120px] flex overflow-hidden transition-all duration-300 select-none border-0 rounded-none shadow-none ${index % 2 === 0 ? 'bg-green-50' : 'bg-amber-50'}`}>
                    <CardContent className="py-2.5 px-7 flex gap-5 items-center w-full min-h-0">
                      {/* 좌측: 스토어 정보 */}
                      <div className="flex flex-col items-center justify-center gap-1.5 shrink-0">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 bg-white shrink-0 shadow-sm">
                          <Image
                            src={`/images/store/${product.storeName}.png`}
                            alt={product.storeName}
                            fill
                            priority
                            sizes="48px"
                            className="object-contain p-1"
                          />
                        </div>
                        <span className="text-[10px] font-medium text-gray-600 text-center leading-tight max-w-[60px] line-clamp-2">
                          {product.storeName}
                        </span>
                      </div>

                      {/* 우측: 상품 정보 */}
                      <div className="flex flex-col justify-center ">
                        {/* 상품명 */}
                        <div className="flex items-start">
                          <h3 className="font-bold text-sm leading-tight line-clamp-2 break-keep">
                            {product.productName}
                          </h3>
                        </div>

                        {/* 가격 정보 */}
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-2">
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
                            {product.discountRate && (
                              <Badge className="h-5 px-1.5 text-[11px] font-bold bg-red-600 text-white hover:bg-red-700 shadow-none">
                                {Math.round(product.discountRate)}%
                              </Badge>
                            )}
                          </div>

                          {(product.unitPrice && (product.weight || product.quantity)) && (
                            <p className="text-[10px] text-gray-400">
                              {product.weight
                                ? `100g당 ${Math.round(product.unitPrice * 100).toLocaleString()}원`
                                : `개당 ${Math.round(product.unitPrice).toLocaleString()}원`}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      <div className="w-full h-2 bg-gray-100" />
      <div className="absolute bottom-4 right-4 z-10">
        <Badge variant="secondary" className="h-5 px-2 text-[10px] font-medium bg-gray-800/80 text-white hover:bg-gray-800/80">
          {current}/{products.length}
        </Badge>
      </div>
    </div>
  );
}
