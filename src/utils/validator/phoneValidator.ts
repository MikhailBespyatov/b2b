import { phoneErrorText } from "constants/validation-text";

export const isPhoneNumberValid = (phoneNumber: string) => {
  const regex: RegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
  return regex.test(phoneNumber);
};

export const phoneValidator = (value: string) => value.split(' ').join('').length === 12 || phoneErrorText;
