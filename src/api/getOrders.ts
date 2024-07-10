import { api } from "@/lib/axios"

export interface IGetOrdersQuery {
  pageIndex?: number | null;
  orderId?: string;
  customerName?: string;
  status?: string;
}
export interface IGetOrdersResponse {
  orders: {
   orderId: string;
   createdAt: Date;
   status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
   customerName: string;
   total: number;
 }[];
 meta: {
   pageIndex: number;
   perPage: number;
   totalCount: number;
 };
}

export const getOrders = async({ pageIndex, orderId, customerName, status }: IGetOrdersQuery) => {
 const response = await api.get<IGetOrdersResponse>("/orders", {
  params: {
   pageIndex,
   orderId,
   customerName,
   status
  }
 })

 return response.data;
}