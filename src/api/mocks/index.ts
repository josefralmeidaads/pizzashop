import { env } from '@/env';
import { setupWorker } from 'msw/browser'
import { sigInMock } from './sigInMock';
import { registerRestaurantMock } from './registerRestaurantMock';
import { getDayOrdersAmountMock } from './getDayOrdersAmountMock';
import { getMonthCanceledOrdersAmountMock } from './getMonthCanceledOrdersAmountMock';
import { getMonthRevenueMock } from './getMonthRevenueMock';
import { getMonthOrdersAmountMock } from './getMonthOrdersAmountMock';
import { getDayilyRevenueInPeriodMock } from './getDailyRevenueInPeriodMock';
import { getPopularProducts } from '../getPopularProducts';
import { getPopularProductsMock } from './getPopularProductsMock';
import { getProfile } from '../getProfille';
import { getProfileMock } from './getProfileMock';
import { getManagedRestaurantMock } from './getManagedRestaurant';

export const worker = setupWorker(
  sigInMock, 
  registerRestaurantMock, 
  getDayOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthRevenueMock,
  getMonthOrdersAmountMock,
  getDayilyRevenueInPeriodMock,
  getPopularProductsMock,
  getProfileMock,
  getManagedRestaurantMock,
);

export const enableMSW = async() => {
 if(env.MODE !== "test"){
   return
 }

 await worker.start();
}