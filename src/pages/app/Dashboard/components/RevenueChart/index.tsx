import React, { useMemo, useState } from 'react';
import colors from 'tailwindcss/colors';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
 ResponsiveContainer,
 LineChart,
 XAxis,
 YAxis,
 CartesianGrid,
 Line,
 Tooltip
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { getDailyRevenueInPeriod } from '@/api/getDailyRevenueInPeriod';
import { Label } from '@/components/ui/label';
import { DateRangePicker } from '@/components/DateRangePicker';
import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';

const RevenueChart: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 31),
    to: new Date(),
  })

  const { data: dailyRevenueInPeriod } = useQuery({
    queryFn: () => getDailyRevenueInPeriod({
      from: dateRange?.from,
      to: dateRange?.to,
    }),
    queryKey: ['metrics', 'receipt-in-period', dateRange],
  })

  const chartData = useMemo(() => {
    return dailyRevenueInPeriod?.map((chartItem: any ) => {
      return {
        date: chartItem.date,
        receipt: chartItem.receipt / 100,
      }
    })
  }, [dailyRevenueInPeriod])

  return (
   <Card className="lg:col-span-6 sm:col-span-9">
    <CardHeader className="flex-row items-center justify-between pb-8">
     <div className="space-y-1">
      <CardTitle className="text-base font-medium">Receita no período</CardTitle>
      <CardDescription>Receita diária no período</CardDescription>
     </div>

     <div className="flex items-center gap-3">
      <Label>Período</Label>
      <DateRangePicker date={dateRange} onDateChange={setDateRange}/>
     </div>
    </CardHeader>
    <CardContent>
     {dailyRevenueInPeriod && (<ResponsiveContainer width="100%" height={240}>
      <LineChart data={chartData} style={{ fontSize: 12}}>
       <YAxis 
        stroke="#888" 
        axisLine={false} 
        tickLine={false} 
        width={80}
        tickFormatter={(value: number) => value.toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}
       />
       <XAxis 
        dataKey="date"
        tickLine={false}
        axisLine={false}
        dy={16}
       />
       <Line type="linear" strokeWidth="2" dataKey="receipt" stroke={colors.violet['500']}/>
       <CartesianGrid vertical={false} className="stroke-muted"/>
      </LineChart>
     </ResponsiveContainer>)}
    </CardContent>
   </Card>
  );
}

export default RevenueChart;