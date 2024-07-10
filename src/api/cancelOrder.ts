import { api } from "@/lib/axios";

export interface IGetCancelOrderParams {
 orderId: string;
}

export const cancelOrder = async({ orderId }:IGetCancelOrderParams ) => {
  await api.patch(`/orders/${orderId}/cancel`);
}