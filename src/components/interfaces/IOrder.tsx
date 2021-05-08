export default interface IOrder {
  order: {
    item_description: string;
    unit_type: string;
    quantity_ordered: number;
    unit_cost: number;
    order_total: number;
    status: string;
  };
}
