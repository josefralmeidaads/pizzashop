import { Helmet } from 'react-helmet-async';
import MonthRevenueCard from './components/MonthRevenueCard';
import MonthOrdersAmountCard from './components/MonthOrdersAmountCard';
import DaysOrdersAmountCard from './components/DaysOrdersAmountCard';
import MonthCanceledOrdersAmountCard from './components/MonthCanceledOrdersAmountCard';
import RevenueChart from './components/RevenueChart';
import PopularProductsChart from './components/PopularProductsChart';

const Dashboard = () => {
  return (
    <>
      <Helmet title="Dashboard"/>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DaysOrdersAmountCard />
          <MonthCanceledOrdersAmountCard />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  );
}

export default Dashboard;