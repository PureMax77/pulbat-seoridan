import { AppLayout } from "@/components/app-layout";
import { Sparkles, Rocket, TrendingUp, Percent } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Home() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-8rem)] p-6">
        <div className="w-full max-w-md space-y-6">
          {/* 메인 카드 */}
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="bg-linear-to-br from-green-500 to-blue-600">
                    <Rocket className="w-12 h-12 text-white" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                홈 화면 준비중
              </CardTitle>
              <CardDescription className="text-base mt-2">
                오늘의 추천 농산물과 특가 정보를<br />
                곧 만나보실 수 있어요! 🥬
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Coming Soon
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* 예정 기능 카드 */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="opacity-60 hover:opacity-100 transition-opacity">
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

            <Card className="opacity-60 hover:opacity-100 transition-opacity">
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
