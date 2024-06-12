import React from 'react';
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

const data = [
 { date: '10/12', revenue: 1200 },
 { date: '11/12', revenue: 450 },
 { date: '12/12', revenue: 320 },
 { date: '13/12', revenue: 1250 },
 { date: '14/12', revenue: 1600 },
 { date: '15/12', revenue: 1800 },
 { date: '16/12', revenue: 950 },
]

const RevenueChart: React.FC = () => {
  return (
   <Card className="col-span-6">
    <CardHeader className="flex-row items-center justify-between pb-8">
     <div className="space-y-1">
      <CardTitle className="text-base font-medium">Receita no período</CardTitle>
      <CardDescription>Receita diária no período</CardDescription>
     </div>
    </CardHeader>
    <CardContent>
     <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} style={{ fontSize: 12}}>
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
       <Line type="linear" strokeWidth="2" dataKey="revenue" stroke={colors.violet['500']}/>
       <CartesianGrid vertical={false} className="stroke-muted"/>
      </LineChart>
     </ResponsiveContainer>
    </CardContent>
   </Card>
  );
}

export default RevenueChart;