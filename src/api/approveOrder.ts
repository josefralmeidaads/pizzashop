import { api } from "@/lib/axios";

export interface IGetApproveOrderParams {
 orderId: string;
}

export const approveOrder = async({ orderId }:IGetApproveOrderParams ) => {
  await api.patch(`/orders/${orderId}/approve`);
}