import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {  TableCell, TableRow } from '@/components/ui/table';
import { ArrowRight, Search, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale'

import OrderDetails from '../OrderDetails';
import OrderStatus from '@/components/OrderStatus';


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
  return (
   <TableRow>
     <TableCell>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="xs" variant="outline">
          <Search className="h-3 w-3"/>
          <span className="sr-only">Detalhes do pedido</span>
          </Button>
        </DialogTrigger>

        <OrderDetails />  
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
      {order.total.toLocaleString('pt-BR', { currency: "BRL", style: "currency" })}
     </TableCell>
     
     <TableCell>
      <Button size="xs" variant="outline">
      <ArrowRight className="w-3 h-3 mr-2"/>
        Aprovar
      </Button>
     </TableCell>

     <TableCell>
      <Button size="xs" variant="ghost">
      <X className="w-3 h-3 mr-2"/>
        Cancelar
      </Button>
     </TableCell>
    </TableRow>
  );
}

export default OrderTableRow;