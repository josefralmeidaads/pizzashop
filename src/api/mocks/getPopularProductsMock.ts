import { http, HttpResponse } from "msw"
import { IGetPopularProductsResponse } from "../getPopularProducts"

export const getPopularProductsMock = http.get<never, never, IGetPopularProductsResponse>("/metrics/popular-products", async() => {
 return HttpResponse.json([
  { amount: 120, product: "Pizza Peperoni" },
  { amount: 40, product: "Pizza Calabresa" },
  { amount: 30, product: "Pizza Largarto" },
  { amount: 15, product: "Pizza Da Casa" },
  { amount: 100, product: "Pizza 4 Queijos" },
 ])
})