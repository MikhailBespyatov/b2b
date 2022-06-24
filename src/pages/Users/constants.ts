import { THeadItems } from 'components/Table/types';

export const tHeadItems: THeadItems[] = [
  { title: '', grid: 0.2, key: 'checkbox' },
  {
    title: 'users.table.header.fullName',
    key: 'fullName',
    grid: 1.5
  },
  { title: 'users.table.header.partner', key: 'merchantId' },
  { title: 'users.table.header.email', key: 'userLogin' },
  { title: 'users.table.header.role', key: 'role' },
  { title: 'users.table.header.dateOfRegistration', key: 'role' },
  { title: 'users.table.header.registeredBy', key: 'jobTitle' }
];
