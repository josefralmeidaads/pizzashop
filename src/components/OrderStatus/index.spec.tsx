import { render } from '@testing-library/react'
import OrderStatus from '.'

describe('Order Status', () => {
 it('should display the right text when order status is pending', () => {
  // Pending
  let wrapper = render(<OrderStatus status='pending'/>)

  let statusText = wrapper.getByText('Pendente');
  let badgeElement = wrapper.getByTestId('badge');

  expect(statusText).toBeVisible()
  expect(badgeElement).toHaveClass('bg-slate-400');
 })

 it('should display the right text when order status is canceled', () => {
  // Canceled
  let wrapper = render(<OrderStatus status='canceled'/>)

  let statusText = wrapper.getByText('Cancelado');
  let badgeElement = wrapper.getByTestId('badge');

  expect(statusText).toBeVisible()
  expect(badgeElement).toHaveClass('bg-rose-500');
 })

 it('should display the right text when order status is delivering', () => {
  // Delivering
  let wrapper = render(<OrderStatus status='delivering'/>)

  let statusText = wrapper.getByText('Entregando');
  let badgeElement = wrapper.getByTestId('badge');

  expect(statusText).toBeVisible()
  expect(badgeElement).toHaveClass('bg-amber-500');
 })

 it('should display the right text when order status is processing', () => {
  // Processing
  let wrapper = render(<OrderStatus status='processing'/>)

  let statusText = wrapper.getByText('Processando');
  let badgeElement = wrapper.getByTestId('badge');

  expect(statusText).toBeVisible()
  expect(badgeElement).toHaveClass('bg-amber-500');
 })

 it('should display the right text when order status is delivered', () => {
  // Delivered
  let wrapper = render(<OrderStatus status='delivered'/>)

  let statusText = wrapper.getByText('Entregue');
  let badgeElement = wrapper.getByTestId('badge');

  expect(statusText).toBeVisible()
  expect(badgeElement).toHaveClass('bg-emerald-500');
 })
})