import { HttpResponse, http } from "msw"
import { IGetApproveOrderParams } from "../approveOrder"

export const approveOrderMock = http.patch<IGetApproveOrderParams, never, never>(`/orders/:orderId/approve`, async({ params }) => {
 const { orderId } = params

 if(orderId === "error-order-id"){
  return new HttpResponse(null, { status: 400 })
 }
 
 return new HttpResponse(null, { status: 204 })
})