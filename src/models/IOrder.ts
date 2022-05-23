export interface IOrderInfo {
  id: number;
  merchant_order_id: number;
  amount: number;
  app_status: string;
  phoneNumber: string;
  created_at: string;
  otp_updated_at: string;
  fio?: string;
}

export interface IClientInfo {
  cLastName: string;
  cMiddleName: string;
  cName: string;
  phoneNumber: string;
}

export interface IOrder {
  applicationDetail: null;
  clientInfo: IClientInfo;
  orderInfo: IOrderInfo;
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
  orderId: number | undefined;
  merchant_order_id: string | undefined;
  status: string | undefined;
  order_amount: string | undefined;
  dateCreate: string | undefined;
  deliveryDate: string | undefined;
  ph_number: string | undefined;
}
