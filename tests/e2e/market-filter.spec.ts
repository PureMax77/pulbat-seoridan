/**
 * Market Filter & Search E2E Test
 * 
 * 목적: 사용자가 필터를 통해 원하는 데이터를 찾을 수 있는지 검증합니다.
 * 
 * 주요 시나리오:
 * 1. 필터 UI(필터 바, 바텀 시트) 렌더링 및 동작 확인
 * 2. 지역 필터 적용 시 API 요청 및 목록 갱신 확인
 * 3. 데이터가 없을 때의 UI 처리 확인 (API Mocking)
 */
import { test, expect } from '@playwright/test';

test.describe('Market Filter & Search', () => {

  test('should open and close filter bottom sheet', async ({ page }) => {
    await page.goto('/market');

    // 필터 바텀 시트 열기 버튼 클릭
    const filterButton = page.getByLabel('필터 선택 메뉴 열기');
    await expect(filterButton).toBeVisible();
    await filterButton.click();

    // 바텀 시트가 열렸는지 확인 (제목 "필터 선택" 확인)
    await expect(page.getByRole('heading', { name: '필터 선택' })).toBeVisible();

    // 닫기 버튼 클릭
    const closeButton = page.getByLabel('필터 선택 메뉴 닫기');
    await closeButton.click();

    // 바텀 시트가 닫혔는지 확인
    await expect(page.getByRole('heading', { name: '필터 선택' })).toBeHidden();
  });

  test('should apply region filter and update list', async ({ page }) => {
    await page.goto('/market');

    // API 요청을 가로채서 쿼리 파라미터 검증 준비
    const requestPromise = page.waitForRequest(request =>
      request.url().includes('/api/market/day-price') &&
      request.url().includes('p_country_code=')
    );

    // 1. 바텀 시트 열기
    await page.getByLabel('필터 선택 메뉴 열기').click();

    // 2. 지역 탭 확인 (기본 활성화)
    const regionTab = page.getByRole('tab', { name: '지역' });
    await expect(regionTab).toHaveAttribute('aria-selected', 'true');

    // 3. '서울' 지역 선택 (버튼 텍스트로 찾기)
    // 실제 데이터에 '서울'이 있다고 가정. 만약 없다면 retailCountryCodes 확인 필요하지만 통상 서울은 있음.
    const seoulButton = page.getByRole('button', { name: '서울' });
    await seoulButton.click();

    // 선택된 스타일 적용 확인 (class에 bg-blue-50 등이 포함되는지)
    // Playwright에서는 CSS 클래스보다는 상태 변화를 믿고 진행하거나, 
    // 적용하기 버튼을 눌러서 결과를 확인하는 것이 더 확실함.

    // 4. 적용하기 버튼 클릭
    await page.getByRole('button', { name: '적용하기' }).click();

    // 5. API 요청 발생 확인 (지역 코드가 파라미터로 전송되었는지)
    const request = await requestPromise;
    expect(request.url()).toContain('p_country_code=1101'); // 서울 코드: 1101 (kamis-codemap 참고)

    // 6. 필터 바에 '서울' 칩이 생성되었는지 확인
    // FilterChip은 텍스트를 포함하고 있음
    await expect(page.getByText('서울')).toBeVisible();
  });

  test('should show empty state when no data returned', async ({ page }) => {
    // API 응답 Mocking: 빈 데이터 반환
    await page.route('/api/market/day-price*', async route => {
      const json = {
        condition: [],
        data: {
          error_code: "000",
          item: [] // 빈 배열
        }
      };
      await route.fulfill({ json });
    });

    await page.goto('/market');

    // "검색 결과가 없습니다" 텍스트 확인
    await expect(page.getByText('검색 결과가 없습니다')).toBeVisible();
    await expect(page.getByText('다른 필터 조건을 선택해보세요')).toBeVisible();
  });
});
