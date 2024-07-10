import { api } from "@/lib/axios";

export interface IGetOrderDetaislParams {
 orderId: string;
}

export interface IGetOrdersDetailsReponse {
  id: string;
  createdAt: string;
  status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
  totalInCents: number;
  customer: {
      name: string;
      email: string;
      phone: string | null;
  };
  orderItems: {
   id: string;
   priceInCents: number;
   quantity: number;
   product: {
    name: string;
   }
  }[]
}

export const getOrderDetails = async({ orderId }:IGetOrderDetaislParams ) => {
  const response = await api.get(`/orders/${orderId}`);

  return response.data;
}