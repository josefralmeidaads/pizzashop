import { api } from "@/lib/axios";

export interface IGetDispatchOrderParams {
 orderId: string;
}

export const dispatchOrder = async({ orderId }:IGetDispatchOrderParams ) => {
  await api.patch(`/orders/${orderId}/dispatch`);
}