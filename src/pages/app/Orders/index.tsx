import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Helmet } from 'react-helmet-async';
import OrderTableRow from './components/OrderTableRow';
import OrderTableFilters from './components/OrderTableFilters';
import Pagination from '@/components/Pagination';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/api/getOrders';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import OrderTableSkeleton from './components/OrderTableSkeleton';

const Orders = () => {
  const [searchParams, setSerachParams] = useSearchParams();

  const orderId = searchParams.get("orderId")
  const customerName = searchParams.get("customerName")
  const status = searchParams.get("status")

  const pageIndex =  z.coerce.number().transform(page => page - 1).parse(searchParams.get("page") ?? '1');

  const { data: result, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orders", pageIndex, orderId, customerName, status],
    queryFn: () => getOrders({ pageIndex, orderId: orderId ?? '', customerName: customerName ?? '', status: status === "all" ? null : status}),
  })

  const handlePaginate = (pageIndex: number) => {
    setSerachParams(prev => {
      prev.set('page', String(pageIndex + 1))

      return prev
    })
  }

  return (
   <>
    <Helmet title="Pedidos"/>
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
      <div className="space-y-2.5">
        <OrderTableFilters />

        <div className="border rounded-md">
          <Table>
          <TableHeader>
            <TableRow>
            <TableHead className="w-[64px]"></TableHead>
            <TableHead className="w-[140px]">Identificador</TableHead>
            <TableHead className="w-[180px]">Realizada há</TableHead>
            <TableHead className="w-[140px]">Status</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead className="w-[140px]">Total do pedido</TableHead>
            <TableHead className="w-[164px]"></TableHead>
            <TableHead className="w-[132px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingOrders && <OrderTableSkeleton />}
            {result && result.orders.map((order) => (
              <OrderTableRow order={order}  key={order.orderId}/>
            ))}
          </TableBody>
          </Table>
        </div>
        {result && (
          <Pagination 
            pageIndex={result.meta.pageIndex} 
            perPage={result.meta.perPage} 
            totalCount={result.meta.totalCount}
            onPageChange={handlePaginate}
          />
        )}
      </div>
    </div>
   </>
  );
}

export default Orders;