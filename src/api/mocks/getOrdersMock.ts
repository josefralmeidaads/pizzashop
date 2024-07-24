import { HttpResponse, http } from "msw";
import type { IGetOrdersResponse } from "../getOrders";
import { i } from "vitest/dist/reporters-B7ebVMkT.js";

type IOrders = IGetOrdersResponse['orders'];
type IOrdersStatus = IGetOrdersResponse['orders'][number]['status'];

const statuses: IOrdersStatus[] = [
 "canceled",
 "delivered",
 "delivering",
 "pending",
 "processing"
]

const orders: IOrders = Array.from({ length: 60 }).map((_, index) => {
 return {
  orderId: `order-${index+1}`,
  customerName: `Customer-${index + 1}`,
  status: statuses[index % 5],
  total: Math.floor(Math.random() * (Math.floor(90000) - Math.ceil(1000)) + Math.ceil(1000)),
  createdAt: new Date(),
 }
})

export const getOrdersMock = http.get<never, never, IGetOrdersResponse>("/orders", async({ request }) => {
 const { searchParams } = new URL(request.url)

 const pageIndex = searchParams.get("pageIndex") ? Number(searchParams.get("pageIndex")) : 0;
 const orderId = searchParams.get("orderId");
 const customerName = searchParams.get("customerName");
 const status = searchParams.get("status");

 let filteredOrders = orders;

 if(customerName){
  filteredOrders = filteredOrders.filter((order) => order.customerName.includes(customerName))
 }

 if(orderId){
  filteredOrders = filteredOrders.filter((order) => order.orderId.includes(orderId))
 }

 if(status){
  filteredOrders = filteredOrders.filter((order) => order.status === status)
 }

 const paginatedOrders = filteredOrders.slice(pageIndex * 10, (pageIndex + 1) * 10)

 return HttpResponse.json({
  orders: paginatedOrders,
  meta: {
   pageIndex,
   perPage: 10,
   totalCount: filteredOrders.length
  }
 })
})