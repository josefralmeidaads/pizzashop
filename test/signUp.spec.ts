import { test, expect } from '@playwright/test';

test('sign-up in successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: "networkidle" });
  await page.locator('#restaurantName').fill("Pizza Shop");
  await page.locator('#managerName').fill("Jose Almeida");
  await page.locator('#phone').fill("32998509807");
  await page.locator('#email').fill("diego.schell.f@gmail.com");

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click();

  const toast = await page.getByText("Restaurante cadastrado com sucesso.");

  expect(toast).toBeVisible();
});

test('navigate to login', async ({ page }) => {
 await page.goto('/sign-up', { waitUntil: "networkidle" });
 await page.getByRole('link', { name: 'Fazer login' }).click();
 expect(page.url()).toContain("/sign-in");
});