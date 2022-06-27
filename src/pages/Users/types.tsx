import React from 'react';

export interface DataType {
  lastName: string;
  firstName: string;
  merchantId: string;
  login: string;
  role: string;
  jobTitle: string;
  middleName: string;
  registeredBy: string | number;
  registeredDate: string;
}

export interface TableType
  extends Omit<DataType, 'lastName' | 'firstName' | 'middleName'> {
  fullName: string;
  checkbox: React.ReactNode;
}
