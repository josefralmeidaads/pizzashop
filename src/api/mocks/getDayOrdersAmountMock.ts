import { http, HttpResponse } from "msw"
import { IGetDayOrdersAmountResponse } from "../getDayOrdersAmount"

export const getDayOrdersAmountMock = http.get<never, never, IGetDayOrdersAmountResponse>("/metrics/day-orders-amount", async() => {
 return HttpResponse.json({
  amount: 140,
  diffFromYesterday: 5
 })
})