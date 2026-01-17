import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/actions/market-data';
import { ExternalLink } from 'lucide-react';

interface BestDealsProps {
  products: Product[];
}

export function BestDeals({ products }: BestDealsProps) {
  if (products.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500 text-sm">
        현재 할인 중인 상품이 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {products.map((product) => {
        const originalPrice = product.discountRate
          ? Math.round(product.price / (1 - product.discountRate / 100))
          : product.price;

        return (
          <Card key={product.id} className="overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-3 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <div className="relative w-6 h-6 rounded-full overflow-hidden border bg-white shrink-0">
                  <Image
                    src={`/images/store/${product.storeName}.png`}
                    alt={product.storeName}
                    fill
                    sizes="24px"
                    className="object-contain p-0.5"
                  />
                </div>
                {product.discountRate && (
                  <Badge className="h-5 px-1.5 text-[10px] font-bold bg-white text-red-600 border border-red-200 hover:bg-red-50 shadow-none">
                    {Math.round(product.discountRate)}%
                  </Badge>
                )}
              </div>

              <h3 className="font-medium text-sm leading-tight mb-2 line-clamp-2 min-h-[2.5rem]">
                {product.productName}
              </h3>

              <div className="mt-auto">
                <div className="flex flex-col">
                  <span className="text-base font-bold text-green-600 leading-none">
                    {product.price.toLocaleString()}
                    <span className="text-xs font-normal text-gray-600 ml-0.5">원</span>
                  </span>
                  {product.discountRate && (
                    <span className="text-xs text-gray-400 line-through mt-0.5">
                      {originalPrice.toLocaleString()}원
                    </span>
                  )}
                </div>
                {(product.unitPrice && (product.weight || product.quantity)) && (
                  <p className="text-[10px] text-gray-500 mt-1 truncate">
                    {product.weight ? `100g당 ${Math.round(product.unitPrice * 100).toLocaleString()}원` : `개당 ${Math.round(product.unitPrice).toLocaleString()}원`}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-3 pt-0">
              {product.url ? (
                <Button asChild className="w-full h-8 text-xs" variant="outline" size="sm">
                  <Link href={product.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
                    구매 <ExternalLink className="w-3 h-3" />
                  </Link>
                </Button>
              ) : (
                <Button disabled className="w-full h-8 text-xs" variant="outline" size="sm">
                  링크 없음
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
