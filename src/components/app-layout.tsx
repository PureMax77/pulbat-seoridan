import { BottomNavigation } from "./bottom-navigation";
import { Leaf, Phone, Award, Heart } from "lucide-react";
import Link from "next/link";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-blue-50 flex justify-center">
      {/* 좌측 사이드바 - 넓은 화면에서만 표시 */}
      <aside className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center sticky top-0 h-screen">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
            {/* 로고 & 타이틀 */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-linear-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                풀밭서리단
              </h1>
            </div>

            {/* 메인 메시지 */}
            <div className="bg-linear-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
              <h2 className="text-xl font-bold text-gray-800 mb-3 leading-relaxed">
                신선한 농산물,
                <br />
                가장 저렴하게!
              </h2>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <Heart className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <p>전국 농산물 가격을</p>
                  <p>한눈에 비교하세요</p>
                </div>
              </div>
            </div>

            {/* 서비스 특징 */}
            <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-amber-600" />
                <p className="font-bold text-amber-900">
                  전국 농산물 실시간 가격비교
                </p>
              </div>
              <div className="text-sm text-amber-800/80 space-y-1 ml-7">
                <p>대형마트 · 온라인마트 · 전통시장</p>
                <p>최저가를 한눈에 확인하세요</p>
              </div>
            </div>

            {/* 고객센터 */}
            <div className="bg-linear-to-br from-red-50 to-pink-50 rounded-xl p-5 border border-red-100">
              <p className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500" />
                문의사항이 있으신가요?
              </p>
              <a
                href="tel:1522-6585"
                className="text-2xl font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-2 group"
              >
                📞 1522-1522
                <span className="text-sm font-normal text-gray-500 group-hover:text-red-500 transition-colors">
                  (클릭하여 전화하기)
                </span>
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* 메인 컨텐츠 영역 - 420px 고정 */}
      <main className="w-full lg:w-[420px] bg-white min-h-screen flex flex-col relative shadow-2xl">
        {/* 헤더 */}
        <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-40 px-5 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 bg-linear-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md shadow-green-500/30">
                <Leaf className="w-5 h-5 text-white" />
              </div>
            </Link>
            <h1 className="text-xl font-bold bg-linear-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              풀밭서리단
            </h1>
          </div>
        </header>

        {/* 페이지 컨텐츠 */}
        <div className="flex-1 pb-16">{children}</div>

        {/* 하단 네비게이션 */}
        <BottomNavigation />
      </main>

      {/* 우측 빈 공간 (대칭을 위해) */}
      <div className="hidden lg:block lg:flex-1" />
    </div>
  );
}
