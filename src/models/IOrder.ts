export interface IOrder {
  id: number;
  merchant_order_id: number;
  amount: number;
  app_status: string;
  phoneNumber: string;
  created_at: string;
  otp_updated_at: string;
}

export interface IOrderSort {
  id: 'asc' | 'desc' | '';
  created_at: 'asc' | 'desc' | '';
  amount: 'asc' | 'desc' | '';
}

export interface IOrderFilterFields {
  merchantId: string | undefined;
  transactionNumber: string | undefined;
  phoneNumber: string | undefined;
  dateCreate: string | undefined;
  deliveryDate: string | undefined;
  status: string | undefined;
  amount: number | undefined;
}
