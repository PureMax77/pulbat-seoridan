import { AppLayout } from "@/components/app-layout";
import { User, Settings, Bell, Heart, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function MyPage() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-8rem)] p-6">
        <div className="w-full max-w-md space-y-6">
          {/* 프로필 카드 */}
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="bg-linear-to-br from-indigo-500 to-cyan-600">
                    <Settings className="w-12 h-12 text-white animate-spin-slow" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl bg-linear-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                마이페이지 준비중
              </CardTitle>
              <CardDescription className="text-base mt-2">
                즐겨찾기와 가격 알림 등<br />
                맞춤 서비스를 준비중이에요! 👤
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Badge variant="secondary" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Coming Soon
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* 예정 기능 카드 */}
          <div className="space-y-3">
            <Card className="opacity-60 hover:opacity-100 transition-opacity">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <Heart className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-medium">즐겨찾기</p>
                    <p className="text-sm text-muted-foreground">자주 찾는 품목 저장</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>

            <Card className="opacity-60 hover:opacity-100 transition-opacity">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Bell className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium">가격 알림</p>
                    <p className="text-sm text-muted-foreground">원하는 가격에 알림 받기</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
