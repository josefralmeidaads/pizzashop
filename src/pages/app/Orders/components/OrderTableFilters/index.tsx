import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, X } from 'lucide-react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type IOrderFiltersSchema = z.infer<typeof orderFiltersSchema>;

const OrderTableFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId")
  const customerName = searchParams.get("customerName")
  const status = searchParams.get("status")

  const { register, handleSubmit, control, reset } = useForm<IOrderFiltersSchema>({
    resolver: zodResolver(orderFiltersSchema),
    defaultValues: {
      orderId: orderId ?? '',
      customerName: customerName ?? '',
      status: status ?? 'all',
    }
  })

  const handleFilter = (data: IOrderFiltersSchema) => {
    setSearchParams((state) => {
      if(data.orderId){
        state.set("orderId", data.orderId)
      } else {
        state.delete("orderId")
      }

      if(data.customerName){
        state.set("customerName", data.customerName)
      } else {
        state.delete("customerName")
      }

      if(data.status){
        state.set("status", data.status)
      } else {
        state.delete("status")
      }

      state.set("page", '1');

      return state;
    })
  }

  const handleClearFilters = () => {
    setSearchParams((state) => {
      state.delete("orderId")
      state.delete("customerName")
      state.delete("status")
      state.set("page", "1")

      return state
    })
    reset({
      orderId: '',
      customerName: '',
      status: "all"
    });
  }

  return (
   <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
    <span className="text-sm font-semibold">
     Filtros:
     </span>
     <Input placeholder="ID do pedido" className="h-8 w-auto" {...register("orderId")}/>
     <Input placeholder="Nome do cliente" className="h-8 w-[320px]" {...register("customerName")}/>
     <Controller 
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => (
          <Select 
            defaultValue="all"
            name={name}
            onValueChange={onChange}
            value={value}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
              <SelectItem value="processing">Em preparo</SelectItem>
              <SelectItem value="delivering">Em entrega</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
         </Select>
        )}
     />

     <Button type="submit" variant="secondary" size="xs">
      <Search className="w-4 h-4 mr-2"/>
      Filtrar resultados
     </Button>

     <Button type="button" variant="outline" size="xs" onClick={handleClearFilters}>
      <X className="w-4 h-4 mr-2"/>
      Remover Filtros
     </Button>
  </form>
  );
}

export default OrderTableFilters;