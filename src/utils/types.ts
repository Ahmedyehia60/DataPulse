export type InventoryRow = Record<string, string | number | boolean | null>;
export type OrderStatus = "active" | "archive";

export interface OrderItem {
  id: number;
  transaction_number: string;
  transaction_date: string;
  item_name: string;
  quantity: number;
  price: string | number;
  total_price: string | number;
  status: OrderStatus;
}
