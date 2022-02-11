export interface IOrder {
  id: number;
  merchant_order_id: number;
  amount: number;
  app_status: string;
  phoneNumber: string;
  created_at: string;
  otp_updated_at: string;
  fio?: string;
}

export type IOrderSortFields = 'id' | 'created_at' | 'items_amount' | '';
export type IOrderSortOptions = 'asc' | 'desc' | '';

export interface IOrderSort {
  field: IOrderSortFields;
  sort: IOrderSortOptions;
}

export type IOrderFilterFields =
  | 'merchant_order_id'
  | 'ph_number'
  | 'created_at'
  | 'otp_updated_at'
  | 'app_status'
  | 'order_amount'
  | '';

export interface IOrderFilter {
  merchant_order_id: number | undefined;
  PhoneNumber: string | undefined;
  CreatedAt: string | undefined;
  OTPUpdatedAt: string | undefined;
  AppStatus: string | undefined;
  order_amount: number | undefined;
}
