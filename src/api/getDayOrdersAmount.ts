import { api } from "@/lib/axios"

export interface IGetDayOrdersAmountResponse {
 amount: number;
 diffFromYesterday: number;
}

export const getDayOrdersAmount = async() => {
 const response = await api.get<IGetDayOrdersAmountResponse>("/metrics/day-orders-amount")

 return response.data
}