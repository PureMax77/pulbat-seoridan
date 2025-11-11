import { AppLayout } from "@/components/app-layout";
import { ShoppingBag, Gift, CreditCard, Truck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ShopPage() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-8rem)] p-6">
        <div className="w-full max-w-md space-y-6">
          {/* 메인 카드 */}
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="bg-linear-to-br from-pink-500 to-rose-600">
                    <Gift className="w-12 h-12 text-white" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl bg-linear-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                농산물 쇼핑 준비중
              </CardTitle>
              <CardDescription className="text-base mt-2">
                신선한 농산물을 최저가로 구매하실 수 있는<br />
                쇼핑 기능을 준비중이에요! 🥕
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Badge variant="secondary" className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Coming Soon
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* 예정 기능 카드 */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="opacity-60 hover:opacity-100 transition-opacity">
              <CardContent className="flex flex-col items-center p-4 space-y-2">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <CreditCard className="w-6 h-6 text-pink-600" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">간편 결제</p>
                  <p className="text-xs text-muted-foreground">빠른 구매</p>
                </div>
              </CardContent>
            </Card>

            <Card className="opacity-60 hover:opacity-100 transition-opacity">
              <CardContent className="flex flex-col items-center p-4 space-y-2">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <Truck className="w-6 h-6 text-rose-600" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">신선 배송</p>
                  <p className="text-xs text-muted-foreground">당일 배송</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
