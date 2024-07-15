import { api } from "@/lib/axios"

export interface IGetMonthRevenueResponse {
 receipt: number;
 diffFromLastMonth: number;
}

export const getMonthRevenue = async() => {
 const response = await api.get<IGetMonthRevenueResponse>("/metrics/month-receipt")

 return response.data
}