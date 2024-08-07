import { http, HttpResponse } from "msw"
import { IGetMonthCanceledOrdersAmountResponse } from "../getMonthCanceledOrdersAmount"

export const getMonthCanceledOrdersAmountMock = http.get<never, never, IGetMonthCanceledOrdersAmountResponse>("/metrics/month-canceled-orders-amount", async() => {
 return HttpResponse.json({
  amount: 5,
  diffFromLastMonth: 1
 })
})