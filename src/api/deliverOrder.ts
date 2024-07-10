import { api } from "@/lib/axios";

export interface IGetDeliverOrderParams {
 orderId: string;
}

export const deliverOrder = async({ orderId }:IGetDeliverOrderParams ) => {
  await api.patch(`/orders/${orderId}/deliver`);
}