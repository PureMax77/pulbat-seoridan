import { AppLayout } from "@/components/app-layout";
import { User, Settings } from "lucide-react";

export default function MyPage() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-8rem)] p-6">
        <div className="text-center space-y-6 max-w-sm">
          <div className="relative inline-flex">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-cyan-500 rounded-full blur-xl opacity-30 animate-pulse" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-indigo-500 to-cyan-600 rounded-full flex items-center justify-center shadow-2xl">
              <Settings className="w-12 h-12 text-white animate-spin-slow" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              마이페이지 준비중
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              즐겨찾기와 가격 알림 등
              <br />
              맞춤 서비스를 준비중이에요! 👤
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-indigo-500">
            <User className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-medium text-gray-400">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
