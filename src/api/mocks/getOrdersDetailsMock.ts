import { HttpResponse, http } from "msw"
import { IGetOrderDetaislParams, IGetOrdersDetailsReponse } from "../getOrderDetials"

export const getOrdersDetailsMock = http.get<IGetOrderDetaislParams, never, IGetOrdersDetailsReponse>(`/orders/:orderId`, async({ params }) => {
 const { orderId } = params
 
 return HttpResponse.json({
  id: orderId,
  customer: {
   name: "Jose Almeida",
   email: "josefr.almeidaads@gmail.com",
   phone: "(32)998509807",
  },
  status: "pending",
  orderItems: [
   { id: "item-01", product: { name: "Pizza Calabresa" }, quantity: 1, priceInCents: 9000 },
   { id: "item-02", product: { name: "Pizza 4 Queijos" }, quantity: 2, priceInCents: 7000 },
  ],
  totalInCents: 23000,
  createdAt: new Date().toISOString(),
 })
})