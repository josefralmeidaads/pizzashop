import { HttpResponse, http } from "msw"
import { IGetDeliverOrderParams } from "../deliverOrder"

export const deliverOrderMock = http.patch<IGetDeliverOrderParams, never, never>(`/orders/:orderId/deliver`, async({ params }) => {
 const { orderId } = params

 if(orderId === "error-order-id"){
  return new HttpResponse(null, { status: 400 })
 }
 
 return new HttpResponse(null, { status: 204 })
})