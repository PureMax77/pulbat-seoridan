import { AppLayout } from "@/components/app-layout";
import { TrendingUp, BarChart3 } from "lucide-react";

export default function MarketPage() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-8rem)] p-6">
        <div className="text-center space-y-6 max-w-sm">
          <div className="relative inline-flex">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
              <BarChart3 className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              농산물 시세 준비중
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              실시간 농산물 가격 정보와 트렌드를
              <br />곧 확인하실 수 있어요! 📊
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-blue-500">
            <TrendingUp className="w-5 h-5 animate-bounce" />
            <span className="text-sm font-medium text-gray-400">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
