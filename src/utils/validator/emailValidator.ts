import { emailNotCorrect } from "constants/validation-text";

export const emailValidator = (email: string) => /\S+@\S+\.\S+/.test(email) || emailNotCorrect;
