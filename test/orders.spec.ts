import { test, expect } from '@playwright/test';

test('list orders', async ({ page }) => {
 await page.goto('/orders', { waitUntil: "networkidle" });
 const pedido1 = await page.getByRole('cell', { name: 'Customer-1', exact: true });
 const pedido10 = await page.getByRole('cell', { name: 'Customer-10'});

 expect(pedido1).toBeVisible();
 expect(pedido10).toBeVisible();
});

test('paginate orders', async ({ page }) => {
 await page.goto('/orders', { waitUntil: "networkidle" });

 await page.getByRole('button', { name: 'Próxima Página' }).click();

 const pedido11 = await page.getByRole('cell', { name: 'Customer-11' });
 const pedido20 = await page.getByRole('cell', { name: 'Customer-20'});

 expect(pedido11).toBeVisible();
 expect(pedido20).toBeVisible();

 await page.getByRole('button', { name: 'Última Página' }).click();

 const pedido51 = await page.getByRole('cell', { name: 'Customer-51' });
 const pedido60 = await page.getByRole('cell', { name: 'Customer-60'});

 expect(pedido51).toBeVisible();
 expect(pedido60).toBeVisible();

 await page.getByRole('button', { name: 'Página Anterior' }).click()

 const pedido41 = await page.getByRole('cell', { name: 'Customer-41' });
 const pedido50 = await page.getByRole('cell', { name: 'Customer-50'});

 expect(pedido41).toBeVisible();
 expect(pedido50).toBeVisible();

 await page.getByRole('button', { name: 'Primeira Página' }).click();

 const pedido1 = await page.getByRole('cell', { name: 'Customer-1', exact: true });
 const pedido10 = await page.getByRole('cell', { name: 'Customer-10'});

 expect(pedido1).toBeVisible();
 expect(pedido10).toBeVisible();
});

test('filter by order id', async({ page }) => {
 await page.goto("/orders", { waitUntil: "networkidle" });

 await page.getByPlaceholder('ID do pedido').fill("order-11");
 await page.getByRole('button', { name: 'Filtrar resultados' }).click();

 const order11 = await page.getByRole('cell', { name: 'order-11' })

 expect(order11).toBeVisible();
})

test('filter by customer', async({ page }) => {
 await page.goto("/orders", { waitUntil: "networkidle" });

 await page.getByPlaceholder('Nome do cliente').fill("Customer-11");
 await page.getByRole('button', { name: 'Filtrar resultados' }).click();

 const customer11 = await page.getByRole('cell', { name: 'Customer-11' })

 expect(customer11).toBeVisible();
})

test('filter by status', async({ page }) => {
 await page.goto("/orders", { waitUntil: "networkidle" });

 await page.getByRole('combobox').click();

 await page.waitForTimeout(1000);

 await page.getByLabel('Pendente').click()

 await page.waitForTimeout(1000);

 await page.getByRole('button', { name: 'Filtrar resultados' }).click();

 const pendente = await page.getByRole('cell', { name: 'Pendente' }).all()

 expect(pendente).toHaveLength(10);
})