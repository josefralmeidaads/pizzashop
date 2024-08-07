import React from 'react';

export type IOrderStatus = {
  status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
}

const orderStatusMap: Record<string, string> = {
  pending: "Pendente",
  canceled: "Cancelado",
  processing: "Processando",
  delivering: "Entregando",
  delivered: "Entregue",
}

const OrderStatus = ({status }: IOrderStatus) => {
  return (
    <div className="flex items-center gap-2">
      {status === "pending" && <span data-testid="badge" className="w-2 h-2 rounded-full bg-slate-400"/>}
      {status === "canceled" && <span data-testid="badge" className="w-2 h-2 rounded-full bg-rose-500"/>}
      {['processing', 'delivering'].includes(status) && (<span data-testid="badge" className="w-2 h-2 rounded-full bg-amber-500"/>)}
      {status === "delivered" && <span data-testid="badge" className="w-2 h-2 rounded-full bg-emerald-500"/>}
      <span className="font-medium text-muted-foreground">{orderStatusMap[status]}</span>
    </div>
  );
}

export default OrderStatus;