import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

// import { Container } from './styles';

const MetricCardSkeleton = () => {
  return (
   <>
    <Skeleton className="h-7 w-36 mt-1"/>
    <Skeleton className="h-4 w-52"/>
   </>
  );
}

export default MetricCardSkeleton;