import { getDayOrdersAmount } from '@/api/getDayOrdersAmount';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Utensils } from 'lucide-react';
import React from 'react';


const DaysOrdersAmountCard = () => {
  const { data: dayOrdersAmount } = useQuery({
    queryFn: getDayOrdersAmount,
    queryKey: ['metrics', 'day-orders-amount']
  })
  return (
  <Card>
   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
     <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
     <Utensils className="h-4 w-4 text-muted-foreground"/>
   </CardHeader>
   <CardContent className="space-y-1">
     {dayOrdersAmount && (
      <>
        <span className="text-2xl font-bold tracking-tight">
        {dayOrdersAmount?.amount.toLocaleString("pt-BR")}
      </span>
      <p className="text-xs text-muted-foreground">
          { dayOrdersAmount?.diffFromYesterday >= 0 ?
            <>
              <span className="text-emerald-500 dark:text-emerald-400">
                +{dayOrdersAmount?.diffFromYesterday}%
              </span> em relação há ontem
            </>
            :
            <>
              <span className="text-rose-500 dark:text-rose-400">
                {dayOrdersAmount?.diffFromYesterday}%
              </span> em relação há ontem
            </>
          }
      </p>
    </>)
    }
   </CardContent>
   </Card>
  );
}

export default DaysOrdersAmountCard;