import { test, expect } from '@playwright/test';

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: "networkidle" });
  await page.getByLabel('Seu e-mail').fill("diego.schell.f@gmail.com");
  await page.getByRole('button', { name: 'Acessar painel' }).click();

  const toast = await page.getByText("Enviamos um link de autenticação para seu e-mail.")

  expect(toast).toBeVisible();
});


test('sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: "networkidle" });
  await page.getByLabel('Seu e-mail').fill("josefr.almeidaads@gmail.com");
  await page.getByRole('button', { name: 'Acessar painel' }).click();

  const toast = await page.getByText("Falha ao realizar login.")

  expect(toast).toBeVisible();
});

test('navigate to new restaurant', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: "networkidle" });
  await page.getByRole('link', { name: 'Novo estabelecimento' }).click();

  const heading = await page.getByRole('heading', { name: 'Criar conta grátis' })

  expect(heading).toBeVisible();
  expect(page.url()).toContain("/sign-up");
});
