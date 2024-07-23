import { http, HttpResponse } from "msw"
import { IGetDailyRevenueInPeriodResponse } from "../getDailyRevenueInPeriod"

export const getDayilyRevenueInPeriodMock = http.get<never, never, IGetDailyRevenueInPeriodResponse>("/metrics/daily-receipt-in-period", async() => {
 return HttpResponse.json([
  { date: "23/07/2024", receipt: 120 },
  { date: "22/07/2024", receipt: 100 },
  { date: "21/07/2024", receipt: 140 },
  { date: "20/07/2024", receipt: 60 },
  { date: "19/07/2024", receipt: 10 },
  { date: "18/07/2024", receipt: 250 },
 ])
})