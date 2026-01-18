import { BottomNavigation } from "./bottom-navigation";
import { Leaf, Phone, Award, Heart } from "lucide-react";
import Link from "next/link";

/**
 * 앱 전체 레이아웃 Props
 */
interface AppLayoutProps {
  /** 레이아웃 내부에 렌더링될 페이지 컨텐츠 */
  children: React.ReactNode;
}

/**
 * AppLayout 컴포넌트
 * 
 * - 데스크탑/모바일 반응형 구조를 정의하는 최상위 레이아웃 컴포넌트입니다.
 * - 모바일 퍼스트 디자인을 따르며, 데스크탑에서는 중앙 정렬된 모바일 뷰와 좌측 사이드바를 보여줍니다.
 * 
 * 주요 기능:
 * 1. 데스크탑 뷰: 좌측 소개 사이드바 + 중앙 앱 화면
 * 2. 모바일 뷰: 전체 화면 앱 (최대 너비 420px 고정)
 * 3. 공통 헤더: 로고 및 타이틀 표시 (스크롤 시 고정)
 * 4. 하단 네비게이션: 모바일 네비게이션 바 포함
 * 
 * 구조:
 * - aside (hidden lg:flex): 데스크탑 전용 좌측 패널
 * - main wrapper (w-full lg:w-[420px]): 실제 앱 컨텐츠 영역
 */
export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-blue-50 flex justify-center">
      {/* 
        좌측 사이드바 - 넓은 화면(lg 이상)에서만 표시 
        서비스 소개, 특징, 고객센터 정보를 담고 있음
      */}
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
                aria-label="고객센터 전화하기: 1522-1522"
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

      {/* 
        메인 컨텐츠 영역 - 420px 고정 (모바일 뷰 시뮬레이션)
        실제 앱 기능이 표시되는 영역
      */}
      <div className="w-full lg:w-[420px] bg-white min-h-screen flex flex-col relative shadow-2xl">
        {/* 헤더 - 고정 위치 (오버스크롤에 영향받지 않음) */}
        <header className="fixed top-0 left-0 right-0 lg:left-auto lg:right-auto lg:w-[420px] bg-white/95 backdrop-blur-md border-b border-gray-200 z-50 px-5 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity" aria-label="홈으로 이동">
              <div className="w-9 h-9 bg-linear-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md shadow-green-500/30">
                <Leaf className="w-5 h-5 text-white" />
              </div>
            </Link>
            <h1 className="text-xl font-bold bg-linear-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              풀밭서리단
            </h1>
          </div>
        </header>

        {/* 
          페이지 컨텐츠 - 헤더와 바텀 네비게이션 높이만큼 여백 확보 
          overscroll-none: 불필요한 바운스 효과 방지
        */}
        <main className="flex-1 pt-[65px] pb-16 overscroll-none">
          <div className="overscroll-contain">
            {children}
          </div>
        </main>

        {/* 하단 네비게이션 바 */}
        <BottomNavigation />
      </div>

      {/* 우측 빈 공간 (데스크탑 뷰에서 중앙 정렬을 위한 대칭 공간) */}
      <div className="hidden lg:block lg:flex-1" />
    </div>
  );
}
