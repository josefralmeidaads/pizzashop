import { api } from "@/lib/axios"

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

export const getOrders = async() => {
 const response = await api.get<IGetOrdersResponse>("/orders", {
  params: {
   pageIndex: 0,
  }
 })

 return response.data;
}