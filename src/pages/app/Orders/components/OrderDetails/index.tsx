import { getOrderDetails } from '@/api/getOrderDetials';
import OrderStatus from '@/components/OrderStatus';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface IOrderDetailsProps {
  orderId: string;
  open: boolean;
}

const OrderDetails = ({ orderId, open }: IOrderDetailsProps) => {
  const { data: order } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderDetails({ orderId }),
    enabled: open
  })

  if(!order){
    return null
  }

  return (
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Pedido: {order.id}</DialogTitle>
     <DialogDescription>Detalhes do pedido</DialogDescription>
    </DialogHeader>

    <div className="space-y-6">
     <Table>
      <TableBody>
       <TableRow>
        <TableCell className="text-muted-foreground">Status</TableCell>
        <TableCell className="flex justify-end">
         <OrderStatus status={order.status}/>
        </TableCell>
       </TableRow>

       <TableRow>
        <TableCell className="text-muted-foreground">Cliente</TableCell>
        <TableCell className="flex justify-end">
         {order.customer.name}
        </TableCell>
       </TableRow>

       <TableRow>
        <TableCell className="text-muted-foreground">Telefone</TableCell>
        <TableCell className="flex justify-end">
        {order.customer.phone}
        </TableCell>
       </TableRow>

       <TableRow>
        <TableCell className="text-muted-foreground">Email</TableCell>
        <TableCell className="flex justify-end">
        {order.customer.email}
        </TableCell>
       </TableRow>

       <TableRow>
        <TableCell className="text-muted-foreground">Realizado há</TableCell>
        <TableCell className="flex justify-end">
         {formatDistanceToNow(order.createdAt, { addSuffix: true, locale: ptBR })}
        </TableCell>
       </TableRow>

      </TableBody>
     </Table>

     <Table>
      <TableHeader>
       <TableRow>
        <TableHead>Produto</TableHead>
        <TableHead className="text-right">Qtd.</TableHead>
        <TableHead className="text-right">Preço</TableHead>
        <TableHead className="text-right">Subtotal</TableHead>
       </TableRow>
      </TableHeader>

      <TableBody>
       {order.orderItems.map((order: any) => (
        <TableRow key={order.id}>
          <TableCell>{order.product.name}</TableCell>
          <TableCell className="text-right">{order.quantity}</TableCell>
          <TableCell className="text-right">{(order.priceInCents / 100).toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</TableCell>
          <TableCell className="text-right">{(order.quantity * order.priceInCents / 100).toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</TableCell>
        </TableRow>
       ))}
      </TableBody>

      <TableFooter>
       <TableRow>
        <TableCell colSpan={3}>Total do Pedido</TableCell>
        <TableCell className="text-right font-medium">{(order.totalInCents / 100).toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</TableCell>
       </TableRow>
      </TableFooter>
     </Table>
    </div>
   </DialogContent>
  );
}

export default OrderDetails;