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

export const phoneNumberWithoutFormat = (phoneNumber: string) => {
  return phoneNumber.replace(/[^+\d]+/g, '');
};
