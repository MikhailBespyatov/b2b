export const isPhoneNumberValid = (phoneNumber: string) => {
  const regex: RegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
  return regex.test(phoneNumber);
};
