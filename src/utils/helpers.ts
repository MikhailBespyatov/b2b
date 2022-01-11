export const moneyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'KZT',
  currencyDisplay: 'narrowSymbol',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

export const phoneNumberFormatter = (str: string) => {
  if (!Boolean(str)) {
    return 'Не указано';
  }

  let nulledStr = String(str).replace(/([\+\(+\)\-\s]{1})/g, '');

  return nulledStr[0] === '8'
    ? `${nulledStr[0]} (${nulledStr.slice(1, 4)}) ${nulledStr.slice(
        4,
        7
      )}-${nulledStr.slice(7, 9)}-${nulledStr.slice(9, 11)}`
    : `+${nulledStr[0]} (${nulledStr.slice(1, 4)}) ${nulledStr.slice(
        4,
        7
      )}-${nulledStr.slice(7, 9)}-${nulledStr.slice(9, 11)}`;
};

export const calculatePercent = (amount: number, num: number) => {
  return Math.round(Number((num / amount).toFixed(2)) * 100);
};
