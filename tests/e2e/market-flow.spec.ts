/**
 * Market Flow (Core User Journey) E2E Test
 * 
 * 목적: 사용자가 가장 빈번하게 수행하는 "마켓 목록 조회 -> 상세 페이지 이동 -> 정보 확인 -> 목록 복귀" 흐름을 검증합니다.
 * 
 * 주요 시나리오:
 * 1. /market 페이지 접속 및 로딩 확인 (타이틀, 상품 목록)
 * 2. 첫 번째 상품 클릭하여 상세 페이지 이동
 * 3. 상세 페이지의 핵심 요소 검증 (URL, 상품명 타이틀, 가격 차트)
 * 4. 뒤로 가기 버튼을 통해 목록 페이지로 정상 복귀 확인
 */
import { test, expect } from '@playwright/test';

test.describe('Market Flow (Core User Journey)', () => {
  test('should navigate from market list to detail page and back', async ({ page }) => {
    // 1. 마켓 페이지 접속
    await page.goto('/market');

    // 2. 페이지 로딩 및 타이틀 확인
    // 타이틀이 "오늘의 농산물 소매가"인지 확인
    await expect(page.getByRole('heading', { name: '오늘의 농산물 소매가' })).toBeVisible();

    // 로딩 스피너가 사라질 때까지 대기 (데이터가 로드될 때까지)
    // PriceCard가 최소 1개 이상 나타날 때까지 대기
    const firstCard = page.locator('div[role="button"]').first();
    await expect(firstCard).toBeVisible({ timeout: 10000 });

    // 중요: Next.js 하이드레이션 및 리스트 애니메이션이 완료될 때까지 잠시 대기
    // 요소가 보여도 이벤트 리스너가 아직 부착되지 않았거나 애니메이션 중일 수 있음
    await page.waitForTimeout(1000);

    // 첫 번째 카드의 아이템 이름 가져오기 (나중에 상세 페이지 검증용)
    const itemNameLocator = firstCard.locator('h3');
    const itemName = await itemNameLocator.textContent();
    console.log(`Testing item: ${itemName}`);

    // 3. 상품 상세 페이지로 이동
    // 클릭과 동시에 URL이 변경되는 것을 기다립니다 (Race condition 방지)
    await Promise.all([
      page.waitForURL(/\/market\/.+/),
      firstCard.click()
    ]);

    // 4. URL 및 상세 페이지 요소 검증
    // URL에 /market/이 포함되어야 함
    await expect(page).toHaveURL(/\/market\/.+/);

    // 상세 페이지 타이틀이 목록에서 클릭한 아이템 이름과 일치하는지 확인
    if (itemName) {
      await expect(page.getByRole('heading', { name: itemName, level: 1 })).toBeVisible();
    }

    // "시세 정보" 텍스트 확인
    await expect(page.getByText('시세 정보')).toBeVisible();

    // 가격 차트가 렌더링되었는지 확인 (Canvas 요소 존재 여부)
    // 차트 데이터 로딩 시간이 있을 수 있으므로 여유 있게 확인
    await expect(page.locator('canvas')).toBeVisible({ timeout: 10000 });

    // 5. 뒤로 가기 동작 검증
    // 뒤로 가기 버튼 클릭
    const backButton = page.getByLabel('뒤로가기');

    // 클릭과 동시에 URL 변경 대기
    await Promise.all([
      page.waitForURL(/\/market/),
      backButton.click()
    ]);

    // 다시 마켓 목록 페이지로 돌아왔는지 확인
    await expect(page.getByRole('heading', { name: '오늘의 농산물 소매가' })).toBeVisible();
  });
});
