import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * On-Demand Revalidation API
 * 
 * 캐싱된 페이지를 수동으로 새로고침(갱신)할 수 있는 API 엔드포인트입니다.
 * 
 * 사용 목적:
 * - 긴급하게 캐시를 갱신해야 할 때 (크롤링 실패, 데이터 수정 후 즉시 반영 등)
 * - 관리자 대시보드에서 수동으로 페이지 갱신 버튼 구현 시
 * - 개발/디버깅 시 캐시 동작 테스트
 * 
 * 호출 방법:
 * curl -X POST "https://your-domain.com/api/revalidate?secret=YOUR_SECRET_KEY"
 * 
 * 환경 변수 설정 필요:
 * .env 파일에 REVALIDATE_SECRET=your-secret-key 추가
 * 
 * 현재 갱신 대상:
 * - 홈 페이지 (/)
 * 
 * 다른 페이지 추가 방법:
 * revalidatePath('/about');        // 특정 경로
 * revalidatePath('/products');     // 상품 목록 페이지
 * revalidatePath('/blog', 'layout'); // 레이아웃 포함 전체 갱신
 */
export async function POST(request: NextRequest) {
  // 보안을 위한 시크릿 키 확인
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: 'Invalid secret token' },
      { status: 401 }
    );
  }

  try {
    // 홈 페이지 캐시 무효화 및 재생성
    revalidatePath('/');

    // 필요시 다른 페이지도 추가 가능
    // revalidatePath('/about');
    // revalidatePath('/products');
    // revalidatePath('/blog', 'layout'); // 해당 경로 및 하위 모든 페이지 갱신

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error revalidating', details: error },
      { status: 500 }
    );
  }
}
