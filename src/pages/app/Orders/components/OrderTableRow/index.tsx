import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {  TableCell, TableRow } from '@/components/ui/table';
import { ArrowRight, Search, X } from 'lucide-react';
import React from 'react';
import OrderDetails from '../OrderDetails';

// import { Container } from './styles';

const OrderTableRow = () => {
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
      asuahsuahs98887
     </TableCell>

     <TableCell className="text-muted-foreground">
       15 minutos
     </TableCell>

     <TableCell>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-slate-400"/>
        <span className="font-medium text-muted-foreground">Pendente</span>
      </div>
     </TableCell>

     <TableCell className="font-medium">
      Jose Almeida
     </TableCell>

     <TableCell className="font-medium">
      R$ 50,00
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