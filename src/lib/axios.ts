import { env } from '@/env';
import axios from 'axios';

export const api = axios.create({
 baseURL: env.VITE_API_URL,
 withCredentials: true, //cookie seja enviados automaticamente
})

if(env.VITE_ENABLE_API_DELAY){
 api.interceptors.request.use(async(config) => {
  await new Promise((resolve) => setTimeout(resolve, 2000)) //aplicando delay na requisição

  return config //retornando corpo original da requisição
 })
}