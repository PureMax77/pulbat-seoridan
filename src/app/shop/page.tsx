import { AppLayout } from "@/components/app-layout";
import { ShoppingBag, Gift } from "lucide-react";

export default function ShopPage() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-8rem)] p-6">
        <div className="text-center space-y-6 max-w-sm">
          <div className="relative inline-flex">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full blur-xl opacity-30 animate-pulse" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center shadow-2xl">
              <Gift className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              농산물 쇼핑 준비중
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              신선한 농산물을 최저가로 구매하실 수 있는
              <br />
              쇼핑 기능을 준비중이에요! 🥕
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-pink-500">
            <ShoppingBag className="w-5 h-5 animate-bounce" />
            <span className="text-sm font-medium text-gray-400">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
