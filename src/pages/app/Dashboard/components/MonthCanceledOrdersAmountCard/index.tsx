import { getMonthCanceledOrdersAmount } from '@/api/getMonthCanceledOrdersAmount';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { DollarSign } from 'lucide-react';
import React from 'react';
import MetricCardSkeleton from '../MetricCardSkeleton';

const MonthCanceledOrdersAmountCard: React.FC = () => {
  const { data: monthOrdersCanceledAmount } = useQuery({
    queryFn: getMonthCanceledOrdersAmount,
    queryKey: ['metrics', 'month-canceled-orders-amount']
  })
  return (
   <Card>
   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
     <CardTitle className="text-base font-semibold">Cancelamento (mês)</CardTitle>
     <DollarSign className="h-4 w-4 text-muted-foreground"/>
   </CardHeader>
   <CardContent className="space-y-1">
      {monthOrdersCanceledAmount ? (
        <>
          <span className="text-2xl font-bold tracking-tight">
          {monthOrdersCanceledAmount.amount.toLocaleString("pt-BR")}
          </span>
          <p className="text-xs text-muted-foreground">
            {
              monthOrdersCanceledAmount.diffFromLastMonth <= 0
              ?
              <>
                <span className="text-emerald-500 dark:text-emerald-400">
                  +{monthOrdersCanceledAmount.diffFromLastMonth}%
                </span> em relação ao mês passado
              </>
              :
              <>
                <span className="text-rose-500 dark:text-rose-400">
                  {monthOrdersCanceledAmount.diffFromLastMonth}%
                </span> em relação ao mês passado
              </>
            }
          </p>
        </>) : (
          <MetricCardSkeleton />
        )
      }
   </CardContent>
   </Card>
  );
}

export default MonthCanceledOrdersAmountCard;