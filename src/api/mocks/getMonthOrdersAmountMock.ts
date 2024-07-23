import { http, HttpResponse } from "msw"
import { IGetMonthOrdersAmountResponse } from "../getMonthOrdersAmount"

export const getMonthOrdersAmountMock = http.get<never, never, IGetMonthOrdersAmountResponse>("/metrics/month-orders-amount", async() => {
 return HttpResponse.json({
  amount: 210,
  diffFromLastMonth: 1
 })
})