import { test, expect } from '@playwright/test';

test('update profile successfully', async ({ page }) => {
 await page.goto('/', { waitUntil: "networkidle" });

 await page.getByRole('button', { name: 'Pizza Shop Almeida' }).click();
 await page.getByRole('menuitem', { name: 'Perfil da loja' }).click();

 await page.getByLabel('Nome').fill("Pizza Shop Schell");
 await page.getByLabel('Descrição').fill("Pizza Shop Schell Description");
 
 await page.getByRole('button', { name: 'Salvar' }).click();

 await page.waitForLoadState("networkidle");

 const toast = await page.getByText("Perfil atualizado com sucesso!");

 expect(toast).toBeVisible();
});

test('update profile is wrong error', async ({ page }) => {
 await page.goto('/', { waitUntil: "networkidle" });

 await page.getByRole('button', { name: 'Pizza Shop Almeida' }).click();
 await page.getByRole('menuitem', { name: 'Perfil da loja' }).click();

 await page.getByLabel('Nome').fill("Invalid Name");
 await page.getByLabel('Descrição').fill("Pizza Shop Schell Description");
 
 await page.getByRole('button', { name: 'Salvar' }).click();

 await page.waitForLoadState("networkidle");

 const toast = await page.getByText("Falha ao atualizar o perfil, tente novamente!");

 expect(toast).toBeVisible();
});