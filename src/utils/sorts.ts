export const sortOperator = (value: 'asc' | 'desc' | '') => {
  switch (value) {
    case 'asc':
      return 'desc';
    case 'desc':
      return '';
    default:
      return 'asc';
  }
};
