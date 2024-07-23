import { env } from '@/env';
import { setupWorker } from 'msw/browser'
import { sigInMock } from './sigInMock';

export const worker = setupWorker(sigInMock);

export const enableMSW = async() => {
 if(env.MODE !== "test"){
   return
 }

 await worker.start();
}