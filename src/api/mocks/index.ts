import { env } from '@/env';
import { setupWorker } from 'msw/browser'
import { sigInMock } from './sigInMock';
import { registerRestaurantMock } from './registerRestaurantMock';
import { getDayOrdersAmountMock } from './getDayOrdersAmountMock';
import { getMonthCanceledOrdersAmountMock } from './getMonthCanceledOrdersAmountMock';
import { getMonthRevenueMock } from './getMonthRevenueMock';
import { getMonthOrdersAmountMock } from './getMonthOrdersAmountMock';
import { getDayilyRevenueInPeriodMock } from './getDailyRevenueInPeriodMock';
import { getPopularProductsMock } from './getPopularProductsMock';
import { getProfileMock } from './getProfileMock';
import { getManagedRestaurantMock } from './getManagedRestaurant';
import { updateProfileMock } from './updateProfileMock';
import { getOrdersMock } from './getOrdersMock';
import { getOrdersDetailsMock } from './getOrdersDetailsMock';

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
  updateProfileMock,
  getOrdersMock,
  getOrdersDetailsMock,
);

export const enableMSW = async() => {
 if(env.MODE !== "test"){
   return
 }

 await worker.start();
}