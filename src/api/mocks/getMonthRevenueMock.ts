import { http, HttpResponse } from "msw"
import { IGetMonthRevenueResponse } from "../getMonthRevenue"

export const getMonthRevenueMock = http.get<never, never, IGetMonthRevenueResponse>("/metrics/month-receipt", async() => {
 return HttpResponse.json({
  receipt: 180000,
  diffFromLastMonth: 2
 })
})