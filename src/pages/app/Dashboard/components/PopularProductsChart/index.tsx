import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react';
import {
 Cell,
 Pie,
 PieChart,
 ResponsiveContainer
} from 'recharts';
import colors from 'tailwindcss/colors';
import { useQuery } from '@tanstack/react-query';
import { getPopularProducts } from '@/api/getPopularProducts';

const data = [
 { product: 'Pepperoni', amount: 40 },
 { product: 'Mussarela', amount: 30 },
 { product: 'Marguerita', amount: 26 },
 { product: 'Quatro Queijos', amount: 80 },
 { product: 'Largato', amount: 150 },
]

const COLORS = [
 colors.sky['500'],
 colors.amber['500'],
 colors.violet['500'],
 colors.emerald['500'],
 colors.rose['500'],
]

const PopularProductsChart: React.FC = () => {
  const { data: popularProducts } = useQuery({
    queryFn: getPopularProducts,
    queryKey: ['metrics', 'popular-products'],
  })

  return (
   <Card className="lg:col-span-3 sm:col-span-9">
    <CardHeader className="pb-8">
     <div className="flex items-center justify-between">
      <CardTitle className="text-base font-medium">Produtos populares</CardTitle>
      <BarChart className="w-4 h-4 text-muted-foreground"/>
     </div>
    </CardHeader>
    <CardContent>
     {popularProducts && (<ResponsiveContainer width="100%" height={240}>
      <PieChart style={{ fontSize: 12 }}>
       <Pie 
        data={popularProducts}
        dataKey="amount"
        nameKey="product"
        cx="50%"
        cy="50%"
        outerRadius={86}
        innerRadius={64}
        strokeWidth={8}
        label={({
         cx,
         cy,
         midAngle,
         innerRadius,
         outerRadius,
         value,
         index,
       }) => {
         const RADIAN = Math.PI / 180
         const radius = 12 + innerRadius + (outerRadius - innerRadius)
         const x = cx + radius * Math.cos(-midAngle * RADIAN)
         const y = cy + radius * Math.sin(-midAngle * RADIAN)
       
         return (
           <text
             x={x}
             y={y}
             className="fill-muted-foreground text-xs"
             textAnchor={x > cx ? 'start' : 'end'}
             dominantBaseline="central"
           >
             {popularProducts[index].product.length > 12
               ? popularProducts[index].product.substring(0, 12).concat('...')
               : popularProducts[index].product}{' '}
             ({value})
           </text>
         )
       }}
       labelLine={false}
       >
        {popularProducts.map((_, index) => (
         <Cell 
          key={`cell-${index}`} 
          fill={COLORS[index]}
          className="stroke-background hover:opacity-80"
         />
        ))}
       </Pie>
      </PieChart>
     </ResponsiveContainer>)}
    </CardContent>
   </Card>
  );
}

export default PopularProductsChart;