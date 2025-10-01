import { AppLayout } from "@/components/app-layout";
import { Sparkles, Rocket } from "lucide-react";

export default function Home() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-8rem)] p-6">
        <div className="text-center space-y-6 max-w-sm">
          {/* 아이콘 */}
          <div className="relative inline-flex">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
              <Rocket className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* 텍스트 */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              홈 화면 준비중
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              오늘의 추천 농산물과 특가 정보를
              <br />곧 만나보실 수 있어요! 🥬
            </p>
          </div>

          {/* 장식 요소 */}
          <div className="flex items-center justify-center gap-2 text-yellow-500">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-medium text-gray-400">
              Coming Soon
            </span>
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
