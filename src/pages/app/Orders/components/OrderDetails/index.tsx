import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';

const OrderDetails: React.FC = () => {
  return (
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Pedido: 182fy84654846b</DialogTitle>
     <DialogDescription>Detalhes do pedido</DialogDescription>
    </DialogHeader>

    <div className="space-y-6">
     <Table>
      <TableBody>
       <TableRow>
        <TableCell className="text-muted-foreground">Status</TableCell>
        <TableCell className="flex justify-end">
         <div className="flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-slate-400"/>
           <span className="font-medium text-muted-foreground">Pendente</span>
         </div>
        </TableCell>
       </TableRow>

       <TableRow>
        <TableCell className="text-muted-foreground">Cliente</TableCell>
        <TableCell className="flex justify-end">
         Jose Almeida
        </TableCell>
       </TableRow>

       <TableRow>
        <TableCell className="text-muted-foreground">Telefone</TableCell>
        <TableCell className="flex justify-end">
         (32) 99850-9807
        </TableCell>
       </TableRow>

       <TableRow>
        <TableCell className="text-muted-foreground">Email</TableCell>
        <TableCell className="flex justify-end">
         josefr.almeidaads@gmail.com
        </TableCell>
       </TableRow>

       <TableRow>
        <TableCell className="text-muted-foreground">Realizado há</TableCell>
        <TableCell className="flex justify-end">
         15 minutos
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
       <TableRow>
        <TableCell>Pizza Pepperoni Família</TableCell>
        <TableCell className="text-right">2</TableCell>
        <TableCell className="text-right">R$ 90,00</TableCell>
        <TableCell className="text-right">R$ 180,00</TableCell>
       </TableRow>

       <TableRow>
        <TableCell>Pizza Mussarela Família</TableCell>
        <TableCell className="text-right">2</TableCell>
        <TableCell className="text-right">R$ 65,00</TableCell>
        <TableCell className="text-right">R$ 130,00</TableCell>
       </TableRow>
      </TableBody>

      <TableFooter>
       <TableRow>
        <TableCell colSpan={3}>Total do Pedido</TableCell>
        <TableCell className="text-right font-medium">R$ 310,00</TableCell>
       </TableRow>
      </TableFooter>
     </Table>
    </div>
   </DialogContent>
  );
}

export default OrderDetails;