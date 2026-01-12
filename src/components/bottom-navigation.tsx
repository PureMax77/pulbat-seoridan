"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, TrendingUp, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "홈", icon: Home },
  { href: "/market", label: "시세", icon: TrendingUp },
  { href: "/shop", label: "쇼핑몰", icon: ShoppingBag },
  { href: "/my", label: "MY", icon: User },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:left-auto lg:right-auto lg:w-[420px] bg-white/95 backdrop-blur-md border-t border-gray-200 z-40 shadow-lg">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
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
              {isActive && (
                <div className="absolute top-1 w-12 h-1 bg-linear-to-r from-green-500 to-green-600 rounded-full" />
              )}
              <div
                className={cn(
                  "flex flex-col items-center justify-center transition-all",
                  isActive && "scale-110"
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
