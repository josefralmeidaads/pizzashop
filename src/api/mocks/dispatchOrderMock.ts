import { HttpResponse, http } from "msw"
import { IGetDispatchOrderParams } from "../dispatchOrder"

export const dispatchOrderMock = http.patch<IGetDispatchOrderParams, never, never>(`/orders/:orderId/dispatch`, async({ params }) => {
 const { orderId } = params

 if(orderId === "error-order-id"){
  return new HttpResponse(null, { status: 400 })
 }
 
 return new HttpResponse(null, { status: 204 })
})