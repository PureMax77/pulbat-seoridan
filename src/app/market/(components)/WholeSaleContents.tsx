"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

export const WholeSaleContents = () => {
  return (
    <>
      {/* 제목 영역 */}
      <div className="mb-4 flex items-center gap-2 shrink-0">
        <h1 className="text-2xl font-bold text-gray-800">오늘의 농산물 도매가</h1>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex-1 overflow-hidden relative">
        <Card className="flex flex-col items-center justify-center h-full border-0 shadow-none">
          <CardContent className="text-center space-y-4 p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Package className="w-8 h-8 text-blue-500" />
            </div>
            <CardTitle className="text-xl">도매가 정보</CardTitle>
            <p className="text-muted-foreground">
              도매가 정보는 준비 중입니다.
              <br />
              곧 제공될 예정입니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
