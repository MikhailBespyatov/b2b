import React from 'react';

export interface DataType {
  userLastname: string;
  userName: string;
  merchantId: string;
  userLogin: string;
  role: string;
  jobTitle: string;
}

export interface TableType extends Omit<DataType, 'userLastname' | 'userName'> {
  fullName: string;
  checkbox: React.ReactNode;
}
