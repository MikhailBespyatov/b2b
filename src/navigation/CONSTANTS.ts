export const ROOT = '/';
export const LOGIN = '/login';
export const PARTNERS = '/partners';
export const NEW_PARTNER = '/new-partner';
export const USERS = '/users';
export const NEW_USER = `${USERS}/new-user`;
export const USER = `${USERS}/:login`;
export const TRANSACTIONS = '/transactions';
export const ANALYTICS = '/analytics';
export const STATISTICS = '/statistics';
export const SETTLEMENTS = '/settlements';
export const SETTINGS = '/settings';

export const SIDEBAR_ITEMS = [
  { title: 'page.sidebar.root', path: TRANSACTIONS },
  { title: 'page.sidebar.partners', path: PARTNERS },
  { title: 'page.sidebar.users', path: USERS },
  { title: 'page.sidebar.settings', path: SETTINGS }
];
