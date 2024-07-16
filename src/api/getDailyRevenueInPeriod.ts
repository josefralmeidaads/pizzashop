import { api } from "@/lib/axios"

export interface IGetDailyRevenueInPeriodQuery {
 from?: Date;
 to?: Date;
}

export type IGetDailyRevenueInPeriodResponse = {
 receipt: number;
 date: string;
}[]

export const getDailyRevenueInPeriod = async({ from, to }: IGetDailyRevenueInPeriodQuery) => {
 const response = await api.get("/metrics/daily-receipt-in-period", {
  params: {
   from,
   to,
  }
  });

 return response.data;
}