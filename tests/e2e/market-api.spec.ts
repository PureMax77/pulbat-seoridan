/**
 * Market API & Error Handling E2E Test
 * 
 * 목적: 백엔드 API 상태(정상, 에러, 지연 등)에 따른 프론트엔드의 대응을 검증합니다.
 * 
 * 주요 시나리오:
 * 1. 정상 응답 시 데이터 렌더링 확인 (Mock Data 활용)
 * 2. 서버 에러(500) 발생 시 에러 UI 표시 및 재시도 기능 확인
 * 3. 네트워크 에러 발생 시 처리 확인
 */
import { test, expect } from '@playwright/test';

// Mock 데이터 정의
const MOCK_DATA = {
  condition: [],
  data: {
    error_code: "000",
    item: [
      {
        item_name: "테스트사과",
        item_code: "111",
        kind_name: "후지",
        kind_code: "01",
        rank: "상",
        rank_code: "04",
        unit: "10개",
        day1: "10/01",
        dpr1: "25,000",
        priceHistory: [
          { date: "2023-10-01", price: "25,000" }
        ]
      },
      {
        item_name: "테스트배",
        item_code: "222",
        kind_name: "신고",
        kind_code: "01",
        rank: "중",
        rank_code: "05",
        unit: "10개",
        day1: "10/01",
        dpr1: "30,000",
        priceHistory: [
          { date: "2023-10-01", price: "30,000" }
        ]
      }
    ]
  }
};

test.describe('Market API Handling', () => {

  test('should render list correctly with valid API response', async ({ page }) => {
    // 1. 정상 응답 Mocking
    await page.route('/api/market/day-price*', async route => {
      await route.fulfill({ json: MOCK_DATA });
    });

    await page.goto('/market');

    // 2. Mock 데이터가 화면에 표시되는지 확인
    await expect(page.getByText('테스트사과')).toBeVisible();
    await expect(page.getByText('테스트배')).toBeVisible();
    await expect(page.getByText('25,000원')).toBeVisible();
  });

  test('should show error UI when API returns 500 error', async ({ page }) => {
    // 1. 500 에러 Mocking
    await page.route('/api/market/day-price*', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal Server Error' })
      });
    });

    await page.goto('/market');

    // 2. 에러 UI 확인
    await expect(page.getByText('오류가 발생했습니다')).toBeVisible();

    // 3. "다시 시도" 버튼 확인
    const retryButton = page.getByRole('button', { name: '다시 시도' });
    await expect(retryButton).toBeVisible();

    // 4. 재시도 로직 검증 (재시도 시 정상 응답으로 변경)
    await page.unroute('/api/market/day-price*'); // 기존 핸들러 제거
    await page.route('/api/market/day-price*', async route => {
      await route.fulfill({ json: MOCK_DATA });
    });

    await retryButton.click();

    // 5. 재시도 후 정상 데이터 로드 확인
    await expect(page.getByText('테스트사과')).toBeVisible();
  });

  test('should handle network error gracefully', async ({ page }) => {
    // 1. 네트워크 에러(실패) Mocking
    await page.route('/api/market/day-price*', async route => {
      await route.abort('failed');
    });

    await page.goto('/market');

    // 2. 에러 UI가 표시되는지 확인 (네트워크 에러도 동일한 에러 컴포넌트 사용 가정)
    await expect(page.getByText('오류가 발생했습니다')).toBeVisible();
  });
});
