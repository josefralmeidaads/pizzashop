import { test, expect } from '@playwright/test';

test('display day orders amount metric', async ({ page }) => {
 await page.goto('/', { waitUntil: "networkidle" });

 expect(page.getByText('140', { exact: true })).toBeVisible()
 expect(page.getByText('+5% em relação há ontem', { exact: true })).toBeVisible()
});

test('display month orders amount metric', async ({ page }) => {
 await page.goto('/', { waitUntil: "networkidle" });

 expect(page.getByText('210', { exact: true })).toBeVisible()
 expect(page.getByText('+1%em relação ao mês passado', { exact: true })).toBeVisible()
});

test('display month canceled orders amount metric', async ({ page }) => {
 await page.goto('/', { waitUntil: "networkidle" });

 expect(page.getByText('5', { exact: true })).toBeVisible()
 expect(page.getByText('1% em relação ao mês passado', { exact: true })).toBeVisible()
});

test('display month revenue orders amount metric', async ({ page }) => {
 await page.goto('/', { waitUntil: "networkidle" });

 expect(page.getByText('R$ 1.800,00', { exact: true })).toBeVisible()
 expect(page.getByText('+2%em relação ao mês passado', { exact: true })).toBeVisible()
});