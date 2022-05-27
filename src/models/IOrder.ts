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

export interface IOrderDetail {
  itemCount: number;
  itemId: string;
  itemName: string;
  itemPrice: number;
  itemStatus: string;
  itemTotal: number;
}

export interface IChangeHistory {
  adjusted: string;
  status: string;
  action: string;
  responsible: string;
  last: number;
}

export interface IOrder {
  applicationDetail: IOrderDetail[];
  clientInfo: IClientInfo;
  orderInfo: IOrderInfo;
  changeHistory: IChangeHistory[];
}

export type IOrderSortFields = 'id' | 'created_at' | 'items_amount' | '';
export type IOrderSortOptions = 'asc' | 'desc' | '';

export interface IOrderSort {
  field: IOrderSortFields;
  sort: IOrderSortOptions;
}

export interface IOrderFilter {
  id: number | undefined;
  orderId: string | undefined;
  status: string | undefined;
  order_amount: string | undefined;
  dateCreate: string | undefined;
  deliveryDate: string | undefined;
  ph_number: string | undefined;
}
