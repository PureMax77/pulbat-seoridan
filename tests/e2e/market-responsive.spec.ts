/**
 * Market Responsive Layout E2E Test
 * 
 * 목적: 모바일 환경에서 주요 UI 요소들이 깨지지 않고 적절하게 표시되는지 검증합니다.
 * 
 * 주요 시나리오:
 * 1. 모바일 뷰포트(iPhone 12 기준)에서 필터 바 레이아웃 확인
 * 2. 상세 페이지의 차트가 화면 너비를 초과하지 않는지 확인
 * 3. 가로 스크롤이 발생하지 않아야 하는 요소들 검증
 */
import { test, expect } from '@playwright/test';

// 모바일 환경 설정 (iPhone 12 Pro 기준)
test.use({
  viewport: { width: 390, height: 844 },
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
  hasTouch: true,
  isMobile: true
});

test.describe('Market Mobile Responsive', () => {

  test('should display filter bar correctly on mobile', async ({ page }) => {
    await page.goto('/market');

    // 1. 필터 바 컨테이너 확인
    // 모바일에서는 보통 꽉 찬 너비나 적절한 패딩을 가짐
    const filterBar = page.locator('.fixed.top-\\[69px\\]');
    await expect(filterBar).toBeVisible();

    // 2. 필터 바 내부 요소들이 세로로 배치되거나, 
    // 화면 밖으로 튀어나가지 않는지 확인 (스크롤 영역 제외)

    // 필터 버튼들이 화면 내에 존재하는지 확인
    const filterButton = page.getByLabel('필터 선택 메뉴 열기');
    await expect(filterButton).toBeVisible();

    // 필터 바가 뷰포트 너비를 넘지 않는지 확인 (BoundingBox 체크)
    const box = await filterBar.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(390); // 뷰포트 너비 이하
  });

  test('should fit chart within screen width on detail page', async ({ page }) => {
    await page.goto('/market');

    // 첫 번째 상품 클릭하여 상세 페이지 이동
    await page.locator('div[role="button"]').first().click();
    await page.waitForURL(/\/market\/.+/);

    // 차트 컨테이너 확인
    const chartContainer = page.locator('canvas').first();
    await expect(chartContainer).toBeVisible();

    // 차트가 화면 너비를 초과하지 않는지 확인
    const chartBox = await chartContainer.boundingBox();

    // 차트의 너비가 뷰포트 너비(390px)보다 작거나 같아야 함 (패딩 고려)
    // 보통 좌우 패딩이 있으므로 390보다 확실히 작아야 함
    expect(chartBox?.width).toBeLessThan(390);

    // 추가로 body에 가로 스크롤이 없는지 확인하는 것이 좋음
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);

    // 모바일 웹에서는 의도치 않은 가로 스크롤이 생기는 경우가 많으므로 체크
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });
});
