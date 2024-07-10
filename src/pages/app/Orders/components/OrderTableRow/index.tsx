import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {  TableCell, TableRow } from '@/components/ui/table';
import { ArrowRight, Search, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale'

import OrderDetails from '../OrderDetails';
import OrderStatus, { IOrderStatus } from '@/components/OrderStatus';
import { boolean } from 'zod';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelOrder } from '@/api/cancelOrder';
import { IGetOrdersResponse } from '@/api/getOrders';
import { approveOrder } from '@/api/approveOrder';
import { deliverOrder } from '@/api/deliverOrder';
import { dispatchOrder } from '@/api/dispatchOrder';


interface IOrderItem {
  orderId: string;
   createdAt: Date;
   status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
   customerName: string;
   total: number;
}

interface IOrderTableRow {
  order: IOrderItem
}



const OrderTableRow = ({ order }: IOrderTableRow) => {
  const queryClient = useQueryClient();
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  const updateOrderStatusOnCache = (orderId: string, { status }: IOrderStatus) => {
    const listOrdersCached = queryClient.getQueriesData<IGetOrdersResponse>({
      queryKey: ['orders'],
    })

    listOrdersCached.forEach(([cacheKey, cacheData]) => {
      if(!cacheData){
        return
      }

      queryClient.setQueryData<IGetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if(order.orderId === orderId){
            return {
              ...order,
              status: status,
            }
          } else {
            return order
          }
        })
      })
    })
  }
  
  const { mutateAsync: cancelOrderFn, isPending: isCancellingOrder } = useMutation({
    mutationFn: cancelOrder,
    async onSuccess(_, { orderId }, __) {
      updateOrderStatusOnCache(orderId, { status: 'canceled' })
    },
  })

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder  } = useMutation({
    mutationFn: approveOrder,
    async onSuccess(_, { orderId }, __) {
      updateOrderStatusOnCache(orderId, { status: 'processing' })
    },
  })

  const { mutateAsync: deliverOrderFn, isPending: isDisptachOrder } = useMutation({
    mutationFn: deliverOrder,
    async onSuccess(_, { orderId }, __) {
      updateOrderStatusOnCache(orderId, { status: 'delivered' })
    },
  })

  const { mutateAsync: dispatchOrderFn, isPending: isDeliveredOrder } = useMutation({
    mutationFn: dispatchOrder,
    async onSuccess(_, { orderId }, __) {
      updateOrderStatusOnCache(orderId, { status: 'delivering' })
    },
  })

  return (
   <TableRow>
     <TableCell>
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogTrigger asChild>
          <Button size="xs" variant="outline">
          <Search className="h-3 w-3"/>
          <span className="sr-only">Detalhes do pedido</span>
          </Button>
        </DialogTrigger>

        <OrderDetails open={isDetailsOpen} orderId={order.orderId}/>  
      </Dialog>
     </TableCell>

     <TableCell className="font-mono text-xs font-medium">
      {order.orderId}
     </TableCell>

     <TableCell className="text-muted-foreground">
       {formatDistanceToNow(order.createdAt, { locale: ptBR, addSuffix: true })}
     </TableCell>

     <TableCell>
      <OrderStatus status={order.status}/>
     </TableCell>

     <TableCell className="font-medium">
      {order.customerName}
     </TableCell>

     <TableCell className="font-medium">
      {(order.total / 100).toLocaleString('pt-BR', { currency: "BRL", style: "currency" })}
     </TableCell>
     
     <TableCell>
      {order.status === "pending" && (
        <Button 
          disabled={isApprovingOrder} 
          onClick={() => approveOrderFn({ orderId: order.orderId })} 
          size="xs" 
          variant="outline"
        >
        <ArrowRight className="w-3 h-3 mr-2"/>
          Aprovar
        </Button>
      )}

      {order.status === "processing" && (
        <Button 
          disabled={isDeliveredOrder} 
          onClick={() => dispatchOrderFn({ orderId: order.orderId })} 
          size="xs" 
          variant="outline"
        >
        <ArrowRight className="w-3 h-3 mr-2"/>
          Em entrega
        </Button>
      )}

      {order.status === "delivering" && (
        <Button 
          disabled={isDisptachOrder} 
          onClick={() => deliverOrderFn({ orderId: order.orderId })} 
          size="xs" 
          variant="outline"
        >
        <ArrowRight className="w-3 h-3 mr-2"/>
          Entregue
        </Button>
      )}

     </TableCell>

     <TableCell>
      <Button 
        disabled={!["pending", "processing"].includes(order.status) || isCancellingOrder} 
        size="xs" 
        variant="ghost"
        onClick={() => cancelOrderFn({ orderId: order.orderId })}
      >
      <X className="w-3 h-3 mr-2"/>
        Cancelar
      </Button>
     </TableCell>
    </TableRow>
  );
}

export default OrderTableRow;