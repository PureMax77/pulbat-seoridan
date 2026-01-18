"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, TrendingUp, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 네비게이션 아이템 정의
 */
const navItems = [
  { href: "/", label: "홈", icon: Home },
  { href: "/market", label: "시세", icon: TrendingUp },
  { href: "/shop", label: "쇼핑몰", icon: ShoppingBag },
  { href: "/my", label: "MY", icon: User },
];

/**
 * BottomNavigation 컴포넌트
 * 
 * - 앱 하단에 고정된 네비게이션 바입니다.
 * - 현재 경로(pathname)를 확인하여 활성 탭을 강조 표시합니다.
 * - 데스크탑 뷰에서는 메인 컨테이너 너비(420px)에 맞춰 정렬됩니다.
 */
export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:left-auto lg:right-auto lg:w-[420px] bg-white/95 backdrop-blur-md border-t border-gray-200 z-40 shadow-lg">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          // 현재 경로와 일치하는지 확인하여 활성 상태 결정
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-all rounded-xl relative group",
                isActive
                  ? "text-green-600"
                  : "text-gray-500 hover:text-green-600 hover:bg-green-50"
              )}
              aria-label={item.label}
            >
              {/* 활성 상태 표시바 (상단) */}
              {isActive && (
                <div className="absolute top-1 w-12 h-1 bg-linear-to-r from-green-500 to-green-600 rounded-full" />
              )}
              
              {/* 아이콘 및 라벨 컨테이너 */}
              <div
                className={cn(
                  "flex flex-col items-center justify-center transition-all",
                  isActive && "scale-110" // 활성 시 약간 확대
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6 mb-1 transition-all",
                    isActive && "drop-shadow-md"
                  )}
                />
                <span
                  className={cn(
                    "text-xs font-medium transition-all",
                    isActive && "font-bold"
                  )}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
