import { HttpResponse, http } from "msw"
import { IGetCancelOrderParams } from "../cancelOrder"

export const canceledOrderMock = http.patch<IGetCancelOrderParams, never, never>(`/orders/:orderId/cancel`, async({ params }) => {
 const { orderId } = params

 if(orderId === "error-order-id"){
  return new HttpResponse(null, { status: 400 })
 }
 
 return new HttpResponse(null, { status: 204 })
})